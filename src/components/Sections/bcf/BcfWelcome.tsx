import React from "react";
import { ArrowRight } from "lucide-react";
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
    <BcfShell>
      <img
        src={welcomeBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />

      <div className="relative z-10 flex min-h-[1920px] flex-col justify-end px-14 pb-28 pt-48">
        <p className="text-[28px] tracking-[0.22em] text-white/85">{c.welcomeEyebrow}</p>
        <h1 className="mt-4 font-sans text-[78px] font-bold uppercase leading-[1.05] tracking-[0.02em]">
          <span style={{ color: BCF.gold }}>{c.welcomeTitleBcf}</span>{" "}
          <span className="text-white">{c.welcomeTitleRest}</span>
        </h1>
        <p className="mt-6 max-w-[820px] text-[28px] font-light leading-relaxed text-white/85">
          {c.welcomeBody}
        </p>

        <button
          type="button"
          onClick={onStart}
          className="mt-16 flex w-full max-w-[920px] items-center justify-between rounded-full border border-white/35 bg-black/35 px-10 py-7 backdrop-blur-sm transition active:scale-[0.99]"
        >
          <span className="text-[32px] font-medium tracking-wide text-white">
            {c.startJourney}
          </span>
          <span
            className="grid h-16 w-16 place-items-center rounded-full border-2"
            style={{ borderColor: BCF.gold }}
          >
            <ArrowRight className="h-8 w-8 text-white" />
          </span>
        </button>
      </div>
    </BcfShell>
  );
}
