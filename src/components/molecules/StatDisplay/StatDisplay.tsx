
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import StatValue from "@/components/atoms/StatValue";
import StatModifier from "@/components/atoms/StatModifier";
import { ReactNode } from "react";

interface StatDisplayProps {
  name: string;
  value: number;
  modifier: number;
  icon: ReactNode;
}

const StatDisplay = ({ name, value, modifier, icon }: StatDisplayProps) => {
  return (
    <Card className="bg-slate-800/30 border-brand-500/20 hover:border-brand-400/40 transition-colors">
      <CardContent className="p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          {icon}
          <Text variant="label" color="primary" className="text-sm">
            {name}
          </Text>
        </div>
        <div className="space-y-1">
          <StatValue value={value} />
          <StatModifier modifier={modifier} size="sm" />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatDisplay;
