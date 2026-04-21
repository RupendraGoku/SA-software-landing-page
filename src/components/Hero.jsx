import { motion as Motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { heroContent as defaultContent } from "../content/heroContent";
import { variants } from "../utils/motion";

export default function Hero({ content = defaultContent }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden">
      {/* Background Ambience */}
      <div
        className="absolute inset-0 z-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(99, 102, 241, 0.12), transparent 58%), radial-gradient(ellipse at bottom right, rgba(168, 85, 247, 0.06), transparent 52%)",
        }}
      />

      <Motion.div
        className="container relative z-10 px-6 mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={variants.container}
      >
        {/* Badge */}
        <Motion.div variants={variants.fadeUp} className="flex justify-center mb-8">
          <span className="px-4 py-1.5 rounded-full border border-[var(--line)] bg-white/70 text-sm font-medium text-indigo-600">
            {content.badge}
          </span>
        </Motion.div>

        {/* Headline */}
        <Motion.h1
          variants={variants.fadeUp}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-8 text-gradient"
        >
          {content.heading.line1} <br />
          <span className="text-[var(--ink-900)] relative">
            {content.heading.highlight}
            <Motion.svg
              className="absolute -bottom-2 left-0 w-full h-3 text-indigo-500"
              viewBox="0 0 100 10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            >
              <path
                d="M0 5 Q 50 10 100 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
            </Motion.svg>
          </span>
        </Motion.h1>

        {/* Subhead */}
        <Motion.p
          variants={variants.fadeUp}
          className="text-xl text-[var(--ink-700)] max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {content.subheading}
        </Motion.p>

        {/* CTAs */}
        <Motion.div
          variants={variants.fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            type="button"
            className="book-demo-btn group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              {content.primaryCtaLabel}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-indigo-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          <button className="px-8 py-4 text-[var(--ink-900)] flex items-center gap-2 hover:text-indigo-600 transition-colors">
            <Play className="w-4 h-4 fill-current" />
            {content.secondaryCtaLabel}
          </button>
        </Motion.div>

       
      </Motion.div>
    </section>
  );
}
