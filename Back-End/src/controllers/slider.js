import slugify from "slugify"
import Slider from "../models/slider"

export const create = async (req, res) => {
    req.body.slug = slugify(req.body.title)
    try {
        const slider = await Slider(req.body).save()
        res.status(200).json(slider)
    } catch (error) {
        res.status(400).json({
            message: `Don't create, ${error}`
        })
    }
}

export const list = async (req, res) => {
    try {
        const slider = await Slider.find({}).exec()
        res.status(200).json(slider)
    } catch (error) {
        res.status(400).json({
            message: `Don't find, ${error}`
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const slider = await Slider.findOne({_id: req.params.id}).exec()
        res.status(200).json(slider)
    } catch (error) {
        res.status(400).json({
            message: `Don't find, ${error}`
        })
    }
}

export const getSlug = async (req, res) => {
    try {
        const slider = await Slider.findOne({slug: req.params.slug}).exec()
        res.status(200).json(slider)
    } catch (error) {
        res.status(400).json({
            message: `Don't find, ${error}`
        })
    }
}

export const remove = async (req, res) => {
    try {
        const slider = await Slider.findOneAndRemove({_id: req.params.id}).exec()
        res.status(200).json(slider)
    } catch (error) {
        res.status(400).json({
            message: `Don't find, ${error}`
        })
    }
}

export const update = async (req, res) => {
    req.body.slug = slugify(req.body.title)
    try {
        const slider = await Slider.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).exec()
        res.status(200).json(slider)
    } catch (error) {
        res.status(400).json({
            message: `Don't find, ${error}`
        })
    }
}