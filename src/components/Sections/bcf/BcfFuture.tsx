import React from "react";
import { ChevronLeft } from "lucide-react";
import DomeGallery from "@/components/DomeGallery";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { bcfDomeImages } from "@/components/Sections/bcf/bcfGalleryData";
import { BCF } from "@/components/Sections/bcf/bcfTheme";

type BcfFutureProps = {
  lang: BcfLang;
  onBack: () => void;
  onOpenFuture: () => void;
};

export default function BcfFuture({ lang, onBack, onOpenFuture }: BcfFutureProps) {
  const c = bcfCopy[lang];

  return (
    <BcfShell>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(232,197,106,0.14),_transparent_45%),_#050505]" />

      <div className="relative z-10 flex min-h-[1920px] flex-col px-10 pb-16 pt-36">
        <button
          type="button"
          onClick={onBack}
          className="mb-8 flex w-fit items-center gap-2 px-4 text-[24px] text-white/70"
        >
          <ChevronLeft className="h-7 w-7" />
          {c.back}
        </button>

        <p className="text-center text-[26px] tracking-[0.18em] text-white/70">{c.trustTitle}</p>

        <div className="relative mx-auto mt-10 h-[720px] w-full max-w-[1100px] overflow-hidden rounded-[28px] border border-[#e8c56a]/25">
          <DomeGallery
            images={bcfDomeImages}
            overlayBlurColor="#0a0a0a"
            grayscale={false}
            imageBorderRadius="16px"
            openedImageBorderRadius="16px"
          />
        </div>

        <div className="relative mx-auto mt-14 flex h-[780px] w-full max-w-[980px] flex-col items-center">
          <button
            type="button"
            onClick={onOpenFuture}
            className="absolute top-0 z-20 grid h-[420px] w-[420px] place-items-center rounded-full border-2 bg-black/40 transition active:scale-[0.98]"
            style={{ borderColor: BCF.gold }}
          >
            <span className="max-w-[300px] text-center text-[34px] font-semibold leading-snug text-white">
              <span style={{ color: BCF.gold }}>01 </span>
              {c.futureCircle.replace(/^0?1\s*/, "").replace(/^٠١\s*/, "")}
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenFuture}
            className="absolute bottom-0 z-10 grid h-[420px] w-[420px] place-items-center rounded-full border-2 bg-black/40 transition active:scale-[0.98]"
            style={{ borderColor: BCF.gold }}
          >
            <span className="max-w-[300px] text-center text-[34px] font-semibold leading-snug text-white">
              <span style={{ color: BCF.gold }}>02 </span>
              {c.legacyCircle.replace(/^0?2\s*/, "").replace(/^٠٢\s*/, "")}
            </span>
          </button>
        </div>
      </div>
    </BcfShell>
  );
}
