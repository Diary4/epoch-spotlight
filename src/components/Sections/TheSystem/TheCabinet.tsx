import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Atom,
  Building2,
  ClipboardList,
  Factory,
  Flame,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  MapPin,
  Milestone,
  MoonStar,
  Palette,
  Scale,
  ShieldCheck,
  Swords,
  TrainFront,
  TrendingUp,
  UsersRound,
  Wheat,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useSystemDetailAnimation } from "@/components/Sections/TheSystem/useSystemDetailAnimation";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import {
  detailBackButtonSideClassName,
  detailBackIconClassName,
  systemCanvasBackButtonClassName,
  systemCanvasBackIconSize,
} from "@/constants/backNavigation";

type Lang = "ku" | "en" | "ar";

const MINISTRY_ICONS: LucideIcon[] = [
  Scale, // Justice
  Swords, // Peshmerga Affairs
  ShieldCheck, // Interior
  TrendingUp, // Finance and Economy
  Flame, // Natural Resources
  HeartPulse, // Health
  GraduationCap, // Education
  Building2, // Construction and Housing
  MapPin, // Municipalities and Tourism
  Atom, // Higher Education and Scientific Research
  ClipboardList, // Planning
  HeartHandshake, // Labour and Social Affairs
  Palette, // Culture and Youth
  Milestone, // Martyrs and Anfal Affairs
  Wheat, // Agriculture and Water Resources
  Factory, // Trade and Industry
  TrainFront, // Transport and Communications
  MoonStar, // Endowment and Religious Affairs
  Zap, // Electricity
];

const CONTENT: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    intro: string;
    ministries: string[];
    footer: string;
  }
> = {
  en: {
    title: "The Cabinet",
    subtitle: "Ministries of the Kurdistan Regional Government",
    intro:
      "The Cabinet leads the executive work of the Kurdistan Region through ministries responsible for public services, policy implementation, security, development, and administration.",
    ministries: [
      "Ministry of Justice",
      "Ministry of Peshmerga Affairs",
      "Ministry of Interior",
      "Ministry of Finance and Economy",
      "Ministry of Natural Resources",
      "Ministry of Health",
      "Ministry of Education",
      "Ministry of Construction and Housing",
      "Ministry of Municipalities and Tourism",
      "Ministry of Higher Education and Scientific Research",
      "Ministry of Planning",
      "Ministry of Labour and Social Affairs",
      "Ministry of Culture and Youth",
      "Ministry of Martyrs and Anfal Affairs",
      "Ministry of Agriculture and Water Resources",
      "Ministry of Trade and Industry",
      "Ministry of Transport and Communications",
      "Ministry of Endowment and Religious Affairs",
      "Ministry of Electricity",
    ],
    footer:
      "Together, these ministries form the executive framework that delivers governance, services, and development across the Kurdistan Region.",
  },
  ar: {
    title: "مجلس الوزراء",
    subtitle: "وزارات حكومة إقليم كوردستان",
    intro:
      "يقود مجلس الوزراء العمل التنفيذي لإقليم كوردستان من خلال وزارات مسؤولة عن الخدمات العامة وتنفيذ السياسات والأمن والتنمية والإدارة.",
    ministries: [
      "وزارة العدل",
      "وزارة شؤون البيشمركة",
      "وزارة الداخلية",
      "وزارة المالية والاقتصاد",
      "وزارة الثروات الطبيعية",
      "وزارة الصحة",
      "وزارة التربية",
      "وزارة الإعمار والإسكان",
      "وزارة البلديات والسياحة",
      "وزارة التعليم العالي والبحث العلمي",
      "وزارة التخطيط",
      "وزارة العمل والشؤون الاجتماعية",
      "وزارة الثقافة والشباب",
      "وزارة شؤون الشهداء والأنفال",
      "وزارة الزراعة والموارد المائية",
      "وزارة التجارة والصناعة",
      "وزارة النقل والاتصالات",
      "وزارة الأوقاف والشؤون الدينية",
      "وزارة الكهرباء",
    ],
    footer:
      "معًا تشكّل هذه الوزارات الإطار التنفيذي الذي يقدّم الحوكمة والخدمات والتنمية في عموم إقليم كوردستان.",
  },
  ku: {
    title: "ئەنجومەنی وەزیران",
    subtitle: "وەزارەتەکانی حکومەتی هەرێمی کوردستان",
    intro:
      "ئەنجومەنی وەزیران کاری جێبەجێکردنی هەرێمی کوردستان بەڕێوەدەبات لە ڕێگەی وەزارەتەکانەوە کە بەرپرسن لە خزمەتگوزارییە گشتییەکان، جێبەجێکردنی سیاسەت، ئاسایش، گەشەپێدان، و کارگێڕی.",
    ministries: [
      "وەزارەتی دادپەروەری",
      "وەزارەتی کاروباری پێشمەرگە",
      "وەزارەتی ناوخۆ",
      "وەزارەتی دارایی و ئابووری",
      "وەزارەتی سامانە سروشتییەکان",
      "وەزارەتی تەندروستی",
      "وەزارەتی پەروەردە",
      "وەزارەتی ئاوەدانکردنەوە و نیشتەجێبوون",
      "وەزارەتی شارەوانی و گەشتوگوزار",
      "وەزارەتی خوێندنی باڵا و توێژینەوەی زانستی",
      "وەزارەتی پلاندانان",
      "وەزارەتی کار و کاروباری کۆمەڵایەتی",
      "وەزارەتی ڕۆشنبیری و لاوان",
      "وەزارەتی کاروباری شەهیدان و ئەنفال",
      "وەزارەتی کشتوکاڵ و سەرچاوەکانی ئاو",
      "وەزارەتی بازرگانی و پیشەسازی",
      "وەزارەتی گواستنەوە و گەیاندن",
      "وەزارەتی ئەوقاف و کاروباری ئایینی",
      "وەزارەتی کارەبا",
    ],
    footer:
      "ئەم وەزارەتانە پێکەوە چوارچێوەی جێبەجێکردن پێکدەهێنن کە حکومڕانی، خزمەتگوزاری، و گەشەپێدان لە سەرتاسەری هەرێمی کوردستان دابین دەکەن.",
  },
};

type CabinetPageProps = {
  lang?: Lang;
  onBack?: () => void;
};

export default function CabinetPage({ lang = "en", onBack }: CabinetPageProps) {
  const rootRef = useSystemDetailAnimation([lang]);
  const dir = lang === "en" ? "ltr" : "rtl";
  const isRtlScript = discoverRtlScript(lang);
  const displayFont = discoverDisplayFont(lang);
  const c = CONTENT[lang];

  // Fixed 1400px design canvas scaled to fit the viewport in both dimensions —
  // same approach used by the Government / Parliament / Presidency detail pages.
  const DESIGN_WIDTH = 1400;
  const canvasRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, x: 0, minCanvasHeight: 0 });

  useEffect(() => {
    const recompute = () => {
      const el = canvasRef.current;
      if (!el) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const widthScale = vw / DESIGN_WIDTH;
      const minCanvasHeight = vh / widthScale;
      const naturalHeight = Math.max(el.offsetHeight, minCanvasHeight);
      const scale = Math.min(widthScale, vh / naturalHeight);
      const x = (vw - DESIGN_WIDTH * scale) / 2;
      setFit({ scale, x, minCanvasHeight });
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
      dir={dir}
      className={`relative h-screen w-screen overflow-hidden bg-[#fbf5eb] ${isRtlScript ? "font-noto-naskh" : ""}`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        ref={canvasRef}
        style={{
          width: `${DESIGN_WIDTH}px`,
          transform: `translate(${fit.x}px, 0px) scale(${fit.scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
          containerType: "inline-size",
        }}
      >
        <main ref={rootRef} className="m-0 w-full bg-[#fbf5eb] text-[#17233b]">
          <section className="relative mx-auto flex h-[940px] w-full flex-col overflow-hidden bg-[#fbf5eb] px-20 pb-12 pt-12">
            <button
              type="button"
              onClick={onBack}
              className={`${systemCanvasBackButtonClassName} ${detailBackButtonSideClassName(dir)}`}
              aria-label="Back to Government"
            >
              <ArrowLeft size={systemCanvasBackIconSize} className={detailBackIconClassName(dir)} />
            </button>

            {/* Faint lattice motifs at the sides */}
            <div className="pointer-events-none absolute left-0 top-40 h-[70%] w-16 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="pointer-events-none absolute right-0 top-40 h-[70%] w-16 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

            {/* Header */}
            <header className="system-detail-intro relative z-10 flex flex-col items-center text-center">
              <span className="grid h-[112px] w-[112px] place-items-center rounded-full border-2 border-[#cfae72] bg-[#13213b] text-[#e6c877] shadow-[0_16px_40px_rgba(84,54,16,0.18)]">
                <UsersRound size={54} strokeWidth={1.4} />
              </span>
              <h1 className={`mt-6 ${displayFont} ${lang === "en" ? "uppercase tracking-[0.03em]" : ""} text-[92px] font-medium leading-none text-[#17233b]`}>
                {c.title}
              </h1>
              <p className="mt-4 max-w-[1000px] text-[34px] font-light leading-tight text-[#9b6d35]">{c.subtitle}</p>

              <div className="mt-5 flex w-[260px] items-center gap-4 text-[#b99152]">
                <span className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-[#b99152]" />
                <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
                <span className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-[#b99152]" />
              </div>

              <p className="mt-5 max-w-[1040px] text-[25px] font-light leading-[1.5] text-[#2d3549]">{c.intro}</p>
            </header>

            {/* Ministries grid */}
            <section className="relative z-10 mt-9 grid flex-1 grid-cols-4 grid-rows-5 gap-x-10 gap-y-2 content-stretch">
              {c.ministries.map((name, i) => {
                const Icon = MINISTRY_ICONS[i];
                const num = String(i + 1).padStart(2, "0");
                return (
                  <article
                    key={name}
                    className="system-detail-card flex items-center gap-4 border-b border-[#e7d6b4]/70 px-1 text-start"
                  >
                    <span className="grid h-[62px] w-[62px] shrink-0 place-items-center rounded-full border border-[#d9b477] bg-[#fbf5eb] text-[#b8873c]">
                      <Icon size={30} strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0">
                      <span className="block font-serif text-[21px] font-medium leading-none text-[#c39a4e]">{num}</span>
                      <span className={`mt-1 block ${displayFont} text-[19px] font-light leading-[1.2] text-[#17233b]`}>
                        {name}
                      </span>
                    </div>
                  </article>
                );
              })}
            </section>

            {/* Closing banner */}
            <footer className="system-detail-extra relative z-10 mt-8 rounded-[24px] border-2 border-[#ead8b7] bg-white/60 px-10 py-7 text-center shadow-[0_14px_35px_rgba(84,54,16,0.1)] backdrop-blur-md">
              <p className={`mx-auto max-w-[1080px] ${displayFont} text-[25px] font-light leading-snug text-[#2d3549]`}>
                {c.footer}
              </p>
            </footer>
          </section>
        </main>
      </div>
    </div>
  );
}
