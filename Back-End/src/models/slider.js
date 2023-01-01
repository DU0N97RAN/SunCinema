import mongoose, { Schema } from "mongoose";

const sliderSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        default:[]
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String, 
        required: true
    },
    slug:{
        type: String,
        lowercase: true,
        index: true
    }
}, {timestamps: true})

export default mongoose.model("Slider", sliderSchema)