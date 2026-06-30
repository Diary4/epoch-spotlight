import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import primeMinister from "@/assets/images/PrimeMinistir/p-2.png";

type PrimeMinisterPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
  onJourneyClick?: () => void;
};

export default function PrimeMinisterPage({
  lang = "en",
  onBack,
  onJourneyClick,
}: PrimeMinisterPageProps) {
  const isAr = lang === "ar";
  const isKu = lang === "ku";
  const isRtl = discoverRtlScript(lang);
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

  const name = isAr ? "مەسرور بارزانی" : isKu ? "مەسرور بارزانی" : "Masrour Barzani";
  const role = isAr ? "رئيس الوزراء" : isKu ? "سەرۆک وەزیران" : "Prime Minister";

  const about = isAr
    ? "يقود رئيس الوزراء منذ عام 2019 أجندة من الإصلاح والاستقرار والتنمية المستدامة لكوردستان."
    : isKu
      ? "سەرۆک وەزیران لە ٢٠١٩ەوە ڕابەری بەرنامەی چاکسازی و سەقامگیری و گەشەی بەردەوام دەکات بۆ کوردستان."
      : "Since 2019, the Prime Minister has led an agenda of reform, stability, and sustainable development for Kurdistan.";

  const journeyLabel = isAr
    ? "اكتشف المسيرة الكاملة"
    : isKu
      ? "گەشتە تەواوەکە ببینە"
      : "Explore the Full Journey";
  const backLabel = isAr ? "رجوع" : isKu ? "گەڕانەوە" : "Back";

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className={`relative h-full min-h-0 w-full overflow-hidden bg-black ${isRtl ? "font-noto-naskh" : ""}`}
    >
      {/* Full-bleed portrait background */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-out ${
          pageReady ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
        }`}
        style={{
          backgroundImage: `url(${primeMinister})`,
          backgroundSize: "cover",
          backgroundPosition: "center 18%",
        }}
      />

      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className={`absolute top-5 z-20 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:gap-3 sm:top-8 ${
          isRtl ? "right-4 sm:right-8" : "left-4 sm:left-8"
        }`}
        style={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
        aria-label={backLabel}
      >
        <ArrowLeft className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
        <span>{backLabel}</span>
      </button>

      {/* Elegant content box */}
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
          {/* Role eyebrow */}
          <div className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
            <div className="h-px w-8 bg-[#c69237]/70" />
            <p className="text-xs font-light uppercase tracking-[0.25em] text-[#e6c98f]">{role}</p>
          </div>

          {/* Name */}
          <h1
            className={`mt-3 ${displayFont} text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl`}
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}
          >
            {name}
          </h1>

          {/* About */}
          <p className="mt-5 text-sm leading-relaxed text-white/85 sm:text-base" style={{ lineHeight: 1.7 }}>
            {about}
          </p>

          {/* Decorative divider */}
          <div className="my-6 h-px w-full bg-gradient-to-r from-[#c69237]/60 via-white/30 to-transparent" />

          {/* Explore full journey */}
          <button
            type="button"
            onClick={onJourneyClick}
            className="group flex w-full items-center justify-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:scale-[1.02] sm:w-auto"
            style={{
              background: "rgba(198,146,55,0.2)",
              border: "1px solid rgba(201,154,85,0.5)",
            }}
          >
            <span>{journeyLabel}</span>
            <ArrowRight
              className={`h-4 w-4 text-[#e6c98f] transition group-hover:translate-x-1 ${isRtl ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
    </main>
  );
}
