import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

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
app.listen(PORT, () => {
  console.log(`Server chạy trên port ${PORT}`);
});
