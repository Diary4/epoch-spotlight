import React from "react";
import { ChevronLeft } from "lucide-react";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import BcfChapterPill from "@/components/Sections/bcf/BcfChapterPill";
import BcfStatValue from "@/components/Sections/bcf/BcfStatValue";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { bcfImpactBg } from "@/components/Sections/bcf/bcfAssets";
import impactThumb from "@/assets/images/TouristicPlace/GaliAliBag/16.webp";

type BcfImpactProps = {
  lang: BcfLang;
  onBack: () => void;
};

/** Stagger: right, left, right, left — matching Figma card offsets. */
const CARD_ALIGN = ["ml-auto", "mr-auto", "ml-auto", "mr-auto"] as const;

export default function BcfImpact({ lang, onBack }: BcfImpactProps) {
  const c = bcfCopy[lang];
  const enItems = bcfCopy.en.impactItems;

  return (
    <BcfShell backgroundImage={bcfImpactBg} overlayClassName="bg-black/55">
      <div className="relative flex min-h-[1920px] flex-col px-14 pb-20 pt-24">
        <button
          type="button"
          onClick={onBack}
          className="absolute right-10 top-10 z-20 grid h-14 w-14 place-items-center rounded-full bg-black/40 backdrop-blur-sm"
          aria-label={c.back}
        >
          <ChevronLeft className="h-7 w-7 text-white" />
        </button>

        <BcfChapterPill title={c.ourImpact} thumb={impactThumb} />

        <div className="mx-auto mt-16 w-full max-w-[1080px]">
          <p dir="ltr" className="text-[80px] font-bold leading-none">
            <span className="text-[#fbf4e4]">0</span>
            <span style={{ color: BCF.gold }}>4</span>
          </p>
          <h1 className="mt-6 text-[80px] font-bold leading-[1.05]">
            <span className="text-[#fbf4e4]">{c.changing} </span>
            <span style={{ color: BCF.gold }}>{c.livesEveryday}</span>
          </h1>

          <div className="mt-14 flex flex-col gap-10">
            {c.impactItems.map((item, index) => (
              <div
                key={item.value + index}
                className={`${CARD_ALIGN[index]} flex w-full max-w-[700px] items-start gap-8 rounded-br-[32px] rounded-tl-[32px] bg-black/40 px-6 py-5 shadow-[0_0_20px_rgba(251,178,47,0.25)] backdrop-blur-sm`}
              >
                <span
                  className="h-[100px] w-[100px] shrink-0 overflow-hidden rounded-full border-2"
                  style={{ borderColor: BCF.gold }}
                >
                  <img src={impactThumb} alt="" className="h-full w-full object-cover" />
                </span>
                <div className="min-w-0 flex-1 pt-1">
                  <p className="text-[32px] font-medium leading-snug">
                    <BcfStatValue
                      value={enItems[index]?.value ?? item.value}
                      className="text-[32px] font-medium"
                      duration={2.2}
                    />{" "}
                    <span className="text-[#fbf4e4]">{item.title}</span>
                  </p>
                  <p className="mt-4 text-[24px] leading-snug text-[#fbf4e4]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BcfShell>
  );
}
