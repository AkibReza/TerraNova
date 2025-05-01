import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx"; // Optional: for cleaner class name merging

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // e.g., 'primary', 'secondary', 'outline'
  size = "medium", // e.g., 'small', 'medium', 'large'
  disabled = false,
  className = "",
  ...props // Pass any other standard button attributes
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizeStyles = {
    small: "px-3 py-1.5 text-xs",
    medium: "px-5 py-2.5 text-sm",
    large: "px-6 py-3 text-base",
  };

  // clsx helps merge classes conditionally and cleanly
  const combinedClassName = clsx(
    baseStyles,
    variantStyles[variant] || variantStyles.primary,
    sizeStyles[size] || sizeStyles.medium,
    className // Allow overriding or adding classes
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  );
};

// Optional: Add prop types for better component documentation and safety
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "outline", "danger"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
