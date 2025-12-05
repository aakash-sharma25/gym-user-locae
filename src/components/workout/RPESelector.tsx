import { motion } from "framer-motion";

interface RPESelectorProps {
  value: number | null;
  onChange: (rpe: number) => void;
}

const rpeData = [
  { value: 1, emoji: "😴", label: "Very Easy" },
  { value: 2, emoji: "😌", label: "Easy" },
  { value: 3, emoji: "🙂", label: "Light" },
  { value: 4, emoji: "😊", label: "Moderate" },
  { value: 5, emoji: "😐", label: "Somewhat Hard" },
  { value: 6, emoji: "😤", label: "Hard" },
  { value: 7, emoji: "😰", label: "Very Hard" },
  { value: 8, emoji: "😫", label: "Extremely Hard" },
  { value: 9, emoji: "🥵", label: "Max Effort" },
  { value: 10, emoji: "💀", label: "Absolute Max" },
];

export const RPESelector = ({ value, onChange }: RPESelectorProps) => {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-muted-foreground text-center">
        How hard was that set?
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {rpeData.map((rpe) => (
          <motion.button
            key={rpe.value}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(rpe.value)}
            className={`flex flex-col items-center justify-center w-12 h-14 rounded-xl transition-all ${
              value === rpe.value
                ? "bg-fitness-orange text-white shadow-lg shadow-fitness-orange/30"
                : "bg-muted/50 hover:bg-muted"
            }`}
          >
            <span className="text-lg">{rpe.emoji}</span>
            <span className="text-xs font-bold">{rpe.value}</span>
          </motion.button>
        ))}
      </div>
      {value && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-fitness-orange font-medium"
        >
          {rpeData.find((r) => r.value === value)?.label}
        </motion.p>
      )}
    </div>
  );
};
