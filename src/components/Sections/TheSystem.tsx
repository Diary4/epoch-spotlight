import React from "react";
import { ArrowLeft, ArrowRight, Landmark, Building2, Bird } from "lucide-react";
import { sectionBackButtonClassName, sectionBackButtonSideClassName, sectionBackIconClassName } from "@/constants/backNavigation";
import gsap from "gsap";
import { discoverDisplayFont, discoverRtlScript, type DiscoverLangCode } from "@/components/Sections/discoverLanguage";
import DiscoverLanguageButton from "@/components/Sections/DiscoverLanguageButton";
import { useDiscoverLanguageTransition } from "@/components/Sections/useDiscoverLanguageTransition";
import heroImg from "@/assets/mainImages/thesystem/parlaman.webp";
import pmImg from "@/assets/mainImages/thesystem/system-1.webp";

function OrnamentDivider({ dataAttr }: { dataAttr?: string }) {
  return (
    <div data-sys-ornament={dataAttr ? "true" : undefined} className="flex items-center justify-center gap-4 text-[#b99152]">
      <span className="h-px w-24 bg-gradient-to-r from-transparent to-[#b99152]" />
      <span className="h-2 w-2 rotate-45 border border-[#b99152]" />
      <span className="text-2xl leading-none">✥</span>
      <span className="h-2 w-2 rotate-45 border border-[#b99152]" />
      <span className="h-px w-24 bg-gradient-to-l from-transparent to-[#b99152]" />
    </div>
  );
}

function InstitutionCard({
  numeral,
  label,
  sub,
  icon,
  accent,
  onClick,
  displayFont,
}: {
  numeral: string;
  label: string;
  sub: string;
  icon: React.ElementType;
  accent: string;
  onClick?: () => void;
  displayFont: string;
}) {
  const Icon = icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full w-full flex-col items-center rounded-b-[28px] rounded-t-[999px] border border-[#d9c194] bg-[#fdf8ee] px-8 pb-12 pt-16 text-center shadow-[0_18px_45px_rgba(84,54,16,0.14)] transition-transform duration-300 active:scale-[0.985]"
    >
      <span
        className="grid h-36 w-36 shrink-0 place-items-center rounded-full text-[#f8e5b8] shadow-[0_10px_24px_rgba(84,54,16,0.22)] ring-1 ring-[#c49a55] ring-offset-[6px] ring-offset-[#fdf8ee]"
        style={{ backgroundColor: accent }}
      >
        <Icon className="h-[70px] w-[70px]" strokeWidth={1.3} />
      </span>
      <span className="mt-8 font-serif text-[22px] tracking-[0.35em] text-[#b99152]">{numeral}</span>
      <span data-discover-lang="true" className={`mt-3 block w-full break-words ${displayFont} text-[44px] font-light leading-tight text-[#17233b]`}>
        {label}
      </span>
      <span data-discover-lang="true" className="mt-3 block w-full break-words text-[23px] font-light leading-snug text-[#9b6d35]">
        {sub}
      </span>
      <span className="mt-auto pt-9">
        <span className="grid h-14 w-14 place-items-center rounded-full border border-[#b99152] text-[#b99152] transition-colors duration-300 group-active:bg-[#b99152] group-active:text-[#fbf5eb]">
          <ArrowRight strokeWidth={1.3} className="h-7 w-7 rtl:rotate-180" />
        </span>
      </span>
    </button>
  );
}

type SystemPageProps = {
  lang?: DiscoverLangCode;
  onBack?: () => void;
  onPrimeMinisterClick?: () => void;
  onParliamentClick?: () => void;
  onGovernmentClick?: () => void;
  onPresidencyClick?: () => void;
  onLanguageChange?: (lang: DiscoverLangCode) => void;
};

export default function SystemPage({ lang = "en", onBack, onPrimeMinisterClick, onParliamentClick, onGovernmentClick, onPresidencyClick, onLanguageChange }: SystemPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const canvasRef = React.useRef<HTMLDivElement | null>(null);
  const [fit, setFit] = React.useState({ scale: 1, x: 0 });
  const [introDone, setIntroDone] = React.useState(false);
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
  const isRtlScript = discoverRtlScript(lang);
  const displayFont = discoverDisplayFont(lang);
  const dir = lang === "en" ? "ltr" : "rtl";

  const title = isAr ? "النظام" : isKu ? "سیستەمەکە" : "The System";
  const heading = isAr ? "كيف تعمل مؤسسات كوردستان معًا." : isKu ? "چۆنیەتی کارکردنی دامەزراوەکانی کوردستان پێکەوە." : "How Kurdistan’s institutions work together.";
  const description = isAr
    ? "يعمل إقليم كوردستان وفق نظام برلماني تتعاون فيه المؤسسات لخدمة الحياة العامة."
    : isKu
      ? "هەرێمی کوردستان لە ڕێگەی سیستەمێکی پەرلەمانییەوە بەڕێوە دەبرێت کە تێیدا دامەزراوەکان پێکەوە کاردەکەن بۆ پاڵپشتیکردنی ژیانی گشتی."
      : "The Kurdistan Region operates through a parliamentary system in which institutions work together to support public life.";
  const parliamentLabel = isAr ? "البرلمان" : isKu ? "پەرلەمان" : "Parliament";
  const governmentLabel = isAr ? "الحكومة" : isKu ? "حکومەت" : "Government";
  const presidencyLabel = isAr ? "الرئاسة" : isKu ? "سەرۆکایەتی" : "Presidency";
  const primeMinisterLabel = isAr ? "رئيس الوزراء" : isKu ? "سەرۆک وەزیران" : "Prime Minister";
  const parliamentSub = isAr ? "التشريع والرقابة" : isKu ? "یاسادانان و چاودێری" : "Legislation & oversight";
  const governmentSub = isAr ? "التنفيذ والخدمات العامة" : isKu ? "جێبەجێکردن و خزمەتگوزارییە گشتییەکان" : "Executive & public services";
  const presidencySub = isAr ? "رئاسة الإقليم" : isKu ? "سەرۆکایەتی هەرێم" : "Head of the Region";
  const primeMinisterSub = isAr ? "رئيس مجلس الوزراء" : isKu ? "سەرۆکی ئەنجومەنی وەزیران" : "Head of the Council of Ministers";
  const footerText = isAr
    ? "تدعم هذه المؤسسات مجتمعةً الحوكمة والقانون والإدارة العامة."
    : isKu
      ? "ئەم دامەزراوانە پێکەوە پاڵپشتیی حکومەت, یاسا، و کارگێڕی گشتی دەکەن."
      : "Together, these institutions support governance, law, and public administration.";

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
      gsap.set("[data-sys-card='true']", { autoAlpha: 0, y: 44 });
      gsap.set("[data-sys-pm='true']", { autoAlpha: 0, y: 18, scale: 0.9 });
      gsap.set("[data-sys-footer='true']", { autoAlpha: 0, y: 20 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => setIntroDone(true),
      });
      tl.to("[data-sys-ornament='true']", { autoAlpha: 1, scaleX: 1, duration: 0.9, ease: "power3.out" })
        .to("[data-sys-title]", { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.12 }, "-=0.5")
        .to("[data-sys-banner='true']", { clipPath: "inset(0 0 0% 0)", duration: 1.25, ease: "power3.inOut" }, "-=0.55")
        .to("[data-sys-card='true']", { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.16 }, "-=0.6")
        .to("[data-sys-pm='true']", { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.6)" }, "-=0.15")
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
              <OrnamentDivider dataAttr="true" />
              <h1 data-sys-title="true" data-discover-lang="true" className={`mt-8 break-words ${displayFont} text-[112px] font-light leading-[1.02] tracking-tight text-[#17233b]`}>
                {title}
              </h1>
              <p data-sys-title="true" data-discover-lang="true" className="mt-5 max-w-[1000px] break-words text-[40px] font-light leading-tight text-[#9b6d35]">
                {heading}
              </p>
              <p data-sys-title="true" data-discover-lang="true" className="mt-6 max-w-[1060px] break-words text-[30px] font-light leading-[1.55] text-[#2d3549]">
                {description}
              </p>
            </header>

            {/* Framed panoramic banner of parliament */}
            <figure data-sys-banner="true" className="relative mt-12 w-full">
              <div className="rounded-[40px] border border-[#cfae72] p-2.5 shadow-[0_24px_60px_rgba(84,54,16,0.16)]">
                <div className="relative overflow-hidden rounded-[32px]">
                  <img
                    src={heroImg}
                    alt="Kurdistan Regional Parliament building"
                    className="h-[470px] w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17233b]/50 via-[#17233b]/10 to-transparent" />
                </div>
              </div>
            </figure>

            {/* Three institutions — arched cards overlapping the banner */}
            <div className="relative z-10 -mt-28 flex items-stretch gap-9 px-6 pb-16">
              <div data-sys-card="true" className="relative flex min-w-0 flex-1">
                <InstitutionCard
                  numeral="I"
                  label={parliamentLabel}
                  sub={parliamentSub}
                  icon={Landmark}
                  accent="#13213b"
                  onClick={onParliamentClick}
                  displayFont={displayFont}
                />
              </div>

              <div data-sys-card="true" className="relative flex min-w-0 flex-1">
                <InstitutionCard
                  numeral="II"
                  label={governmentLabel}
                  sub={governmentSub}
                  icon={Building2}
                  accent="#405846"
                  onClick={onGovernmentClick}
                  displayFont={displayFont}
                />

                {/* Prime Minister — small label pinned to the Government card */}
                <button
                  data-sys-pm="true"
                  type="button"
                  onClick={onPrimeMinisterClick}
                  className="group absolute inset-x-0 -bottom-12 z-20 mx-auto flex w-max max-w-[440px] items-center gap-4 rounded-full border border-[#cfae72] bg-[#17233b] py-2.5 ps-2.5 pe-8 shadow-[0_14px_32px_rgba(23,35,59,0.35)] transition-transform duration-300 active:scale-[0.97]"
                >
                  <img
                    src={pmImg}
                    alt="Prime Minister of the Kurdistan Region"
                    className="h-[74px] w-[74px] shrink-0 rounded-full border border-[#cfae72] object-cover"
                    style={{ objectPosition: "68% 12%" }}
                  />
                  <span className="min-w-0 text-start">
                    <span data-discover-lang="true" className={`block break-words ${displayFont} text-[30px] font-light leading-tight text-[#f8ecd2]`}>
                      {primeMinisterLabel}
                    </span>
                    <span data-discover-lang="true" className="mt-0.5 block break-words text-[17px] font-light leading-snug text-[#c9a45f]">
                      {primeMinisterSub}
                    </span>
                  </span>
                  <ArrowRight strokeWidth={1.4} className="h-7 w-7 shrink-0 text-[#c9a45f] rtl:rotate-180" />
                </button>
              </div>

              <div data-sys-card="true" className="relative flex min-w-0 flex-1">
                <InstitutionCard
                  numeral="III"
                  label={presidencyLabel}
                  sub={presidencySub}
                  icon={Bird}
                  accent="#9d3637"
                  onClick={onPresidencyClick}
                  displayFont={displayFont}
                />
              </div>
            </div>

            {/* Closing line */}
            <footer data-sys-footer="true" className="mt-4 flex flex-col items-center gap-6 text-center">
              <p data-discover-lang="true" className={`max-w-[980px] break-words ${displayFont} text-[30px] font-light leading-snug text-[#2d3549]`}>
                {footerText}
              </p>
              <OrnamentDivider />
            </footer>
          </section>
        </main>
      </div>
    </div>
  );
}
