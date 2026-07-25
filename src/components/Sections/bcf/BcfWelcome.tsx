import React from "react";
import { ArrowRight } from "lucide-react";
import TextType from "@/components/TextType";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { bcfWelcomeBg as welcomeBg } from "@/components/Sections/bcf/bcfAssets";

type BcfWelcomeProps = {
  lang: BcfLang;
  onStart: () => void;
};

export default function BcfWelcome({ lang, onStart }: BcfWelcomeProps) {
  const c = bcfCopy[lang];

  return (
    <BcfShell
      backgroundImage={welcomeBg}
      overlayClassName="bg-gradient-to-r from-[#04090c] via-[#04090c]/55 to-transparent"
    >
      <div className="relative flex min-h-[1920px] flex-col justify-center px-14 pb-28 pt-48">
        <div className="max-w-[1080px]">
          <p className="text-[40px] font-medium tracking-wide text-[#d2ba91]">{c.welcomeEyebrow}</p>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-4 font-sans text-[124px] font-bold uppercase leading-[1.02] tracking-[0.01em]">
            <span style={{ color: BCF.gold }}>{c.welcomeTitleBcf}</span>
            <TextType
              as="span"
              text={c.welcomeTitleRest}
              typingSpeed={55}
              loop={false}
              showCursor
              cursorCharacter="|"
              cursorClassName="text-[#fbc158]"
              className="text-[124px] font-bold uppercase text-[#fbf4e4]"
            />
          </div>
          <p className="mt-8 max-w-[920px] text-[40px] font-medium leading-snug text-[#d2ba91]">
            {c.welcomeBody}
          </p>

          <button
            type="button"
            onClick={onStart}
            className="mt-16 flex w-full max-w-[920px] items-center justify-between rounded-full border border-[#ece1d0] bg-black/25 px-8 py-5 backdrop-blur-sm transition active:scale-[0.99]"
          >
            <span className="text-[32px] font-medium tracking-wide text-white">{c.startJourney}</span>
            <span
              className="grid h-[100px] w-[100px] place-items-center rounded-full border border-[#f0e8da]"
              style={{ boxShadow: "inset -1px -1px 20px 0 #fbb22f" }}
            >
              <ArrowRight className="h-10 w-10 text-white" />
            </span>
          </button>
        </div>
      </div>
    </BcfShell>
  );
}
