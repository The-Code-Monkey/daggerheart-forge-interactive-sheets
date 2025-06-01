import { cn } from "@/lib/utils";
import { JSX } from "react";

interface StatValueProps {
  value: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "text-lg font-semibold",
  md: "text-2xl font-bold",
  lg: "text-4xl font-bold",
};

const StatValue = ({
  value,
  size = "md",
  className,
}: StatValueProps): JSX.Element => {
  return (
    <div className={cn(sizeStyles[size], "text-white", className)}>{value}</div>
  );
};

export default StatValue;
