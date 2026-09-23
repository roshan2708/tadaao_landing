import React from 'react';
import { Zap, Shield, Cpu, Network, HardDrive, Hash } from 'lucide-react';

const technicalFeatures = [
  {
    icon: Zap,
    tag: 'LAN Throughput',
    title: 'Wire-Speed Socket Streaming',
    description:
      'Transfers stream directly between device sockets via optimized TCP/UDP channels. Reaches maximum link capacity across Wi-Fi 6/6E and Gigabit Ethernet with minimal CPU overhead.',
  },
  {
    icon: Shield,
    tag: 'Zero Relays',
    title: 'Zero Cloud Intermediary',
    description:
      'Your payload never touches third-party cloud buckets, relay proxies, or external data centers. Pure host-to-host transmission confined to your trusted physical perimeter.',
  },
  {
    icon: Network,
    tag: 'Zero Config',
    title: 'Autonomous Local Mesh Discovery',
    description:
      'Self-healing node discovery via local mDNS and UDP broadcasts. Zero pairing codes, zero registration accounts, and zero coordination servers required.',
  },
  {
    icon: Cpu,
    tag: 'Universal Core',
    title: 'Deterministic Cross-Platform Engine',
    description:
      'Engineered in unified native systems code across Apple Silicon, Windows NT, Linux POSIX, iOS, and Android. Predictable byte-for-byte serialization.',
  },
  {
    icon: HardDrive,
    tag: 'Uncapped',
    title: 'Zero File Size Restrictions',
    description:
      'Stream massive 100GB+ disk images, ProRes video footage, or raw datasets without compression artifacts, timeout disconnects, or artificial bandwidth caps.',
  },
  {
    icon: Hash,
    tag: 'BLAKE3 Hashes',
    title: 'Cryptographic Stream Verification',
    description:
      'Chunk-level integrity checksums calculated in real-time using SIMD-accelerated BLAKE3 hashing. Bit-perfect delivery guaranteed on every transfer.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 border-t border-white/10 relative bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-transparent mb-4 text-[11px] font-mono uppercase tracking-widest text-neutral-400">
            System Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Engineered for pure speed. No cloud baggage.
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg leading-relaxed">
            Eliminating every unnecessary layer between your devices. No remote staging, no surveillance telemetry, and no artificial restrictions.
          </p>
        </div>

        {/* Feature Grid: 100% Transparent Containers with crisp borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicalFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative rounded-2xl bg-transparent border border-white/10 hover:border-white/30 p-8 flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center text-white group-hover:border-white/40 transition-colors bg-transparent">
                      <Icon className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 border border-white/10 px-2.5 py-1 rounded bg-transparent">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>Architecture</span>
                  <span className="text-neutral-400 group-hover:text-white transition-colors">Direct P2P →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
