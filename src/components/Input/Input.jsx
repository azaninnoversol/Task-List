import React, { memo } from "react";
import { BiSearch } from "react-icons/bi";
import { motion } from "framer-motion";

function Input({
  type = "text",
  label = "",
  placeholder = "",
  className = "",
  errors = "",
  ...rest
}) {
  const hasError = Boolean(errors);

  return (
    <div className={`w-full relative ${className}`}>
      {label && (
        <label className={`block mb-1 text-sm text-[var(--color-text)]`}>
          {label}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          rows={4}
          className={`w-full px-4 py-2 rounded-md bg-transparent border ${
            hasError
              ? "border-red-500 focus:ring-red-500"
              : "border-[var(--color-border)] focus:ring-[var(--color-accent)]"
          } text-[var(--color-text)] focus:outline-none ${className}`}
          placeholder={placeholder}
          {...rest}
        />
      ) : type === "search" ? (
        <>
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-border-soft)] h-5 w-5" />

          <input
            type={type}
            className={`pl-10 pr-4 py-2 w-full rounded-md bg-card text-text border ${
              hasError
                ? "border-red-500 focus:ring-red-500"
                : "border-border-soft focus:ring-primary"
            } focus:outline-none transition`}
            placeholder={placeholder}
            {...rest}
          />
        </>
      ) : (
        <input
          type={type}
          className={`w-full px-4 py-2 rounded-md bg-transparent border ${
            hasError
              ? "border-red-500 focus:ring-red-500"
              : "border-[var(--color-border)] focus:ring-[var(--color-accent)]"
          } text-[var(--color-text)] focus:outline-none ${className}`}
          placeholder={placeholder}
          {...rest}
        />
      )}

      {errors && (
        <motion.p
          key="error-msg"
          className="text-red-500 text-sm mt-1"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.3 }}
        >
          {errors}
        </motion.p>
      )}
    </div>
  );
}

export default memo(Input);
