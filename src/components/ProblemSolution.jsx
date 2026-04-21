import { useEffect, useRef, useState } from "react";
import { motion as Motion, useInView } from "framer-motion";
import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { problemSolutionContent as defaultContent } from "../content/problemSolutionContent";

const Card = ({ item, index, setDeepFocus, solutionLabelPrefix, cardCtaLabel }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) setDeepFocus(index);
  }, [isInView, index, setDeepFocus]);

  return (
    <Motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`
        relative p-8 mb-24 rounded-3xl border border-[var(--line)] overflow-hidden group
        transition-colors duration-500
        ${isInView ? "bg-white/70 border-[var(--line)]" : "bg-[var(--porcelain-50)] border-[var(--line)]"}
      `}
    >
      {/* Dynamic Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-700 ${isInView ? "opacity-100" : ""}`} />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-full bg-white/80 ${item.accent}`}>
            <CheckCircle2 size={20} />
          </div>
          <span className={`text-sm font-mono tracking-wider uppercase ${item.accent}`}>
            {solutionLabelPrefix} 0{index + 1}
          </span>
        </div>

        <h3 className="text-3xl font-bold text-[var(--ink-900)] mb-4">{item.solution}</h3>
        <p className="text-[var(--ink-700)] leading-relaxed text-lg">{item.solutionDescription}</p>

        <button
          type="button"
          className="book-demo-btn mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--ink-700)] transition-colors group-hover:text-[var(--ink-900)]"
        >
          <span>{cardCtaLabel}</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </Motion.div>
  );
};

export default function ProblemSolution({ content = defaultContent }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  return (
    <section id="solutions" ref={containerRef} className="relative  bg-[var(--porcelain-100)] overflow-hidden scroll-mt-24">
      {/* Background Ambience */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at left 28%, rgba(248, 113, 113, 0.14), transparent 42%), radial-gradient(ellipse at right 68%, rgba(99, 102, 241, 0.12), transparent 44%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* LEFT COLUMN: The Problem (Sticky) */}
          <div className="lg:w-1/2 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center py-12 lg:py-0">
            <Motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="mb-12">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--ink-900)] mb-6">
                {content.heading.line1} <br />
                <span className="text-[var(--ink-500)]">{content.heading.line2}</span>
              </h2>
              <p className="text-[var(--ink-700)] text-xl max-w-md">{content.description}</p>
            </Motion.div>

            <div className="space-y-8 relative">
              {/* Connecting Line (Vertical) */}
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[var(--line)]" />

              {content.painPoints.map((item, i) => {
                const isActive = activeIndex === i;

                return (
                  <div key={item.id} className="relative pl-10 transition-all duration-500">
                    {/* Status Indicator Dot */}
                    <div
                      className={`
                        absolute left-0 top-1.5 w-6 h-6 rounded-full border border-[var(--line)] bg-[var(--porcelain-100)] flex items-center justify-center z-10 transition-colors duration-500
                        ${isActive ? "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]" : ""}
                      `}
                    >
                      <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${isActive ? "bg-red-500" : "bg-[var(--ink-500)]"}`} />
                    </div>

                    <h4 className={`text-xl font-semibold mb-2 transition-all duration-500 ${isActive ? "text-red-400 translate-x-2" : "text-[var(--ink-500)]"}`}>
                      <span className="flex items-center gap-2">
                        {item.problem}
                        {isActive && <XCircle size={16} className="text-red-500" />}
                      </span>
                    </h4>
                    <p
                      className={`text-sm leading-relaxed transition-all duration-500 ${
                        isActive ? "text-[var(--ink-700)] opacity-100 max-h-20" : "text-[var(--ink-500)] opacity-50 max-h-0 overflow-hidden"
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
