import { useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Clock, 
  Dumbbell, 
  Flame, 
  TrendingUp, 
  Share2, 
  RotateCcw,
  Star
} from "lucide-react";
import confetti from "canvas-confetti";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

interface PersonalRecord {
  exercise: string;
  type: string; // "weight" | "reps" | "volume"
  value: string;
}

interface CompletionScreenProps {
  workoutName: string;
  totalTime: number;
  totalVolume: number;
  totalSets: number;
  totalReps: number;
  caloriesBurned: number;
  personalRecords: PersonalRecord[];
  onDone: () => void;
  onShare: () => void;
}

export const CompletionScreen = ({
  workoutName,
  totalTime,
  totalVolume,
  totalSets,
  totalReps,
  caloriesBurned,
  personalRecords,
  onDone,
  onShare,
}: CompletionScreenProps) => {
  useEffect(() => {
    // Trigger confetti on mount
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#f97316", "#eab308", "#a855f7", "#22c55e"],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}k`;
    }
    return volume.toString();
  };

  const stats = [
    { icon: Clock, label: "Duration", value: formatTime(totalTime), color: "text-fitness-orange" },
    { icon: Dumbbell, label: "Volume", value: `${formatVolume(totalVolume)}kg`, color: "text-fitness-purple" },
    { icon: TrendingUp, label: "Sets", value: totalSets.toString(), color: "text-fitness-yellow" },
    { icon: Flame, label: "Calories", value: caloriesBurned.toString(), color: "text-fitness-error" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="w-full max-w-sm"
      >
        <GlassCard className="p-6">
          {/* Header */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex justify-center mb-4"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-6xl"
              >
                🎉
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -right-2 -top-2"
              >
                <Trophy className="h-8 w-8 text-fitness-yellow" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-6"
          >
            <h2 className="text-2xl font-bold gradient-text mb-1">
              Workout Complete!
            </h2>
            <p className="text-muted-foreground">{workoutName}</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-3 mb-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex flex-col items-center p-3 rounded-xl bg-muted/30"
              >
                <stat.icon className={`h-5 w-5 ${stat.color} mb-1`} />
                <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Personal Records */}
          {personalRecords.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4 text-fitness-yellow" />
                <span className="text-sm font-semibold text-foreground">Personal Records!</span>
              </div>
              <div className="space-y-2">
                {personalRecords.map((pr, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center justify-between p-2 rounded-lg bg-fitness-yellow/10 border border-fitness-yellow/20"
                  >
                    <span className="text-sm text-foreground">{pr.exercise}</span>
                    <span className="text-sm font-bold text-fitness-yellow">{pr.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex gap-3"
          >
            <AnimatedButton
              variant="ghost"
              fullWidth
              icon={<Share2 className="h-4 w-4" />}
              onClick={onShare}
            >
              Share
            </AnimatedButton>
            <AnimatedButton
              variant="gradient"
              fullWidth
              icon={<RotateCcw className="h-4 w-4" />}
              onClick={onDone}
            >
              Done
            </AnimatedButton>
          </motion.div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};
