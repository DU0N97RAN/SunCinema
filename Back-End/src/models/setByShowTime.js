import mongoose, { Schema, ObjectId } from "mongoose";

const setByShowTimeSchema = new Schema(
  {
    seats: {
      type: Object,
      required: true,
    },
    showTimeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShowTime",
    },
    movieId:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    }
    ,
    roomId:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    }

  },
  { timestamps: true }
);

export default mongoose.model("SetByShowTime", setByShowTimeSchema);
