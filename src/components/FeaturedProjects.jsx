import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "Nova Financial",
    category: "FinTech Platform",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    tech: ["Laravel", "Vue.js", "MySQL"],
    desc: "Real-time banking dashboard processing $5M+ daily transactions with sub-second latency.",
    link: "#",
  },
  {
    id: 2,
    title: "Orbit Health",
    category: "MedTech SaaS",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    tech: ["React", "Node.js", "Redis"],
    desc: "AI-powered diagnostic tool used by 200+ clinics. HIPAA compliant architecture.",
    link: "#",
  },
  {
    id: 3,
    title: "HyperStream",
    category: "Media Streaming",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
    tech: ".NET Core",
    desc: "Adaptive bitrate streaming engine capable of handling 100k concurrent viewers.",
    link: "#",
  },
  {
    id: 4,
    title: "Propulsion Kit",
    category: "DevTools",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
    tech: ["Tailwind", "Next.js", "Hostinger"],
    desc: "A complete UI kit for shipping enterprise dashboards in record time.",
    link: "#",
  },
];

export default function FeaturedProjects() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="py-32 relative overflow-hidden bg-black/20">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Selected <span className="text-indigo-400">Deployments</span>
            </h2>
            <p className="text-zinc-400 max-w-lg">
              Engineering solutions that scale. From high-frequency trading to global media distribution.
            </p>
          </div>
          <button className="flex items-center gap-2 text-white hover:text-indigo-400 transition-colors group">
            View Github <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" size={18} />
          </button>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer border border-white/10 bg-white/5"
            >
              {/* Background Image (Zoom & Color Effect) */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700"
                  animate={{ 
                    scale: hovered === project.id ? 1.1 : 1,
                    filter: hovered === project.id ? "grayscale(0%)" : "grayscale(100%)"
                  }}
                />
                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
              </div>

              {/* Content Layer */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                
                {/* Top Badge */}
                <div className="absolute top-8 right-8 px-3 py-1 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-xs font-mono text-zinc-300">
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
                    <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                      {project.desc}
                    </p>
                    
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t, i) => (
                        <span key={i} className="px-2 py-1 text-[10px] uppercase tracking-wider font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Link Button */}
                  <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">
                    View Case Study <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}