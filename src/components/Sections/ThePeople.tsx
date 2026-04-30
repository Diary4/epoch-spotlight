import React from "react";
import { ArrowLeft, ArrowRight, Grid2X2, Landmark, Sparkles, Sun } from "lucide-react";
import gsap from "gsap";
import mainImage from "@/assets/mainImages/thepeople.PNG?url"
import card2 from "@/assets/mainImages/card-2.PNG?url"
import card1 from "@/assets/mainImages/card-1.PNG?url"
import card3 from "@/assets/mainImages/card-3.PNG?url"
import bgMainImage from "@/assets/mainImages/main.PNG?url"

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

type ThePeoplePageProps = {
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

function CircleIcon({ Icon }) {
  return (
    <div className="absolute left-1/2 top-[172px] z-20 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full border-2 border-[#ead8b3] bg-white shadow-[0_8px_22px_rgba(84,54,16,0.18)] sm:top-[218px] sm:h-16 sm:w-16 lg:top-[260px] lg:h-20 lg:w-20">
      <Icon className="h-7 w-7 text-[#c7a04e] sm:h-8 sm:w-8 lg:h-9 lg:w-9" strokeWidth={1.6} />
    </div>
  );
}

export default function ThePeoplePage({ onSelectCard, onBack }: ThePeoplePageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-people-bg='true']", { autoAlpha: 0, scale: 1.08, y: 24 });
      gsap.set("[data-people-hero='true']", { autoAlpha: 0, y: 18 });
      gsap.set("[data-people-card='true']", { autoAlpha: 0, y: 42, rotateX: -10, transformOrigin: "center top" });

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
          "[data-people-card='true']",
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 1.15,
            stagger: 0.24,
          },
          "-=0.35",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="m-0 flex min-h-screen w-screen justify-center bg-[#f9f3e7] p-0 text-[#1e352d]">
      <section ref={sectionRef} className="relative flex min-h-screen w-[min(100vw,1400px)] flex-col overflow-hidden bg-[#fcf7ed] px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-4 top-4 z-30 grid h-12 w-12 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:left-8 sm:top-8 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          aria-label="Back to Discover"
        >
          <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:28px_28px]" />
        <img
          data-people-bg="true"
          src={bgMainImage}
          alt=""
          className="pointer-events-none absolute inset-x-0 top-[100px] h-auto w-full object-cover object-center opacity-22 [mask-image:radial-gradient(circle_at_50%_45%,black_0%,black_58%,transparent_88%)] sm:top-[190px] lg:top-[230px]"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[clamp(220px,30vh,420px)] bg-gradient-to-b from-[#fcf7ed] via-[#fcf7ed]/96 via-45% to-transparent" />
        <div className="absolute inset-x-0 top-[190px] h-[560px] bg-gradient-to-b from-transparent via-transparent to-[#fcf7ed]/78 sm:top-[240px] sm:h-[620px] lg:top-[280px] lg:h-[720px]" />

        {/* Hero */}
        <header className="relative z-10 text-center sm:pt-8 lg:pt-12">
          <h1 data-people-hero="true" className="font-serif text-[60px] font-semibold leading-none tracking-tight text-[#1d342d] sm:text-[88px] lg:text-[118px]">
            The People
          </h1>

          <div data-people-hero="true" className="mx-auto mt-5 flex max-w-[520px] items-center justify-center gap-4 text-[#c8a05a] sm:mt-6 sm:gap-6 lg:max-w-[620px]">
            <span className="h-0.5 flex-1 bg-[#d5b773]" />
            <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
            <span className="h-0.5 flex-1 bg-[#d5b773]" />
          </div>

          <p data-people-hero="true" className="mx-auto mt-6 max-w-[980px] text-[20px] leading-relaxed text-[#49524e] sm:mt-8 sm:text-[28px] lg:text-[34px]">
            Discover who the Kurds are and the values, identity,
            and resilience that shape their story.
          </p>
        </header>

        {/* Cards */}
        <div className="relative z-10 mt-auto grid grid-cols-1 gap-4 pb-4 pt-6 sm:grid-cols-2 sm:gap-5 sm:pb-6 sm:pt-8 lg:grid-cols-3 lg:gap-6 lg:pb-8 lg:pt-10">
          {cards.map((card) => {
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
                className="relative overflow-hidden rounded-[20px] border-2 border-[#e4c78f] bg-white text-left shadow-[0_10px_30px_rgba(84,54,16,0.14)] lg:rounded-[22px]"
              >
                {/* Fixed image container */}
                <div className="relative h-[200px] w-full overflow-hidden sm:h-[250px] lg:h-[350px]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 h-full w-full object-cover brightness-[0.94] contrast-110"
                    style={{
                      objectPosition: card.id === "resilience" ? "center 30%" : "center",
                    }}
                  />
                </div>
                <CircleIcon Icon={Icon} />
                <div className="min-h-[230px] px-5 pb-6 pt-14 text-center sm:min-h-[260px] sm:px-6 sm:pb-8 sm:pt-16 lg:min-h-[300px]">
                  <h3 className="whitespace-pre-line font-serif text-[24px] font-semibold leading-tight text-[#1f352d] sm:text-[28px] lg:text-[31px]">
                    {card.title}
                  </h3>

                  <div className="mx-auto my-5 flex max-w-[140px] items-center justify-center gap-3 text-[#c7a04e]">
                    <span className="h-0.5 flex-1 bg-[#d7bc81]" />
                    <span className="h-3 w-3 rotate-45 border border-[#c7a04e]" />
                    <span className="h-0.5 flex-1 bg-[#d7bc81]" />
                  </div>

                  <p className="text-[17px] leading-relaxed text-[#59625d] sm:text-[19px] lg:text-[22px]">
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