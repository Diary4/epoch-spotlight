import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Calendar, Diamond, Feather, Music2, Pause, Play, RotateCcw, Square } from "lucide-react";
import { useLandDetailAnimation } from "@/components/Sections/TheLand/useLandDetailAnimation";
import {
  detailBackButtonClassName,
  detailBackButtonSideClassName,
  detailBackIconClassName,
  detailBackIconSize,
} from "@/constants/backNavigation";
import { discoverDisplayFont, discoverRtlScript, discoverYearFont } from "@/components/Sections/discoverLanguage";
import { localizeDigits } from "@/lib/utils";
import historyImg from "@/assets/images/mahabad.webp";
import anthemBg from "@/assets/images/kurdistan.webp";
import anthemVideo from "@/assets/videos/flag.mp4";
import anthemAudio from "@/assets/audio/national-anthem.mp3";
import { getAnthemLyricAt, type AnthemLang } from "@/data/nationalAnthemLyrics";

const WRITER_YEAR = "1938";
const ROLE_YEAR = "1946";

const PAPER = "#fbf5eb";
const GOLD = "#9b6d35";
const INK = "#17233b";
const BODY = "#35435b";
const CARD_BG = "#f7f1e3";
const CARD_BORDER = "#e7dcc4";

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
  intro: string;
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
    subtitle: "A lasting symbol of identity, resilience, and freedom.",
    intro:
      "Ey Reqîb is the national anthem of the Kurdish people and the official anthem of the Kurdistan Region. Written in 1938 by the poet Dildar, it became a lasting symbol of identity, resilience, freedom, and national dignity.",
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
    subtitle: "هێمایەکی نەمر بۆ ناسنامە، خۆڕاگری، و ئازادی.",
    intro:
      "«ئەی ڕەقیب» سروودی نیشتمانیی گەلی کورد و سروودی فەرمیی هەرێمی کوردستانە. لە ساڵی 1938 لەلایەن شاعیر (دڵدار)ەوە نووسراوە و بووەتە هێمایەکی نەمر بۆ ناسنامە، خۆڕاگری، ئازادی و شکۆی نەتەوەیی.",
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
    subtitle: "رمز خالد للهوية والصمود والحرية.",
    intro:
      "«أي رقيب» هو النشيد الوطني للشعب الكردي والنشيد الرسمي لإقليم كردستان. كُتب عام 1938 بقلم الشاعر (دلدار)، وأصبح رمزاً خالداً للهوية، والصمود، والحرية، والكرامة الوطنية.",
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

  // Fixed 1080px-wide portrait design canvas, scaled to fit the viewport in both dimensions.
  const DESIGN_WIDTH = 1080;
  const canvasRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, x: 0 });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const activeLyrics = getAnthemLyricAt(currentTime, lang as AnthemLang);
  const showLyrics = currentTime >= 7.4 && activeLyrics !== null;

  useEffect(() => {
    const recompute = () => {
      const el = canvasRef.current;
      if (!el) return;
      const naturalHeight = el.offsetHeight;
      if (!naturalHeight) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scale = Math.min(vw / DESIGN_WIDTH, vh / naturalHeight);
      const x = (vw - DESIGN_WIDTH * scale) / 2;
      setFit({ scale, x });
    };

    recompute();
    window.addEventListener("resize", recompute);
    const el = canvasRef.current;
    const ro = el ? new ResizeObserver(recompute) : null;
    if (el && ro) ro.observe(el);
    return () => {
      window.removeEventListener("resize", recompute);
      ro?.disconnect();
    };
  }, [lang]);

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
    <div
      ref={rootRef as React.RefObject<HTMLDivElement>}
      lang={lang}
      dir={dir}
      className={`relative h-screen w-screen overflow-hidden ${isRtlScript ? "font-noto-naskh" : ""}`}
      style={{ width: "100vw", height: "100vh", backgroundColor: PAPER }}
    >
      <button
        type="button"
        onClick={onBack}
        className={`land-detail-back ${detailBackButtonClassName} ${detailBackButtonSideClassName(dir)}`}
        aria-label="Back to The Land and Future"
      >
        <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
      </button>

      <div
        ref={canvasRef}
        style={{
          width: `${DESIGN_WIDTH}px`,
          transform: `translate(${fit.x}px, 0px) scale(${fit.scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: PAPER,
        }}
      >
        <main className="m-0 w-full" style={{ backgroundColor: PAPER, color: INK }}>
          {/* ---------- Cinematic hero (Prime-Minister style) ---------- */}
          <section className="relative w-full overflow-hidden" style={{ height: "660px" }}>
            <video
              className="land-detail-hero absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center 30%" }}
              src={anthemVideo}
              poster={anthemBg}
              autoPlay
              loop
              muted
              playsInline
            />
            {/* Cinematic scrim + fade into the cream content below */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: isRtlScript
                  ? "linear-gradient(to left, rgba(6,9,15,0.82) 0%, rgba(6,9,15,0.45) 42%, rgba(6,9,15,0.12) 100%)"
                  : "linear-gradient(to right, rgba(6,9,15,0.82) 0%, rgba(6,9,15,0.45) 42%, rgba(6,9,15,0.12) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
              style={{ background: `linear-gradient(to top, ${PAPER} 0%, rgba(251,245,235,0) 100%)` }}
            />

            {/* Music card + synced lyrics */}
            <div
              className={`absolute bottom-16 z-10 flex w-[calc(100%-7rem)] items-stretch gap-5 ${
                isRtlScript ? "right-14 flex-row-reverse" : "left-14"
              }`}
            >
              {/* Glass identity card */}
              <div className={`land-detail-intro w-[480px] shrink-0 ${isRtlScript ? "text-right" : "text-left"}`}>
                <div
                  className="rounded-2xl p-8 shadow-2xl"
                  style={{
                    background: "rgba(10,14,22,0.68)",
                    backdropFilter: "blur(18px)",
                    border: "1px solid rgba(201,154,85,0.28)",
                  }}
                >
                {/* Eyebrow */}
                <div className={`flex items-center gap-2 ${isRtlScript ? "flex-row-reverse" : ""}`}>
                  <span className="h-px w-8 bg-[#c69237]/70" />
                  <Music2 size={16} className="text-[#e6c98f]" strokeWidth={1.6} />
                  <p className={`${displayFont} text-[15px] font-light uppercase tracking-[0.22em] text-[#e6c98f]`}>
                    {t.eyebrow}
                  </p>
                </div>

                {/* Anthem name */}
                <h1
                  className="mt-3 font-noto-naskh text-[64px] font-light leading-none tracking-tight text-white"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.45)" }}
                  dir="rtl"
                >
                  {t.anthemName}
                </h1>
                {t.anthemLatin && (
                  <p className="mt-2 text-[22px] font-light italic tracking-wide text-[#d9c093]">{t.anthemLatin}</p>
                )}

                <p className={`mt-3 ${displayFont} text-[19px] font-light leading-snug text-white/90`}>{t.subtitle}</p>

                <div className="my-5 h-px w-full bg-gradient-to-r from-[#c69237]/60 via-white/25 to-transparent" />

                {/* Progress bar */}
                <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-[#e6c98f] transition-[width] duration-150 ease-linear"
                    style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
                  />
                </div>

                {/* Audio controls */}
                <div className={`flex items-center gap-3 ${isRtlScript ? "flex-row-reverse" : ""}`}>
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="group flex items-center justify-center gap-3 rounded-full px-6 py-3 text-[14px] font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:scale-[1.02]"
                    style={{ background: "rgba(198,146,55,0.22)", border: "1px solid rgba(201,154,85,0.5)" }}
                  >
                    {isPlaying ? <Pause className="h-4 w-4 text-[#e6c98f]" /> : <Play className="h-4 w-4 text-[#e6c98f]" />}
                    <span>{isPlaying ? t.pause : t.play}</span>
                  </button>

                  <button
                    type="button"
                    onClick={restart}
                    aria-label={t.restart}
                    title={t.restart}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white transition-all duration-300 hover:scale-[1.05]"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(201,154,85,0.4)" }}
                  >
                    <RotateCcw className="h-4 w-4 text-[#e6c98f]" />
                  </button>

                  <button
                    type="button"
                    onClick={stop}
                    aria-label={t.stop}
                    title={t.stop}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white transition-all duration-300 hover:scale-[1.05]"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(201,154,85,0.4)" }}
                  >
                    <Square className="h-4 w-4 text-[#e6c98f]" fill="currentColor" />
                  </button>
                </div>
              </div>
              </div>

              {/* Synced lyrics */}
              <div
                className={`flex min-w-0 flex-1 items-center transition-opacity duration-500 ${
                  showLyrics ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                aria-live="polite"
                aria-atomic="true"
              >
                {activeLyrics && (
                  <div
                    className={`w-full rounded-2xl px-7 py-6 shadow-2xl ${
                      isRtlScript ? "font-noto-naskh text-right" : `${displayFont} text-left`
                    }`}
                    style={{
                      background: "rgba(10,14,22,0.68)",
                      backdropFilter: "blur(18px)",
                      border: "1px solid rgba(201,154,85,0.28)",
                    }}
                  >
                    <div
                      key={activeLyrics[0]}
                      className="animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out"
                    >
                      <p
                        className="text-[28px] font-normal leading-snug text-white"
                        dir={lang === "en" ? "ltr" : "rtl"}
                      >
                        {activeLyrics[0]}
                      </p>
                      <p
                        className="mt-3 text-[28px] font-normal leading-snug text-white"
                        dir={lang === "en" ? "ltr" : "rtl"}
                      >
                        {activeLyrics[1]}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ---------- Content ---------- */}
          <div className="relative px-16 pb-14 pt-6">
            <div className="pointer-events-none absolute left-0 top-4 h-[720px] w-14 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="pointer-events-none absolute right-0 top-4 h-[720px] w-14 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:20px_20px]" />

            {/* Intro paragraph */}
            <p className="land-detail-intro mx-auto max-w-[820px] text-center text-[19px] font-light leading-[1.7]" style={{ color: BODY }}>
              {localize(t.intro)}
            </p>

            {/* --- Title & Meaning --- */}
            <article
              className="land-detail-card mt-10 flex items-center gap-10 rounded-2xl border p-9"
              style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
            >
              <div className="min-w-0 flex-1">
                <div
                  className={`flex items-center gap-2.5 ${displayFont} text-[20px] font-light tracking-[0.18em]`}
                  style={{ color: GOLD }}
                >
                  <Diamond size={12} fill="currentColor" /> {t.meaningTitle}
                </div>
                <p className="mt-6 text-[19px] font-light leading-[1.65]" style={{ color: BODY }}>
                  {localize(t.meaningText)}
                </p>
              </div>
              <div
                className="flex h-[190px] w-[300px] shrink-0 flex-col items-center justify-center rounded-xl border text-center"
                style={{ backgroundColor: "#fff", borderColor: CARD_BORDER }}
              >
                <span className="font-noto-naskh text-[46px] font-light leading-none text-[#17233b]" dir="rtl">
                  ئەی ڕەقیب
                </span>
                <DiamondDivider className="my-4" />
                <span className={`${displayFont} text-[30px] font-light`} style={{ color: "#b3543f" }}>
                  {t.meaningPhrase}
                </span>
              </div>
            </article>

            {/* --- The Writer --- */}
            <article
              className="land-detail-panel mt-10 flex items-center gap-10 rounded-2xl border p-9"
              style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
            >
              <div
                className="flex h-[190px] w-[300px] shrink-0 flex-col items-center justify-center rounded-xl border text-center"
                style={{ backgroundColor: "#fff", borderColor: CARD_BORDER }}
              >
                <span className="grid h-[64px] w-[64px] place-items-center rounded-full border" style={{ borderColor: CARD_BORDER }}>
                  <Feather size={30} strokeWidth={1.5} style={{ color: GOLD }} />
                </span>
                <span className={`mt-4 ${displayFont} text-[34px] font-light leading-none`} style={{ color: INK }}>
                  {t.writerName}
                </span>
                <span className="mt-2 text-[16px] font-light" style={{ color: BODY }}>
                  {t.writerSub}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className={`flex items-center gap-2.5 ${displayFont} text-[20px] font-light tracking-[0.18em]`}
                  style={{ color: GOLD }}
                >
                  <Diamond size={12} fill="currentColor" /> {t.writerTitle}
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
                <p className="mt-5 text-[18px] font-light leading-[1.65]" style={{ color: BODY }}>
                  {localize(t.writerText)}
                </p>
              </div>
            </article>

            {/* --- Historical Role --- */}
            <article
              className="land-detail-card mt-10 flex items-center gap-10 rounded-2xl border p-9"
              style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
            >
              <div className="min-w-0 flex-1">
                <div
                  className={`flex items-center gap-2.5 ${displayFont} text-[20px] font-light tracking-[0.18em]`}
                  style={{ color: GOLD }}
                >
                  <Diamond size={12} fill="currentColor" /> {t.roleTitle}
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
                <p className="mt-5 max-w-[460px] text-[18px] font-light leading-[1.65]" style={{ color: BODY }}>
                  {localize(t.roleText)}
                </p>
              </div>
              <div
                className="w-[340px] shrink-0 overflow-hidden rounded-lg border bg-white shadow-sm"
                style={{ borderColor: CARD_BORDER }}
              >
                <img
                  src={historyImg}
                  alt="The Republic of Mahabad"
                  className="h-[230px] w-full object-cover grayscale contrast-110"
                />
                <p className="px-4 py-3 text-center text-[14px] font-light" style={{ color: BODY }}>
                  {t.adopted}
                </p>
              </div>
            </article>
          </div>
        </main>
      </div>

      <audio ref={audioRef} src={anthemAudio} preload="metadata" />
    </div>
  );
}
