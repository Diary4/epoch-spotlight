import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import {
  detailBackButtonClassName,
  detailBackButtonSideClassName,
  detailBackIconClassName,
  detailBackIconSize,
} from "@/constants/backNavigation";
import presidencyPortrait from "@/assets/images/parliment/presidency.webp";

type PresidencyPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

export default function PresidencyPage({ lang = "en", onBack }: PresidencyPageProps) {
  const isAr = lang === "ar";
  const isKu = lang === "ku";
  const isRtl = discoverRtlScript(lang);
  const dir = lang === "en" ? "ltr" : "rtl";
  const displayFont = discoverDisplayFont(lang);

  const [pageReady, setPageReady] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setPageReady(true), 40);
    const t2 = window.setTimeout(() => setShowContent(true), 360);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const name = isAr ? "نيجيرفان بارزاني" : isKu ? "نێچیرڤان بارزانی" : "Nechirvan Barzani";
  const role = isAr ? "رئيس إقليم كوردستان" : isKu ? "سەرۆکی هەرێمی کوردستان" : "President of the Kurdistan Region";

  const about = isAr
    ? "يمثل الرئيس الوحدة والاستمرارية والكرامة الوطنية، ويساهم في الإطار الدستوري والتوازن المؤسسي لإقليم كوردستان."
    : isKu
      ? "سەرۆک نوێنەرایەتی یەکڕیزی و بەردەوامی و شکۆی نیشتمانی دەکات، و بەشدارە لە چوارچێوەی دەستووری و هاوسەنگی دامەزراوەیی هەرێمی کوردستان."
      : "The President represents unity, continuity, and national dignity — contributing to the constitutional framework and institutional balance of the Kurdistan Region.";

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className={`relative h-full min-h-0 w-full overflow-hidden bg-black ${isRtl ? "font-noto-naskh" : ""}`}
    >
      {/* Full-bleed portrait — height fills so he stays fully visible; frame him center */}
      <div
        className={`absolute inset-0 bg-black transition-all duration-700 ease-out ${
          pageReady ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
        }`}
        style={{
          backgroundImage: `url(${presidencyPortrait})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto 100%",
          backgroundPosition: "22% center",
        }}
      />

      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className={`system-detail-back ${detailBackButtonClassName} ${detailBackButtonSideClassName(dir)}`}
        aria-label="Back to Government"
      >
        <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
      </button>

      {/* Elegant content box — same structure as Prime Minister page */}
      <div
        className={`absolute bottom-0 z-10 w-full transition-all duration-700 ease-out sm:bottom-8 sm:w-auto sm:max-w-xl ${
          isRtl ? "right-0 sm:right-8" : "left-0 sm:left-8"
        } ${showContent ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
      >
        <div
          className={`rounded-t-2xl p-6 shadow-2xl sm:rounded-2xl sm:p-8 ${isRtl ? "text-right" : "text-left"}`}
          style={{
            background: "rgba(10,14,22,0.72)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(201,154,85,0.28)",
          }}
        >
          <div className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
            <div className="h-px w-8 bg-[#c69237]/70" />
            <p className="text-xs font-light uppercase tracking-[0.25em] text-[#e6c98f]">{role}</p>
          </div>

          <h1
            className={`mt-3 ${displayFont} text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl`}
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}
          >
            {name}
          </h1>

          <p className="mt-5 text-sm leading-relaxed text-white/85 sm:text-base" style={{ lineHeight: 1.7 }}>
            {about}
          </p>

          <div className="my-6 h-px w-full bg-gradient-to-r from-[#c69237]/60 via-white/30 to-transparent" />
        </div>
      </div>
    </main>
  );
}
