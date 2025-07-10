import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AUTHENTICATED_ROUTES, UN_AUTHENTICATED_ROUTES } from "./utils/routes";
import AdminLayout from "./container/layout/AdminLayout";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicLayout from "./utils/PublicLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
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

        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {AUTHENTICATED_ROUTES.map((route) => (
            <Route element={route.element} path={route.route} key={route.key} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
