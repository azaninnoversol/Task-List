import { Navigate } from "react-router-dom";
import { ROUTE } from "./routes";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = Boolean(token);

  if (!isAuthenticated) return <Outlet />;

  return children;
};

export default ProtectedRoute;
