import { motion } from "framer-motion";
import { experienceContent as defaultContent } from "../content/experienceContent";

export default function Experience({ content = defaultContent }) {
  const { number, suffix, label, established, heading, description, stats } = content;

  return (
    <section id="experience" className="py-24 relative overflow-hidden scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="relative z-10 max-w-5xl mx-auto">
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                
                {/* Left: The Big Number */}
               <motion.div 
  initial={{ opacity: 0, scale: 0.8 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="relative flex items-center justify-center md:justify-start"
>

  {/* wrapper ONLY for number + plus */}
  <div className="relative inline-block leading-none">

    {/* BIG NUMBER */}
    <span className="text-[12rem] md:text-[16rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[var(--ink-900)] to-[var(--ink-500)] tracking-tighter">
      {number}
    </span>

    {/* PLUS SIGN */}
    <span className="absolute top-4 right-2 md:top-6 md:right-0 md:left-62 text-5xl md:text-7xl font-bold text-indigo-500">
      {suffix}
    </span>

  </div>

  {/* TEXT BELOW */}
  <div className="absolute bottom-6 left-2 md:left-4">
    <span className="block text-xl md:text-2xl font-medium text-[var(--ink-900)] tracking-widest uppercase">
      {label.line1}
    </span>
    <span className="block text-lg text-indigo-400 tracking-widest uppercase">
      {label.line2}
    </span>
  </div>

</motion.div>


                {/* Right: The Narrative & Secondary Stats */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="inline-block px-3 py-1 mb-6 rounded-full border border-[var(--line)] bg-white/60 backdrop-blur-md">
                        <span className="text-sm text-indigo-600 font-mono">{established}</span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-[var(--ink-900)] mb-6 leading-tight">
                        {heading.line1} <br />
                        <span className="text-[var(--ink-500)]">{heading.line2}</span>
                    </h3>
                    
                    <p className="text-[var(--ink-700)] text-lg mb-8 leading-relaxed">
                        {description}
                    </p>

                    {/* Secondary Stats Row */}
                    <div className="grid grid-cols-2 gap-8 border-t border-[var(--line)] pt-8">
                        {stats.map((stat, i) => (
                            <div key={i}>
                                <div className="text-4xl font-bold text-[var(--ink-900)] mb-1">{stat.value}</div>
                                <div className="text-xs text-[var(--ink-500)] uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

        </div>
      </div>

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
