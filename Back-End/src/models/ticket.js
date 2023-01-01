import mongoose, { Schema, ObjectId } from "mongoose";

const ticketSchema = new Schema(
  {
    totalPrice: {
      type: Number,
      required: true,
    },
    // showTimeId: {
    //   type: mongoose.ObjectId,
    //   ref: "ShowTime",
    // },
    quantity: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: 0,
    },
    expireAt: {
      type: Date,
      expires: "9m",
    }
  }, { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
