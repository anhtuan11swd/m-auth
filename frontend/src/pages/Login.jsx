import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Đăng ký");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-200 to-purple-400 px-6 sm:px-0 min-h-screen">
      <button
        className="top-5 left-5 sm:left-20 absolute bg-transparent p-0 border-none w-28 sm:w-32 cursor-pointer"
        onClick={() => navigate("/")}
        type="button"
      >
        <img alt="Logo" className="w-full h-full" src={assets.logo} />
      </button>
      <div className="bg-slate-900 shadow-lg p-10 rounded-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="mb-3 font-semibold text-white text-3xl text-center">
          {" "}
          {state === "Đăng ký" ? "Tạo tài khoản của bạn" : "Đăng nhập"}
        </h2>
        <p className="mb-6 text-sm text-center">
          {" "}
          {state === "Đăng ký"
            ? "Tạo tài khoản của bạn"
            : "Đăng nhập vào tài khoản của bạn!"}
        </p>
        <form action="">
          {state === "Đăng ký" && (
            <div className="flex items-center gap-3 bg-[#333A5C] mb-4 px-5 py-2.5 rounded-full w-full">
              <img alt="" src={assets.person_icon} />
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder="Họ và tên"
                required
                type="name"
                value={name}
              />
            </div>
          )}

          <div className="flex items-center gap-3 bg-[#333A5C] mb-4 px-5 py-2.5 rounded-full w-full">
            <img alt="" src={assets.mail_icon} />
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              type="email"
              value={email}
            />
          </div>
          <div className="flex items-center gap-3 bg-[#333A5C] mb-4 px-5 py-2.5 rounded-full w-full">
            <img alt="" src={assets.lock_icon} />
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              required
              type="password"
              value={password}
            />
          </div>
          <button
            className="bg-transparent mb-4 p-0 border-none text-indigo-500 text-left cursor-pointer"
            onClick={() => navigate("/reset-password")}
            type="button"
          >
            Quên mật khẩu?
          </button>
          <button
            className="bg-gradient-to-r from-indigo-500 to-indigo-900 py-2.5 rounded-full w-full font-medium text-white"
            type="button"
          >
            {" "}
            {state}
          </button>
        </form>
        {state === "Đăng ký" ? (
          <p className="mt-4 text-gray-400 text-xs text-center">
            Đã có tài khoản?{""}
            <button
              className="bg-transparent p-0 border-none text-blue-400 underline cursor-pointer"
              onClick={() => setState("Login")}
              type="button"
            >
              {" "}
              Đăng nhập tại đây
            </button>
          </p>
        ) : (
          <p className="mt-4 text-gray-400 text-xs text-center">
            Chưa có tài khoản?{""}
            <button
              className="bg-transparent p-0 border-none text-blue-400 underline cursor-pointer"
              onClick={() => setState("Đăng ký")}
              type="button"
            >
              {" "}
              Đăng ký
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
