import mongoose, { Schema } from "mongoose";

const movieTypeSchema = new Schema({
    movieName: {
        type: String,
        required:true,
        index: true
    }
}, {timestamps:true})

movieTypeSchema.index({ "$**": 'text' })
export default mongoose.model('MovieType', movieTypeSchema)