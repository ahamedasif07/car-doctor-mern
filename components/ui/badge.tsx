import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning"
    | "info"
    | "brand";
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default:
      "border-transparent bg-gray-900 text-white shadow-xs hover:bg-gray-800",
    brand:
      "border-transparent bg-[#FF3811]/10 text-[#FF3811] font-semibold",
    secondary:
      "border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200/80",
    destructive:
      "border-transparent bg-red-50 text-red-600 border border-red-200/50",
    success:
      "border-transparent bg-emerald-50 text-emerald-700 border border-emerald-200/50",
    warning:
      "border-transparent bg-amber-50 text-amber-700 border border-amber-200/50",
    info:
      "border-transparent bg-sky-50 text-sky-700 border border-sky-200/50",
    outline: "text-gray-700 border border-gray-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
