import DiceCanvas from "@/components/organisms/Dice";
import { JSX } from "react";

const DicePage = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-nebula p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Your Digital Dice Tray
            </h1>
            <p className="text-brand-200">Let's roll some dice!</p>
          </div>
        </div>
        <div className="w-full">
          <DiceCanvas />
        </div>
      </div>
    </div>
  );
};

export default DicePage;
