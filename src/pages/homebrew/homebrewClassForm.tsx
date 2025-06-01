import { JSX, useState } from "react";

const HomebrewClassForm = (): JSX.Element => {
  const [formData, setFormData] = useState({
    isHomebrew: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Homebrew Class Builder
          </h1>
          <p className="text-xl text-purple-200">
            Create your Daggerheart class
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomebrewClassForm;
