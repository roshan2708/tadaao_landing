import React, { useState, useRef } from 'react';
import { ArrowDownToLine, Terminal, Copy, Check, ShieldCheck, Laptop, Smartphone, FileArchive } from 'lucide-react';

import tadaaoDarkLogo from '../assets/tadaao-dark.png';
import { DOWNLOAD_LINKS } from '../constants/downloads';
import { GitHubLogo, AppleLogo, WindowsLogo, LinuxLogo, AndroidLogo } from './DeviceLogos';
import { useAudio } from '../context/useAudio';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const { isPlaying, isMuted, bassIntensity, currentColor } = useAudio();

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Subtle 3D tilt calculation
    setRotate({
      x: -(y / rect.height) * 12,
      y: (x / rect.width) * 12,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText('brew install tadaao');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isBassActive = isPlaying && !isMuted;

  // Dynamic bass-reactive spotlight styling
  const fixtureStyle = isBassActive
    ? {
        backgroundColor: currentColor.hex,
        boxShadow: `0 0 ${20 + bassIntensity * 40}px 3px ${currentColor.hex}, 0 0 ${50 + bassIntensity * 90}px 8px rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0.7)`,
        transform: `scaleX(${1 + bassIntensity * 0.15})`,
        transition: 'background-color 0.25s ease-out, transform 0.06s ease-out',
      }
    : undefined;

  const beamStyle = isBassActive
    ? {
        background: `linear-gradient(180deg, 
          rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${0.28 + bassIntensity * 0.48}) 0%, 
          rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${0.11 + bassIntensity * 0.26}) 35%, 
          rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${0.02 + bassIntensity * 0.08}) 75%, 
          transparent 100%
        )`,
        filter: `blur(${Math.max(8, 14 - bassIntensity * 5)}px)`,
        transform: `translateX(-50%) scale(${1 + bassIntensity * 0.07})`,
        transition: 'background 0.22s ease-out, transform 0.06s ease-out',
      }
    : undefined;

  const ambientStyle = isBassActive
    ? {
        background: `radial-gradient(ellipse at 50% 0%, rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${0.22 + bassIntensity * 0.40}) 0%, transparent 70%)`,
        filter: `blur(${Math.max(16, 28 - bassIntensity * 6)}px)`,
        transition: 'background 0.25s ease-out',
      }
    : undefined;

  const emblemStyle = isBassActive
    ? {
        borderColor: `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${0.25 + bassIntensity * 0.55})`,
        boxShadow: `0 15px 45px -12px rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${0.35 + bassIntensity * 0.5})`,
        transform: `scale(${1 + bassIntensity * 0.04})`,
        transition: 'border-color 0.25s ease-out, box-shadow 0.25s ease-out, transform 0.08s ease-out',
      }
    : undefined;

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-black">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-grid-minimal opacity-30 pointer-events-none" />

      {/* OVERHEAD SPOTLIGHT FIXTURE & DOWNWARD BEAM
          Synchronized to audio bass frequencies with real-time dynamic color switching */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Ambient Top Light Glow */}
        <div className="spotlight-ambient" style={ambientStyle} />

        {/* Crisp Overhead Horizontal Light Bar */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="spotlight-fixture" style={fixtureStyle} />
        </div>

        {/* Downward Volumetric Light Beam */}
        <div className="spotlight-beam" style={beamStyle} />

        {/* Spotlight Focus: Brand Emblem resting in the beam */}
        <div className="relative z-20 mt-10 mb-8 flex flex-col items-center">
          <div
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-white/20 bg-black flex items-center justify-center p-3 shadow-[0_15px_40px_-15px_rgba(255,255,255,0.25)] transition-transform duration-500 hover:scale-105"
            style={emblemStyle}
          >
            <img
              src={tadaaoDarkLogo}
              alt="Tadaao Emblem"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]"
            />
          </div>

          {/* Telemetry Pills */}
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-2">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-white/15 bg-transparent text-[11px] font-mono tracking-wider text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="uppercase text-white">Direct Socket Mesh</span>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-400">Zero Cloud Relay</span>
            </div>

            {/* Live Bass Sync Indicator */}
            {isBassActive && (
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-black/70 text-[10px] font-mono tracking-wider transition-all duration-300"
                style={{
                  borderColor: `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0.35)`,
                  boxShadow: `0 0 15px -3px rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0.25)`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: currentColor.hex,
                    boxShadow: `0 0 6px ${currentColor.hex}`,
                  }}
                />
                <span className="text-neutral-400 uppercase">Bass Sync:</span>
                <span className="font-semibold" style={{ color: currentColor.hex }}>
                  {currentColor.name}
                </span>
                <span className="text-neutral-600">•</span>
                <span className="text-neutral-300 font-bold">
                  {Math.round(bassIntensity * 100)}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Hero Header Text */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 text-center mt-2">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]">
          Command Your Transfers.
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-400 leading-relaxed mb-10 font-normal">
          Minimalist, high-throughput peer-to-peer file sharing across your ecosystem.
          Direct device-to-device streaming with zero cloud intermediaries and wire-speed LAN execution.
        </p>

        {/* Action Buttons & Terminal Snippet */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          {/* Main Download Button */}
          <a
            href="#downloads"
            id="hero-download-cta"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowDownToLine className="w-4 h-4 stroke-[2.2]" />
            Download Tadaao
          </a>

          {/* GitHub Source Link */}
          <a
            href={DOWNLOAD_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-github-cta"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-mono uppercase tracking-wider text-white bg-transparent hover:text-white border border-white/15 hover:border-white/40 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            <GitHubLogo className="w-4 h-4 text-white" />
            <span>GitHub Repository</span>
          </a>

          {/* Quick Copy Terminal Command */}
          <button
            type="button"
            onClick={handleCopyCommand}
            id="hero-copy-command"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-mono text-neutral-400 hover:text-white bg-transparent border border-white/10 hover:border-white/30 rounded-full transition-all"
            title="Copy brew command"
          >
            <Terminal className="w-3.5 h-3.5 text-neutral-400" />
            <span>brew install tadaao</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-white" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-neutral-500" />
            )}
          </button>
        </div>

        {/* OS Compatibility Logos Row */}
        <div className="flex items-center justify-center gap-6 mb-16 text-neutral-500 text-xs font-mono">
          <span className="text-neutral-500">Universal Support:</span>
          <div className="flex items-center gap-4 text-neutral-300">
            <span className="flex items-center gap-1.5" title="macOS">
              <AppleLogo className="w-4 h-4 text-white" />
              <span>macOS</span>
            </span>
            <span className="text-neutral-700">•</span>
            <span className="flex items-center gap-1.5" title="Windows">
              <WindowsLogo className="w-3.5 h-3.5 text-white" />
              <span>Windows</span>
            </span>
            <span className="text-neutral-700">•</span>
            <span className="flex items-center gap-1.5" title="Linux">
              <LinuxLogo className="w-4 h-4 text-white" />
              <span>Linux</span>
            </span>
            <span className="text-neutral-700">•</span>
            <span className="flex items-center gap-1.5" title="Android">
              <AndroidLogo className="w-4 h-4 text-white" />
              <span>Android</span>
            </span>
            <span className="text-neutral-700">•</span>
            <span className="flex items-center gap-1.5" title="iOS">
              <AppleLogo className="w-4 h-4 text-white" />
              <span>iOS</span>
            </span>
          </div>
        </div>

        {/* 3D INTERACTIVE PERSPECTIVE TRANSFER MATRIX
            Fully transparent container with crisp white border and interactive 3D perspective */}
        <div
          className="max-w-4xl mx-auto perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={cardRef}
            style={{
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="relative rounded-2xl bg-transparent border border-white/15 p-6 sm:p-8 backdrop-blur-none transform-style-3d shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)]"
          >
            {/* Top Telemetry Header Bar */}
            <div className="flex flex-wrap items-center justify-between pb-5 mb-6 border-b border-white/10 text-xs font-mono text-neutral-400 gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span className="text-white font-medium">SESSION // TLS_AES_256_GCM_SHA384</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded border border-white/10 text-neutral-300">
                  PORT 7443 [ESTABLISHED]
                </span>
                <span className="px-2.5 py-0.5 rounded border border-white/10 text-neutral-300">
                  LATENCY 0.38ms
                </span>
              </div>
            </div>

            {/* 3D Node to Node Transfer Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Origin Device */}
              <div className="flex flex-col items-center p-5 rounded-xl bg-transparent border border-white/10 hover:border-white/30 transition-colors">
                <div className="w-12 h-12 rounded-xl border border-white/15 flex items-center justify-center text-white mb-3 bg-transparent">
                  <Laptop className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="text-sm font-semibold text-white">MacBook Pro (M3 Max)</div>
                <div className="text-[11px] font-mono text-neutral-500 mt-0.5">192.168.1.104:7443</div>
                <div className="mt-3 px-2 py-0.5 rounded text-[10px] font-mono text-white border border-white/20">
                  SENDER [ACTIVE]
                </div>
              </div>

              {/* Center Direct Socket Packet Flow */}
              <div className="flex flex-col items-center justify-center px-2 py-2">
                {/* Active Transfer File Capsule */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 bg-transparent text-xs font-mono text-white mb-3">
                  <FileArchive className="w-3.5 h-3.5 text-white" />
                  <span>Build_Release_v1.tar.gz</span>
                  <span className="text-neutral-500">1.4 GB</span>
                </div>

                {/* Animated Direct Pipeline */}
                <div className="w-full relative flex items-center justify-center my-2">
                  <div className="w-full h-[1px] bg-white/20 relative overflow-hidden">
                    <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent animate-stream-flow" />
                  </div>
                </div>

                {/* Realtime Transfer Benchmark */}
                <div className="text-[11px] font-mono text-neutral-400 mt-2 flex items-center gap-2">
                  <span className="text-white font-semibold">112.8 MB/s</span>
                  <span className="text-neutral-600">•</span>
                  <span>Direct Socket Stream</span>
                </div>
              </div>

              {/* Destination Device */}
              <div className="flex flex-col items-center p-5 rounded-xl bg-transparent border border-white/10 hover:border-white/30 transition-colors">
                <div className="w-12 h-12 rounded-xl border border-white/15 flex items-center justify-center text-white mb-3 bg-transparent">
                  <Smartphone className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="text-sm font-semibold text-white">iPhone 16 Pro</div>
                <div className="text-[11px] font-mono text-neutral-500 mt-0.5">192.168.1.189:7443</div>
                <div className="mt-3 px-2 py-0.5 rounded text-[10px] font-mono text-white border border-white/20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  RECEIVING
                </div>
              </div>
            </div>

            {/* Bottom Status Tag */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-2">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                Zero intermediary telemetry. Payload decrypted locally in RAM.
              </span>
              <span className="text-neutral-400">Direct TCP Socket Mesh</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
