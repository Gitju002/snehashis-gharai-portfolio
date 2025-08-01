import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { opacity, slideUp } from "@/animations/preloader-anim";

const words = [
  "Hello",
  "নমস্কার",
  "नमस्ते",
  "Ciao",
  "Olà",
  "やあ",
  "Hola",
  "你好",
  "안녕하세요",
  "Bonjour",
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index == words.length - 1) return;
    setTimeout(
      () => {
        setIndex(index + 1);
      },
      index == 0 ? 1000 : 200
    );
  }, [index]);

  // Complex wave pattern with multiple curves
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  }  L0 0`;

  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 6} ${dimension.height} 0 ${dimension.height}  L0 0`;

  // Morphing geometric shapes
  const circleToSquare = {
    initial: {
      d: `M${dimension.width / 2 - 50} ${dimension.height / 2} 
          A50 50 0 1 1 ${dimension.width / 2 + 50} ${dimension.height / 2} 
          A50 50 0 1 1 ${dimension.width / 2 - 50} ${dimension.height / 2}`,
    },
    exit: {
      d: `M${dimension.width / 2 - 50} ${dimension.height / 2 - 50} 
          L${dimension.width / 2 + 50} ${dimension.height / 2 - 50} 
          L${dimension.width / 2 + 50} ${dimension.height / 2 + 50} 
          L${dimension.width / 2 - 50} ${dimension.height / 2 + 50} Z`,
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1] as const,
        delay: 0.5,
      },
    },
  };

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      d: targetPath,
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1] as const,
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className={"introduction"}
    >
      {dimension.width > 0 && (
        <>
          <motion.p variants={opacity} initial="initial" animate="enter">
            <span></span>
            {words[index]}
          </motion.p>
          <svg className="absolute inset-0 w-full h-full">
            {/* Main animated curve */}
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              fill="#000000"
            />

            {/* Decorative elements */}
            <defs>
              <linearGradient
                id="textGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="50%" stopColor="#4ecdc4" />
                <stop offset="100%" stopColor="#45b7d1" />
              </linearGradient>

              <radialGradient id="circleGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffeaa7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#fd79a8" stopOpacity="0.3" />
              </radialGradient>

              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Morphing shape */}
            {dimension.width > 0 && (
              <motion.path
                variants={circleToSquare}
                initial="initial"
                animate="exit"
                fill="url(#circleGradient)"
                filter="url(#glow)"
              />
            )}

            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
              <motion.circle
                key={i}
                cx={dimension.width * (0.2 + i * 0.1)}
                cy={dimension.height * 0.3}
                r="3"
                fill="url(#textGradient)"
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [-20, -60, -100],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            ))}

            {/* Geometric patterns */}
            <motion.g
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 0.3, rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <polygon
                points={`${dimension.width * 0.1},${dimension.height * 0.2} ${
                  dimension.width * 0.15
                },${dimension.height * 0.15} ${dimension.width * 0.2},${
                  dimension.height * 0.2
                } ${dimension.width * 0.15},${dimension.height * 0.25}`}
                fill="none"
                stroke="#74b9ff"
                strokeWidth="2"
              />
            </motion.g>

            {/* Dynamic lines */}
            <motion.path
              d={`M0 ${dimension.height * 0.7} Q${dimension.width * 0.25} ${
                dimension.height * 0.6
              } ${dimension.width * 0.5} ${dimension.height * 0.7} T${
                dimension.width
              } ${dimension.height * 0.7}`}
              fill="none"
              stroke="url(#textGradient)"
              strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 2, delay: 0.5 }}
            />

            {/* Spiral */}
            <motion.path
              d={`M${dimension.width * 0.85} ${dimension.height * 0.15} 
                  Q${dimension.width * 0.9} ${dimension.height * 0.1} ${
                dimension.width * 0.95
              } ${dimension.height * 0.15}
                  Q${dimension.width * 0.9} ${dimension.height * 0.2} ${
                dimension.width * 0.85
              } ${dimension.height * 0.15}
                  Q${dimension.width * 0.88} ${dimension.height * 0.12} ${
                dimension.width * 0.92
              } ${dimension.height * 0.15}`}
              fill="none"
              stroke="#fd79a8"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            />
          </svg>
        </>
      )}
    </motion.div>
  );
}
