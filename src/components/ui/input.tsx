import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & {
    label?: string;
  }
>(({ className, type, label, ...props }, ref) => {
  if (label) {
    return (
      <div className="flex flex-col gap-2">
        <label className="mr-2 text-sm font-medium">{label}</label>
        <Input className={className} type={type} ref={ref} {...props} />
      </div>
    );
  }

  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-2 focus-visible:border-white md:text-sm text-black",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
