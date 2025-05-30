import { LucideIcon } from "lucide-react";
import { cn } from "../../../lib/utils";

interface IconProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: string;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
};

const Icon = ({
  icon: IconComponent,
  size = "md",
  className,
  color,
}: IconProps) => {
  return <IconComponent className={cn(sizeMap[size], color, className)} />;
};

export default Icon;
