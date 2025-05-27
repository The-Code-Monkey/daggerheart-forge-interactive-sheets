
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-pulse">
          <Sparkles className="text-yellow-400 w-6 h-6" />
        </div>
        <div className="absolute top-40 right-20 animate-pulse delay-1000">
          <Sparkles className="text-purple-400 w-4 h-4" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-pulse delay-2000">
          <Sparkles className="text-blue-400 w-5 h-5" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="mb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-800/50 text-purple-200 text-sm font-medium border border-purple-600/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Built for Daggerheart
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Your Digital
          <br />
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Adventure Hub
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-purple-200 mb-10 max-w-4xl mx-auto leading-relaxed">
          Create characters, manage campaigns, and enhance your Daggerheart experience with 
          our comprehensive digital toolset designed for players and Game Masters.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/character-builder">
            <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-8 py-4 text-lg group">
              Start Building
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <Link to="/demo">
            <Button size="lg" variant="ghost" className="text-white border-2 border-purple-400 hover:bg-purple-700/30 px-8 py-4 text-lg">
              View Demo
            </Button>
          </Link>
        </div>

        <div className="mt-16 flex justify-center items-center space-x-8 text-purple-300">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">10K+</div>
            <div className="text-sm">Characters Created</div>
          </div>
          <div className="w-px h-12 bg-purple-600"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">500+</div>
            <div className="text-sm">Active Campaigns</div>
          </div>
          <div className="w-px h-12 bg-purple-600"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">50K+</div>
            <div className="text-sm">Dice Rolled</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
