import React from 'react';
import tadaaoDarkLogo from '../assets/tadaao-dark.png';
import { DOWNLOAD_LINKS } from '../constants/downloads';
import { GitHubLogo, AppleLogo, WindowsLogo, LinuxLogo, AndroidLogo } from './DeviceLogos';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black py-16 text-neutral-400">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <a
              href="#"
              id="footer-brand-logo"
              className="flex items-center gap-3 group"
              aria-label="Tadaao Home"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/20 group-hover:border-white/40 transition-colors bg-black flex items-center justify-center">
                <img
                  src={tadaaoDarkLogo}
                  alt="Tadaao Emblem"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <span className="text-white font-bold text-base tracking-tight">
                Tadaao
              </span>
            </a>

            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Zero-cloud peer-to-peer file transfer engine. Deterministic, private, and engineered for maximum link saturation.
            </p>

            <div className="pt-2">
              <a
                href={DOWNLOAD_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-github-link"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-transparent hover:border-white/40 text-xs font-mono text-neutral-300 hover:text-white transition-all"
              >
                <GitHubLogo className="w-3.5 h-3.5 text-white" />
                <span>github.com/tadaao-app/tadaao</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-white">
              Navigation
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  System Architecture
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  Protocol Mechanics
                </a>
              </li>
              <li>
                <a href="#downloads" className="hover:text-white transition-colors">
                  Binaries & Releases
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-white transition-colors">
                  Zero-Trust Model
                </a>
              </li>
            </ul>
          </div>

          {/* Platform Downloads Links */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-white">
              Releases
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href={DOWNLOAD_LINKS.macos} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <AppleLogo className="w-3.5 h-3.5" />
                  macOS (Apple Silicon & Intel)
                </a>
              </li>
              <li>
                <a href={DOWNLOAD_LINKS.windows} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <WindowsLogo className="w-3 h-3" />
                  Windows (x64 / ARM64)
                </a>
              </li>
              <li>
                <a href={DOWNLOAD_LINKS.linux} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <LinuxLogo className="w-3.5 h-3.5" />
                  Linux (Universal AppImage)
                </a>
              </li>
              <li>
                <a href={DOWNLOAD_LINKS.android} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <AndroidLogo className="w-3.5 h-3.5" />
                  Android (APK)
                </a>
              </li>
              <li>
                <a href={DOWNLOAD_LINKS.ios} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <AppleLogo className="w-3.5 h-3.5" />
                  iOS & iPadOS
                </a>
              </li>
            </ul>
          </div>

          {/* Technical Specs & License */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-white">
              Project
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href={DOWNLOAD_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  MIT License
                </a>
              </li>
              <li>
                <a
                  href={DOWNLOAD_LINKS.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <span className="text-neutral-500">TLS 1.3 / QUIC</span>
              </li>
              <li>
                <span className="text-neutral-500">BLAKE3 Integrity</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Specs */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            &copy; {currentYear} Tadaao. Built with zero cloud dependencies.
          </div>
          <div className="flex items-center gap-3">
            <span>Direct Socket Mesh</span>
            <span>•</span>
            <span className="text-neutral-300">Pure Local Transmission</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
