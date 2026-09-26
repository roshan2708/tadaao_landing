import React from 'react';
import { ArrowDownToLine, Radio } from 'lucide-react';
import { PLATFORM_INFO } from '../constants/downloads';
import { AppleLogo, WindowsLogo, AndroidLogo } from './DeviceLogos';
import { useDownloads } from '../context/DownloadsContext';
import AnimatedCountBadge from './AnimatedCountBadge';

export default function Downloads() {
  const { links, counts, handleDownload, isFirebaseSynced, animatingPlatform } = useDownloads();

  const getPlatformIcon = (id) => {
    switch (id) {
      case 'macos':
        return AppleLogo;
      case 'windows':
        return WindowsLogo;
      case 'android':
        return AndroidLogo;
      default:
        return ArrowDownToLine;
    }
  };

  return (
    <section id="downloads" className="py-24 border-t border-white/10 relative bg-black">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-transparent mb-4 text-[11px] font-mono uppercase tracking-widest text-neutral-400">
            {isFirebaseSynced ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Firebase Synced Releases
              </>
            ) : (
              'Downloads & Setup'
            )}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Get Tadaao for your device
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Select your platform below to download the latest release and view quick install instructions.
          </p>
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLATFORM_INFO.map((platform) => {
            const Icon = getPlatformIcon(platform.id);
            const currentCount = counts[platform.id] !== undefined ? counts[platform.id] : platform.downloadsCount;
            const currentLink = links[platform.id] || platform.href;

            return (
              <div
                key={platform.id}
                className="group rounded-2xl bg-neutral-950/60 border border-white/10 hover:border-white/30 p-6 flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  {/* Top Bar: Icon, File Format & Dynamic Animated Download Count */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl border border-white/15 flex items-center justify-center text-white group-hover:border-white/35 transition-colors bg-white/[0.02]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <AnimatedCountBadge
                        count={currentCount}
                        isAnimating={animatingPlatform === platform.id}
                        platformName={platform.name}
                      />
                      <span className="text-xs font-mono text-neutral-400 border border-white/10 px-2 py-0.5 rounded">
                        {platform.fileFormat}
                      </span>
                    </div>
                  </div>

                  {/* Title & OS Compatibility */}
                  <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
                    {platform.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mb-5">
                    {platform.description}
                  </p>

                  {/* Installation Guide Box */}
                  <div className="mb-6 rounded-xl border border-white/10 bg-black/60 p-4 text-left">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                      <span className="w-1 h-3 bg-white/60 rounded-full" />
                      Quick Install Steps
                    </div>

                    <ol className="space-y-2.5">
                      {platform.steps.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                          <span className="flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full bg-white/10 text-[10px] font-mono text-white mt-0.5">
                            {s.step}
                          </span>
                          <span className={s.highlight ? "text-neutral-200" : ""}>
                            {s.text}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Download CTA Button */}
                <div>
                  <a
                    href={currentLink}
                    id={`download-btn-${platform.id}`}
                    download
                    onClick={() => handleDownload(platform.id, platform.fileFormat)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
                  >
                    <ArrowDownToLine className="w-4 h-4 stroke-[2.2]" />
                    {platform.buttonText}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust & Guarantee Banner */}
        <div className="mt-12 p-4 rounded-2xl border border-white/10 bg-white/[0.01] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white">Authentic Tadaao Builds</span>
            <span className="text-neutral-600">•</span>
            <span>Zero telemetry beyond basic download counts</span>
          </div>
          <div className="text-neutral-400 text-[11px]">
            Direct peer-to-peer encrypted transfers. No account required.
          </div>
        </div>
      </div>
    </section>
  );
}
