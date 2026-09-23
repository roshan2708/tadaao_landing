import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowDownToLine } from 'lucide-react';
import tadaaoDarkLogo from '../assets/tadaao-dark.png';
import { DOWNLOAD_LINKS } from '../constants/downloads';
import { GitHubLogo } from './DeviceLogos';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Downloads', href: '#downloads' },
    { name: 'Architecture', href: '#architecture' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="#"
          id="navbar-brand-logo"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-lg"
          aria-label="Tadaao Home"
        >
          <div className="w-9 h-9 rounded-lg overflow-hidden border border-white/15 group-hover:border-white/40 transition-colors flex items-center justify-center bg-black">
            <img
              src={tadaaoDarkLogo}
              alt="Tadaao Emblem"
              className="w-full h-full object-cover scale-110"
            />
          </div>
          <span className="text-white font-semibold text-base tracking-tight group-hover:text-white/80 transition-colors">
            Tadaao
          </span>
        </a>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-widest font-mono text-neutral-400 hover:text-white transition-colors focus:outline-none focus-visible:text-white"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Desktop Actions: GitHub & Download Pill */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={DOWNLOAD_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            id="navbar-github-link"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-transparent hover:border-white/40 text-neutral-300 hover:text-white text-xs font-mono transition-all"
            aria-label="View Tadaao on GitHub"
          >
            <GitHubLogo className="w-3.5 h-3.5 text-white" />
            <span>GitHub</span>
          </a>

          <a
            href="#downloads"
            id="navbar-download-button"
            className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowDownToLine className="w-3.5 h-3.5 stroke-[2.2]" />
            Download
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          id="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-400 hover:text-white border border-white/10 rounded-lg bg-transparent focus:outline-none"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="navbar-mobile-drawer"
          className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4"
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono uppercase tracking-wider text-neutral-400 hover:text-white py-2 border-b border-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href={DOWNLOAD_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-white/15 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
            >
              <GitHubLogo className="w-4 h-4 text-white" />
              Source on GitHub
            </a>

            <a
              href="#downloads"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 rounded-lg transition-all"
            >
              <ArrowDownToLine className="w-4 h-4 stroke-[2.2]" />
              Get Tadaao
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
