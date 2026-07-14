import React from "react";
import { ArrowLeft, ArrowRight, ChevronRight, X } from "lucide-react";
import { sectionBackButtonClassName, sectionBackButtonSideClassName, sectionBackIconClassName } from "@/constants/backNavigation";
import gsap from "gsap";
import { discoverDisplayFont, discoverRtlScript, type DiscoverLangCode } from "@/components/Sections/discoverLanguage";
import DiscoverLanguageButton from "@/components/Sections/DiscoverLanguageButton";
import { useDiscoverLanguageTransition } from "@/components/Sections/useDiscoverLanguageTransition";
import heroImg from "@/assets/mainImages/thesystem/parlaman.webp";
import parliamentIcon from "@/assets/icons/thesystem/parliment.webp";
import governmentIcon from "@/assets/icons/thesystem/government.webp";
import judiciaryIcon from "@/assets/icons/thesystem/judiciary.webp";
import pmImg from "@/assets/images/PrimeMinistir/p-4.webp";
import presidencyImg from "@/assets/images/parliment/presidency.webp";
import cabinetIcon from "@/assets/icons/thecabinet/cabinet.png";

/** Radiating sun motif used in the ornament dividers and the panel emblem. */
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

function OrnamentDivider({ dataAttr }: { dataAttr?: string }) {
  return (
    <div data-sys-ornament={dataAttr ? "true" : undefined} className="flex items-center justify-center gap-6 text-[#b99152]">
      <span className="h-px w-40 bg-gradient-to-r from-transparent to-[#cfae72]" />
      <Sunburst className="h-9 w-9" />
      <span className="h-px w-40 bg-gradient-to-l from-transparent to-[#cfae72]" />
    </div>
  );
}

function InstitutionColumn({
  numeral,
  label,
  tag,
  desc,
  iconSrc,
  iconScale = "scale-[1.25]",
  onClick,
  displayFont,
  latin,
  withDivider,
}: {
  numeral: string;
  label: string;
  tag: string;
  desc: string;
  iconSrc: string;
  iconScale?: string;
  onClick?: () => void;
  displayFont: string;
  latin: boolean;
  withDivider: boolean;
}) {
  return (
    <div className={`flex ${withDivider ? "border-s border-[#e6d5ac]" : ""}`}>
      <button
        type="button"
        onClick={onClick}
        className="group flex w-full flex-col items-center px-10 text-center outline-none"
      >
        <span className="grid h-[150px] w-[150px] shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-[0_16px_36px_rgba(84,54,16,0.16)] ring-1 ring-[#e6d5ac] transition-transform duration-300 group-hover:scale-[1.04] group-active:scale-95">
          <img src={iconSrc} alt="" className={`h-full w-full object-cover ${iconScale}`} />
        </span>

        <span className="mt-7 font-serif text-[30px] leading-none text-[#1d2a45]">{numeral}</span>
        <span className="mt-5 h-px w-4/5 bg-[#dcc79c]" />

        <span data-discover-lang="true" className={`mt-5 block break-words ${displayFont} text-[42px] font-normal leading-tight text-[#17233b]`}>
          {label}
        </span>
        <span data-discover-lang="true" className={`mt-2 block text-[22px] text-[#9b6d35] ${latin ? "font-serif italic" : displayFont}`}>
          {tag}
        </span>

        <span className="my-6 h-2.5 w-2.5 rotate-45 border border-[#cfae72]" />

        <p data-discover-lang="true" className="max-w-[300px] break-words text-[21px] font-light leading-snug text-[#5c6473]">
          {desc}
        </p>

        <span className="mt-7 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#cfae72] text-[#b99152] transition-colors duration-300 group-hover:bg-[#b99152] group-hover:text-[#fbf5eb] group-active:bg-[#b99152] group-active:text-[#fbf5eb]">
          <ChevronRight className="h-6 w-6 rtl:rotate-180" strokeWidth={1.4} />
        </span>
      </button>
    </div>
  );
}

type SystemPageProps = {
  lang?: DiscoverLangCode;
  onBack?: () => void;
  onParliamentClick?: () => void;
  onJudiciaryClick?: () => void;
  onPrimeMinisterClick?: () => void;
  onPresidencyClick?: () => void;
  onCabinetClick?: () => void;
  onLanguageChange?: (lang: DiscoverLangCode) => void;
};

export default function SystemPage({ lang = "en", onBack, onParliamentClick, onJudiciaryClick, onPrimeMinisterClick, onPresidencyClick, onCabinetClick, onLanguageChange }: SystemPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const canvasRef = React.useRef<HTMLDivElement | null>(null);
  const [fit, setFit] = React.useState({ scale: 1, x: 0 });
  const [introDone, setIntroDone] = React.useState(false);
  const [govExpanded, setGovExpanded] = React.useState(false);
  const handleLanguageSelect = useDiscoverLanguageTransition(
    sectionRef,
    lang,
    onLanguageChange,
    introDone,
  );

  // Fixed design canvas (1400px wide) — same fit logic as Parliament / Presidency.
  const DESIGN_WIDTH = 1400;

  const isAr = lang === "ar";
  const isKu = lang === "ku";
  const isEn = lang === "en";
  const isRtlScript = discoverRtlScript(lang);
  const displayFont = discoverDisplayFont(lang);
  const dir = lang === "en" ? "ltr" : "rtl";

  const title = isAr ? "النظام" : isKu ? "سیستەمەکە" : "The System";
  const heading = isAr ? "كيف تُنظَّم حوكمة كوردستان" : isKu ? "چۆنیەتی پێکهاتنی حکومەتی کوردستان" : "How Kurdistan government is structured";

  const panelTitle = isAr ? "النظام الإقليمي" : isKu ? "سیستەمی هەرێم" : "The Regional System";
  const panelDescription = isAr
    ? "يعمل إقليم كوردستان كإقليم فيدرالي شبه مستقل تسنده ثلاث سلطات مستقلة — التشريعية والتنفيذية والقضائية — تعمل معًا لترسيخ سيادة القانون والإدارة العامة."
    : isKu
      ? "هەرێمی کوردستان وەک هەرێمێکی فیدراڵی نیمچە خۆسەر کاردەکات کە لەلایەن سێ دەسەڵاتی سەربەخۆوە — یاسادانان، جێبەجێکردن، و دادوەری — پاڵپشتی دەکرێت، کە پێکەوە کاردەکەن بۆ پاراستنی فەرمانڕەوایی یاسا و کارگێڕی گشتی."
      : "The Kurdistan Region operates as a semi-autonomous federal region sustained by three independent branches — the Legislature, the Executive, and the Judiciary — working collectively to uphold the rule of law and public administration.";

  const parliamentLabel = isAr ? "البرلمان" : isKu ? "پەرلەمان" : "Parliament";
  const governmentLabel = isAr ? "الحكومة" : isKu ? "حکومەت" : "Government";
  const judiciaryLabel = isAr ? "القضاء" : isKu ? "دادوەری" : "Judiciary";

  const legislationTag = isAr ? "(تشريعية)" : isKu ? "(یاسادانان)" : "(Legislation)";
  const executiveTag = isAr ? "(تنفيذية)" : isKu ? "(جێبەجێکردن)" : "(Executive)";
  const judicialTag = isAr ? "(قضائية)" : isKu ? "(دادوەری)" : "(Judicial)";

  const parliamentDesc = isAr ? "التشريع، وإقرار الموازنة، والرقابة على الحكومة." : isKu ? "یاسادانان، بودجەبەندی، و چاودێری حکومەت." : "Legislation, budgeting, and government oversight.";
  const governmentDesc = isAr ? "تنفيذ السياسات، والأمن الداخلي، والخدمات العامة." : isKu ? "جێبەجێکردنی سیاسەت، ئاسایشی ناوخۆ، و خزمەتگوزارییە گشتییەکان." : "Policy implementation, internal security, and public services.";
  const judiciaryDesc = isAr ? "تفسير القوانين، وحسم النزاعات القانونية، وإقامة العدل." : isKu ? "لێکدانەوەی یاساکان، کێشە یاساییەکان، و جێبەجێکردنی دادپەروەری." : "Interpretation of laws, legal disputes, and administration of justice.";

  const footerText = isAr
    ? "تدعم هذه المؤسسات مجتمعةً الحوكمة والقانون والإدارة العامة."
    : isKu
      ? "ئەم دامەزراوانە پێکەوە پاڵپشتیی حکومەت, یاسا، و کارگێڕی گشتی دەکەن."
      : "Together, these institutions support governance, law, and public administration.";

  const govMenuTitle = isAr ? "الجهاز التنفيذي" : isKu ? "دەستەی جێبەجێکار" : "Executive Branch";
  const primeMinisterLabel = isAr ? "رئيس الوزراء" : isKu ? "سەرۆک وەزیران" : "Prime Minister";
  const primeMinisterSub = isAr ? "تعرّف على رئيس مجلس الوزراء." : isKu ? "سەرۆکی ئەنجومەنی وەزیران بناسە." : "Meet the Head of the Council of Ministers.";
  const presidencyLabel = isAr ? "الرئاسة" : isKu ? "سەرۆکایەتی" : "President";
  const presidencySub = isAr ? "تعرّف على رئاسة الإقليم." : isKu ? "سەرۆکایەتی هەرێم بناسە." : "Meet the Head of the Region.";
  const cabinetLabel = isAr ? "مجلس الوزراء" : isKu ? "ئەنجومەنی وەزیران" : "The Cabinet";
  const cabinetSub = isAr ? "تعرّف على مجلس الوزراء الذي يقود العمل التنفيذي." : isKu ? "ئەنجومەنی وەزیران بناسە کە ڕێبەری کاری جێبەجێکردن دەکات." : "Meet the Council of Ministers that leads the executive.";

  const govMenuItems = [
    { key: "pm", label: primeMinisterLabel, sub: primeMinisterSub, iconSrc: pmImg, iconObjectPosition: "68% 12%", onClick: onPrimeMinisterClick },
    { key: "presidency", label: presidencyLabel, sub: presidencySub, iconSrc: presidencyImg, iconObjectPosition: "center center", iconScale: "scale-[1.1]", onClick: onPresidencyClick },
    { key: "cabinet", label: cabinetLabel, sub: cabinetSub, iconSrc: cabinetIcon, iconScale: "scale-[1.05]", onClick: onCabinetClick },
  ];

  React.useEffect(() => {
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
  }, []);

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-sys-ornament='true']", { autoAlpha: 0, scaleX: 0.4, transformOrigin: "50% 50%" });
      gsap.set("[data-sys-title]", { autoAlpha: 0, y: 34 });
      gsap.set("[data-sys-banner='true']", { clipPath: "inset(0 0 100% 0)" });
      gsap.set("[data-sys-panel='true']", { autoAlpha: 0, y: 44 });
      gsap.set("[data-sys-card='true']", { autoAlpha: 0, y: 44 });
      gsap.set("[data-sys-footer='true']", { autoAlpha: 0, y: 20 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => setIntroDone(true),
      });
      tl.to("[data-sys-ornament='true']", { autoAlpha: 1, scaleX: 1, duration: 0.9, ease: "power3.out" })
        .to("[data-sys-title]", { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.12 }, "-=0.5")
        .to("[data-sys-banner='true']", { clipPath: "inset(0 0 0% 0)", duration: 1.25, ease: "power3.inOut" }, "-=0.55")
        .to("[data-sys-panel='true']", { autoAlpha: 1, y: 0, duration: 0.85 }, "-=0.7")
        .to("[data-sys-card='true']", { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.16 }, "-=0.45")
        .to("[data-sys-footer='true']", { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      dir={dir}
      className={`relative h-screen w-screen overflow-hidden bg-[#fbf5eb] ${isRtlScript ? "font-noto-naskh" : ""}`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <DiscoverLanguageButton
        lang={lang}
        onSelect={handleLanguageSelect}
        placement={dir === "rtl" ? "start" : "end"}
      />
      <button
        type="button"
        onClick={onBack}
        className={`${sectionBackButtonClassName} ${sectionBackButtonSideClassName(dir)}`}
        aria-label="Back to Discover"
      >
        <ArrowLeft className={sectionBackIconClassName(dir)} />
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
          containerType: "inline-size",
        }}
      >
        <main className="m-0 w-full bg-[#fbf5eb] text-[#17233b]">
          <section
            ref={sectionRef}
            className="relative mx-auto flex w-full flex-col overflow-hidden bg-[#fbf5eb] px-20 pb-16 pt-16"
          >
            {/* Faint corner motifs */}
            <div className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full border border-[#e3d3b3]" />
            <div className="pointer-events-none absolute -end-16 -top-16 h-72 w-72 rounded-full border border-[#e3d3b3]" />
            <div className="pointer-events-none absolute -bottom-28 -start-28 h-80 w-80 rounded-full border border-[#e3d3b3]" />

            {/* Monumental centered header */}
            <header className="relative z-10 flex flex-col items-center text-center">
              <h1 data-sys-title="true" data-discover-lang="true" className={`break-words ${displayFont} text-[104px] font-medium leading-[1.02] tracking-tight text-[#17233b]`}>
                {title}
              </h1>
              <p data-sys-title="true" data-discover-lang="true" className="mt-4 max-w-[1000px] break-words text-[38px] font-light leading-tight text-[#9b6d35]">
                {heading}
              </p>
              <div data-sys-title="true" className="mt-8">
                <OrnamentDivider dataAttr="true" />
              </div>
            </header>

            {/* Panoramic banner + overlapping regional-system panel */}
            <div className="relative z-10 mt-12 w-full">
              <figure data-sys-banner="true" className="relative -mx-20 w-[calc(100%+10rem)]">
                <img
                  src={heroImg}
                  alt="Kurdistan Region"
                  className="h-[440px] w-full object-cover object-center"
                />
                {/* Top & bottom edges fade into the cream backdrop */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#fbf5eb] to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fbf5eb] to-transparent" />
              </figure>

              {/* The Regional System — heading + description on the cream backdrop */}
              <div
                data-sys-panel="true"
                className="relative z-20 mx-auto mt-12 w-[820px] max-w-[86%] px-6 text-center"
              >
                <h2 data-discover-lang="true" className={`mt-6 break-words ${displayFont} text-[40px] font-normal leading-tight text-[#9b6d35]`}>
                  {panelTitle}
                </h2>
                <p data-discover-lang="true" className="mx-auto mt-4 max-w-[640px] break-words text-[24px] font-light leading-[1.6] text-[#2d3549]">
                  {panelDescription}
                </p>
              </div>
            </div>

            {/* Three branches */}
            <div className="relative z-10 mt-14 grid grid-cols-3">
              <div data-sys-card="true">
                <InstitutionColumn
                  numeral="I"
                  label={parliamentLabel}
                  tag={legislationTag}
                  desc={parliamentDesc}
                  iconSrc={parliamentIcon}
                  onClick={onParliamentClick}
                  displayFont={displayFont}
                  latin={isEn}
                  withDivider={false}
                />
              </div>
              <div data-sys-card="true">
                <InstitutionColumn
                  numeral="II"
                  label={governmentLabel}
                  tag={executiveTag}
                  desc={governmentDesc}
                  iconSrc={governmentIcon}
                  onClick={() => setGovExpanded(true)}
                  displayFont={displayFont}
                  latin={isEn}
                  withDivider
                />
              </div>
              <div data-sys-card="true">
                <InstitutionColumn
                  numeral="III"
                  label={judiciaryLabel}
                  tag={judicialTag}
                  desc={judiciaryDesc}
                  iconSrc={judiciaryIcon}
                  onClick={onJudiciaryClick}
                  displayFont={displayFont}
                  latin={isEn}
                  withDivider
                />
              </div>
            </div>

            {/* Closing line */}
            <footer data-sys-footer="true" className="mt-16 flex flex-col items-center gap-6 text-center">
              <p data-discover-lang="true" className={`max-w-[980px] break-words ${displayFont} text-[30px] font-light leading-snug text-[#2d3549]`}>
                {footerText}
              </p>
              <OrnamentDivider />
            </footer>
          </section>
        </main>
      </div>

      {/* Executive branch chooser — full-screen popup dialog */}
      {govExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-[#0f1a2f]/55 backdrop-blur-sm"
            onClick={() => setGovExpanded(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-label={govMenuTitle}
            className="relative z-10 w-[560px] max-w-full rounded-[24px] border-2 border-[#cfae72] bg-[#fbf5eb] px-8 py-7 shadow-[0_36px_90px_rgba(84,54,16,0.4)]"
          >
            <div className="mb-6 flex items-start justify-end gap-4">
              <button
                type="button"
                onClick={() => setGovExpanded(false)}
                aria-label="Close"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#cfae72] text-[#9b6d35] transition-colors hover:bg-[#f0e4c9]"
              >
                <X size={20} strokeWidth={1.8} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {govMenuItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setGovExpanded(false);
                    item.onClick?.();
                  }}
                  className="flex cursor-pointer items-center gap-4 overflow-hidden rounded-[18px] border-2 border-[#cfae72] bg-white px-5 py-4 text-start text-[#17233b] shadow-[0_14px_35px_rgba(84,54,16,0.14)] transition-transform duration-200 active:scale-[0.99]"
                >
                  <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-[#d9b477] bg-[#fbf5eb] ring-1 ring-[#e6d5ac]">
                    <img
                      src={item.iconSrc}
                      alt=""
                      className={`h-full w-full object-cover ${item.iconScale ?? ""}`}
                      style={item.iconObjectPosition ? { objectPosition: item.iconObjectPosition } : undefined}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block ${displayFont} text-[22px] font-light leading-tight text-[#17233b]`}>
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-[15px] font-light leading-snug text-[#9b6d35]">
                      {item.sub}
                    </span>
                  </span>
                  <ArrowRight size={24} strokeWidth={1.6} className="shrink-0 text-[#b99152] rtl:rotate-180" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
