import React from "react";
import { ChevronLeft, X } from "lucide-react";
import gsap from "gsap";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import {
  bcfCopy,
  type BcfLang,
  type FutureTopicId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF, BCF_GLASS_CARD } from "@/components/Sections/bcf/bcfTheme";
import { bcfFutureDetailBg } from "@/components/Sections/bcf/bcfAssets";
import educationImg from "@/assets/images/PrimeMinistir/education.webp";
import environmentImg from "@/assets/images/TouristicPlace/GaliAliBag/16.webp";
import crisesImg from "@/assets/images/PrimeMinistir/service.webp";
import rehabImg from "@/assets/images/PrimeMinistir/isis.webp";
import rightsImg from "@/assets/images/religions/coexistence/mustafa-barzani.webp";

const topicImages: Record<FutureTopicId, string> = {
  education: educationImg,
  environment: environmentImg,
  crises: crisesImg,
  rehabilitation: rehabImg,
  rights: rightsImg,
};

/**
 * Hotspot positions inside the interactive map stage (1080×~1100).
 * Tuned to the Figma “Future We Build” landscape layout.
 */
const HOTSPOTS: { id: FutureTopicId; left: number; top: number; labelSide: "left" | "right" | "bottom" }[] = [
  { id: "education", left: 760, top: 180, labelSide: "right" },
  { id: "environment", left: 250, top: 340, labelSide: "left" },
  { id: "crises", left: 700, top: 420, labelSide: "right" },
  { id: "rehabilitation", left: 210, top: 620, labelSide: "left" },
  { id: "rights", left: 480, top: 720, labelSide: "bottom" },
];

type BcfFutureDetailProps = {
  lang: BcfLang;
  onBack: () => void;
};

export default function BcfFutureDetail({ lang, onBack }: BcfFutureDetailProps) {
  const c = bcfCopy[lang];
  const [activeId, setActiveId] = React.useState<FutureTopicId | null>(null);
  const active = c.futureTopics.find((t) => t.id === activeId) ?? null;
  const mapRef = React.useRef<HTMLDivElement | null>(null);
  const modalRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    const root = mapRef.current;
    if (!root) return;
    const pins = root.querySelectorAll<HTMLElement>("[data-future-pin]");
    gsap.set(pins, { opacity: 0, scale: 0.6 });

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(pins, { opacity: 1, scale: 1 });
        return;
      }
      gsap.to(pins, {
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.15,
      });
    }, root);

    return () => ctx.revert();
  }, [lang]);

  React.useLayoutEffect(() => {
    const modal = modalRef.current;
    if (!modal || !active) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      gsap.set(modal, { opacity: 1, scale: 1 });
      return;
    }

    gsap.fromTo(
      modal,
      { opacity: 0, scale: 0.92, y: 24 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out" },
    );
  }, [active]);

  return (
    <BcfShell backgroundImage={bcfFutureDetailBg} overlayClassName="bg-black/45">
      <div className="relative flex min-h-[1920px] flex-col px-10 pb-16 pt-24">
        <button
          type="button"
          onClick={() => (active ? setActiveId(null) : onBack())}
          className="absolute right-10 top-10 z-40 grid h-14 w-14 place-items-center rounded-full bg-black/40 backdrop-blur-sm"
          aria-label={c.back}
        >
          <ChevronLeft className="h-7 w-7 text-white" />
        </button>

        {/* Title card */}
        <div
          className={`${BCF_GLASS_CARD} relative z-20 mx-auto w-full max-w-[920px] px-12 py-10 text-center`}
        >
          <h1 className="text-[64px] font-bold leading-tight">
            <span className="text-[#fbf4e4]">{c.futureHeadingWhite} </span>
            <span style={{ color: BCF.gold }}>{c.futureHeadingGold}</span>
            {c.futureHeadingRest ? (
              <span className="text-[#fbf4e4]"> {c.futureHeadingRest}</span>
            ) : null}
          </h1>
          <p className="mx-auto mt-6 max-w-[780px] text-[28px] leading-relaxed text-white/85">
            {c.futureSubtitle}
          </p>
        </div>

        {/* Hotspot map stage */}
        <div
          ref={mapRef}
          className="relative z-10 mx-auto mt-10 h-[1180px] w-full max-w-[1000px]"
        >
          {HOTSPOTS.map((pin) => {
            const topic = c.futureTopics.find((t) => t.id === pin.id);
            if (!topic) return null;
            const isActive = activeId === pin.id;

            return (
              <button
                key={pin.id}
                type="button"
                data-future-pin={pin.id}
                onClick={() => setActiveId(pin.id)}
                className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center opacity-0"
                style={{ left: pin.left, top: pin.top }}
                aria-label={topic.title}
              >
                <span className="relative grid h-[56px] w-[56px] place-items-center">
                  <span
                    className="absolute inset-0 animate-ping rounded-full opacity-40 motion-reduce:animate-none"
                    style={{ backgroundColor: BCF.gold }}
                  />
                  <span
                    className="absolute inset-[-6px] rounded-full border-2 border-white/80"
                    style={{
                      boxShadow: isActive
                        ? `0 0 24px ${BCF.gold}`
                        : `0 0 16px ${BCF.gold}99`,
                    }}
                  />
                  <span
                    className="relative h-7 w-7 rounded-full"
                    style={{
                      backgroundColor: BCF.goldBright,
                      boxShadow: `0 0 18px ${BCF.gold}`,
                    }}
                  />
                </span>

                <span
                  className={`mt-4 max-w-[280px] text-[28px] font-medium leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] ${
                    pin.labelSide === "left"
                      ? "self-end text-right"
                      : pin.labelSide === "right"
                        ? "self-start text-left"
                        : "text-center"
                  }`}
                >
                  {topic.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail modal */}
        {active ? (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/45 px-10">
            <div
              ref={modalRef}
              className={`${BCF_GLASS_CARD} relative w-full max-w-[860px] overflow-hidden p-12`}
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
            >
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="absolute right-8 top-8 grid h-14 w-14 place-items-center rounded-full border border-white/30 bg-black/40"
                aria-label={c.close}
              >
                <X className="h-7 w-7 text-white" />
              </button>

              <h2 className="pr-16 text-[64px] font-bold leading-none" style={{ color: BCF.gold }}>
                {active.title}
              </h2>

              <ul className="mt-12 flex flex-col gap-7">
                {active.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-5 text-[34px] leading-snug text-[#fdeed4]">
                    <span
                      className="mt-3 h-3.5 w-3.5 shrink-0 rounded-full"
                      style={{ backgroundColor: BCF.goldBright }}
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 overflow-hidden rounded-[28px] border border-white/15">
                <img
                  src={topicImages[active.id]}
                  alt=""
                  className="h-[360px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </BcfShell>
  );
}
