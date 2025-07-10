import React, { memo } from "react";
import { BiSearch } from "react-icons/bi";

function Input({
  type = "text",
  label = "",
  placeholder = "",
  className = "",
  ...rest
}) {
  return (
    <div className={`w-full relative  ${className}`}>
      {label && (
        <label className="block mb-1 text-sm text-[var(--color-text)]">
          {label}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          rows={4}
          className={`w-full px-4 py-2 rounded-md bg-transparent border border-[var(--color-border)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] ${className}`}
          placeholder={placeholder}
          {...rest}
        />
      ) : type === "search" ? (
        <>
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-border-soft)] h-5 w-5" />

          <input
            type={type}
            className="pl-10 pr-4 py-2 w-full rounded-md bg-card text-text border border-border-soft focus:outline-none focus:ring-2 focus:ring-primary transition"
            placeholder={placeholder}
            {...rest}
          />
        </>
      ) : (
        <input
          type={type}
          className={`w-full px-4 py-2 rounded-md bg-transparent border border-[var(--color-border)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] ${className}`}
          placeholder={placeholder}
          {...rest}
        />
      )}
    </div>
  );
}

export default memo(Input);
