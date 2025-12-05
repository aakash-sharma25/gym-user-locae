import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, StickyNote, Save } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

interface WorkoutNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: string;
  onSave: (notes: string) => void;
}

export const WorkoutNotesModal = ({ isOpen, onClose, notes, onSave }: WorkoutNotesModalProps) => {
  const [localNotes, setLocalNotes] = useState(notes);

  const handleSave = () => {
    onSave(localNotes);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg"
          >
            <GlassCard className="rounded-b-none p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <StickyNote className="h-5 w-5 text-fitness-yellow" />
                  <h3 className="font-semibold text-foreground">Workout Notes</h3>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </motion.button>
              </div>

              <textarea
                value={localNotes}
                onChange={(e) => setLocalNotes(e.target.value)}
                placeholder="Add notes about your workout... (form cues, how you feel, etc.)"
                className="w-full h-32 p-4 rounded-xl bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-fitness-orange/50 resize-none"
              />

              <div className="flex gap-3 mt-4">
                <AnimatedButton
                  variant="ghost"
                  fullWidth
                  onClick={onClose}
                >
                  Cancel
                </AnimatedButton>
                <AnimatedButton
                  variant="gradient"
                  fullWidth
                  icon={<Save className="h-4 w-4" />}
                  onClick={handleSave}
                >
                  Save Notes
                </AnimatedButton>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
