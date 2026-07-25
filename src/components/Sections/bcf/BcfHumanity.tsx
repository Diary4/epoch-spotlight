import React from "react";
import { ChevronLeft } from "lucide-react";
import TextType from "@/components/TextType";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { bcfIntroBg as humanityBg } from "@/components/Sections/bcf/bcfAssets";

type BcfHumanityProps = {
  lang: BcfLang;
  onBack: () => void;
};

export default function BcfHumanity({ lang, onBack }: BcfHumanityProps) {
  const c = bcfCopy[lang];
  const chapterTitle =
    c.journeyChapters.find((chapter) => chapter.id === "humanity")?.title ??
    c.journeyChapters[1].title;

  return (
    <BcfShell
      backgroundImage={humanityBg}
      overlayClassName="bg-gradient-to-r from-black/75 via-black/45 to-black/20"
    >
      <div className="relative flex min-h-[1920px] flex-col justify-center px-16 pb-40 pt-40">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-14 top-14 flex w-fit items-center gap-2 text-[24px] text-white/70"
        >
          <ChevronLeft className="h-7 w-7" />
          {c.back}
        </button>

        <p className="text-[24px] tracking-[0.18em] text-white/65">
          <span style={{ color: BCF.gold }}>02 </span>
          {chapterTitle}
        </p>

        <div className="mt-10 max-w-[900px]">
          <TextType
            as="h1"
            text={[c.humanity, c.dignity, c.hope]}
            typingSpeed={70}
            deletingSpeed={40}
            pauseDuration={1400}
            loop
            showCursor
            cursorCharacter="|"
            cursorClassName="text-[#e8c56a]"
            textColors={["#ffffff", "#ffffff", BCF.gold]}
            className="font-sans text-[86px] font-bold uppercase leading-[1.05] tracking-[0.02em]"
          />

          <div className="mt-16 max-w-[640px]">
            <span className="text-[64px] leading-none" style={{ color: BCF.gold }}>
              “
            </span>
            <p className="mt-2 font-serif text-[34px] font-light italic leading-relaxed text-white/95">
              {c.quote}
            </p>
            <p className="mt-5 text-[26px] font-medium" style={{ color: BCF.gold }}>
              {c.quoteAttr}
            </p>
          </div>
        </div>
      </div>
    </BcfShell>
  );
}
