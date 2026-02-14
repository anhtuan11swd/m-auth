# Auth API - Postman Testing Guide

## Base URL
```
http://localhost:4000/api/auth
```

## 1. Register

**Method:** POST  
**Endpoint:** `/register`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Đăng ký thành công"
}
```

**Cookie Set:** `token` (httpOnly, 7 days)

---

## 2. Login

**Method:** POST  
**Endpoint:** `/login`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Đăng nhập thành công"
}
```

**Cookie Set:** `token` (httpOnly, 7 days)

---

## 3. Logout

**Method:** POST  
**Endpoint:** `/logout`

**Headers:**
```
Content-Type: application/json
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Đã đăng xuất"
}
```

**Cookie Cleared:** `token`

---

## Postman Configuration

### Enable Cookie Handling
1. Go to **Settings** → **General**
2. Enable **"Send cookies automatically"**
3. Enable **"Store cookies across requests"**

### Test Collection Structure
```
Auth API
├── Register
├── Login
└── Logout
```

### Environment Variables (Optional)
| Variable | Value |
|----------|-------|
| base_url | http://localhost:4000 |

---

## 4. Send Verify OTP

**Method:** POST  
**Endpoint:** `/send-verify-otp`

**Headers:**
```
Content-Type: application/json
```

**Cookie Required:** `token` (from login/register)

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Đã gửi OTP xác thực"
}
```

**Email Sent:** OTP code to user's email

---

## 5. Verify Account

**Method:** POST  
**Endpoint:** `/verify-account`

**Headers:**
```
Content-Type: application/json
```

**Cookie Required:** `token` (from login/register)

**Body (raw JSON):**
```json
{
  "otp": "123456"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Email đã được xác thực"
}
```

---

## Postman Configuration

### Enable Cookie Handling
1. Go to **Settings** → **General**
2. Enable **"Send cookies automatically"**
3. Enable **"Store cookies across requests"**

### Test Collection Structure
```
Auth API
├── Register
├── Login
├── Logout
├── Send Verify OTP
└── Verify Account
```

### Environment Variables (Optional)
| Variable | Value |
|----------|-------|
| base_url | http://localhost:4000 |

---

## Error Responses

| Status | Message | Cause |
|--------|---------|-------|
| 400 | Vui lòng điền đầy đủ thông tin | Missing fields |
| 400 | Email đã được sử dụng | Duplicate email (register) |
| 400 | Email không tồn tại | User not found (login) |
| 400 | Mật khẩu không đúng | Wrong password |
| 400 | Tài khoản đã được xác thực | Already verified |
| 400 | Mã OTP không hợp lệ | Invalid OTP |
| 400 | Mã OTP đã hết hạn | OTP expired |
| 401 | Không có quyền truy cập | No token / Invalid token |
| 404 | Không tìm thấy ngườii dùng | User not found |
| 500 | Lỗi server | Server error |
