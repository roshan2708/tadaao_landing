import React from 'react';
import tadaaoDarkLogo from '../assets/tadaao-dark.png';
import { useDownloads } from '../context/DownloadsContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { links, handleDownload } = useDownloads();

  return (
    <footer className="border-t border-white/10 bg-black py-12 text-neutral-400">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/20 bg-black flex items-center justify-center">
              <img
                src={tadaaoDarkLogo}
                alt="Tadaao Logo"
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <span className="text-white font-semibold text-base tracking-tight">
              Tadaao
            </span>
            <span className="text-xs text-neutral-500 font-mono pl-2 border-l border-white/10">
              Direct P2P File Sharing
            </span>
          </div>

          {/* Nav & Download Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#downloads" className="hover:text-white transition-colors">
              Downloads
            </a>
            <a href="#feedback" className="hover:text-white transition-colors">
              Found a Bug?
            </a>
            <a
              href={links.macos}
              download
              onClick={() => handleDownload('macos', '.dmg')}
              className="hover:text-white transition-colors"
            >
              macOS (.dmg)
            </a>
            <a
              href={links.windows}
              download
              onClick={() => handleDownload('windows', '.zip')}
              className="hover:text-white transition-colors"
            >
              Windows (.zip)
            </a>
            <a
              href={links.android}
              download
              onClick={() => handleDownload('android', '.apk')}
              className="hover:text-white transition-colors"
            >
              Android (.apk)
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            &copy; {currentYear} Tadaao. Zero cloud intermediaries.
          </div>
          <div>
            Direct Socket Transfer
          </div>
        </div>
      </div>
    </footer>
  );
}
