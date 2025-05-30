import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DiceButtonProps {
  label: string;
  onClick: () => void;
  variant?: "hope" | "fear" | "default";
  className?: string;
}

const variantStyles = {
  hope: "border-green-500 text-green-400 hover:bg-green-500/20",
  fear: "border-red-500 text-red-400 hover:bg-red-500/20",
  default: "border-purple-400 text-purple-300 hover:bg-purple-500/20",
};

const DiceButton = ({
  label,
  onClick,
  variant = "default",
  className,
}: DiceButtonProps) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={cn(variantStyles[variant], className)}
    >
      {label}
    </Button>
  );
};

export default DiceButton;
