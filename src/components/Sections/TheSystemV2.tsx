import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { sectionBackButtonClassName, sectionBackButtonSideClassName, sectionBackIconClassName } from "@/constants/backNavigation";
import gsap from "gsap";
import { discoverDisplayFont, discoverRtlScript, type DiscoverLangCode } from "@/components/Sections/discoverLanguage";
import DiscoverLanguageButton from "@/components/Sections/DiscoverLanguageButton";
import { useDiscoverLanguageTransition } from "@/components/Sections/useDiscoverLanguageTransition";
import heroImg from "@/assets/mainImages/thesystem/parlaman.webp";
import pmImg from "@/assets/mainImages/thesystem/system-1.webp";

function InstitutionRow({
  numeral,
  label,
  sub,
  accent,
  onClick,
  displayFont,
}: {
  numeral: string;
  label: string;
  sub: string;
  accent: string;
  onClick?: () => void;
  displayFont: string;
}) {
  return (
    <button
      data-sys2-row="true"
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-8 py-9 text-start transition-opacity duration-300 active:opacity-70"
    >
      <span className="relative grid h-16 w-16 shrink-0 place-items-center">
        <span className="absolute inset-0 rotate-45 border border-[#cfae72]" />
        <span className="font-serif text-[26px] text-[#9b6d35]">{numeral}</span>
        <span className="absolute -bottom-1.5 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45" style={{ backgroundColor: accent }} />
      </span>

      <span className="min-w-0 flex-1">
        <span data-discover-lang="true" className={`block break-words ${displayFont} text-[46px] font-light leading-tight text-[#17233b]`}>
          {label}
        </span>
        <span data-discover-lang="true" className="mt-1.5 block break-words text-[24px] font-light tracking-wide text-[#9b6d35]">
          {sub}
        </span>
      </span>

      <ArrowRight strokeWidth={1.2} className="h-10 w-10 shrink-0 text-[#b99152] transition-transform duration-300 group-active:translate-x-1 rtl:rotate-180 rtl:group-active:-translate-x-1" />
    </button>
  );
}

function OrnamentDivider({ dataAttr }: { dataAttr?: string }) {
  return (
    <div data-sys2-ornament={dataAttr ? "true" : undefined} className="flex items-center justify-center gap-4 text-[#b99152]">
      <span className="h-px w-24 bg-gradient-to-r from-transparent to-[#b99152]" />
      <span className="h-2 w-2 rotate-45 border border-[#b99152]" />
      <span className="text-2xl leading-none">✥</span>
      <span className="h-2 w-2 rotate-45 border border-[#b99152]" />
      <span className="h-px w-24 bg-gradient-to-l from-transparent to-[#b99152]" />
    </div>
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

export default function SystemPageV2({ lang = "en", onBack, onPrimeMinisterClick, onParliamentClick, onGovernmentClick, onPresidencyClick, onLanguageChange }: SystemPageProps) {
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
      gsap.set("[data-sys2-ornament='true']", { autoAlpha: 0, scaleX: 0.4, transformOrigin: "50% 50%" });
      gsap.set("[data-sys2-title]", { autoAlpha: 0, y: 36 });
      gsap.set("[data-sys2-arch='true']", { clipPath: "inset(100% 0 0 0)" });
      gsap.set("[data-sys2-desc='true']", { autoAlpha: 0, y: 22 });
      gsap.set("[data-sys2-row='true']", { autoAlpha: 0, y: 26 });
      gsap.set("[data-sys2-rule='true']", { scaleX: 0, transformOrigin: dir === "rtl" ? "100% 50%" : "0% 50%" });
      gsap.set("[data-sys2-pm='true']", { autoAlpha: 0, y: 26 });
      gsap.set("[data-sys2-footer='true']", { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => setIntroDone(true),
      });
      tl.to("[data-sys2-ornament='true']", { autoAlpha: 1, scaleX: 1, duration: 0.9, ease: "power3.out" })
        .to("[data-sys2-title]", { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.14 }, "-=0.5")
        .to("[data-sys2-arch='true']", { clipPath: "inset(0% 0 0 0)", duration: 1.3, ease: "power3.inOut" }, "-=0.55")
        .to("[data-sys2-desc='true']", { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.7")
        .to("[data-sys2-rule='true']", { scaleX: 1, duration: 0.9, stagger: 0.12, ease: "power3.out" }, "-=0.45")
        .to("[data-sys2-row='true']", { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.14 }, "<0.1")
        .to("[data-sys2-pm='true']", { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.3")
        .to("[data-sys2-footer='true']", { autoAlpha: 1, duration: 0.8 }, "-=0.25");
    }, sectionRef);

    return () => ctx.revert();
  }, [dir]);

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
            className="relative mx-auto flex w-full flex-col overflow-hidden bg-[#fbf5eb] px-24 pb-16 pt-20"
          >
            {/* Faint corner motifs */}
            <div className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full border border-[#e3d3b3]" />
            <div className="pointer-events-none absolute -end-16 -top-16 h-72 w-72 rounded-full border border-[#e3d3b3]" />
            <div className="pointer-events-none absolute -bottom-28 -start-28 h-80 w-80 rounded-full border border-[#e3d3b3]" />

            {/* Monumental centered header */}
            <header className="relative flex flex-col items-center text-center">
              <OrnamentDivider dataAttr="true" />
              <h1 data-sys2-title="true" data-discover-lang="true" className={`mt-8 break-words ${displayFont} text-[116px] font-light leading-[1.02] tracking-tight text-[#17233b]`}>
                {title}
              </h1>
              <p data-sys2-title="true" data-discover-lang="true" className="mt-5 max-w-[980px] break-words text-[40px] font-light leading-tight text-[#9b6d35]">
                {heading}
              </p>
            </header>

            {/* Arched portrait of parliament + institution index */}
            <div className="mt-16 flex items-stretch gap-20">
              <figure data-sys2-arch="true" className="relative w-[520px] shrink-0">
                <div className="rounded-b-[30px] rounded-t-[264px] border border-[#cfae72] p-4">
                  <div className="overflow-hidden rounded-b-[18px] rounded-t-[248px]">
                    <img
                      src={heroImg}
                      alt="Kurdistan Regional Parliament building"
                      className="h-[780px] w-full object-cover object-center"
                    />
                  </div>
                </div>
                <figcaption className="mt-6 flex items-center justify-center gap-4 text-[#b99152]">
                  <span className="h-px w-16 bg-[#cfae72]" />
                  <span className="h-2 w-2 rotate-45 border border-[#b99152]" />
                  <span className="h-px w-16 bg-[#cfae72]" />
                </figcaption>
              </figure>

              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <p data-sys2-desc="true" data-discover-lang="true" className="break-words text-[34px] font-light leading-[1.55] text-[#2d3549]">
                  {description}
                </p>

                <div className="mt-10">
                  <span data-sys2-rule="true" className="block h-px w-full bg-[#dcc79c]" />
                  <InstitutionRow
                    numeral="I"
                    label={parliamentLabel}
                    sub={parliamentSub}
                    accent="#13213b"
                    onClick={onParliamentClick}
                    displayFont={displayFont}
                  />
                  <span data-sys2-rule="true" className="block h-px w-full bg-[#dcc79c]" />
                  <InstitutionRow
                    numeral="II"
                    label={governmentLabel}
                    sub={governmentSub}
                    accent="#405846"
                    onClick={onGovernmentClick}
                    displayFont={displayFont}
                  />
                  <span data-sys2-rule="true" className="block h-px w-full bg-[#dcc79c]" />
                  <InstitutionRow
                    numeral="III"
                    label={presidencyLabel}
                    sub={presidencySub}
                    accent="#9d3637"
                    onClick={onPresidencyClick}
                    displayFont={displayFont}
                  />
                  <span data-sys2-rule="true" className="block h-px w-full bg-[#dcc79c]" />
                </div>

                {/* Prime Minister — distinguished cameo row */}
                <button
                  data-sys2-pm="true"
                  type="button"
                  onClick={onPrimeMinisterClick}
                  className="group mt-12 flex w-full items-center gap-9 rounded-[999px] border border-[#cfae72] bg-white/55 py-5 ps-5 pe-10 text-start shadow-[0_10px_30px_rgba(84,54,16,0.10)] transition-transform duration-300 active:scale-[0.99]"
                >
                  <span className="relative h-[118px] w-[118px] shrink-0 rounded-full border border-[#cfae72] p-1.5">
                    <img
                      src={pmImg}
                      alt="Prime Minister of the Kurdistan Region"
                      className="h-full w-full rounded-full object-cover"
                      style={{ objectPosition: "68% 12%" }}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span data-discover-lang="true" className={`block break-words ${displayFont} text-[44px] font-light leading-tight text-[#17233b]`}>
                      {primeMinisterLabel}
                    </span>
                    <span data-discover-lang="true" className="mt-1 block break-words text-[23px] font-light text-[#9b6d35]">
                      {primeMinisterSub}
                    </span>
                  </span>
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[#b99152] text-[#b99152] transition-colors duration-300 group-active:bg-[#b99152] group-active:text-[#fbf5eb]">
                    <ArrowRight strokeWidth={1.3} className="h-8 w-8 rtl:rotate-180" />
                  </span>
                </button>
              </div>
            </div>

            {/* Closing line */}
            <footer data-sys2-footer="true" className="mt-16 flex flex-col items-center gap-6 text-center">
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
