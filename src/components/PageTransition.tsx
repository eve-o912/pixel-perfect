import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0,
        rotateY: -15,
        transformOrigin: "left center",
        transformPerspective: 2000,
      }}
      animate={{ 
        opacity: 1,
        rotateY: 0,
      }}
      exit={{ 
        opacity: 0,
        rotateY: 15,
        transformOrigin: "right center",
      }}
      transition={{
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
};
