import React from "react";
import { ArrowLeft, BarChart3, Flag, Mountain, Shield, Star, SunMedium } from "lucide-react";
import { localizeDigits } from "@/lib/utils";
import gsap from "gsap";
import bg1 from "@/assets/images/new/discoverKurdistan/land-1.webp"
import bg2 from "@/assets/images/new/discoverKurdistan/land-2.webp"
import bg3 from "@/assets/images/new/discoverKurdistan/land-3.webp"
import bg4 from "@/assets/images/new/discoverKurdistan/land-4.webp"
import bg5 from "@/assets/images/new/discoverKurdistan/land-5.webp"
import bg6 from "@/assets/images/new/discoverKurdistan/land-6.webp"

const topCards = [
  {
    id: "land",
    title: "The Land",
    text: "A region of breathtaking geography, rich history, and timeless heritage.",
    icon: Mountain,
    image: bg2,
  },
  {
    id: "identitySymbols",
    title: "Identity and Symbols",
    text: "The flag, anthem, language, and heritage reflect the spirit of Kurdistan.",
    icon: SunMedium,
    image: bg3,
    featured: true,
  },
  {
    id: "peshmerga",
    title: "Peshmerga",
    text: "A symbol of courage, protection, and selfless service to the people.",
    icon: Shield,
    image: bg4,
    red: true,
  },
];

const bottomCards = [
  {
    id: "progress",
    title: "Progress",
    text: "Development continues in infrastructure, education, economy, and tourism.",
    icon: BarChart3,
    image: bg5,
  },
  {
    id: "futureVision",
    title: "Future Vision",
    text: "Kurdistan looks ahead with ambition, opportunity, and confidence.",
    icon: Star,
    image: bg6,
  },
];

function Divider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-1.5 xs:gap-3 text-[#b99152] ${className}`}>
      <span className="h-0.5 flex-1 bg-[#b99152]" />
      <span className="h-1.5 w-1.5 xs:h-2 xs:w-2 sm:h-3 sm:w-3 rotate-45 border border-[#b99152] sm:border-2" />
      <span className="h-0.5 flex-1 bg-[#b99152]" />
    </div>
  );
}

function SmallCard({ card, onClick, lang = "en" }: { card: (typeof topCards)[number]; onClick?: () => void; lang?: "ku" | "en" | "ar" }) {
  const Icon = card.icon;
  const iconBg = card.red ? "#963538" : card.featured ? "#c69237" : "#13213b";
  const iconColor = "#f8e5b8";

  return (
    <article data-land-card="true" className="relative flex min-h-[140px] xs:min-h-[180px] sm:min-h-[400px] lg:min-h-[700px] flex-col overflow-hidden rounded-[12px] sm:rounded-[24px] border border-[#ead8b7] sm:border-2 bg-white/80 px-1.5 py-4 xs:px-2.5 xs:py-5 sm:p-7 lg:p-9 text-center shadow-[0_4px_12px_rgba(84,54,16,0.1)] sm:shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md">
      {onClick && (
        <button
          type="button"
          onClick={onClick}
          aria-label={`Open ${card.title}`}
          className="absolute inset-0 z-30 appearance-none bg-transparent p-0 cursor-pointer"
        />
      )}
      
      {/* Background card illustration - set to inset-0 to fully span card vertical boundaries */}
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover opacity-60 sm:opacity-85 lg:opacity-80"
      />

      {/* Top soft gradient overlay - blends out background graphics behind top circular icons */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-[#fffaf0] via-[#fffaf0]/95 to-transparent" />

      {/* Bottom soft gradient overlay - retains text readability over card background details */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#fffaf0]/95 via-[#fffaf0]/40 to-transparent" />

      {/* Background paper texture elements */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />

      {/* Content layer positioned relative to sit over top-and-bottom background overlays */}
      <div className="relative z-10 flex flex-col items-center h-full">
        <div className="grid h-10 w-10 xs:h-12 xs:w-12 sm:h-22 sm:w-22 place-items-center rounded-full border border-[#e7cfa1] sm:border-2 bg-[#fff8ed] shadow-[0_4px_12px_rgba(0,0,0,0.1)] sm:shadow-[0_6px_16px_rgba(0,0,0,0.1)] lg:h-28 lg:w-28">
          <div className="grid h-8 w-8 xs:h-10 xs:w-10 sm:h-16 sm:w-16 lg:h-20 lg:w-20 place-items-center rounded-full border border-white sm:border-2 shadow-sm" style={{ backgroundColor: iconBg, color: iconColor }}>
            <Icon className="h-4 w-4 xs:h-5 xs:w-5 sm:h-[34px] sm:w-[34px] lg:h-[42px] lg:w-[42px]" strokeWidth={1.7} />
          </div>
        </div>

        <h3 className="mt-2.5 xs:mt-4 sm:mt-6 font-serif text-[9px] xs:text-[11px] sm:text-[clamp(26px,6vw,34px)] font-light leading-tight text-[#17233b] lg:text-[42px]">
          {localizeDigits(card.title, lang)}
        </h3>

        <Divider className="mx-auto my-1.5 xs:my-3 sm:my-5 w-12 xs:w-16 sm:w-36" />

        <p className="mx-auto mb-2 sm:mb-6 max-w-[255px] text-[8px] xs:text-[9.5px] sm:text-[clamp(15px,3.6vw,18px)] font-light leading-[1.45] text-[#35435b] lg:max-w-[320px] lg:text-[23px]">
          {localizeDigits(card.text, lang)}
        </p>
      </div>
    </article>
  );
}

function WideCard({ card, onClick, lang = "en" }: { card: (typeof bottomCards)[number]; onClick?: () => void; lang?: "ku" | "en" | "ar" }) {
  const Icon = card.icon;
  return (
    <article data-land-card="true" className="relative min-h-[90px] xs:min-h-[110px] sm:min-h-[270px] lg:min-h-[320px] overflow-hidden rounded-[12px] sm:rounded-[24px] border border-[#ead8b7] sm:border-2 px-3 py-3 xs:px-4 xs:py-4 sm:px-8 sm:py-9 lg:px-10 lg:py-10 shadow-[0_4px_12px_rgba(84,54,16,0.1)] sm:shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md">
      {onClick && (
        <button
          type="button"
          onClick={onClick}
          aria-label={`Open ${card.title}`}
          className="absolute inset-0 z-20 appearance-none bg-transparent p-0"
        />
      )}
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#fff8ed] via-[#fff8ed]/82 to-[#fff8ed]/30" />

      <div className="relative z-10 flex h-full flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left lg:gap-10">
        <div className="grid h-10 w-10 xs:h-12 xs:w-12 sm:h-24 sm:w-24 lg:h-28 lg:w-28 shrink-0 place-items-center rounded-full border-2 xs:border-[4px] sm:border-[6px] border-white bg-[#13213b] text-[#f8e5b8] shadow-md">
          <Icon className="h-5 w-5 xs:h-6 xs:w-6 sm:h-[52px] sm:w-[52px] lg:h-[60px] lg:w-[60px]" strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <h3 className="font-serif text-[12px] xs:text-[14px] sm:text-[clamp(26px,6vw,36px)] font-light text-[#17233b] lg:text-[44px]">{localizeDigits(card.title, lang)}</h3>
          <p className="mt-1 xs:mt-2 sm:mt-4 max-w-[330px] text-[10px] xs:text-[11.5px] sm:text-[clamp(15px,3.8vw,20px)] font-light leading-[1.45] text-[#35435b] lg:max-w-[460px] lg:text-[26px]">
            {localizeDigits(card.text, lang)}
          </p>
        </div>
      </div>
    </article>
  );
}

type LandAndFuturePageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
  onSelectCard?: (cardId: "land" | "identitySymbols" | "peshmerga" | "progress") => void;
};

export default function LandAndFuturePage({ lang = "en", onBack, onSelectCard }: LandAndFuturePageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const isAr = lang === "ar";
  const isKu = lang === "ku";
  const localTopCards = isAr
    ? [
        { ...topCards[0], title: "الأرض", text: "إقليم تتجلى فيه جغرافيا خلابة وتاريخ ثري وتراث خالد." },
        { ...topCards[1], title: "الهوية والرموز", text: "العلم والنشيد واللغة والتراث تعكس روح كوردستان ." },
        { ...topCards[2], title: "البيشمركة", text: "رمز الشجاعة والحماية والخدمة المخلصة للشعب." },
      ]
    : isKu
      ? [
          { ...topCards[0], title: "خاک", text: "ناوچەیەکە لە جوگرافیاییەکی سەرنجڕاکێش، مێژوویەکی دەوڵەمەند، و کەلەپوورێکی نەمر." },
          { ...topCards[1], title: "ناسنامە و هێماکان", text: "ئاڵا، سروود، زمان، و کەلەپوور ڕەنگدانەوەی ڕۆحی کوردستانن." },
          { ...topCards[2], title: "پێشمەرگە", text: "هێمای ئازایەتی، پاراستن، و خزمەتی دڵسۆزانەی گەلە." },
        ]
      : topCards;
  const localBottomCards = isAr
    ? [
        { ...bottomCards[0], title: "التقدم", text: "التنمية مستمرة في البنية التحتية والتعليم والاقتصاد والسياحة." },
        { ...bottomCards[1], title: "الرؤية المستقبلية", text: "تتطلع كوردستان إلى الأمام بطموح وفرص وثقة." },
      ]
    : isKu
      ? [
          { ...bottomCards[0], title: "پێشکەوتن", text: "گەشەپێدان لە ژێرخان، پەروەردە، ئابووری، و گەشتیاریدا بەردەوامە." },
          { ...bottomCards[1], title: "دیدگای داهاتوو", text: "کوردستان بە هیوا، دەرفەت، و متمانەوە دەڕوانێتە داهاتوو." },
        ]
      : bottomCards;

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-land-bg='true']", { autoAlpha: 0, scale: 1.05, y: 20 });
      gsap.set("[data-land-hero='true']", { autoAlpha: 0, y: 26 });
      gsap.set("[data-land-divider='true']", { autoAlpha: 0, scaleX: 0, transformOrigin: "center center" });
      gsap.set("[data-land-card='true']", { autoAlpha: 0, y: 42, rotateX: -9, transformOrigin: "center top" });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to("[data-land-bg='true']", {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
      })
        .to(
          "[data-land-hero='true']",
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.14,
          },
          "-=0.8",
        )
        .to(
          "[data-land-divider='true']",
          {
            autoAlpha: 1,
            scaleX: 1,
            duration: 0.7,
            stagger: 0.08,
          },
          "-=0.5",
        )
        .to(
          "[data-land-card='true']",
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.16,
          },
          "-=0.2",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#17233b] overflow-x-hidden">
      <section ref={sectionRef} className="relative flex min-h-screen w-[min(96vw,1400px)] min-w-[100vw] flex-col overflow-y-auto overflow-x-hidden bg-[#fbf5eb] px-3 pb-6 pt-4 sm:px-9 sm:py-8 lg:px-14 lg:py-10">
        
        {/* Responsive back button */}
        <button
          type="button"
          onClick={onBack}
          className="absolute left-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-full border border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:border-2 sm:left-8 sm:top-8 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          aria-label="Back to Discover"
        >
          <ArrowLeft className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>
        <div className="absolute left-0 top-0 h-full w-28 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] hidden sm:block" />

        {/* Absolutely positioned background illustration layer */}
        <div data-land-bg="true" className="pointer-events-none absolute right-0 top-[200px] h-[30vh] xs:top-[230px] xs:h-[35vh] sm:top-0 sm:h-[min(72vh,900px)] md:min-w-[760px] lg:h-[min(92vh,1150px)] w-full z-0 overflow-hidden">
          <img
            src={bg1}
            alt="Land and Future placeholder"
            className="absolute inset-0 h-full w-full object-cover object-[75%_center] sm:object-right
                      [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_75%,transparent_100%)]
                      sm:[mask-image:none]"
          />
          {/* Bottom blend into section bg (#fbf5eb) — same tone as the “paper” background */}
          <div
            className="absolute inset-x-0 bottom-0 h-[clamp(72px,14vh,200px)] bg-gradient-to-t from-[#fbf5eb] via-[#fbf5eb]/55 to-transparent sm:block hidden"
            aria-hidden
          />
        </div>

        <div className="relative z-10 flex flex-1 flex-col">
          <section className="max-w-[700px] pt-12 pl-0 sm:pt-16 sm:pl-2 lg:pt-20 lg:pl-4">
            <h1 data-land-hero="true" className="font-serif text-[clamp(32px,10vw,48px)] xs:text-[clamp(38px,11vw,64px)] sm:text-[clamp(36px,9vw,70px)] sm:text-[78px] lg:text-[102px] font-light leading-[1.03] tracking-tight text-[#17233b]">
              {isAr ? "الأرض والمستقبل" : isKu ? "خاک و داهاتوو" : "The Land"}
              {!isAr && !isKu && <br />}
              {!isAr && !isKu && "and Future"}
            </h1>

            <p data-land-hero="true" className="z-10 mt-4 sm:mt-7 font-serif text-[clamp(18px,5vw,28px)] xs:text-[clamp(22px,5.5vw,40px)] sm:text-[clamp(24px,5.5vw,68px)] leading-tight text-[#9b6d35]">
              {isAr ? (
                <>
                  جذور التراث.<br />لآفاق الغد.
                </>
              ) : isKu ? (
                <>
                  ڕەگ و ڕیشەی کەلەپوور<br />ئاسۆی داهاتووە
                </>
              ) : (
                <>
                  Roots of Heritage.<br />Horizons of Tomorrow.
                </>
              )}
            </p>

            <div className="mt-4 sm:mt-9 flex w-[min(150px,52vw)] items-center gap-3 text-[#b99152] lg:max-w-[320px]">
              <span data-land-divider="true" className="h-0.5 flex-1 bg-[#b99152]" />
              <span data-land-divider="true" className="h-2.5 w-2.5 rotate-45 border-2 border-[#b99152]" />
              <span data-land-divider="true" className="h-0.5 flex-1 bg-[#b99152]" />
            </div>

            <p data-land-hero="true" className="mt-4 sm:mt-8 max-w-[330px] text-[clamp(12px,4vw,15px)] xs:text-[clamp(14px,4vw,17px)] sm:text-[clamp(16px,3.8vw,20px)] lg:text-[28px] leading-[1.55] text-[#2d3549]">
              {isAr
                ? "كوردستان أرض حضارات عريقة وهوية فخورة وروح لا تُقهر. نصون تراثنا ونبني بالرؤية ونسير معًا نحو مستقبل أكثر إشراقًا."
                : isKu
                  ? "کوردستان خاکی شارستانییەتە دێرینەکان، ناسنامەیەکی پڕ لە شانازی، و ڕۆحێکی نەبەزە. کەلەپوورمان دەپارێزین، بە دیدگاوە بونیاد دەنێین، و پێکەوە بەرەو داهاتوویەکی گەشتر هەنگاو دەنێین."
                : "Kurdistan is a land of ancient civilizations, proud identity, and unwavering spirit. We protect our heritage, build with vision, and walk together toward a brighter future."}
            </p>
          </section>

          <div className="flex-1" />

          {/* Cards Section - forced responsive 3-column layout */}
          <section className="relative z-10 mt-12 xs:mt-16 sm:mt-0 grid grid-cols-3 gap-1.5 xs:gap-2.5 sm:gap-5 pb-4 pt-4 lg:gap-7 lg:pb-5">
            {localTopCards.map((card) => (
              <SmallCard
                key={card.id}
                card={card}
                lang={lang}
                onClick={
                  card.id === "land"
                    ? () => onSelectCard?.("land")
                    : card.id === "peshmerga"
                      ? () => onSelectCard?.("peshmerga")
                      : card.id === "identitySymbols"
                        ? () => onSelectCard?.("identitySymbols")
                      : undefined
                }
              />
            ))}
          </section>

          <section className="grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 lg:gap-7">
            {localBottomCards.map((card) => {
              return (
                <WideCard
                  key={card.id}
                  card={card}
                  lang={lang}
                  onClick={card.id === "progress" ? () => onSelectCard?.("progress") : undefined}
                />
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}