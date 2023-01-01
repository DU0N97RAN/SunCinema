import mongoose, { Schema } from "mongoose";

const webConfigSchema = new Schema({
  logo: {
    type: Array,
    required: true,
  },
  address: [
    {
      text: { type: String },
      iframe: { type: String }
    }
  ],
  social: [
    {
      name: { type: String },
      text: { type: String }
    }
  ],
  phone: {
    type: Array,
    required: true,
  },
  storeName: {
    type: String,
    required: true
  },
  isMaintaince: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model("webConfig", webConfigSchema)