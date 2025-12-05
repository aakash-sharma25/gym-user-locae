import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  solid?: boolean;
  gradient?: boolean;
  hover?: boolean;
}

export const GlassCard = ({
  children,
  className = "",
  solid = false,
  gradient = false,
  hover = true,
  ...props
}: GlassCardProps) => {
  return (
    <motion.div
      whileTap={hover ? { scale: 0.98 } : undefined}
      whileHover={hover ? { scale: 1.01 } : undefined}
      className={cn(
        solid ? "glass-card-solid" : "glass-card",
        gradient && "gradient-primary",
        "transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
