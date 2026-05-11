import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  ChevronRight,
  Globe2,
  Landmark,
  Church,
  UsersRound,
  HeartHandshake,
  Sparkles,
  ScrollText,
  Scale,
  Flag,
} from "lucide-react";

import bg from "@/assets/images/religions/r-1.png";
import card1 from "@/assets/mainImages/2005.png";
import letterImg from "@/assets/mainImages/letter.png";
import whoarekurdsImg from "@/assets/mainImages/whoarekurds.png";
import buildingImg from "@/assets/mainImages/building.png";
import sharedImg from "@/assets/mainImages/shared.png";
import governmentImg from "@/assets/mainImages/government.png";
import presidencyImg from "@/assets/mainImages/presidency-1.png";
import ReligionsKurdistan from "@/components/Sections/religions/ReligionsKurdistan";
import Nationalities from "@/components/Sections/religions/Nationalities";
import StoriesOfCoexistencePage from "@/components/Sections/religions/Coexistence";
import SharedCelebrationsPage from "@/components/Sections/religions/SharedCeleberations";
import DiversityMapPage from "@/components/Sections/religions/RelisgionsSection/Diversities";
import HistoryPage from "@/components/Sections/religions/History";

type LangCode = "en" | "ku" | "ar";

type SectionCardId =
  | "introduction"
  | "history"
  | "nations"
  | "faiths"
  | "sharedLife"
  | "rights"
  | "closing";

type SectionCard = {
  id: SectionCardId;
  eyebrow: string;
  title: string;
  image: string;
  icon: typeof Church;
  color: string;
};

const pageContent: Record<
  LangCode,
  {
    languageLabel: string;
    title: [string, string, string];
    subtitle: string;
    description: string;
    cards: SectionCard[];
    detailComingSoon: string;
    detailBack: string;
  }
> = {
  en: {
    languageLabel: "ENGLISH",
    title: ["Religious &", "National Diversity", "in Kurdistan"],
    subtitle: "Kurdistan: The Cradle of Coexistence",
    description:
      "Across faiths, languages, and cultures, Kurdistan stands as a timeless home of respect, unity, and shared heritage.",
    cards: [
      {
        id: "introduction",
        eyebrow: "Section 1",
        title: "Introduction",
        image: letterImg,
        icon: Sparkles,
        color: "#7a4a12",
      },
      {
        id: "history",
        eyebrow: "Section 2",
        title: "History",
        image: presidencyImg,
        icon: ScrollText,
        color: "#3a2f12",
      },
      {
        id: "nations",
        eyebrow: "Section 3",
        title: "Nations",
        image: whoarekurdsImg,
        icon: UsersRound,
        color: "#16466b",
      },
      {
        id: "faiths",
        eyebrow: "Section 4",
        title: "Faiths",
        image: bg,
        icon: Church,
        color: "#244b1f",
      },
      {
        id: "sharedLife",
        eyebrow: "Section 5",
        title: "Shared Life",
        image: sharedImg,
        icon: HeartHandshake,
        color: "#cf921d",
      },
      {
        id: "rights",
        eyebrow: "Section 6",
        title: "Rights & Recognition",
        image: governmentImg,
        icon: Scale,
        color: "#52235f",
      },
      {
        id: "closing",
        eyebrow: "Section 7",
        title: "Closing",
        image: buildingImg,
        icon: Flag,
        color: "#6b1d1d",
      },
    ],
    detailComingSoon: "Detailed content for this section is coming soon.",
    detailBack: "Back to overview",
  },
  ku: {
    languageLabel: "کوردی",
    title: ["ئاینی و", "فرە نەتەوەیی", "لە کوردستان"],
    subtitle: "کوردستان: گهوارەی پێکەوەژیان",
    description:
      "لە نێوان ئاین و زمان و کلتوورە جیاوازەکاندا، کوردستان ماڵی ڕێز و یەکگرتوویی و میراتی هاوبەشە.",
    cards: [
      {
        id: "introduction",
        eyebrow: "بەشی ١",
        title: "پێشەکی",
        image: letterImg,
        icon: Sparkles,
        color: "#7a4a12",
      },
      {
        id: "history",
        eyebrow: "بەشی ٢",
        title: "مێژوو",
        image: presidencyImg,
        icon: ScrollText,
        color: "#3a2f12",
      },
      {
        id: "nations",
        eyebrow: "بەشی ٣",
        title: "نەتەوەکان",
        image: whoarekurdsImg,
        icon: UsersRound,
        color: "#16466b",
      },
      {
        id: "faiths",
        eyebrow: "بەشی ٤",
        title: "ئاینەکان",
        image: bg,
        icon: Church,
        color: "#244b1f",
      },
      {
        id: "sharedLife",
        eyebrow: "بەشی ٥",
        title: "ژیانی هاوبەش",
        image: sharedImg,
        icon: HeartHandshake,
        color: "#cf921d",
      },
      {
        id: "rights",
        eyebrow: "بەشی ٦",
        title: "ماف و ناسینەوە",
        image: governmentImg,
        icon: Scale,
        color: "#52235f",
      },
      {
        id: "closing",
        eyebrow: "بەشی ٧",
        title: "کۆتایی",
        image: buildingImg,
        icon: Flag,
        color: "#6b1d1d",
      },
    ],
    detailComingSoon: "ناوەڕۆکی ورد بۆ ئەم بەشە بەزووی دێت.",
    detailBack: "گەڕانەوە",
  },
  ar: {
    languageLabel: "العربية",
    title: ["التنوع الديني", "والقومي", "في كوردستان"],
    subtitle: "كوردستان: مهد التعايش",
    description:
      "عبر الأديان واللغات والثقافات، تظل كوردستان موطناً دائماً للاحترام والوحدة والتراث المشترك.",
    cards: [
      {
        id: "introduction",
        eyebrow: "القسم ١",
        title: "مقدمة",
        image: letterImg,
        icon: Sparkles,
        color: "#7a4a12",
      },
      {
        id: "history",
        eyebrow: "القسم ٢",
        title: "التاريخ",
        image: presidencyImg,
        icon: ScrollText,
        color: "#3a2f12",
      },
      {
        id: "nations",
        eyebrow: "القسم ٣",
        title: "القوميات",
        image: whoarekurdsImg,
        icon: UsersRound,
        color: "#16466b",
      },
      {
        id: "faiths",
        eyebrow: "القسم ٤",
        title: "الأديان",
        image: bg,
        icon: Church,
        color: "#244b1f",
      },
      {
        id: "sharedLife",
        eyebrow: "القسم ٥",
        title: "الحياة المشتركة",
        image: sharedImg,
        icon: HeartHandshake,
        color: "#cf921d",
      },
      {
        id: "rights",
        eyebrow: "القسم ٦",
        title: "الحقوق والاعتراف",
        image: governmentImg,
        icon: Scale,
        color: "#52235f",
      },
      {
        id: "closing",
        eyebrow: "القسم ٧",
        title: "الخاتمة",
        image: buildingImg,
        icon: Flag,
        color: "#6b1d1d",
      },
    ],
    detailComingSoon: "المحتوى التفصيلي لهذا القسم قادم قريباً.",
    detailBack: "العودة",
  },
};

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

type ReligiousDiversityPageProps = {
  onBack?: () => void;
};

type SubPage =
  | null
  | "religionsKurdistan"
  | "nationalities"
  | "coexistence"
  | "sharedCelebrations"
  | "diversityMap"
  | "history"
  | { kind: "sectionDetail"; cardId: SectionCardId };

export default function ReligiousDiversityPage({
  onBack,
}: ReligiousDiversityPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [lang, setLang] = React.useState<LangCode>("en");
  const [subPage, setSubPage] = React.useState<SubPage>(null);
  const content = pageContent[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  const handleLanguageChange = () => {
    setLang((prev) => (prev === "en" ? "ku" : prev === "ku" ? "ar" : "en"));
  };

  const openSectionCard = (id: SectionCardId) => {
    if (id === "history") {
      setSubPage("history");
      return;
    }
    setSubPage({ kind: "sectionDetail", cardId: id });
  };

  React.useEffect(() => {
    if (!sectionRef.current || subPage) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-rd-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });
      gsap.set("[data-rd-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      const tl = gsap.timeline();
      tl.to("[data-rd-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        "[data-rd-animate='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [subPage]);

  if (subPage === "religionsKurdistan") {
    const religionsKurdistanProps = {
      lang,
      languageLabel: content.languageLabel,
      onLanguageChange: handleLanguageChange,
      onOpenDiversityMap: () => setSubPage("diversityMap"),
      onBack: () => setSubPage(null),
    } as const;

    return (
      <ReligionsKurdistan {...(religionsKurdistanProps as React.ComponentProps<any>)} />
    );
  }

  if (subPage === "nationalities") {
    return (
      <Nationalities
        lang={lang}
        languageLabel={content.languageLabel}
        onLanguageChange={handleLanguageChange}
        onBack={() => setSubPage(null)}
      />
    );
  }

  if (subPage === "coexistence") {
    return (
      <StoriesOfCoexistencePage
        lang={lang}
        languageLabel={content.languageLabel}
        onLanguageChange={handleLanguageChange}
        onBack={() => setSubPage(null)}
      />
    );
  }

  if (subPage === "sharedCelebrations") {
    return (
      <SharedCelebrationsPage
        lang={lang}
        languageLabel={content.languageLabel}
        onLanguageChange={handleLanguageChange}
        onBack={() => setSubPage(null)}
      />
    );
  }

  if (subPage === "diversityMap") {
    return (
      <DiversityMapPage
        lang={lang}
        languageLabel={content.languageLabel}
        onLanguageChange={handleLanguageChange}
        onBack={() => setSubPage(null)}
      />
    );
  }

  if (subPage === "history") {
    return (
      <HistoryPage
        lang={lang}
        languageLabel={content.languageLabel}
        onLanguageChange={handleLanguageChange}
        onBack={() => setSubPage(null)}
      />
    );
  }

  if (subPage && typeof subPage === "object" && subPage.kind === "sectionDetail") {
    const card = content.cards.find((c) => c.id === subPage.cardId);
    if (card) {
      return (
        <main
          dir={dir}
          className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]"
        >
          <section className="relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-8 py-10 sm:px-12 lg:px-20">
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 h-[55vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbf1df]/70 via-[#fbf1df]/40 to-[#f4dfbb]/95" />
            <div className="pointer-events-none absolute inset-5 rounded-[30px] border-2 border-[#d2a35a]/45" />

            <button
              type="button"
              onClick={() => setSubPage(null)}
              className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/80 text-[#5a3a18] shadow-sm"
              aria-label={content.detailBack}
            >
              <ArrowLeft className="h-7 w-7" />
            </button>

            <button
              type="button"
              onClick={handleLanguageChange}
              className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]"
            >
              <Globe2 className="h-5 w-5" />
              {content.languageLabel}
            </button>

            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-[980px] flex-col items-center pt-28 text-center">
              <span className="font-serif text-[14px] font-semibold uppercase tracking-[0.32em] text-[#a77423]">
                {card.eyebrow}
              </span>
              <div className="mt-3 w-[200px]">
                <DecorativeLine color="#c3923a" />
              </div>
              <h1 className="mt-5 font-serif text-[44px] font-semibold uppercase leading-[1.05] tracking-[0.04em] text-[#3b2410] sm:text-[64px]">
                {card.title}
              </h1>
              <div className="mt-8 w-[260px]">
                <DecorativeLine color="#c3923a" />
              </div>
              <p className="mt-8 max-w-[640px] rounded-2xl border border-[#d8bc7b] bg-white/65 px-6 py-5 font-serif text-[17px] italic text-[#6a4a25] shadow-[0_10px_24px_rgba(75,45,12,0.12)]">
                {content.detailComingSoon}
              </p>
            </div>
          </section>
        </main>
      );
    }
  }

  return (
    <main
      dir={dir}
      className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-8 py-10 sm:px-12 lg:px-20"
      >
        <img
          data-rd-hero="true"
          src={bg}
          alt=""
          className="absolute inset-0 h-[calc(90vh-160px)] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]"
        />

        <div className="absolute inset-x-0 top-0 h-[calc(90vh-160px)] bg-gradient-to-b from-[#fbf1df]/78 via-[#fbf1df]/20 to-[#f4dfbb]/92" />
        <div className="pointer-events-none absolute inset-5 rounded-[30px] border-2 border-[#d2a35a]/45" />

        <button
          data-rd-animate="true"
          type="button"
          onClick={handleLanguageChange}
          className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]"
        >
          <Globe2 className="h-5 w-5" />
          {content.languageLabel}
        </button>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-[1180px] flex-col">
          <header
            data-rd-animate="true"
            className="mx-auto max-w-[850px] pt-12 text-center"
          >
            <div className="mx-auto mb-2 w-[420px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="font-serif text-[56px] font-semibold uppercase leading-[1.04] tracking-[0.06em] text-[#3b2410] sm:text-[76px] lg:text-[88px]">
              {content.title[0]}
              <br />
              {content.title[1]}
              <br />
              {content.title[2]}
            </h1>

            <h2 className="mt-5 font-serif text-[24px] font-semibold uppercase tracking-[0.08em] text-[#b27a22] sm:text-[30px]">
              {content.subtitle}
            </h2>

            <div className="mx-auto mt-4 w-[190px]">
              <DecorativeLine color="#c3923a" />
            </div>

            <p className="mx-auto mt-5 max-w-[610px] text-[21px] font-semibold leading-relaxed text-[#4d3c2a] sm:text-[26px]">
              {content.description}
            </p>
          </header>

          <div className="flex-1" />

          <section
            data-rd-animate="true"
            className="mx-auto grid w-full max-w-[1180px] grid-cols-2 gap-4 pb-7 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7"
          >
            {content.cards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => openSectionCard(card.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openSectionCard(card.id);
                    }
                  }}
                  aria-label={card.title}
                  className="group relative min-h-[230px] cursor-pointer overflow-hidden rounded-[22px] border-2 border-[#f3dfb5] shadow-[0_18px_35px_rgba(69,43,14,0.24)] outline-none transition hover:-translate-y-1 hover:ring-2 hover:ring-[#d2a35a]/55 focus-visible:ring-2 focus-visible:ring-[#c3923a]"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, rgba(30,20,10,0.05), ${card.color}ee 72%, ${card.color})`,
                    }}
                  />

                  <div className="relative z-10 flex h-full flex-col justify-end px-4 py-5 text-white">
                    <div className="mb-3 grid h-11 w-11 place-items-center rounded-full border-2 border-[#e4c47e] bg-white/12 backdrop-blur-sm">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>

                    <span className="font-serif text-[10px] font-semibold uppercase tracking-[0.28em] text-white/80">
                      {card.eyebrow}
                    </span>

                    <h3 className="mt-1 font-serif text-[18px] font-semibold uppercase leading-tight">
                      {card.title}
                    </h3>

                    <div className="mt-3 flex items-center justify-end">
                      <div className="grid h-9 w-9 place-items-center rounded-full border border-[#d8bc7b] bg-white/10 backdrop-blur-sm transition group-hover:bg-white/25">
                        <ChevronRight className="h-5 w-5" aria-hidden />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-[#b9893d]/25 to-transparent" />
        <Landmark className="pointer-events-none absolute bottom-8 left-1/2 h-14 w-14 -translate-x-1/2 text-[#c3923a]/70" />
      </section>
    </main>
  );
}
