import { animate, useInView } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  /**
   * Ease-out tween instead of a spring — reads smoother on large impact
   * figures where a spring would chatter through every digit place.
   */
  smooth?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
}

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  smooth = false,
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes(".")) {
      const decimals = str.split(".")[1];
      if (parseInt(decimals, 10) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0;
      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0,
      };
      const formattedNumber = Intl.NumberFormat("en-US", options).format(latest);
      return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
    },
    [maxDecimals, separator],
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === "down" ? to : from);
    }
  }, [from, to, direction, formatValue]);

  useEffect(() => {
    if (!isInView || !startWhen) return;

    onStart?.();

    const start = direction === "down" ? to : from;
    const end = direction === "down" ? from : to;
    let controls: { stop: () => void } | undefined;
    const timeoutId = window.setTimeout(() => {
      controls = animate(start, end, {
        duration,
        // Soft expo-out — fast early digits, settles cleanly on the final figure.
        ease: smooth ? [0.16, 1, 0.3, 1] : [0.22, 1, 0.36, 1],
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = formatValue(latest);
          }
        },
        onComplete: () => {
          if (ref.current) {
            ref.current.textContent = formatValue(end);
          }
          onEnd?.();
        },
      });
    }, delay * 1000);

    return () => {
      window.clearTimeout(timeoutId);
      controls?.stop();
    };
  }, [
    isInView,
    startWhen,
    direction,
    from,
    to,
    delay,
    duration,
    smooth,
    formatValue,
    onStart,
    onEnd,
  ]);

  return <span className={className} ref={ref} />;
}
