import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, ArrowRight, Radio } from 'lucide-react';
import { useAudio } from '../context/useAudio';
import tadaaoDarkLogo from '../assets/tadaao-dark.png';

export default function IntroScreen() {
  const { startAudio, toggleMute } = useAudio();
  const [isVisible, setIsVisible] = useState(true);

  const [isFading, setIsFading] = useState(false);

  const handleEnter = useCallback((silent = false) => {
    if (isFading || !isVisible) return;
    setIsFading(true);

    if (silent) {
      startAudio();
      toggleMute();
    } else {
      startAudio();
    }

    // Smooth exit transition before unmounting
    setTimeout(() => {
      setIsVisible(false);
    }, 700);
  }, [isFading, isVisible, startAudio, toggleMute]);

  // Support Space or Enter keypress
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleEnter(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleEnter]);

  if (!isVisible) return null;

  return (
    <div
      onClick={() => handleEnter(false)}
      className={`fixed inset-0 z-[100] bg-black text-white flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none cursor-pointer overflow-hidden transition-all duration-700 ease-out ${
        isFading ? 'opacity-0 scale-[1.03] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Tadaao"
    >
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-grid-minimal opacity-30 pointer-events-none" />

      {/* Decorative Minimalist Technical Corner Reticles */}
      <div className="absolute top-6 left-6 w-4 h-4 border-t border-l border-white/40 pointer-events-none" />
      <div className="absolute top-6 right-6 w-4 h-4 border-t border-r border-white/40 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-white/40 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-white/40 pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[11px] tracking-wider text-neutral-400">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md border border-white/20 flex items-center justify-center bg-black p-0.5">
            <img src={tadaaoDarkLogo} alt="Tadaao" className="w-full h-full object-contain" />
          </div>
          <span className="text-white font-medium">TADAAO // P2P PROTOCOL</span>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-neutral-300">
            <Radio className="w-3 h-3 text-white animate-pulse" />
            AUDIO ENGINE: WOOFER.MP3
          </span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-400">320 KBPS DIRECT STREAM</span>
        </div>
      </div>

      {/* Center Cinematic Hero Call to Action */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center my-auto py-8">
        {/* Monospaced Pill Tag */}
        <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/20 bg-white/5 text-[11px] font-mono tracking-widest uppercase text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span>Interactive Audio Experience</span>
        </div>

        {/* Main Monolithic Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white mb-6 uppercase leading-none font-sans">
          LET'S TADAAO.
        </h1>

        <p className="max-w-xl text-neutral-400 text-sm sm:text-base leading-relaxed mb-10 font-normal">
          Direct device-to-device mesh transfers with wire-speed execution.
          Featuring a live bass-reactive spotlight synchronized to the soundtrack.
        </p>

        {/* Center Minimalist Button */}
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleEnter(false);
            }}
            className="w-full group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all duration-200 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <Volume2 className="w-4 h-4 stroke-[2.2]" />
            <span>ENTER EXPERIENCE</span>
            <ArrowRight className="w-4 h-4 stroke-[2.2] group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Soundwave Bars Simulation */}
          <div className="flex items-center gap-1.5 h-4 mt-2">
            {[35, 65, 100, 75, 45, 85, 30, 95, 55, 40].map((h, i) => (
              <span
                key={i}
                style={{
                  height: `${h}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
                className="w-0.5 bg-white/70 rounded-full animate-pulse"
              />
            ))}
          </div>

          <span className="text-[11px] font-mono text-neutral-500 tracking-wider uppercase mt-1">
            [ CLICK ANYWHERE OR PRESS SPACE ]
          </span>
        </div>
      </div>

      {/* Bottom Footer Telemetry */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-500 pt-6 border-t border-white/10">
        <div className="flex items-center gap-3">
          <span>AES-256 GCM</span>
          <span>•</span>
          <span>ZERO CLOUD RELAY</span>
          <span>•</span>
          <span className="text-white">BASS FREQUENCY SYNC</span>
        </div>

        {/* Enter Silently Option */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleEnter(true);
          }}
          className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors underline underline-offset-4 decoration-white/30 hover:decoration-white"
        >
          <VolumeX className="w-3.5 h-3.5" />
          <span>Enter without sound</span>
        </button>
      </div>
    </div>
  );
}
