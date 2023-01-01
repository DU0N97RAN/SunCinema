import Seat from "../models/seat";
import showTime from "../models/showTime";

export const create = async (req, res) => {
  try {
    const seat = await new Seat(req.body).save();
    res.json(seat);
  } catch (error) {
    res.status(400).json({
      message: "Don't create!",
    });
  }
};

export const list = async (req, res) => {
  try {
    const seats = await Seat.find({})
      .populate("roomId")
      .populate("seatTypeId")
      .exec();
    return res.status(200).json(seats);
  } catch (error) {
    return res.status(400).json({
      message: "Don't find all!",
    });
  }
};
export const seatsByRoom = async (req, res) => {
  try {
    const seats = await Seat.find({ roomId: req.params.roomId })
      .populate("seatTypeId")
      .exec();
    return res.status(200).json(seats);
  } catch (error) {
    return res.status(400).json({
      message: "Don't find all!",
    });
  }
};

export const read = async (req, res) => {
  const filter = { _id: req.params.id };
  try {
    const seat = await Seat.findOne(filter)
      .populate("roomId")
      .populate("seatTypeId")
      .exec();
    return res.status(200).json(seat);
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
    const seat = await Seat.findOneAndUpdate(filter, doc, option).exec();
    return res.status(200).json(seat);
  } catch (error) {
    return res.status(400).json({
      message: "Don't update",
    });
  }
};
export const updateSeatByRoom = async (req, res) => {
  try {
    const activeRoom = await showTime.findOne({ roomId: req.params.roomId, date: { $gte: Date.now() }, status: 0 });
    if (activeRoom) return res.status(404).json("Phòng này đang có suất chiếu, không thể cập nhật")
    await Seat.updateMany({ _id: { $in: req.body.seatId } }, { $set: { status: req.body.status, seatTypeId: req.body.seatTypeId } });
    const updatedSeats = await Seat.find({}).where("_id").in(req.body.seatId).populate("seatTypeId").exec();
    return res.status(200).json(updatedSeats);
  } catch (error) {
    console.log(error);
    return res.status(400).json(
      "Don't update",
    );
  }
};



export const remove = async (req, res) => {
  const filter = { _id: req.params.id };
  try {
    const seat = await Seat.findOneAndDelete(filter).exec();
    return res.status(200).json({
      message: "Delete Success!",
      seat,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Don't remove!",
    });
  }
};
