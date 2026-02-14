import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { featuredProjectsContent as defaultContent } from "../content/featuredProjectsContent";

export default function FeaturedProjects({ content = defaultContent }) {
  const [hovered, setHovered] = useState(null);
  const {
    heading,
    description,
    viewAllLabel,
    viewAllHref,
    projectLinkLabel,
    projects,
  } = content;

  return (
    <section className="py-32 relative overflow-hidden bg-[var(--porcelain-100)]">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--ink-900)] mb-4">
              {heading.line1} <span className="text-indigo-500">{heading.highlight}</span>
            </h2>
            <p className="text-[var(--ink-700)] max-w-lg">{description}</p>
          </div>
          <a href={viewAllHref} className="flex items-center gap-2 text-[var(--ink-900)] hover:text-indigo-600 transition-colors group">
            {viewAllLabel} <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" size={18} />
          </a>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer border border-[var(--line)] bg-white/60"
            >
              {/* Background Image (Zoom & Color Effect) */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700"
                  animate={{ 
                    scale: hovered === project.id ? 1.1 : 1,
                    filter: hovered === project.id ? "grayscale(8%)" : "grayscale(45%)"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(66,52,38,0.75)] via-[rgba(66,52,38,0.2)] to-transparent opacity-85 group-hover:opacity-65 transition-opacity duration-500" />
              </div>

              {/* Content Layer */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">

                {/* Top Badge */}
                <div className="absolute top-8 right-8 px-3 py-1 rounded-full bg-white/65 border border-[var(--line)] backdrop-blur-md text-xs font-mono text-[var(--ink-700)]">
                  {project.category}
                </div>

                {/* Text Content */}
                <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                  
                  {/* Description (Hidden by default, slides up on hover) */}
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: hovered === project.id ? "auto" : 0,
                      opacity: hovered === project.id ? 1 : 0
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-[rgba(255,249,239,0.92)] text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t, i) => (
                        <span key={i} className="px-2 py-1 text-[10px] uppercase tracking-wider font-medium text-indigo-100 bg-indigo-500/25 border border-indigo-200/35 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Link Button */}
                  <a 
  href={project.href}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 text-sm font-medium text-white group-hover:text-indigo-300 transition-colors"
>
  {projectLinkLabel}
  <ArrowUpRight size={16} />
</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
