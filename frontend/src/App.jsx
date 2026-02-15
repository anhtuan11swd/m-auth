import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailVerify from "./pages/EmailVerify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <ToastContainer autoClose={500} />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<EmailVerify />} path="/email-verify" />
        <Route element={<ResetPassword />} path="/reset-password" />
      </Routes>
    </>
  );
}

export default App;
