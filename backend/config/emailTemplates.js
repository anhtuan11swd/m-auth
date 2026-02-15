// Email templates cho ứng dụng

// Template xác minh email
export const emailVerifyTemplate = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xác minh Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .otp-code {
            font-size: 32px;
            font-weight: bold;
            color: #4CAF50;
            text-align: center;
            margin: 30px 0;
            letter-spacing: 5px;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Xác minh Email của bạn</h1>
            <p>Xin chào {{email}},</p>
            <p>Cảm ơn bạn đã đăng ký tài khoản. Vui lòng sử dụng mã OTP dưới đây để xác minh email của bạn:</p>
        </div>

        <div class="otp-code">{{OTP}}</div>

        <p>Mã OTP này sẽ hết hạn trong 24 giờ. Nếu bạn không yêu cầu xác minh email này, vui lòng bỏ qua email này.</p>

        <div class="footer">
            <p>Nếu bạn gặp vấn đề với việc xác minh, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi.</p>
            <p>&copy; 2024 GreatStack. Tất cả quyền được bảo lưu.</p>
        </div>
    </div>
</body>
</html>
`;

// Template đặt lại mật khẩu
export const passwordResetTemplate = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đặt lại Mật khẩu</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .otp-code {
            font-size: 32px;
            font-weight: bold;
            color: #FF5722;
            text-align: center;
            margin: 30px 0;
            letter-spacing: 5px;
        }
        .warning {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Yêu cầu Đặt lại Mật khẩu</h1>
            <p>Xin chào {{email}},</p>
            <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Sử dụng mã OTP dưới đây để đặt lại mật khẩu:</p>
        </div>

        <div class="otp-code">{{OTP}}</div>

        <div class="warning">
            <strong>Lưu ý:</strong> Mã OTP này sẽ hết hạn trong 15 phút. Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này và đảm bảo mật khẩu của bạn an toàn.
        </div>

        <p>Nếu bạn không thể truy cập vào tài khoản hoặc gặp vấn đề khác, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi ngay lập tức.</p>

        <div class="footer">
            <p>&copy; 2024 GreatStack. Tất cả quyền được bảo lưu.</p>
        </div>
    </div>
</body>
</html>
`;
