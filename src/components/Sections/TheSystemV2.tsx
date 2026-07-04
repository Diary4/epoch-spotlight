import React from "react";
import { ArrowLeft, ArrowRight, Landmark, Building2, Bird } from "lucide-react";
import { sectionBackButtonClassName, sectionBackButtonSideClassName, sectionBackIconClassName } from "@/constants/backNavigation";
import gsap from "gsap";
import { discoverDisplayFont, discoverRtlScript, type DiscoverLangCode } from "@/components/Sections/discoverLanguage";
import DiscoverLanguageButton from "@/components/Sections/DiscoverLanguageButton";
import { useDiscoverLanguageTransition } from "@/components/Sections/useDiscoverLanguageTransition";
import heroImg from "@/assets/mainImages/thesystem/parlaman.webp";
import pmImg from "@/assets/mainImages/thesystem/system-1.webp";

function InstitutionCard({
  index,
  label,
  sub,
  icon,
  accent,
  onClick,
  displayFont,
}: {
  index: string;
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
      data-sys2-card="true"
      type="button"
      onClick={onClick}
      className="group relative flex h-[430px] flex-1 flex-col items-start overflow-hidden rounded-[28px] border-2 border-[#ead8b7] bg-white/70 px-10 pt-10 pb-9 text-start shadow-[0_14px_34px_rgba(84,54,16,0.12)] transition-transform duration-300 active:scale-[0.98]"
    >
      <span className={`absolute end-8 top-7 font-serif text-[64px] font-light leading-none text-[#e4cf9f]`}>{index}</span>
      <span className="absolute inset-x-0 top-0 h-[10px]" style={{ backgroundColor: accent }} />

      <span
        className="grid h-36 w-36 place-items-center rounded-full text-[#f8e5b8] shadow-[0_10px_24px_rgba(84,54,16,0.22)] ring-4 ring-white"
        style={{ backgroundColor: accent }}
      >
        <Icon className="h-[68px] w-[68px]" strokeWidth={1.35} />
      </span>

      <span data-discover-lang="true" className={`mt-9 ${displayFont} text-[46px] font-light leading-tight text-[#17233b]`}>
        {label}
      </span>
      <span data-discover-lang="true" className="mt-3 text-[26px] font-light leading-snug text-[#9b6d35]">
        {sub}
      </span>

      <span className="mt-auto flex items-center gap-3 text-[#b99152]">
        <span className="h-0.5 w-14 bg-[#b99152] transition-all duration-300 group-active:w-20" />
        <ArrowRight strokeWidth={1.6} className="h-9 w-9 rtl:rotate-180" />
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
      gsap.set("[data-sys2-hero='true']", { clipPath: "inset(0 0 100% 0)" });
      gsap.set("[data-sys2-title]", { autoAlpha: 0, y: 44 });
      gsap.set("[data-sys2-desc='true']", { autoAlpha: 0, y: 26 });
      gsap.set("[data-sys2-card='true']", { autoAlpha: 0, y: 46 });
      gsap.set("[data-sys2-pm='true']", { autoAlpha: 0, y: 40 });
      gsap.set("[data-sys2-pm-text='true']", { autoAlpha: 0, y: 16 });
      gsap.set("[data-sys2-footer='true']", { autoAlpha: 0, y: 20 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => setIntroDone(true),
      });
      tl.to("[data-sys2-hero='true']", {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.2,
        ease: "power3.out",
      })
        .to("[data-sys2-title]", { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.12 }, "-=0.55")
        .to("[data-sys2-desc='true']", { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.35")
        .to("[data-sys2-card='true']", { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.15 }, "-=0.3")
        .to("[data-sys2-pm='true']", { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.25")
        .to("[data-sys2-pm-text='true']", { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.08 }, "-=0.4")
        .to("[data-sys2-footer='true']", { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.2");
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
        <ArrowLeft className={sectionBackIconClassName} />
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
            className="relative mx-auto flex w-full flex-col overflow-hidden bg-[#fbf5eb]"
          >
            {/* Cinematic hero — full-width parliament photo with navy gradient and overlaid title */}
            <div data-sys2-hero="true" className="relative h-[620px] w-full overflow-hidden">
              <img
                src={heroImg}
                alt="Kurdistan Regional Parliament building"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#13213b]/35 via-[#13213b]/25 to-[#0d1830]/92" />
              <div className="absolute inset-x-6 inset-y-6 rounded-[26px] border border-[#d4b476]/45" />

              <div className="absolute inset-x-0 bottom-0 px-24 pb-16">
                <div data-sys2-title="true" className="flex items-center gap-4 text-[#e2c07f]">
                  <span className="h-0.5 w-16 bg-[#e2c07f]" />
                  <span className="h-3 w-3 rotate-45 border-2 border-[#e2c07f]" />
                  <span className="h-0.5 w-16 bg-[#e2c07f]" />
                </div>
                <h1 data-sys2-title="true" data-discover-lang="true" className={`mt-5 break-words ${displayFont} text-[112px] font-light leading-[1.02] tracking-tight text-[#fbf5eb]`}>
                  {title}
                </h1>
                <p data-sys2-title="true" data-discover-lang="true" className="mt-4 max-w-[900px] break-words text-[42px] font-light leading-tight text-[#e2c07f]">
                  {heading}
                </p>
              </div>
            </div>

            <div className="relative z-10 flex flex-col px-24 pb-16 pt-14">
              {/* Side geometric strip, echoing the V1 motif */}
              <div className="pointer-events-none absolute bottom-0 end-0 top-0 w-20 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

              <p data-sys2-desc="true" data-discover-lang="true" className="max-w-[1000px] break-words text-[36px] font-light leading-[1.5] text-[#2d3549]">
                {description}
              </p>

              {/* Three institutions */}
              <div className="relative mt-14">
                <div className="pointer-events-none absolute inset-x-10 top-[92px] h-0.5 bg-[#d8c09a]" />
                <div className="relative flex items-stretch gap-10">
                  <InstitutionCard
                    index="01"
                    label={parliamentLabel}
                    sub={parliamentSub}
                    icon={Landmark}
                    accent="#13213b"
                    onClick={onParliamentClick}
                    displayFont={displayFont}
                  />
                  <InstitutionCard
                    index="02"
                    label={governmentLabel}
                    sub={governmentSub}
                    icon={Building2}
                    accent="#405846"
                    onClick={onGovernmentClick}
                    displayFont={displayFont}
                  />
                  <InstitutionCard
                    index="03"
                    label={presidencyLabel}
                    sub={presidencySub}
                    icon={Bird}
                    accent="#9d3637"
                    onClick={onPresidencyClick}
                    displayFont={displayFont}
                  />
                </div>
              </div>

              {/* Prime Minister feature card */}
              <button
                data-sys2-pm="true"
                type="button"
                onClick={onPrimeMinisterClick}
                className="group relative mt-14 flex h-[320px] w-full items-stretch overflow-hidden rounded-[32px] bg-[#13213b] text-start shadow-[0_18px_44px_rgba(19,33,59,0.32)] transition-transform duration-300 active:scale-[0.99]"
              >
                <div className="relative h-full w-[430px] shrink-0 overflow-hidden">
                  <img
                    src={pmImg}
                    alt="Prime Minister of the Kurdistan Region"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                  <div className={`absolute inset-y-0 w-40 bg-gradient-to-r from-transparent to-[#13213b] ${dir === "rtl" ? "left-0 rotate-180" : "right-0"}`} />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center px-16">
                  <span data-sys2-pm-text="true" className="flex items-center gap-4 text-[#e2c07f]">
                    <span className="text-4xl leading-none">✥</span>
                    <span className="h-0.5 w-16 bg-[#e2c07f]/70" />
                  </span>
                  <span data-sys2-pm-text="true" data-discover-lang="true" className={`mt-4 break-words ${displayFont} text-[64px] font-light leading-tight text-[#fbf5eb]`}>
                    {primeMinisterLabel}
                  </span>
                  <span data-sys2-pm-text="true" data-discover-lang="true" className="mt-3 break-words text-[30px] font-light text-[#e2c07f]">
                    {primeMinisterSub}
                  </span>
                </div>

                <div className="flex items-center pe-14">
                  <span data-sys2-pm-text="true" className="grid h-24 w-24 place-items-center rounded-full border-2 border-[#e2c07f]/70 text-[#e2c07f] transition-colors duration-300 group-active:bg-[#e2c07f] group-active:text-[#13213b]">
                    <ArrowRight strokeWidth={1.6} className="h-12 w-12 rtl:rotate-180" />
                  </span>
                </div>
              </button>

              {/* Footer line */}
              <div data-sys2-footer="true" className="mt-14 flex items-center gap-8">
                <span className="h-px flex-1 bg-[#d8c09a]" />
                <p data-discover-lang="true" className={`max-w-[900px] text-center ${displayFont} text-[32px] font-light leading-snug text-[#17233b]`}>
                  {footerText}
                </p>
                <span className="h-px flex-1 bg-[#d8c09a]" />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
