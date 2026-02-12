import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { problemSolutionContent as defaultContent } from "../content/problemSolutionContent";

const Card = ({ item, index, setDeepFocus, solutionLabelPrefix, cardCtaLabel }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) setDeepFocus(index);
  }, [isInView, index, setDeepFocus]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`
        relative p-8 mb-24 rounded-3xl border border-white/10 backdrop-blur-md overflow-hidden group
        transition-colors duration-500
        ${isInView ? "bg-white/5 border-white/20" : "bg-black/20 border-white/5"}
      `}
    >
      {/* Dynamic Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-700 ${isInView ? "opacity-100" : ""}`} />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-full bg-white/10 backdrop-blur-sm ${item.accent}`}>
            <CheckCircle2 size={20} />
          </div>
          <span className={`text-sm font-mono tracking-wider uppercase ${item.accent}`}>
            {solutionLabelPrefix} 0{index + 1}
          </span>
        </div>

        <h3 className="text-3xl font-bold text-white mb-4">{item.solution}</h3>
        <p className="text-zinc-400 leading-relaxed text-lg">{item.solutionDescription}</p>

        <div className="mt-8 flex items-center gap-2 text-sm font-medium text-white/60 group-hover:text-white transition-colors cursor-pointer">
          <span>{cardCtaLabel}</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export default function ProblemSolution({ content = defaultContent }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-32 bg-zinc-950 overflow-hidden">
      {/* Background Ambience */}
      <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* LEFT COLUMN: The Problem (Sticky) */}
          <div className="lg:w-1/2 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center py-12 lg:py-0">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="mb-12">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                {content.heading.line1} <br />
                <span className="text-zinc-600">{content.heading.line2}</span>
              </h2>
              <p className="text-zinc-400 text-xl max-w-md">{content.description}</p>
            </motion.div>

            <div className="space-y-8 relative">
              {/* Connecting Line (Vertical) */}
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-zinc-800" />

              {content.painPoints.map((item, i) => {
                const isActive = activeIndex === i;

                return (
                  <div key={item.id} className="relative pl-10 transition-all duration-500">
                    {/* Status Indicator Dot */}
                    <div
                      className={`
                        absolute left-0 top-1.5 w-6 h-6 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center z-10 transition-colors duration-500
                        ${isActive ? "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]" : ""}
                      `}
                    >
                      <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${isActive ? "bg-red-500" : "bg-zinc-800"}`} />
                    </div>

                    <h4 className={`text-xl font-semibold mb-2 transition-all duration-500 ${isActive ? "text-red-400 translate-x-2" : "text-zinc-600"}`}>
                      <span className="flex items-center gap-2">
                        {item.problem}
                        {isActive && <XCircle size={16} className="text-red-500 animate-pulse" />}
                      </span>
                    </h4>
                    <p
                      className={`text-sm leading-relaxed transition-all duration-500 ${
                        isActive ? "text-zinc-300 opacity-100 max-h-20" : "text-zinc-700 opacity-50 max-h-0 overflow-hidden"
                      }`}
                    >
                      {item.problemDescription}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: The Solution (Scrollable) */}
          <div className="lg:w-1/2 flex flex-col pt-0 lg:pt-32 pb-32">
            {content.painPoints.map((item, i) => (
              <Card
                key={item.id}
                item={item}
                index={i}
                setDeepFocus={setActiveIndex}
                solutionLabelPrefix={content.solutionLabelPrefix}
                cardCtaLabel={content.cardCtaLabel}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
