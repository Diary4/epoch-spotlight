import React from "react";
import { ChevronLeft, Users, Tent, HeartHandshake, School } from "lucide-react";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF, BCF_GLASS_CARD } from "@/components/Sections/bcf/bcfTheme";

const icons = [Users, Tent, HeartHandshake, School];

type BcfImpactProps = {
  lang: BcfLang;
  onBack: () => void;
};

export default function BcfImpact({ lang, onBack }: BcfImpactProps) {
  const c = bcfCopy[lang];

  return (
    <BcfShell>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(232,197,106,0.1),_transparent_50%),_#0a0a0a]" />

      <div className="relative z-10 flex min-h-[1920px] flex-col px-14 pb-20 pt-40">
        <button
          type="button"
          onClick={onBack}
          className="mb-10 flex w-fit items-center gap-2 text-[24px] text-white/70"
        >
          <ChevronLeft className="h-7 w-7" />
          {c.back}
        </button>

        <p className="text-[22px] tracking-[0.16em] text-white/65">{c.ourImpact}</p>
        <h1 className="mt-3 text-[68px] font-semibold leading-tight">
          <span style={{ color: BCF.gold }}>04 </span>
          <span className="text-white">{c.changing} </span>
          <span style={{ color: BCF.gold }}>{c.livesEveryday}</span>
        </h1>

        <div className="mt-14 flex flex-col gap-7">
          {c.impactItems.map((item, index) => {
            const Icon = icons[index] ?? Users;
            return (
              <div key={item.value + index} className={`${BCF_GLASS_CARD} flex items-center gap-7 p-7`}>
                <span
                  className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border"
                  style={{ borderColor: BCF.gold, color: BCF.gold }}
                >
                  <Icon className="h-10 w-10" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[52px] font-bold leading-none" style={{ color: BCF.gold }}>
                    {item.value}
                  </p>
                  <p className="mt-3 text-[24px] leading-relaxed text-white/80">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BcfShell>
  );
}
