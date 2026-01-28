"use client";

import * as React from "react";
import { cn } from "../lib/utils";
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold",
      variant === "default" && "bg-black text-white",
      variant === "secondary" && "bg-gray-100 text-black",
      variant === "outline" && "border border-black text-black",
      className
    )}
    {...props}
  />
));
Badge.displayName = "Badge";

export { Badge };
