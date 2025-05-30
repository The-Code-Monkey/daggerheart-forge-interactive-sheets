
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "caption" | "label";
  color?: "primary" | "secondary" | "accent" | "muted";
  className?: string;
}

const variantStyles = {
  h1: "text-5xl md:text-7xl font-bold leading-tight",
  h2: "text-4xl font-bold",
  h3: "text-2xl font-semibold leading-none tracking-tight",
  h4: "text-xl font-bold",
  body: "text-base leading-relaxed",
  caption: "text-sm",
  label: "text-sm font-medium"
};

const colorStyles = {
  primary: "text-white",
  secondary: "text-purple-200",
  accent: "text-yellow-400",
  muted: "text-purple-300"
};

const Text = ({ children, variant = "body", color = "primary", className }: TextProps) => {
  const Component = variant.startsWith('h') ? variant : 'p';
  
  return (
    <Component className={cn(variantStyles[variant], colorStyles[color], className)}>
      {children}
    </Component>
  );
};

export default Text;
