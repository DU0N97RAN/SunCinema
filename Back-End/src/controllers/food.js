import Food from "../models/food"
import FoodDetail from "../models/foodDetail"

export const create = async (req, res) => {
    try {
        const existFood = await Food.findOne({name: req.body.name}).exec()
        if(existFood){
            return res.status(500).json({
                messsage:"Đồ ăn đã tồn tại"
            })
        }
        const food = await new Food(req.body).save()
        res.json(food)
    } catch (error) {
        res.status(400).json({
            messsage: "Don't create"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const food = await Food.findOne({_id: req.params.id}).exec()
        res.json(food)
    } catch (error) {
        res.status(400).json({
            messsage: "Not find"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const food = await Food.find({}).exec()
        res.json(food)
    } catch (error) {
        res.status(400).json({
            messsage: "Not find"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const food = await Food.findOneAndRemove({_id: req.params.id}).exec()
        res.json(food)
    } catch (error) {
        res.status(400).json({
            messsage: "Not find"
        })
    }
}

export const update = async (req, res) => {
    try {
        const food = await Food.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).exec()
        res.json(food)
    } catch (error) {
        res.status(400).json({
            messsage: "Not find"
        })
    }
}

export const foodDetailByFood = async (req, res) => {
    try {
        const food = await Food.findOne({_id: req.params.id}).exec()
        const foodDetail = await FoodDetail.find({foodId:food}).select("-foodId").exec()
        res.json({
            food,
            foodDetail
        })
    } catch (error) {
        res.status(400).json({ 
            messsage: "Not find"
         })
    }
}