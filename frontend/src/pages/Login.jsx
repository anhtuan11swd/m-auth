import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext.js";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);
  const [state, setState] = useState("Đăng nhập");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.defaults.withCredentials = true;

    try {
      if (state === "Đăng ký") {
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
          email,
          name,
          password,
        });
        if (data.success) {
          toast.success(data.message);
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });
        if (data.success) {
          toast.success(data.message);
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center bg-linear-to-br from-blue-50 via-indigo-100 to-purple-200 px-6 sm:px-0 min-h-screen overflow-hidden">
      {/* Background decoration */}
      <div className="top-0 left-0 absolute w-full h-full overflow-hidden pointer-events-none">
        <div className="-top-40 -right-40 absolute bg-linear-to-br from-blue-400/30 to-purple-400/30 blur-3xl rounded-full w-80 h-80"></div>
        <div className="-bottom-40 -left-40 absolute bg-linear-to-br from-indigo-400/30 to-blue-400/30 blur-3xl rounded-full w-80 h-80"></div>
      </div>

      <button
        aria-label="Back to home"
        className="group top-5 left-5 sm:left-10 z-10 absolute bg-white/80 shadow-lg hover:shadow-xl backdrop-blur-sm p-3 rounded-2xl transition-all duration-300 cursor-pointer"
        onClick={() => navigate("/")}
        type="button"
      >
        <svg
          className="w-6 h-6 text-gray-700 transition-transform group-hover:-translate-x-1 duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <title>Quay lại trang chủ</title>
          <path
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </button>

      <div className="relative bg-white/80 shadow-2xl backdrop-blur-xl p-8 sm:p-10 border border-white/50 rounded-3xl w-full sm:w-[420px]">
        <div className="mb-8 text-center">
          <h2 className="mb-2 font-bold text-gray-900 text-3xl">
            {state === "Đăng ký" ? "Tạo tài khoản" : "Đăng nhập"}
          </h2>
          <p className="text-gray-500 text-sm">
            {state === "Đăng ký"
              ? "Tạo tài khoản để trải nghiệm dịch vụ của chúng tôi"
              : "Chào mừng trở lại! Đăng nhập để tiếp tục"}
          </p>
        </div>

        <form className="space-y-5" onSubmit={onSubmitHandler}>
          {state === "Đăng ký" && (
            <div className="relative">
              <label className="sr-only" htmlFor="name">
                Họ và tên
              </label>
              <div className="flex items-center gap-3 bg-gray-50/80 focus-within:bg-white mb-4 px-4 py-3.5 border border-gray-200 focus-within:border-indigo-500 rounded-2xl focus-within:ring-2 focus-within:ring-indigo-100 w-full transition-all duration-200">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <title>Họ và tên</title>
                  <path
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <input
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Họ và tên"
                  required
                  type="text"
                  value={name}
                />
              </div>
            </div>
          )}

          <div className="relative">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <div className="flex items-center gap-3 bg-gray-50/80 focus-within:bg-white mb-4 px-4 py-3.5 border border-gray-200 focus-within:border-indigo-500 rounded-2xl focus-within:ring-2 focus-within:ring-indigo-100 w-full transition-all duration-200">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Email</title>
                <path
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              <input
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                type="email"
                value={email}
              />
            </div>
          </div>

          <div className="relative">
            <label className="sr-only" htmlFor="password">
              Mật khẩu
            </label>
            <div className="flex items-center gap-3 bg-gray-50/80 focus-within:bg-white mb-4 px-4 py-3.5 border border-gray-200 focus-within:border-indigo-500 rounded-2xl focus-within:ring-2 focus-within:ring-indigo-100 w-full transition-all duration-200">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Mật khẩu</title>
                <path
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              <input
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                required
                type={showPassword ? "text" : "password"}
                value={password}
              />
              <button
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Ẩn mật khẩu</title>
                    <path
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Hiện mật khẩu</title>
                    <path
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                    <path
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {state === "Đăng nhập" && (
            <button
              className="mb-4 text-indigo-600 hover:text-indigo-800 text-sm hover:underline transition-colors cursor-pointer"
              onClick={() => navigate("/reset-password")}
              type="button"
            >
              Quên mật khẩu?
            </button>
          )}

          <button
            className="group relative disabled:opacity-70 hover:shadow-indigo-500/30 hover:shadow-lg py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full overflow-hidden font-semibold text-white transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
            disabled={isLoading}
            type="submit"
          >
            <span className="absolute inset-0 bg-linear-to-r from-indigo-600 group-hover:from-indigo-500 to-purple-600 group-hover:to-purple-500 transition-all duration-300"></span>
            <span className="relative flex justify-center items-center gap-2">
              {isLoading ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <title>Đang tải</title>
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  Đang xử lý...
                </>
              ) : (
                state
              )}
            </span>
          </button>
        </form>

        <p className="mt-6 text-gray-500 text-sm text-center">
          {state === "Đăng ký" ? (
            <>
              Đã có tài khoản?{" "}
              <button
                className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                onClick={() => {
                  setState("Đăng nhập");
                  setName("");
                  setEmail("");
                  setPassword("");
                }}
                type="button"
              >
                Đăng nhập tại đây
              </button>
            </>
          ) : (
            <>
              Chưa có tài khoản?{" "}
              <button
                className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                onClick={() => {
                  setState("Đăng ký");
                  setName("");
                  setEmail("");
                  setPassword("");
                }}
                type="button"
              >
                Đăng ký ngay
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
