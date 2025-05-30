
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/atoms/Icon";
import GradientBox from "@/components/atoms/GradientBox";
import Text from "@/components/atoms/Text";
import { LucideIcon } from "lucide-react";

interface IconCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const IconCard = ({ icon, title, description }: IconCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/30 backdrop-blur-sm hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
      <CardHeader>
        <GradientBox 
          variant="primary" 
          className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        >
          <Icon icon={icon} className="text-black" />
        </GradientBox>
        <CardTitle>
          <Text variant="h4" color="primary">{title}</Text>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <Text variant="body" color="secondary">{description}</Text>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default IconCard;
