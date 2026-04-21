import { Star } from "lucide-react";
import { reviewsContent as defaultContent } from "../content/reviewsContent";

const ReviewCard = ({ review }) => (
  <div className="p-6 rounded-xl bg-white/70 border border-[var(--line)] hover:border-indigo-500/30 transition-colors">
    <div className="flex items-center gap-1 mb-1">
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
    <section className="py-10 relative overflow-hidden bg-[var(--porcelain-100)]">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <ReviewCard key={`${review.user}-${index}`} review={review} />
        ))}
      </div>
    </section>
  );
}
