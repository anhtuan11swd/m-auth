import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import connectDB from "./config/mongodb.js";

const app = express();

// Middleware
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json());

// Routes
app.get("/", (_req, res) => {
  res.json({ message: "API đang hoạt động" });
});

const PORT = 4000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server chạy trên port ${PORT}`);
});
