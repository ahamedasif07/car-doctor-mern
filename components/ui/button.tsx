import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "brand";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3811]/40 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none active:scale-[0.98]";

    const variantStyles = {
      default:
        "bg-[#FF3811] text-white shadow-md shadow-[#FF3811]/25 hover:bg-[#E0310D] hover:shadow-lg hover:shadow-[#FF3811]/35",
      brand:
        "bg-gradient-to-r from-[#FF3811] to-[#FF6B4A] text-white shadow-md shadow-[#FF3811]/25 hover:opacity-95 hover:shadow-lg hover:shadow-[#FF3811]/35",
      destructive:
        "bg-red-500 text-white shadow-sm hover:bg-red-600 focus-visible:ring-red-500",
      outline:
        "border border-gray-200 bg-white hover:bg-gray-50 hover:text-gray-900 text-gray-700 shadow-xs",
      secondary:
        "bg-gray-100 text-gray-900 hover:bg-gray-200/80 shadow-xs",
      ghost: "hover:bg-gray-100 hover:text-gray-900 text-gray-600",
      link: "text-[#FF3811] underline-offset-4 hover:underline",
    };

    const sizeStyles = {
      default: "h-10 px-4 py-2",
      sm: "h-8 rounded-lg px-3 text-xs",
      lg: "h-12 rounded-xl px-6 text-base font-semibold",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
