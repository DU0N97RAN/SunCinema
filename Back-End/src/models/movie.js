import mongoose, { Schema, ObjectId } from "mongoose";

const movieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    runTime: {
      type: Number,
      required: true,
    },
    ageLimit: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    languages: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    actor: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    movieTypeId: [{
      type: mongoose.ObjectId,
      ref: "MovieType",
    }],
    trailerUrl: {
      type: String,
    },
    slug: {
      type: String,
      lowercase: true,
      index: true,
    },
    image: {
      type: Array,
      required: true,
    },
    profit: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);
movieSchema.index({ "$**": "text" });
export default mongoose.model("Movie", movieSchema);
