import { JSX } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";

interface ClassStatsProps {
  form: UseFormReturn<any>;
}

const ClassStats = ({ form }: ClassStatsProps): JSX.Element => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-white mb-4">Base Stats</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="base_hp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Base HP</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Base hit points"
                  className="bg-slate-800/50 border-brand-500/30 text-white"
                  {...field}
                  onChange={(e) => {
                    field.onChange(
                      e.target.value ? parseInt(e.target.value) : ""
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="base_evasion"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Base Evasion</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Base evasion value"
                  className="bg-slate-800/50 border-brand-500/30 text-white"
                  {...field}
                  onChange={(e) => {
                    field.onChange(
                      e.target.value ? parseInt(e.target.value) : ""
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="class_items"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Starting Items</FormLabel>
            <FormControl>
              <Input
                placeholder="List of starting items (comma separated)"
                className="bg-slate-800/50 border-brand-500/30 text-white"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ClassStats;
