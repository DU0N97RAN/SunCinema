import Movie from "../models/movie";
import MovieType from "../models/movieType";
import Comment from "../models/comment";
import slugify from "slugify";

export const create = async (req, res) => {
  req.body.slug = slugify(req.body.name);
  try {
    const existMovie = await Movie.findOne({ name: req.body.name }).exec();
    if (existMovie) {
      return res.status(500).json({
        message: "Phim đã tồn tại",
      });
    }
    const movie = await new Movie(req.body).save();
    return res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({
      message: `Don't create, ${error}`,
    });
  }
};

export const list = async (req, res) => {
  try {
    const movie = await Movie.find({}).populate(["movieTypeId"]).exec();
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(400).json({
      message: "Not Found Movie",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.id }).exec();
    const movieType = movie.movieTypeId.map((item) => item);
    const nameMovieType = await MovieType.find({ _id: movieType }).exec();
    return res.status(200).json({
      movie,
      nameMovieType: nameMovieType.map((a) => a.movieName),
    });
  } catch (error) {
    return res.status(400).json({
      message: ` Not Found Movie , ${error}`,
    });
  }
};

export const getSlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const movie = await Movie.findOne({ slug }).exec();
    const movieType = movie.movieTypeId.map((item) => item);
    const nameMovieType = await MovieType.find({ _id: movieType }).exec();
    const comment = await Comment.find({ movieId: movie._id })
      .populate("userId", ["username", "email", "avatar"])
      .exec();
    return res.status(200).json({
      movie,
      nameMovieType: nameMovieType.map((a) => a.movieName),
      comment,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Not Found Movie",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const movie = await Movie.findOneAndRemove({ _id: req.params.id }).exec();
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(400).json({
      message: "Not Found Movie",
    });
  }
};

export const searchByMovieName = async (req, res) => {
  try {
    const searchString = req.query.q ? req.query.q : "";
    const result = await Movie.find({
      name: new RegExp(searchString, "i"),
    }).populate(["movieTypeId"]).exec();
    res.json(result);
  } catch (error) {
    res.status(400).json({
      message: `don't find, ${error}`,
    });
  }
};

export const update = async (req, res) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).populate(["movieTypeId"]).exec();
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(400).json({
      message: "Don't update Movie",
    });
  }
};

export const pagination = async (req, res) => {
  const pageSize = 10;
  const page = req.query.page;
  if (page) {
    const skip = (page - 1) * pageSize;
    try {
      const paginate = await Movie.find({}).skip(skip).limit(pageSize);
      return res.status(200).json(paginate);
    } catch (error) {
      return res.status(400).json({
        message: "Don't find",
      });
    }
  }
};
