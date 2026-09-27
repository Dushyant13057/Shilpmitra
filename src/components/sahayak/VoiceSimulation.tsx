"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Volume2, Sparkles, Check, Play, Pause } from "lucide-react";
import Image from "next/image";
import { initialSahayakMessages } from "@/data/sahayakDialogues";
import { SahayakMessage } from "@/types";

export default function VoiceSimulation() {
  const [messages, setMessages] = useState<SahayakMessage[]>(initialSahayakMessages);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const toggleVoiceDemo = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const simulateArtisanResponse = (text: string) => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const newArtisanMsg: SahayakMessage = {
        id: `artisan-${Date.now()}`,
        sender: "artisan",
        text: text,
      };

      const newSahayakReply: SahayakMessage = {
        id: `sahayak-${Date.now() + 1}`,
        sender: "sahayak",
        text: "Bahut sundar! Aapka update save ho gaya hai. Agla kadam hum phone pe batayenge.",
        audioDuration: "0:04",
      };

      setMessages((prev) => [...prev, newArtisanMsg, newSahayakReply]);
    }, 1000);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-[#FFFEFC] rounded-3xl p-5 sm:p-7 shadow-warm-lg border border-warm-border flex flex-col justify-between">
      {/* Simulation Header with Voice Status */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-warm-border/60">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-shilp-orange-600 to-shilp-orange-500 flex items-center justify-center text-white shadow-warm-sm">
            <Volume2 className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm sm:text-base text-shilp-charcoal-900">
                Sahayak Live Assistant
              </span>
              <span className="text-[10px] bg-shilp-orange-50 text-shilp-orange-700 font-semibold px-2 py-0.5 rounded-full border border-shilp-orange-200/70">
                Voice Ready
              </span>
            </div>
            <p className="text-xs text-shilp-charcoal-500">
              Hindi (हिंदी) • Voice Activated
            </p>
          </div>
        </div>

        {/* Listen Demo Button */}
        <button
          onClick={toggleVoiceDemo}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-shilp-orange-50 hover:bg-shilp-orange-100 text-shilp-orange-700 border border-shilp-orange-200/60 text-xs font-semibold transition-colors"
        >
          {isPlayingAudio ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Playing</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Voice Demo</span>
            </>
          )}
        </button>
      </div>

      {/* Messages Conversation Feed */}
      <div className="space-y-4 mb-6">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => {
            const isSahayak = msg.sender === "sahayak";

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`flex gap-3 items-start ${isSahayak ? "justify-start" : "justify-end"}`}
              >
                {/* Sahayak Avatar */}
                {isSahayak && (
                  <div className="w-8 h-8 rounded-full bg-shilp-orange-500/15 border border-shilp-orange-400/30 flex items-center justify-center text-shilp-orange-600 shrink-0 mt-1">
                    <Sparkles className="w-4 h-4 fill-shilp-orange-400" />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed shadow-warm-sm transition-all ${
                    isSahayak
                      ? "bg-shilp-cream-100 text-shilp-charcoal-800 border border-warm-border rounded-tl-sm"
                      : "bg-shilp-orange-500 text-white rounded-tr-sm shadow-warm font-medium"
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Audio Waveform Simulator for Sahayak messages */}
                  {isSahayak && (
                    <div className="mt-2.5 pt-2 border-t border-warm-border/50 flex items-center justify-between text-[11px] text-shilp-charcoal-500">
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-3 bg-shilp-orange-400 rounded-full" />
                        <span className="w-1 h-4 bg-shilp-orange-500 rounded-full" />
                        <span className="w-1 h-2 bg-shilp-orange-300 rounded-full" />
                        <span className="w-1 h-5 bg-shilp-orange-600 rounded-full" />
                        <span className="w-1 h-3 bg-shilp-orange-400 rounded-full" />
                        <span className="ml-1 text-[10px] text-shilp-charcoal-400 font-mono">
                          {msg.audioDuration || "0:04"}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-semibold text-shilp-orange-600">
                        Voice note
                      </span>
                    </div>
                  )}
                </div>

                {/* Artisan Avatar */}
                {!isSahayak && (
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-shilp-orange-400 shrink-0 mt-1 relative bg-shilp-cream-200">
                    <Image
                      src="/images/artisan-hero.jpg"
                      alt="Artisan"
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Interactive Artisan Voice Reply Simulator */}
      <div className="pt-4 border-t border-warm-border">
        <p className="text-[11px] font-semibold text-shilp-charcoal-400 uppercase tracking-wider mb-2.5">
          Simulate Artisan Voice Input
        </p>
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => simulateArtisanResponse("Haan, available hai.")}
            disabled={isRecording}
            className="flex-1 min-w-[130px] px-3.5 py-2 rounded-xl bg-shilp-orange-50 hover:bg-shilp-orange-100 text-shilp-orange-700 border border-shilp-orange-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <Mic className="w-3.5 h-3.5 text-shilp-orange-500" />
            <span>&ldquo;Haan, available hai.&rdquo;</span>
          </button>

          <button
            onClick={() => simulateArtisanResponse("Order dispatch kab hoga?")}
            disabled={isRecording}
            className="px-3 py-2 rounded-xl bg-shilp-cream-200 hover:bg-shilp-cream-300 text-shilp-charcoal-700 text-xs font-medium transition-colors disabled:opacity-50"
          >
            &ldquo;Dispatch kab hoga?&rdquo;
          </button>
        </div>

        {isRecording && (
          <p className="text-[11px] text-shilp-orange-600 font-medium mt-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-shilp-orange-500" />
            <span>Processing voice response in Hindi...</span>
          </p>
        )}
      </div>
    </div>
  );
}
