import Room from "../models/room";
import Seat from "../models/seat";
import seatType from "../models/seatType";
import showTime from "../models/showTime";

export const create = async (req, res) => {
  try {
    const existRoom = await Room.findOne({ name: req.body.name }).exec()
    if (existRoom) {
      return res.status(500).json({
        message: "Phòng đã tồn tại",
      });
    }
    const room = await new Room(req.body).save();
    let array = [];
    for (let i = 0; i < room.columns; i++) {
      for (let j = 0; j < room.rows; j++) {
        let item = {
          column: i + 1,
          row: String.fromCharCode(j + 65),
          seatTypeId: req.body.seatTypeId,
          roomId: room._id
        };
        array.push(item);
      }
    }
    console.log(array);
    const seats = await Seat.insertMany(array);
    return res.status(200).json({ room, seats });
  } catch (error) {
    return res.status(400).json({
      message: `Don't create!, ${error}`,
    });
  }
};

export const list = async (req, res) => {
  try {
    const rooms = await Room.find({}).populate("formatId").exec();
    return res.status(200).json(rooms);
  } catch (error) {
    return res.status(400).json({
      message: "Don't find all!",
    });
  }
};

export const read = async (req, res) => {
  const filter = { _id: req.params.id };
  try {
    const room = await Room.findOne(filter).populate("formatId").exec();
    return res.status(200).json(room);
  } catch (error) {
    return res.status(400).json({
      message: "Don't find one!",
    });
  }
};

export const update = async (req, res) => {
  const filter = { _id: req.params.id };
  const doc = req.body;
  const option = { new: true };
  try {
    const activeRoom = await showTime.findOne({ roomId: req.params.id, date: { $gte: Date.now() }, status: 0 });
    if (activeRoom) return res.status(404).json("Phòng này đang có suất chiếu, không thể cập nhật")
    const oldRoom = await Room.findOne(filter).exec();
    if (req.body.columns > oldRoom.columns || req.body.rows > oldRoom.rows) {
      let array = [];
      for (let i = 0; i < req.body.columns; i++) {
        for (let j = 0; j < req.body.rows; j++) {
          let item = {
            column: i + 1,
            row: String.fromCharCode(j + 65),
            seatTypeId: req.body.seatTypeId,
            roomId: oldRoom._id
          };
          array.push(item);
        }
      }
      const checkDuplicate = (item) => {
        return (item.column > oldRoom.columns) || ((parseInt(item.row, 36) - 9) > oldRoom.rows)
      }
      const filterArray = array.filter(checkDuplicate);
      await Seat.insertMany(filterArray);
    }
    if (req.body.columns < oldRoom.columns) {
      await Seat.deleteMany({ column: { $gt: req.body.columns }, roomId: req.params.id });
    }
    if (req.body.rows < oldRoom.rows) {
      await Seat.deleteMany({ row: { $gt: String.fromCharCode(req.body.rows + 64) }, roomId: req.params.id });
    }
    const room = await Room.findOneAndUpdate(filter, doc, option).exec();
    // if (oldRoom.seatTypeId != req.body.seatTypeId) {
    //   await Seat.updateMany({ roomId: filter }, { $set: { seatTypeId: req.body.seatTypeId } });
    // }
    return res.status(200).json({ room });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: "Don't update",
    });
  }
};

export const remove = async (req, res) => {
  const filter = { _id: req.params.id };
  try {
    const room = await Room.findOneAndDelete(filter).exec();
    const seats = await Seat.deleteMany({ roomId: req.params.id });
    return res.status(200).json({
      message: "Delete Success!",
      room,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Don't remove!",
    });
  }
};
