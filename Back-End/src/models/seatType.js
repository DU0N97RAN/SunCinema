import mongoose, { Schema } from "mongoose";

const seatTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
    },
    extraPrice: {
        type: Number,
        required: true
    },
    color: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model("SeatType", seatTypeSchema)