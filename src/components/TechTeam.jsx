import { useCallback, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { techTeamContent as defaultContent } from "../content/techTeamContent";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function TeamCard({ member }) {
  const cardRef = useRef(null);
  const boundsRef = useRef({ left: 0, top: 0, width: 1, height: 1 });
  const pointerRef = useRef({ clientX: 0, clientY: 0 });
  const frameRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 28, mass: 0.3 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 28, mass: 0.3 });

  // Keeping full 3D effect
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const updateBounds = useCallback(() => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    boundsRef.current = {
      left: rect.left,
      top: rect.top,
      width: rect.width || 1,
      height: rect.height || 1,
    };
  }, []);

  const flushPointerPosition = useCallback(() => {
    frameRef.current = null;
    const { left, top, width, height } = boundsRef.current;
    const mouseX = pointerRef.current.clientX - left;
    const mouseY = pointerRef.current.clientY - top;
    const xPct = clamp(mouseX / width - 0.5, -0.5, 0.5);
    const yPct = clamp(mouseY / height - 0.5, -0.5, 0.5);
    x.set(xPct);
    y.set(yPct);
  }, [x, y]);

  const schedulePointerUpdate = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(flushPointerPosition);
  }, [flushPointerPosition]);

  const handlePointerEnter = (e) => {
    if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    updateBounds();
    pointerRef.current = { clientX: e.clientX, clientY: e.clientY };
    schedulePointerUpdate();
  };

  const handlePointerMove = (e) => {
    if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    pointerRef.current = { clientX: e.clientX, clientY: e.clientY };
    schedulePointerUpdate();
  };

  const handlePointerLeave = () => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => {
      window.removeEventListener("resize", updateBounds);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [updateBounds]);

  return (
    <motion.div
      ref={cardRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
      className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer group mx-auto will-change-transform"
    >
      {/* Background Image */}
      <div
        style={{
          transform: "translateZ(75px)", // full depth kept
          backgroundImage: `url(${member.img})`,
        }}
        className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

      {/* Content */}
      <div
        style={{ transform: "translateZ(50px)" }} // full depth kept
        className="absolute bottom-0 left-0 p-3 md:p-4"
      >
        <h3 className="text-base md:text-lg font-bold text-white leading-tight">
          {member.name}
        </h3>
        <p className="text-indigo-200 font-mono text-[11px] md:text-xs">
          {member.role}
        </p>
      </div>
    </motion.div>
  );
}

export default function TechTeam({ content = defaultContent }) {
  const { heading, description, members } = content;

  return (
    <section className="py-5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <h2 className="text-5xl font-bold text-[var(--ink-900)] mb-6">
            {heading.line1}{" "}
            <span className="text-indigo-500">
              {heading.highlight}
            </span>
          </h2>
          <p className="text-[var(--ink-700)]">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 perspective-1000">
          {members.map((member, i) => (
            <TeamCard key={i} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}



