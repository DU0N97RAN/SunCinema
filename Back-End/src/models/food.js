import mongoose, { Schema } from "mongoose";

const foodChema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        required: true
    },
    image: {
        type: Array
    }
    // size: {
    //     type: Number,
    //     required: true
    // }
}, { timestamps: true })

export default mongoose.model("Food", foodChema)