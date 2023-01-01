import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      min: 0.5,
      max: 5,
      required: true,

    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
