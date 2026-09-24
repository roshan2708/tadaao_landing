import React from 'react';
import { ArrowDownToLine } from 'lucide-react';
import { PLATFORM_INFO } from '../constants/downloads';
import { AppleLogo, WindowsLogo, AndroidLogo } from './DeviceLogos';

export default function Downloads() {
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
            Downloads
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Get Tadaao for your device
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Select your platform below to download the latest release.
          </p>
        </div>

        {/* Platform Grid: Simple, Clean Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLATFORM_INFO.map((platform) => {
            const Icon = getPlatformIcon(platform.id);
            return (
              <div
                key={platform.id}
                className="group rounded-2xl bg-transparent border border-white/10 hover:border-white/30 p-6 flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl border border-white/15 flex items-center justify-center text-white group-hover:border-white/35 transition-colors bg-transparent">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-neutral-400 border border-white/10 px-2.5 py-1 rounded">
                      {platform.fileFormat}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
                    {platform.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mb-6">
                    {platform.description}
                  </p>
                </div>

                <div>
                  <a
                    href={platform.href}
                    id={`download-btn-${platform.id}`}
                    download
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <ArrowDownToLine className="w-4 h-4 stroke-[2.2]" />
                    {platform.buttonText}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
