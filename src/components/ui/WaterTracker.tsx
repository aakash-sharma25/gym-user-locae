import { motion } from "framer-motion";
import { Droplets } from "lucide-react";

interface WaterTrackerProps {
  current: number;
  target: number;
  onAdd: () => void;
}

export const WaterTracker = ({ current, target, onAdd }: WaterTrackerProps) => {
  const glasses = Array(target).fill(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Water Intake</span>
        <span className="text-xs text-muted-foreground">
          {current}/{target} glasses
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {glasses.map((_, index) => (
          <motion.button
            key={index}
            onClick={index === current ? onAdd : undefined}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
              index < current
                ? "bg-blue-500/20 text-blue-400"
                : index === current
                ? "bg-blue-500/10 text-blue-400/50 ring-2 ring-blue-400/50 ring-offset-2 ring-offset-background"
                : "bg-muted/50 text-muted-foreground/30"
            }`}
            disabled={index !== current}
          >
            <Droplets
              className={`h-5 w-5 ${index < current ? "water-drop" : ""}`}
            />
            {index === current && (
              <motion.div
                className="absolute inset-0 rounded-xl bg-blue-400/20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
