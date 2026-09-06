import MainLayout from "@/Components/Layout/MainLayout";
import Home from "@/Pages/Home/Home";
import Login from "@/Pages/Login/Login";
import SignUP from "@/Pages/SignUP/SignUP";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUP />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
