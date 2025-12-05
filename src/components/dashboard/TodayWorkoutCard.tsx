import { motion } from "framer-motion";
import { Clock, Flame, Play, ChevronRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { LottieAnimation } from "@/components/ui/LottieAnimation";
import { useNavigate } from "react-router-dom";

interface TodayWorkoutCardProps {
  name: string;
  duration: number;
  calories: number;
  exercises: number;
  difficulty: string;
  muscleGroups: string[];
}

export const TodayWorkoutCard = ({
  name,
  duration,
  calories,
  exercises,
  difficulty,
  muscleGroups,
}: TodayWorkoutCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="px-4"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Today's Workout</h2>
        <button className="flex items-center gap-1 text-sm text-fitness-orange">
          View All <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <GlassCard className="overflow-hidden" hover>
        <div className="p-4">
          <div className="flex gap-4">
            <LottieAnimation type="bench-press" size={80} />
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">{name}</h3>
              
              <div className="mt-1 flex flex-wrap gap-1">
                {muscleGroups.map((group) => (
                  <span
                    key={group}
                    className="rounded-full bg-fitness-purple/20 px-2 py-0.5 text-[10px] font-medium text-fitness-purple"
                  >
                    {group}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-fitness-orange" />
                  <span>{duration} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="h-4 w-4 text-fitness-yellow" />
                  <span>{calories} cal</span>
                </div>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {exercises} exercises
                </span>
                <span className="rounded-full bg-fitness-success/20 px-2 py-0.5 text-[10px] font-medium text-fitness-success">
                  {difficulty}
                </span>
              </div>
            </div>
          </div>

          <AnimatedButton
            variant="gradient"
            fullWidth
            className="mt-4"
            icon={<Play className="h-5 w-5" />}
            onClick={() => navigate("/workout")}
          >
            Start Workout
          </AnimatedButton>
        </div>
      </GlassCard>
    </motion.section>
  );
};
