import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

interface StatBlockProps {
  name: string;
  value: number;
  modifier: number;
  icon: ReactNode;
}

const StatBlock = ({ name, value, modifier, icon }: StatBlockProps) => {
  const getModifierString = (mod: number) => {
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  return (
    <Card className="bg-slate-800/30 border-purple-500/20 hover:border-purple-400/40 transition-colors">
      <CardContent className="p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          {icon}
          <span className="text-white font-medium text-sm">{name}</span>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-white">{value}</div>
          <Badge
            variant="secondary"
            className={`text-xs ${modifier >= 0 ? "bg-green-600/50" : "bg-red-600/50"} text-white`}
          >
            {getModifierString(modifier)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatBlock;
