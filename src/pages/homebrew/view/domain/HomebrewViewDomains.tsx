import DomainCards from "@/components/domain/DomainCard";
import { useAuth } from "@/contexts/AuthContext";
import { getAllDomains } from "@/integrations/supabase/helpers";
import { Domain } from "@/lib/types";
import { JSX, useEffect, useState } from "react";

const HomebrewViewDomains = (): JSX.Element => {
  const [domainsData, setDomainsData] = useState<Domain[] | null>(null);
  const [myDomainsData, setMyDomainsData] = useState<Domain[] | null>(null);
  const { user } = useAuth();

  const fetchDomains = async () => {
    try {
      const data = await getAllDomains({
        homebrew: true,
      });

      if (data) {
        setDomainsData(data);
      }

      if (user) {
        const myData = await getAllDomains({
          homebrew: true,
          user_id: user.id,
        });

        if (myData) {
          setMyDomainsData(myData);
          // Filter out user's domains from all domains to avoid duplication
          const otherDomains =
            data?.filter((domain) => domain.user_id !== user.id) ?? [];
          setDomainsData(otherDomains);
        }
      }
    } catch (error) {
      console.error("Failed to fetch domains:", error);
      // Consider showing a user-friendly error message here
    }
  };

  useEffect(() => {
    void fetchDomains();
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-nebula py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Homebrew Domains
          </h1>
          <p className="text-xl text-purple-200">
            All published homebrew domains
          </p>
        </div>
        <h2 className="text-2xl text-white text-center mb-4">
          My Homebrew Domains
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DomainCards domainsData={myDomainsData} />
        </div>

        <h2 className="text-2xl text-white text-center mb-4">
          All Homebrew Domains
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DomainCards domainsData={domainsData} />
        </div>
      </div>
    </div>
  );
};

export default HomebrewViewDomains;
