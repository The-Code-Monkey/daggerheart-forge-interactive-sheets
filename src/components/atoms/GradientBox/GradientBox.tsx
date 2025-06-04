import { cn } from "../../../lib/utils";
import { JSX, ReactNode } from "react";

interface GradientBoxProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "card";
  className?: string;
}

const gradientStyles = {
  primary: "bg-linear-to-r from-yellow-400 to-orange-500",
  secondary: "bg-linear-to-br from-brand-800/40 to-slate-800/40",
  card: "bg-linear-to-br from-slate-800/80 to-slate-900/80",
};

const GradientBox = ({
  children,
  variant = "primary",
  className,
}: GradientBoxProps): JSX.Element => {
  return (
    <div className={cn(gradientStyles[variant], className)}>{children}</div>
  );
};

export default GradientBox;
