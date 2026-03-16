import { motion } from "framer-motion";
import { techStackContent as defaultContent } from "../content/techStackContent";

export default function TechStack({ content = defaultContent }) {
  const { heading, stack } = content;

  return (
    <section id="platform" className="py-5 bg-[var(--porcelain-100)] relative scroll-mt-24">
      <div className="container mx-auto px-6 text-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-[var(--ink-900)] mb-16"
        >
          {heading.line1} <span className="text-indigo-400">{heading.highlight}</span>
        </motion.h2>

        {/* Updated Grid: 2 cols mobile, 3 cols tablet, 6 cols desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stack.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }} // Faster stagger for more items
              viewport={{ once: true }}
              className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border border-[var(--line)] bg-white/60 hover:bg-white/70 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               
              <tech.icon className="w-8 h-8 md:w-10 md:h-10 text-[var(--ink-700)] group-hover:text-indigo-700 transition-colors mb-4 relative z-10" />
              <span className="text-xs md:text-sm font-medium text-[var(--ink-500)] group-hover:text-indigo-600 transition-colors relative z-10">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
