import { useRef, useState } from "react";
import { motion as Motion, useMotionValueEvent, useScroll } from "framer-motion";
import { featureHighlightContent as defaultContent } from "../content/featureHighlightContent";

export default function FeatureHighlight({ content = defaultContent }) {
  const containerRef = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const { features, featureLabelPrefix, processingLabel } = content;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!features.length) return;
    const rawIndex = Math.floor(progress * features.length);
    const nextIndex = Math.min(features.length - 1, Math.max(0, rawIndex));

    setActiveFeature((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
  });

  if (!features.length) {
    return null;
  }

  return (
    <section className="bg-[var(--porcelain-100)] relative">
      <div ref={containerRef} className="relative" style={{ height: `${features.length * 100}vh` }}>
        <div className="container mx-auto px-6 h-full flex items-start">
          {/* LEFT: Scrolling Content */}
          <div className="w-full lg:w-1/2 py-[20vh] flex flex-col justify-between gap-[50vh]">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div key={feature.id} className="h-[40vh] flex flex-col justify-center">
                  <div className="group">
                    <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-[var(--line)] bg-white/70 w-fit">
                      <Icon className="w-5 h-5 text-indigo-400" />
                      <span className="text-sm font-mono text-indigo-600 uppercase tracking-widest">
                        {featureLabelPrefix} 0{index + 1}
                      </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold text-[var(--ink-900)] mb-6 leading-tight">{feature.title}</h2>
                    <h3 className="text-2xl text-[var(--ink-500)] font-medium mb-6">{feature.subtitle}</h3>
                    <p className="text-xl text-[var(--ink-700)] leading-relaxed max-w-lg">{feature.description}</p>

                    <div className="mt-12 flex items-center gap-4">
                      <div className="h-px w-12 bg-[var(--line)]" />
                      <div className="text-3xl font-bold text-[var(--ink-900)] font-mono">{feature.stat}</div>
                      <div className="text-xs text-[var(--ink-500)] uppercase tracking-wider">{feature.statLabel}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Sticky Visuals */}
          <div className="hidden lg:block w-1/2 sticky top-0 h-screen flex items-center justify-center p-12">
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden border border-[var(--line)] bg-[var(--porcelain-200)] shadow-xl">
              {/* Dynamic Backgrounds */}
              {features.map((feature, index) => (
                <Motion.div
                  key={feature.id}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeFeature === index ? 1 : 0,
                    scale: activeFeature === index ? 1 : 1.1,
                  }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20`}
                />
              ))}

              {/* Internal UI Mockup (Abstract) */}
              <div className="absolute inset-4 border border-[var(--line)] rounded-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-12 border-b border-[var(--line)] bg-white/60 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>

                {/* Content Swap based on Active Feature */}
                <div className="mt-12 p-8 h-full relative">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;

                    return (
                      <Motion.div
                        key={feature.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: activeFeature === index ? 1 : 0,
                          y: activeFeature === index ? 0 : 20,
                        }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="absolute inset-0 p-8 flex flex-col items-center justify-center"
                      >
                        {/* Abstract Visual Representation */}
                        <div className="relative flex h-48 w-48 items-center justify-center">
                          <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${feature.gradient} opacity-30`} />
                          <Icon className="w-32 h-32 text-[var(--ink-900)] relative z-10 drop-shadow-xl" strokeWidth={1} />
                        </div>
                        <div className="mt-12 w-full max-w-sm h-2 bg-[var(--line)] rounded-full overflow-hidden">
                          <Motion.div
                            initial={{ width: 0 }}
                            animate={{ width: activeFeature === index ? "100%" : "0%" }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className="h-full bg-indigo-500"
                          />
                        </div>
                        <div className="mt-4 font-mono text-xs text-[var(--ink-500)]">{processingLabel}</div>
                      </Motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Glass Reflection Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
