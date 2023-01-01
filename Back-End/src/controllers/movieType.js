import MovieType from "../models/movieType";
import Movie from "../models/movie";

export const create = async (req, res) => {
  try {
    const exitMovieType = await MovieType.findOne({ movieName: req.body.movieName }).exec();
    if (exitMovieType) {
      return res.status(500).json("Thể loại phim đã tồn tại");
    }
    const movieType = await new MovieType(req.body).save();
    res.json(movieType);
  } catch (error) {
    res.status(400).json({
      message: "don't create",
    });
  }
};

export const read = async (req, res) => {
  try {
    const movieType = await MovieType.findOne({ _id: req.params.id }).exec();
    res.json(movieType);
  } catch (error) {
    res.status(400).json({
      message: "don't find",
    });
  }
};

export const list = async (req, res) => {
  try {
    const movieType = await MovieType.find({}).exec();
    res.json(movieType);
  } catch (error) {
    res.status(400).json({
      message: "don't find",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const movieType = await MovieType.findOneAndDelete({
      _id: req.params.id,
    }).exec();
    res.json(movieType);
  } catch (error) {
    res.status(400).json({
      message: "don't find",
    });
  }
};

export const update = async (req, res) => {
  try {
    const movieType = await MovieType.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.json(movieType);
  } catch (error) {
    res.status(400).json({
      message: "don't find",
    });
  }
};

export const readMovieOfMovieType = async (req, res) => {
  try {
    const movieTypeId = await MovieType.findById({ _id: req.params.id }).exec();
    const movies = await Movie.find({ movieTypeId })
      .select("-movieTypeId")
      .exec();
    return res.status(200).json({
      movieTypeId,
      movies,
    });
  } catch (error) {
    return res.status(400).json({
      message: "don't find",
    });
  }
};


export const searchByGenre = async (req, res) => {
  try {
    const searchString = req.query.q ? req.query.q : "";
    const result = await MovieType.find({ movieName: new RegExp(searchString, "i") }).exec();
    res.json(result)
  } catch (error) {
    res.status(400).json({
      message: `don't find, ${error}`
    })
  }
}

export const getNameById = async (req, res) => {
  try {
    const name = await MovieType.findOne({_id: req.params.id}).exec()
    res.status(200).json({
      name: name.movieName
    })
  } catch (error) {
    res.status(400).json({
      message: `don't find, ${error}`
    })
  }
}