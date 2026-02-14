import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col items-center mt-20 px-4 text-gray-800 text-center">
      <img
        alt=""
        className="mb-6 rounded-full w-36 sm:w-48 h-36 sm:h-48 object-cover"
        src={assets.header_img}
      />
      <h1 className="flex items-center gap-2 mb-2 font-medium text-xl sm:text-3xl">
        Chào Lập Trình Viên{" "}
        <img alt="" className="w-8 aspect-square" src={assets.hand_wave} />
      </h1>
      <h2 className="bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 pb-2 font-semibold text-3xl sm:text-5xl text-transparent leading-tight">
        Chào mừng đến với ứng dụng của chúng tôi
      </h2>
      <p className="mb-8 max-w-md text-gray-600 text-base sm:text-lg">
        Hãy bắt đầu với một tour giới thiệu nhanh và chúng tôi sẽ giúp bạn bắt
        đầu ngay lập tức!
      </p>
      <button
        className="bg-gray-900 hover:bg-gray-800 px-8 py-3 rounded-full font-medium text-white transition-all"
        type="button"
      >
        Bắt đầu
      </button>
    </div>
  );
};

export default Header;
