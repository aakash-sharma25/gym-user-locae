import { motion } from "framer-motion";
import { Timer, Dumbbell, Flame, Zap } from "lucide-react";

interface QuickStatsPanelProps {
  totalTime: number; // in seconds
  totalVolume: number; // sets × reps × weight
  exercisesCompleted: number;
  totalExercises: number;
}

export const QuickStatsPanel = ({ 
  totalTime, 
  totalVolume, 
  exercisesCompleted,
  totalExercises 
}: QuickStatsPanelProps) => {
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
    {
      icon: Timer,
      label: "Time",
      value: formatTime(totalTime),
      color: "text-fitness-orange",
      bgColor: "bg-fitness-orange/10",
    },
    {
      icon: Dumbbell,
      label: "Volume",
      value: `${formatVolume(totalVolume)}kg`,
      color: "text-fitness-purple",
      bgColor: "bg-fitness-purple/10",
    },
    {
      icon: Zap,
      label: "Done",
      value: `${exercisesCompleted}/${totalExercises}`,
      color: "text-fitness-yellow",
      bgColor: "bg-fitness-yellow/10",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between gap-2"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`flex-1 flex flex-col items-center p-3 rounded-xl ${stat.bgColor}`}
        >
          <stat.icon className={`h-4 w-4 ${stat.color} mb-1`} />
          <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
          <span className="text-xs text-muted-foreground">{stat.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};
