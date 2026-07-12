import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Music2, Pause, Play, RotateCcw, Square } from "lucide-react";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import {
  detailBackButtonClassName,
  detailBackButtonSideClassName,
  detailBackIconClassName,
  detailBackIconSize,
} from "@/constants/backNavigation";
import anthemBg from "@/assets/images/kurdistan.webp";
import anthemAudio from "@/assets/audio/national-anthem.mp3";

type Copy = {
  eyebrow: string;
  anthemName: string;
  anthemLatin?: string;
  subtitle: string;
  about: string;
  play: string;
  pause: string;
  stop: string;
  restart: string;
};

const COPY: Record<"en" | "ku" | "ar", Copy> = {
  en: {
    eyebrow: "National Anthem",
    anthemName: "ئەی ڕەقیب",
    anthemLatin: "Ey Reqîb",
    subtitle: "A lasting symbol of identity, resilience, and freedom.",
    about:
      "“Ey Reqîb” is the national anthem of the Kurdish people and the official anthem of the Kurdistan Region. Written in 1938 by the poet Dildar, it remains an enduring declaration of identity, resilience, and national dignity.",
    play: "Play Anthem",
    pause: "Pause",
    stop: "Stop",
    restart: "Restart",
  },
  ku: {
    eyebrow: "سروودی نیشتمانی",
    anthemName: "ئەی ڕەقیب",
    subtitle: "هێمایەکی نەمر بۆ ناسنامە، خۆڕاگری، و ئازادی.",
    about:
      "«ئەی ڕەقیب» سروودی نیشتمانیی گەلی کورد و سروودی فەرمیی هەرێمی کوردستانە. لە ساڵی ١٩٣٨ لەلایەن شاعیر (دڵدار)ەوە نووسراوە و تا ئێستاش ڕاگەیاندنێکی نەمرە بۆ ناسنامە، خۆڕاگری و شکۆی نەتەوەیی.",
    play: "سروودەکە لێبدە",
    pause: "وەستاندن",
    stop: "ڕاگرتن",
    restart: "دووبارە",
  },
  ar: {
    eyebrow: "النشيد الوطني",
    anthemName: "أي رقيب",
    subtitle: "رمز خالد للهوية والصمود والحرية.",
    about:
      "«أي رقيب» هو النشيد الوطني للشعب الكردي والنشيد الرسمي لإقليم كردستان. كُتب عام ١٩٣٨ بقلم الشاعر (دلدار)، ولا يزال إعلاناً خالداً للهوية والصمود والكرامة الوطنية.",
    play: "تشغيل النشيد",
    pause: "إيقاف مؤقت",
    stop: "إيقاف",
    restart: "إعادة",
  },
};

type NationalAnthemPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

export default function NationalAnthemPage({ lang = "en", onBack }: NationalAnthemPageProps) {
  const isRtl = discoverRtlScript(lang);
  const dir = lang === "en" ? "ltr" : "rtl";
  const displayFont = discoverDisplayFont(lang);
  const t = COPY[lang];

  const [pageReady, setPageReady] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t1 = window.setTimeout(() => setPageReady(true), 40);
    const t2 = window.setTimeout(() => setShowContent(true), 360);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    const onTime = () => setProgress(a.duration ? a.currentTime / a.duration : 0);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onEnded);
    a.addEventListener("timeupdate", onTime);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onEnded);
      a.removeEventListener("timeupdate", onTime);
      a.pause();
    };
  }, []);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) void a.play().catch(() => {});
    else a.pause();
  };

  const stop = () => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    setProgress(0);
  };

  const restart = () => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    setProgress(0);
    void a.play().catch(() => {});
  };

  return (
    <main
      dir={dir}
      className={`relative h-full min-h-0 w-full overflow-hidden bg-black ${isRtl ? "font-noto-naskh" : ""}`}
    >
      {/* Full-bleed background */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-out ${
          pageReady ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
        }`}
        style={{
          backgroundImage: `url(${anthemBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
        }}
      />
      {/* Legibility scrim */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isRtl
            ? "linear-gradient(to left, rgba(6,9,15,0.86) 0%, rgba(6,9,15,0.5) 45%, rgba(6,9,15,0.15) 100%)"
            : "linear-gradient(to right, rgba(6,9,15,0.86) 0%, rgba(6,9,15,0.5) 45%, rgba(6,9,15,0.15) 100%)",
        }}
      />

      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className={`system-detail-back ${detailBackButtonClassName} ${detailBackButtonSideClassName(dir)}`}
        aria-label="Back"
      >
        <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
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
          {/* Eyebrow */}
          <div className={`flex items-center gap-2 ${isRtl ? "flex-row-reverse" : ""}`}>
            <div className="h-px w-8 bg-[#c69237]/70" />
            <Music2 size={15} className="text-[#e6c98f]" strokeWidth={1.6} />
            <p className="text-xs font-light uppercase tracking-[0.25em] text-[#e6c98f]">{t.eyebrow}</p>
          </div>

          {/* Anthem name */}
          <h1
            className="mt-3 font-noto-naskh text-5xl font-light leading-tight tracking-tight text-white sm:text-6xl"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}
            dir="rtl"
          >
            {t.anthemName}
          </h1>
          {t.anthemLatin && (
            <p className="mt-1 text-lg font-light italic tracking-wide text-[#d9c093]">{t.anthemLatin}</p>
          )}

          {/* Subtitle */}
          <p className={`mt-3 ${displayFont} text-base font-light text-white/90`}>{t.subtitle}</p>

          {/* About */}
          <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base" style={{ lineHeight: 1.7 }}>
            {t.about}
          </p>

          {/* Decorative divider */}
          <div className="my-6 h-px w-full bg-gradient-to-r from-[#c69237]/60 via-white/30 to-transparent" />

          {/* Progress bar */}
          <div className="mb-5 h-1 w-full overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-[#e6c98f] transition-[width] duration-150 ease-linear"
              style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
            />
          </div>

          {/* Audio controls */}
          <div className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}>
            <button
              type="button"
              onClick={togglePlay}
              className="group flex flex-1 items-center justify-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:scale-[1.02] sm:flex-none"
              style={{ background: "rgba(198,146,55,0.2)", border: "1px solid rgba(201,154,85,0.5)" }}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 text-[#e6c98f]" />
              ) : (
                <Play className="h-4 w-4 text-[#e6c98f]" />
              )}
              <span>{isPlaying ? t.pause : t.play}</span>
            </button>

            <button
              type="button"
              onClick={restart}
              aria-label={t.restart}
              title={t.restart}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-white transition-all duration-300 hover:scale-[1.05]"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(201,154,85,0.4)" }}
            >
              <RotateCcw className="h-4 w-4 text-[#e6c98f]" />
            </button>

            <button
              type="button"
              onClick={stop}
              aria-label={t.stop}
              title={t.stop}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-white transition-all duration-300 hover:scale-[1.05]"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(201,154,85,0.4)" }}
            >
              <Square className="h-4 w-4 text-[#e6c98f]" fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={anthemAudio} preload="metadata" />
    </main>
  );
}
