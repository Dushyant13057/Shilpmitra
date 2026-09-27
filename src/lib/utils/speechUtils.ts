/**
 * Browser-native Web Speech API utilities for ShilpMitra.
 * Provides zero-cost, privacy-friendly Text-to-Speech (TTS) and Speech-to-Text (STT).
 */

export type SupportedLanguage =
  | "Hindi"
  | "English"
  | "Marathi"
  | "Bengali"
  | "Gujarati"
  | "Tamil";

export const LANGUAGE_CODES: Record<SupportedLanguage, string> = {
  Hindi: "hi-IN",
  English: "en-IN",
  Marathi: "mr-IN",
  Bengali: "bn-IN",
  Gujarati: "gu-IN",
  Tamil: "ta-IN",
};

/**
 * Checks if browser supports SpeechSynthesis (TTS)
 */
export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/**
 * Speaks text using the browser-native SpeechSynthesis API
 */
export function speakText(
  text: string,
  language: SupportedLanguage = "Hindi",
  onEnd?: () => void
): boolean {
  if (!isSpeechSynthesisSupported()) {
    console.warn("SpeechSynthesis not supported in this browser environment.");
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any active speech

    const utterance = new SpeechSynthesisUtterance(text);
    const langCode = LANGUAGE_CODES[language] || "hi-IN";
    utterance.lang = langCode;
    utterance.rate = 0.95; // Slightly slower, warm, comfortable speaking rate for artisans
    utterance.pitch = 1.0;

    // Try finding matching native voice
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice =
      voices.find((v) => v.lang.toLowerCase().startsWith(langCode.toLowerCase().slice(0, 2))) ||
      voices.find((v) => v.lang.includes("IN")) ||
      voices[0];

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = () => onEnd();
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn("SpeechSynthesis playback failed:", err);
    if (onEnd) onEnd();
    return false;
  }
}

/**
 * Stops any ongoing SpeechSynthesis
 */
export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Checks if browser supports SpeechRecognition (STT)
 */
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "SpeechRecognition" in window ||
    "webkitSpeechRecognition" in window
  );
}

export interface SpeechRecognitionController {
  stop: () => void;
}

/**
 * Starts browser-native speech recognition
 */
export function startSpeechRecognition(
  language: SupportedLanguage = "Hindi",
  onResult: (transcript: string) => void,
  onError: (errorMsg: string) => void,
  onEnd: () => void
): SpeechRecognitionController | null {
  if (!isSpeechRecognitionSupported()) {
    onError("Voice input is not supported in this browser. Please type your answer.");
    return null;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRec();

    const langCode = LANGUAGE_CODES[language] || "hi-IN";
    recognition.lang = langCode;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    let finalTranscript = "";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      onResult(finalTranscript || interim);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error);
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        onError("Microphone permission denied. Please allow microphone access or type your response.");
      } else if (event.error === "no-speech") {
        onError("No voice detected. Please try speaking again or type your answer.");
      } else {
        onError("Voice recognition issue. Please type your answer.");
      }
      onEnd();
    };

    recognition.onend = () => {
      onEnd();
    };

    recognition.start();

    return {
      stop: () => {
        try {
          recognition.stop();
        } catch {
          // ignore
        }
      },
    };
  } catch (err) {
    console.error("Unable to start speech recognition:", err);
    onError("Unable to activate microphone. Please type your answer.");
    return null;
  }
}
