import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import Icon from "../../atoms/Icon";
import GradientBox from "../../atoms/GradientBox";
import Text from "../../atoms/Text";
import { JSX } from "react";
import { LucideIcon } from "lucide-react";

interface IconCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
}

const IconCard = ({ icon, title, description }: IconCardProps): JSX.Element => {
  return (
    <Card className="bg-linear-to-br from-slate-800/80 to-slate-900/80 border-brand-500/30 backdrop-blur-xs hover:border-brand-400/50 transition-all duration-300 hover:scale-105">
      <CardHeader>
        {icon && (
          <GradientBox
            variant="primary"
            className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
          >
            <Icon icon={icon} className="text-black" />
          </GradientBox>
        )}
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Text variant="body" color="primary" className="text-white">
          {description}
        </Text>
      </CardContent>
    </Card>
  );
};

export default IconCard;
