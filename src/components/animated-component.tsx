"use client";
import { AnimatePresence, motion } from "framer-motion";

type AnimatedComponentProps = {
  animatedKey: React.Key;
  direction: 1 | -1;
  children: React.ReactNode;
};

const AnimatedComponent = ({ animatedKey, direction, children }: AnimatedComponentProps) => {
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={animatedKey}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "tween", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedComponent;
