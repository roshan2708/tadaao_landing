import React from 'react';
import { Zap, Shield, Cpu, Network, HardDrive, Hash } from 'lucide-react';

const technicalFeatures = [
  {
    icon: Zap,
    tag: 'Throughput',
    title: 'Wire-Speed Socket Streaming',
    description:
      'Transfers stream directly between device sockets via optimized TCP channels at maximum LAN speed.',
  },
  {
    icon: Shield,
    tag: 'Private',
    title: 'Zero Cloud Intermediary',
    description:
      'Your files never touch external servers or third-party cloud relays. Pure local transmission.',
  },
  {
    icon: Network,
    tag: 'Local Mesh',
    title: 'Instant Local Discovery',
    description:
      'Automatic peer discovery on your local network. No accounts or pairing codes required.',
  },
  {
    icon: Cpu,
    tag: 'Cross-Platform',
    title: 'Universal Compatibility',
    description:
      'Seamless peer-to-peer transfers across macOS, Windows, and Android devices.',
  },
  {
    icon: HardDrive,
    tag: 'No Limits',
    title: 'Zero File Size Restrictions',
    description:
      'Send large files, disk images, and media collections without throttling or bandwidth caps.',
  },
  {
    icon: Hash,
    tag: 'Integrity',
    title: 'Stream Verification',
    description:
      'Cryptographic checksum verification ensures byte-for-byte delivery on every transfer.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 border-t border-white/10 relative bg-black">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-transparent mb-4 text-[11px] font-mono uppercase tracking-widest text-neutral-400">
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Fast, secure, and purely peer-to-peer
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Engineered for high-speed local file transfers with zero cloud baggage.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicalFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-2xl bg-transparent border border-white/10 hover:border-white/30 p-6 flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center text-white group-hover:border-white/35 transition-colors bg-transparent">
                      <Icon className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 border border-white/10 px-2 py-0.5 rounded">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-2 tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
