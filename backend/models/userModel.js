import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
  },
  isAccountVerified: {
    default: false,
    type: Boolean,
  },
  name: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  resetOtp: {
    default: "",
    type: String,
  },
  resetOtpExpireAt: {
    default: 0,
    type: Number,
  },
  verifyOtp: {
    default: "",
    type: String,
  },
  verifyOtpExpireAt: {
    default: 0,
    type: Number,
  },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
