import React from "react";
import { ArrowLeft, ArrowRight, Grid2X2, Landmark, Sparkles, Sun } from "lucide-react";
import gsap from "gsap";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";
import card2 from "@/assets/mainImages/card-2.webp?url"
import card1 from "@/assets/mainImages/card-1.webp?url"
import card3 from "@/assets/mainImages/card-3.webp?url"
import peopleVideo2 from "@/assets/videos/thepeople.MP4?url"

const cards: {
  id: ThePeopleCardId;
  title: string;
  description: string;
  image: string;
  icon: typeof Landmark;
}[] = [
  {
    id: "whoAreTheKurds",
    title: "Who Are\nthe Kurds?",
    description:
      "An ancient people of the Middle East known for courage, hospitality, and cultural richness.",
    image:
      card1,
    icon: Landmark,
  },
  {
    id: "sharedIdentity",
    title: "A Shared\nIdentity",
    description:
      "A people connected by language, history, tradition, and collective memory.",
    image:
      card2,
    icon: Grid2X2,
  },
  {
    id: "resilience",
    title: "A Story of\nResilience",
    description:
      "A history shaped by endurance, dignity, and hope.",
    image:
      card3,
    icon: Sun,
  },
];

type ThePeopleCardId = "whoAreTheKurds" | "sharedIdentity" | "resilience";
type LangCode = "ku" | "en" | "ar";

type ThePeoplePageProps = {
  lang?: LangCode;
  onSelectCard?: (cardId: ThePeopleCardId) => void;
  onBack?: () => void;
};

function GoldButton({ children, active = false }) {
  return (
    <button
      className={`flex min-w-[280px] items-center justify-center gap-5 rounded-[20px] border-2 px-8 py-7 text-[30px] font-medium shadow-md transition ${
        active
          ? "border-[#d4af63] bg-gradient-to-b from-[#ecd7a2] to-[#d4af63] text-[#2c342f]"
          : "border-[#d9b976] bg-[#fbf7ef] text-[#24362f]"
      }`}
    >
      {children}
    </button>
  );
}

function CircleImage({ image }) {
  return (
    <div className="absolute left-1/2 top-[148px] z-20 h-[72px] w-[72px] -translate-x-1/2 rounded-full border-4 border-white bg-white shadow-[0_10px_30px_rgba(84,54,16,0.18)] sm:top-[218px] sm:h-24 sm:w-24 lg:top-[305px] lg:h-28 lg:w-28 overflow-hidden">
      <img
        src={image}
        alt=""
        className="h-full w-full object-cover"
      />
    </div>
  );
}

const CONTENT = { en, ar, ku } as const;

export default function ThePeoplePage({ lang = "en", onSelectCard, onBack }: ThePeoplePageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const peopleVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const data = CONTENT[lang] as any;
  const people = data?.people ?? {};
  const items = people?.items ?? [];
  const localizedCards = cards.map((card) => {
    const source =
      card.id === "whoAreTheKurds"
        ? items.find((item: any) => item?.id === "who")
        : card.id === "sharedIdentity"
          ? items.find((item: any) => item?.id === "identity")
          : items.find((item: any) => item?.id === "resilience");

    return {
      ...card,
      title: (source?.title ?? card.title).replace(" ", "\n"),
      description: source?.description ?? card.description,
    };
  });

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-people-bg='true']", { autoAlpha: 0, scale: 1.08, y: 24 });
      gsap.set("[data-people-hero='true']", { autoAlpha: 0, y: 18 });
      gsap.set("[data-people-card='true']", { autoAlpha: 0, y: 42, rotateX: -10, transformOrigin: "center top" });
      gsap.set("[data-top-divider-part='true']", { scaleX: 0, autoAlpha: 0, transformOrigin: "center center" });
      gsap.set("[data-card-divider-part='true']", { scaleX: 0, autoAlpha: 0, transformOrigin: "center center" });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to("[data-people-bg='true']", {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 1.8,
      })
        .to(
          "[data-people-hero='true']",
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.18,
          },
          "-=0.75",
        )
        .to(
          "[data-top-divider-part='true']",
          {
            autoAlpha: 1,
            scaleX: 1,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.8",
        )
        .to(
          "[data-people-card='true']",
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 1.15,
            stagger: 0.24,
          },
          "-=0.35",
        )
        .to(
          "[data-card-divider-part='true']",
          {
            autoAlpha: 1,
            scaleX: 1,
            duration: 0.55,
            stagger: 0.05,
          },
          "-=0.6",
        );

      gsap.to("[data-top-divider-line='true']", {
        opacity: 0.58,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.14,
      });

      gsap.to("[data-top-divider-diamond='true']", {
        rotation: 45 + 10,
        scale: 1.08,
        duration: 1.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("[data-card-divider-line='true']", {
        opacity: 0.62,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.08,
      });

      gsap.to("[data-card-divider-diamond='true']", {
        rotation: 45 + 8,
        scale: 1.07,
        duration: 1.9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  React.useEffect(() => {
    const videoEl = peopleVideoRef.current;
    if (!videoEl) return;

    const tryPlay = () => {
      videoEl.play().catch(() => {
        // Ignore autoplay promise rejections from browser policies.
      });
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        tryPlay();
      }
    };

    tryPlay();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <main className="m-0 flex min-h-screen w-screen justify-center bg-[#f9f3e7] p-0 text-[#1e352d]">
      <section ref={sectionRef} className="relative flex min-h-screen w-[min(100vw,1400px)] flex-col overflow-hidden bg-[#fcf7ed] px-4 py-6 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-4 top-4 z-30 grid h-12 w-12 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:left-8 sm:top-8 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          aria-label="Back to Discover"
        >
          <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>
        <video
          ref={peopleVideoRef}
          data-people-bg="true"
          src={peopleVideo2}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="pointer-events-none absolute inset-x-0 top-[72px] h-[min(62vh,920px)] w-full border-y border-white/60 object-cover object-center opacity-22 [mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_78%,transparent_100%)] sm:top-[calc(18vh-160px)] sm:h-[calc(70vh-160px)]"
        />
       
        {/* Hero */}
        <header className="relative z-10 text-center pt-2 sm:pt-8 lg:pt-12">
          <h1 data-people-hero="true" className="font-serif font-light text-[clamp(38px,12vw,60px)] leading-none tracking-tight text-[#1d342d] sm:text-[88px] lg:text-[118px]">
            {people?.title ?? "The People"}
          </h1>

          <div data-people-hero="true" className="mx-auto mt-4 flex max-w-[520px] items-center justify-center gap-3 text-[#c8a05a] sm:mt-6 sm:gap-6 lg:max-w-[620px]">
            <span data-top-divider-part="true" data-top-divider-line="true" className="h-0.5 flex-1 bg-[#d5b773]" />
            <Sparkles data-top-divider-diamond="true" className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
            <span data-top-divider-part="true" data-top-divider-line="true" className="h-0.5 flex-1 bg-[#d5b773]" />
          </div>

          <p data-people-hero="true" className="font-light mx-auto mt-5 max-w-[980px] px-1 text-[clamp(16px,4.2vw,20px)] leading-relaxed text-[#49524e] sm:mt-8 sm:px-0 sm:text-[28px] lg:text-[34px]">
            {people?.subtitle ?? "Discover who the Kurds are and the values, identity, and resilience that shape their story."}
          </p>
        </header>

        {/* Cards */}
        <div className="relative z-10 mt-auto grid grid-cols-1 gap-3 pb-4 pt-4 sm:grid-cols-2 sm:gap-5 sm:pb-6 sm:pt-8 lg:grid-cols-3 lg:gap-6 lg:pb-8 lg:pt-10">
          {localizedCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                data-people-card="true"
                type="button"
                key={card.title}
                onClick={() => {
                  if (card.id === "whoAreTheKurds") {
                    onSelectCard?.("whoAreTheKurds");
                  } else if (card.id === "sharedIdentity") {
                    onSelectCard?.("sharedIdentity");
                  } else if (card.id === "resilience") {
                    onSelectCard?.("resilience");
                  }
                }}
                className="relative flex h-full flex-col overflow-hidden rounded-[20px] border-2 border-[#e4c78f] bg-white text-left shadow-[0_10px_30px_rgba(84,54,16,0.14)] lg:rounded-[22px]"
              >
                <div className="relative h-[180px] w-full flex-none overflow-hidden border-b border-white/75 sm:h-[250px] lg:h-[350px]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute -inset-px h-[calc(100%+2px)] w-[calc(100%+2px)] object-cover brightness-[0.94] contrast-110"
                    style={{ objectPosition: "center" }}
                  />
                </div>

                <CircleImage image={card.image} />
                <div className="flex min-h-[200px] mt-[10px] flex-1 flex-col px-4 pb-5 pt-12 text-center sm:min-h-[260px] sm:px-6 sm:pb-8 sm:pt-16 lg:min-h-[300px]">
                  <h3 className="font-serif font-light text-[clamp(20px,5vw,24px)] leading-tight text-[#1f352d] sm:text-[28px] lg:text-[31px]">
                    {card.title}
                  </h3>

                  <div className="mx-auto my-5 flex max-w-[140px] items-center justify-center gap-3 text-[#c7a04e]">
                    <span data-card-divider-part="true" data-card-divider-line="true" className="h-0.5 flex-1 bg-[#d7bc81]" />
                    <span data-card-divider-part="true" data-card-divider-diamond="true" className="h-3 w-3 rotate-45 border border-[#c7a04e]" />
                    <span data-card-divider-part="true" data-card-divider-line="true" className="h-0.5 flex-1 bg-[#d7bc81]" />
                  </div>

                  <p className="text-[clamp(15px,3.8vw,17px)] font-light leading-relaxed text-[#59625d] sm:text-[19px] lg:text-[22px]">
                    {card.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
