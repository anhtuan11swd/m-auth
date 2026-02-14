import userModel from "../models/userModel.js";

// Lấy dữ liệu ngườii dùng
export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;

    // Tìm ngườii dùng trong database
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy ngườii dùng",
        success: false,
      });
    }

    // Trả về thông tin ngườii dùng (không bao gồm mật khẩu)
    return res.status(200).json({
      success: true,
      userData: {
        email: user.email,
        isAccountVerified: user.isAccountVerified,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Lỗi lấy dữ liệu ngườii dùng:", error);
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
    });
  }
};
