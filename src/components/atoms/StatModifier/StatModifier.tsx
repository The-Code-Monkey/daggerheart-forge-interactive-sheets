import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatModifierProps {
  modifier: number;
  size?: "sm" | "md";
  className?: string;
}

const getModifierString = (mod: number) => {
  return mod >= 0 ? `+${mod}` : `${mod}`;
};

const getModifierColor = (mod: number) => {
  return mod >= 0 ? "bg-green-600/50" : "bg-red-600/50";
};

const StatModifier = ({
  modifier,
  size = "md",
  className,
}: StatModifierProps) => {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "text-white",
        getModifierColor(modifier),
        size === "sm" ? "text-xs" : "text-sm",
        className
      )}
    >
      {getModifierString(modifier)}
    </Badge>
  );
};

export default StatModifier;
