
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dice1, Users, BookOpen, Sword, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import FeaturedCampaigns from "@/components/FeaturedCampaigns";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Character Sheets",
      description:
        "Create and manage detailed Daggerheart characters with all stats, abilities, and equipment tracked automatically.",
    },
    {
      icon: Users,
      title: "Campaign Management",
      description:
        "Organize your campaigns, track party members, and manage session notes in one centralized location.",
    },
    {
      icon: Dice1,
      title: "Digital Dice Rolling",
      description:
        "Built-in dice roller with Daggerheart's unique mechanics, including Hope and Fear dice.",
    },
    {
      icon: Sword,
      title: "Combat Tracker",
      description:
        "Streamlined initiative tracking and combat management for smooth gameplay sessions.",
    },
    {
      icon: Shield,
      title: "Equipment Manager",
      description:
        "Comprehensive inventory system with item descriptions, stats, and automatic calculations.",
    },
    {
      icon: Sparkles,
      title: "Spell & Ability Cards",
      description:
        "Beautiful card-based interface for managing spells, class features, and special abilities.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-900 via-brand-800 to-slate-900">
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need for{" "}
              <span className="text-yellow-400">Daggerheart</span>
            </h2>
            <p className="text-xl text-brand-200 max-w-3xl mx-auto">
              A comprehensive digital toolset designed specifically for
              Daggerheart campaigns and character management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns Section */}
      <FeaturedCampaigns />

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-brand-800/50 to-blue-800/50 border-brand-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-white mb-4">
                Ready to Begin Your Adventure?
              </CardTitle>
              <CardDescription className="text-xl text-brand-200">
                Join thousands of players using our tools to enhance their
                Daggerheart experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/character-builder">
                  <Button
                    size="lg"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3"
                  >
                    Create Character
                  </Button>
                </Link>
                <Link to="/campaigns">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-brand-400 text-brand-100 px-8 py-3"
                  >
                    Manage Campaigns
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
