import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext.js";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, logout } = useContext(AppContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="top-0 z-50 fixed px-4 sm:px-8 pt-4 w-full">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center bg-white/80 shadow-gray-200/50 shadow-lg backdrop-blur-md p-4 sm:p-5 border border-white/50 rounded-2xl">
          <img
            alt="Logo"
            className="w-28 sm:w-32 hover:scale-105 transition-transform duration-200 cursor-pointer"
            onClick={() => navigate("/")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate("/");
              }
            }}
            src={assets.logo}
          />
          {userData ? (
            <div className="relative">
              <button
                aria-expanded={isDropdownOpen}
                aria-label="User menu"
                className="flex justify-center items-center bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg hover:shadow-indigo-500/30 hover:shadow-xl rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-10 h-10 font-semibold text-white transition-all duration-300 cursor-pointer"
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                type="button"
              >
                {userData.name[0].toUpperCase()}
              </button>

              <div
                className={`absolute right-0 mt-3 w-56 py-2 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-100 transform transition-all duration-200 ease-out ${isDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
              >
                <div className="px-4 py-2 border-gray-100 border-b">
                  <p className="font-medium text-gray-900 text-sm truncate">
                    {userData.name}
                  </p>
                  <p className="text-gray-500 text-xs truncate">
                    {userData.email}
                  </p>
                </div>
                <ul className="py-2">
                  {!userData.isAccountVerified && (
                    <li>
                      <button
                        className="flex items-center gap-3 hover:bg-indigo-50 px-4 py-2.5 w-full text-gray-700 hover:text-indigo-600 text-sm text-left transition-colors duration-150 cursor-pointer"
                        onClick={() => navigate("/email-verify")}
                        type="button"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <title>Xác minh email</title>
                          <path
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                        Xác minh email
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      className="flex items-center gap-3 hover:bg-red-50 px-4 py-2.5 w-full text-red-600 text-sm text-left transition-colors duration-150 cursor-pointer"
                      onClick={handleLogout}
                      type="button"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>Đăng xuất</title>
                        <path
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <button
              className="group flex items-center gap-2 hover:bg-indigo-50 px-6 py-2.5 border border-gray-200 hover:border-indigo-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium text-gray-700 hover:text-indigo-600 text-sm transition-all duration-200 cursor-pointer"
              onClick={() => navigate("/login")}
              type="button"
            >
              Đăng nhập
              <span className="transition-transform group-hover:translate-x-1 duration-200">
                <img
                  alt="Arrow"
                  className="w-3.5 h-3.5"
                  src={assets.arrow_icon}
                />
              </span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
