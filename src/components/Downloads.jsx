import React, { useState } from 'react';
import { ArrowDownToLine, Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import { DOWNLOAD_LINKS, PLATFORM_INFO } from '../constants/downloads';
import { AppleLogo, WindowsLogo, LinuxLogo, AndroidLogo, GitHubLogo } from './DeviceLogos';

export default function Downloads() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getPlatformIcon = (id) => {
    switch (id) {
      case 'macos':
        return AppleLogo;
      case 'windows':
        return WindowsLogo;
      case 'linux':
        return LinuxLogo;
      case 'android':
        return AndroidLogo;
      case 'ios':
        return AppleLogo;
      default:
        return Terminal;
    }
  };

  return (
    <section id="downloads" className="py-28 border-t border-white/10 relative bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-transparent mb-4 text-[11px] font-mono uppercase tracking-widest text-neutral-400">
            Universal Distribution
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Download Tadaao for your platform.
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg leading-relaxed">
            Native binaries compiled for your target operating system. No dependencies, no runtime baggage, zero tracking.
          </p>
        </div>

        {/* Platform Grid: 100% Transparent Containers with crisp borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {PLATFORM_INFO.map((platform) => {
            const Icon = getPlatformIcon(platform.id);
            return (
              <div
                key={platform.id}
                className="group relative rounded-2xl bg-transparent border border-white/10 hover:border-white/35 p-7 flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  {/* Top Bar with Authentic Logo and Package Type */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl border border-white/15 flex items-center justify-center text-white group-hover:border-white/40 transition-colors bg-transparent">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400 border border-white/10 px-2.5 py-1 rounded bg-transparent">
                      {platform.fileFormat}
                    </span>
                  </div>

                  {/* Platform Name & Version */}
                  <h3 className="text-xl font-bold text-white mb-1 tracking-tight flex items-center gap-2">
                    {platform.name}
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 border border-white/10 px-2 py-0.5 rounded-full">
                      {platform.badge}
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400 mb-1">{platform.version}</p>
                  <p className="text-xs font-mono text-neutral-500 mb-6">{platform.arch}</p>
                </div>

                <div className="space-y-3 pt-2">
                  {/* Primary Download Button connected to DOWNLOAD_LINKS */}
                  <a
                    href={platform.href}
                    id={`download-btn-${platform.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <ArrowDownToLine className="w-4 h-4 stroke-[2.2]" />
                    Download {platform.name}
                  </a>

                  {/* Terminal CLI Command (if available) */}
                  {platform.command && (
                    <button
                      type="button"
                      onClick={() => handleCopy(platform.command, platform.id)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-white/10 hover:border-white/25 text-[11px] font-mono text-neutral-400 hover:text-white bg-transparent transition-all"
                      title="Click to copy command"
                    >
                      <span className="truncate pr-2">{platform.command}</span>
                      {copiedId === platform.id ? (
                        <Check className="w-3.5 h-3.5 text-white shrink-0" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* DEDICATED GITHUB OPEN SOURCE CARD */}
          <div className="group relative rounded-2xl bg-transparent border border-white/20 hover:border-white/40 p-7 flex flex-col justify-between transition-all duration-300">
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center text-white bg-transparent">
                  <GitHubLogo className="w-6 h-6 text-white" />
                </div>
                <span className="text-[11px] font-mono text-neutral-400 border border-white/10 px-2.5 py-1 rounded bg-transparent">
                  Source Code
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1 tracking-tight flex items-center gap-2">
                Open Source
                <span className="text-[10px] font-mono uppercase tracking-wider text-white border border-white/20 px-2 py-0.5 rounded-full">
                  MIT License
                </span>
              </h3>
              <p className="text-xs text-neutral-400 mb-1">Audit, fork, or build from source</p>
              <p className="text-xs font-mono text-neutral-500 mb-6">github.com/tadaao-app/tadaao</p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={DOWNLOAD_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                id="downloads-github-btn"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-mono uppercase tracking-wider text-white bg-transparent hover:text-white border border-white/25 hover:border-white/50 transition-all duration-200"
              >
                <GitHubLogo className="w-4 h-4 text-white" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
              </a>

              <button
                type="button"
                onClick={() => handleCopy('git clone https://github.com/tadaao-app/tadaao.git', 'github')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-white/10 hover:border-white/25 text-[11px] font-mono text-neutral-400 hover:text-white bg-transparent transition-all"
                title="Click to copy git clone command"
              >
                <span className="truncate pr-2">git clone tadaao.git</span>
                {copiedId === 'github' ? (
                  <Check className="w-3.5 h-3.5 text-white shrink-0" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Global Protocol Verification Statement */}
        <div className="rounded-2xl bg-transparent border border-white/10 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span>All binary checksums (SHA-256) and GPG signatures published with every GitHub release.</span>
          </div>
          <span className="text-neutral-500">Channel // Production Stable v1.0.0</span>
        </div>
      </div>
    </section>
  );
}
