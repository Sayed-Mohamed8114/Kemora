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
import RoleRoute from "./RoleRoute";
import ErrorPage from "@/Pages/404ErrorPage/404Page";
import UpdateProfilePage from "@/Pages/Settings/UpdateProfilePage";
import ServicesManagementPage from "@/Pages/ServicesManagementPage/ServicesManagementPage";
import RequestServicePage from "@/Pages/RequestServicePage/RequestServicePage";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUP />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      {/* Authenticated users */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Dashboard />}>
          <Route path="/profile" element={<UpdateProfilePage />} />

          {/* Admin */}
          <Route
            path="dashboard/admin"
            element={
              <RoleRoute allowedRoles={["super_admin"]}>
                <AdminDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="dashboard/services"
            element={
              <RoleRoute allowedRoles={["super_admin"]}>
                <ServicesManagementPage />
              </RoleRoute>
            }
          />

          <Route
            path="dashboard/servicesRequests"
            element={
              <RoleRoute allowedRoles={["super_admin"]}>
                <RequestServicePage />
              </RoleRoute>
            }
          />

          <Route
            path="dashboard/staff"
            element={
              <RoleRoute allowedRoles={["super_admin"]}>
                <StaffMangamenetpage />
              </RoleRoute>
            }
          />

          <Route
            path="dashboard/tours"
            element={
              <RoleRoute allowedRoles={["super_admin", "staff"]}>
                <ToursManagement />
              </RoleRoute>
            }
          />

          <Route
            path="dashboard/inquiries"
            element={
              <RoleRoute allowedRoles={["super_admin", "staff"]}>
                <CustomerInquiries />
              </RoleRoute>
            }
          />

          {/* Staff */}
          <Route
            path="staff/tours"
            element={
              <RoleRoute allowedRoles={["staff"]}>
                <ToursManagement />
              </RoleRoute>
            }
          />

          <Route
            path="staff/my-tours"
            element={
              <RoleRoute allowedRoles={["staff"]}>
                <div>Tours By Me</div>
              </RoleRoute>
            }
          />

          <Route
            path="staff/inquiries"
            element={
              <RoleRoute allowedRoles={["staff"]}>
                <CustomerInquiries />
              </RoleRoute>
            }
          />

          {/* Customer */}
          <Route
            path="tours"
            element={
              <RoleRoute allowedRoles={["customer"]}>
                <div>Tours</div>
              </RoleRoute>
            }
          />

          <Route
            path="my-tours"
            element={
              <RoleRoute allowedRoles={["customer"]}>
                <div>My Tours</div>
              </RoleRoute>
            }
          />

          <Route
            path="inquiry"
            element={
              <RoleRoute allowedRoles={["customer"]}>
                <div>Make Inquiry</div>
              </RoleRoute>
            }
          />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
