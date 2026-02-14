import express from "express";
import { login, logout, register } from "../controllers/authController.js";

const authRouter = express.Router();

// Route đăng ký
authRouter.post("/register", register);

// Route đăng nhập
authRouter.post("/login", login);

// Route đăng xuất
authRouter.post("/logout", logout);

export default authRouter;
