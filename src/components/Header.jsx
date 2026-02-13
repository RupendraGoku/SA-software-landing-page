import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
// import { Menu, X, ChevronRight } from "lucide-react";
import { headerContent as defaultContent } from "../content/headerContent";

export default function Header({ content = defaultContent }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Scroll Interpolation for the "Glass" effect
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(250,245,236,0)", "rgba(250,245,236,0.82)"]
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  );

  const borderColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(110, 88, 62, 0)", "rgba(110, 88, 62, 0.28)"]
  );

  const { brand, navLinks, loginLabel, primaryCtaLabel, mobilePrimaryCtaLabel } = content;

  return (
    <>
      <motion.header
        style={{
          backgroundColor,
          backdropFilter: backdropBlur,
          borderBottomColor: borderColor,
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent"
      >
        {/* ✅ CHANGED TO GRID LAYOUT */}
        <div className="container mx-auto px-3 h-20 flex items-center md:grid md:grid-cols-3">
          
          {/* Logo - Left */}
          <div className="flex items-center gap-2 cursor-pointer z-50 min-w-0 flex-1 md:flex-none md:justify-self-start">
            <img
              src="/asset/sa_logo.png"
              alt="SA Softech Logo"
              className="w-11 h-11 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain bg-white rounded-full"
            />

            <span className="min-w-0 max-w-[11.5rem] sm:max-w-[14rem] md:max-w-none truncate whitespace-nowrap text-base sm:text-lg md:text-2xl font-extrabold tracking-normal md:tracking-wide bg-[linear-gradient(to_right,#2A3B99_0%,#2A3B99_25%,#DD291A_75%,#DD291A_100%)] bg-clip-text text-transparent">
              {brand.name}
              {/* <span className="text-indigo-400">{brand.accent}</span> */}
            </span>
          </div>

          {/* Desktop Nav - Center */}
          <nav className="hidden md:flex items-center gap-1 bg-white/60 px-2 py-1.5 rounded-full border border-[var(--line)] backdrop-blur-md justify-self-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-[var(--ink-700)] hover:text-indigo-700 transition-colors rounded-full group hover:bg-indigo-100"
              >
                <span className="relative z-10">{link.name}</span>

                {/* Hover Effect Pill */}
                <motion.div
                  className="absolute inset-0 bg-white/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  layoutId="nav-pill"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              </a>
            ))}
          </nav>

          {/* Empty Right Column (reserved for future CTA/buttons) */}
          <div className="justify-self-end hidden md:block">
            {/* You can place CTA buttons here later */}
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[var(--porcelain-100)] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-medium text-[var(--ink-700)]">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-[var(--ink-900)] hover:pl-4 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-[var(--line)] my-4" />
              <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold">
                {mobilePrimaryCtaLabel}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
