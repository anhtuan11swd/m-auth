import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const EmailVerify = () => {
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { backendUrl, isLoggedIn, userData, getUserData } =
    useContext(AppContext);

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
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.replace(/\D/g, "").split("").slice(0, 6);
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
        if (index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((el) => el?.value || "");
    const otp = otpArray.join("");

    if (otp.length !== 6) {
      toast.error("Vui lòng nhập đủ 6 chữ số");
      return;
    }

    setIsLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${backendUrl}/api/auth/verify-account`,
        {
          otp,
        },
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
        // Clear inputs on error
        inputRefs.current.forEach((el) => {
          if (el) el.value = "";
        });
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Đã xảy ra lỗi");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && userData?.isAccountVerified) {
      navigate("/");
    }
  }, [isLoggedIn, userData, navigate]);

  return (
    <div className="relative flex justify-center items-center bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 p-4 min-h-screen overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="-top-40 -right-40 absolute bg-purple-500/20 blur-3xl rounded-full w-80 h-80" />
        <div className="-bottom-40 -left-40 absolute bg-blue-500/20 blur-3xl rounded-full w-80 h-80" />
        <div className="top-1/2 left-1/2 absolute bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl rounded-full w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Back button */}
      <button
        aria-label="Quay về trang chủ"
        className="group top-4 sm:top-6 left-4 sm:left-6 absolute bg-white/5 hover:bg-white/10 p-3 border border-white/10 hover:border-white/20 rounded-xl text-white/70 hover:text-white transition-all duration-300 cursor-pointer"
        onClick={() => navigate("/")}
        type="button"
      >
        <FaArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
      </button>

      {/* Main card */}
      <form
        className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 shadow-2xl backdrop-blur-xl p-8 sm:p-10 border border-white/10 rounded-3xl w-full max-w-md"
        onSubmit={onSubmitHandler}
      >
        {/* Icon header */}
        <div className="flex justify-center mb-6">
          <div className="flex justify-center items-center bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-purple-500/25 rounded-2xl w-20 h-20">
            <FaShieldHalved className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-3 font-bold text-white text-2xl sm:text-3xl text-center">
          Xác thực Email
        </h1>

        {/* Subtitle */}
        <p className="mb-8 text-slate-400 text-center leading-relaxed">
          Nhập mã OTP gồm{" "}
          <span className="font-medium text-purple-400">6 chữ số</span> được gửi
          đến email của bạn
        </p>

        {/* OTP Inputs */}
        <div
          className="flex justify-center gap-2 sm:gap-3 mb-8"
          onPaste={handlePaste}
        >
          {[0, 1, 2, 3, 4, 5].map((digit, index) => (
            <input
              aria-label={`Chữ số thứ ${index + 1}`}
              autoComplete="one-time-code"
              className="bg-slate-800/50 focus:bg-slate-800 border-2 border-slate-700 focus:border-purple-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 w-12 sm:w-14 h-14 sm:h-14 font-bold text-white placeholder:text-slate-600 text-xl sm:text-2xl text-center transition-all duration-200"
              inputMode="numeric"
              key={`otp-input-${digit}`}
              maxLength={1}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
                handleInput(e, index);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              pattern="\d"
              ref={(el) => (inputRefs.current[index] = el)}
              required
            />
          ))}
        </div>

        {/* Helper text */}
        <p className="mb-6 text-slate-500 text-xs text-center">
          💡 Có thể dán mã OTP trực tiếp vào đây
        </p>

        {/* Submit button */}
        <button
          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
            isLoading
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5"
          }`}
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? (
            <span className="flex justify-center items-center gap-2">
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
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
              Đang xác thực...
            </span>
          ) : (
            "Xác thực Email"
          )}
        </button>

        {/* Resend link */}
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Chưa nhận được mã?{" "}
            <button
              className="font-medium text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
              onClick={() => {
                toast.info("Chức năng gửi lại mã đang được phát triển");
              }}
              type="button"
            >
              Gửi lại mã
            </button>
          </p>
        </div>

        {/* Success indicator */}
        <div className="top-4 right-4 absolute flex items-center gap-2 text-slate-500 text-xs">
          <FaCheck className="text-green-500" />
          <span>Bảo mật</span>
        </div>
      </form>
    </div>
  );
};

export default EmailVerify;
