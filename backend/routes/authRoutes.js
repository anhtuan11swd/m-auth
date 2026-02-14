import express from "express";
import {
  login,
  logout,
  register,
  sendVerifyOTP,
  verifyEmail,
} from "../controllers/authController.js";
import userAuth from "../middlewares/userAuth.js";

const authRouter = express.Router();

// Route đăng ký
authRouter.post("/register", register);

// Route đăng nhập
authRouter.post("/login", login);

// Route đăng xuất
authRouter.post("/logout", logout);

// Route gửi OTP xác thực
authRouter.post("/send-verify-otp", userAuth, sendVerifyOTP);

// Route xác thực email
authRouter.post("/verify-account", userAuth, verifyEmail);

export default authRouter;
