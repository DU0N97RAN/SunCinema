import mongoose, { Schema } from "mongoose";

const ticketPriceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TicketPrice", ticketPriceSchema);
