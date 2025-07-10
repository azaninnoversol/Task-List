import React, { memo } from "react";
import { IMAGES } from "../../utils/resourses";
import { Link } from "react-router-dom";
import { ROUTE } from "../../utils/routes";

function Header() {
  return (
    <header className="flex justify-center items-center pt-6 sticky top-0">
      <Link to={ROUTE.HOME} className="w-[360px] max-sm:w-[270px]">
        <img src={IMAGES.LOGO} alt="images" />
      </Link>
    </header>
  );
}

export default memo(Header);
