import { useState } from "react";
import { AppContext } from "./AppContext.js";

export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Hàm lấy dữ liệu người dùng từ API
  const getUserData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/user/data`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
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
  };

  // Hàm kiểm tra trạng thái xác thực
  const getAuthState = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/auth/is-auth`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      if (response.ok) {
        setIsLoggedIn(true);
        // Fetch user data separately since is-auth doesn't return it
        await getUserData();
      } else {
        setIsLoggedIn(false);
        setUserData(false);
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra xác thực:", error);
      setIsLoggedIn(false);
      setUserData(false);
    }
  };

  const value = {
    backendUrl,
    getAuthState,
    getUserData,
    isLoggedIn,
    setIsLoggedIn,
    setUserData,
    userData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
