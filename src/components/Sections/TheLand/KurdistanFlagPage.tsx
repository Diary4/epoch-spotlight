import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Calendar, Diamond } from "lucide-react";
import { useLandDetailAnimation } from "@/components/Sections/TheLand/useLandDetailAnimation";
import {
  detailBackButtonClassName,
  detailBackButtonSideClassName,
  detailBackIconClassName,
  detailBackIconSize,
} from "@/constants/backNavigation";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import { localizeDigits } from "@/lib/utils";
import heroVideo from "@/assets/videos/theflag.mp4";
import historyImg from "@/assets/images/mahabad.webp";
import flagPatternImg from "@/assets/images/patterns/living-heritage.png";
import unityImg from "@/assets/images/patterns/unity.png";
import redTreeIcon from "@/assets/icons/theflag/tree.jpeg";
import whitePigeonIcon from "@/assets/icons/theflag/pigeon.png";
import greenMountainIcon from "@/assets/icons/theflag/mountain.png";
import sunIcon from "@/assets/icons/theflag/sun.png";

const PAPER = "#fbf5eb";
const GOLD = "#9b6d35";
const INK = "#17233b";
const BODY = "#35435b";
const CARD_BG = "#f7f1e3";
const CARD_BORDER = "#e7dcc4";

type FlagSwatch = "red" | "white" | "green" | "sun";

const SWATCH_THEMES: Record<
  FlagSwatch,
  { border: string; glow: string; ring: string; waves: string[] }
> = {
  red: {
    border: "#e8b4ae",
    glow: "rgba(196, 58, 44, 0.38)",
    ring: "rgba(232, 164, 156, 0.5)",
    waves: ["#f5ddd9", "#efb8b0", "#e07a6e", "#c43a2c"],
  },
  white: {
    border: "#ddcda8",
    glow: "rgba(185, 161, 115, 0.42)",
    ring: "rgba(226, 213, 186, 0.6)",
    waves: ["#f6eedd", "#eadec2", "#d6c49c", "#b9a173"],
  },
  green: {
    border: "#a8d5b5",
    glow: "rgba(47, 138, 70, 0.36)",
    ring: "rgba(168, 213, 181, 0.5)",
    waves: ["#dff0e3", "#b8dfc4", "#6ec48a", "#2f8a46"],
  },
  sun: {
    border: "#f0d08a",
    glow: "rgba(208, 139, 31, 0.4)",
    ring: "rgba(245, 208, 138, 0.5)",
    waves: ["#fdf0d4", "#f8dfa0", "#f0c060", "#d08b1f"],
  },
};

const FLAG_ICON_IMAGES: Record<FlagSwatch, string> = {
  red: redTreeIcon,
  white: whitePigeonIcon,
  green: greenMountainIcon,
  sun: sunIcon,
};

function WavyDecor({ waves }: { waves: string[] }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 130 140"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect width="130" height="140" fill={waves[0]} />
      <path
        d="M0,55 C25,35 55,48 80,38 C100,30 115,42 130,32 L130,140 L0,140 Z"
        fill={waves[1]}
        opacity="0.9"
      />
      <path
        d="M0,88 C30,68 65,82 95,72 C110,66 120,78 130,68 L130,140 L0,140 Z"
        fill={waves[2]}
        opacity="0.75"
      />
      <path
        d="M0,112 C40,96 75,108 130,98 L130,140 L0,140 Z"
        fill={waves[3]}
        opacity="0.6"
      />
    </svg>
  );
}

function FlagColorIcon({ swatch }: { swatch: FlagSwatch }) {
  return (
    <img
      src={FLAG_ICON_IMAGES[swatch]}
      alt=""
      className="h-full w-full rounded-full bg-[#fdfaf5] object-cover"
    />
  );
}

function FlagColorCard({
  name,
  nameColor,
  text,
  swatch,
  displayFont,
}: {
  name: string;
  nameColor: string;
  text: string;
  swatch: FlagSwatch;
  displayFont: string;
}) {
  const theme = SWATCH_THEMES[swatch];

  return (
    <article
      className="relative flex min-h-[132px] items-center overflow-hidden rounded-[26px] border bg-[#fdfaf5] shadow-[0_6px_20px_rgba(67,35,45,0.07)]"
      style={{ borderColor: theme.border }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[130px] overflow-hidden rounded-l-[26px]">
        <WavyDecor waves={theme.waves} />
      </div>

      <div
        className="pointer-events-none absolute -bottom-10 -right-6 h-36 w-44 rounded-full opacity-40 blur-3xl"
        style={{ backgroundColor: theme.waves[2] }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-full w-[55%] opacity-25"
        style={{
          background: `radial-gradient(ellipse 85% 75% at 100% 100%, ${theme.waves[1]} 0%, transparent 68%)`,
        }}
        aria-hidden
      />

      <div className="relative z-10 ms-5 flex shrink-0 items-center justify-center">
        <div
          className="absolute inset-0 scale-110 rounded-full blur-md"
          style={{ backgroundColor: theme.glow }}
          aria-hidden
        />
        <div
          className="relative grid h-[92px] w-[92px] place-items-center rounded-full p-[5px]"
          style={{ backgroundColor: theme.ring }}
        >
          <div className="relative h-[78px] w-[78px] overflow-hidden rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.12)]">
            <FlagColorIcon swatch={swatch} />
          </div>
        </div>
      </div>

      <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center px-6 py-5">
        <h4
          className={`${displayFont} text-[22px] font-light uppercase leading-tight tracking-[0.16em]`}
          style={{ color: nameColor }}
        >
          {name}
        </h4>
        <p className="mt-1.5 text-[15px] font-light leading-[1.55]" style={{ color: BODY }}>
          {text}
        </p>
      </div>
    </article>
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
  const heroVideoRef = useRef<HTMLVideoElement>(null);
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

  useEffect(() => {
    const videoEl = heroVideoRef.current;
    if (!videoEl) return;

    const tryPlay = () => {
      videoEl.play().catch(() => {
        // Ignore autoplay promise rejections from browser policies.
      });
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) tryPlay();
    };

    tryPlay();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

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
              <div
                className={`absolute inset-y-0 ${dir === "rtl" ? "left-0" : "right-0"} w-[62%] overflow-hidden`}
              >
                <video
                  ref={heroVideoRef}
                  src={heroVideo}
                  aria-label="The Kurdistan flag"
                  className="h-full w-full object-cover object-center"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
                <div
                  className={`pointer-events-none absolute inset-y-0 ${dir === "rtl" ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r"} w-[42%] from-[#fbf5eb] via-[#fbf5eb]/75 to-transparent`}
                  aria-hidden
                />
              </div>
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
                style={{ background: `linear-gradient(to bottom, transparent, ${PAPER})` }}
              />
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
                  <div className="flex items-center gap-5">
                    <span
                      className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[10px] border bg-white shadow-[0_1px_4px_rgba(67,35,45,0.06)]"
                      style={{ borderColor: CARD_BORDER }}
                    >
                      <Calendar size={26} strokeWidth={1.5} style={{ color: "#b3543f" }} />
                    </span>
                    <span
                      className={`${displayFont} text-[72px] font-light leading-[0.88] tracking-tight`}
                      style={{ color: INK }}
                    >
                      {localizeDigits("1946", lang)}
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

              <div className="mt-10 grid grid-cols-2 gap-5">
                {t.colors.map((c) => (
                  <FlagColorCard
                    key={c.name}
                    name={c.name}
                    nameColor={c.nameColor}
                    text={c.text}
                    swatch={c.swatch}
                    displayFont={displayFont}
                  />
                ))}
              </div>
            </section>

            {/* --- Unity & Heritage --- */}
            <div className="mt-12 grid grid-cols-2 gap-7">
              <article
                className="land-detail-card relative flex min-h-[280px] flex-col items-center justify-between overflow-hidden rounded-2xl border p-9 text-center"
                style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${unityImg})`,
                    backgroundSize: "88% auto",
                  }}
                  aria-hidden
                />
                <h4 className={`relative z-10 ${displayFont} text-[24px] font-light tracking-[0.18em]`} style={{ color: GOLD }}>
                  {t.unity}
                </h4>
                <p className="relative z-10 max-w-[380px] text-[17px] font-light leading-[1.65]" style={{ color: BODY }}>
                  {t.unityText}
                </p>
              </article>

              <article
                className="land-detail-card relative flex min-h-[280px] flex-col items-center justify-between overflow-hidden rounded-2xl border p-9 text-center"
                style={{ backgroundColor: CARD_BG, borderColor: CARD_BORDER }}
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-[center_55%] bg-no-repeat"
                  style={{
                    backgroundImage: `url(${flagPatternImg})`,
                    backgroundSize: "95% auto",
                  }}
                  aria-hidden
                />
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className={`flex items-center gap-3 ${displayFont} text-[24px] font-light tracking-[0.18em]`}
                    style={{ color: GOLD }}
                  >
                    {t.heritage}
                  </div>
                  <Diamond size={10} fill="currentColor" className="mt-2 text-[#c8a35f]" />
                </div>
                <p className="relative z-10 max-w-[400px] text-[17px] font-light leading-[1.65]" style={{ color: BODY }}>
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
