import { useAuth } from "@/Context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RoleRoute({ allowedRoles, children }) {
  const { user } = useAuth();

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}