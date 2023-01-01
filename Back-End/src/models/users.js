import mongoose from "mongoose";
import crypto from "crypto";
import * as uuid from "uuid";

const userSchema = mongoose.Schema({
  fullname: {
    type: String
  },
  googleId: {
    type: String
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  avatar: {
    type: Array
  },
  phone: {
    type: String,
  },
  address: {
    type: String
  },
  gender: {
    type: Number,
    default: 0
  },
  role: {
    type: Number,
    default: 0
  },
  salt: {
    type: String
  },
  status: {
    type: Number,
    default: 0
  },
  dob: {
    type: Date
  }
}, { timestamps: true });

userSchema.methods = {
  passwordAuthenticate(password) {
    return this.password === this.passwordEncode(password);
  },
  passwordEncode(password) {
    if (!password) return
    try {
      return crypto.createHmac("sha256", this.salt).update(password).digest('hex');
    } catch (error) {
      console.log(error);
    }
  }
}

userSchema.pre("save", function (next) {
  this.salt = uuid.v4();
  this.password = this.passwordEncode(this.password);
  next();
});

export default mongoose.model("User", userSchema)