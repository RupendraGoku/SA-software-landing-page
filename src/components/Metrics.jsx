import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { metricsContent as defaultContent } from "../content/metricsContent";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (!ref.current) return;

      const formattedValue = Number.isInteger(value) ? Math.floor(latest).toLocaleString() : latest.toFixed(2);
      ref.current.textContent = `${formattedValue}${suffix}`;
    });

    return unsubscribe;
  }, [springValue, suffix, value]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Metrics({ content = defaultContent }) {
  return (
    <section className="py-32 bg-[var(--porcelain-200)] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(110,88,62,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(110,88,62,0.08)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--ink-900)]">
            {content.heading.lead} <span className="text-indigo-400">{content.heading.highlight}</span>
          </h2>
          <p className="text-[var(--ink-700)] max-w-2xl mx-auto text-lg">{content.description}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {content.stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-4">
              <div className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[var(--ink-900)] to-[var(--ink-500)] mb-4 tracking-tighter">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-medium text-[var(--ink-500)] uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
