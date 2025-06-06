import SubclassCards from "@/components/class/SubclassCard";
import { useAuth } from "@/contexts/AuthContext";
import { getAllSubclasses } from "@/integrations/supabase/helpers/classes";
import { Subclass } from "@/lib/types";
import { JSX, useEffect, useState } from "react";

const HomebrewViewSubclasses = (): JSX.Element => {
  const [subclassesData, setSubclassesData] = useState<Subclass[] | null>(null);
  const [mySubclassesData, setMySubclassesData] = useState<Subclass[] | null>(
    null
  );
  const { user } = useAuth();

  const fetchClasses = async () => {
    const data = await getAllSubclasses({
      homebrew: true,
    });
    if (data) {
      setSubclassesData(data);
    }

    if (user) {
      const myData = await getAllSubclasses({
        homebrew: true,
        user_id: user.id,
      });
      if (myData) {
        setMySubclassesData(myData);
      }
    }
  };

  useEffect(() => {
    void fetchClasses();
  }, [user]);

  return (
    <div className="min-h-screen bg-nebula py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Homebrew Subclasses
          </h1>
          <p className="text-xl text-purple-200">
            All published homebrew subclasses
          </p>
        </div>
        <h2 className="text-2xl text-white text-center mb-4">
          My Homebrew Subclasses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SubclassCards classesData={mySubclassesData} />
        </div>

        <h2 className="text-2xl text-white text-center mb-4">
          All Homebrew Subclasses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SubclassCards classesData={subclassesData} />
        </div>
      </div>
    </div>
  );
};

export default HomebrewViewSubclasses;
