import React from 'react';
import { ArrowRight, Laptop, Smartphone } from 'lucide-react';
import tadaaoDarkLogo from '../assets/tadaao-dark.png';

const protocolSteps = [
  {
    step: '01',
    phase: 'DISCOVERY',
    title: 'Autonomous Subnet Broadcast',
    description:
      'Devices emit zero-configuration mDNS packets on the local subnet. Nearby peers are discovered within milliseconds without contacting any remote cloud server.',
    metric: '< 50ms discovery',
  },
  {
    step: '02',
    phase: 'NEGOTIATION',
    title: 'Ephemeral Direct Handshake',
    description:
      'Upon target selection, devices establish an encrypted peer-to-peer TCP/UDP socket channel. Zero authorization tokens or account logins are exchanged.',
    metric: 'Direct TLS 1.3 / QUIC',
  },
  {
    step: '03',
    phase: 'TRANSMISSION',
    title: 'Full-Duplex Socket Streaming',
    description:
      'Data streams directly between network interface cards using ring-buffered kernel sockets. Zero disk staging, zero bandwidth throttling, wire-level execution.',
    metric: 'Gigabit LAN Throughput',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 border-t border-white/10 relative bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-transparent mb-4 text-[11px] font-mono uppercase tracking-widest text-neutral-400">
            Protocol Mechanics
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            How Tadaao moves data without the cloud.
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg leading-relaxed">
            A three-stage deterministic protocol designed to eliminate latency, privacy vulnerabilities, and third-party dependency.
          </p>
        </div>

        {/* Protocol Stages: 100% Transparent Containers with crisp borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {protocolSteps.map((item) => (
            <div
              key={item.step}
              className="relative rounded-2xl bg-transparent border border-white/10 hover:border-white/30 p-8 flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                  <span className="font-mono text-3xl font-extrabold text-white/30">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 border border-white/10 px-2 py-0.5 rounded">
                    {item.phase}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">
                  {item.title}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed font-normal mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 text-xs font-mono text-neutral-300 flex items-center justify-between">
                <span className="text-neutral-500">Benchmark</span>
                <span className="text-white">{item.metric}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Monochrome Transmission Pipeline Topology */}
        <div className="rounded-2xl bg-transparent border border-white/15 p-8 sm:p-10">
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10 flex-wrap gap-4">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Protocol Topology // Pure Sockets
            </span>
            <span className="text-[11px] font-mono text-neutral-500">
              Direct Socket Stream • No Third-Party Cloud Relay
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
            {/* Origin Node */}
            <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-transparent border border-white/15 w-full md:w-auto justify-center hover:border-white/30 transition-colors">
              <Laptop className="w-5 h-5 text-white" />
              <div className="text-left">
                <div className="text-xs font-mono text-white">ORIGIN NODE</div>
                <div className="text-[10px] text-neutral-500 font-mono">192.168.1.104 (Sender)</div>
              </div>
            </div>

            {/* Connection Arrow */}
            <div className="flex items-center text-white">
              <ArrowRight className="w-5 h-5 stroke-[2] rotate-90 md:rotate-0" />
            </div>

            {/* Tadaao Protocol Engine */}
            <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-transparent border border-white/30 w-full md:w-auto justify-center shadow-lg">
              <div className="w-7 h-7 rounded-md overflow-hidden border border-white/20 bg-black flex items-center justify-center">
                <img
                  src={tadaaoDarkLogo}
                  alt="Tadaao"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <div className="text-left">
                <div className="text-xs font-mono font-semibold text-white">TADAAO MESH</div>
                <div className="text-[10px] text-neutral-400 font-mono">Encrypted TLS Socket</div>
              </div>
            </div>

            {/* Connection Arrow */}
            <div className="flex items-center text-white">
              <ArrowRight className="w-5 h-5 stroke-[2] rotate-90 md:rotate-0" />
            </div>

            {/* Target Node */}
            <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-transparent border border-white/15 w-full md:w-auto justify-center hover:border-white/30 transition-colors">
              <Smartphone className="w-5 h-5 text-white" />
              <div className="text-left">
                <div className="text-xs font-mono text-white">TARGET PEER</div>
                <div className="text-[10px] text-neutral-500 font-mono">192.168.1.189 (Receiver)</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 pt-6 border-t border-white/5">
            <span className="text-[11px] font-mono text-neutral-500">
              Payload buffers are streamed directly across the local switch / Wi-Fi Access Point without traversing the public internet.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
