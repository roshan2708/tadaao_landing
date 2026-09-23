import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Downloads from './components/Downloads';
import PrivacySection from './components/PrivacySection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-white/20 selection:text-white">
      {/* Minimalist Top Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Downloads />
        <PrivacySection />
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
