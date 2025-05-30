
import StatDisplay from "@/components/molecules/StatDisplay";
import { ReactNode } from "react";

interface StatBlockProps {
  name: string;
  value: number;
  modifier: number;
  icon: ReactNode;
}

const StatBlock = ({ name, value, modifier, icon }: StatBlockProps) => {
  return (
    <StatDisplay 
      name={name}
      value={value}
      modifier={modifier}
      icon={icon}
    />
  );
};

export default StatBlock;
