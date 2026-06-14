import React from "react";
import { ArrowLeft, ArrowRight, Landmark, Building2, Bird } from "lucide-react";
import gsap from "gsap";
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
}: {
  label: string;
  icon: React.ElementType;
  color: string;
  className?: string;
  onClick?: () => void;
  nodeId?: string;
}) {
  const Icon = icon;
  const content = (
    <>
      <div className={`grid h-32 w-32 place-items-center rounded-full border-[7px] border-white ${color} text-[#f8e5b8] shadow-[0_10px_28px_rgba(84,54,16,0.2)] ring-2 ring-[#c49a55] xs:h-36 xs:w-36 md:h-44 md:w-44 lg:h-48 lg:w-48`}>
        <Icon className="h-14 w-14 xs:h-[76px] xs:w-[76px] md:h-[84px] md:w-[84px] lg:h-[92px] lg:w-[92px]" strokeWidth={1.35} />
      </div>
      <p className="mt-4 rounded-full px-5 py-1.5 font-serif text-[22px] font-light uppercase tracking-[0.06em] text-[#17233b] xs:mt-6 xs:text-[28px] md:text-[31px] lg:text-[36px]">
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
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = React.useState(1);

  const isAr = lang === "ar";
  const isKu = lang === "ku";
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

  // Measure and dynamically scale down the diagram to match any viewport width precisely
  React.useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const parentWidth = containerRef.current.parentElement?.clientWidth ?? 900;
      const horizontalPadding = parentWidth >= 460 ? 96 : 32;
      const targetWidth = parentWidth - horizontalPadding;
      if (targetWidth < 900) {
        setScale(targetWidth / 900);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    <main className="m-0 flex h-full min-h-0 w-full max-w-full flex-col bg-[#f8f1e7] p-0 text-[#17233b] overflow-hidden">
      <section
        ref={sectionRef}
        className="relative h-full min-h-0 w-full max-w-full overflow-x-hidden overflow-y-auto overscroll-y-contain bg-[#fbf5eb] [-webkit-overflow-scrolling:touch]"
      >
        <button
          type="button"
          onClick={onBack}
          className="absolute left-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-full border border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm xs:left-8 xs:top-8 xs:h-14 xs:w-14 lg:h-16 lg:w-16"
          aria-label="Back to Discover"
        >
          <ArrowLeft className="h-5 w-5 xs:h-7 xs:w-7 lg:h-8 lg:w-8" />
        </button>
        <div className="absolute left-0 top-[120px] hidden h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] xs:block" />

        {/* Mobile hero — only below xs (460px) */}
        <div className="relative h-[min(36vh,280px)] min-h-[190px] w-full overflow-hidden xs:hidden">
          <img
            src={bg}
            alt=""
            className="h-full w-full object-cover object-center opacity-70"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fbf5eb] to-transparent" />
        </div>

        {/* Desktop hero illustration — overlays text from xs (460px) up */}
        <div data-system-bg="true" className="pointer-events-none absolute right-[-100px] top-0 hidden h-[700px] w-full min-w-full xs:block">
          <img
            src={bg}
            alt="System building placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-50 md:opacity-72 [mask-image:radial-gradient(circle_at_58%_48%,black_0%,black_55%,transparent_84%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbf5eb]" />
        </div>

        <div className="relative z-10 flex min-h-full flex-col px-4 pb-8 pt-20 xs:px-12 xs:pb-10 xs:pt-16 md:px-16 md:pt-20 lg:px-20 lg:pb-14">
          <section className="max-w-[760px]">
            <h1 data-system-hero="true" className="break-words font-serif text-[clamp(40px,11vw,72px)] font-light leading-[1.03] tracking-tight text-[#17233b] xs:text-[86px] md:text-[100px] lg:text-[118px]">
              {title}
            </h1>

            <p data-system-hero="true" className="mt-4 break-words text-[clamp(18px,5vw,28px)] font-light leading-tight text-[#9b6d35] xs:mt-6 xs:text-[34px] md:mt-8 md:text-[40px] lg:text-[46px]">
              {heading}
            </p>

            <div data-system-hero="true" className="mt-6 flex w-full max-w-[280px] items-center gap-4 text-[#b99152] xs:mt-8 md:mt-10">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>

            <p data-system-hero="true" className="mt-6 max-w-[700px] break-words text-[15px] xs:text-[30px] lg:text-[36px] font-light leading-[1.5] text-[#2d3549]">
              {description}
            </p>
          </section>

          {/* 
              Responsive Diagram wrapper. 
              The layout container's visual boundary scales in alignment with its child, 
              preventing horizontal overflow or structural clipping on narrow 460px screens.
          */}
          <div 
            ref={containerRef} 
            className="relative flex justify-center items-center overflow-visible mt-8 xs:mt-20 md:mt-24 mx-auto"
            style={{ 
              width: `${900 * scale}px`, 
              height: `${710 * scale}px` 
            }}
          >
            {/* Layer 1: Scaled by React coordinate math */}
            <div 
              className="origin-top-left shrink-0 absolute left-0 top-0 h-[710px] w-[900px]"
              style={{ transform: `scale(${scale})` }}
            >
              {/* Layer 2: Animated by GSAP timeline transitions safely */}
              <section 
                data-system-triangle="true" 
                className="relative h-full w-full"
              >
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
                />
                <InstitutionNode
                  label={governmentLabel}
                  icon={Building2}
                  color="bg-[#405846]"
                  className="left-[28px] top-[346px]"
                  onClick={onGovernmentClick}
                  nodeId="government"
                />
                <InstitutionNode
                  label={presidencyLabel}
                  icon={Bird}
                  color="bg-[#9d3637]"
                  className="right-[28px] top-[346px]"
                  onClick={onPresidencyClick}
                  nodeId="presidency"
                />

                <div className="absolute left-1/2 top-[350px] grid h-24 w-24 -translate-x-1/2 place-items-center rounded-full border-2 border-[#d4b476] bg-[#fbf5eb] text-[#b99152] shadow-sm">
                  <span className="text-5xl">✥</span>
                </div>
              </section>
            </div>
          </div>

          {/* Prime Minister card */}
          <div
            data-system-prime="true"
            data-system-prime-border="true"
            className="mx-auto mt-6 w-full max-w-[780px] rounded-[22px] border-4 border-[#ead8b7] bg-white/62 p-[3px] shadow-[0_12px_30px_rgba(84,54,16,0.14)] xs:mt-8 xs:rounded-[30px]"
          >
            <button
              type="button"
              onClick={onPrimeMinisterClick}
              className="flex min-h-[80px] w-full items-center justify-between gap-2 rounded-[20px] px-4 py-3 xs:py-0 font-serif text-[18px] xs:text-[42px] font-light text-[#17233b] xs:h-[150px] xs:rounded-[27px] xs:px-12 md:px-16 md:text-[55px]"
            >
              <span data-system-prime-text="true" className="shrink-0 text-[#b99152] text-2xl xs:text-6xl">✥</span>
              <span data-system-prime-text="true" className="text-center">{primeMinisterLabel}</span>
              <ArrowRight data-system-prime-text="true" size={56} strokeWidth={1.6} className="h-6 w-6 xs:h-14 xs:w-14 shrink-0 text-[#b99152] rtl:rotate-180" />
            </button>
          </div>

          {/* System Footer info */}
          <div data-system-footer="true" className="mt-8 xs:mt-auto flex min-h-0 flex-col items-stretch gap-4 rounded-[20px] border-2 border-[#ead8b7] bg-white/62 shadow-[0_10px_25px_rgba(84,54,16,0.1)] xs:min-h-[132px] xs:flex-row xs:items-center xs:gap-0">
            <div className="mx-auto mt-4 grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#c59a4b] text-[#f8e5b8] ring-4 ring-white xs:ml-8 xs:mr-8 xs:mt-0 xs:h-24 xs:w-24 md:ml-12 md:mr-14 md:h-28 md:w-28">
              <span className="text-3xl xs:text-5xl">✥</span>
            </div>
            <p className="p-4 pb-5 text-center font-serif font-light text-[14px] xs:text-[24px] lg:text-[34px] leading-tight text-[#17233b] xs:pb-4 xs:text-left">
              {footerText}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}