import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gradient-to-br from-slate-800/50 to-slate-900/50", className)}
      {...props}
    />
  );
}

export { Skeleton };
