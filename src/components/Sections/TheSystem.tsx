import React from "react";
import { ArrowLeft, ArrowRight, Landmark, Building2, Bird } from "lucide-react";
import { sectionBackButtonClassName, sectionBackIconClassName } from "@/constants/backNavigation";
import gsap from "gsap";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import bg from "@/assets/mainImages/system.webp"

function Logo() {
  return (
    <div className="flex items-center gap-5">
      <div className="grid h-18 w-18 place-items-center rounded-t-[28px] border-2 border-[#bd9650] text-[#bd9650]">
        <Landmark size={42} strokeWidth={1.4} />
      </div>
      <h2 className="font-serif text-[34px] text-[#17233b]">Gate of Kurdistan</h2>
    </div>
  );
}

function HeaderButton({ icon, label }) {
  return (
    <button className="flex flex-col items-center gap-1 text-[#17233b]">
      <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-[#d7bd8a] bg-white/55 shadow-sm">
        {icon}
      </span>
      <span className="text-[18px]">{label}</span>
    </button>
  );
}

function InstitutionNode({
  label,
  icon,
  color,
  className = "",
  onClick,
  nodeId,
  displayFont = "font-serif",
}: {
  label: string;
  icon: React.ElementType;
  color: string;
  className?: string;
  onClick?: () => void;
  nodeId?: string;
  displayFont?: string;
}) {
  const Icon = icon;
  const content = (
    <>
      <div className={`grid h-48 w-48 place-items-center rounded-full border-[7px] border-white ${color} text-[#f8e5b8] shadow-[0_10px_28px_rgba(84,54,16,0.2)] ring-2 ring-[#c49a55]`}>
        <Icon className="h-[92px] w-[92px]" strokeWidth={1.35} />
      </div>
      <p className={`mt-6 rounded-full px-5 py-1.5 ${displayFont} text-[36px] font-light uppercase tracking-[0.06em] text-[#17233b]`}>
        {label}
      </p>
    </>
  );

  if (!onClick) {
    return (
      <div data-system-node={nodeId} className={`absolute flex flex-col items-center ${className}`}>
        {content}
      </div>
    );
  }

  return (
    <button
      data-system-node={nodeId}
      type="button"
      onClick={onClick}
      className={`absolute flex flex-col items-center appearance-none border-0 bg-transparent p-0 text-inherit cursor-pointer ${className}`}
    >
      {content}
    </button>
  );
}

type SystemPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
  onPrimeMinisterClick?: () => void;
  onParliamentClick?: () => void;
  onGovernmentClick?: () => void;
  onPresidencyClick?: () => void;
};

export default function SystemPage({ lang = "en", onBack, onPrimeMinisterClick, onParliamentClick, onGovernmentClick, onPresidencyClick }: SystemPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const canvasRef = React.useRef<HTMLDivElement | null>(null);
  const [fit, setFit] = React.useState({ scale: 1, x: 0 });

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
      gsap.set("[data-system-bg='true']", { autoAlpha: 0, y: 18, scale: 1.04 });
      gsap.set("[data-system-hero='true']", { autoAlpha: 0, y: 20 });
      gsap.set("[data-system-triangle='true']", { autoAlpha: 0, rotate: -14, scale: 0.94, transformOrigin: "50% 50%" });
      gsap.set("[data-system-node]", { autoAlpha: 0, y: 28, scale: 0.9 });
      gsap.set("[data-system-footer='true']", { autoAlpha: 0, y: 24 });
      gsap.set("[data-system-prime-border='true']", { clipPath: "inset(0 100% 0 0 round 30px)" });
      gsap.set("[data-system-prime-text='true']", { autoAlpha: 0, y: 12 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to("[data-system-prime-border='true']", {
        clipPath: "inset(0 0% 0 0 round 30px)",
        duration: 0.95,
        ease: "power3.out",
      })
        .to(
          "[data-system-prime-text='true']",
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.08",
        )
        .to(
          "[data-system-triangle='true']",
          { autoAlpha: 1, rotate: 0, scale: 1, duration: 1.15, ease: "power3.out" },
          "-=0.05",
        )
        .to(
          "[data-system-bg='true']",
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 },
          "<+=0.1",
        )
        .to(
          "[data-system-node]",
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.14 },
          "-=0.7",
        )
        .to(
          "[data-system-hero='true']",
          { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.1 },
          "-=0.2",
        )
        .to(
          "[data-system-footer='true']",
          { autoAlpha: 1, y: 0, duration: 0.8 },
          "-=0.2",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      dir={dir}
      className={`relative h-screen w-screen overflow-hidden bg-[#f8f1e7] ${isRtlScript ? "font-amiri" : ""}`}
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
        <main className="m-0 w-full bg-[#f8f1e7] text-[#17233b]">
          <section
            ref={sectionRef}
            className="relative mx-auto flex w-full flex-col overflow-hidden rounded-[22px] bg-[#fbf5eb]"
          >
            <button
              type="button"
              onClick={onBack}
              className={sectionBackButtonClassName}
              aria-label="Back to Discover"
            >
              <ArrowLeft className={`${sectionBackIconClassName} rtl:rotate-180`} />
            </button>
            <div className="absolute left-0 top-[120px] block h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] rtl:left-auto rtl:right-0" />

            {/* Hero illustration overlay */}
            <div data-system-bg="true" className="pointer-events-none absolute right-0 top-0 z-0 h-[700px] w-full overflow-hidden rtl:right-auto rtl:left-0">
              <div className={`absolute inset-0 ${dir === "rtl" ? "-scale-x-100" : ""}`}>
                <img
                  src={bg}
                  alt="System building placeholder"
                  className="absolute inset-0 h-full w-full object-cover object-right opacity-72 [mask-image:linear-gradient(to_bottom,black_0%,black_72%,rgba(0,0,0,0.75)_82%,rgba(0,0,0,0.35)_92%,transparent_100%)]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/25 to-transparent rtl:bg-gradient-to-l" />
              <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-b from-transparent via-[#fbf5eb]/40 to-[#fbf5eb]" />
            </div>

            <div className="relative z-10 flex flex-col px-20 pb-14 pt-20">
            <section className="max-w-[760px]">
              <h1 data-system-hero="true" className={`break-words ${displayFont} text-[118px] font-light leading-[1.03] tracking-tight text-[#17233b]`}>
                {title}
              </h1>

              <p data-system-hero="true" className="mt-8 break-words text-[46px] font-light leading-tight text-[#9b6d35]">
                {heading}
              </p>

              <div data-system-hero="true" className="mt-10 flex w-full max-w-[280px] items-center gap-4 text-[#b99152]">
                <span className="h-0.5 flex-1 bg-[#b99152]" />
                <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
              </div>

              <p data-system-hero="true" className="mt-6 max-w-[700px] break-words text-[36px] font-light leading-[1.5] text-[#2d3549]">
                {description}
              </p>
            </section>

            {/* Diagram (fixed 900×710, scales with the page) */}
            <div className="relative mx-auto mt-20 h-[710px] w-[900px]">
              <section data-system-triangle="true" className="relative h-full w-full">
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 710" fill="none">
                  <circle cx="450" cy="350" r="318" stroke="#d8c09a" strokeWidth="1" strokeDasharray="4 7" />
                  <circle cx="450" cy="350" r="242" stroke="#d8c09a" strokeWidth="1" strokeDasharray="4 7" />
                  <path d="M450 116 C330 180 234 288 210 458" stroke="#b99152" strokeWidth="4" fill="none" />
                  <path d="M450 116 C575 180 670 288 700 458" stroke="#b99152" strokeWidth="4" fill="none" />
                  <path d="M210 458 C330 528 570 528 700 458" stroke="#b99152" strokeWidth="4" fill="none" />
                  <path d="M450 302 L450 370 M315 458 L450 370 M585 458 L450 370" stroke="#b99152" strokeWidth="4" />
                  {[450, 210, 700, 315, 585, 450].map((x, i) => (
                    <circle key={i} cx={x} cy={i === 0 ? 116 : i === 1 || i === 2 ? 458 : i === 5 ? 370 : 458} r="12" fill="#c59a4b" />
                  ))}
                </svg>

                <InstitutionNode
                  label={parliamentLabel}
                  icon={Landmark}
                  color="bg-[#13213b]"
                  className="left-1/2 top-1 -translate-x-1/2"
                  onClick={onParliamentClick}
                  nodeId="parliament"
                  displayFont={displayFont}
                />
                <InstitutionNode
                  label={governmentLabel}
                  icon={Building2}
                  color="bg-[#405846]"
                  className="left-[28px] top-[346px]"
                  onClick={onGovernmentClick}
                  nodeId="government"
                  displayFont={displayFont}
                />
                <InstitutionNode
                  label={presidencyLabel}
                  icon={Bird}
                  color="bg-[#9d3637]"
                  className="right-[28px] top-[346px]"
                  onClick={onPresidencyClick}
                  nodeId="presidency"
                  displayFont={displayFont}
                />

                <div className="absolute left-1/2 top-[350px] grid h-24 w-24 -translate-x-1/2 place-items-center rounded-full border-2 border-[#d4b476] bg-[#fbf5eb] text-[#b99152] shadow-sm">
                  <span className="text-5xl">✥</span>
                </div>
              </section>
            </div>

            {/* Prime Minister card */}
            <div
              data-system-prime="true"
              data-system-prime-border="true"
              className="mx-auto mt-10 w-full max-w-[780px] rounded-[30px] border-4 border-[#ead8b7] bg-white/62 p-[3px] shadow-[0_12px_30px_rgba(84,54,16,0.14)]"
            >
              <button
                type="button"
                onClick={onPrimeMinisterClick}
                className={`flex h-[150px] w-full items-center justify-between gap-2 rounded-[27px] px-16 ${displayFont} text-[55px] font-light text-[#17233b]`}
              >
                <span data-system-prime-text="true" className="shrink-0 text-[#b99152] text-6xl">✥</span>
                <span data-system-prime-text="true" className="text-center">{primeMinisterLabel}</span>
                <ArrowRight data-system-prime-text="true" strokeWidth={1.6} className="h-14 w-14 shrink-0 text-[#b99152] rtl:rotate-180" />
              </button>
            </div>

            {/* System Footer info */}
            <div data-system-footer="true" className="mt-10 flex min-h-[132px] flex-row items-center rounded-[20px] border-2 border-[#ead8b7] bg-white/62 shadow-[0_10px_25px_rgba(84,54,16,0.1)]">
              <div className="ms-12 me-14 grid h-28 w-28 shrink-0 place-items-center rounded-full bg-[#c59a4b] text-[#f8e5b8] ring-4 ring-white">
                <span className="text-5xl">✥</span>
              </div>
              <p className={`p-4 text-start ${displayFont} font-light text-[34px] leading-tight text-[#17233b]`}>
                {footerText}
              </p>
            </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}