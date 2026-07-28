import React from "react";
import gsap from "gsap";

export type NationTopic = {
  id: string;
  title: string;
  text: string;
};

type NationTopicSwitcherProps = {
  pageTitle: string;
  topics: NationTopic[];
  images: Record<string, string>;
  animateAttr: string;
  ariaLabel: string;
  /** Reset / re-animate when language changes */
  langKey?: string;
};

export function NationTopicSwitcher({
  pageTitle,
  topics,
  images,
  animateAttr,
  ariaLabel,
  langKey,
}: NationTopicSwitcherProps) {
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const textRef = React.useRef<HTMLDivElement | null>(null);
  const skipPanelMotion = React.useRef(true);
  const prevLangKey = React.useRef(langKey);
  const [activeId, setActiveId] = React.useState(topics[0]?.id ?? "");

  React.useEffect(() => {
    if (!topics.some((t) => t.id === activeId) && topics[0]) {
      setActiveId(topics[0].id);
    }
  }, [topics, activeId]);

  const activeTopic = topics.find((t) => t.id === activeId) ?? topics[0];
  const activeImage = activeTopic ? images[activeTopic.id] : undefined;

  // Topic switches only — skip mount / language change (page timeline owns those).
  React.useEffect(() => {
    if (!panelRef.current || !activeTopic) return;
    if (skipPanelMotion.current) {
      skipPanelMotion.current = false;
      prevLangKey.current = langKey;
      return;
    }
    if (prevLangKey.current !== langKey) {
      prevLangKey.current = langKey;
      return;
    }
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ease = "power2.out";
    // Crossfade the new imagery in with a soft settle, and float the copy up
    // separately so the card change reads as one smooth transition.
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { autoAlpha: 0.25, scale: 1.06 },
        { autoAlpha: 1, scale: 1, duration: 0.95, ease, overwrite: "auto" },
      );
    }
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { autoAlpha: 0.15, y: 18 },
        { autoAlpha: 1, y: 0, duration: 1.3, ease, overwrite: "auto" },
      );
    }
  }, [activeId, langKey, activeTopic]);

  if (!activeTopic) return null;

  const animateProps = { [animateAttr]: "true" };

  return (
    <>
      <nav
        {...animateProps}
        className="mb-8 flex justify-center border-b border-[#d7b77e]/45"
        aria-label={ariaLabel}
      >
        <div className="flex flex-nowrap items-center justify-center gap-0">
          {topics.map((topic) => {
            const isActive = activeId === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setActiveId(topic.id)}
                className={`whitespace-nowrap border-b-2 px-4 py-4 font-serif text-[18px] font-light uppercase tracking-[0.03em] transition-[color,border-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97] ${
                  isActive
                    ? "border-[#b98222] text-[#2f1f12]"
                    : "border-transparent text-[#8a6a45] "
                }`}
              >
                {topic.title}
              </button>
            );
          })}
        </div>
      </nav>

      <div
        ref={panelRef}
        {...animateProps}
        className="grid grid-cols-[1.05fr_0.95fr] gap-8 overflow-hidden rounded-[28px] border border-[#d7b77e]/55 bg-[#fff9ef]/92 shadow-[0_16px_36px_rgba(75,45,12,0.1)]"
      >
        <div className="relative min-h-[480px] overflow-hidden">
          <img
            key={activeTopic.id}
            ref={imageRef}
            src={activeImage}
            alt=""
            decoding="async"
            className="absolute inset-0 h-full w-full transform-gpu object-cover will-change-[transform,opacity]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1f160e]/45 via-transparent to-transparent" />
        </div>

        <div ref={textRef} className="flex flex-col justify-center px-10 py-12">
          <p className="font-serif text-[14px] font-light uppercase tracking-[0.22em] text-[#b98222]">
            {pageTitle}
          </p>
          <h2 className="mt-4 font-serif text-[40px] font-light uppercase leading-[1.05] tracking-[0.06em] text-[#2f1f12]">
            {activeTopic.title}
          </h2>
          <span className="mt-5 block h-[3px] w-16 bg-[#b9822d]" />
          <p className="mt-7 text-[20px] font-light leading-relaxed text-[#5a4a3a]">
            {activeTopic.text}
          </p>
        </div>
      </div>
    </>
  );
}
