import { useEffect, useRef } from "react";
import gsap from "gsap";
import { trustLogosContent as defaultContent } from "../content/trustLogosContent";

export default function TrustLogos({ content = defaultContent }) {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const marqueeContent = marqueeRef.current.querySelector(".marquee-content");
      const clone = marqueeContent.cloneNode(true);
      marqueeRef.current.appendChild(clone);

      gsap.to('.marquee-content', {
        xPercent: -100,
        repeat: -1,
        duration: 30, // Slow, luxurious speed
        ease: "linear",
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-12 border-y border-[var(--line)] bg-[var(--porcelain-50)] overflow-hidden">
      <div className="text-center mb-8 text-sm text-[var(--ink-500)] uppercase tracking-widest font-medium">
        {content.sectionLabel}
      </div>
      
      <div ref={marqueeRef} className="flex overflow-hidden whitespace-nowrap mask-linear-fade">
        <div className="marquee-content flex gap-16 px-8 items-center">
          {content.logos.map((logo, i) => (
            <span key={i} className="text-2xl font-bold text-[var(--ink-500)] hover:text-[var(--ink-900)] transition-colors duration-500 cursor-default">
              {logo.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
      {/* Mask helper style in CSS: mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent); */}
    </section>
  );
}
