import { motion } from "framer-motion";
import { Crown, Calendar, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProgressRing } from "@/components/ui/ProgressRing";

interface MembershipCardProps {
  plan: string;
  expiry: string;
  daysLeft: number;
  progress: number;
}

export const MembershipCard = ({
  plan,
  expiry,
  daysLeft,
  progress,
}: MembershipCardProps) => {
  return (
    <GlassCard
      className="mx-4 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="relative p-4">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-primary opacity-10" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Crown className="h-5 w-5 text-fitness-yellow" />
              </motion.div>
              <span className="text-sm font-semibold text-foreground">
                {plan} Member
              </span>
            </div>
            
            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Expires {expiry}</span>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-3 inline-flex items-center gap-1 rounded-full bg-fitness-orange/20 px-3 py-1"
            >
              <TrendingUp className="h-3 w-3 text-fitness-orange" />
              <span className="text-xs font-medium text-fitness-orange">
                {daysLeft} days left
              </span>
            </motion.div>
          </div>

          <ProgressRing progress={progress} size={70} strokeWidth={5}>
            <div className="text-center">
              <span className="text-lg font-bold text-foreground">{progress}%</span>
              <p className="text-[10px] text-muted-foreground">Goal</p>
            </div>
          </ProgressRing>
        </div>
      </div>
    </GlassCard>
  );
};
