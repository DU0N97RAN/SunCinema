import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 5,
    },
    slug:{
      type: String,
      lowercase: true,
      index: true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
