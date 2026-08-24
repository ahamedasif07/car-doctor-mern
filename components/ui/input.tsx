import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#FF3811]/50 focus:ring-3 focus:ring-[#FF3811]/10 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 shadow-xs",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
