import React from "react";
import WomenScaledCanvas from "@/components/Sections/women/WomenScaledCanvas";
import ReligionsSectionRouter, {
  openReligionsSection,
  type ReligionsSubPage,
} from "@/components/Sections/religions/ReligionsSectionRouter";
import {
  religionsPageContent,
  type ReligionsLangCode,
  type SectionCardId,
} from "@/components/Sections/religions/religionsContent";
import ReligionsV2Attract from "@/components/Sections/religions/v2/ReligionsV2Attract";
import ReligionsV2Hub from "@/components/Sections/religions/v2/ReligionsV2Hub";
import ReligionsV2Closing from "@/components/Sections/religions/v2/ReligionsV2Closing";

type ReligionsView = "attract" | "hub" | "closing";

export default function ReligionsV2Page() {
  const [lang, setLang] = React.useState<ReligionsLangCode>("en");
  const [view, setView] = React.useState<ReligionsView>("attract");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [subPage, setSubPage] = React.useState<ReligionsSubPage>(null);

  const content = religionsPageContent[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  const handleLanguageChange = () => {
    setLang((prev) => (prev === "en" ? "ku" : prev === "ku" ? "ar" : "en"));
  };

  const openChapter = (index: number) => {
    const card = content.cards[index];
    if (!card) return;

    if (card.id === "closing") {
      setView("closing");
      return;
    }

    openReligionsSection(card.id as SectionCardId, setSubPage);
  };

  const handleSectionBack = () => {
    setSubPage(null);
    setView("hub");
  };

  if (subPage) {
    return (
      <ReligionsSectionRouter
        subPage={subPage}
        lang={lang}
        content={content}
        dir={dir}
        onBack={handleSectionBack}
        onLanguageChange={handleLanguageChange}
        setSubPage={setSubPage}
      />
    );
  }

  return (
    <WomenScaledCanvas dir={dir} bgClassName="bg-[#faf8f5]" fitDeps={[lang, view, activeIndex]}>
      <div lang={lang} className="relative flex min-h-full w-full flex-col bg-[#faf8f5] text-[#302214]">
        {view === "attract" ? (
          <ReligionsV2Attract
            content={content}
            languageLabel={content.languageLabel}
            onEnter={() => setView("hub")}
            onLanguageChange={handleLanguageChange}
          />
        ) : null}

        {view === "hub" ? (
          <ReligionsV2Hub
            content={content}
            cards={content.cards}
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
            onOpenChapter={openChapter}
            onBeginJourney={() => openChapter(0)}
          />
        ) : null}

        {view === "closing" ? (
          <ReligionsV2Closing
            content={content}
            cards={content.cards}
            onReturnToHub={() => setView("hub")}
            onOpenClosingChapter={() => openReligionsSection("closing", setSubPage)}
          />
        ) : null}

        {view !== "attract" ? (
          <nav
            aria-label="Experience controls"
            className="mt-auto flex shrink-0 items-center gap-3 border-t border-[#d7b77e]/30 bg-[#faf8f5]/96 px-10 py-4 backdrop-blur-md"
          >
            <button
              type="button"
              onClick={() => setView("attract")}
              className="rounded-full border border-[#d7b77e]/50 bg-white/80 px-6 py-2.5 font-serif text-[14px] text-[#6a4a25] transition active:scale-[0.98]"
            >
              {content.edgeHome}
            </button>
            <button
              type="button"
              onClick={() => setView("hub")}
              className="rounded-full border border-[#d7b77e]/50 bg-white/80 px-6 py-2.5 font-serif text-[14px] text-[#6a4a25] transition active:scale-[0.98]"
            >
              {content.edgeChapters}
            </button>
            <div className="flex-1" />
            <button
              type="button"
              onClick={handleLanguageChange}
              className="rounded-full border border-[#d7b77e] bg-white px-6 py-2.5 font-serif text-[14px] text-[#b98222] transition active:scale-[0.98]"
            >
              {content.languageLabel}
            </button>
          </nav>
        ) : null}
      </div>
    </WomenScaledCanvas>
  );
}
