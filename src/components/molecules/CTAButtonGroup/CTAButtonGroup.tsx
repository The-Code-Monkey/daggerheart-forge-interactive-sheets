import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { JSX } from "react";
import { Link } from "react-router-dom";

interface CTAButtonGroupProps {
  primaryText?: string;
  primaryLink?: string;
  // secondaryText?: string;
  // secondaryLink?: string;
}

const CTAButtonGroup = ({
  primaryText = "Start Building",
  primaryLink = "/character-builder",
  // secondaryText = "View Demo",
  // secondaryLink = "/demo",
}: CTAButtonGroupProps): JSX.Element => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      <Link to={primaryLink}>
        <Button
          size="lg"
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-8 py-4 text-lg group"
        >
          {primaryText}
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>

{/*       <Link to={secondaryLink}>
        <Button
          size="lg"
          variant="ghost"
          className="text-white border-2 border-purple-400 px-8 py-4 text-lg"
        >
          {secondaryText}
        </Button>
      </Link> */}
    </div>
  );
};

export default CTAButtonGroup;
