import { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
  "data-sidebar"?: string;
}

export const Skeleton = ({ className, style, ...props }: SkeletonProps) => {
  return <div className={cn("skeleton", className)} style={style} {...props} />;
};

export const SkeletonCard = () => {
  return (
    <div className="glass-card p-4 space-y-4">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-20 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
};

export const SkeletonList = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-3">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
    </div>
  );
};
