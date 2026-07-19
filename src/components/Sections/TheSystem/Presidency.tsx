import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import {
  detailBackButtonClassName,
  detailBackButtonSideClassName,
  detailBackIconClassName,
  detailBackIconSize,
} from "@/constants/backNavigation";
import { localizeDigits } from "@/lib/utils";
import presidencyPortrait from "@/assets/images/parliment/presidency-centered.webp";

type PresidencyPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
  onJourneyClick?: () => void;
};

export default function PresidencyPage({ lang = "en", onBack, onJourneyClick }: PresidencyPageProps) {
  const isRtl = discoverRtlScript(lang);
  const dir = lang === "en" ? "ltr" : "rtl";
  const displayFont = discoverDisplayFont(lang);
  const t = (value: string) => localizeDigits(value, lang);

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

  // English-only for now — Kurdish / Arabic to be provided later.
  const name = "Nechirvan Barzani";
  const role = t("President of the Kurdistan Region (2019–Present)");
  const about = t(
    "Since 2019, President Nechirvan Barzani has led efforts to strengthen political unity, expand international relations, and preserve constitutional stability in the Kurdistan Region.",
  );
  const journeyLabel = "Explore the Journey";

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className={`relative h-full min-h-0 w-full overflow-hidden bg-black ${isRtl ? "font-noto-naskh" : ""}`}
    >
      <div
        className={`absolute inset-0 transition-all duration-700 ease-out ${
          pageReady ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
        }`}
        style={{
          backgroundImage: `url(${presidencyPortrait})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      />

      <button
        type="button"
        onClick={onBack}
        className={`system-detail-back ${detailBackButtonClassName} ${detailBackButtonSideClassName(dir)}`}
        aria-label="Back to Government"
      >
        <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
      </button>

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

          {onJourneyClick && (
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
          )}
        </div>
      </div>
    </main>
  );
}
