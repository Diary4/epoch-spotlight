import React from "react";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { bcfLangBg as langBg } from "@/components/Sections/bcf/bcfAssets";

type BcfLanguageProps = {
  onSelect: (lang: BcfLang) => void;
};

export default function BcfLanguage({ onSelect }: BcfLanguageProps) {
  const c = bcfCopy.en;

  return (
    <BcfShell backgroundImage={langBg} overlayClassName="bg-black/45">
      <div className="relative flex min-h-[1920px] flex-col items-center justify-center px-16">
        <p className="mb-14 text-center text-[28px] tracking-[0.18em] text-white/80">
          {c.languageTitle}
        </p>
        <div className="flex w-full max-w-[720px] flex-col gap-7">
          {c.languages.map((lang) => (
            <button
              key={lang.id}
              type="button"
              onClick={() => onSelect(lang.id)}
              className="transform-gpu rounded-2xl border-2 px-8 py-7 text-center text-[42px] font-light text-white transition-[transform,background-color,box-shadow] duration-300 ease-smooth-out will-change-transform active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none "
              style={{ borderColor: BCF.gold }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </BcfShell>
  );
}
