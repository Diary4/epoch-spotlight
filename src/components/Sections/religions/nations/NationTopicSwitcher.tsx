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
  const [activeId, setActiveId] = React.useState(topics[0]?.id ?? "");

  React.useEffect(() => {
    if (!topics.some((t) => t.id === activeId) && topics[0]) {
      setActiveId(topics[0].id);
    }
  }, [topics, activeId]);

  const activeTopic = topics.find((t) => t.id === activeId) ?? topics[0];
  const activeImage = activeTopic ? images[activeTopic.id] : undefined;

  React.useEffect(() => {
    if (!panelRef.current || !activeTopic) return;
    gsap.fromTo(
      panelRef.current,
      { autoAlpha: 0.35, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" },
    );
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
        <div className="flex flex-wrap justify-center gap-1">
          {topics.map((topic) => {
            const isActive = activeId === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setActiveId(topic.id)}
                className={`border-b-2 px-7 py-4 font-serif text-[22px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                  isActive
                    ? "border-[#b98222] text-[#2f1f12]"
                    : "border-transparent text-[#8a6a45] hover:text-[#3f2b17]"
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
            src={activeImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1f160e]/45 via-transparent to-transparent" />
        </div>

        <div className="flex flex-col justify-center px-10 py-12">
          <p className="font-serif text-[15px] font-semibold uppercase tracking-[0.22em] text-[#b98222]">
            {pageTitle}
          </p>
          <h2 className="mt-4 font-serif text-[48px] font-semibold uppercase leading-[1.05] tracking-[0.06em] text-[#2f1f12]">
            {activeTopic.title}
          </h2>
          <span className="mt-5 block h-[3px] w-16 bg-[#b9822d]" />
          <p className="mt-7 text-[24px] font-medium leading-relaxed text-[#5a4a3a]">
            {activeTopic.text}
          </p>
        </div>
      </div>
    </>
  );
}
