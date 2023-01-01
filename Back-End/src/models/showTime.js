import mongoose, { Schema, ObjectId } from "mongoose";

const showTimeSchema = new Schema(
  {
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
    },
    movieId:
    {
      type: mongoose.ObjectId,
      ref: "Movie",
      required: true,
    },
    roomId: [
      {
        type: mongoose.ObjectId,
        ref: "Room",
        required: true,
      },
    ],
    date: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ShowTime", showTimeSchema);
