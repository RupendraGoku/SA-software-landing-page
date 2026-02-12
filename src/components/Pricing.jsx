import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { pricingContent as defaultContent } from "../content/pricingContent";

export default function Pricing({ content = defaultContent }) {
  const [billingCycle, setBillingCycle] = useState("M");
  const isYearly = billingCycle === "Y";
  const discountMultiplier = 1 - content.billing.yearlyDiscount;
  const billingOptions = [
    { id: "M", label: content.billing.monthlyLabel },
    { id: "Y", label: content.billing.yearlyLabel },
  ];

  return (
    <section id={content.sectionId} className="py-32 bg-zinc-950 relative">
      <div className="container mx-auto px-6">
        {/* Header & Toggle */}
        <div className="flex flex-col items-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-6">{content.heading}</h2>
          <p className="text-zinc-400 mb-8">{content.description}</p>

          {/* Toggle Switch */}
          <div className="relative flex items-center bg-zinc-900 p-1 rounded-full border border-white/10">
            {billingOptions.map((option) => {
              const isSelected = option.id === billingCycle;

              return (
                <button
                  key={option.id}
                  onClick={() => setBillingCycle(option.id)}
                  className={`relative px-6 py-2 text-sm font-medium rounded-full z-10 transition-colors ${isSelected ? "text-white" : "text-zinc-500"}`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="billing-pill"
                      className="absolute inset-0 bg-indigo-600 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {option.label}
                  {option.id === "Y" && <span className="ml-2 text-[10px] text-emerald-400 uppercase">{content.billing.yearlySaveLabel}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {content.plans.map((plan, index) => {
            const hasNumericPrice = typeof plan.monthlyPrice === "number";
            const displayedPrice = hasNumericPrice
              ? `$${isYearly ? Math.floor(plan.monthlyPrice * discountMultiplier) : plan.monthlyPrice}`
              : plan.customPriceLabel;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative p-8 rounded-3xl border flex flex-col h-full
                  ${plan.popular ? "bg-zinc-900/80 border-indigo-500/50 shadow-2xl shadow-indigo-500/10 scale-105 z-10" : "bg-zinc-900/30 border-white/5 hover:border-white/10"}
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                    {content.popularBadgeLabel}
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-lg font-medium text-zinc-300">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-4 mb-2">
                    <span className="text-4xl font-bold text-white">{displayedPrice}</span>
                    {hasNumericPrice && <span className="text-zinc-500">{content.billing.monthlySuffix}</span>}
                  </div>
                  <p className="text-sm text-zinc-500">{plan.description}</p>
                </div>

                <div className="flex-grow space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                      <Check size={16} className="text-indigo-400" />
                      {feature}
                    </div>
                  ))}
                </div>

                <button
                  className={`
                    w-full py-4 rounded-xl font-semibold transition-all
                    ${plan.popular ? "bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-[1.02]" : "bg-white/5 text-white hover:bg-white/10"}
                  `}
                >
                  {plan.ctaLabel}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
