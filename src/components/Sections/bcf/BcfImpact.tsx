import React from "react";
import { ChevronLeft, Users, Tent, HeartHandshake, School } from "lucide-react";
import TextType from "@/components/TextType";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import BcfStatValue from "@/components/Sections/bcf/BcfStatValue";
import { BCF, BCF_GLASS_CARD } from "@/components/Sections/bcf/bcfTheme";
import { bcfImpactBg } from "@/components/Sections/bcf/bcfAssets";

const icons = [Users, Tent, HeartHandshake, School];

type BcfImpactProps = {
  lang: BcfLang;
  onBack: () => void;
};

export default function BcfImpact({ lang, onBack }: BcfImpactProps) {
  const c = bcfCopy[lang];
  const enItems = bcfCopy.en.impactItems;

  return (
    <BcfShell backgroundImage={bcfImpactBg} overlayClassName="bg-black/60">
      <div className="relative flex min-h-[1920px] flex-col px-14 pb-20 pt-40">
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
          <TextType
            as="span"
            text={`${c.changing} ${c.livesEveryday}`}
            typingSpeed={40}
            loop={false}
            showCursor={false}
            className="text-[68px] font-semibold"
            textColors={["#ffffff"]}
          />
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
                  <BcfStatValue
                    value={enItems[index]?.value ?? item.value}
                    className="text-[52px] font-bold leading-none"
                    duration={2.2}
                  />
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
