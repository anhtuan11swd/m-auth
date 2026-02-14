import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="top-0 absolute flex justify-between items-center p-4 sm:p-6 sm:px-24 w-full">
      <img alt="" className="w-28 sm:w-32" src={assets.logo} />
      <button
        className="flex items-center gap-2 hover:bg-gray-100 px-6 py-2 border border-gray-300 rounded-full text-gray-800 text-sm font-medium transition-all"
        onClick={() => navigate("/login")}
        type="button"
      >
        Đăng nhập <img alt="" className="w-3 h-3" src={assets.arrow_icon} />
      </button>
    </div>
  );
};

export default Navbar;
