import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "./AppContext.js";

export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Hàm lấy dữ liệu người dùng từ API
  const getUserData = useCallback(async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      if (data.success) {
        setUserData(data.userData);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUserData(false);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      setIsLoggedIn(false);
      setUserData(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Hàm kiểm tra trạng thái xác thực
    const getAuthState = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
        if (data.success) {
          setIsLoggedIn(true);
          await getUserData();
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra xác thực:", error);
        setIsLoggedIn(false);
        setUserData(false);
      }
    };

    getAuthState();
  }, [getUserData]); // eslint-disable-line react-hooks/exhaustive-deps

  // Hàm đăng xuất
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  const value = {
    backendUrl,
    getUserData,
    isLoggedIn,
    logout,
    setIsLoggedIn,
    setUserData,
    userData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
