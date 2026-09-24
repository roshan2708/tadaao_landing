import React from 'react';
import { ArrowRight, Laptop, Smartphone } from 'lucide-react';
import tadaaoDarkLogo from '../assets/tadaao-dark.png';

const protocolSteps = [
  {
    step: '01',
    phase: 'DISCOVERY',
    title: 'Local Subnet Discovery',
    description:
      'Devices broadcast on the local subnet to automatically discover nearby peers without contacting any cloud servers.',
  },
  {
    step: '02',
    phase: 'CONNECT',
    title: 'Direct Socket Pairing',
    description:
      'Establish a fast, encrypted peer-to-peer TCP channel directly between devices with zero login requirements.',
  },
  {
    step: '03',
    phase: 'TRANSFER',
    title: 'Wire-Speed Streaming',
    description:
      'Files stream directly between network cards at full local Wi-Fi or Ethernet speed with zero cloud staging.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 border-t border-white/10 relative bg-black">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-transparent mb-4 text-[11px] font-mono uppercase tracking-widest text-neutral-400">
            Protocol
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            How Tadaao Works
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Direct peer-to-peer file transfer in three simple steps.
          </p>
        </div>

        {/* Protocol Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {protocolSteps.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl bg-transparent border border-white/10 hover:border-white/30 p-6 flex flex-col justify-between transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/5">
                  <span className="font-mono text-2xl font-extrabold text-white/40">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 border border-white/10 px-2 py-0.5 rounded">
                    {item.phase}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white mb-2 tracking-tight">
                  {item.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Topology Diagram */}
        <div className="rounded-2xl bg-transparent border border-white/15 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-3xl mx-auto">
            {/* Origin Node */}
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-transparent border border-white/15 w-full md:w-auto justify-center">
              <Laptop className="w-5 h-5 text-white" />
              <div className="text-left">
                <div className="text-xs font-mono font-medium text-white">Sender Device</div>
                <div className="text-[10px] text-neutral-500 font-mono">Local Host</div>
              </div>
            </div>

            {/* Connection Arrow */}
            <div className="flex items-center text-white">
              <ArrowRight className="w-4 h-4 stroke-[2] rotate-90 md:rotate-0 text-neutral-400" />
            </div>

            {/* Tadaao Protocol Engine */}
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-transparent border border-white/30 w-full md:w-auto justify-center">
              <div className="w-6 h-6 rounded-md overflow-hidden border border-white/20 bg-black flex items-center justify-center">
                <img
                  src={tadaaoDarkLogo}
                  alt="Tadaao"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <div className="text-left">
                <div className="text-xs font-mono font-semibold text-white">Direct LAN Socket</div>
                <div className="text-[10px] text-neutral-400 font-mono">Encrypted Stream</div>
              </div>
            </div>

            {/* Connection Arrow */}
            <div className="flex items-center text-white">
              <ArrowRight className="w-4 h-4 stroke-[2] rotate-90 md:rotate-0 text-neutral-400" />
            </div>

            {/* Target Node */}
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-transparent border border-white/15 w-full md:w-auto justify-center">
              <Smartphone className="w-5 h-5 text-white" />
              <div className="text-left">
                <div className="text-xs font-mono font-medium text-white">Receiver Device</div>
                <div className="text-[10px] text-neutral-500 font-mono">Target Peer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
