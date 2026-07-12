import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Building2, Landmark, ScrollText } from "lucide-react";
import { useSystemDetailAnimation } from "@/components/Sections/TheSystem/useSystemDetailAnimation";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import {
  detailBackButtonSideClassName,
  detailBackIconClassName,
  systemCanvasBackButtonClassName,
  systemCanvasBackIconSize,
} from "@/constants/backNavigation";
// TODO: replace this placeholder with the final Judiciary hero/background artwork.
import judiciaryBackground from "@/assets/icons/thesystem/judiciary.webp";
import councilIcon from "@/assets/icons/thesystem/judiciary/council.webp";
import courtIcon from "@/assets/icons/thesystem/judiciary/court.webp";
import appealIcon from "@/assets/icons/thesystem/judiciary/appeal.webp";
import instantIcon from "@/assets/icons/thesystem/judiciary/instant.webp";
import fairIcon from "@/assets/icons/thesystem/judiciary/fair.webp";
import legalIcon from "@/assets/icons/thesystem/judiciary/legal.webp";
import rightsIcon from "@/assets/icons/thesystem/judiciary/rights.webp";

type Lang = "ku" | "en" | "ar";

type Item = { title: string; text: string; iconSrc: string };

/** Radiating sun motif used in the hero ornament divider. */
function Sunburst({ className = "" }: { className?: string }) {
  const rays = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2;
    const inner = 15;
    const outer = i % 2 === 0 ? 32 : 23;
    return {
      x1: 50 + Math.cos(a) * inner,
      y1: 50 + Math.sin(a) * inner,
      x2: 50 + Math.cos(a) * outer,
      y2: 50 + Math.sin(a) * outer,
    };
  });
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
      <circle cx="50" cy="50" r="9" />
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
      ))}
    </svg>
  );
}

const STRUCTURE_ICONS = [councilIcon, courtIcon, appealIcon, instantIcon];
const FUNCTION_ICONS = [fairIcon, legalIcon, rightsIcon];

const CONTENT: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    intro: string;
    structureHeading: string;
    functionsHeading: string;
    structure: { title: string; text: string }[];
    functions: { title: string; text: string }[];
    footer: string;
  }
> = {
  en: {
    title: "The Judiciary",
    subtitle: "The independent guardian of justice in the Kurdistan Region.",
    intro:
      "The Judiciary is an autonomous branch of power, completely separate from the legislature and executive. It is responsible for interpreting laws, resolving disputes, and upholding the rule of law across the region.",
    structureHeading: "Institutional Structure",
    functionsHeading: "Core Functions",
    structure: [
      { title: "Judicial Council", text: "The supreme administrative body overseeing the entire regional court system." },
      { title: "Court of Cassation", text: "The highest appellate court, ensuring uniform and correct application of laws." },
      { title: "Courts of Appeal", text: "Regional appellate bodies reviewing judgments from lower courts." },
      { title: "First Instance Courts", text: "Civil, criminal, commercial, and personal status trial courts." },
    ],
    functions: [
      { title: "Fair Trials", text: "Administers impartial justice for all citizens, residents, and organizations." },
      { title: "Legal Interpretation", text: "Clarifies and applies regional legislation to specific legal cases." },
      { title: "Rights Protection", text: "Safeguards constitutional rights, public liberties, and private property." },
    ],
    footer: "An independent, fair, and effective judiciary is the foundation of a just and prosperous Kurdistan.",
  },
  ar: {
    title: "القضاء",
    subtitle: "الحارس المستقل للعدالة في إقليم كوردستان.",
    intro:
      "القضاء سلطة مستقلة، منفصلة تمامًا عن السلطتين التشريعية والتنفيذية. وهو مسؤول عن تفسير القوانين وحل النزاعات وترسيخ سيادة القانون في عموم الإقليم.",
    structureHeading: "الهيكل المؤسسي",
    functionsHeading: "الوظائف الأساسية",
    structure: [
      { title: "المجلس القضائي", text: "الجهاز الإداري الأعلى الذي يشرف على كامل منظومة المحاكم في الإقليم." },
      { title: "محكمة التمييز", text: "أعلى محكمة استئناف تضمن تطبيق القوانين بشكل موحد وصحيح." },
      { title: "محاكم الاستئناف", text: "هيئات استئنافية إقليمية تراجع أحكام المحاكم الأدنى." },
      { title: "محاكم البداءة", text: "محاكم ابتدائية للقضايا المدنية والجنائية والتجارية والأحوال الشخصية." },
    ],
    functions: [
      { title: "محاكمات عادلة", text: "تُقيم العدالة النزيهة لجميع المواطنين والمقيمين والمؤسسات." },
      { title: "التفسير القانوني", text: "يوضّح ويطبّق التشريعات الإقليمية على القضايا القانونية المحددة." },
      { title: "حماية الحقوق", text: "يصون الحقوق الدستورية والحريات العامة والملكية الخاصة." },
    ],
    footer: "قضاء مستقل وعادل وفعّال هو أساس كوردستان عادلة ومزدهرة.",
  },
  ku: {
    title: "دادوەری",
    subtitle: "پارێزەری سەربەخۆی دادپەروەری لە هەرێمی کوردستان.",
    intro:
      "دادوەری دەسەڵاتێکی سەربەخۆیە، بە تەواوی جیاوازە لە دەسەڵاتی یاسادانان و جێبەجێکردن. بەرپرسە لە لێکدانەوەی یاساکان، چارەسەرکردنی کێشەکان، و جێگیرکردنی فەرمانڕەوایی یاسا لە سەرتاسەری هەرێم.",
    structureHeading: "پێکهاتەی دامەزراوەیی",
    functionsHeading: "ئەرکە بنەڕەتییەکان",
    structure: [
      { title: "ئەنجومەنی دادوەری", text: "دەستەی کارگێڕی بەرزترین کە سەرپەرشتی هەموو سیستەمی دادگاکانی هەرێم دەکات." },
      { title: "دادگای تەمیز", text: "بەرزترین دادگای ناوبژیوانی کە دڵنیایی لە جێبەجێکردنی یەکگرتوو و ڕاستی یاساکان دەدات." },
      { title: "دادگاکانی ناوبژیوانی", text: "دەستە ناوبژیوانییە هەرێمییەکان کە بڕیارەکانی دادگا خوارترەکان پێداچوونەوەیان بۆ دەکەن." },
      { title: "دادگاکانی سەرەتایی", text: "دادگای سەرەتایی بۆ کێشە مەدەنی، تاوانی، بازرگانی، و باری کەسی." },
    ],
    functions: [
      { title: "دادگایی دادپەروەرانە", text: "دادپەروەری بێلایەن بۆ هەموو هاووڵاتییان، دانیشتووان، و ڕێکخراوەکان جێبەجێ دەکات." },
      { title: "لێکدانەوەی یاسایی", text: "یاساکانی هەرێم ڕوون دەکاتەوە و بۆ کێشە یاساییە دیاریکراوەکان جێبەجێی دەکات." },
      { title: "پاراستنی مافەکان", text: "مافە دەستوورییەکان، ئازادییە گشتییەکان، و موڵکی تایبەت دەپارێزێت." },
    ],
    footer: "دادوەرییەکی سەربەخۆ، دادپەروەر، و کاریگەر بناغەی کوردستانێکی دادپەروەر و گەشەسەندووە.",
  },
};

type JudiciaryPageProps = {
  lang?: Lang;
  onBack?: () => void;
};

export default function JudiciaryPage({ lang = "en", onBack }: JudiciaryPageProps) {
  const rootRef = useSystemDetailAnimation([lang]);
  const dir = lang === "en" ? "ltr" : "rtl";
  const isRtlScript = discoverRtlScript(lang);
  const displayFont = discoverDisplayFont(lang);
  const c = CONTENT[lang];

  const structure: Item[] = c.structure.map((s, i) => ({ ...s, iconSrc: STRUCTURE_ICONS[i] }));
  const functions: Item[] = c.functions.map((f, i) => ({ ...f, iconSrc: FUNCTION_ICONS[i] }));

  // Fixed 1400px design canvas scaled to fit the viewport in both dimensions —
  // same approach used by the Government / Parliament / Presidency detail pages.
  const DESIGN_WIDTH = 1400;
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
          <section className="relative mx-auto flex w-full flex-col overflow-hidden bg-[#fbf5eb] px-20 pb-14 pt-14">
            <button
              type="button"
              onClick={onBack}
              className={`${systemCanvasBackButtonClassName} ${detailBackButtonSideClassName(dir)}`}
              aria-label="Back to The System"
            >
              <ArrowLeft size={systemCanvasBackIconSize} className={detailBackIconClassName(dir)} />
            </button>

            {/* Faint lattice motifs at the sides */}
            <div className="pointer-events-none absolute left-0 top-[520px] h-[45%] w-20 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="pointer-events-none absolute right-0 top-[520px] h-[45%] w-20 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

            {/* Monumental centered header */}
            <header className="system-detail-intro relative z-10 flex flex-col items-center text-center">
              <h1 className={`${displayFont} text-[104px] font-medium leading-none tracking-tight text-[#17233b]`}>
                {c.title}
              </h1>
              <p className="mt-5 max-w-[980px] text-[36px] font-light leading-tight text-[#9b6d35]">{c.subtitle}</p>

              <div className="mt-7 flex items-center justify-center gap-6 text-[#b99152]">
                <span className="h-px w-36 bg-gradient-to-r from-transparent to-[#cfae72]" />
                <Sunburst className="h-9 w-9" />
                <span className="h-px w-36 bg-gradient-to-l from-transparent to-[#cfae72]" />
              </div>
            </header>

            {/* Hero split — intro text beside the emblem artwork bleeding off the edge */}
            <div className="relative z-10 mt-8 grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-8">
              <div className="system-detail-intro">
                <p className="max-w-[540px] text-[30px] font-light leading-[1.6] text-[#2d3549]">{c.intro}</p>
              </div>
              <div className="system-detail-hero relative -me-20 h-[440px]">
                <img src={judiciaryBackground} alt="" className="h-full w-full object-contain object-center" />
              </div>
            </div>

            {/* Institutional Structure — four courts */}
            <section className="relative z-10 mt-12">
              <div className={`mb-6 flex items-center gap-4 ${displayFont} text-[30px] font-light text-[#9b6d35]`}>
                <Landmark size={30} strokeWidth={1.5} className="text-[#c59a4b]" />
                <span>{c.structureHeading}</span>
                <span className="h-0.5 flex-1 bg-[#c7a05d]" />
                <span className="h-3 w-3 rotate-45 border-2 border-[#c7a05d]" />
              </div>

              <div className="grid grid-cols-4 gap-6">
                {structure.map((item) => {
                  return (
                    <article
                      key={item.title}
                      className="system-detail-card relative flex min-h-[300px] flex-col items-center overflow-hidden rounded-[24px] border-2 border-[#ead8b7] bg-white/80 px-6 py-8 text-center shadow-[0_14px_35px_rgba(84,54,16,0.14)] backdrop-blur-md"
                    >
                      <span className="grid h-[104px] w-[104px] shrink-0 place-items-center overflow-hidden rounded-full ring-4 ring-[#f1e2c1]">
                        <img src={item.iconSrc} alt="" className="h-full w-full object-cover scale-[1.2]" />
                      </span>
                      <h3 className={`mt-5 ${displayFont} text-[30px] font-light leading-tight text-[#17233b]`}>
                        {item.title}
                      </h3>
                      <div className="my-4 flex w-24 items-center justify-center gap-3 text-[#b99152]">
                        <span className="h-0.5 flex-1 bg-[#d2b475]" />
                        <span className="h-2.5 w-2.5 rotate-45 border-2 border-[#b99152]" />
                        <span className="h-0.5 flex-1 bg-[#d2b475]" />
                      </div>
                      <p className="text-[20px] font-light leading-[1.5] text-[#303a50]">{item.text}</p>
                      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Core Functions — three pillars */}
            <section className="relative z-10 mt-10">
              <div className={`mb-6 flex items-center gap-4 ${displayFont} text-[30px] font-light text-[#9b6d35]`}>
                <ScrollText size={30} strokeWidth={1.5} className="text-[#c59a4b]" />
                <span>{c.functionsHeading}</span>
                <span className="h-0.5 flex-1 bg-[#c7a05d]" />
                <span className="h-3 w-3 rotate-45 border-2 border-[#c7a05d]" />
              </div>

              <div className="grid grid-cols-3 gap-6">
                {functions.map((item) => {
                  return (
                    <article
                      key={item.title}
                      className="system-detail-panel flex items-center gap-6 rounded-[24px] border-2 border-[#ead8b7] bg-white/70 px-7 py-7 text-start shadow-[0_14px_35px_rgba(84,54,16,0.1)] backdrop-blur-md"
                    >
                      <span className="grid h-[92px] w-[92px] shrink-0 place-items-center overflow-hidden rounded-full border-[5px] border-white shadow-md ring-2 ring-[#e6d5ac]">
                        <img src={item.iconSrc} alt="" className="h-full w-full object-cover scale-[1.2]" />
                      </span>
                      <div>
                        <h3 className={`${displayFont} text-[28px] font-light leading-tight text-[#17233b]`}>
                          {item.title}
                        </h3>
                        <p className="mt-2 text-[19px] font-light leading-[1.45] text-[#35435b]">{item.text}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Closing banner */}
            <footer className="system-detail-extra relative z-10 mt-11 flex items-center gap-7 overflow-hidden rounded-[26px] border-2 border-[#cfae72] bg-[#13213b] px-10 py-8 text-[#f7edd7] shadow-[0_18px_45px_rgba(84,54,16,0.2)]">
              <span className="grid h-[76px] w-[76px] shrink-0 place-items-center rounded-full border-[5px] border-[#e6c877]/40 bg-[#0f1a2f] text-[#e6c877]">
                <Building2 size={40} strokeWidth={1.45} />
              </span>
              <p className={`flex-1 ${displayFont} text-[27px] font-light leading-snug`}>{c.footer}</p>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-40 opacity-20 [background-image:linear-gradient(45deg,#e6c877_1px,transparent_1px),linear-gradient(-45deg,#e6c877_1px,transparent_1px)] [background-size:20px_20px]" />
            </footer>
          </section>
        </main>
      </div>
    </div>
  );
}
