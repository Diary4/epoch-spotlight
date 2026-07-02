import { useEffect, useRef } from "react";

type PeopleDetailHeroVideoProps = {
  src: string;
  dir: "ltr" | "rtl";
  className?: string;
  /** Which side of the section the video is anchored to. */
  videoSide?: "left" | "right";
  /** Mirror the video in LTR instead of the default RTL mirroring. */
  mirrorOnLtr?: boolean;
};

export default function PeopleDetailHeroVideo({
  src,
  dir,
  className = "h-[min(100cqh,1400px)] w-full",
  videoSide = "right",
  mirrorOnLtr = false,
}: PeopleDetailHeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const tryPlay = () => {
      videoEl.play().catch(() => {
        // Ignore autoplay promise rejections from browser policies.
      });
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) tryPlay();
    };

    tryPlay();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const positionClass =
    videoSide === "left"
      ? "left-0 right-auto rtl:left-auto rtl:right-0"
      : "right-0 left-auto rtl:right-auto rtl:left-0";

  const objectPositionClass = videoSide === "left" ? "object-left" : "object-center";
  const shouldMirror = mirrorOnLtr ? dir === "ltr" : dir === "rtl";

  return (
    <div
      className={`people-detail-hero pointer-events-none absolute top-0 ${positionClass} ${className}`}
    >
      <div className={`absolute inset-0 overflow-hidden ${shouldMirror ? "-scale-x-100" : ""}`}>
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 h-full w-full object-cover ${objectPositionClass}`}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[clamp(2rem,10cqh,12rem)] bg-gradient-to-t from-[#fbf5eb] via-[#fbf5eb]/55 to-transparent"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-[10%] bottom-0 z-20 h-[2px] bg-gradient-to-r from-transparent via-[#d9b477] to-transparent opacity-90" />
      <div className="pointer-events-none absolute bottom-[-5px] left-1/2 z-20 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-2 border-[#d9b477] bg-[#fbf5eb]" />
    </div>
  );
}
