import mongoose, { Schema, ObjectId } from "mongoose";

const ticketDetailSChema = new Schema({
    ticketId: {
        type: mongoose.ObjectId,
        ref: "Ticket",
    },
    seatId: {
        type: mongoose.ObjectId,
        ref: "Seat",
        required: true
    },
    showTimeId: {
        type: mongoose.ObjectId,
        ref: "ShowTime",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    expireAt: {
        type: Date,
        expires: "9m",
    }
}, { timestamps: true })

export default mongoose.model("TicketDetail", ticketDetailSChema)