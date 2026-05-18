import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  Globe2,
  Landmark,
  Church,
  UsersRound,
  HeartHandshake,
  Sparkles,
  ScrollText,
  Scale,
  Flag,
  Award,
} from "lucide-react";

import bg from "@/assets/images/religions/r-1.webp";
import bg2 from "@/assets/images/religions/r-8.webp";
import leadersImg from "@/assets/images/religions/r-6.webp";
import letterImg from "@/assets/mainImages/letter.webp";
import whoarekurdsImg from "@/assets/mainImages/whoarekurds.webp";
import buildingImg from "@/assets/mainImages/building.webp";
import sharedImg from "@/assets/mainImages/shared.webp";
import governmentImg from "@/assets/mainImages/government.webp";
import presidencyImg from "@/assets/mainImages/presidency-1.webp";

import ReligionsKurdistan from "@/components/Sections/religions/ReligionsKurdistan";
import Nationalities from "@/components/Sections/religions/Nationalities";
import StoriesOfCoexistencePage from "@/components/Sections/religions/Coexistence";
import SharedCelebrationsPage from "@/components/Sections/religions/SharedCeleberations";
import DiversityMapPage from "@/components/Sections/religions/RelisgionsSection/Diversities";
import HistoryPage from "@/components/Sections/religions/History";
import LeadersOfCoexistencePage from "@/components/Sections/religions/LeadersOfCoexistence";
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
import ClassicalCard from "@/components/Sections/religions/ClassicalCard";

type LangCode = "en" | "ku" | "ar";

type SectionCardId =
  | "introduction"
  | "history"
  | "leaders"
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
    title: string[];
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
    title: ["Religious", "&", "National", "Diversity", "in", "Kurdistan"],
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
        id: "leaders",
        title: "Leaders of Coexistence",
        image: leadersImg,
        icon: Award,
        color: "#52351a",
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
    openLabel: "Explore",
  },
  ku: {
    languageLabel: "کوردی",
    title: ["ئاینی", "و", "فرە", "نەتەوەیی", "لە", "کوردستان"],
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
        id: "leaders",
        title: "ڕابەرانی پێکەوەژیان",
        image: leadersImg,
        icon: Award,
        color: "#52351a",
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
    openLabel: "گەڕان",
  },
  ar: {
    languageLabel: "العربية",
    title: ["التنوع", "الديني", "والقومي", "في", "كوردستان"],
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
        id: "leaders",
        title: "قادة التعايش",
        image: leadersImg,
        icon: Award,
        color: "#52351a",
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
    openLabel: "استكشف",
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
  | "leaders"
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
    if (id === "leaders") return setSubPage("leaders");
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

  if (subPage === "leaders") {
    return (
      <LeadersOfCoexistencePage
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
          className="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#f6ead8]/72 via-[#f6ead8]/30 to-[#f4eadb]/95" />
        <button
          data-rd-animate="true"
          type="button"
          onClick={handleLanguageChange}
          className="absolute right-10 top-10 z-30 flex items-center gap-3 rounded-full border border-[#d7b77e] bg-white/80 px-5 py-3 font-serif text-sm font-semibold text-[#3f2b17] shadow-[0_10px_24px_rgba(75,45,12,0.12)] backdrop-blur-md"
        >
          <Globe2 className="h-5 w-5" />
          {content.languageLabel}
        </button>

        <div className="relative z-10 mx-auto min-h-screen w-full max-w-[1500px] px-10 pb-10 pt-24 lg:px-16 lg:pt-28">
          <div data-rd-animate="true" className="shrink-0">
            <div className="relative max-w-[min(100%,720px)] border-s-2 border-[#c9973e]/50 ps-7 sm:ps-10">
              <h1 className="font-serif text-[clamp(38px,5.2vw,76px)] font-black uppercase leading-[0.9] tracking-[-0.02em] text-[#332315]">
                {content.title.map((line, index) => (
                  <span key={`${line}-${index}`} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              <h2 className="mt-5 max-w-[640px] font-serif text-[clamp(13px,1.5vw,20px)] font-bold uppercase leading-snug tracking-[0.14em] text-[#b98222] sm:mt-6">
                {content.subtitle}
              </h2>
            </div>
          </div>

          <div
            data-rd-animate="true"
            className="mt-5 border-t border-[#c9973e]/30 pt-5 sm:mt-6 sm:pt-6"
          >
            <p className="max-w-[min(100%,560px)] font-sans text-[clamp(15px,1.35vw,19px)] font-normal leading-[1.65] text-[#332315]/90">
              {content.description}
            </p>
          </div>

          <section
            data-rd-animate="true"
            className="absolute inset-x-10 z-10 pb-10 lg:inset-x-16"
            style={{ top: "min(70vh, 1280px)" }}
          >
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {content.cards.map((card) => (
                <ClassicalCard
                  key={card.id}
                  title={card.title}
                  image={card.image}
                  ctaLabel={content.openLabel}
                  onClick={() => openSectionCard(card.id)}
                  ariaLabel={card.title}
                />
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
