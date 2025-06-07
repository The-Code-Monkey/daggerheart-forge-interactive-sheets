import Text from "@/components/atoms/Text";
import FeatureCard from "@/components/FeatureCard";
import { Sparkles } from "lucide-react";
import { JSX } from "react";
import { Link } from "react-router-dom";

const features: {
  title: string;
  description: string;
  icon?: typeof Sparkles;
}[] = [
  {
    title: "Class",
    description: "Create your own class with custom features.",
    icon: Sparkles,
  },
  {
    title: "Subclass",
    description: "Create your own subclass with custom features.",
    icon: Sparkles,
  },
  {
    title: "Domain",
    description: "Create your own domain with custom features.",
    icon: Sparkles,
  },
];

const Homebrew = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-nebula">
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
          <Text variant="h1" color="primary" className="mb-6">
            Homebrew
          </Text>

          <Text
            variant="body"
            color="secondary"
            className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto"
          >
            Here you can find all the homebrew content created by the community.
            Feel free to explore and contribute!
          </Text>
        </div>
      </section>

      <section className="py-20 px-4 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link to={`/homebrew/${feature.title.toLowerCase()}`}>
                <FeatureCard key={index} {...feature} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homebrew;
