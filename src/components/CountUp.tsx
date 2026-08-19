import { animate, useInView } from "motion/react";
import { useCallback, useEffect, useMemo, useRef } from "react";

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
  /** Remap the formatted figure (e.g. Western → Arabic-Indic digits). */
  formatDigits?: (value: string) => string;
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
  formatDigits,
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

  /**
   * Built once per counter, not once per frame.
   *
   * `Intl.NumberFormat` is one of the most expensive constructors the platform
   * has — it resolves a locale and builds a formatter each time — and this used
   * to run inside `onUpdate`, so every counter on a screen was constructing one
   * sixty times a second for the whole two seconds it counted. On the kiosk's
   * CPU that lands as main-thread work on exactly the frames the rest of the
   * scene is trying to animate in. The formatter itself is immutable and
   * `.format()` on an existing one is cheap.
   */
  const numberFormat = useMemo(() => {
    const hasDecimals = maxDecimals > 0;
    return Intl.NumberFormat("en-US", {
      useGrouping: !!separator,
      minimumFractionDigits: hasDecimals ? maxDecimals : 0,
      maximumFractionDigits: hasDecimals ? maxDecimals : 0,
    });
  }, [maxDecimals, separator]);

  const formatValue = useCallback(
    (latest: number) => {
      const formattedNumber = numberFormat.format(latest);
      const withSep = separator
        ? formattedNumber.replace(/,/g, separator)
        : formattedNumber;
      return formatDigits ? formatDigits(withSep) : withSep;
    },
    [numberFormat, separator, formatDigits],
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
