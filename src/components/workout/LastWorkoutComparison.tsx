import { motion } from "framer-motion";
import { History, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface LastWorkoutData {
  sets: number;
  reps: number;
  weight: number;
  date: string;
}

interface LastWorkoutComparisonProps {
  lastWorkout: LastWorkoutData | null;
  currentWeight: number;
}

export const LastWorkoutComparison = ({ lastWorkout, currentWeight }: LastWorkoutComparisonProps) => {
  if (!lastWorkout) return null;

  const weightDiff = currentWeight - lastWorkout.weight;
  const TrendIcon = weightDiff > 0 ? TrendingUp : weightDiff < 0 ? TrendingDown : Minus;
  const trendColor = weightDiff > 0 ? "text-fitness-success" : weightDiff < 0 ? "text-fitness-error" : "text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-2 p-2 rounded-lg bg-muted/30 mb-3"
    >
      <History className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">
        Last: {lastWorkout.sets}×{lastWorkout.reps} @ {lastWorkout.weight}kg
      </span>
      {weightDiff !== 0 && (
        <span className={`flex items-center gap-0.5 text-xs font-medium ${trendColor}`}>
          <TrendIcon className="h-3 w-3" />
          {Math.abs(weightDiff)}kg
        </span>
      )}
    </motion.div>
  );
};
