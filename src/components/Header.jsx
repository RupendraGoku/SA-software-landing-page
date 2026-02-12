import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { headerContent as defaultContent } from "../content/headerContent";

export default function Header({ content = defaultContent }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Scroll Interpolation for the "Glass" effect
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
["rgba(0,0,0,0)", "rgba(157,79,255,0.4)"]
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  );

  const borderColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]
  );
  const { brand, navLinks, loginLabel, primaryCtaLabel, mobilePrimaryCtaLabel } = content;

  return (
    <>
      <motion.header
        style={{ backgroundColor, backdropFilter: backdropBlur, borderBottomColor: borderColor }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent"
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          {/* Logo */}
<div className="flex items-center gap-2 cursor-pointer z-50">
  
  <img
    src="/src/asset/sa_logo.png"
    alt="SA Softech Logo"
    className="w-8 h-8 object-contain"
  />

  <span className="text-xl font-bold tracking-tight text-white">
    {brand.name}
    <span className="text-indigo-400">{brand.accent}</span>
  </span>

</div>


          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 px-2 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors rounded-full group hover:bg-[#7B5AFF]"
              >
                <span className="relative z-10">{link.name}</span>
                {/* Hover Effect Pill */}
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  layoutId="nav-pill"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex text-sm font-medium text-zinc-400 hover:text-white transition-colors hover:cursor-pointer">{loginLabel}</button>
            <button className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-zinc-200 transition-colors group">
              {primaryCtaLabel}
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2 text-zinc-400 hover:text-white"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
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
            className="fixed inset-0 z-40 bg-zinc-950 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-medium text-zinc-400">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="hover:text-white hover:pl-4 transition-all" onClick={() => setMobileMenuOpen(false)}>
                  {link.name}
                </a>
              ))}
              <hr className="border-zinc-800 my-4" />
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
