import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { reviewsContent as defaultContent } from "../content/reviewsContent";

const ReviewCard = ({ review }) => (
  <div className="p-6 mb-6 rounded-xl bg-white/60 border border-[var(--line)] backdrop-blur-sm hover:border-indigo-500/30 transition-colors">
    <div className="flex items-center gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="fill-indigo-500 text-indigo-500" />
      ))}
    </div>
    <p className="text-[var(--ink-700)] text-sm leading-relaxed mb-4">"{review.text}"</p>
    <div className="text-xs font-mono text-[var(--ink-500)]">{review.user}</div>
  </div>
);

export default function Reviews({ content = defaultContent }) {
  const { reviews } = content;

  return (
    <section className="py-32 relative overflow-hidden bg-[var(--porcelain-100)]">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 h-[600px] overflow-hidden mask-linear-fade">
        
        {/* Column 1 - Slow Scroll Up */}
        <div className="relative h-full overflow-hidden">
          <motion.div 
            animate={{ y: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...reviews, ...reviews, ...reviews].map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
          </motion.div>
        </div>

        {/* Column 2 - Slow Scroll Down (Reverse) */}
        <div className="relative h-full overflow-hidden hidden md:block">
          <motion.div 
            animate={{ y: [-1000, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...reviews, ...reviews, ...reviews].reverse().map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
          </motion.div>
        </div>

        {/* Column 3 - Slow Scroll Up */}
        <div className="relative h-full overflow-hidden hidden lg:block">
          <motion.div 
            animate={{ y: [0, -1000] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
             {/* Shuffle slightly for variety */}
            {[...reviews.slice(2), ...reviews, ...reviews].map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
          </motion.div>
        </div>

      </div>
      
      {/* Fade Masks for Smooth Edges */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--porcelain-100)] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--porcelain-100)] to-transparent z-10" />
    </section>
  );
}
