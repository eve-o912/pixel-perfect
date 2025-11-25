import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, ReactNode } from "react";

interface CursorRevealProps {
  children: ReactNode;
}

export const CursorReveal = ({ children }: CursorRevealProps) => {
  const cursorX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const cursorY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background: `radial-gradient(600px circle at ${cursorXSpring}px ${cursorYSpring}px, rgba(190, 242, 255, 0.15), transparent 40%)`,
        }}
      />
      <motion.div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background: `radial-gradient(400px circle at ${cursorXSpring}px ${cursorYSpring}px, rgba(139, 92, 246, 0.1), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};
