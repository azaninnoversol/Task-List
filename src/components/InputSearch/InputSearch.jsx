import React, { memo } from "react";
import { BiSearch } from "react-icons/bi";

function InputSearch({
  type = "text",
  className = "",
  placeholder = "Search...",
  value = "",
  onChange = () => {},
  ...rest
}) {
  return (
    <div className={`relative w-full max-w-[300px] ${className}`}>
      <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-border-soft)] h-5 w-5" />

      <input
        type={type}
        className="pl-10 pr-4 py-2 w-full rounded-md bg-card text-text border border-border-soft focus:outline-none focus:ring-2 focus:ring-primary transition"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}

export default memo(InputSearch);
