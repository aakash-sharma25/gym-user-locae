import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, VideoOff } from "lucide-react";
import { LottieAnimation } from "@/components/ui/LottieAnimation";

interface ExerciseVideoToggleProps {
  exerciseName: string;
  animationType: string;
}

export const ExerciseVideoToggle = ({ exerciseName, animationType }: ExerciseVideoToggleProps) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="space-y-3">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowVideo(!showVideo)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 text-sm text-muted-foreground hover:bg-muted transition-colors mx-auto"
      >
        {showVideo ? (
          <>
            <VideoOff className="h-4 w-4" />
            Hide Demo
          </>
        ) : (
          <>
            <Video className="h-4 w-4" />
            Show Demo
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden flex justify-center"
          >
            <div className="p-4 rounded-xl bg-muted/20">
              <LottieAnimation type={animationType} size={150} />
              <p className="text-xs text-center text-muted-foreground mt-2">
                {exerciseName} Demo
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
