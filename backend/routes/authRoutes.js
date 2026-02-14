import express from "express";
import {
  isAuthenticated,
  login,
  logout,
  register,
  resetPassword,
  sendResetOTP,
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

// Route kiểm tra trạng thái đăng nhập
authRouter.get("/is-auth", userAuth, isAuthenticated);

// Route gửi OTP đặt lại mật khẩu
authRouter.post("/send-reset-otp", sendResetOTP);

// Route đặt lại mật khẩu
authRouter.post("/reset-password", resetPassword);

export default authRouter;
