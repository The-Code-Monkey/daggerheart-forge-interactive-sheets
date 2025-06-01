import StatDisplay from "@/components/molecules/StatDisplay";
import { ReactNode } from "react";

interface StatData {
  name: string;
  value: number;
  modifier: number;
  icon: ReactNode;
}

interface StatsGridProps {
  stats: StatData[];
  columns?: number;
}

const StatsGrid = ({
  stats,
  columns = 3,
}: StatsGridProps): React.JSX.Element => {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    6: "grid-cols-6",
  };

  return (
    <div
      className={`grid ${gridCols[columns as keyof typeof gridCols] || "grid-cols-3"} gap-4`}
    >
      {stats.map((stat, index) => (
        <StatDisplay
          key={index}
          name={stat.name}
          value={stat.value}
          modifier={stat.modifier}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
