import React from "react";

interface ActionBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function ActionBtn({
  variant = "primary",
  isLoading = false,
  disabled,
  className = "",
  children,
  ...props
}: ActionBtnProps) {
  const baseStyles =
    "inline-flex w-full max-w-md md:w-fit items-center justify-center font-medium rounded-lg text-sm transition-all duration-200 ease-out cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";

  const interactiveStyles =
    !disabled && !isLoading
      ? "hover:scale-105 active:scale-95 hover:shadow-md"
      : "opacity-60 cursor-not-allowed";

  const variants = {
    primary:
      "px-4 py-2 text-white bg-violet-600 hover:bg-violet-700 focus:ring-violet-500",
    secondary:
      "px-4 py-2 text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 focus:ring-slate-400",
    danger:
      "px-4 py-2 text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${interactiveStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
