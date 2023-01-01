import SetByShowTime from "../models/setByShowTime";
import Room from "../models/room"

export const create = async (req, res) => {
  try {
    const { roomId, showTimeId, movieId } = req.body;
    const listRoom = await Room.find().where('_id').in(roomId).exec();
    const payload = listRoom.map((item) => {
      return {
        roomId: item._id,
        seats: item.seats,
        showTimeId,
        movieId
      }
    });
    const result = await SetByShowTime.insertMany(payload);
    const populatedResult = await SetByShowTime.populate(result, [{ path: "movieId" }, { path: "roomId" }]);
    res.status(200).json(populatedResult);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Don't create",
    });
  }
};

export const list = async (req, res) => {
  try {
    const setByShowTime = await SetByShowTime.find({}).populate("movieId").populate("roomId").populate("showTimeId")
      .exec();
    return res.status(200).json(setByShowTime);
  } catch (error) {
    return res.status(400).json({
      message: "Don't find all",
    });
  }
};

export const read = async (req, res) => {
  const filter = { _id: req.params.id };
  try {
    const setByShowTime = await SetByShowTime.findOne(filter).populate("movieId").populate("roomId").populate("showTimeId")
      .exec();
    return res.status(200).json(setByShowTime);
  } catch (error) {
    return res.status(400).json({
      message: "Don't find one",
    });
  }
};

export const update = async (req, res) => {
  const filter = { _id: req.params.id };
  const doc = req.body;
  const options = { new: true };
  try {
    const setByShowTime = await SetByShowTime.findOneAndUpdate(
      filter,
      doc,
      options
    ).populate("movieId").populate("roomId").populate("showTimeId").exec();
    return res.status(200).json(setByShowTime);
  } catch (error) {
    return res.status(400).json({
      message: "Don't update",
    });
  }
};

export const remove = async (req, res) => {
  const filter = { _id: req.params.id };
  try {
    const setByShowTime = await SetByShowTime.findOneAndRemove(filter).exec();
    return res.status(200).json({
      message: "Delete Success!",
      setByShowTime,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Don't delete",
    });
  }
};
