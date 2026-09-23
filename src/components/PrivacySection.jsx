import React from 'react';
import { ArrowDown, Laptop, Smartphone, CloudOff, Lock, ShieldCheck, EyeOff } from 'lucide-react';

export default function PrivacySection() {
  return (
    <section id="architecture" className="py-28 border-t border-white/10 relative bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Systems Privacy Guarantees */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-transparent text-[11px] font-mono uppercase tracking-widest text-neutral-400">
              Zero-Trust Architecture
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Your data stays within your physical perimeter.
            </h2>

            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed font-normal">
              Most sharing tools route your private files through remote third-party cloud data centers.
              Tadaao binds sockets strictly across your local network interface card. No server staging, no tracking logs, no surveillance exposure.
            </p>

            <div className="space-y-4 pt-3">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl border border-white/15 flex items-center justify-center text-white shrink-0 mt-0.5 bg-transparent">
                  <CloudOff className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Zero Cloud Staging</h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Payloads never touch AWS, GCP, or foreign intermediary servers. What happens on your network stays on your network.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl border border-white/15 flex items-center justify-center text-white shrink-0 mt-0.5 bg-transparent">
                  <EyeOff className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Zero Analytics or Tracking</h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Zero telemetry SDKs. Tadaao cannot see your file names, sizes, recipient metadata, or IP addresses.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl border border-white/15 flex items-center justify-center text-white shrink-0 mt-0.5 bg-transparent">
                  <Lock className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">RAM-Buffered Socket Streaming</h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Chunks are streamed directly through ephemeral memory buffers directly onto target storage without temporary cache residue.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Comparison Schematic */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-lg rounded-2xl bg-transparent border border-white/15 p-8">
              {/* Header */}
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10 text-xs font-mono">
                <span className="text-white font-semibold">TADAAO ARCHITECTURE</span>
                <span className="text-neutral-500">P2P DIRECT MESH</span>
              </div>

              {/* Tadaao Direct Flow */}
              <div className="flex flex-col items-center">
                {/* Node: Host Device */}
                <div className="w-full flex items-center justify-between p-4 rounded-xl bg-transparent border border-white/15">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg border border-white/20 flex items-center justify-center text-white bg-transparent">
                      <Laptop className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                        ORIGIN HOST
                      </div>
                      <div className="text-sm font-semibold text-white">Local Sender</div>
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-500">NIC Interface</div>
                </div>

                {/* Direct Stream Conduit */}
                <div className="relative py-5 flex flex-col items-center justify-center w-full">
                  <div className="w-[1px] h-14 bg-white/30 relative flex items-center justify-center">
                    <span className="absolute px-3 py-1 rounded bg-black border border-white/25 text-[10px] font-mono text-white whitespace-nowrap">
                      Direct LAN Socket Stream (No Cloud)
                    </span>
                  </div>
                  <div className="text-white -mt-1">
                    <ArrowDown className="w-4 h-4 stroke-[2]" />
                  </div>
                </div>

                {/* Node: Target Device */}
                <div className="w-full flex items-center justify-between p-4 rounded-xl bg-transparent border border-white/15">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg border border-white/20 flex items-center justify-center text-white bg-transparent">
                      <Smartphone className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                        DESTINATION HOST
                      </div>
                      <div className="text-sm font-semibold text-white">Local Receiver</div>
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-500">Target Disk</div>
                </div>
              </div>

              {/* Cloud Alternative Contrast Note */}
              <div className="mt-8 pt-5 border-t border-white/10">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    Zero remote attack surface
                  </span>
                  <span className="text-neutral-400">Local Subnet Isolation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
