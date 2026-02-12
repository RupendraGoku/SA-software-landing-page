import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { heroContent as defaultContent } from "../content/heroContent";
import { variants } from "../utils/motion";

export default function Hero({ content = defaultContent }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <motion.div className="container relative z-10 px-6 mx-auto text-center" initial="hidden" animate="visible" variants={variants.container}>
        {/* Badge */}
        <motion.div variants={variants.fadeUp} className="flex justify-center mb-8">
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-indigo-300 backdrop-blur-md">
            {content.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={variants.fadeUp} className="text-6xl md:text-8xl font-bold tracking-tight mb-8 text-gradient">
          {content.heading.line1} <br />
          <span className="text-white relative">
            {content.heading.highlight}
            <motion.svg
              className="absolute -bottom-2 left-0 w-full h-3 text-indigo-500"
              viewBox="0 0 100 10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            >
              <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
            </motion.svg>
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p variants={variants.fadeUp} className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          {content.subheading}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={variants.fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
              {content.primaryCtaLabel} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-indigo-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          <button className="px-8 py-4 text-white flex items-center gap-2 hover:text-indigo-300 transition-colors">
            <Play className="w-4 h-4 fill-current" /> {content.secondaryCtaLabel}
          </button>
        </motion.div>

        {/* Abstract Dashboard Visualization */}
        <motion.div style={{ y: y1, opacity }} className="mt-20 relative mx-auto max-w-5xl glass-panel rounded-t-2xl border-b-0 h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
          {/* Mock UI Elements */}
          <div className="p-8 grid grid-cols-3 gap-6 opacity-80">
            <div className="h-32 bg-white/5 rounded-lg animate-pulse" />
            <div className="h-32 bg-white/5 rounded-lg col-span-2" />
            <div className="h-64 bg-white/5 rounded-lg col-span-3" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
