import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { heroContent as defaultContent } from "../content/heroContent";
import { variants } from "../utils/motion";

export default function Hero({ content = defaultContent }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 400], [0, 100]);
  const opacity = useTransform(scrollY, [0, 700], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        className="container relative z-10 px-6 mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={variants.container}
      >
        {/* Badge */}
        <motion.div variants={variants.fadeUp} className="flex justify-center mb-8">
          <span className="px-4 py-1.5 rounded-full border border-[var(--line)] bg-white/60 text-sm font-medium text-indigo-600 backdrop-blur-md">
            {content.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={variants.fadeUp}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-8 text-gradient"
        >
          {content.heading.line1} <br />
          <span className="text-[var(--ink-900)] relative">
            {content.heading.highlight}
            <motion.svg
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
            </motion.svg>
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          variants={variants.fadeUp}
          className="text-xl text-[var(--ink-700)] max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {content.subheading}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={variants.fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
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
        </motion.div>

        {/* Real Dashboard Mock */}
        {/* <motion.div
          style={{ y: y1, opacity }}
          className="mt-20 relative mx-auto max-w-6xl rounded-2xl border border-[var(--line)] bg-gradient-to-b from-white/70 to-[var(--porcelain-200)] backdrop-blur-2xl shadow-[0_20px_70px_rgba(110,88,62,0.25)] overflow-hidden text-left"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--line)] bg-white/60">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-sm text-[var(--ink-700)]">Analytics Dashboard</div>
            <div className="w-28 h-8 bg-white/70 rounded-md" />
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="w-60 border-r border-[var(--line)] p-6 space-y-4 bg-white/60">
              <div className="h-10 bg-indigo-500/30 rounded-md" />
              <div className="h-8 bg-white/70 rounded-md" />
              <div className="h-8 bg-white/70 rounded-md" />
              <div className="h-8 bg-white/70 rounded-md" />
              <div className="h-8 bg-white/70 rounded-md" />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-white/60 border border-[var(--line)]">
                  <div className="text-xs text-[var(--ink-700)] mb-2">Revenue</div>
                  <div className="text-2xl font-semibold text-[var(--ink-900)]">
                    88,230
                  </div>
                  <div className="h-1 mt-3 bg-indigo-500 rounded-full w-3/4" />
                </div>

                <div className="p-4 rounded-xl bg-white/60 border border-[var(--line)]">
                  <div className="text-xs text-[var(--ink-700)] mb-2">Users</div>
                  <div className="text-2xl font-semibold text-[var(--ink-900)]">
                    1,845
                  </div>
                  <div className="h-1 mt-3 bg-purple-500 rounded-full w-2/3" />
                </div>

                <div className="p-4 rounded-xl bg-white/60 border border-[var(--line)]">
                  <div className="text-xs text-[var(--ink-700)] mb-2">Conversion</div>
                  <div className="text-2xl font-semibold text-[var(--ink-900)]">
                    14.8%
                  </div>
                  <div className="h-1 mt-3 bg-green-500 rounded-full w-1/2" />
                </div>
              </div>

              {/* Chart Section */}
              <div className="p-6 rounded-xl bg-white/60 border border-[var(--line)]">
                <div className="h-40 flex items-end gap-4">
                  <div className="w-8 bg-indigo-500/70 rounded-md h-24" />
                  <div className="w-8 bg-indigo-500/70 rounded-md h-32" />
                  <div className="w-8 bg-indigo-500/70 rounded-md h-20" />
                  <div className="w-8 bg-indigo-500/70 rounded-md h-36" />
                  <div className="w-8 bg-indigo-500/70 rounded-md h-28" />
                  <div className="w-8 bg-indigo-500/70 rounded-md h-40" />
                </div>
              </div>

              {/* Table Mock */}
              <div className="p-6 rounded-xl bg-white/60 border border-[var(--line)] space-y-3">
                <div className="h-6 bg-white/70 rounded-md w-1/3" />
                <div className="h-4 bg-white/70 rounded-md" />
                <div className="h-4 bg-white/70 rounded-md" />
                <div className="h-4 bg-white/70 rounded-md w-4/5" />
              </div>
            </div>
          </div>
        </motion.div> */}
      </motion.div>
    </section>
  );
}
