const { Schema, default: mongoose } = require("mongoose");

const filmFormatShema = new Schema({
    name: {
        type: String,
        required: true
    },
    extraPrice: {
        type: Number,
        required: true
    }
}, {timestamps: true})

export default mongoose.model("FilmFormat", filmFormatShema)