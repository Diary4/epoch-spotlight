import React from "react";
import { Hand } from "lucide-react";
import TextType from "@/components/TextType";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { bcfIntroBg as introBg } from "@/components/Sections/bcf/bcfAssets";

type BcfIntroProps = {
  lang: BcfLang;
  onContinue: () => void;
};

export default function BcfIntro({ lang, onContinue }: BcfIntroProps) {
  const c = bcfCopy[lang];
  const [showGuide, setShowGuide] = React.useState(true);

  const handleContinue = () => {
    if (showGuide) {
      setShowGuide(false);
      return;
    }
    onContinue();
  };

  return (
    <BcfShell
      backgroundImage={introBg}
      overlayClassName="bg-gradient-to-r from-[#04090c] via-[#04090c]/55 to-transparent"
    >
      <button
        type="button"
        className="absolute inset-0 z-20 cursor-pointer border-0 bg-transparent p-0"
        onClick={handleContinue}
        aria-label={c.touchToContinue}
      />

      <div className="relative z-10 flex min-h-[1920px] flex-col px-16 pb-40 pt-32">
        <div className="max-w-[920px]">
          <TextType
            as="h1"
            text={[c.humanity, c.dignity, c.hope]}
            typingSpeed={70}
            deletingSpeed={40}
            pauseDuration={1400}
            loop
            showCursor
            cursorCharacter="|"
            cursorClassName="text-[#fbc158]"
            textColors={["#fdeed4", "#fdeed4", BCF.gold]}
            className="font-sans text-[124px] font-bold uppercase leading-[1.02] tracking-[0.01em]"
          />

          <div className="mt-24 max-w-[640px]">
            <span className="block text-[64px] leading-none text-[#fbc158]">“</span>
            <p className="mt-4 text-[36px] font-medium italic leading-snug text-[#fbf4e4]">
              {c.quote}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span className="h-0.5 w-6 rounded-full" style={{ backgroundColor: BCF.goldDeep }} />
              <p className="text-[42px] font-medium" style={{ color: BCF.goldDeep }}>
                {c.quoteAttr.replace(/^—\s*/, "")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showGuide ? (
        <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/65">
          <Hand className="h-20 w-20 text-white" strokeWidth={1.4} />
          <p className="mt-6 text-[32px] tracking-wide text-white">{c.touchToContinue}</p>
        </div>
      ) : null}
    </BcfShell>
  );
}
