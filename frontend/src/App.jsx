import { Route, Routes } from "react-router-dom";
import EmailVerify from "./pages/EmailVerify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<Login />} path="/login" />
      <Route element={<EmailVerify />} path="/email-verify" />
      <Route element={<ResetPassword />} path="/reset-password" />
    </Routes>
  );
}

export default App;
