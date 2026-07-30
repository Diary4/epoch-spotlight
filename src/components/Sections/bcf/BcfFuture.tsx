import React from "react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import BcfChapterPill from "@/components/Sections/bcf/BcfChapterPill";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import futureThumb from "@/assets/images/religions/coexistence/masoud-barzani.webp";
import { bcfFutureDetailBg } from "@/components/Sections/bcf/bcfAssets";

type BcfFutureProps = {
  lang: BcfLang;
  onBack: () => void;
  onOpenFuture: () => void;
};

export default function BcfFuture({ lang, onBack, onOpenFuture }: BcfFutureProps) {
  const c = bcfCopy[lang];

  return (
    <BcfShell backgroundImage={bcfFutureDetailBg} overlayClassName="bg-black/55">
      <div className="relative flex min-h-[1920px] flex-col px-10 pb-16 pt-24">
        <button
          type="button"
          onClick={onBack}
          className="absolute right-10 top-10 z-20 grid h-14 w-14 place-items-center rounded-full bg-black/40 backdrop-blur-sm"
          aria-label={c.back}
        >
          <ChevronLeft className="h-7 w-7 text-white" />
        </button>

        <BcfChapterPill title={c.trustTitle} thumb={futureThumb} />

        <div className="relative mx-auto mt-16 flex h-[1400px] w-full max-w-[980px] flex-col items-center">
          <button
            type="button"
            onClick={onOpenFuture}
            className="absolute top-0 z-20 grid h-[620px] w-[620px] place-items-center rounded-full border-2 bg-black/35 backdrop-blur-sm transition active:scale-[0.98]"
            style={{ borderColor: BCF.gold }}
          >
            <span className="flex max-w-[420px] flex-col items-center gap-6 text-center">
              <span dir="ltr" className="text-[64px] font-bold leading-none">
                <span className="text-[#fbf4e4]">0</span>
                <span style={{ color: BCF.goldBright }}>1</span>
              </span>
              <span className="text-[56px] font-bold leading-tight text-[#fbf4e4]">
                {c.futureCircle}
              </span>
              <span className="flex items-center gap-2 text-[#fbc158]">
                <span className="h-px w-16 bg-current" />
                <ArrowRight className="h-6 w-6" />
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenFuture}
            className="absolute bottom-8 z-10 grid h-[620px] w-[620px] place-items-center rounded-full border-2 bg-black/35 backdrop-blur-sm transition active:scale-[0.98]"
            style={{ borderColor: BCF.gold }}
          >
            <span className="flex max-w-[420px] flex-col items-center gap-6 text-center">
              <span dir="ltr" className="text-[64px] font-bold leading-none">
                <span className="text-[#fbf4e4]">0</span>
                <span style={{ color: BCF.goldBright }}>2</span>
              </span>
              <span className="text-[56px] font-bold leading-tight text-[#fbf4e4]">
                {c.legacyCircle}
              </span>
              <span className="flex items-center gap-2 text-[#fbc158]">
                <span className="h-px w-16 bg-current" />
                <ArrowRight className="h-6 w-6" />
              </span>
            </span>
          </button>
        </div>
      </div>
    </BcfShell>
  );
}
