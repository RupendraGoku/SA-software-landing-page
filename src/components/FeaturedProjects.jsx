import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { featuredProjectsContent as defaultContent } from "../content/featuredProjectsContent";

export default function FeaturedProjects({ content = defaultContent }) {
  const [hovered, setHovered] = useState(null);
  const [canHover, setCanHover] = useState(false);
  const {
    heading,
    description,
    projectLinkLabel,
    projects,
  } = content;

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCanHover = () => setCanHover(mediaQuery.matches);

    updateCanHover();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateCanHover);
      return () => mediaQuery.removeEventListener("change", updateCanHover);
    }

    mediaQuery.addListener(updateCanHover);
    return () => mediaQuery.removeListener(updateCanHover);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[var(--porcelain-100)] py-14 md:py16">
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end md:gap-6"
        >
          <div>
            <h2 className="mb-4 text-3xl font-bold text-[var(--ink-900)] sm:text-4xl md:text-5xl">
              {heading.line1} <span className="text-indigo-500">{heading.highlight}</span>
            </h2>
            <p className="max-w-lg text-sm text-[var(--ink-700)] sm:text-base">{description}</p>
          </div>
          {/* <a
            href={viewAllHref}
            className="group flex w-fit items-center gap-2 self-start text-sm text-[var(--ink-900)] transition-colors hover:text-indigo-600 sm:text-base"
          >
            {viewAllLabel} <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" size={18} />
          </a> */}
        </Motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
          {projects.map((project) => {
            const isHovered = hovered === project.id;
            const isTouchExpanded = !canHover && hovered === project.id;
            const showDetails = canHover ? isHovered : isTouchExpanded;

            return (
              <Motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onMouseEnter={() => canHover && setHovered(project.id)}
                onMouseLeave={() => canHover && setHovered(null)}
                onClick={() =>
                  !canHover &&
                  setHovered((prev) => (prev === project.id ? null : project.id))
                }
                className={`group relative mx-auto w-full max-w-md cursor-pointer overflow-hidden rounded-3xl border border-[var(--line)] bg-white/60 md:mx-0 md:max-w-none md:h-[380px] lg:h-[400px] ${
                  !canHover && showDetails
                    ? "h-[420px] sm:h-[440px]"
                    : "h-[320px] sm:h-[340px]"
                }`}
              >
                {/* Background Image (Zoom & Color Effect) */}
                <div className="absolute inset-0 overflow-hidden">
                  <Motion.img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500"
                    animate={{
                      scale: canHover && isHovered ? 1.06 : 1,
                    }}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-[rgba(66,52,38,0.75)] via-[rgba(66,52,38,0.2)] to-transparent opacity-85 transition-opacity duration-500 ${
                      canHover ? "group-hover:opacity-65" : ""
                    }`}
                  />
                </div>

                {/* Content Layer */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8">

                  {/* Top Badge */}
                  <div className="absolute right-5 top-5 rounded-full border border-[var(--line)] bg-white/75 px-2.5 py-1 text-[10px] font-mono text-[var(--ink-700)] sm:right-8 sm:top-8 sm:px-3 sm:text-xs">
                    {project.category}
                  </div>

                  {/* Text Content */}
                  <div
                    className={`relative z-10 transform transition-transform duration-500 ${
                      canHover ? "group-hover:-translate-y-2" : ""
                    }`}
                  >
                    {!canHover && !showDetails && (
                      <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-[rgba(255,249,239,0.78)]">
                        Tap to view details
                      </p>
                    )}
                    <h3 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
                      {project.title}
                    </h3>

                    {/* Description (Hidden by default, slides up on hover) */}
                    <Motion.div
                      initial={false}
                      animate={{
                        height: showDetails ? "auto" : 0,
                        opacity: showDetails ? 1 : 0,
                      }}
                      className="overflow-hidden"
                    >
                      <p className="mb-4 text-sm leading-relaxed text-[rgba(255,249,239,0.92)]">
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="mb-5 flex flex-wrap gap-2 sm:mb-6">
                        {project.tech.map((t, i) => (
                          <span key={i} className="rounded border border-indigo-200/35 bg-indigo-500/25 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-indigo-100">
                            {t}
                          </span>
                        ))}
                      </div>
                    </Motion.div>

                    {/* Link Button */}
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 text-sm font-medium text-white transition-colors ${
                        canHover ? "group-hover:text-indigo-300" : ""
                      }`}
                    >
                      {projectLinkLabel}
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </Motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
