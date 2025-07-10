import React, { memo } from "react";

function Button({ children, className = "", variant = "primary", ...rest }) {
  const baseStyles =
    "inline-flex items-center justify-center px-5 py-2 rounded-md font-medium transition cursor-pointer";

  let variantStyles = "";

  if (variant === "primary") {
    variantStyles = "bg-accent text-white hover:bg-green-600 focus:ring-accent";
  } else if (variant === "secondary") {
    variantStyles =
      "bg-card text-text border border-border-soft hover:bg-border focus:ring-primary";
  } else if (variant === "danger") {
    variantStyles = "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500";
  }

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export default memo(Button);
