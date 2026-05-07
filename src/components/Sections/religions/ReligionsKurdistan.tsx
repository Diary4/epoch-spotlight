import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  Globe2,
  MoonStar,
  Cross,
  Star,
  Waves,
  UsersRound,
} from "lucide-react";

import bg from "@/assets/images/religions/r-2.png";
import ChristianityPage from "@/components/Sections/religions/RelisgionsSection/Christianity";
import OtherFaithTraditionsPage from "@/components/Sections/religions/RelisgionsSection/OtherFaith";
import YazidismPage from "@/components/Sections/religions/RelisgionsSection/Yazidism";

const religions = [
  {
    title: "Sunni Islam",
    text: "The largest faith tradition, rooted in Sunni Islam and Islamic scholarship.",
    icon: MoonStar,
    color: "#2f6b3f",
  },
  {
    title: "Christianity",
    text: "Ancient Christian communities with deep historical roots across Kurdistan.",
    icon: Cross,
    color: "#c58b16",
  },
  {
    title: "Yazidism",
    text: "A distinct spiritual tradition centered on reverence, ethics, and devotion.",
    icon: Star,
    color: "#c58b16",
  },
  {
    title: "Yarsanism (Kaka'i)",
    text: "A mystical and humanistic path emphasizing truth, righteousness, and inner wisdom.",
    icon: Star,
    color: "#47704c",
  },
  {
    title: "Zoroastrianism",
    text: "An ancient faith of light and truth with a rich philosophical heritage.",
    icon: Star,
    color: "#c58b16",
  },
  {
    title: "Judaism",
    text: "A historic community with enduring contributions to Kurdish life.",
    icon: Star,
    color: "#2e668c",
  },
  {
    title: "Baha’i Faith",
    text: "A global faith that teaches unity, justice, and the oneness of humanity.",
    icon: Star,
    color: "#47704c",
  },
  {
    title: "Sabean-Mandaeanism",
    text: "An ancient baptismal tradition centered on spiritual purity and renewal.",
    icon: Waves,
    color: "#2e668c",
  },
];

function DecorativeLine({ color = "#c99a55" }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
      <span className="text-2xl" style={{ color }}>
        ✥
      </span>
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
    </div>
  );
}

type LangCode = "en" | "ku" | "ar";

type ReligionsKurdistanProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function ReligionsKurdistan({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: ReligionsKurdistanProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [subPage, setSubPage] = React.useState<
    null | "christianity" | "yazidism" | "otherFaith"
  >(null);
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-religion-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });
      gsap.set("[data-religion-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      const tl = gsap.timeline();
      tl.to("[data-religion-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        "[data-religion-animate='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.07,
          ease: "power2.out",
        },
        "-=0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (subPage === "christianity") {
    return <ChristianityPage onBack={() => setSubPage(null)} />;
  }

  if (subPage === "yazidism") {
    return <YazidismPage onBack={() => setSubPage(null)} />;
  }

  if (subPage === "otherFaith") {
    return <OtherFaithTraditionsPage onBack={() => setSubPage(null)} />;
  }

  return (
    <main
      dir={dir}
      className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-7 py-9 sm:px-10 lg:px-16"
      >
        <img
          data-religion-hero="true"
          src={bg}
          alt=""
          className="absolute left-0 top-0 h-[calc(50vh-160px)] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-[calc(50vh-160px)] z-[1] h-24 -translate-y-full blur-[2px]"
          style={{
            background:
              "linear-gradient(to top, rgba(251,241,223,0.95) 0%, rgba(251,241,223,0.62) 45%, rgba(251,241,223,0) 100%)",
          }}
        />

        {/* <div className="absolute inset-0 bg-gradient-to-b from-[#fbf1df]/15 via-[#fbf1df]/90 to-[#fbf1df]" />
        <div className="pointer-events-none absolute inset-4 rounded-[30px] border-2 border-[#d2a35a]/40" /> */}

        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft className="h-7 w-7" />
        </button>

        <button
          type="button"
          onClick={onLanguageChange}
          className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]"
        >
          <Globe2 className="h-5 w-5" />
          {languageLabel}
        </button>

        <div className="relative z-10 mx-auto max-w-[1120px]">
          <header
            data-religion-animate="true"
            className="mx-auto max-w-[820px] pt-24 text-center"
          >
            <div className="mx-auto mb-4 w-[420px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="font-serif text-[58px] font-semibold uppercase leading-[1.02] tracking-[0.08em] text-[#2f1f12] sm:text-[78px] lg:text-[92px]">
              Religions
              <br />
              of Kurdistan
            </h1>

            <p className="mt-5 font-serif text-[25px] font-semibold text-[#a46f22] sm:text-[31px]">
              Eight recognized faiths, one shared homeland.
            </p>

            <div className="mx-auto mt-8 w-[210px]">
              <DecorativeLine color="#c3923a" />
            </div>
          </header>

          <section
            data-religion-animate="true"
            className="mt-[calc(30vh-160px)] grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {religions.map((item) => {
              const Icon = item.icon;
              const isChristianity = item.title === "Christianity";
              const isYazidism = item.title === "Yazidism";
              const isOtherFaith = item.title === "Yarsanism (Kaka'i)";
              const subPageTarget = isChristianity
                ? ("christianity" as const)
                : isYazidism
                  ? ("yazidism" as const)
                  : isOtherFaith
                    ? ("otherFaith" as const)
                  : null;
              const isNavCard = subPageTarget !== null;

              return (
                <article
                  key={item.title}
                  role={isNavCard ? "button" : undefined}
                  tabIndex={isNavCard ? 0 : undefined}
                  onClick={isNavCard ? () => setSubPage(subPageTarget) : undefined}
                  onKeyDown={
                    isNavCard
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSubPage(subPageTarget);
                          }
                        }
                      : undefined
                  }
                  aria-label={
                    isChristianity
                      ? "Open Christianity page"
                      : isYazidism
                        ? "Open Yazidism page"
                        : isOtherFaith
                          ? "Open Other Faith page"
                        : undefined
                  }
                  className={`flex min-h-[360px] flex-col items-center rounded-[24px] border-2 border-[#d8b875]/55 bg-[#fff8e9]/88 px-6 py-8 text-center shadow-[0_12px_24px_rgba(75,45,12,0.13)] backdrop-blur-sm ${isNavCard ? "cursor-pointer outline-none transition hover:ring-2 hover:ring-[#d2a35a]/50 focus-visible:ring-2 focus-visible:ring-[#c3923a]" : ""}`}
                >
                  <Icon
                    className="mb-8 h-20 w-20"
                    strokeWidth={1.65}
                    style={{ color: item.color }}
                  />

                  <h3
                    className="min-h-[72px] font-serif text-[25px] font-semibold uppercase leading-tight"
                    style={{ color: item.color }}
                  >
                    {item.title}
                  </h3>

                  <div className="my-5 w-[150px]">
                    <DecorativeLine color="#d1a14f" />
                  </div>

                  <p className="text-[18px] font-semibold leading-relaxed text-[#3f3528]">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </section>

          <section
            data-religion-animate="true"
            className="mx-auto mt-10 flex max-w-[890px] items-center gap-7 rounded-[28px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-9 py-6 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full text-[#c58b16]">
              <UsersRound className="h-12 w-12" strokeWidth={1.8} />
            </div>

            <p className="flex-1 text-center font-serif text-[31px] font-semibold uppercase leading-tight text-[#3b2410]">
              One Land, Many Paths
              <br />
              <span className="text-[21px] normal-case font-semibold text-[#6a4a25]">
                Diverse in belief, united in coexistence.
              </span>
            </p>

            <Star className="h-16 w-16 shrink-0 text-[#c58b16]" strokeWidth={1.5} />
          </section>

          <div className="mx-auto mt-7 w-[580px] max-w-full">
            <DecorativeLine color="#c3923a" />
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
      </section>
    </main>
  );
}