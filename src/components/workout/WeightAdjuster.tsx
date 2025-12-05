import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

interface WeightAdjusterProps {
  weight: number;
  onChange: (weight: number) => void;
  step?: number;
}

export const WeightAdjuster = ({ weight, onChange, step = 2.5 }: WeightAdjusterProps) => {
  const handleDecrease = () => {
    const newWeight = Math.max(0, weight - step);
    onChange(newWeight);
  };

  const handleIncrease = () => {
    onChange(weight + step);
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleDecrease}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/50 text-foreground hover:bg-fitness-orange/20 hover:text-fitness-orange transition-colors"
      >
        <Minus className="h-5 w-5" />
      </motion.button>
      
      <div className="min-w-[100px] text-center">
        <motion.p
          key={weight}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl font-bold gradient-text"
        >
          {weight}
          <span className="text-lg text-muted-foreground ml-1">kg</span>
        </motion.p>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleIncrease}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-muted/50 text-foreground hover:bg-fitness-orange/20 hover:text-fitness-orange transition-colors"
      >
        <Plus className="h-5 w-5" />
      </motion.button>
    </div>
  );
};
