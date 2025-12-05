import { motion } from "framer-motion";
import { ProgressRing } from "./ProgressRing";

interface MacroRingProps {
  label: string;
  current: number;
  target: number;
  unit?: string;
  color: string;
  size?: number;
}

export const MacroRing = ({
  label,
  current,
  target,
  unit = "g",
  color,
  size = 60,
}: MacroRingProps) => {
  const progress = Math.min((current / target) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-1"
    >
      <ProgressRing
        progress={progress}
        size={size}
        strokeWidth={5}
        color={color}
      >
        <span className="text-xs font-bold text-foreground">
          {Math.round(progress)}%
        </span>
      </ProgressRing>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className="text-[10px] text-muted-foreground">
        {current}/{target}{unit}
      </span>
    </motion.div>
  );
};
