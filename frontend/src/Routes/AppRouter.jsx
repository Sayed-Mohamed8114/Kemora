import MainLayout from "@/Components/Layout/MainLayout";
import ContactPage from "@/Pages/Contact/ContactPage";
import Home from "@/Pages/Home/Home";
import Login from "@/Pages/Login/Login";
import SignUP from "@/Pages/SignUP/SignUP";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "@/Pages/Dashboard/Dashboard";
import StaffMangamenetpage from "@/Pages/StaffMangementPafe/StaffMangamenetpage";
import CustomerInquiries from "@/Pages/CustomerInquiries/CustomerInquiries";
import AdminDashboard from "@/Pages/AdminDashboard/AdminDashboard";
import ToursManagement from "@/Pages/ToursManagement/ToursManagement";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUP />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="staff" element={<StaffMangamenetpage />} />
          <Route path="inquiries" element={<CustomerInquiries />} />
          <Route path="tours" element={<ToursManagement />} />
        </Route>
      </Route>
    </Routes>
  );
}
