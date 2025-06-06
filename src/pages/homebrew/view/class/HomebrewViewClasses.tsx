import ClassCards from "@/components/class/ClassCard";
import { getAllClassesWithDomains } from "@/integrations/supabase/helpers";
import { Class } from "@/lib/types";
import { JSX, useEffect, useState } from "react";

const HomebrewViewClasses = (): JSX.Element => {
  const [classesData, setClassesData] = useState<Partial<Class>[]>([]);

  const fetchClasses = async () => {
    const data = await getAllClassesWithDomains({
      homebrew: true,
    });
    if (data) {
      setClassesData(data);
    }
  };

  useEffect(() => {
    void fetchClasses();
  }, []);

  return (
    <div className="min-h-screen bg-nebula py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Homebrew Classes
          </h1>
          <p className="text-xl text-purple-200">
            All published homebrew classes
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ClassCards classesData={classesData} />
        </div>
      </div>
    </div>
  );
};

export default HomebrewViewClasses;
