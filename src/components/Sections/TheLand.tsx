import React from "react";
import { ArrowLeft, BarChart3, Flag, Mountain, Music2, Shield, SunMedium, type LucideIcon } from "lucide-react";
import { sectionBackButtonClassName, sectionBackButtonSideClassName, sectionBackIconClassName } from "@/constants/backNavigation";
import { localizeDigits } from "@/lib/utils";
import { discoverDisplayFont, discoverDir, discoverRtlScript, type DiscoverLangCode } from "@/components/Sections/discoverLanguage";
import DiscoverLanguageButton from "@/components/Sections/DiscoverLanguageButton";
import { useDiscoverLanguageTransition } from "@/components/Sections/useDiscoverLanguageTransition";
import gsap from "gsap";
import heroVideo from "@/assets/videos/hawler.webm";
import bg2 from "@/assets/images/new/discoverKurdistan/land-2.webp"
import bg3 from "@/assets/images/new/discoverKurdistan/land-3.webp"
import bg4 from "@/assets/images/new/discoverKurdistan/peshmarga.webp"
import bg5 from "@/assets/images/new/discoverKurdistan/land-5.webp"
import bg6 from "@/assets/images/new/discoverKurdistan/land-6.webp"
import treeIcon from "@/assets/icons/tree.webp";

type LandCardId = "land" | "identitySymbols" | "peshmerga" | "progress" | "kurdistanFlag" | "nationalAnthem";

type LandCard = {
  id: LandCardId;
  title: string;
  text: string;
  icon: LucideIcon;
  image: string;
  featured?: boolean;
  red?: boolean;
};

const landIconImages: Partial<Record<LandCardId, string>> = {
  land: treeIcon,
};

const topCards: LandCard[] = [
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

const bottomCards: LandCard[] = [
  {
    id: "progress",
    title: "Progress",
    text: "Development continues in infrastructure, education, economy, and tourism.",
    icon: BarChart3,
    image: bg5,
  },
  {
    id: "kurdistanFlag",
    title: "The Kurdistan Flag",
    text: "A symbol of identity, unity, and hope for the Kurdish people.",
    icon: Flag,
    image: bg6,
  },
  {
    id: "nationalAnthem",
    title: "The National Anthem",
    text: "“Ey Reqîb” — the enduring anthem of Kurdish identity and resilience.",
    icon: Music2,
    image: bg3,
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

function LandCardIcon({
  cardId,
  Icon,
  className,
  strokeWidth = 1.7,
}: {
  cardId: LandCardId;
  Icon: LucideIcon;
  className: string;
  strokeWidth?: number;
}) {
  const iconSrc = landIconImages[cardId];

  if (iconSrc) {
    return <img src={iconSrc} alt="" aria-hidden className={`${className} object-contain`} />;
  }

  return <Icon className={className} strokeWidth={strokeWidth} />;
}

function SmallCard({ card, onClick, lang = "en" }: { card: LandCard; onClick?: () => void; lang?: DiscoverLangCode }) {
  const Icon = card.icon;
  const displayFont = discoverDisplayFont(lang);
  const iconBg = card.red ? "#963538" : card.featured ? "#c69237" : "#13213b";
  const iconColor = "#f8e5b8";

  return (
    <article data-land-card="true" className="relative flex min-h-[120px] xs:min-h-[150px] sm:min-h-[250px] lg:min-h-[360px] kiosk-portrait:min-h-[42vw] flex-col overflow-hidden rounded-[12px] sm:rounded-[24px] border border-[#ead8b7] sm:border-2 bg-white/80 px-1.5 py-4 xs:px-2.5 xs:py-5 sm:p-5 lg:p-6 kiosk-portrait:p-[2.4vw] text-center shadow-[0_4px_12px_rgba(84,54,16,0.1)] sm:shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md">
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
        className={`absolute left-1/2 top-1/2 h-[100%] w-[100%] -translate-x-1/2 object-cover opacity-60 sm:opacity-85 lg:opacity-80 ${
          card.id === "peshmerga" ? "-translate-y-[35%]" : "-translate-y-1/2"
        }`}
      />

      {/* Top soft gradient overlay - blends out background graphics behind top circular icons */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-[#fffaf0] via-[#fffaf0]/95 to-transparent" />

      {/* Bottom soft gradient overlay - retains text readability over card background details
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#fffaf0]/95 via-[#fffaf0]/40 to-transparent" /> */}

      {/* Background paper texture elements */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />

      {/* Content layer positioned relative to sit over top-and-bottom background overlays */}
      <div className="relative z-10 flex flex-col items-center h-full">
        {/* <div className="grid h-10 w-10 xs:h-12 xs:w-12 sm:h-16 sm:w-16 place-items-center rounded-full border border-[#e7cfa1] sm:border-2 bg-[#fff8ed] shadow-[0_4px_12px_rgba(0,0,0,0.1)] sm:shadow-[0_6px_16px_rgba(0,0,0,0.1)] lg:h-20 lg:w-20 kiosk-portrait:h-[10.4vw] kiosk-portrait:w-[10.4vw]">
         <LandCardIcon
              cardId={card.id}
              Icon={Icon}
              className="h-7 w-7 xs:h-9 xs:w-9 sm:h-[42px] sm:w-[42px] lg:h-[52px] lg:w-[52px] kiosk-portrait:h-[6.8vw] kiosk-portrait:w-[6.8vw]"
            />
        </div> */}

        <h3 data-discover-lang="true" className={`mt-2.5 xs:mt-4 sm:mt-4 kiosk-portrait:mt-[1.2vw] ${displayFont} text-[9px] xs:text-[11px] sm:text-[clamp(22px,5vw,28px)] font-light leading-tight text-[#17233b] lg:text-[32px] kiosk-portrait:text-[4.1vw]`}>
          {localizeDigits(card.title, lang)}
        </h3>

        <Divider className="mx-auto my-1.5 xs:my-3 sm:my-3 kiosk-portrait:my-[1.6vw] w-12 xs:w-16 sm:w-28 kiosk-portrait:w-[14.8vw]" />
      </div>
    </article>
  );
}

function WideCard({ card, onClick, lang = "en" }: { card: LandCard; onClick?: () => void; lang?: DiscoverLangCode }) {
  const Icon = card.icon;
  const displayFont = discoverDisplayFont(lang);
  return (
    <article data-land-card="true" className="relative min-h-[80px] xs:min-h-[95px] sm:min-h-[150px] lg:min-h-[175px] kiosk-portrait:min-h-[19vw] overflow-hidden rounded-[12px] sm:rounded-[24px] border border-[#ead8b7] sm:border-2 px-3 py-3 xs:px-4 xs:py-4 sm:px-7 sm:py-5 lg:px-8 lg:py-6 kiosk-portrait:px-[3.2vw] kiosk-portrait:py-[3.2vw] shadow-[0_4px_12px_rgba(84,54,16,0.1)] sm:shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md">
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
      <div className="absolute inset-0 bg-gradient-to-r from-[#fff8ed] via-[#fff8ed]/82 to-[#fff8ed]/30 rtl:bg-gradient-to-l" />

      <div className="relative z-10 flex h-full flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-start lg:gap-10">
        {/* <div className="grid h-10 w-10 xs:h-12 xs:w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 kiosk-portrait:h-[10.4vw] kiosk-portrait:w-[10.4vw] shrink-0 place-items-center rounded-full border-2 xs:border-[4px] sm:border-[5px] border-white bg-[#13213b] text-[#f8e5b8] shadow-md">
          <LandCardIcon
            cardId={card.id}
            Icon={Icon}
            className="h-5 w-5 xs:h-6 xs:w-6 sm:h-[38px] sm:w-[38px] lg:h-[46px] lg:w-[46px] kiosk-portrait:h-[5.5vw] kiosk-portrait:w-[5.5vw]"
            strokeWidth={1.5}
          />
        </div> */}
        <div className="min-w-0">
          <h3 data-discover-lang="true" className={`${displayFont} text-[12px] xs:text-[14px] sm:text-[clamp(22px,5vw,30px)] font-light text-[#17233b] lg:text-[34px] kiosk-portrait:text-[4.25vw]`}>{localizeDigits(card.title, lang)}</h3>
        </div>
      </div>
    </article>
  );
}

type LandAndFuturePageProps = {
  lang?: DiscoverLangCode;
  onBack?: () => void;
  onSelectCard?: (cardId: "land" | "identitySymbols" | "peshmerga" | "progress" | "kurdistanFlag" | "nationalAnthem") => void;
  onLanguageChange?: (lang: DiscoverLangCode) => void;
};

export default function LandAndFuturePage({ lang = "en", onBack, onSelectCard, onLanguageChange }: LandAndFuturePageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [introDone, setIntroDone] = React.useState(false);
  const handleLanguageSelect = useDiscoverLanguageTransition(
    sectionRef,
    lang,
    onLanguageChange,
    introDone,
  );
  const isAr = lang === "ar";
  const isKu = lang === "ku";
  const isRtlScript = discoverRtlScript(lang);
  const displayFont = discoverDisplayFont(lang);
  const dir = discoverDir(lang);
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
        { ...bottomCards[1], title: "علم كوردستان", text: "رمز للهوية والوحدة والأمل لدى الشعب الكردي." },
        { ...bottomCards[2], title: "النشيد الوطني", text: "«أي رقيب» — النشيد الخالد للهوية الكردية والصمود." },
      ]
    : isKu
      ? [
          { ...bottomCards[0], title: "پێشکەوتن", text: "گەشەپێدان لە ژێرخان، پەروەردە، ئابووری، و گەشتیاریدا بەردەوامە." },
          { ...bottomCards[1], title: "ئاڵای کوردستان", text: "هێمای ناسنامە، یەکگرتن، و هیوا بۆ گەلی کورد." },
          { ...bottomCards[2], title: "سروودی نیشتمانی", text: "«ئەی ڕەقیب» — سروودی نەمری ناسنامە و خۆڕاگری کوردی." },
        ]
      : bottomCards;

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-land-bg='true']", { autoAlpha: 0, y: 20 });
      gsap.set("[data-land-hero='true']", { autoAlpha: 0, y: 26 });
      gsap.set("[data-land-divider='true']", { autoAlpha: 0, scaleX: 0, transformOrigin: "center center" });
      gsap.set("[data-land-card='true']", { autoAlpha: 0, y: 42, rotateX: -9, transformOrigin: "center top" });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => setIntroDone(true),
      });

      tl.to("[data-land-bg='true']", {
        autoAlpha: 1,
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

  React.useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const tryPlay = () => {
      videoEl.play().catch(() => {
        // Ignore autoplay promise rejections from browser policies.
      });
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) tryPlay();
    };

    tryPlay();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <main className="m-0 flex min-h-screen w-screen justify-center bg-[#fbf5eb] p-0 text-[#17233b] overflow-x-hidden">
      <section
        ref={sectionRef}
        lang={lang}
        dir={dir}
        className={`relative flex min-h-screen w-[min(96vw,1400px)] min-w-[100vw] flex-col overflow-y-auto overflow-x-hidden bg-[#fbf5eb] px-3 pb-6 pt-4 sm:px-9 sm:py-8 lg:px-14 lg:py-10 ${isRtlScript ? "font-noto-naskh" : ""}`}
      >
        <button
          type="button"
          onClick={onBack}
          className={`${sectionBackButtonClassName} ${sectionBackButtonSideClassName(dir)}`}
          aria-label="Back to Discover"
        >
          <ArrowLeft className={sectionBackIconClassName(dir)} />
        </button>

        <DiscoverLanguageButton
          lang={lang}
          onSelect={handleLanguageSelect}
          placement={dir === "rtl" ? "start" : "end"}
        />
        <div className="absolute start-0 top-0 h-full w-28 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] hidden sm:block" />

        {/* Absolutely positioned background illustration layer — full width of the hero
            on every breakpoint (mobile keeps the same structure as large screens). */}
        <div data-land-bg="true" className="pointer-events-none absolute end-0 top-0 isolate z-0 h-[56vh] w-full overflow-hidden sm:top-0 sm:h-[min(72vh,900px)] md:min-w-0 lg:h-[min(92vh,1150px)]">
          <div className={`absolute inset-0 ${isRtlScript ? "-scale-x-100" : ""}`}>
            <video
              ref={videoRef}
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover object-center [mask-image:linear-gradient(to_bottom,black_0%,black_72%,rgba(0,0,0,0.75)_82%,rgba(0,0,0,0.35)_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_72%,rgba(0,0,0,0.75)_82%,rgba(0,0,0,0.35)_92%,transparent_100%)]"
            />
          </div>
          {/* Start-side fade — keeps the hero text readable over the full-width image */}
          <div
            className="absolute inset-y-0 start-0 block w-[70%] bg-gradient-to-r from-[#fbf5eb] from-0% via-[#fbf5eb]/85 via-45% sm:w-[60%] sm:via-[#fbf5eb]/80 to-transparent to-100% rtl:bg-gradient-to-l"
            aria-hidden
          />
          {/* Bottom blend into section bg — softens the transition into the content */}
          <div
            className="absolute inset-x-0 bottom-0 block h-[24%] bg-gradient-to-t from-[#fbf5eb] from-0% via-[#fbf5eb]/70 via-40% to-transparent to-100%"
            aria-hidden
          />
        </div>

        <div className="relative z-10 flex flex-1 flex-col">
          <section className="me-auto max-w-[66%] sm:max-w-[46%] lg:max-w-[600px] kiosk-portrait:max-w-[48%] text-start pt-6 sm:pt-8 lg:pt-12 kiosk-portrait:pt-[6vh]">
            <h1 data-land-hero="true" data-discover-lang="true" className={`${displayFont} text-[clamp(30px,9vw,52px)] sm:text-[clamp(34px,5vw,64px)] kiosk-portrait:text-[8.5vw] font-light leading-[1.05] tracking-tight text-[#17233b]`}>
              {isAr ? "الأرض والمستقبل" : isKu ? "خاک و داهاتوو" : "The Land"}
              {!isAr && !isKu && <br />}
              {!isAr && !isKu && "and Future"}
            </h1>

            <p data-land-hero="true" data-discover-lang="true" className={`z-10 mt-3 sm:mt-5 ${displayFont} text-[clamp(16px,4.5vw,26px)] sm:text-[clamp(16px,2.1vw,28px)] kiosk-portrait:text-[4.2vw] leading-tight text-[#9b6d35]`}>
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

            <div className="mt-4 sm:mt-9 flex w-[min(150px,52vw)] items-center gap-3 text-[#b99152] lg:w-[320px] lg:max-w-[320px] kiosk-portrait:w-[33vw] kiosk-portrait:max-w-[33vw]">
              <span data-land-divider="true" className="h-0.5 flex-1 bg-[#b99152]" />
              <span data-land-divider="true" className="h-2.5 w-2.5 rotate-45 border-2 border-[#b99152]" />
              <span data-land-divider="true" className="h-0.5 flex-1 bg-[#b99152]" />
            </div>

            <p data-land-hero="true" data-discover-lang="true" className="mt-4 sm:mt-6 max-w-[330px] sm:max-w-[400px] lg:max-w-[860px] kiosk-portrait:max-w-[70%] text-[clamp(12px,3.6vw,15px)] sm:text-[clamp(13px,1.45vw,18px)] kiosk-portrait:text-[2.2vw] leading-[1.6] text-[#2d3549]">
              {isAr
                ? "كوردستان أرض حضارات عريقة وهوية فخورة وروح لا تُقهر. نصون تراثنا ونبني بالرؤية ونسير معًا نحو مستقبل أكثر إشراقًا."
                : isKu
                  ? "کوردستان خاکی شارستانییەتە دێرینەکان، ناسنامەیەکی پڕ لە شانازی، و ڕۆحێکی نەبەزە. کەلەپوورمان دەپارێزین، بە دیدگاوە بونیاد دەنێین، و پێکەوە بەرەو داهاتوویەکی گەشتر هەنگاو دەنێین."
                : "Kurdistan is a land of ancient civilizations, proud identity, and unwavering spirit. We protect our heritage, build with vision, and walk together toward a brighter future."}
            </p>
          </section>

          <div className="flex-1" />

          {/* Cards Section - forced responsive 3-column layout */}
          <section className="relative z-10 mt-12 xs:mt-16 sm:mt-0 lg:mt-[-200px] grid grid-cols-3 gap-1.5 xs:gap-2.5 sm:gap-5 pb-4 pt-4 lg:gap-7 lg:pb-5">
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

          <section className="grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {localBottomCards.map((card) => {
              return (
                <WideCard
                  key={card.id}
                  card={card}
                  lang={lang}
                  onClick={
                    card.id === "progress"
                      ? () => onSelectCard?.("progress")
                      : card.id === "kurdistanFlag"
                        ? () => onSelectCard?.("kurdistanFlag")
                        : card.id === "nationalAnthem"
                          ? () => onSelectCard?.("nationalAnthem")
                          : undefined
                  }
                />
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}