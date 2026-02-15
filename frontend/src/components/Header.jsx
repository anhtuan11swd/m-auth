import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext.js";

const Header = () => {
  const { userData } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center mt-20 px-4 text-gray-800 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur-xl rounded-full animate-pulse"></div>
        <img
          alt=""
          className="relative shadow-2xl mb-6 border-4 border-white/50 rounded-full w-36 sm:w-48 h-36 sm:h-48 object-cover"
          src={assets.header_img}
        />
      </div>
      <h1 className="flex items-center gap-2 mb-2 font-medium text-xl sm:text-3xl">
        Hey {userData ? userData.name : "Developer"}{" "}
        <span className="inline-block animate-bounce">
          <img
            alt="Waving hand"
            className="w-8 aspect-square"
            src={assets.hand_wave}
          />
        </span>
      </h1>
      <h2 className="bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-4 pb-2 font-bold text-transparent text-3xl sm:text-5xl leading-tight tracking-tight">
        Chào mừng đến với ứng dụng của chúng tôi
      </h2>
      <p className="mb-8 max-w-md text-gray-600 text-base sm:text-lg leading-relaxed">
        Hãy bắt đầu với một tour giới thiệu nhanh và chúng tôi sẽ giúp bạn bắt
        đầu ngay lập tức!
      </p>
      <button
        className="group relative shadow-lg hover:shadow-indigo-500/30 hover:shadow-xl px-8 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 overflow-hidden font-semibold text-white transition-all hover:-translate-y-0.5 duration-300 ease-out"
        type="button"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-blue-600 group-hover:from-blue-500 to-purple-600 group-hover:to-purple-500 transition-all duration-300"></span>
        <span className="relative">Bắt đầu</span>
      </button>
    </div>
  );
};

export default Header;
