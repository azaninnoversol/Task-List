import { Navigate, Outlet } from "react-router-dom";
import { ROUTE } from "./routes";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = Boolean(token);
  if (isAuthenticated) return <Outlet />;

  return <Navigate to={ROUTE.LOGIN} replace />;
};

export default ProtectedRoute;
