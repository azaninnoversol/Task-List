import React, { memo } from "react";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <Header />
      <div className="@container px-4 py-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default memo(Layout);
