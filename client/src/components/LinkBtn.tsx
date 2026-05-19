import type { ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

interface LinkButtonProps extends LinkProps {
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export default function LinkBtn({
  variant = "primary",
  children,
  className = "",
  ...props
}: LinkButtonProps) {
  const baseStyles =
    "text-sm w-full md:w-fit max-w-lg  font-medium px-4 py-2 inline-flex items-center justify-center transition-all hover:scale-105 active:scale-95 hover:shadow-md duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "text-white bg-violet-600 hover:bg-violet-700 focus:ring-violet-500",
    secondary: "text-gray-700 bg-white border border-gray-200 hover:bg-gray-50",
  };

  return (
    <Link
      {...props}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
