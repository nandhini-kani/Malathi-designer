
"use client";

import { Scissors, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-violet-500 flex items-center justify-center overflow-hidden relative">
      
      {/* Background Glow */}
      <div className="absolute w-72 h-72 bg-violet-700/20 rounded-full blur-3xl" />
      <div className="absolute w-40 h-40 bg-fuchsia-500/10 rounded-full blur-3xl top-20 right-20" />

      {/* Loading Content */}
      <div className="relative flex flex-col items-center">

        {/* Animated Circle */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          
          {/* Outer spinning ring */}
          <div className="absolute inset-0 rounded-full border-2 border-violet-400/20" />

          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-fuchsia-400 border-r-violet-300 animate-spin" />

          {/* Inner glowing circle */}
          <div className="w-20 h-20 rounded-full bg-violet-900 border border-violet-400/30 shadow-[0_0_35px_rgba(167,139,250,0.25)] flex items-center justify-center">
            <Scissors
              size={32}
              strokeWidth={1.5}
              className="text-violet-200 animate-pulse"
            />
          </div>

          {/* Sparkle */}
          <Sparkles
            size={18}
            className="absolute -top-1 right-3 text-fuchsia-300 animate-pulse"
          />
        </div>

        {/* Text */}
        <h2 className="mt-7 text-xl font-semibold tracking-wide text-white">
          Malathi Designer
        </h2>

        <p className="mt-2 text-sm text-violet-300">
          Creating something beautiful...
        </p>

        {/* Loading dots */}
        <div className="flex gap-2 mt-5">
          <span className="w-2 h-2 rounded-full bg-violet-300 animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 rounded-full bg-violet-300 animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 rounded-full bg-violet-300 animate-bounce" />
        </div>

      </div>
    </div>
  );
}