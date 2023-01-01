import ShowTime from "../models/showTime";
import Movie from "../models/movie";

export const create = async (req, res) => {
  try {
    // const movie = await Movie.findOne({ _id: req.body.movieId }).exec();
    // req.body.startAt = new Date(req.body.startAt);
    // req.body.endAt = new Date(req.body.startAt.getTime() + movie.runTime * 3600 * 1000);
    const existShowTime = await ShowTime.find({ endAt: { $gte: req.body.startAt }, roomId: { $in: req.body.roomId } }).populate("roomId").populate("movieId").exec();
    console.log(existShowTime)
    if (existShowTime.length) return res.status(400).json({ message: "Khung giờ hoặc phòng chiếu của phim đang bị trùng, vui lòng tạo khung giờ khác", existShowTime });
    const showTime = await new ShowTime(req.body).save();
    return res.json(showTime);
  } catch (error) {
    console.log(error)
    return res.status(400).json(
      { message: "Don't create!" }
    );
  }
};

export const list = async (req, res) => {
  try {
    const showTimes = await ShowTime.find({})
      .populate("movieId")
      .populate({ path: "roomId", populate: { path: "formatId" } })
      .exec();
    return res.status(200).json(showTimes);
  } catch (error) {
    return res.status(400).json({
      message: "Don't find all!",
    });
  }
};

export const read = async (req, res) => {
  const filter = { _id: req.params.id };
  try {
    const showTime = await ShowTime.findOne(filter)
      .populate("movieId")
      .populate({ path: "roomId", populate: { path: "formatId" } })
      .exec();
    return res.status(200).json(showTime);
  } catch (error) {
    console.log(error);
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
    // const movie = await Movie.findOne({ _id: req.body.movieId }).exec();
    // req.body.startAt = new Date(req.body.startAt);
    // req.body.endAt = new Date(req.body.startAt.getTime() + movie.runTime * 3600 * 1000);
    const showTime = await ShowTime.findOneAndUpdate(
      filter,
      doc,
      option
    ).exec();
    return res.status(200).json(showTime);
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
    const showTime = await ShowTime.findOneAndDelete(filter).exec();
    return res.status(200).json({
      message: "Delete Success!",
      showTime,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Don't remove!",
    });
  }
};
