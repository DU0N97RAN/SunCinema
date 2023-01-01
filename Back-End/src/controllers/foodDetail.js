import FoodDetail from "../models/foodDetail"

export const create = async (req, res) => {
    try {
        const totalPrice = req.body.reduce((total, currentValue) => {
            return total + currentValue.price
        }, 0);
        const foodDetail = await new FoodDetail({ food: req.body, totalPrice },).save();
        await FoodDetail.populate(foodDetail.food, { path: "foodId" });
        res.json(foodDetail)
    } catch (error) {
        res.status(400).json({
            message: "Don't create"
        })
    }
}

export const list = async (req, res) => {
    try {
        const foodDetail = await FoodDetail.find({}).populate({ path: "food", populate: "foodId" }).exec()
        res.json(foodDetail)
    } catch (error) {
        res.status(400).json({
            message: "Not Find"
        })
    }
}

export const read = async (req, res) => {
    try {
        const foodDetail = await FoodDetail.findOne({ _id: req.params.id }).populate({ path: "food", populate: "foodId" }).exec()
        res.json(foodDetail)
    } catch (error) {
        res.status(400).json({
            message: "Not Find"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const foodDetail = await FoodDetail.findOneAndRemove({ _id: req.params.id }).exec()
        res.json(foodDetail)
    } catch (error) {
        res.status(400).json({
            message: "Not Find"
        })
    }
}

export const update = async (req, res) => {
    try {
        const foodDetail = await FoodDetail.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).populate({ path: "food", populate: "foodId" }).exec()
        res.json(foodDetail)
    } catch (error) {
        res.status(400).json({
            message: "Not Find"
        })
    }
}