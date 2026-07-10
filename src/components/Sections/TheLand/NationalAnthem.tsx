import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Calendar, Diamond, Feather, Music2 } from "lucide-react";
import { useLandDetailAnimation } from "@/components/Sections/TheLand/useLandDetailAnimation";
import {
  detailBackButtonClassName,
  detailBackButtonSideClassName,
  detailBackIconClassName,
  detailBackIconSize,
} from "@/constants/backNavigation";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import historyImg from "@/assets/images/mahabad.webp";

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
  the: string;
  title: string;
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
  writerYear: string;
  writerText: string;
  roleTitle: string;
  roleYear: string;
  roleText: string;
  adopted: string;
};

const COPY: Record<"en" | "ku" | "ar", Copy> = {
  en: {
    the: "The",
    title: "National\nAnthem",
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
    writerYear: "1938",
    roleYear: "1946",
    writerText:
      "The lyrics were written by Dildar, the pen name of Yûnis Rauf, a Kurdish poet and patriot. He composed Ey Reqîb in 1938 while in prison, transforming hardship into one of the most enduring songs of Kurdish national identity.",
    roleTitle: "HISTORICAL ROLE",
    roleText:
      "Ey Reqîb was adopted in 1946 by the Republic of Mahabad and later became the official anthem of the Kurdistan Region. Over time, it came to represent Kurdish identity, perseverance, and the shared national spirit of Kurds everywhere.",
    adopted: "Adopted by the Republic of Mahabad",
  },
  ku: {
    the: "",
    title: "سروودی\nنیشتمانی",
    anthemName: "ئەی ڕەقیب",
    subtitle: "هێمایەکی نەمر بۆ ناسنامە، خۆڕاگری، و ئازادی.",
    intro:
      "«ئەی ڕەقیب» سروودی نیشتمانیی گەلی کورد و سروودی فەرمیی هەرێمی کوردستانە. لە ساڵی ١٩٣٨ لەلایەن شاعیر (دڵدار)ەوە نووسراوە و بووەتە هێمایەکی نەمر بۆ ناسنامە، خۆڕاگری، ئازادی و شکۆی نەتەوەیی.",
    meaningTitle: "ناو و واتا",
    meaningPhrase: "«ئەی دوژمن!»",
    meaningText:
      "وشەی «ئەی ڕەقیب» بە مانای «ئەی دوژمن!» دێت. ئەم سروودە ڕوو لەو لایەن و کەسانە دەکات کە نکوڵییان لە بوونی کورد کردووە، و بووەتە پەیامێک و ڕاگەیاندنێکی بەهێز بۆ سەلماندنی ئەوەی کە گەلی کورد هەمیشە زیندوو، یەکگرتوو و نەبەزە.",
    writerTitle: "نووسەر",
    writerName: "دڵدار",
    writerSub: "نازناوی یونس ڕەئووف",
    writerYear: "١٩٣٨",
    roleYear: "١٩٤٦",
    writerText:
      "ئەم هۆنراوەییە لەلایەن (دڵدار)ەوە نووسراوە، کە نازناوی شاعیر و نیشتمانپەروەری کورد (یونس ڕەئووف)ـە. دڵدار ئەم سروودەی لە ساڵی ١٩٣٨ و لە کاتی زینداندا هۆنیوەتەوە. بەم جۆرەش ئازارەکانی زیندانی گۆڕی بۆ یەکێک لە نەمرترین سروودەکانی گوزارشتکردن لە ناسنامەی نەتەوەیی کورد.",
    roleTitle: "ڕۆڵی مێژوویی",
    roleText:
      "لە ساڵی ١٩٤٦، کۆماری کوردستان لە مەهاباد «ئەی ڕەقیب»ی وەک سروودی نیشتمانی پەسەند کرد و دواتریش بوو بە سروودی فەرمیی هەرێمی کوردستان. بە تێپەڕبوونی کات، ئەم سروودە بووەتە نوێنەری ناسنامەی کوردی، کۆڵنەدان و گیانی هاوبەشی نەتەوەیی لە نێوان کوردانی سەرتاسەری جیهاندا.",
    adopted: "لەلایەن کۆماری مەهابادەوە پەسەند کرا",
  },
  ar: {
    the: "",
    title: "النشيد\nالوطني",
    anthemName: "أي رقيب",
    subtitle: "رمز خالد للهوية والصمود والحرية.",
    intro:
      "«أي رقيب» هو النشيد الوطني للشعب الكردي والنشيد الرسمي لإقليم كردستان. كُتب عام ١٩٣٨ بقلم الشاعر (دلدار)، وأصبح رمزاً خالداً للهوية، والصمود، والحرية، والكرامة الوطنية.",
    meaningTitle: "العنوان والمعنى",
    meaningPhrase: "«أيها العدو!»",
    meaningText:
      "كلمة «أي رقيب» تعني «أيها العدو!». يُخاطب هذا النشيد الأطراف والأشخاص الذين أنكروا الوجود الكردي، وقد أصبح رسالة وإعلاناً قوياً يثبت أن الشعب الكردي سيظل دائماً حياً، ومتحداً، وعصياً على الانكسار.",
    writerTitle: "المؤلف",
    writerName: "دلدار",
    writerSub: "الاسم المستعار ليونس رؤوف",
    writerYear: "١٩٣٨",
    roleYear: "١٩٤٦",
    writerText:
      "كُتبت هذه القصيدة بقلم (دلدار)، وهو الاسم المستعار للشاعر والوطني الكردي (يونس رؤوف). نظم دلدار هذا النشيد عام ١٩٣٨ أثناء فترة سجنه. وبذلك، حوّل آلام السجن إلى واحد من أخلد الأناشيد التي تعبر عن الهوية الوطنية الكردية.",
    roleTitle: "الدور التاريخي",
    roleText:
      "في عام ١٩٤٦، اعتمدت جمهورية كردستان في مهاباد «أي رقيب» كنشيداً وطنياً لها، وأصبح لاحقاً النشيد الرسمي لإقليم كردستان. وبمرور الوقت، غدا هذا النشيد ممثلاً للهوية الكردية، والمثابرة، والروح الوطنية المشتركة بين الكرد في جميع أنحاء العالم.",
    adopted: "اعتمدته جمهورية مهاباد",
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

  // Fixed 1080px-wide portrait design canvas, scaled to fit the viewport in both
  // dimensions — identical approach to the Kurdistan Flag detail page.
  const DESIGN_WIDTH = 1080;
  const canvasRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, x: 0 });

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

  return (
    <div
      ref={rootRef as React.RefObject<HTMLDivElement>}
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
          {/* ---------- Hero ---------- */}
          <section className="relative w-full overflow-hidden px-16 pt-16 pb-8">
            <div className="pointer-events-none absolute end-0 top-0 h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

            <div className="relative flex items-center gap-10">
              <div className="land-detail-intro min-w-0 flex-1">
                {t.the && (
                  <span className={`${displayFont} text-[42px] font-light leading-none`} style={{ color: INK }}>
                    {t.the}
                  </span>
                )}
                <h1
                  className={`${displayFont} mt-1 whitespace-pre-line text-[76px] font-light leading-[0.98] tracking-tight`}
                  style={{ color: INK }}
                >
                  {t.title}
                </h1>

                <div className="mt-5 flex items-center gap-3 text-[#c8a35f]">
                  <span className="h-px w-14 bg-current" />
                  <Diamond size={11} fill="currentColor" />
                </div>

                <h2 className={`mt-5 ${displayFont} text-[25px] font-light leading-snug`} style={{ color: GOLD }}>
                  {t.subtitle}
                </h2>

                <p className="mt-5 max-w-[430px] text-[18px] font-light leading-[1.65]" style={{ color: BODY }}>
                  {t.intro}
                </p>
              </div>

              {/* Anthem emblem */}
              <div className="land-detail-hero relative flex h-[360px] w-[360px] shrink-0 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-[#e2d3b2]" />
                <div className="absolute inset-6 rounded-full border border-[#e9dcc0]" />
                <div
                  className="flex h-[300px] w-[300px] flex-col items-center justify-center rounded-full text-center shadow-[0_18px_45px_rgba(84,54,16,0.18)]"
                  style={{ backgroundColor: INK }}
                >
                  <Music2 size={44} strokeWidth={1.4} className="text-[#e6c877]" />
                  <span className="mt-3 font-noto-naskh text-[52px] font-light leading-none text-[#f7edd7]" dir="rtl">
                    {t.anthemName}
                  </span>
                  {t.anthemLatin && (
                    <span className="mt-3 text-[22px] font-light italic tracking-wide text-[#d9c093]">
                      {t.anthemLatin}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ---------- Content ---------- */}
          <div className="relative px-16 pb-14 pt-4">
            <div className="pointer-events-none absolute left-0 top-4 h-[720px] w-14 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="pointer-events-none absolute right-0 top-4 h-[720px] w-14 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:20px_20px]" />

            {/* --- Title & Meaning --- */}
            <article
              className="land-detail-card flex items-center gap-10 rounded-2xl border p-9"
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
                  {t.meaningText}
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
                  <span className={`${displayFont} text-[64px] font-light leading-none tracking-tight`} style={{ color: INK }}>
                    {t.writerYear}
                  </span>
                </div>
                <p className="mt-5 text-[18px] font-light leading-[1.65]" style={{ color: BODY }}>
                  {t.writerText}
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
                  <span className={`${displayFont} text-[64px] font-light leading-none tracking-tight`} style={{ color: INK }}>
                    {t.roleYear}
                  </span>
                </div>
                <p className="mt-5 max-w-[460px] text-[18px] font-light leading-[1.65]" style={{ color: BODY }}>
                  {t.roleText}
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
    </div>
  );
}
