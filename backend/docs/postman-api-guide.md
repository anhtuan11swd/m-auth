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

## Error Responses

| Status | Message | Cause |
|--------|---------|-------|
| 400 | Vui lòng điền đầy đủ thông tin | Missing fields |
| 400 | Email đã được sử dụng | Duplicate email (register) |
| 400 | Email không tồn tại | User not found (login) |
| 400 | Mật khẩu không đúng | Wrong password |
| 500 | Lỗi server | Server error |
