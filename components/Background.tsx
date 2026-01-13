"use client";

import { motion } from "framer-motion";

export const Background = () => {
  return (
    <div className="animated-bg overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 150, 0],
          y: [0, 80, 0],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-primary/20 dark:bg-primary/10 blur-[150px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          x: [0, -150, 0],
          y: [0, -80, 0],
          rotate: [0, -45, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] rounded-full bg-secondary-cyan/20 dark:bg-secondary-cyan/10 blur-[150px]"
      />
      <motion.div
        animate={{
          opacity: [0.1, 0.4, 0.1],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] left-[30%] w-[40%] h-[40%] rounded-full bg-secondary-pink/10 dark:bg-secondary-pink/5 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [-50, 50, -50],
          y: [-50, 50, -50],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] rounded-full bg-accent-amber/10 dark:bg-accent-amber/5 blur-[100px]"
      />
    </div>
  );
};
