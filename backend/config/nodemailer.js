import nodemailer from "nodemailer";

// Tạo transporter với Brevo SMTP
const transporter = nodemailer.createTransport({
  auth: {
    pass: process.env.SMTP_PASSWORD,
    user: process.env.SMTP_USER,
  },
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true cho 465, false cho các port khác
});

export default transporter;
