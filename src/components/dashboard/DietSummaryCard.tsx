import { motion } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { MacroRing } from "@/components/ui/MacroRing";
import { useNavigate } from "react-router-dom";

interface Meal {
  id: string;
  type: string;
  time: string;
  completed: boolean;
}

interface DietSummaryCardProps {
  meals: Meal[];
  calories: { consumed: number; target: number };
  protein: { consumed: number; target: number };
  carbs: { consumed: number; target: number };
  fat: { consumed: number; target: number };
}

export const DietSummaryCard = ({
  meals,
  calories,
  protein,
  carbs,
  fat,
}: DietSummaryCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="px-4"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Today's Diet</h2>
        <button 
          onClick={() => navigate("/diet")}
          className="flex items-center gap-1 text-sm text-fitness-orange"
        >
          View All <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <GlassCard className="p-4">
        {/* Macro Rings */}
        <div className="flex items-center justify-around pb-4 border-b border-border/50">
          <div className="text-center">
            <MacroRing
              label="Calories"
              current={calories.consumed}
              target={calories.target}
              unit=""
              color="hsl(var(--fitness-orange))"
            />
          </div>
          <MacroRing
            label="Protein"
            current={protein.consumed}
            target={protein.target}
            color="hsl(var(--fitness-purple))"
          />
          <MacroRing
            label="Carbs"
            current={carbs.consumed}
            target={carbs.target}
            color="hsl(var(--fitness-yellow))"
          />
          <MacroRing
            label="Fat"
            current={fat.consumed}
            target={fat.target}
            color="hsl(var(--fitness-pink))"
          />
        </div>

        {/* Meal Cards */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {meals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              onClick={() => navigate("/diet")}
              className={`flex cursor-pointer items-center gap-2 rounded-xl p-3 transition-colors ${
                meal.completed
                  ? "bg-fitness-success/10"
                  : "bg-muted/50 hover:bg-muted"
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  meal.completed
                    ? "bg-fitness-success text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {meal.completed ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-bold">
                    {meal.type.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {meal.type}
                </p>
                <p className="text-[10px] text-muted-foreground">{meal.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </motion.section>
  );
};
