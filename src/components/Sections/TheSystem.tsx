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
      <div className={`grid h-40 w-40 place-items-center rounded-full border-[7px] border-white ${color} text-[#f8e5b8] shadow-[0_10px_28px_rgba(84,54,16,0.2)] ring-2 ring-[#c49a55] md:h-44 md:w-44 lg:h-48 lg:w-48`}>
        <Icon className="h-[76px] w-[76px] md:h-[84px] md:w-[84px] lg:h-[92px] lg:w-[92px]" strokeWidth={1.35} />
      </div>
      <p className="mt-6 rounded-full px-5 py-1.5 font-serif text-[28px] font-light uppercase tracking-[0.06em] text-[#17233b] md:text-[31px] lg:text-[36px]">
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
    <main className="m-0 flex min-h-screen w-full max-w-full justify-center bg-[#f8f1e7] p-0 text-[#17233b] overflow-x-hidden">
      <section ref={sectionRef} className="relative flex min-h-screen w-[min(100vw,1400px)] min-w-[100vw] flex-col overflow-y-auto overflow-x-hidden md:overflow-hidden bg-[#fbf5eb]">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-4 top-4 z-30 grid h-12 w-12 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:left-8 sm:top-8 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          aria-label="Back to Discover"
        >
          <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>
        <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] hidden sm:block" />

        {/* Hero Illustration Background */}
        <div data-system-bg="true" className="pointer-events-none absolute right-[-100px] top-0 h-[700px] w-full min-w-full">
          <img
            src={bg}
            alt="System building placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-25 sm:opacity-50 md:opacity-72 [mask-image:radial-gradient(circle_at_58%_48%,black_0%,black_55%,transparent_84%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbf5eb]" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-4 pb-8 pt-24 sm:px-12 sm:pb-10 sm:pt-16 md:px-16 md:pt-20 lg:px-20 lg:pb-14">
          <section className="max-w-[760px]">
            <h1 data-system-hero="true" className="font-serif text-[clamp(40px,11vw,72px)] font-light leading-[1.03] tracking-tight text-[#17233b] sm:text-[86px] md:text-[100px] lg:text-[118px]">
              {title}
            </h1>

            <p data-system-hero="true" className="mt-4 text-[clamp(18px,5vw,28px)] font-light leading-tight text-[#9b6d35] sm:mt-6 sm:text-[34px] md:mt-8 md:text-[40px] lg:text-[46px]">
              {heading}
            </p>

            <div data-system-hero="true" className="mt-6 flex w-full max-w-[280px] items-center gap-4 text-[#b99152] sm:mt-8 md:mt-10">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>

            <p data-system-hero="true" className="mt-6 max-w-[700px] text-[clamp(17px,4.2vw,24px)] font-light leading-[1.5] text-[#2d3549] sm:mt-8 md:mt-10 md:text-[30px] lg:mt-8 lg:text-[36px]">
              {description}
            </p>
          </section>

          {/* Diagram — fixed 900×710 art; horizontal scroll on small screens only */}
          <div className="relative -mx-4 mt-12 max-w-[100vw] overflow-x-auto overflow-y-visible px-4 pb-2 sm:mx-0 sm:mt-20 sm:max-w-none sm:overflow-visible sm:px-0 md:mt-24">
            <section data-system-triangle="true" className="relative mx-auto h-[710px] w-[900px] shrink-0">
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

          <div
            data-system-prime="true"
            data-system-prime-border="true"
            className="mx-auto mt-6 w-full max-w-[780px] rounded-[22px] border-4 border-[#ead8b7] bg-white/62 p-[3px] shadow-[0_12px_30px_rgba(84,54,16,0.14)] sm:mt-8 sm:rounded-[30px]"
          >
            <button
              type="button"
              onClick={onPrimeMinisterClick}
              className="flex min-h-[100px] w-full items-center justify-between gap-2 rounded-[20px] px-4 py-3 sm:py-0 font-serif text-[clamp(20px,5vw,42px)] font-light text-[#17233b] sm:h-[150px] sm:rounded-[27px] sm:px-12 sm:text-[42px] md:px-16 md:text-[55px]"
            >
              <span data-system-prime-text="true" className="shrink-0 text-[#b99152] text-3xl sm:text-6xl">✥</span>
              <span data-system-prime-text="true" className="text-center">{primeMinisterLabel}</span>
              <ArrowRight data-system-prime-text="true" size={56} strokeWidth={1.6} className="h-8 w-8 shrink-0 text-[#b99152] sm:h-14 sm:w-14 rtl:rotate-180" />
            </button>
          </div>

          <div data-system-footer="true" className="mt-10 sm:mt-auto flex min-h-0 flex-col items-stretch gap-4 rounded-[20px] border-2 border-[#ead8b7] bg-white/62 shadow-[0_10px_25px_rgba(84,54,16,0.1)] sm:min-h-[132px] sm:flex-row sm:items-center sm:gap-0">
            <div className="mx-auto mt-4 grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#c59a4b] text-[#f8e5b8] ring-4 ring-white sm:ml-8 sm:mr-8 sm:mt-0 sm:h-24 sm:w-24 md:ml-12 md:mr-14 md:h-28 md:w-28">
              <span className="text-4xl sm:text-5xl">✥</span>
            </div>
            <p className="p-4 pb-5 text-center font-serif font-light text-[clamp(17px,4vw,25px)] leading-tight text-[#17233b] sm:pb-4 sm:text-left sm:text-[34px]">
              {footerText}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}