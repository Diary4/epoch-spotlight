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
import bg2 from "@/assets/images/religions/r-8.png";
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
import NationsPage from "@/components/Sections/religions/Nations";
import FaithsPage from "@/components/Sections/religions/Faiths";
import OneSharedHomelandPage from "@/components/Sections/religions/OneShared";
import IntroductionPage from "@/components/Sections/religions/Introduction";
import ClosingPage from "@/components/Sections/religions/Closing";
import RightsPage, {
  type RightsCardId,
} from "@/components/Sections/religions/Rights";
import RightsKRG from "@/components/Sections/religions/RightsSection/RightsKRG";
import RightsParliament from "@/components/Sections/religions/RightsSection/RightsParliament";
import RightsLaws from "@/components/Sections/religions/RightsSection/RightsLaws";
import Rights2014 from "@/components/Sections/religions/RightsSection/Rights2014";
import RightsRefuge from "@/components/Sections/religions/RightsSection/RightsRefuge";
import RightsMedia from "@/components/Sections/religions/RightsSection/RightsMedia";

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
    openLabel: string;
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
        title: "Introduction",
        image: letterImg,
        icon: Sparkles,
        color: "#7a4a12",
      },
      {
        id: "history",
        title: "History",
        image: presidencyImg,
        icon: ScrollText,
        color: "#3a2f12",
      },
      {
        id: "nations",
        title: "Nations",
        image: whoarekurdsImg,
        icon: UsersRound,
        color: "#16466b",
      },
      {
        id: "faiths",
        title: "Faiths",
        image: bg,
        icon: Church,
        color: "#244b1f",
      },
      {
        id: "sharedLife",
        title: "Shared Life",
        image: sharedImg,
        icon: HeartHandshake,
        color: "#cf921d",
      },
      {
        id: "rights",
        title: "Rights & Recognition",
        image: governmentImg,
        icon: Scale,
        color: "#52235f",
      },
      {
        id: "closing",
        title: "Closing",
        image: buildingImg,
        icon: Flag,
        color: "#6b1d1d",
      },
    ],
    detailComingSoon: "Detailed content for this section is coming soon.",
    detailBack: "Back to overview",
    openLabel: "Open",
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
        title: "پێشەکی",
        image: letterImg,
        icon: Sparkles,
        color: "#7a4a12",
      },
      {
        id: "history",
        title: "مێژوو",
        image: presidencyImg,
        icon: ScrollText,
        color: "#3a2f12",
      },
      {
        id: "nations",
        title: "نەتەوەکان",
        image: whoarekurdsImg,
        icon: UsersRound,
        color: "#16466b",
      },
      {
        id: "faiths",
        title: "ئاینەکان",
        image: bg,
        icon: Church,
        color: "#244b1f",
      },
      {
        id: "sharedLife",
        title: "ژیانی هاوبەش",
        image: sharedImg,
        icon: HeartHandshake,
        color: "#cf921d",
      },
      {
        id: "rights",
        title: "ماف و ناسینەوە",
        image: governmentImg,
        icon: Scale,
        color: "#52235f",
      },
      {
        id: "closing",
        title: "کۆتایی",
        image: buildingImg,
        icon: Flag,
        color: "#6b1d1d",
      },
    ],
    detailComingSoon: "ناوەڕۆکی ورد بۆ ئەم بەشە بەزووی دێت.",
    detailBack: "گەڕانەوە",
    openLabel: "بکەرەوە",
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
        title: "مقدمة",
        image: letterImg,
        icon: Sparkles,
        color: "#7a4a12",
      },
      {
        id: "history",
        title: "التاريخ",
        image: presidencyImg,
        icon: ScrollText,
        color: "#3a2f12",
      },
      {
        id: "nations",
        title: "القوميات",
        image: whoarekurdsImg,
        icon: UsersRound,
        color: "#16466b",
      },
      {
        id: "faiths",
        title: "الأديان",
        image: bg,
        icon: Church,
        color: "#244b1f",
      },
      {
        id: "sharedLife",
        title: "الحياة المشتركة",
        image: sharedImg,
        icon: HeartHandshake,
        color: "#cf921d",
      },
      {
        id: "rights",
        title: "الحقوق والاعتراف",
        image: governmentImg,
        icon: Scale,
        color: "#52235f",
      },
      {
        id: "closing",
        title: "الخاتمة",
        image: buildingImg,
        icon: Flag,
        color: "#6b1d1d",
      },
    ],
    detailComingSoon: "المحتوى التفصيلي لهذا القسم قادم قريباً.",
    detailBack: "العودة",
    openLabel: "اعرض",
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
  | "nations"
  | "faiths"
  | "sharedLife"
  | "introduction"
  | "closing"
  | "rights"
  | { kind: "rightsDetail"; cardId: RightsCardId }
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
    if (id === "introduction") return setSubPage("introduction");
    if (id === "history") return setSubPage("history");
    if (id === "nations") return setSubPage("nations");
    if (id === "faiths") return setSubPage("faiths");
    if (id === "sharedLife") return setSubPage("sharedLife");
    if (id === "closing") return setSubPage("closing");
    if (id === "rights") return setSubPage("rights");

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
        y: 26,
      });

      const tl = gsap.timeline();

      tl.to("[data-rd-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      }).to(
        "[data-rd-animate='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: "power2.out",
        },
        "-=0.45",
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
      <ReligionsKurdistan
        {...(religionsKurdistanProps as React.ComponentProps<any>)}
      />
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

  if (subPage === "nations") {
    return (
      <NationsPage
        lang={lang}
        languageLabel={content.languageLabel}
        onLanguageChange={handleLanguageChange}
        onBack={() => setSubPage(null)}
      />
    );
  }

  if (subPage === "faiths") {
    return (
      <FaithsPage
        lang={lang}
        languageLabel={content.languageLabel}
        onLanguageChange={handleLanguageChange}
        onBack={() => setSubPage(null)}
      />
    );
  }

  if (subPage === "sharedLife") {
    return (
      <OneSharedHomelandPage
        lang={lang}
        languageLabel={content.languageLabel}
        onLanguageChange={handleLanguageChange}
        onBack={() => setSubPage(null)}
      />
    );
  }

  if (subPage === "introduction") {
    return (
      <IntroductionPage
        lang={lang}
        languageLabel={content.languageLabel}
        onLanguageChange={handleLanguageChange}
        onBack={() => setSubPage(null)}
      />
    );
  }

  if (subPage === "closing") {
    return (
      <ClosingPage
        lang={lang}
        languageLabel={content.languageLabel}
        onLanguageChange={handleLanguageChange}
        onBack={() => setSubPage(null)}
      />
    );
  }

  if (subPage === "rights") {
    return (
      <RightsPage
        lang={lang}
        languageLabel={content.languageLabel}
        onLanguageChange={handleLanguageChange}
        onBack={() => setSubPage(null)}
        onOpenCard={(id) => setSubPage({ kind: "rightsDetail", cardId: id })}
      />
    );
  }

  if (
    subPage &&
    typeof subPage === "object" &&
    subPage.kind === "rightsDetail"
  ) {
    const commonProps = {
      lang,
      languageLabel: content.languageLabel,
      onLanguageChange: handleLanguageChange,
      onBack: () => setSubPage("rights"),
    };
    switch (subPage.cardId) {
      case "krg":
        return <RightsKRG {...commonProps} />;
      case "parliament":
        return <RightsParliament {...commonProps} />;
      case "laws":
        return <RightsLaws {...commonProps} />;
      case "year2014":
        return <Rights2014 {...commonProps} />;
      case "refuge":
        return <RightsRefuge {...commonProps} />;
      case "media":
        return <RightsMedia {...commonProps} />;
    }
  }

  if (
    subPage &&
    typeof subPage === "object" &&
    subPage.kind === "sectionDetail"
  ) {
    const card = content.cards.find((c) => c.id === subPage.cardId);

    if (card) {
      return (
        <main
          dir={dir}
          className="m-0 min-h-screen w-screen bg-[#f4eadb] p-0 text-[#302214]"
        >
          <section className="relative min-h-screen w-full overflow-hidden bg-[#f4eadb] px-8 py-10 sm:px-12 lg:px-20">
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 h-[62vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-[#f6ead8]/75 via-[#f6ead8]/45 to-[#f4eadb]" />
            <div className="pointer-events-none absolute inset-6 rounded-[34px] border border-[#c99a55]/45" />

            <button
              type="button"
              onClick={() => setSubPage(null)}
              className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border border-[#d7b77e] bg-white/80 text-[#3f2b17] shadow-[0_10px_24px_rgba(75,45,12,0.12)] backdrop-blur-md"
              aria-label={content.detailBack}
            >
              <ArrowLeft className="h-7 w-7" />
            </button>

            <button
              type="button"
              onClick={handleLanguageChange}
              className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d7b77e] bg-white/80 px-5 py-3 font-serif text-sm font-semibold text-[#3f2b17] shadow-[0_10px_24px_rgba(75,45,12,0.12)] backdrop-blur-md"
            >
              <Globe2 className="h-5 w-5" />
              {content.languageLabel}
            </button>

            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-[980px] flex-col items-center justify-center text-center">
              <div className="w-[220px]">
                <DecorativeLine color="#bd8a3c" />
              </div>

              <h1 className="mt-6 font-serif text-[52px] font-semibold uppercase leading-[1.04] tracking-[0.05em] text-[#2e2116] sm:text-[76px]">
                {card.title}
              </h1>

              <p className="mt-9 max-w-[650px] rounded-[24px] border border-[#d8bc7b] bg-white/60 px-7 py-6 font-serif text-[19px] italic leading-relaxed text-[#6a4a25] shadow-[0_18px_40px_rgba(75,45,12,0.14)] backdrop-blur-md">
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
      className="m-0 min-h-screen w-screen bg-[#f4eadb] p-0 text-[#302214]"
    >
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#f4eadb]"
      >
        <img
          data-rd-hero="true"
          src={bg2}
          alt=""
          className="absolute right-0 top-0 h-[50vh] w-[100%] opacity-95 [mask-image:linear-gradient(to_left,black_0%,black_70%,transparent_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-[53vh] w-full bg-gradient-to-t from-[#f4eadb] via-[#f4eadb]/0 to-transparent"
        />

        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(205,157,85,0.25),transparent_38%),linear-gradient(90deg,#f7efe3_0%,#f7efe3_47%,rgba(247,239,227,0.76)_70%,rgba(247,239,227,0.35)_100%)]" />
        <div className="pointer-events-none absolute inset-6 rounded-[34px] border border-[#c99a55]/45" /> */}

        <button
          data-rd-animate="true"
          type="button"
          onClick={handleLanguageChange}
          className="absolute right-10 top-10 z-30 flex items-center gap-3 rounded-full border border-[#d7b77e] bg-white/80 px-5 py-3 font-serif text-sm font-semibold text-[#3f2b17] shadow-[0_10px_24px_rgba(75,45,12,0.12)] backdrop-blur-md"
        >
          <Globe2 className="h-5 w-5" />
          {content.languageLabel}
        </button>

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-10 py-10 lg:px-16">
          <div className="grid flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div data-rd-animate="true" className="max-w-[760px]">
              <h1 className="font-serif text-[54px] font-semibold uppercase leading-[1.05] tracking-[0.035em] text-[#2e2116] sm:text-[72px] lg:text-[82px]">
                {content.title[0]}
                <br />
                {content.title[1]}
                <br />
                {content.title[2]}
              </h1>

              <h2 className="mt-6 font-serif text-[22px] font-semibold uppercase tracking-[0.08em] text-[#b47a24] sm:text-[28px]">
                {content.subtitle}
              </h2>

              <div className="mt-8 w-[340px] max-w-full">
                <DecorativeLine color="#bd8a3c" />
              </div>

              <p className="mt-8 max-w-[560px] text-[22px] font-medium leading-relaxed text-[#493726]">
                {content.description}
              </p>
            </div>
          </div>

          <section data-rd-animate="true" className="pb-10">
            <div className="grid w-full grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                    className="relative flex min-h-[420px] cursor-pointer flex-col overflow-hidden rounded-[28px] border-2 border-[#f3dfb5] bg-white/85 shadow-[0_18px_36px_rgba(69,43,14,0.22)] outline-none focus-visible:ring-2 focus-visible:ring-[#c3923a]"
                  >
                    <div className="relative h-[230px] w-full overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f05]/55 via-transparent to-transparent" />

                      <div className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-white/70 bg-white/20 text-white backdrop-blur-sm">
                        <Icon className="h-6 w-6" strokeWidth={1.7} />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col px-6 py-6">
                      <h3 className="font-serif text-[26px] font-semibold uppercase leading-tight text-[#3b2410]">
                        {card.title}
                      </h3>

                      <div className="mt-3 mb-3 w-[60px]">
                        <span className="block h-[2px] bg-[#c3923a]" />
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-5">
                        <span className="font-serif text-[12px] font-semibold uppercase tracking-[0.28em] text-[#a77423]">
                          {content.openLabel}
                        </span>
                        <div className="grid h-11 w-11 place-items-center rounded-full border border-[#d8bc7b] bg-[#fff4dc] text-[#8a5a12]">
                          <ChevronRight className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}