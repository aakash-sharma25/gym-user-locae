import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";

interface VoiceCoachingToggleProps {
  isEnabled: boolean;
  isSpeaking: boolean;
  onToggle: () => void;
}

export const VoiceCoachingToggle = ({ isEnabled, isSpeaking, onToggle }: VoiceCoachingToggleProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className={`relative flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
        isEnabled
          ? "bg-fitness-purple/20 text-fitness-purple"
          : "bg-muted/50 text-muted-foreground hover:bg-muted"
      }`}
    >
      {isEnabled ? (
        <Mic className="h-4 w-4" />
      ) : (
        <MicOff className="h-4 w-4" />
      )}
      <span className="hidden sm:inline">
        {isEnabled ? "Voice On" : "Voice Off"}
      </span>
      
      {/* Speaking indicator */}
      {isEnabled && isSpeaking && (
        <motion.div
          className="absolute -top-1 -right-1 flex gap-0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-fitness-purple rounded-full"
              animate={{
                height: [4, 8, 4],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.button>
  );
};
