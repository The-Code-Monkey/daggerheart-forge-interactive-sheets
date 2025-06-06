import ClassCards from "@/components/class/ClassCard";
import { useAuth } from "@/contexts/AuthContext";
import { getAllClassesWithDomains } from "@/integrations/supabase/helpers";
import { Class } from "@/lib/types";
import { JSX, useEffect, useState } from "react";

const HomebrewViewClasses = (): JSX.Element => {
  const [classesData, setClassesData] = useState<Partial<Class>[] | null>(null);
  const [myClassesData, setMyClassesData] = useState<Partial<Class>[] | null>(
    null
  );
  const { user } = useAuth();

  const fetchClasses = async () => {
    const data = await getAllClassesWithDomains({
      homebrew: true,
    });
    if (data) {
      setClassesData(data);
    }

    if (user) {
      const myData = await getAllClassesWithDomains({
        homebrew: true,
        user_id: user.id,
      });
      if (myData) {
        setMyClassesData(myData);
      }
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
        <h2 className="text-2xl text-white text-center mb-4">
          My Homebrew Classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ClassCards classesData={myClassesData} />
        </div>

        <h2 className="text-2xl text-white text-center mb-4">
          All Homebrew Classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ClassCards classesData={classesData} />
        </div>
      </div>
    </div>
  );
};

export default HomebrewViewClasses;
