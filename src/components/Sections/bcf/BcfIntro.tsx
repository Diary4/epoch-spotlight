import React from "react";
import { Hand } from "lucide-react";
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
    <BcfShell>
      <button
        type="button"
        className="absolute inset-0 z-20 cursor-pointer border-0 bg-transparent p-0"
        onClick={handleContinue}
        aria-label={c.touchToContinue}
      />

      <img
        src={introBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[35%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />

      <div className="relative z-10 flex min-h-[1920px] flex-col justify-center px-16 pb-40 pt-48">
        <div className="max-w-[820px]">
          <h1 className="font-sans text-[96px] font-bold uppercase leading-[1.02] tracking-[0.02em] text-white">
            {c.humanity}
          </h1>
          <h1 className="mt-2 font-sans text-[96px] font-bold uppercase leading-[1.02] tracking-[0.02em] text-white">
            {c.dignity}
          </h1>
          <h1
            className="mt-2 font-sans text-[96px] font-bold uppercase leading-[1.02] tracking-[0.02em]"
            style={{ color: BCF.gold }}
          >
            {c.hope}
          </h1>

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

      {showGuide ? (
        <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/65">
          <Hand className="h-20 w-20 text-white" strokeWidth={1.4} />
          <p className="mt-6 text-[32px] tracking-wide text-white">{c.touchToContinue}</p>
        </div>
      ) : null}
    </BcfShell>
  );
}
