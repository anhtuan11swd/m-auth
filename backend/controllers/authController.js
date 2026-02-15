import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  emailVerifyTemplate,
  passwordResetTemplate,
} from "../config/emailTemplates.js";
import transporter from "../config/nodemailer.js";
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

    // Gửi email chào mừng
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      subject: "Chào mừng đến với GreatStack",
      text: `Chào mừng! Tài khoản của bạn: ${email}`,
      to: email,
    };
    await transporter.sendMail(mailOptions);

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

// Gửi OTP xác thực
export const sendVerifyOTP = async (req, res) => {
  try {
    const { userId } = req.body;

    // Tìm ngườii dùng
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy ngườii dùng",
        success: false,
      });
    }

    // Kiểm tra đã xác thực chưa
    if (user.isAccountVerified) {
      return res.status(400).json({
        message: "Tài khoản đã được xác thực",
        success: false,
      });
    }

    // Tạo OTP 6 chữ số
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Lưu OTP và thờii gian hết hạn (24 giờ)
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    // Gửi email chứa OTP
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      html: emailVerifyTemplate
        .replace("{{OTP}}", otp)
        .replace("{{email}}", user.email),
      subject: "Account Verification OTP",
      to: user.email,
    };
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Đã gửi OTP xác thực",
      success: true,
    });
  } catch (error) {
    console.error("Lỗi gửi OTP:", error);
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
    });
  }
};

// Xác thực email bằng OTP
export const verifyEmail = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    // Tìm ngườii dùng
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy ngườii dùng",
        success: false,
      });
    }

    // Kiểm tra OTP có khớp không
    if (user.verifyOtp !== otp || user.verifyOtp === "") {
      return res.status(400).json({
        message: "Mã OTP không hợp lệ",
        success: false,
      });
    }

    // Kiểm tra OTP đã hết hạn chưa
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({
        message: "Mã OTP đã hết hạn",
        success: false,
      });
    }

    // Đánh dấu tài khoản đã xác thực
    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    return res.status(200).json({
      message: "Email đã được xác thực",
      success: true,
    });
  } catch (error) {
    console.error("Lỗi xác thực email:", error);
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
    });
  }
};

// Kiểm tra trạng thái đăng nhập
export const isAuthenticated = async (_req, res) => {
  try {
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Lỗi kiểm tra xác thực:", error);
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
    });
  }
};

// Gửi OTP đặt lại mật khẩu
export const sendResetOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Kiểm tra email
    if (!email) {
      return res.status(400).json({
        message: "Vui lòng cung cấp email",
        success: false,
      });
    }

    // Tìm ngườii dùng theo email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy ngườii dùng",
        success: false,
      });
    }

    // Tạo OTP 6 chữ số
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Lưu OTP và thờii gian hết hạn (15 phút)
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    // Gửi email chứa OTP
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      html: passwordResetTemplate
        .replace("{{OTP}}", otp)
        .replace("{{email}}", user.email),
      subject: "Password Reset OTP",
      to: email,
    };
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "OTP đã được gửi",
      success: true,
    });
  } catch (error) {
    console.error("Lỗi gửi OTP đặt lại mật khẩu:", error);
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
    });
  }
};

// Đặt lại mật khẩu
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        message: "Vui lòng điền đầy đủ thông tin",
        success: false,
      });
    }

    // Tìm ngườii dùng theo email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy ngườii dùng",
        success: false,
      });
    }

    // Kiểm tra OTP có khớp không
    if (user.resetOtp !== otp || user.resetOtp === "") {
      return res.status(400).json({
        message: "Mã OTP không hợp lệ",
        success: false,
      });
    }

    // Kiểm tra OTP đã hết hạn chưa
    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({
        message: "Mã OTP đã hết hạn",
        success: false,
      });
    }

    // Mã hóa mật khẩu mớii
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu và xóa OTP
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    return res.status(200).json({
      message: "Mật khẩu đã được đặt lại",
      success: true,
    });
  } catch (error) {
    console.error("Lỗi đặt lại mật khẩu:", error);
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
    });
  }
};
