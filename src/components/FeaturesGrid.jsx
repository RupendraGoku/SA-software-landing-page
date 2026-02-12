import { motion } from "framer-motion";
import { featuresGridContent as defaultContent } from "../content/featuresGridContent";
import { variants } from "../utils/motion";

export default function FeaturesGrid({ content = defaultContent }) {
  return (
    <section className="py-32 px-6 container mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={variants.container}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {content.features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={index}
              variants={variants.fadeUp}
              className="group relative p-8 glass-panel rounded-2xl overflow-hidden hover:bg-white/5 transition-colors duration-500"
            >
              <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 bg-indigo-500 rounded-full glow-point" />
              </div>

              <Icon className="w-10 h-10 text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
