import { motion } from "framer-motion";
import { Check, Edit2 } from "lucide-react";

interface SetData {
  setNumber: number;
  reps: number;
  weight: number;
  rpe: number | null;
  completed: boolean;
}

interface SetCardProps {
  set: SetData;
  isActive: boolean;
  onClick: () => void;
}

export const SetCard = ({ set, isActive, onClick }: SetCardProps) => {
  const getRPEColor = (rpe: number | null) => {
    if (!rpe) return "bg-muted";
    if (rpe <= 3) return "bg-fitness-success/20 text-fitness-success";
    if (rpe <= 6) return "bg-fitness-yellow/20 text-fitness-yellow";
    if (rpe <= 8) return "bg-fitness-orange/20 text-fitness-orange";
    return "bg-fitness-error/20 text-fitness-error";
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative w-full p-4 rounded-xl text-left transition-all ${
        set.completed
          ? "bg-fitness-success/10 border border-fitness-success/30"
          : isActive
          ? "bg-fitness-orange/10 border border-fitness-orange/50 ring-2 ring-fitness-orange/30"
          : "bg-muted/30 border border-border/50"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              set.completed
                ? "bg-fitness-success text-white"
                : isActive
                ? "bg-fitness-orange text-white"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {set.completed ? (
              <Check className="h-4 w-4" />
            ) : (
              <span className="text-sm font-bold">{set.setNumber}</span>
            )}
          </div>
          
          <div>
            <p className={`font-medium ${set.completed ? "text-fitness-success" : "text-foreground"}`}>
              Set {set.setNumber}
            </p>
            <p className="text-sm text-muted-foreground">
              {set.reps} reps {set.weight > 0 && `@ ${set.weight}kg`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {set.completed && set.rpe && (
            <span className={`px-2 py-1 rounded-lg text-xs font-bold ${getRPEColor(set.rpe)}`}>
              RPE {set.rpe}
            </span>
          )}
          {set.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="p-1.5 rounded-full bg-muted/50"
            >
              <Edit2 className="h-3 w-3 text-muted-foreground" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.button>
  );
};
