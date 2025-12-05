import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface StreakBadgeProps {
  streak: number;
  size?: "sm" | "md" | "lg";
}

export const StreakBadge = ({ streak, size = "md" }: StreakBadgeProps) => {
  const sizeClasses = {
    sm: "h-8 px-2 text-xs gap-1",
    md: "h-10 px-3 text-sm gap-1.5",
    lg: "h-12 px-4 text-base gap-2",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center rounded-full bg-gradient-to-r from-fitness-orange to-fitness-yellow ${sizeClasses[size]}`}
    >
      <motion.div
        animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
      >
        <Flame className={`${iconSizes[size]} text-white`} />
      </motion.div>
      <span className="font-bold text-white">{streak}</span>
      <span className="font-medium text-white/80">day streak</span>
    </motion.div>
  );
};
