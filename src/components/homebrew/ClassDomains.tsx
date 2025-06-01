import { JSX, useEffect, useState } from "react";
import { FormField, FormItem, FormControl, FormMessage } from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { getAllDomains } from "@/integrations/supabase/helpers";
import { Domain } from "@/lib/types";

interface ClassDomainsProps {
  form: UseFormReturn<any>;
}

const ClassDomains = ({ form }: ClassDomainsProps): JSX.Element => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<number[]>([]);

  useEffect(() => {
    const fetchDomains = async () => {
      const domainsData = await getAllDomains();
      if (domainsData) {
        setDomains(domainsData);
      }
    };
    void fetchDomains();
  }, []);

  const handleDomainToggle = (domainId: number, checked: boolean) => {
    const newSelectedDomains = checked
      ? [...selectedDomains, domainId]
      : selectedDomains.filter((id) => id !== domainId);

    setSelectedDomains(newSelectedDomains);
    form.setValue("domains", newSelectedDomains);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-white mb-4">
        Available Domains
      </h3>
      <p className="text-purple-200 mb-4">
        Select the domains that this class can access. Classes typically have
        access to 2-3 domains.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {domains.map((domain) => (
          <div
            key={domain.id}
            className="bg-slate-800/30 p-4 rounded-lg border border-brand-500/20"
          >
            <div className="flex items-start space-x-3">
              <Checkbox
                id={`domain-${String(domain.id)}`}
                checked={selectedDomains.includes(domain.id)}
                onCheckedChange={(checked) => {
                  handleDomainToggle(domain.id, checked as boolean);
                }}
                className="mt-1"
              />
              <div className="flex-1">
                <label
                  htmlFor={`domain-${String(domain.id)}`}
                  className="text-white font-medium cursor-pointer"
                >
                  {domain.name}
                </label>
                {domain.description && (
                  <p className="text-purple-200 text-sm mt-1">
                    {domain.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <FormField
        control={form.control}
        name="domains"
        render={({ field }) => (
          <FormItem className="hidden">
            <FormControl>
              <input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ClassDomains;
