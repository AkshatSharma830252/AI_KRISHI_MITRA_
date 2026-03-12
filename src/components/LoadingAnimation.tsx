import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => setPhase(4), 2600),
      setTimeout(() => onComplete(), 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{ background: "linear-gradient(180deg, hsl(120 5% 3%) 0%, hsl(120 8% 8%) 60%, hsl(25 30% 12%) 100%)" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Stars / particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
            }}
            animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}

        {/* Soil/ground */}
        <motion.div
          className="absolute bottom-0 w-full"
          style={{ height: "30%", background: "linear-gradient(0deg, hsl(25 40% 10%) 0%, hsl(25 30% 12%) 60%, transparent 100%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative flex flex-col items-center" style={{ marginTop: "10vh" }}>
          {/* Seed */}
          <motion.div
            className="relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={phase >= 0 ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <div className="w-8 h-6 rounded-full bg-earth relative" style={{ background: "linear-gradient(135deg, hsl(25 60% 30%), hsl(25 50% 20%))" }}>
              {phase >= 1 && (
                <motion.div
                  className="absolute -top-1 left-1/2 w-0.5 bg-primary rounded-full origin-bottom"
                  initial={{ height: 0, x: "-50%" }}
                  animate={{ height: 20 }}
                  transition={{ duration: 0.8 }}
                />
              )}
            </div>
          </motion.div>

          {/* Stem */}
          {phase >= 2 && (
            <motion.div
              className="absolute bottom-6 left-1/2 w-1 bg-primary rounded-full origin-bottom"
              style={{ x: "-50%", background: "linear-gradient(0deg, hsl(142 50% 30%), hsl(142 60% 45%))" }}
              initial={{ height: 0 }}
              animate={{ height: 120 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          )}

          {/* Left leaf */}
          {phase >= 3 && (
            <motion.div
              className="absolute left-1/2"
              style={{ bottom: 80, marginLeft: -4 }}
              initial={{ scale: 0, rotate: 45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none" style={{ transform: "scaleX(-1)" }}>
                <path d="M40 12C40 12 30 0 10 2C10 2 20 8 20 12C20 16 10 22 10 22C30 24 40 12 40 12Z" fill="hsl(142, 60%, 35%)" />
                <path d="M40 12C30 12 20 12 10 12" stroke="hsl(142, 40%, 25%)" strokeWidth="0.5" />
              </svg>
            </motion.div>
          )}

          {/* Right leaf */}
          {phase >= 3 && (
            <motion.div
              className="absolute left-1/2"
              style={{ bottom: 100, marginLeft: -36 }}
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
            >
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M0 12C0 12 10 0 30 2C30 2 20 8 20 12C20 16 30 22 30 22C10 24 0 12 0 12Z" fill="hsl(142, 55%, 40%)" />
                <path d="M0 12C10 12 20 12 30 12" stroke="hsl(142, 40%, 30%)" strokeWidth="0.5" />
              </svg>
            </motion.div>
          )}

          {/* Top leaves */}
          {phase >= 4 && (
            <>
              <motion.div
                className="absolute left-1/2"
                style={{ bottom: 120, marginLeft: -20 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
                  <path d="M15 20C15 20 0 15 2 5C2 5 10 8 15 0C20 8 28 5 28 5C30 15 15 20 15 20Z" fill="hsl(142, 65%, 42%)" />
                </svg>
              </motion.div>

              {/* Glow particles */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={`p-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: 4,
                    height: 4,
                    background: "hsl(43, 90%, 55%)",
                    bottom: 100 + Math.random() * 40,
                    left: `calc(50% + ${(Math.random() - 0.5) * 60}px)`,
                  }}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 0.8, 0], y: -60, scale: [1, 0.3] }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                />
              ))}
            </>
          )}
        </div>

        {/* Loading text */}
        <motion.div
          className="absolute bottom-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.p
            className="text-lg font-medium text-primary tracking-wider"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            KrishiMitra
          </motion.p>
          <motion.p
            className="text-sm text-muted-foreground mt-1"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            Growing Intelligence for Farmers
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingAnimation;
