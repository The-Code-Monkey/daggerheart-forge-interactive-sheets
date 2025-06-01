import { Sparkles } from "lucide-react";
import CTAButtonGroup from "@/components/molecules/CTAButtonGroup";
import HeroStats from "@/components/molecules/HeroStats";
import Text from "@/components/atoms/Text";
import { Badge } from "@/components/ui/badge";
import { JSX } from "react";

const HeroSection = (): JSX.Element => {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-pulse">
          <Sparkles className="text-yellow-400 w-6 h-6" />
        </div>
        <div className="absolute top-40 right-20 animate-pulse delay-1000">
          <Sparkles className="text-brand-400 w-4 h-4" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-pulse delay-2000">
          <Sparkles className="text-blue-400 w-5 h-5" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="mb-8">
          <Badge className="inline-flex items-center px-4 py-2 rounded-full bg-brand-800/50 text-brand-200 text-sm font-medium border border-brand-600/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Built for Daggerheart
          </Badge>
        </div>

        <Text variant="h1" color="primary" className="mb-6">
          Your Digital
          <br />
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Adventure Hub
          </span>
        </Text>

        <Text
          variant="body"
          color="secondary"
          className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto"
        >
          Create characters, manage campaigns, and enhance your Daggerheart
          experience with our comprehensive digital toolset designed for players
          and Game Masters.
        </Text>

        <CTAButtonGroup />

        <HeroStats />
      </div>
    </section>
  );
};

export default HeroSection;
