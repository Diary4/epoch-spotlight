import React from "react";
import { ArrowLeft, Globe2 } from "lucide-react";
import { detailBackIconClassName, detailBackIconSize } from "@/constants/backNavigation";
import WomenScaledCanvas from "@/components/Sections/women/WomenScaledCanvas";

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
import RightsPage, { type RightsCardId } from "@/components/Sections/religions/Rights";
import RightsKRG from "@/components/Sections/religions/RightsSection/RightsKRG";
import RightsParliament from "@/components/Sections/religions/RightsSection/RightsParliament";
import RightsLaws from "@/components/Sections/religions/RightsSection/RightsLaws";
import Rights2014 from "@/components/Sections/religions/RightsSection/Rights2014";
import RightsRefuge from "@/components/Sections/religions/RightsSection/RightsRefuge";
import RightsMedia from "@/components/Sections/religions/RightsSection/RightsMedia";
import {
  type ReligionsLangCode,
  type ReligionsPageContent,
  type SectionCardId,
} from "@/components/Sections/religions/religionsContent";

export type ReligionsSubPage =
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

type ReligionsSectionRouterProps = {
  subPage: ReligionsSubPage;
  lang: ReligionsLangCode;
  content: ReligionsPageContent;
  dir: "ltr" | "rtl";
  onBack: () => void;
  onLanguageChange: () => void;
  setSubPage: React.Dispatch<React.SetStateAction<ReligionsSubPage>>;
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

export default function ReligionsSectionRouter({
  subPage,
  lang,
  content,
  dir,
  onBack,
  onLanguageChange,
  setSubPage,
}: ReligionsSectionRouterProps) {
  const commonProps = {
    lang,
    languageLabel: content.languageLabel,
    onLanguageChange,
    onBack,
  };

  if (subPage === "religionsKurdistan") {
    const religionsKurdistanProps = {
      ...commonProps,
      onOpenDiversityMap: () => setSubPage("diversityMap"),
    } as const;

    return (
      <ReligionsKurdistan
        {...(religionsKurdistanProps as React.ComponentProps<typeof ReligionsKurdistan>)}
      />
    );
  }

  if (subPage === "nationalities") {
    return <Nationalities {...commonProps} />;
  }

  if (subPage === "coexistence") {
    return <StoriesOfCoexistencePage {...commonProps} />;
  }

  if (subPage === "sharedCelebrations") {
    return <SharedCelebrationsPage {...commonProps} />;
  }

  if (subPage === "diversityMap") {
    return <DiversityMapPage {...commonProps} />;
  }

  if (subPage === "history") {
    return <HistoryPage {...commonProps} />;
  }

  if (subPage === "leaders") {
    return <LeadersOfCoexistencePage {...commonProps} />;
  }

  if (subPage === "nations") {
    return <NationsPage {...commonProps} />;
  }

  if (subPage === "faiths") {
    return <FaithsPage {...commonProps} />;
  }

  if (subPage === "sharedLife") {
    return <OneSharedHomelandPage {...commonProps} />;
  }

  if (subPage === "introduction") {
    return <IntroductionPage {...commonProps} />;
  }

  if (subPage === "closing") {
    return <ClosingPage {...commonProps} />;
  }

  if (subPage === "rights") {
    return (
      <RightsPage
        {...commonProps}
        onOpenCard={(id) => setSubPage({ kind: "rightsDetail", cardId: id })}
      />
    );
  }

  if (subPage && typeof subPage === "object" && subPage.kind === "rightsDetail") {
    const rightsProps = {
      ...commonProps,
      onBack: () => setSubPage("rights"),
    };

    switch (subPage.cardId) {
      case "krg":
        return <RightsKRG {...rightsProps} />;
      case "parliament":
        return <RightsParliament {...rightsProps} />;
      case "laws":
        return <RightsLaws {...rightsProps} />;
      case "year2014":
        return <Rights2014 {...rightsProps} />;
      case "refuge":
        return <RightsRefuge {...rightsProps} />;
      case "media":
        return <RightsMedia {...rightsProps} />;
    }
  }

  if (subPage && typeof subPage === "object" && subPage.kind === "sectionDetail") {
    const card = content.cards.find((item) => item.id === subPage.cardId);

    if (card) {
      return (
        <WomenScaledCanvas dir={dir} bgClassName="bg-[#faf8f5]" fitDeps={[lang, card.id]}>
          <div
            lang={lang}
            className="relative flex min-h-full w-full flex-col bg-[#faf8f5] px-16 pb-16 text-[#302214]"
          >
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-x-0 top-0 h-[720px] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
            />
            <div className="absolute inset-x-0 top-0 h-[720px] bg-gradient-to-b from-[#faf8f5]/75 via-[#faf8f5]/45 to-[#faf8f5]" />

            <button
              type="button"
              onClick={onBack}
              className="absolute left-8 top-1/2 z-30 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-[#d7b77e] bg-white/80 text-[#3f2b17] shadow-[0_10px_24px_rgba(75,45,12,0.12)] backdrop-blur-md"
              aria-label={content.detailBack}
            >
              <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
            </button>

            <button
              type="button"
              onClick={onLanguageChange}
              className="absolute right-8 top-10 z-30 flex items-center gap-3 rounded-full border border-[#d7b77e] bg-white/80 px-5 py-3 font-serif text-sm font-light text-[#3f2b17] shadow-[0_10px_24px_rgba(75,45,12,0.12)] backdrop-blur-md"
            >
              <Globe2 className="h-5 w-5" />
              {content.languageLabel}
            </button>

            <div className="relative z-10 mx-auto flex min-h-[900px] flex-1 flex-col items-center justify-center text-center">
              <div className="w-[220px]">
                <DecorativeLine color="#bd8a3c" />
              </div>

              <h1 className="mt-6 font-serif text-[64px] font-light uppercase leading-[1.04] tracking-[0.05em] text-[#2e2116]">
                {card.title}
              </h1>

              <p className="mt-9 max-w-[650px] rounded-[24px] border border-[#d8bc7b] bg-white/60 px-7 py-6 font-serif text-[19px] italic leading-relaxed text-[#6a4a25] shadow-[0_18px_40px_rgba(75,45,12,0.14)] backdrop-blur-md">
                {content.detailComingSoon}
              </p>
            </div>
          </div>
        </WomenScaledCanvas>
      );
    }
  }

  return null;
}

export function openReligionsSection(
  id: SectionCardId,
  setSubPage: React.Dispatch<React.SetStateAction<ReligionsSubPage>>,
) {
  if (id === "introduction") return setSubPage("introduction");
  if (id === "history") return setSubPage("history");
  if (id === "leaders") return setSubPage("leaders");
  if (id === "nations") return setSubPage("nations");
  if (id === "faiths") return setSubPage("faiths");
  if (id === "sharedLife") return setSubPage("sharedLife");
  if (id === "closing") return setSubPage("closing");
  if (id === "rights") return setSubPage("rights");

  setSubPage({ kind: "sectionDetail", cardId: id });
}
