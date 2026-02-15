import axios from "axios";
import { useContext, useRef, useState } from "react";
import { FaArrowLeft, FaEnvelope, FaLock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-reset-otp`,
        { email },
      );
      if (data.success) {
        setIsEmailSent(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/reset-password`,
        {
          email,
          newPassword,
          otp,
        },
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-200 via-purple-300 to-pink-200 min-h-screen">
      {/* Back to Home Button */}
      <button
        aria-label="Quay về trang chủ"
        className="top-4 sm:top-6 left-4 sm:left-6 absolute bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 sm:p-3 rounded-full text-slate-700 hover:scale-105 transition-all duration-200 cursor-pointer"
        onClick={() => navigate("/")}
        type="button"
      >
        <FaArrowLeft className="w-5 sm:w-6 h-5 sm:h-6" />
      </button>

      {/* Logo */}
      <button
        aria-label="Logo - Quay về trang chủ"
        className="group top-4 sm:top-6 right-4 sm:right-6 absolute cursor-pointer bg-transparent border-none p-0"
        onClick={() => navigate("/")}
        type="button"
      >
        <img
          alt="M-Auth Logo"
          className="w-12 sm:w-16 h-12 sm:h-16 group-hover:scale-110 transition-transform duration-200"
          src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
        />
      </button>

      {/* Email Input Form */}
      {!isEmailSent && (
        <form
          aria-labelledby="email-form-title"
          className="bg-white/90 shadow-xl backdrop-blur-md mx-4 p-8 rounded-2xl w-full max-w-md text-sm"
          onSubmit={onSubmitEmail}
        >
          <h1
            className="mb-2 font-bold text-slate-800 text-2xl sm:text-3xl text-center"
            id="email-form-title"
          >
            Đặt lại Mật khẩu
          </h1>
          <p className="mb-6 text-slate-500 text-center">
            Nhập email của bạn để nhận mã OTP đặt lại mật khẩu
          </p>
          <div className="mb-6">
            <label
              className="block mb-2 font-medium text-slate-700 text-sm"
              htmlFor="email-input"
            >
              Email của bạn
            </label>
            <div className="relative">
              <div className="left-0 absolute inset-y-0 flex items-center pl-4 pointer-events-none">
                <FaEnvelope className="w-5 h-5 text-slate-400" />
              </div>
              <input
                aria-describedby="email-hint"
                aria-required="true"
                className="bg-slate-50 py-3 pr-4 pl-12 border border-slate-200 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full text-slate-800 transition-all duration-200"
                id="email-input"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                required
                type="email"
                value={email}
              />
            </div>
            <p className="mt-2 text-slate-500 text-xs" id="email-hint">
              Chúng tôi sẽ gửi mã OTP đến email này
            </p>
          </div>
          <button
            className="flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-600 hover:from-indigo-700 to-purple-600 hover:to-purple-700 disabled:opacity-70 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full font-semibold text-white transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
              <>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 animate-spin"
                  viewBox="0 0 24 24"
                >
                  <title>Đang tải</title>
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    fill="none"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
                Đang gửi...
              </>
            ) : (
              "Gửi mã OTP"
            )}
          </button>
        </form>
      )}

      {/* OTP Input Form */}
      {!isOtpSubmitted && isEmailSent && (
        <form
          aria-labelledby="otp-form-title"
          className="bg-white/90 shadow-xl backdrop-blur-md mx-4 p-8 rounded-2xl w-full max-w-md text-sm"
          onSubmit={onSubmitOTP}
        >
          <h1
            className="mb-2 font-bold text-slate-800 text-2xl sm:text-3xl text-center"
            id="otp-form-title"
          >
            Nhập mã OTP
          </h1>
          <p className="mb-6 text-slate-500 text-center">
            Nhập mã OTP gồm 6 chữ số được gửi đến email của bạn
          </p>
          <fieldset
            aria-label="Mã OTP gồm 6 ô nhập"
            className="flex justify-between mb-8 border-none p-0 m-0"
            onPaste={handlePaste}
          >
            {["0", "1", "2", "3", "4", "5"].map((digit, index) => (
              <input
                aria-label={`Ký tự thứ ${index + 1}`}
                className="bg-slate-50 border-2 border-slate-200 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-12 sm:w-14 h-12 sm:h-14 font-bold text-slate-800 text-xl text-center transition-all duration-200"
                inputMode="numeric"
                key={`otp-input-${digit}`}
                maxLength="1"
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                pattern="[0-9]*"
                ref={(e) => (inputRefs.current[index] = e)}
                required
                type="text"
              />
            ))}
          </fieldset>
          <button
            className="bg-gradient-to-r from-indigo-600 hover:from-indigo-700 to-purple-600 hover:to-purple-700 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full font-semibold text-white transition-all duration-200 cursor-pointer"
            type="submit"
          >
            Xác nhận OTP
          </button>
        </form>
      )}

      {/* New Password Form */}
      {isOtpSubmitted && isEmailSent && (
        <form
          aria-labelledby="password-form-title"
          className="bg-white/90 shadow-xl backdrop-blur-md mx-4 p-8 rounded-2xl w-full max-w-md text-sm"
          onSubmit={onSubmitNewPassword}
        >
          <h1
            className="mb-2 font-bold text-slate-800 text-2xl sm:text-3xl text-center"
            id="password-form-title"
          >
            Mật khẩu mới
          </h1>
          <p className="mb-6 text-slate-500 text-center">
            Nhập mật khẩu mới cho tài khoản của bạn
          </p>
          <div className="mb-6">
            <label
              className="block mb-2 font-medium text-slate-700 text-sm"
              htmlFor="new-password-input"
            >
              Mật khẩu mới
            </label>
            <div className="relative">
              <div className="left-0 absolute inset-y-0 flex items-center pl-4 pointer-events-none">
                <FaLock className="w-5 h-5 text-slate-400" />
              </div>
              <input
                aria-describedby="password-hint"
                className="bg-slate-50 py-3 pr-4 pl-12 border border-slate-200 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full text-slate-800 transition-all duration-200"
                id="new-password-input"
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới"
                required
                type="password"
                value={newPassword}
              />
            </div>
            <p className="mt-2 text-slate-500 text-xs" id="password-hint">
              Mật khẩu phải có ít nhất 6 ký tự
            </p>
          </div>
          <button
            className="flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-600 hover:from-indigo-700 to-purple-600 hover:to-purple-700 disabled:opacity-70 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full font-semibold text-white transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
              <>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 animate-spin"
                  viewBox="0 0 24 24"
                >
                  <title>Đang tải</title>
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    fill="none"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
                Đang đặt lại...
              </>
            ) : (
              "Đặt lại mật khẩu"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
