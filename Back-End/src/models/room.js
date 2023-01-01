import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 20,
    },
    rows: {
      type: Number,
      required: true,
      min: 1,
      max: 99,
    },
    columns: {
      type: Number,
      required: true,
      min: 1,
      max: 99,
    },
    formatId: {
      type: mongoose.ObjectId,
      ref: "FilmFormat"
    },
    // seatBlock: {
    //   type: Number,
    // },
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
