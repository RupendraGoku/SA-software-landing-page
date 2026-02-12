// Centralized Motion Registry
export const transitions = {
  cinema: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  spring: { type: "spring", stiffness: 200, damping: 20 },
  slow: { duration: 1.2, ease: "easeInOut" }
};

export const variants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  },
  fadeUp: {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: transitions.cinema 
    }
  },
  revealLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: transitions.cinema }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: transitions.cinema }
  }
};