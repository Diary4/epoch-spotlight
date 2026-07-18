import React from "react";
import { ArrowLeft, BarChart3, Flag, Mountain, Music2, Shield, SunMedium, type LucideIcon } from "lucide-react";
import { sectionBackButtonClassName, sectionBackButtonSideClassName, sectionBackIconClassName } from "@/constants/backNavigation";
import { localizeDigits } from "@/lib/utils";
import { discoverDisplayFont, discoverDir, discoverRtlScript, type DiscoverLangCode } from "@/components/Sections/discoverLanguage";
import DiscoverLanguageButton from "@/components/Sections/DiscoverLanguageButton";
import { useDiscoverLanguageTransition } from "@/components/Sections/useDiscoverLanguageTransition";
import DesignScaledCanvas from "@/components/DesignScaledCanvas";
import gsap from "gsap";
import heroVideo from "@/assets/videos/hawler.webm";
import bg2 from "@/assets/images/new/discoverKurdistan/land-2.webp"
import bg3 from "@/assets/images/new/discoverKurdistan/land-3.webp"
import bg4 from "@/assets/images/new/discoverKurdistan/peshmarga.webp"
import bg5 from "@/assets/images/new/discoverKurdistan/land-5.webp"
import bg6 from "@/assets/images/new/discoverKurdistan/land-6.webp";

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
    <div className={`flex items-center justify-center gap-3 text-[#b99152] ${className}`}>
      <span className="h-0.5 flex-1 bg-[#b99152]" />
      <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
      <span className="h-0.5 flex-1 bg-[#b99152]" />
    </div>
  );
}

function SmallCard({ card, onClick, lang = "en" }: { card: LandCard; onClick?: () => void; lang?: DiscoverLangCode }) {
  const displayFont = discoverDisplayFont(lang);

  return (
    <article
      data-land-card="true"
      className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[24px] border-2 border-[#ead8b7] bg-white/80 px-6 py-6 text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md"
    >
      {onClick && (
        <button
          type="button"
          onClick={onClick}
          aria-label={`Open ${card.title}`}
          className="absolute inset-0 z-30 appearance-none bg-transparent p-0 cursor-pointer"
        />
      )}

      <img
        src={card.image}
        alt={card.title}
        className={`absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 object-cover opacity-80 ${
          card.id === "peshmerga" ? "-translate-y-[35%]" : "-translate-y-1/2"
        }`}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-[#fffaf0] via-[#fffaf0]/95 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />

      <div className="relative z-10 flex h-full flex-col items-center">
        <h3
          data-discover-lang="true"
          className={`mt-4 ${displayFont} text-[38px] font-light leading-tight text-[#17233b]`}
        >
          {localizeDigits(card.title, lang)}
        </h3>
        <Divider className="mx-auto my-3 w-28" />
      </div>
    </article>
  );
}

function WideCard({ card, onClick, lang = "en" }: { card: LandCard; onClick?: () => void; lang?: DiscoverLangCode }) {
  const displayFont = discoverDisplayFont(lang);
  return (
    <article
      data-land-card="true"
      className="relative min-h-[210px] overflow-hidden rounded-[24px] border-2 border-[#ead8b7] px-8 py-6 shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md"
    >
      {onClick && (
        <button
          type="button"
          onClick={onClick}
          aria-label={`Open ${card.title}`}
          className="absolute inset-0 z-20 appearance-none bg-transparent p-0"
        />
      )}
      <img src={card.image} alt={card.title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#fff8ed] via-[#fff8ed]/82 to-[#fff8ed]/30 rtl:bg-gradient-to-l" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <h3
          data-discover-lang="true"
          className={`${displayFont} text-[40px] font-light text-[#17233b]`}
        >
          {localizeDigits(card.title, lang)}
        </h3>
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
    <DesignScaledCanvas
      dir={dir}
      fitViewport
      fitDeps={[lang]}
      bgClassName={`bg-[#fbf5eb] ${isRtlScript ? "font-noto-naskh" : ""}`}
      overlay={
        <>
          <button
            type="button"
            onClick={onBack}
            className={`${sectionBackButtonClassName} ${sectionBackButtonSideClassName(dir)}`}
            aria-label="Back to Discover"
          >
            <ArrowLeft className={sectionBackIconClassName(dir)} />
          </button>
        </>
      }
    >
      <section
        ref={sectionRef}
        lang={lang}
        className={`relative flex min-h-[1920px] w-full flex-col overflow-hidden bg-[#fbf5eb] px-12 pb-14 pt-10 text-[#17233b] ${isRtlScript ? "font-noto-naskh" : ""}`}
      >
        <DiscoverLanguageButton
          lang={lang}
          onSelect={handleLanguageSelect}
          placement={dir === "rtl" ? "start" : "end"}
        />

        <div className="pointer-events-none absolute start-0 top-0 h-full w-28 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        <div
          data-land-bg="true"
          className="pointer-events-none absolute inset-x-0 top-0 isolate z-0 h-[860px] w-full overflow-hidden"
        >
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
          <div
            className="absolute inset-y-0 start-0 block w-[60%] bg-gradient-to-r from-[#fbf5eb] from-0% via-[#fbf5eb]/80 via-45% to-transparent to-100% rtl:bg-gradient-to-l"
            aria-hidden
          />
          <div
            className="absolute inset-x-0 bottom-0 block h-[24%] bg-gradient-to-t from-[#fbf5eb] from-0% via-[#fbf5eb]/70 via-40% to-transparent to-100%"
            aria-hidden
          />
        </div>

        <div className="relative z-10 flex flex-1 flex-col">
          <section className="me-auto max-w-[520px] text-start pt-8">
            <h1
              data-land-hero="true"
              data-discover-lang="true"
              className={`${displayFont} text-[56px] font-light leading-[1.05] tracking-tight text-[#17233b]`}
            >
              {isAr ? "الأرض والمستقبل" : isKu ? "خاک و داهاتوو" : "The Land"}
              {!isAr && !isKu && <br />}
              {!isAr && !isKu && "and Future"}
            </h1>

            <p
              data-land-hero="true"
              data-discover-lang="true"
              className={`z-10 mt-5 ${displayFont} text-[26px] leading-tight text-[#9b6d35]`}
            >
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

            <div className="mt-8 flex w-[280px] items-center gap-3 text-[#b99152]">
              <span data-land-divider="true" className="h-0.5 flex-1 bg-[#b99152]" />
              <span data-land-divider="true" className="h-2.5 w-2.5 rotate-45 border-2 border-[#b99152]" />
              <span data-land-divider="true" className="h-0.5 flex-1 bg-[#b99152]" />
            </div>

            <p
              data-land-hero="true"
              data-discover-lang="true"
              className="mt-6 max-w-[480px] text-[17px] leading-[1.6] text-[#2d3549]"
            >
              {isAr
                ? "كوردستان أرض حضارات عريقة وهوية فخورة وروح لا تُقهر. نصون تراثنا ونبني بالرؤية ونسير معًا نحو مستقبل أكثر إشراقًا."
                : isKu
                  ? "کوردستان خاکی شارستانییەتە دێرینەکان، ناسنامەیەکی پڕ لە شانازی، و ڕۆحێکی نەبەزە. کەلەپوورمان دەپارێزین، بە دیدگاوە بونیاد دەنێین، و پێکەوە بەرەو داهاتوویەکی گەشتر هەنگاو دەنێین."
                  : "Kurdistan is a land of ancient civilizations, proud identity, and unwavering spirit. We protect our heritage, build with vision, and walk together toward a brighter future."}
            </p>
          </section>

          {/* Move cards down: raise this mt- value. Same on every screen via scaled canvas. */}
          <section className="relative z-10 mt-[420px] grid grid-cols-3 gap-6 pb-4">
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

          <section className="mt-6 grid grid-cols-3 gap-6 pb-4">
            {localBottomCards.map((card) => (
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
            ))}
          </section>
        </div>
      </section>
    </DesignScaledCanvas>
  );
}