import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  AUTHENTICATED_ROUTES,
  ROUTE,
  UN_AUTHENTICATED_ROUTES,
} from "./utils/routes";
import AdminLayout from "./container/layout/AdminLayout";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicLayout from "./utils/PublicLayout";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import TaskList from "./container/pages/TaskList/TaskList";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Toaster />
      <Routes location={location} key={location.pathname}>
        <Route element={<AdminLayout />}>
          <Route path={ROUTE.HOME} element={<TaskList />} />
        </Route>

        <Route element={<PublicLayout />}>
          <Route element={<AdminLayout />}>
            {UN_AUTHENTICATED_ROUTES.map((route) => (
              <Route
                element={route.element}
                path={route.route}
                key={route.key}
              />
            ))}
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            {AUTHENTICATED_ROUTES.map((route) => (
              <Route
                element={route.element}
                path={route.route}
                key={route.key}
              />
            ))}
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={ROUTE.HOME} />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
