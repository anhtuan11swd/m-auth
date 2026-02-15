# M-Auth - Hệ Thống Xác Thực MERN

Hệ thống xác thực full-stack được xây dựng với MERN stack (MongoDB, Express, React, Node.js) với tính năng xác thực dựa trên JWT, xác thực email và chức năng đặt lại mật khẩu.

## Tính Năng

### Xác Thực
- Đăng ký ngườii dùng với email/mật khẩu
- Đăng nhập ngườii dùng với token JWT (lưu trong cookie HTTP-only)
- Đăng xuất ngườii dùng
- Middleware bảo vệ route

### Tính Năng Email
- Xác thực email qua OTP
- Đặt lại mật khẩu qua OTP
- Tích hợp SMTP email sử dụng Brevo (Sendinblue)

### Quản Lý Ngườii Dùng
- Lấy thông tin hồ sơ ngườii dùng
- Trạng thái xác thực tài khoản
- Kiểm tra trạng thái đăng nhập

## Công Nghệ Sử Dụng

### Backend
- **Node.js** với **Express.js** - Framework server
- **MongoDB** với **Mongoose** - Cơ sở dữ liệu
- **JWT** (jsonwebtoken) - Token xác thực
- **bcryptjs** - Mã hóa mật khẩu
- **cookie-parser** - Xử lý cookie
- **cors** - Chia sẻ tài nguyên cross-origin
- **nodemailer** - Gửi email
- **dotenv** - Biến môi trường

### Frontend
- **React 19** - Thư viện UI
- **Vite** - Công cụ build
- **React Router DOM** - Routing client-side
- **Axios** - HTTP client
- **Tailwind CSS** - CSS framework
- **React Toastify** - Thông báo
- **React Icons** - Thư viện icon

### Công Cụ Phát Triển
- **Biome** - Lint và format code
- **ESLint** - Kiểm tra code
- **Nodemon** - Tự động restart server phát triển

## Cấu Trúc Dự Án

```
m-auth/
├── backend/
│   ├── config/           # File cấu hình
│   │   ├── mongodb.js    # Kết nối database
│   │   ├── nodemailer.js # Cấu hình email
│   │   └── emailTemplates.js # Template email
│   ├── controllers/      # Controllers
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middlewares/      # Middleware tùy chỉnh
│   │   └── userAuth.js   # Middleware xác thực
│   ├── models/           # Models Mongoose
│   │   └── userModel.js
│   ├── routes/           # Routes API
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── .env              # Biến môi trường
│   ├── .env.example      # Mẫu biến môi trường
│   └── server.js         # Điểm vào
│
└── frontend/
    ├── src/
    │   ├── components/   # Components React
    │   │   ├── Header.jsx
    │   │   └── Navbar.jsx
    │   ├── context/      # React context
    │   │   └── AppContext.jsx
    │   ├── pages/        # Page components
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── EmailVerify.jsx
    │   │   └── ResetPassword.jsx
    │   ├── assets/       # Tài nguyên tĩnh
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── vite.config.js
```

## API Endpoints

### Routes Xác Thực (`/api/auth`)
| Method | Endpoint | Mô Tả | Yêu Cầu Auth |
|--------|----------|-------|--------------|
| POST | `/register` | Đăng ký ngườii dùng mới | Không |
| POST | `/login` | Đăng nhập ngườii dùng | Không |
| POST | `/logout` | Đăng xuất ngườii dùng | Không |
| POST | `/send-verify-otp` | Gửi OTP xác thực | Có |
| POST | `/verify-account` | Xác thực email bằng OTP | Có |
| GET | `/is-auth` | Kiểm tra trạng thái đăng nhập | Có |
| POST | `/send-reset-otp` | Gửi OTP đặt lại mật khẩu | Không |
| POST | `/reset-password` | Đặt lại mật khẩu bằng OTP | Không |

### Routes Ngườii Dùng (`/api/user`)
| Method | Endpoint | Mô Tả | Yêu Cầu Auth |
|--------|----------|-------|--------------|
| GET | `/data` | Lấy dữ liệu ngườii dùng | Có |

## Hướng Dẫn Cài Đặt

### Yêu Cầu
- Node.js (v18 trở lên)
- Tài khoản MongoDB Atlas hoặc MongoDB local
- Tài khoản Brevo (Sendinblue) cho dịch vụ email

### Cài Đặt

1. Clone repository:
```bash
git clone <repository-url>
cd m-auth
```

2. Cài đặt dependencies backend:
```bash
cd backend
npm install
```

3. Cài đặt dependencies frontend:
```bash
cd ../frontend
npm install
```

4. Thiết lập biến môi trường:
```bash
cd ../backend
cp .env.example .env
```

Chỉnh sửa file `.env` với thông tin của bạn:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

# Cấu hình SMTP Brevo
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_brevo_username
SMTP_PASSWORD=your_brevo_password
SENDER_EMAIL=your_sender_email@example.com
```

5. Thiết lập môi trường frontend:
```bash
cd ../frontend
echo "VITE_BACKEND_URL=http://localhost:4000" > .env
```

### Chạy Ứng Dụng

1. Khởi động server backend:
```bash
cd backend
npm run dev
```
Server sẽ chạy tại http://localhost:4000

2. Khởi động server phát triển frontend:
```bash
cd frontend
npm run dev
```
Frontend sẽ chạy tại http://localhost:5173

## Luồng Xác Thực

1. **Đăng ký**: Ngườii dùng đăng ký với tên, email và mật khẩu
2. **Đăng nhập**: Ngườii dùng đăng nhập và nhận token JWT trong cookie HTTP-only
3. **Xác thực Email**: Ngườii dùng yêu cầu OTP → OTP gửi qua email → Ngườii dùng xác thực bằng OTP
4. **Đặt lại mật khẩu**: Ngườii dùng yêu cầu OTP đặt lại → OTP gửi qua email → Ngườii dùng đặt lại mật khẩu bằng OTP
5. **Routes được bảo vệ**: Middleware kiểm tra token JWT cho các endpoint được bảo vệ

## Scripts Có Sẵn

### Backend
- `npm start` - Khởi động server production
- `npm run dev` - Khởi động server phát triển với nodemon
- `npm run lint` - Chạy Biome linter
- `npm run format` - Format code với Biome
- `npm run check` - Kiểm tra và sửa code với Biome

### Frontend
- `npm run dev` - Khởi động server phát triển
- `npm run build` - Build cho production
- `npm run preview` - Xem trước bản production
- `npm run lint` - Chạy ESLint
- `npm run lint:fix` - Sửa lỗi ESLint
- `npm run format` - Format code với Biome

## Tính Năng Bảo Mật

- Cookie HTTP-only cho lưu trữ JWT
- Mã hóa mật khẩu với bcryptjs
- Cấu hình CORS cho các origin được phép
- Middleware bảo vệ route
- Xác thực email dựa trên OTP
- Bảo vệ biến môi trường

## Giấy Phép

ISC

## Tác Giả

Trần Anh Tuấn
