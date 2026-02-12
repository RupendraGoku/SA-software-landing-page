import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { howItWorksContent as defaultContent } from "../content/howItWorksContent";

export default function HowItWorks({ content = defaultContent }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  return (
    <section ref={ref} className="py-32 relative container mx-auto px-6">
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-zinc-900 -translate-x-1/2">
        <motion.div style={{ scaleY: scrollYProgress }} className="w-full bg-gradient-to-b from-indigo-500 to-cyan-500 origin-top h-full" />
      </div>

      {content.steps.map((step, index) => (
        <div key={index} className={`relative flex items-center mb-24 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
          <div className="w-full md:w-1/2" />

          <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black border-4 border-zinc-800 z-10 flex items-center justify-center">
            <div className="w-2 h-2 bg-indigo-500 rounded-full" />
          </div>

          <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              className="glass-panel p-8 rounded-xl"
            >
              <span className="text-indigo-400 font-mono text-sm mb-2 block">
                {content.stepLabelPrefix} {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="text-2xl font-bold mb-4">{step.title}</h4>
              <p className="text-zinc-400">{step.description}</p>
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
}
