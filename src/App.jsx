import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./container/layout/Layout";
import { AUTHENTICATED_ROUTES } from "./utils/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {AUTHENTICATED_ROUTES.map((route) => (
            <Route element={route.element} path={route.route} key={route.key} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
