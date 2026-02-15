import jwt from "jsonwebtoken";

// Middleware xác thực người dùng
const userAuth = async (req, res, next) => {
  try {
    // Lấy token từ cookies
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "Không có quyền truy cập. Vui lòng đăng nhập.",
        success: false,
      });
    }

    // Xác thực token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Khởi tạo req.body nếu chưa có
    if (!req.body) {
      req.body = {};
    }

    // Thêm userId vào request body
    req.body.userId = decoded.id;

    // Tiếp tục đến middleware/controller tiếp theo
    next();
  } catch (error) {
    console.error("Lỗi middleware xác thực:", error);
    return res.status(401).json({
      message: "Token không hợp lệ hoặc đã hết hạn",
      success: false,
    });
  }
};

export default userAuth;
