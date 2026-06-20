import React from "react";
import { ArrowLeft, Grid2X2, Landmark, Sparkles, Sun } from "lucide-react";
import gsap from "gsap";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";
import card1 from "@/assets/images/new/discoverKurdistan/thePeople/card-1.webp?url"
import card2 from "@/assets/mainImages/card-2.webp"
import card3 from "@/assets/images/new/discoverKurdistan/thePeople/card-3.webp?url"
import peopleVideo2 from "@/assets/videos/dws.mp4"

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
    <div className="absolute left-1/2 top-[62px] z-20 h-14 w-14 -translate-x-1/2 overflow-hidden rounded-full border-2 border-white bg-white shadow-[0_4px_12px_rgba(84,54,16,0.12)] min-[700px]:top-[168px] min-[700px]:h-16 min-[700px]:w-16 min-[700px]:shadow-[0_10px_30px_rgba(84,54,16,0.18)] lg:top-[252px] lg:h-24 lg:w-24">
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
    <main className="m-0 flex min-h-screen w-full max-w-full justify-center overflow-x-hidden bg-[#f9f3e7] p-0 text-[#1e352d] lg:h-screen lg:overflow-hidden">
      <section
        ref={sectionRef}
        className="relative flex min-h-screen w-[min(100vw,1400px)] flex-col overflow-y-auto overflow-x-hidden bg-[#fcf7ed] px-3 pb-6 pt-4 xs:px-10 xs:py-10 lg:overflow-hidden lg:px-14 lg:py-12"
      >
        <button
          type="button"
          onClick={onBack}
          className="absolute left-3 top-3 z-30 grid h-9 w-9 place-items-center rounded-full border border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm xs:left-6 xs:top-6 xs:h-10 xs:w-10 xs:border-2 lg:h-11 lg:w-11"
          aria-label="Back to Discover"
        >
          <ArrowLeft className="h-4 w-4 xs:h-5 xs:w-5" />
        </button>

        {/* Hero Header */}
        <header className="relative z-20 shrink-0 text-center pt-14 xs:pt-8 lg:pt-12">
          <h1
            data-people-hero="true"
            className="font-serif text-[32px] font-light leading-none tracking-tight text-[#1d342d] xs:text-[72px] md:text-[96px] lg:text-[132px] xl:text-[150px] 3xl:text-[170px] 4xl:text-[190px] kiosk-portrait:text-[130px]"
          >
            {people?.title ?? "The People"}
          </h1>

          <div
            data-people-hero="true"
            className="mx-auto mt-2 flex max-w-[160px] items-center justify-center gap-2 text-[#c8a05a] xs:mt-6 xs:max-w-[520px] xs:gap-6 lg:max-w-[620px]"
          >
            <span data-top-divider-part="true" data-top-divider-line="true" className="h-0.5 flex-1 bg-[#d5b773]" />
            <Sparkles data-top-divider-diamond="true" className="h-4 w-4 xs:h-7 xs:w-7 lg:h-8 lg:w-8" />
            <span data-top-divider-part="true" data-top-divider-line="true" className="h-0.5 flex-1 bg-[#d5b773]" />
          </div>

          <p
            data-people-hero="true"
            className="mx-auto mt-3 max-w-[980px] px-1 text-[11px] font-light leading-relaxed text-[#49524e] xs:text-[22px] md:text-[30px] lg:mt-6 lg:max-w-[1100px] lg:text-[40px] xl:max-w-[1200px] xl:text-[48px] 3xl:max-w-[1400px] 3xl:text-[56px] 4xl:text-[64px] kiosk-portrait:max-w-[920px] kiosk-portrait:text-[42px]"
          >
            {people?.subtitle ??
              "Discover who the Kurds are and the values, identity, and resilience that shape their story."}
          </p>
        </header>

        {/* Video below title and description */}
        <video
          ref={peopleVideoRef}
          data-people-bg="true"
          src={peopleVideo2}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="pointer-events-none relative z-0 mt-4 h-[34vh] w-full border-y border-white/60 object-cover object-center opacity-22 [mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_78%,transparent_100%)] xs:absolute xs:inset-x-0 xs:top-[calc(18vh-140px)] xs:mt-[250px] xs:h-[calc(65vh-140px)] lg:mt-0"
        />

        <div className="relative z-10 mt-4 grid grid-cols-3 gap-1.5 pb-4 pt-4 xs:mt-auto min-[700px]:gap-5 lg:gap-6 lg:pb-8 lg:pt-10">
          {localizedCards.map((card) => {
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
                className="relative flex h-full flex-col overflow-hidden rounded-[12px] border border-[#e4c78f] bg-white text-left shadow-[0_4px_12px_rgba(84,54,16,0.1)] min-[700px]:rounded-[20px] min-[700px]:border-2 min-[700px]:shadow-[0_10px_30px_rgba(84,54,16,0.14)] lg:rounded-[22px]"
              >
                <div className="relative h-[90px] w-full flex-none overflow-hidden border-b border-white/75 min-[700px]:h-[200px] lg:h-[300px]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute -inset-px h-[calc(100%+2px)] w-[calc(100%+2px)] object-cover brightness-[0.94] contrast-110"
                    style={{ objectPosition: "center" }}
                  />
                </div>

                <CircleImage image={card.image} />
                <div className="mt-[20px] lg:mt-[50px]  flex min-h-[100px] flex-1 flex-col px-1 pb-2 pt-6 text-center min-[700px]:min-h-[220px] min-[700px]:px-6 min-[700px]:pb-8 min-[700px]:pt-12 lg:min-h-[300px]">
                  <h3 className="whitespace-pre-line font-serif text-[9px] font-light leading-tight text-[#1f352d] xs:text-[12px] min-[700px]:text-[22px] lg:text-[36px] xl:text-[44px] 3xl:text-[52px] 4xl:text-[60px] kiosk-portrait:text-[3vw]">
                    {card.title}
                  </h3>

                  <div className="mx-auto my-1.5 flex max-w-[50px] items-center justify-center gap-1 text-[#c7a04e] xs:my-5 xs:max-w-[140px] xs:gap-2">
                    <span data-card-divider-part="true" data-card-divider-line="true" className="h-0.5 flex-1 bg-[#d7bc81]" />
                    <span data-card-divider-part="true" data-card-divider-diamond="true" className="h-1.5 w-1.5 rotate-45 border border-[#c7a04e] xs:h-2.5 xs:w-2.5" />
                    <span data-card-divider-part="true" data-card-divider-line="true" className="h-0.5 flex-1 bg-[#d7bc81]" />
                  </div>

                  <p className="text-[8px] font-light leading-relaxed text-[#59625d] xs:text-[10px] min-[700px]:text-[15px] lg:text-[24px] xl:text-[28px] 3xl:text-[34px] 4xl:text-[40px] kiosk-portrait:text-[1.85vw]">
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