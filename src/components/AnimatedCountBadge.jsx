import React, { useEffect, useState, useRef } from 'react';

export default function AnimatedCountBadge({ count, isAnimating, platformName }) {
  const [displayCount, setDisplayCount] = useState(count);
  const [showBump, setShowBump] = useState(false);
  const prevCountRef = useRef(count);

  useEffect(() => {
    if (count !== prevCountRef.current) {
      // Trigger bump pop animation
      setShowBump(true);
      const bumpTimer = setTimeout(() => setShowBump(false), 800);

      // Smooth step counter to new count
      const start = prevCountRef.current;
      const end = count;
      const duration = 600; // ms
      const startTime = performance.now();

      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const current = Math.round(start + (end - start) * easeOutQuad);
        setDisplayCount(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayCount(end);
          prevCountRef.current = end;
        }
      };

      requestAnimationFrame(animate);
      return () => clearTimeout(bumpTimer);
    }
  }, [count]);

  return (
    <div className="relative inline-flex items-center">
      {/* Floating +1 Pop Effect */}
      {(isAnimating || showBump) && (
        <span
          className="absolute -top-5 right-2 text-[11px] font-mono font-bold text-emerald-400 pointer-events-none animate-float-bump"
          aria-hidden="true"
        >
          +1
        </span>
      )}

      {/* Main Dynamic Counter Pill */}
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-300 font-mono text-[11px] ${
          showBump || isAnimating
            ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.4)] scale-105'
            : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
        }`}
        title={`Live dynamic count synced with Firebase`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold tabular-nums tracking-tight transition-transform duration-200">
          {displayCount}+
        </span>
        <span className="text-emerald-400/90 tracking-normal">downloads</span>
      </span>
    </div>
  );
}
