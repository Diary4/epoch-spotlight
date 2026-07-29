import { motion, useReducedMotion } from "motion/react";

type WovenMarkProps = {
  compact?: boolean;
  complete?: boolean;
};

const PATHS = [
  {
    d: "M300 72 C118 72 72 176 72 300 C72 424 170 528 300 528 C430 528 528 424 528 300 C528 176 482 72 300 72",
    color: "#b37a43",
  },
  {
    d: "M72 300 C72 118 176 72 300 72 C424 72 528 170 528 300 C528 430 424 528 300 528 C176 528 72 482 72 300",
    color: "#60796e",
  },
  {
    d: "M142 142 C270 14 382 62 458 142 C534 222 534 378 458 458 C382 538 218 538 142 458 C66 378 14 270 142 142",
    color: "#b64c41",
  },
  {
    d: "M458 142 C586 270 534 378 458 458 C382 538 218 538 142 458 C66 378 66 222 142 142 C218 62 330 14 458 142",
    color: "#52759a",
  },
];

export default function WovenMark({ compact = false, complete = false }: WovenMarkProps) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      className={`tok-woven-mark ${compact ? "tok-woven-mark--compact" : ""}`}
      viewBox="0 0 600 600"
    >
      <circle cx="300" cy="300" r="238" className="tok-woven-mark__orbit" />
      {PATHS.map((path, index) => (
        <motion.path
          key={path.color}
          d={path.d}
          fill="none"
          stroke={path.color}
          strokeLinecap="round"
          strokeWidth={complete ? 22 : 14}
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: complete ? 0.96 : 0.8 }}
          transition={{
            duration: reduceMotion ? 0 : 1.4,
            delay: reduceMotion ? 0 : index * 0.13,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
      <motion.circle
        cx="300"
        cy="300"
        r={complete ? 66 : 48}
        className="tok-woven-mark__core"
        animate={
          reduceMotion
            ? undefined
            : {
                r: complete ? [62, 70, 62] : [45, 52, 45],
                opacity: [0.72, 1, 0.72],
              }
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle
        cx="300"
        cy="300"
        r={complete ? 28 : 18}
        className="tok-woven-mark__seed"
      />
    </svg>
  );
}
