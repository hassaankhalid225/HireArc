"use client";
import { motion } from "framer-motion";

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <motion.div 
      className={`relative flex items-center justify-center cursor-pointer ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        initial="initial"
        animate="animate"
      >
        {/* Longitudinal Lines */}
        {[...Array(6)].map((_, i) => (
          <motion.ellipse
            key={`long-${i}`}
            cx="50"
            cy="50"
            rx={15 + i * 7}
            ry="48"
            stroke="var(--ink)"
            strokeOpacity="0.1"
            strokeWidth="0.5"
          />
        ))}
        
        {/* Latitudinal Lines */}
        {[...Array(6)].map((_, i) => (
          <motion.ellipse
            key={`lat-${i}`}
            cx="50"
            cy="50"
            rx="48"
            ry={15 + i * 7}
            stroke="var(--ink)"
            strokeOpacity="0.1"
            strokeWidth="0.5"
          />
        ))}

        {/* The Spherical Nodes (Dots) */}
        {[
          { x: 50, y: 5 }, { x: 50, y: 95 },
          { x: 5, y: 50 }, { x: 95, y: 50 },
          { x: 20, y: 20 }, { x: 80, y: 20 },
          { x: 20, y: 80 }, { x: 80, y: 80 },
          { x: 50, y: 50 },
          { x: 35, y: 35 }, { x: 65, y: 35 },
          { x: 35, y: 65 }, { x: 65, y: 65 },
        ].map((pt, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={pt.x}
            cy={pt.y}
            r="1.5"
            fill="var(--ink)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
        
        {/* Main Orbit Circle */}
        <circle cx="50" cy="50" r="48" stroke="var(--ink)" strokeWidth="1.2" />
      </motion.svg>
    </motion.div>
  );
}
