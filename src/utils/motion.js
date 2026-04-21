// Centralized Motion Registry
export const transitions = {
  cinema: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  spring: { type: "spring", stiffness: 200, damping: 20 },
  slow: { duration: 1.2, ease: "easeInOut" }
};

export const variants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 }
    }
  },
  fadeUp: {
    hidden: { opacity: 0, y: 28 },
    visible: { 
      opacity: 1, 
      y: 0, 
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
