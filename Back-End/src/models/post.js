import mongoose, { Schema, ObjectId } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    desc: {
        type: String,
    },
    imagesFile: {
        type: Array,
        default: []
    },
    slug: {
        type: String,
        lowercase: true,
        index: true,
    },
    status: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

export default mongoose.model("Post", postSchema)