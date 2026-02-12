import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { finalCtaContent as defaultContent } from "../content/finalCtaContent";

export default function FinalCTA({ content = defaultContent }) {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Background "Wormhole" */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Layer 1 - Slow pulse */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[1500px] md:h-[1500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.4)_0%,transparent_60%)] blur-[100px]"
        />
        {/* Layer 2 - Offset rotation */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(124,58,237,0.3)_180deg,transparent_360deg)] blur-[80px] opacity-40"
        />
        {/* Grain Texture Overlay */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
            {content.heading.line1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{content.heading.highlight}</span>
          </h2>

          <p className="text-xl text-zinc-300 max-w-2xl mx-auto mb-12 leading-relaxed">{content.description}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]">
              <span className="relative z-10 flex items-center gap-2">
                {content.primaryCtaLabel} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-indigo-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="px-8 py-4 text-zinc-300 hover:text-white transition-colors font-medium">{content.secondaryCtaLabel}</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
