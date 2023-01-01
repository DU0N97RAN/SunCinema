import mongoose, { Schema, ObjectId } from "mongoose";

const seatSchema = new Schema(
  {
    column: {
      type: Number,
      required: true,
    },
    row: {
      type: String,
      required: true,
      minLength: 1,
    },
    status: {
      type: Number,
      default: 0,
    },
    roomId: {
      type: mongoose.ObjectId,
      ref: "Room",
      required: true
    },
    seatTypeId: {
      type: mongoose.ObjectId,
      ref: "SeatType",
      required: true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Seat", seatSchema);
