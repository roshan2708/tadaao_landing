import React from 'react';
import { ArrowDownToLine } from 'lucide-react';
import { DOWNLOAD_LINKS } from '../constants/downloads';
import { GitHubLogo } from './DeviceLogos';

export default function FinalCTA() {
  return (
    <section className="py-28 border-t border-white/10 relative bg-black overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Transparent bordered container with ambient lighting */}
        <div className="relative rounded-3xl bg-transparent border border-white/20 p-10 sm:p-16 text-center">
          {/* Subtle top light hint */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-white shadow-[0_0_15px_1px_rgba(255,255,255,0.7)]" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-transparent mb-6 text-[11px] font-mono uppercase tracking-widest text-neutral-400">
            Open Source • Native Systems Architecture
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Ready to transfer at wire speed?
          </h2>

          <p className="max-w-xl mx-auto text-base sm:text-lg text-neutral-400 mb-10 leading-relaxed font-normal">
            Download Tadaao for macOS, Windows, Linux, Android, or iOS. Zero account creation, zero cloud relaying.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#downloads"
              id="final-cta-download-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowDownToLine className="w-4 h-4 stroke-[2.2]" />
              Get Tadaao Now
            </a>

            <a
              href={DOWNLOAD_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              id="final-cta-github-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-mono uppercase tracking-wider text-white bg-transparent hover:text-white border border-white/20 hover:border-white/40 rounded-full transition-all duration-200"
            >
              <GitHubLogo className="w-4 h-4 text-white" />
              <span>Inspect Source on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
