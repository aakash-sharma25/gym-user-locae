import { useCallback, useRef, useState } from "react";

interface VoiceCoachingOptions {
  voice?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export const useVoiceCoaching = (options: VoiceCoachingOptions = {}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const { rate = 1.0, pitch = 1.0, volume = 0.8 } = options;

  const initSynth = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
      return true;
    }
    return false;
  }, []);

  const speak = useCallback(
    (text: string, priority: boolean = false) => {
      if (!isEnabled) return;

      if (!synthRef.current) {
        if (!initSynth()) return;
      }

      // Cancel current speech if priority
      if (priority && synthRef.current?.speaking) {
        synthRef.current.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;

      // Try to use a fitness-appropriate voice
      const voices = synthRef.current?.getVoices() || [];
      const preferredVoice = voices.find(
        (v) =>
          v.name.includes("Google") ||
          v.name.includes("Samantha") ||
          v.name.includes("Daniel")
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      synthRef.current?.speak(utterance);
    },
    [isEnabled, initSynth, rate, pitch, volume]
  );

  const cancel = useCallback(() => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
  }, []);

  // Pre-defined coaching messages
  const announceSetComplete = useCallback(
    (setNumber: number, totalSets: number) => {
      if (setNumber === totalSets) {
        speak("Exercise complete! Great work!", true);
      } else {
        speak(`Set ${setNumber} complete. ${totalSets - setNumber} sets remaining.`, true);
      }
    },
    [speak]
  );

  const announceRestCountdown = useCallback(
    (seconds: number) => {
      if (seconds === 10) {
        speak("10 seconds", true);
      } else if (seconds === 5) {
        speak("5 seconds", true);
      } else if (seconds === 3) {
        speak("3", true);
      } else if (seconds === 2) {
        speak("2", true);
      } else if (seconds === 1) {
        speak("1", true);
      }
    },
    [speak]
  );

  const announceRestComplete = useCallback(() => {
    speak("Rest complete. Let's go!", true);
  }, [speak]);

  const announceExercise = useCallback(
    (name: string, sets: number, reps: number, weight?: number) => {
      const weightText = weight ? ` at ${weight} kilograms` : "";
      speak(`Next exercise: ${name}. ${sets} sets of ${reps} reps${weightText}.`, true);
    },
    [speak]
  );

  const announceWorkoutStart = useCallback(() => {
    speak("Workout started. Let's crush it!", true);
  }, [speak]);

  const announceWorkoutComplete = useCallback(() => {
    speak("Congratulations! Workout complete! You did amazing!", true);
  }, [speak]);

  const announceRPE = useCallback(
    (rpe: number) => {
      if (rpe >= 9) {
        speak("Max effort! Incredible push!", false);
      } else if (rpe >= 7) {
        speak("Strong effort! Keep it up!", false);
      } else if (rpe <= 3) {
        speak("Feeling strong! Consider adding weight.", false);
      }
    },
    [speak]
  );

  const toggleEnabled = useCallback(() => {
    setIsEnabled((prev) => {
      if (prev) cancel();
      return !prev;
    });
  }, [cancel]);

  return {
    speak,
    cancel,
    isEnabled,
    isSpeaking,
    toggleEnabled,
    setIsEnabled,
    announceSetComplete,
    announceRestCountdown,
    announceRestComplete,
    announceExercise,
    announceWorkoutStart,
    announceWorkoutComplete,
    announceRPE,
  };
};
