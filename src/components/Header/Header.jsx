import React, { memo } from "react";
import { motion } from "framer-motion";
import { IMAGES } from "../../utils/resourses";
import { Link } from "react-router-dom";
import { ROUTE } from "../../utils/routes";

function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className="flex justify-center items-center pt-6"
    >
      <Link to={ROUTE.HOME} className="w-[360px] max-sm:w-[270px]">
        <img src={IMAGES.LOGO} alt="logo" />
      </Link>
    </motion.header>
  );
}

export default memo(Header);
