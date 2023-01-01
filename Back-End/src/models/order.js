import mongoose, { Schema } from "mongoose";
import shortid from "shortid";

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderCode: {
      type: String,
    },
    shortId: {
      type: String
    },
    qrCode: {
      type: String,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    foodDetailId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodDetail",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
