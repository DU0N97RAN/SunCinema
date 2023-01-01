import mongoose, { get, Schema } from "mongoose";

const voucherSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    condition: {
        type: Number,
        required: true
    },
    conditionNumber: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    timeStart: {
        type: Date,
    },
    timeEnd: {
        type: Date
    },
    content: {
        type: String,
    },
    thumbnail: {
        type: String
    },
    imagesFile: {
        type: Array,
        default: []
    },
    voucherKey: {
        type: String
    },
    voucherVal: {
        type: Number
    },
    voucherLimit: {
        type: Number
    },
    userId: [
        {
            type: mongoose.ObjectId,
            ref: "User"
        }
    ],
    name: {
        type: String
    },
    shortDesc:{
        type: String
    }
}, { timestamps: true })

export default mongoose.model("Voucher", voucherSchema)