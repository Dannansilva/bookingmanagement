import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ padding = "lg", className = "", children, ...props }, ref) => {
    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8 sm:p-12",
    };

    return (
      <div
        ref={ref}
        className={`
          rounded-xl bg-white shadow-lg dark:bg-slate-900 dark:border dark:border-slate-800 dark:text-white
          ${paddings[padding]}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";
