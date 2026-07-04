import React, { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, Calendar, Diamond } from "lucide-react";
import { useLandDetailAnimation } from "@/components/Sections/TheLand/useLandDetailAnimation";
import {
  detailBackButtonClassName,
  detailBackButtonSideClassName,
  detailBackIconClassName,
  detailBackIconSize,
} from "@/constants/backNavigation";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import heroImg from "@/assets/images/kurdistan.webp";
import historyImg from "@/assets/images/thejourney/1991.webp";

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

/* Row of five linked figures for the Unity card */
function UnityFigures({ className = "" }: { className?: string }) {
  const xs = [26, 73, 120, 167, 214];
  return (
    <svg viewBox="0 0 240 66" className={className} aria-hidden="true">
      {xs.slice(0, -1).map((x, i) => (
        <path
          key={x}
          d={`M${x + 10} 33 Q${(x + xs[i + 1]) / 2} 46 ${xs[i + 1] - 10} 33`}
          fill="none"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      ))}
      {xs.map((x) => (
        <g key={x} transform={`translate(${x} 0)`} fill="currentColor">
          <circle cx="0" cy="12" r="8" />
          <path d="M0 23 C7 23 11.5 27 12.5 33 L9 62 H3.5 L1.6 42 H-1.6 L-3.5 62 H-9 L-12.5 33 C-11.5 27 -7 23 0 23 Z" />
        </g>
      ))}
    </svg>
  );
}

/* Line drawing of mountains, citadel, and minaret for the Heritage card */
function HeritageSkyline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 440 116"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 102 L46 48 L74 80 L112 32 L152 92 L184 58 L214 94" />
      <path d="M214 94 L240 68 L264 94" />
      <path d="M264 102 V76 H278 V66 H290 V76 H304 V102" />
      <path d="M308 102 V72 Q322 54 336 72 V102" />
      <path d="M352 102 V38 Q356 28 360 38 V102" />
      <path d="M349 48 H363" />
      <path d="M364 102 L398 60 L434 102" />
      <path d="M0 102 H440" strokeWidth="1.5" />
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
  the: string;
  title: string;
  subtitle: string;
  intro: string;
  history: string;
  historyText: string;
  colorsTitle: string;
  colors: { name: string; nameColor: string; swatch: "red" | "white" | "green" | "sun"; text: string }[];
  unity: string;
  unityText: string;
  heritage: string;
  heritageText: string;
};

const COPY: Record<"en" | "ku" | "ar", Copy> = {
  en: {
    the: "The",
    title: "Kurdistan\nFlag",
    subtitle: "A Symbol of Identity, Unity and Hope",
    intro:
      "The Kurdistan Flag embodies the aspirations, history, and cultural heritage of the Kurdish people. It represents peace, freedom, and the enduring spirit of a nation.",
    history: "HISTORY",
    historyText:
      "The flag was adopted on 17 December 1946 in Mahabad (the Republic of Mahabad) as the official flag of Kurdistan.",
    colorsTitle: "COLORS & SYMBOLISM",
    colors: [
      { name: "RED", nameColor: "#c43a2c", swatch: "red", text: "Sacrifice and the struggle for freedom." },
      { name: "WHITE", nameColor: "#3f4a5a", swatch: "white", text: "Peace and truth." },
      { name: "GREEN", nameColor: "#2f8a46", swatch: "green", text: "Nature, wealth, and the land of Kurdistan." },
      { name: "SUN", nameColor: "#d08b1f", swatch: "sun", text: "Life, energy, and the eternal light of hope." },
    ],
    unity: "UNITY",
    unityText:
      "The flag unites Kurds across all parts of Kurdistan and the diaspora, beyond political and geographical boundaries.",
    heritage: "A LIVING HERITAGE",
    heritageText:
      "More than a flag, it is a living heritage that continues to inspire future generations to build a peaceful and prosperous Kurdistan.",
  },
  ku: {
    the: "",
    title: "ئاڵای\nکوردستان",
    subtitle: "هێمای ناسنامە و یەکگرتوویی و هیوا",
    intro:
      "ئاڵای کوردستان ئاوات و مێژوو و کەلتووری گەلی کورد لەخۆدەگرێت. نوێنەرایەتی ئاشتی و ئازادی و ڕۆحی بەردەوامی نەتەوەیەک دەکات.",
    history: "مێژوو",
    historyText:
      "ئاڵاکە لە ١٧ی کانوونی یەکەمی ١٩٤٦ لە مەهاباد (کۆماری مەهاباد) وەک ئاڵای فەرمی کوردستان پەسەند کرا.",
    colorsTitle: "ڕەنگەکان و هێماکانیان",
    colors: [
      { name: "سوور", nameColor: "#c43a2c", swatch: "red", text: "قوربانی و خەبات بۆ ئازادی." },
      { name: "سپی", nameColor: "#3f4a5a", swatch: "white", text: "ئاشتی و ڕاستی." },
      { name: "سەوز", nameColor: "#2f8a46", swatch: "green", text: "سروشت و سامان و خاکی کوردستان." },
      { name: "خۆر", nameColor: "#d08b1f", swatch: "sun", text: "ژیان و وزە و ڕووناکی هەمیشەیی هیوا." },
    ],
    unity: "یەکگرتوویی",
    unityText:
      "ئاڵاکە کوردەکان لە هەموو بەشەکانی کوردستان و دیاسپۆرا کۆدەکاتەوە، لە سەرووی سنوورە سیاسی و جوگرافییەکانەوە.",
    heritage: "میراتێکی زیندوو",
    heritageText:
      "زیاتر لە ئاڵایەک، میراتێکی زیندووە کە بەردەوام نەوەکانی داهاتوو هاندەدات بۆ بنیادنانی کوردستانێکی ئاشتیخواز و گەشەسەندوو.",
  },
  ar: {
    the: "",
    title: "علم\nكوردستان",
    subtitle: "رمز الهوية والوحدة والأمل",
    intro:
      "يجسّد علم كوردستان تطلعات الشعب الكوردي وتاريخه وتراثه الثقافي، ويمثل السلام والحرية وروح أمةٍ لا تلين.",
    history: "التاريخ",
    historyText: "اعتُمد العلم في ١٧ كانون الأول ١٩٤٦ في مهاباد (جمهورية مهاباد) علمًا رسميًا لكوردستان.",
    colorsTitle: "الألوان والرموز",
    colors: [
      { name: "الأحمر", nameColor: "#c43a2c", swatch: "red", text: "التضحية والنضال من أجل الحرية." },
      { name: "الأبيض", nameColor: "#3f4a5a", swatch: "white", text: "السلام والحق." },
      { name: "الأخضر", nameColor: "#2f8a46", swatch: "green", text: "الطبيعة والثروة وأرض كوردستان." },
      { name: "الشمس", nameColor: "#d08b1f", swatch: "sun", text: "الحياة والطاقة ونور الأمل الأبدي." },
    ],
    unity: "الوحدة",
    unityText: "يوحّد العلم الكورد في جميع أجزاء كوردستان والمهجر، متجاوزًا الحدود السياسية والجغرافية.",
    heritage: "إرث حي",
    heritageText: "أكثر من علم؛ إنه إرث حي يواصل إلهام الأجيال القادمة لبناء كوردستان مسالمة ومزدهرة.",
  },
};

type KurdistanFlagPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

export default function KurdistanFlagPage({ lang = "en", onBack }: KurdistanFlagPageProps) {
  const rootRef = useLandDetailAnimation([lang]);
  const dir = lang === "en" ? "ltr" : "rtl";
  const isRtlScript = discoverRtlScript(lang);
  const displayFont = discoverDisplayFont(lang);
  const t = COPY[lang];

  // Fixed design canvas (1080px wide, ~1900px tall). We measure its natural
  // height and scale the whole canvas to fit the viewport in BOTH dimensions,
  // then center it horizontally and anchor it to the top, so the page renders
  // 1:1 on a 1080x1920 portrait screen and scales cleanly everywhere else.
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
        }}
      >
        <main className="m-0 w-full" style={{ backgroundColor: PAPER, color: INK }}>
          {/* ---------- Hero: flag photo with sweeping paper curve ---------- */}
          <section className="relative h-[640px] w-full overflow-hidden">
            <div className="land-detail-hero absolute inset-0">
              <img
                src={heroImg}
                alt="The Kurdistan flag flying at sunset"
                className="h-full w-full object-cover object-[72%_30%] rtl:object-[28%_30%]"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
                style={{ background: `linear-gradient(to bottom, transparent, ${PAPER})` }}
              />
            </div>

            {/* Paper panel with gold-edged curve */}
            <div className="pointer-events-none absolute inset-y-0 start-0 h-full w-[600px] rtl:-scale-x-100">
              <svg viewBox="0 0 600 640" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
                <path d="M0 0 H462 C572 92 408 310 536 640 H0 Z" fill={PAPER} />
                <path d="M462 0 C572 92 408 310 536 640" fill="none" stroke="#d9b477" strokeWidth="2.5" />
              </svg>
            </div>

            {/* Knot ornament on the curve */}
            <div className="land-detail-extra absolute top-[218px] start-[450px] text-[#c8a35f]">
              <div className="relative h-10 w-10">
                <span className="absolute inset-0 rotate-45 rounded-[4px] border-2 border-current" />
                <span className="absolute inset-[7px] rotate-45 rounded-[3px] border-2 border-current" />
              </div>
            </div>

            <div className="land-detail-intro relative z-10 flex h-full max-w-[470px] flex-col justify-start px-14 pt-14">
              {t.the && (
                <span className={`${displayFont} text-[42px] font-light leading-none`} style={{ color: INK }}>
                  {t.the}
                </span>
              )}
              <h1
                className={`${displayFont} mt-1 whitespace-pre-line text-[82px] font-light leading-[0.98] tracking-tight`}
                style={{ color: INK }}
              >
                {t.title}
              </h1>

              <div className="mt-5 flex items-center gap-3 text-[#c8a35f]">
                <span className="h-px w-14 bg-current" />
                <Diamond size={11} fill="currentColor" />
              </div>

              <h2 className={`mt-5 ${displayFont} text-[26px] font-light leading-snug`} style={{ color: GOLD }}>
                {t.subtitle}
              </h2>

              <p className="mt-5 max-w-[360px] text-[18px] font-light leading-[1.65]" style={{ color: BODY }}>
                {t.intro}
              </p>
            </div>
          </section>

          {/* ---------- Content ---------- */}
          <div className="relative px-16 pb-12 pt-8">
            {/* Side lattice ornaments */}
            <div className="pointer-events-none absolute left-0 top-[430px] h-[560px] w-16 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="pointer-events-none absolute right-0 top-[430px] h-[560px] w-16 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:20px_20px]" />

            {/* --- History --- */}
            <article
              className="land-detail-card rounded-2xl border p-9"
              style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
            >
              <div
                className={`flex items-center gap-2.5 ${displayFont} text-[20px] font-light tracking-[0.18em]`}
                style={{ color: GOLD }}
              >
                <Diamond size={12} fill="currentColor" /> {t.history}
              </div>

              <div className="mt-6 flex items-center gap-10">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-4">
                    <span
                      className="grid h-14 w-14 place-items-center rounded-lg border bg-white/80"
                      style={{ borderColor: CARD_BORDER }}
                    >
                      <Calendar size={30} style={{ color: "#b3543f" }} />
                    </span>
                    <span className={`${displayFont} text-[52px] font-light leading-none`} style={{ color: INK }}>
                      1946
                    </span>
                  </div>
                  <p className="mt-6 max-w-[460px] text-[19px] font-light leading-[1.65]" style={{ color: BODY }}>
                    {t.historyText}
                  </p>
                </div>
                <div
                  className="w-[380px] shrink-0 overflow-hidden rounded-lg border bg-white shadow-sm"
                  style={{ borderColor: CARD_BORDER }}
                >
                  <img
                    src={historyImg}
                    alt="Kurds raising the flag in Mahabad, 1946"
                    className="h-[240px] w-full object-cover grayscale contrast-110"
                  />
                </div>
              </div>
            </article>

            {/* --- Colors & Symbolism --- */}
            <section className="land-detail-panel mt-12">
              <div className="flex items-center justify-center gap-5">
                <span className="h-px flex-1 max-w-[190px] bg-[#d0c1a0]" />
                <h3 className={`${displayFont} text-[28px] font-light tracking-[0.14em]`} style={{ color: INK }}>
                  {t.colorsTitle}
                </h3>
                <span className="h-px flex-1 max-w-[190px] bg-[#d0c1a0]" />
              </div>

              <div className="mt-10 grid grid-cols-4 divide-x divide-[#e6dcc4] rtl:divide-x-reverse">
                {t.colors.map((c) => (
                  <div key={c.name} className="flex flex-col items-center px-4 text-center">
                    {c.swatch === "sun" ? (
                      <KurdishSun size={92} />
                    ) : (
                      <span
                        className="h-[88px] w-[88px] rounded-full shadow-sm"
                        style={{
                          backgroundColor:
                            c.swatch === "red" ? "#d13a2c" : c.swatch === "green" ? "#2f8a46" : "#ffffff",
                          boxShadow:
                            c.swatch === "white"
                              ? "inset 0 0 0 3px #e2d3b2, 0 1px 3px rgba(0,0,0,0.08)"
                              : "inset 0 0 0 3px rgba(255,255,255,0.28), 0 1px 3px rgba(0,0,0,0.12)",
                        }}
                      />
                    )}
                    <h4
                      className={`mt-5 ${displayFont} text-[23px] font-light tracking-[0.16em]`}
                      style={{ color: c.nameColor }}
                    >
                      {c.name}
                    </h4>
                    <DiamondDivider className="mt-3" />
                    <p className="mt-3 max-w-[190px] text-[16px] font-light leading-[1.6]" style={{ color: BODY }}>
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* --- Unity & Heritage --- */}
            <div className="mt-12 grid grid-cols-2 gap-7">
              <article
                className="land-detail-card relative flex flex-col items-center overflow-hidden rounded-2xl border p-9 text-center"
                style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
              >
                <div className="pointer-events-none absolute inset-x-10 top-14 h-40 opacity-15 [background-image:radial-gradient(#a37b45_1.6px,transparent_1.6px)] [background-size:15px_15px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />
                <h4 className={`${displayFont} text-[24px] font-light tracking-[0.18em]`} style={{ color: GOLD }}>
                  {t.unity}
                </h4>
                <UnityFigures className="relative mt-7 h-[76px] w-[280px] text-[#b99152]" />
                <p className="relative mt-6 max-w-[380px] text-[17px] font-light leading-[1.65]" style={{ color: BODY }}>
                  {t.unityText}
                </p>
              </article>

              <article
                className="land-detail-card flex flex-col items-center rounded-2xl border p-9 text-center"
                style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
              >
                <div
                  className={`flex items-center gap-3 ${displayFont} text-[24px] font-light tracking-[0.18em]`}
                  style={{ color: GOLD }}
                >
                  {t.heritage}
                </div>
                <Diamond size={10} fill="currentColor" className="mt-2 text-[#c8a35f]" />
                <HeritageSkyline className="mt-5 h-[92px] w-[350px] text-[#c9a975]" />
                <p className="mt-5 max-w-[400px] text-[17px] font-light leading-[1.65]" style={{ color: BODY }}>
                  {t.heritageText}
                </p>
              </article>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
