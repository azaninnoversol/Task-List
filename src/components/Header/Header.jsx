import React, { memo } from "react";
import { motion } from "framer-motion";
import { IMAGES } from "../../utils/resourses";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTE } from "../../utils/routes";
import { STORAGE_KEYS, useLocalStorage } from "../../hooks/localstorage";

function Header() {
  const location = useLocation();
  const [storeToken, , removeToken] = useLocalStorage(STORAGE_KEYS.TOKEN);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate(ROUTE.LOGIN);
  };

  const unauthNavLinks = [
    {
      label: "Signup",
      link: ROUTE.REGISTER,
      show: location.pathname !== ROUTE.REGISTER,
    },
    {
      label: "Login",
      link: ROUTE.LOGIN,
      show: location.pathname !== ROUTE.LOGIN,
    },
    {
      label: "Task List",
      link: ROUTE.HOME,
      show: true,
    },
  ];

  const navLinks = storeToken
    ? [
        {
          label: "Task List",
          link: ROUTE.HOME,
        },
        {
          label: "Profile",
          link: ROUTE.PROFIlE,
        },
        {
          label: "Logout",
          action: handleLogout,
        },
      ]
    : unauthNavLinks.filter((item) => item.show);

  return (
    <motion.header
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className="flex flex-col sm:flex-row justify-between items-center pt-6 px-6 sm:px-20"
    >
      <Link to={ROUTE.HOME} className="w-[220px] sm:w-[360px] max-sm:w-[270px]">
        <img src={IMAGES.LOGO} alt="logo" />
      </Link>

      <ul className="flex flex-wrap items-center gap-4 mt-4 sm:mt-0">
        {navLinks.map((item, index) => {
          const isActive = item.link && location.pathname === item.link;
          const isAction = !!item.action;
          const baseClasses =
            "text-sm sm:text-base cursor-pointer px-3 py-2 rounded-md transition-all text-text";

          let dynamicClasses = "";

          if (isAction) {
            dynamicClasses = "bg-red-500/20 hover:bg-red-500/30 text-red-100";
          } else if (isActive) {
            dynamicClasses = "bg-[var(--color-accent)]/20 font-semibold";
          } else {
            dynamicClasses =
              "bg-[var(--color-border)] hover:bg-[var(--color-border)]/70";
          }

          return (
            <motion.li
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${baseClasses} ${dynamicClasses}`}
              onClick={item.action}
            >
              {item.action ? (
                item.label
              ) : (
                <Link to={item.link}>{item.label}</Link>
              )}
            </motion.li>
          );
        })}
      </ul>
    </motion.header>
  );
}

export default memo(Header);
