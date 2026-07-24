import React from "react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import CircularGallery from "@/components/CircularGallery";
import TextType from "@/components/TextType";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { bcfGalleryItems } from "@/components/Sections/bcf/bcfGalleryData";
import { BCF, BCF_GLASS_CARD } from "@/components/Sections/bcf/bcfTheme";
import { bcfHubBg } from "@/components/Sections/bcf/bcfAssets";
import mapThumb from "@/assets/images/TouristicPlace/ErbilCastle/IMG_8636 copy.webp";
import impactThumb from "@/assets/images/PrimeMinistir/service.webp";
import futureThumb from "@/assets/images/religions/coexistence/masoud-barzani.jpeg";

type HubCardId = "map" | "impact" | "future";

type BcfHubProps = {
  lang: BcfLang;
  onOpen: (id: HubCardId) => void;
  onBackToWelcome: () => void;
};

const thumbs: Record<HubCardId, string> = {
  map: mapThumb,
  impact: impactThumb,
  future: futureThumb,
};

export default function BcfHub({ lang, onOpen, onBackToWelcome }: BcfHubProps) {
  const c = bcfCopy[lang];

  return (
    <BcfShell backgroundImage={bcfHubBg} overlayClassName="bg-black/55">
      <div className="relative flex min-h-[1920px] flex-col px-14 pb-20 pt-40">
        <button
          type="button"
          onClick={onBackToWelcome}
          className="mb-10 flex w-fit items-center gap-2 text-[24px] text-white/70"
        >
          <ChevronLeft className="h-7 w-7" />
          {c.back}
        </button>

        <p className="text-[26px] tracking-[0.18em] text-white/70">{c.hubTitle}</p>
        <TextType
          as="h1"
          text={c.hubSubtitle}
          typingSpeed={28}
          loop={false}
          showCursor={false}
          className="mt-4 max-w-[980px] text-[52px] font-semibold leading-tight text-white"
        />

        <div className="mt-12 flex flex-col gap-8">
          {c.hubCards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => onOpen(card.id)}
              className={`${BCF_GLASS_CARD} flex items-center gap-8 overflow-hidden p-5 text-left transition active:scale-[0.99]`}
            >
              <img
                src={thumbs[card.id]}
                alt=""
                className="h-36 w-44 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <h2 className="text-[36px] font-semibold text-white">{card.title}</h2>
                <p className="mt-2 text-[24px] text-white/70">{card.subtitle}</p>
              </div>
              <span
                className="mr-4 grid h-14 w-14 shrink-0 place-items-center rounded-full border"
                style={{ borderColor: BCF.gold }}
              >
                <ArrowRight className="h-7 w-7" style={{ color: BCF.gold }} />
              </span>
            </button>
          ))}
        </div>

        <div className="mt-16 h-[520px] w-full overflow-hidden rounded-[28px] border border-[#e8c56a]/25 bg-black/40">
          <CircularGallery
            items={bcfGalleryItems}
            bend={2.4}
            textColor="#e8c56a"
            borderRadius={0.06}
            font="bold 28px sans-serif"
          />
        </div>
      </div>
    </BcfShell>
  );
}
