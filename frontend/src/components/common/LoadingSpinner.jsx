import React from "react";

const sizes = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-7 h-7" };

const LoadingSpinner = ({ size = "md", className = "" }) => (
  <div
    className={`${sizes[size]} border-2 border-current border-t-transparent rounded-full animate-spin ${className}`}
  />
);

export default LoadingSpinner;
