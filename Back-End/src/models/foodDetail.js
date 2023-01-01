import mongoose, { Schema, ObjectId } from "mongoose";

const foodDetailSchema = new Schema({
    food: [{
        foodId: {
            type: mongoose.ObjectId,
            ref: "Food",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export default mongoose.model("FoodDetail", foodDetailSchema)