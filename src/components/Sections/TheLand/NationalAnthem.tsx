import React, { useEffect, useId, useRef, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Diamond,
  Feather,
  Landmark,
  Music2,
  Pause,
  Play,
  RotateCcw,
  Square,
} from "lucide-react";
import { useLandDetailAnimation } from "@/components/Sections/TheLand/useLandDetailAnimation";
import {
  detailBackButtonClassName,
  detailBackButtonSideClassName,
  detailBackIconClassName,
  detailBackIconSize,
} from "@/constants/backNavigation";
import { discoverDisplayFont, discoverRtlScript, discoverYearFont } from "@/components/Sections/discoverLanguage";
import { localizeDigits } from "@/lib/utils";
import WomenScaledCanvas from "@/components/Sections/women/WomenScaledCanvas";
import historyImg from "@/assets/images/mahabad.webp";
import anthemBg from "@/assets/images/kurdistan.webp";
import anthemAudio from "@/assets/audio/national-anthem.mp3";
import { getAnthemKaraokeAt, type AnthemLang } from "@/data/nationalAnthemLyrics";

const WRITER_YEAR = "1938";
const ROLE_YEAR = "1946";

const PAPER = "#fbf5eb";
const GOLD = "#9b6d35";
const INK = "#17233b";
const BODY = "#35435b";
const CARD_BG = "#f7f1e3";
const CARD_BORDER = "#e7dcc4";

/* 21-ray sun of the Kurdistan flag */
const SUN_POINTS = (() => {
  const rays = 21;
  const pts: string[] = [];
  for (let i = 0; i < rays * 2; i++) {
    const r = i % 2 === 0 ? 50 : 27;
    const a = (Math.PI * i) / rays - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
})();

function KurdishSun({ size, className = "" }: { size: number; className?: string }) {
  const gradientId = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={gradientId}>
          <stop offset="0%" stopColor="#f7ce6d" />
          <stop offset="55%" stopColor="#efb23c" />
          <stop offset="100%" stopColor="#dd9a26" />
        </radialGradient>
      </defs>
      <polygon points={SUN_POINTS} fill={`url(#${gradientId})`} />
      <circle cx="50" cy="50" r="27.5" fill={`url(#${gradientId})`} />
    </svg>
  );
}

function DiamondDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 text-[#cbb488] ${className}`}>
      <span className="h-px w-8 bg-[#d9c9a6]" />
      <Diamond size={9} fill="currentColor" />
      <span className="h-px w-8 bg-[#d9c9a6]" />
    </div>
  );
}

type Copy = {
  eyebrow: string;
  anthemName: string;
  anthemLatin?: string;
  subtitle: string;
  meaningTitle: string;
  meaningPhrase: string;
  meaningText: string;
  writerTitle: string;
  writerName: string;
  writerSub: string;
  writerText: string;
  roleTitle: string;
  roleText: string;
  adopted: string;
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
    subtitle: "A lasting symbol of identity, resilience, freedom, and national dignity.",
    meaningTitle: "TITLE & MEANING",
    meaningPhrase: "“O Enemy!”",
    meaningText:
      "Ey Reqîb means “O Enemy!”. The anthem addresses those who denied Kurdish existence and became a powerful declaration that the Kurdish people remain alive, united, and unbroken.",
    writerTitle: "THE WRITER",
    writerName: "Dildar",
    writerSub: "Pen name of Yûnis Rauf",
    writerText:
      "The lyrics were written by Dildar, the pen name of Yûnis Rauf, a Kurdish poet and patriot. He composed Ey Reqîb in 1938 while in prison, transforming hardship into one of the most enduring songs of Kurdish national identity.",
    roleTitle: "HISTORICAL ROLE",
    roleText:
      "Ey Reqîb was adopted in 1946 by the Republic of Mahabad and later became the official anthem of the Kurdistan Region. Over time, it came to represent Kurdish identity, perseverance, and the shared national spirit of Kurds everywhere.",
    adopted: "Adopted by the Republic of Mahabad",
    play: "Play Anthem",
    pause: "Pause",
    stop: "Stop",
    restart: "Restart",
  },
  ku: {
    eyebrow: "سروودی نیشتمانی",
    anthemName: "ئەی ڕەقیب",
    subtitle: "هێمایەکی نەمر بۆ ناسنامە، خۆڕاگری، ئازادی و شکۆی نەتەوەیی.",
    meaningTitle: "ناو و واتا",
    meaningPhrase: "«ئەی دوژمن!»",
    meaningText:
      "وشەی «ئەی ڕەقیب» بە مانای «ئەی دوژمن!» دێت. ئەم سروودە ڕوو لەو لایەن و کەسانە دەکات کە نکوڵییان لە بوونی کورد کردووە، و بووەتە پەیامێک و ڕاگەیاندنێکی بەهێز بۆ سەلماندنی ئەوەی کە گەلی کورد هەمیشە زیندوو، یەکگرتوو و نەبەزە.",
    writerTitle: "نووسەر",
    writerName: "دڵدار",
    writerSub: "نازناوی یونس ڕەئووف",
    writerText:
      "ئەم هۆنراوەییە لەلایەن (دڵدار)ەوە نووسراوە، کە نازناوی شاعیر و نیشتمانپەروەری کورد (یونس ڕەئووف)ـە. دڵدار ئەم سروودەی لە ساڵی 1938 و لە کاتی زینداندا هۆنیوەتەوە. بەم جۆرەش ئازارەکانی زیندانی گۆڕی بۆ یەکێک لە نەمرترین سروودەکانی گوزارشتکردن لە ناسنامەی نەتەوەیی کورد.",
    roleTitle: "ڕۆڵی مێژوویی",
    roleText:
      "لە ساڵی 1946، کۆماری کوردستان لە مەهاباد «ئەی ڕەقیب»ی وەک سروودی نیشتمانی پەسەند کرد و دواتریش بوو بە سروودی فەرمیی هەرێمی کوردستان. بە تێپەڕبوونی کات، ئەم سروودە بووەتە نوێنەری ناسنامەی کوردی، کۆڵنەدان و گیانی هاوبەشی نەتەوەیی لە نێوان کوردانی سەرتاسەری جیهاندا.",
    adopted: "لەلایەن کۆماری مەهابادەوە پەسەند کرا",
    play: "سروودەکە لێبدە",
    pause: "وەستاندن",
    stop: "ڕاگرتن",
    restart: "دووبارە",
  },
  ar: {
    eyebrow: "النشيد الوطني",
    anthemName: "أي رقيب",
    subtitle: "رمز خالد للهوية والصمود والحرية والكرامة الوطنية.",
    meaningTitle: "العنوان والمعنى",
    meaningPhrase: "«أيها العدو!»",
    meaningText:
      "كلمة «أي رقيب» تعني «أيها العدو!». يُخاطب هذا النشيد الأطراف والأشخاص الذين أنكروا الوجود الكردي، وقد أصبح رسالة وإعلاناً قوياً يثبت أن الشعب الكردي سيظل دائماً حياً، ومتحداً، وعصياً على الانكسار.",
    writerTitle: "المؤلف",
    writerName: "دلدار",
    writerSub: "الاسم المستعار ليونس رؤوف",
    writerText:
      "كُتبت هذه القصيدة بقلم (دلدار)، وهو الاسم المستعار للشاعر والوطني الكردي (يونس رؤوف). نظم دلدار هذا النشيد عام 1938 أثناء فترة سجنه. وبذلك، حوّل آلام السجن إلى واحد من أخلد الأناشيد التي تعبر عن الهوية الوطنية الكردية.",
    roleTitle: "الدور التاريخي",
    roleText:
      "في عام 1946، اعتمدت جمهورية كردستان في مهاباد «أي رقيب» كنشيداً وطنياً لها، وأصبح لاحقاً النشيد الرسمي لإقليم كردستان. وبمرور الوقت، غدا هذا النشيد ممثلاً للهوية الكردية، والمثابرة، والروح الوطنية المشتركة بين الكرد في جميع أنحاء العالم.",
    adopted: "اعتمدته جمهورية مهاباد",
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
  const rootRef = useLandDetailAnimation([lang]);
  const dir = lang === "en" ? "ltr" : "rtl";
  const isRtlScript = discoverRtlScript(lang);
  const displayFont = discoverDisplayFont(lang);
  const t = COPY[lang];
  const localize = (value: string) => localizeDigits(value, lang);
  const yearFont = discoverYearFont(lang);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const karaoke = getAnthemKaraokeAt(currentTime, lang as AnthemLang);
  // Once playback has started, titles yield to synced lyric subtitles.
  const showSubtitles = currentTime > 0.05 || isPlaying;

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };
    const onTime = () => {
      setCurrentTime(a.currentTime);
      setProgress(a.duration ? a.currentTime / a.duration : 0);
    };
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

  // Smooth word-level karaoke updates while playing (timeupdate alone is too coarse).
  useEffect(() => {
    if (!isPlaying) return;
    let raf = 0;
    let alive = true;
    const tick = () => {
      if (!alive) return;
      const a = audioRef.current;
      if (a) {
        setCurrentTime(a.currentTime);
        setProgress(a.duration ? a.currentTime / a.duration : 0);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, [isPlaying]);

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
    setCurrentTime(0);
  };

  const restart = () => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    setProgress(0);
    setCurrentTime(0);
    void a.play().catch(() => {});
  };

  return (
    <WomenScaledCanvas
      dir={dir}
      fitDeps={[lang]}
      bgClassName={`bg-[#fbf5eb] ${isRtlScript ? "font-noto-naskh" : ""}`}
      overlay={
        <button
          type="button"
          onClick={onBack}
          className={`land-detail-back ${detailBackButtonClassName} ${detailBackButtonSideClassName(dir)}`}
          aria-label="Back to The Land and Future"
        >
          <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
        </button>
      }
    >
      <main
        ref={rootRef}
        lang={lang}
        className={`m-0 w-full ${isRtlScript ? "font-noto-naskh" : ""}`}
        style={{ backgroundColor: PAPER, color: INK }}
      >
        {/* ---------- Soft parchment hero ---------- */}
        <section className="land-detail-hero relative w-full overflow-hidden" style={{ height: "760px" }}>
          <img
            src={anthemBg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 35%", opacity: 0.38 }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(251,245,235,0.55) 0%, rgba(251,245,235,0.72) 42%, rgba(251,245,235,0.96) 78%, #fbf5eb 100%)",
            }}
          />
          <div className="pointer-events-none absolute -right-8 top-10 opacity-[0.55]" aria-hidden>
            <KurdishSun size={300} />
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
            style={{ background: `linear-gradient(to top, ${PAPER} 0%, rgba(251,245,235,0) 100%)` }}
          />

          {/* Centered identity + player */}
          <div className="land-detail-intro relative z-10 flex h-full flex-col items-center px-20 pt-16 text-center">
            <Music2 size={28} strokeWidth={1.4} style={{ color: GOLD }} />
            <p
              className={`mt-3 ${displayFont} text-[15px] font-light uppercase tracking-[0.28em]`}
              style={{ color: GOLD }}
            >
              {t.eyebrow}
            </p>

            {/* Title ↔ subtitle (lyrics) swap */}
            <div className="relative mt-6 flex w-full max-w-[920px] flex-col items-center" style={{ minHeight: 210 }}>
              <div
                className="absolute inset-x-0 top-0 flex flex-col items-center transition-all duration-700 ease-out"
                style={{
                  opacity: showSubtitles ? 0 : 1,
                  transform: showSubtitles ? "translateY(-12px)" : "translateY(0)",
                  pointerEvents: showSubtitles ? "none" : "auto",
                }}
              >
                <h1
                  className="font-noto-naskh text-[76px] font-light leading-none tracking-tight"
                  style={{ color: INK }}
                  dir="rtl"
                >
                  {t.anthemName}
                </h1>
                {t.anthemLatin && (
                  <p className={`mt-3 ${displayFont} text-[28px] font-light italic tracking-wide`} style={{ color: GOLD }}>
                    {t.anthemLatin}
                  </p>
                )}
                <p className={`mt-4 max-w-[640px] ${displayFont} text-[19px] font-light leading-snug`} style={{ color: BODY }}>
                  {t.subtitle}
                </p>
              </div>

              <div
                className="absolute inset-x-0 top-0 flex flex-col items-center justify-center px-4 transition-all duration-700 ease-out"
                style={{
                  opacity: showSubtitles ? 1 : 0,
                  transform: showSubtitles ? "translateY(0)" : "translateY(16px)",
                  pointerEvents: showSubtitles ? "auto" : "none",
                  minHeight: 210,
                }}
                aria-live="polite"
                aria-atomic="true"
              >
                {karaoke ? (
                  <div
                    className={`w-full max-w-[900px] ${isRtlScript ? "font-noto-naskh" : displayFont}`}
                    dir={lang === "en" ? "ltr" : "rtl"}
                  >
                    {karaoke.map((line, lineIndex) => (
                      <p
                        key={`line-${lineIndex}`}
                        className={`flex flex-wrap items-baseline justify-center gap-x-3 gap-y-2 text-[36px] font-normal leading-snug ${
                          lineIndex > 0 ? "mt-4" : ""
                        }`}
                      >
                        {line.words.map((word, wordIndex) => (
                          <span
                            key={`w-${lineIndex}-${wordIndex}`}
                            className="inline-block animate-in fade-in slide-in-from-bottom-1 duration-300"
                            style={{
                              color: word.current ? GOLD : word.isPast ? BODY : INK,
                              fontWeight: word.current ? 500 : 300,
                              opacity: word.current ? 1 : word.isPast ? 0.72 : 1,
                              transition: "color 200ms ease, font-weight 200ms ease, opacity 200ms ease",
                            }}
                          >
                            {word.text}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 opacity-70">
                    <div className="h-1 w-40 overflow-hidden rounded-full bg-[#e7dcc4]">
                      <div
                        className="h-full rounded-full bg-[#c69237] transition-[width] duration-150 ease-linear"
                        style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
                      />
                    </div>
                    <p className={`${displayFont} text-[18px] font-light italic`} style={{ color: GOLD }}>
                      …
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Progress */}
            <div className="mt-2 h-1 w-48 overflow-hidden rounded-full bg-[#e7dcc4]/80">
              <div
                className="h-full rounded-full bg-[#c69237] transition-[width] duration-150 ease-linear"
                style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
              />
            </div>

            {/* Play controls */}
            <div className="mt-7 flex flex-col items-center">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? t.pause : t.play}
                className="grid h-[92px] w-[92px] place-items-center rounded-full bg-white shadow-[0_8px_28px_rgba(155,109,53,0.18)] transition-transform duration-300 hover:scale-[1.04]"
                style={{ border: "2px solid rgba(155,109,53,0.55)" }}
              >
                {isPlaying ? (
                  <Pause className="h-9 w-9" style={{ color: GOLD }} strokeWidth={1.6} />
                ) : (
                  <Play className="ml-1 h-9 w-9" style={{ color: GOLD }} strokeWidth={1.6} fill="currentColor" />
                )}
              </button>
              <p
                className={`mt-3 ${displayFont} text-[13px] font-light uppercase tracking-[0.22em]`}
                style={{ color: GOLD }}
              >
                {isPlaying ? t.pause : t.play}
              </p>

              <div className="mt-5 flex items-center gap-10">
                <button
                  type="button"
                  onClick={restart}
                  className="flex flex-col items-center gap-1.5 transition-opacity hover:opacity-80"
                  aria-label={t.restart}
                >
                  <span
                    className="grid h-11 w-11 place-items-center rounded-full bg-white/70"
                    style={{ border: "1px solid rgba(155,109,53,0.35)" }}
                  >
                    <RotateCcw className="h-4 w-4" style={{ color: GOLD }} />
                  </span>
                  <span className={`${displayFont} text-[11px] font-light uppercase tracking-[0.16em]`} style={{ color: GOLD }}>
                    {t.restart}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={stop}
                  className="flex flex-col items-center gap-1.5 transition-opacity hover:opacity-80"
                  aria-label={t.stop}
                >
                  <span
                    className="grid h-11 w-11 place-items-center rounded-full bg-white/70"
                    style={{ border: "1px solid rgba(155,109,53,0.35)" }}
                  >
                    <Square className="h-4 w-4" style={{ color: GOLD }} fill="currentColor" />
                  </span>
                  <span className={`${displayFont} text-[11px] font-light uppercase tracking-[0.16em]`} style={{ color: GOLD }}>
                    {t.stop}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Decorative gold arcs */}
        <div className="relative z-10 -mt-2 flex justify-center px-20" aria-hidden>
          <svg width="1100" height="28" viewBox="0 0 1100 28" fill="none" className="opacity-70">
            <path d="M40 22 C 280 2, 820 2, 1060 22" stroke="#d4b57a" strokeWidth="1.2" />
            <path d="M90 26 C 320 8, 780 8, 1010 26" stroke="#e2c89a" strokeWidth="1" />
          </svg>
        </div>

        {/* ---------- Content cards ---------- */}
        <div className="relative px-20 pb-16 pt-4">
          <div className="pointer-events-none absolute left-0 top-4 h-[720px] w-14 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="pointer-events-none absolute right-0 top-4 h-[720px] w-14 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* --- Title & Meaning --- */}
          <article
            className="land-detail-card mt-6 flex items-center gap-12 rounded-2xl border p-10"
            style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
          >
            <div className="min-w-0 flex-1">
              <div
                className={`flex items-center gap-2.5 ${displayFont} text-[20px] font-light tracking-[0.18em]`}
                style={{ color: GOLD }}
              >
                <Diamond size={12} fill="currentColor" /> {t.meaningTitle}
              </div>
              <p className="mt-6 text-[20px] font-light leading-[1.65]" style={{ color: BODY }}>
                {localize(t.meaningText)}
              </p>
            </div>
            <div
              className="relative flex h-[220px] w-[340px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-xl border text-center"
              style={{ borderColor: CARD_BORDER }}
            >
              <img
                src={anthemBg}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-[#fbf5eb]/75" />
              <div className="relative z-10 flex flex-col items-center px-4">
                <span className="font-noto-naskh text-[48px] font-light leading-none text-[#17233b]" dir="rtl">
                  ئەی ڕەقیب
                </span>
                <DiamondDivider className="my-4" />
                <span className={`${displayFont} text-[32px] font-light`} style={{ color: "#b3543f" }}>
                  {t.meaningPhrase}
                </span>
              </div>
            </div>
          </article>

          {/* --- The Writer --- */}
          <article
            className="land-detail-panel mt-10 flex items-center gap-12 rounded-2xl border p-10"
            style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
          >
            <div
              className="flex h-[220px] w-[240px] shrink-0 flex-col items-center justify-center rounded-xl border bg-white text-center"
              style={{ borderColor: CARD_BORDER }}
            >
              <span
                className="grid h-[72px] w-[72px] place-items-center rounded-full border"
                style={{ borderColor: CARD_BORDER }}
              >
                <Feather size={34} strokeWidth={1.4} style={{ color: GOLD }} />
              </span>
              <span className={`mt-4 ${displayFont} text-[34px] font-light leading-none`} style={{ color: INK }}>
                {t.writerName}
              </span>
              <span className="mt-2 px-3 text-[15px] font-light" style={{ color: BODY }}>
                {t.writerSub}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div
                className={`flex items-center gap-2.5 ${displayFont} text-[20px] font-light tracking-[0.18em]`}
                style={{ color: GOLD }}
              >
                <Feather size={16} strokeWidth={1.5} /> {t.writerTitle}
              </div>
              <div className="mt-5 flex items-center gap-4">
                <span
                  className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[10px] border bg-white"
                  style={{ borderColor: CARD_BORDER }}
                >
                  <Calendar size={26} strokeWidth={1.5} style={{ color: "#b3543f" }} />
                </span>
                <span className={`${yearFont} text-[64px] font-light leading-none tracking-tight`} style={{ color: INK }}>
                  {localize(WRITER_YEAR)}
                </span>
              </div>
              <p className="mt-5 text-[19px] font-light leading-[1.65]" style={{ color: BODY }}>
                {localize(t.writerText)}
              </p>
            </div>
          </article>

          {/* --- Historical Role --- */}
          <article
            className="land-detail-card mt-10 flex items-center gap-12 rounded-2xl border p-10"
            style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
          >
            <div className="min-w-0 flex-1">
              <div
                className={`flex items-center gap-2.5 ${displayFont} text-[20px] font-light tracking-[0.18em]`}
                style={{ color: GOLD }}
              >
                <Landmark size={18} strokeWidth={1.5} /> {t.roleTitle}
              </div>
              <div className="mt-5 flex items-center gap-4">
                <span
                  className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[10px] border bg-white"
                  style={{ borderColor: CARD_BORDER }}
                >
                  <Calendar size={26} strokeWidth={1.5} style={{ color: "#2f7d4f" }} />
                </span>
                <span className={`${yearFont} text-[64px] font-light leading-none tracking-tight`} style={{ color: INK }}>
                  {localize(ROLE_YEAR)}
                </span>
              </div>
              <p className="mt-5 max-w-[560px] text-[19px] font-light leading-[1.65]" style={{ color: BODY }}>
                {localize(t.roleText)}
              </p>
            </div>
            <div
              className="w-[380px] shrink-0 overflow-hidden rounded-lg border bg-white shadow-sm"
              style={{ borderColor: CARD_BORDER }}
            >
              <img
                src={historyImg}
                alt="The Republic of Mahabad"
                className="h-[220px] w-full object-cover grayscale contrast-110"
              />
              <div className="flex items-center justify-center gap-2 px-4 py-3">
                <KurdishSun size={14} />
                <p className={`${displayFont} text-[13px] font-light uppercase tracking-[0.12em]`} style={{ color: BODY }}>
                  {t.adopted}
                </p>
                <KurdishSun size={14} />
              </div>
            </div>
          </article>
        </div>

        <audio ref={audioRef} src={anthemAudio} preload="metadata" />
      </main>
    </WomenScaledCanvas>
  );
}
