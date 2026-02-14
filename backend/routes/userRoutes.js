import express from "express";
import { getUserData } from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";

const userRouter = express.Router();

// Route lấy thông tin ngườii dùng
userRouter.get("/data", userAuth, getUserData);

export default userRouter;
