import { Navigate, Outlet } from "react-router-dom";
import { ROUTE } from "./routes";

function PublicLayout() {
  const token = localStorage.getItem("token");
  const isAuthenticated = Boolean(token);

  if (!isAuthenticated) return <Outlet />;

  return <Navigate to={ROUTE.HOME} replace />;
}
export default PublicLayout;
