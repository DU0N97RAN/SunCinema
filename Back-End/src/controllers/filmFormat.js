import FilmFormat from "../models/filmFormat"

export const create = async (req, res) => {
    try {
        const existFilmFormat = await FilmFormat.findOne({ name: req.body.name }).exec();
        if (existFilmFormat) {
        return res.status(500).json("FilmFormat phim đã tồn tại");
    }
        const filmFormat = await new FilmFormat(req.body).save()
        res.json(filmFormat)
    } catch (error) {
        res.status(400).json({
            message: "Don't create"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const filmFormat = await FilmFormat.findOne({_id: req.params.id}).exec()
        res.json(filmFormat)
    } catch (error) {
        res.status(400).json({
            message: "Not find"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const filmFormat = await FilmFormat.find({}).exec()
        res.json(filmFormat)
    } catch (error) {
        res.status(400).json({
            message: "Not find"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const filmFormat = await FilmFormat.findOneAndRemove({_id: req.params.id}).exec()
        res.json(filmFormat)
    } catch (error) {
        res.status(400).json({
            message: "Not find"
        })
    }
}

export const update = async (req, res) => {
    try {
        const filmFormat = await FilmFormat.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}).exec()
        res.json(filmFormat)
    } catch (error) {
        res.status(400).json({
            message: "Not find"
        })
    }
}
