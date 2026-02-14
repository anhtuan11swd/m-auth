import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Đăng ký người dùng mới
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Xác thực dữ liệu đầu vào
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Vui lòng điền đầy đủ thông tin",
        success: false,
      });
    }

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email đã được sử dụng",
        success: false,
      });
    }

    // Mã hóa mật khẩu bằng bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới trong cơ sở dữ liệu
    const user = new userModel({
      email,
      name,
      password: hashedPassword,
    });
    await user.save();

    // Tạo token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Gửi token qua cookie httpOnly
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(201).json({
      message: "Đăng ký thành công",
      success: true,
    });
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
    });
  }
};

// Đăng nhập người dùng
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Xác thực dữ liệu đầu vào
    if (!email || !password) {
      return res.status(400).json({
        message: "Vui lòng điền đầy đủ thông tin",
        success: false,
      });
    }

    // Tìm người dùng theo email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email không tồn tại",
        success: false,
      });
    }

    // So sánh mật khẩu bằng bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Mật khẩu không đúng",
        success: false,
      });
    }

    // Tạo token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Gửi token qua cookie httpOnly
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "Đăng nhập thành công",
      success: true,
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
    });
  }
};

// Đăng xuất người dùng
export const logout = async (_req, res) => {
  try {
    // Xóa cookie token
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "Đã đăng xuất",
      success: true,
    });
  } catch (error) {
    console.error("Lỗi đăng xuất:", error);
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
    });
  }
};
