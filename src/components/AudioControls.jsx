import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Disc3 } from 'lucide-react';
import { useAudio } from '../context/useAudio';


export default function AudioControls() {
  const {
    isPlaying,
    isMuted,
    hasStarted,
    volume,
    bassIntensity,
    currentColor,
    togglePlay,
    toggleMute,
    setVolume,
  } = useAudio();

  const [expanded, setExpanded] = useState(false);

  // If user hasn't interacted or started, hide the floating pill
  if (!hasStarted) return null;

  return (
    <div
      id="floating-audio-controls"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 select-none"
    >
      {/* Expanded Volume Slider Tray */}
      {expanded && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/80 backdrop-blur-xl border border-white/15 shadow-2xl transition-all animate-fadeIn">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              if (isMuted) toggleMute();
              setVolume(parseFloat(e.target.value));
            }}
            className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
            aria-label="Volume Slider"
          />
          <span className="text-[10px] font-mono text-neutral-400 w-7">
            {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
          </span>
        </div>
      )}

      {/* Main Glassmorphic Pill */}
      <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-black/85 backdrop-blur-2xl border border-white/20 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.8)] hover:border-white/35 transition-all">
        {/* Vinyl / Disc icon spinning when playing */}
        <div
          className="relative flex items-center justify-center cursor-pointer"
          onClick={() => setExpanded(!expanded)}
          title="Click to adjust volume"
        >
          <Disc3
            className={`w-4 h-4 text-white transition-transform ${
              isPlaying && !isMuted ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '3s' }}
          />

          {/* Color reactive pulse dot */}
          <span
            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full transition-colors duration-300"
            style={{
              backgroundColor: isPlaying && !isMuted ? currentColor.hex : '#737373',
              boxShadow:
                isPlaying && !isMuted
                  ? `0 0 8px ${currentColor.hex}`
                  : 'none',
            }}
          />
        </div>

        {/* Track Info & Realtime Dynamic Visualizer Bars */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-medium tracking-wider text-white">
              WOOFER.MP3
            </span>
            <span className="text-[9px] font-mono text-neutral-400">
              {isPlaying && !isMuted ? (
                <span className="inline-flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ backgroundColor: currentColor.hex }}
                  />
                  {currentColor.name}
                </span>
              ) : (
                'PAUSED'
              )}
            </span>
          </div>

          {/* Realtime Bass Visualizer Bars */}
          <div className="flex items-end gap-0.5 h-4 w-7 px-1">
            {[0.4, 0.9, 0.6, 1.0].map((multiplier, idx) => {
              const heightPercent =
                isPlaying && !isMuted
                  ? Math.max(15, Math.min(100, (bassIntensity * multiplier + 0.15) * 100))
                  : 15;
              return (
                <span
                  key={idx}
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: isPlaying && !isMuted ? currentColor.hex : '#525252',
                    transition: 'height 0.08s ease-out, background-color 0.25s ease-out',
                  }}
                  className="w-1 rounded-full"
                />
              );
            })}
          </div>
        </div>

        {/* Play / Pause Toggle Button */}
        <button
          type="button"
          onClick={togglePlay}
          className="p-1.5 text-neutral-300 hover:text-white rounded-full hover:bg-white/10 transition-colors focus:outline-none"
          title={isPlaying ? 'Pause Audio' : 'Play Audio'}
          aria-label={isPlaying ? 'Pause Audio' : 'Play Audio'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current" />
          )}
        </button>

        {/* Mute / Unmute Toggle Button */}
        <button
          type="button"
          onClick={toggleMute}
          className="p-1.5 text-neutral-300 hover:text-white rounded-full hover:bg-white/10 transition-colors focus:outline-none"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}
