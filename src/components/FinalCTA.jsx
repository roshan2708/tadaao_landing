import React from 'react';
import { ArrowDownToLine } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-24 border-t border-white/10 relative bg-black overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="relative rounded-3xl bg-transparent border border-white/20 p-10 sm:p-14 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-white shadow-[0_0_15px_1px_rgba(255,255,255,0.7)]" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-transparent mb-6 text-[11px] font-mono uppercase tracking-widest text-neutral-400">
            High-Speed P2P Sharing
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Ready to transfer at wire speed?
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-neutral-400 mb-8 leading-relaxed font-normal">
            Download Tadaao for macOS, Windows, or Android. Zero cloud relaying, instant local discovery.
          </p>

          <div className="flex items-center justify-center">
            <a
              href="#downloads"
              id="final-cta-download-btn"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowDownToLine className="w-4 h-4 stroke-[2.2]" />
              Get Tadaao Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
