import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { securityContent as defaultContent } from "../content/securityContent";

export default function Security({ content = defaultContent }) {
  return (
    <section className="relative py-16 bg-[var(--porcelain-100)] overflow-hidden">
      {/* Background Radar Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[100px] animate-pulse" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* LEFT: The Narrative */}
          <div className="lg:w-1/2">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium uppercase tracking-wider mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {content.badgeLabel}
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-[var(--ink-900)] mb-6">
                {content.heading.line1} <br />
                <span className="text-emerald-500">{content.heading.line2}</span>
              </h2>

              <p className="text-[var(--ink-700)] text-lg leading-relaxed mb-8">{content.description}</p>

              <ul className="space-y-4">
                {content.controls.map((control) => (
                  <li key={control} className="flex items-center gap-3 text-[var(--ink-700)]">
                    <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                      <Check size={14} />
                    </div>
                    {control}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* RIGHT: The Visual Vault */}
          <div className="lg:w-1/2 w-full">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative grid grid-cols-2 gap-4">
              {/* Scanning Beam */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent w-full h-[20%] top-0 animate-[scan_4s_ease-in-out_infinite]" />

              {content.certifications.map((certification) => {
                const Icon = certification.icon;

                return (
                  <div
                    key={certification.name}
                    className="group relative p-8 bg-[var(--porcelain-200)] border border-[var(--line)] rounded-2xl backdrop-blur-md overflow-hidden hover:border-emerald-500/30 transition-colors"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <Icon className="w-10 h-10 text-emerald-500 mb-4" />
                    <h4 className="text-xl font-bold text-[var(--ink-900)]">{certification.name}</h4>
                    <p className="text-xs text-[var(--ink-500)] mt-2">{content.certificationLabel}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
