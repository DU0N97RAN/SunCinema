import Comment from "../models/comment";

export const create = async (req, res) => {
  const doc = req.body;
  try {
    const comment = await new Comment(doc).save();
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(400).json({
      message: "Don't create!",
    });
  }
};

export const list = async (req, res) => {
  try {
    const comments = await Comment.find().exec();
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json({
      message: "Don't find all",
    });
  }
};

export const listByMovies = async (req, res) => {
  try {
    const comments = await Comment.find({ movieId: req.query.movieId })
      .populate("movieId", ["name", "image", "trailerUrl"])
      .populate("userId", ["username", "email"])
      .exec();
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json({
      message: "Don't find all by movie",
    });
  }
};

export const read = async (req, res) => {
  const filter = { _id: req.params.id };
  try {
    const comment = await Comment.findOne(filter)
      .populate("movieId", ["name", "image", "trailerUrl"])
      .populate("userId", ["username", "email"])
      .exec();
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(400).json({
      message: "Don't find one",
    });
  }
};

export const remove = async (req, res) => {
  const filter = { _id: req.params.id };
  try {
    const comment = await Comment.findOneAndDelete(filter).exec();
    return res.status(200).json({
      message: "Delete Success",
      comment,
    });
  } catch (error) {
    return res.status(200).json({
      message: "Don't delete",
    });
  }
};

export const update = async (req, res) => {
  const filter = { _id: req.params.id };
  const doc = req.body;
  const option = { new: true };
  try {
    const comment = await Comment.findOneAndUpdate(filter, doc, option).exec();
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(400).json({
      message: "Không sửa được trạng thái!",
    });
  }
};
