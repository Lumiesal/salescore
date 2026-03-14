import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type RoleRouteProps = {
  allowedRoles: string[];
};

export default function RoleRoute({ allowedRoles }: RoleRouteProps) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}