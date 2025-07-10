import React, { memo } from "react";
import { motion } from "framer-motion";
import { IMAGES } from "../../utils/resourses";
import { Link } from "react-router-dom";
import { ROUTE } from "../../utils/routes";

function Footer() {
  const todayDate = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="bg-card text-text border-t border-border py-6 px-20 mt-10"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
        <Link to={ROUTE.HOME} className="w-[50px]">
          <img src={IMAGES.LOGO_HALF} alt="logo" />
        </Link>

        <p className="text-text text-sm text-center max-[425px]:text-xs">
          © {todayDate} FlowTask. All rights reserved.
        </p>

        <p className="text-border-soft text-sm max-[425px]:text-xs">
          Built with <span className="text-accent font-medium">React</span> +
          Tailwind
        </p>
      </div>
    </motion.footer>
  );
}

export default memo(Footer);
