import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Floating code symbols
const floatingSymbols = ['{', '}', '<', '>', '=', ';', '/', '*', '+', '-', '!', '?'];

// Falling icons/images
const fallingImages = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",

  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
];

// Motivational quotes for continuous typing left side
const motivationalQuotes = [
  "Write code, ship fast, break nothing.",
  "Debugging is like being the detective in a crime movie where you are also the murderer.",
  "Code is poetry; every line tells a story.",
  "Eat, Sleep, Code, Repeat.",
  "Your code can change the world.",
];

// Typing text component with continuous loop
function TypingTextLoop({ lines, speed = 45, pause = 1500 }) {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const charIndexRef = useRef(0);

  useEffect(() => {
    if (charIndexRef.current < lines[index].length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + lines[index][charIndexRef.current]);
        charIndexRef.current += 1;
      }, speed);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        charIndexRef.current = 0;
        setDisplayedText("");
        setIndex((prev) => (prev + 1) % lines.length);
      }, pause);
      return () => clearTimeout(timer);
    }
  }, [displayedText, index, lines, speed, pause]);

  return (
    <h1 style={{
      fontFamily: "'Fira Code', monospace",
      fontSize: "2.8rem",
      color: "#eee",
      lineHeight: 1.3,
      whiteSpace: "pre-wrap",
      userSelect: "none",
      textShadow: "0 0 6px #19fccbbb",
      minHeight: "3.8rem",
      margin: 0,
    }}>
      {displayedText}
      <span style={{
        marginLeft: 5,
        color: "#19fccb",
        animation: "blink 1.2s steps(2, start) infinite",
        fontWeight: "bold"
      }}>|</span>
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </h1>
  );
}

export default function FixedSizeLandingAnimation() {
  const [fallIdx, setFallIdx] = useState(0);

  // Cycle falling images every 2500 ms
  useEffect(() => {
    const interval = setInterval(() => {
      setFallIdx((i) => (i + 1) % fallingImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Number of floating symbols
  const symbolCount = 25;

  return (
    <section
      style={{
        width: 900,        // fixed width
        height: 600,       // fixed height
        position: "relative",
        backgroundColor: "#0B1120",
        overflow: "hidden",
        borderRadius: 16,
        padding: 24,
        boxSizing: "border-box",
        display: "flex",
        gap: 36,
        color: "#eee",
        fontFamily: "'Fira Code', monospace",
        userSelect: "none",
      }}
    >
      {/* Background animations */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {/* Floating symbols */}
        {[...Array(symbolCount)].map((_, i) => (
          <motion.div
            key={"floatSym-" + i}
            className="font-mono"
            style={{
              position: "absolute",
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${12 + Math.random() * 16}px`,
              color: "rgba(75, 85, 99, 0.25)",
              userSelect: "none",
            }}
            animate={{
              y: [0, 20, 0],
              rotate: [0, 360],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          >
            {floatingSymbols[Math.floor(Math.random() * floatingSymbols.length)]}
          </motion.div>
        ))}

        {/* Falling images in background */}
        {fallingImages.map((src, idx) => {
          const delay = (idx * 1.2) % (fallingImages.length * 1.2);
          return (
            <motion.img
              key={"fallBgImg-" + idx}
              src={src}
              alt={`falling-bg-${idx}`}
              draggable={false}
              style={{
                position: "absolute",
                width: 80 + (idx % 3) * 20,
                left: `${(idx * 20 + 10)}%`,
                borderRadius: 12,
                filter: "drop-shadow(0 0 6px #0ff7)",
                userSelect: "none",
                zIndex: 0,
                pointerEvents: "none"
              }}
              initial={{ y: -150, opacity: 0.2, scale: 0.8 }}
              animate={{
                y: ["-150%", "110%"],
                opacity: [0.2, 1, 0.2],
                scale: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay,
              }}
            />
          );
        })}
      </div>

      {/* Left side text container (fixed size, prevents resizing container) */}
      <div
        style={{
          width: "55%",
          height: "100%",
          overflow: "hidden",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: 16,
        }}
      >
        <TypingTextLoop lines={motivationalQuotes} speed={45} pause={1800} />
      </div>

      {/* Right side falling single image animation */}
      <div
        style={{
          width: "40%",
          height: "100%",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={fallIdx}
            src={fallingImages[fallIdx]}
            alt={`falling-img-${fallIdx}`}
            style={{
              width: 240,
              height: 240,
              objectFit: "contain",
              borderRadius: 20,
              filter: "drop-shadow(0 0 12px #00ffe0cc)",
              background: "#112233",
              padding: 16,
              userSelect: "none",
              position: "absolute",
            }}
            initial={{ y: -300, opacity: 0, scale: 0.8, rotate: -15 }}
            animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
            exit={{ y: 300, opacity: 0, scale: 0.5, rotate: 30, transition: { duration: 0.8 } }}
            transition={{ duration: 1 }}
            draggable={false}
          />
        </AnimatePresence>
      </div>
    </section>
  );
}
