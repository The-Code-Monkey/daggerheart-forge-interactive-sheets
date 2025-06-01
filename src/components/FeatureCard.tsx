import { JSX } from "react";
import IconCard from "./molecules/IconCard";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({
  icon,
  title,
  description,
}: FeatureCardProps): JSX.Element => {
  return <IconCard icon={icon} title={title} description={description} />;
};

export default FeatureCard;
