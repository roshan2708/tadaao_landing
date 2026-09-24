import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Downloads from './components/Downloads';
import PrivacySection from './components/PrivacySection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import IntroScreen from './components/IntroScreen';
import AudioControls from './components/AudioControls';
import { AudioProvider } from './context/AudioContext';

export default function App() {
  return (
    <AudioProvider>
      <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-white/20 selection:text-white relative">
        {/* Minimalist Black and White Welcome & Autoplay Trigger */}
        <IntroScreen />

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

        {/* Floating Real-Time Audio Control Pill */}
        <AudioControls />

        {/* Footer */}
        <Footer />
      </div>
    </AudioProvider>
  );
}

