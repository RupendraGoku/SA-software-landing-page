import { motion as Motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { finalCtaContent as defaultContent } from "../content/finalCtaContent";

export default function FinalCTA({ content = defaultContent }) {
  return (
    <section className="relative min-h-[52vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden bg-[var(--porcelain-100)]">
      {/* Premium, lightweight ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(99,102,241,0.18)_0%,rgba(250,245,236,0.96)_58%,rgba(243,235,222,1)_100%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(to_right,rgba(110,88,62,0.08)_0,rgba(110,88,62,0.08)_1px,transparent_1px,transparent_80px),repeating-linear-gradient(to_bottom,rgba(110,88,62,0.08)_0,rgba(110,88,62,0.08)_1px,transparent_1px,transparent_80px)]" />

        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 w-[90vmin] h-[90vmin] max-w-[980px] max-h-[980px] -translate-x-1/2 -translate-y-1/2 rounded-[42%] border border-indigo-300/20"
        />

        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-0 h-56 bg-gradient-to-b from-indigo-400/20 to-transparent"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <Motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl rounded-3xl border border-[var(--line)] bg-[rgba(255,250,242,0.82)] px-6 py-12 md:px-12 shadow-[0_18px_45px_rgba(110,88,62,0.18)]"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-[var(--ink-900)] tracking-tight mb-8">
            {content.heading.line1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{content.heading.highlight}</span>
          </h2>

          <p className="text-xl text-[var(--ink-700)] max-w-2xl mx-auto mb-12 leading-relaxed">{content.description}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              className="book-demo-btn group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_10px_28px_rgba(99,102,241,0.24)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                {content.primaryCtaLabel} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-indigo-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button
              type="button"
              className="book-demo-btn px-8 py-4 text-[var(--ink-700)] hover:text-[var(--ink-900)] transition-colors font-medium"
            >
              {content.secondaryCtaLabel}
            </button>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}
