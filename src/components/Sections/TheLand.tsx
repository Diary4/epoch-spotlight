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
    number: "01",
    title: "The Land",
    text: "A region of breathtaking geography, rich history, and timeless heritage.",
    icon: Mountain,
    image: bg2,
  },
  {
    id: "identitySymbols",
    number: "02",
    title: "Identity and Symbols",
    text: "The flag, anthem, language, and heritage reflect the spirit of Kurdistan.",
    icon: SunMedium,
    image: bg3,
    featured: true,
  },
  {
    id: "peshmerga",
    number: "03",
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
    number: "04",
    title: "Progress",
    text: "Development continues in infrastructure, education, economy, and tourism.",
    icon: BarChart3,
    image: bg5,
  },
  {
    id: "futureVision",
    number: "05",
    title: "Future Vision",
    text: "Kurdistan looks ahead with ambition, opportunity, and confidence.",
    icon: Star,
    image: bg6,
  },
];

function Divider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-4 text-[#b99152] ${className}`}>
      <span className="h-0.5 flex-1 bg-[#b99152]" />
      <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
      <span className="h-0.5 flex-1 bg-[#b99152]" />
    </div>
  );
}

function NumberBadge({ number, lang = "en" }: { number: string; lang?: "ku" | "en" | "ar" }) {
  return (
    <div className="absolute left-5 top-0 z-20 rounded-b-[18px] bg-[#102541] px-4 py-4 font-serif text-[26px] font-light text-[#f2cc79] shadow-md lg:px-5 lg:py-5 lg:text-[30px]">
      {localizeDigits(number, lang)}
    </div>
  );
}

function SmallCard({ card, onClick, lang = "en" }: { card: (typeof topCards)[number]; onClick?: () => void; lang?: "ku" | "en" | "ar" }) {
  const Icon = card.icon;
  const iconBg = card.red ? "#963538" : card.featured ? "#c69237" : "#13213b";
  const iconColor = "#f8e5b8";

  return (
    <article data-land-card="true" className="relative flex min-h-[360px] flex-col overflow-hidden rounded-[20px] border-2 border-[#ead8b7] bg-white/80 p-5 text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md sm:min-h-[400px] sm:rounded-[24px] sm:p-7 lg:min-h-[700px] lg:rounded-[28px] lg:p-9">
      {onClick && (
        <button
          type="button"
          onClick={onClick}
          aria-label={`Open ${card.title}`}
          className="absolute inset-0 z-20 appearance-none bg-transparent p-0"
        />
      )}
      <NumberBadge number={card.number} lang={lang} />
      <div className="relative z-10 mx-auto mt-6 grid h-22 w-22 place-items-center rounded-full border-2 border-[#e7cfa1] bg-[#fff8ed] shadow-[0_6px_16px_rgba(0,0,0,0.1)] lg:h-28 lg:w-28">
        <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-white shadow-sm lg:h-20 lg:w-20" style={{ backgroundColor: iconBg, color: iconColor }}>
          <Icon className="h-[34px] w-[34px] lg:h-[42px] lg:w-[42px]" strokeWidth={1.7} />
        </div>
      </div>

      <h3 className="relative z-10 mt-4 font-serif text-[clamp(26px,6vw,34px)] font-light leading-tight text-[#17233b] sm:mt-6 lg:text-[42px]">
        {localizeDigits(card.title, lang)}
      </h3>

      <Divider className="relative z-10 mx-auto my-5 w-36" />

      <p className="relative z-10 mx-auto mb-5 max-w-[255px] text-[clamp(15px,3.6vw,18px)] font-light leading-[1.45] text-[#35435b] sm:mb-6 lg:max-w-[320px] lg:text-[23px]">
        {localizeDigits(card.text, lang)}
      </p>

      <img
        src={card.image}
        alt={card.title}
        className="absolute bottom-0 left-0 h-[120px] w-full object-cover opacity-80 sm:h-[152px] lg:h-full"
      />
      {/* <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[176px] bg-gradient-to-t from-[#fff8ed]/95 via-[#fff8ed]/52 to-transparent lg:h-[210px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" /> */}
    </article>
  );
}

function WideCard({ card, onClick, lang = "en" }: { card: (typeof bottomCards)[number]; onClick?: () => void; lang?: "ku" | "en" | "ar" }) {
  const Icon = card.icon;
  return (
    <article data-land-card="true" className="relative min-h-[220px] overflow-hidden rounded-[20px] border-2 border-[#ead8b7] px-4 py-6 shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md sm:min-h-[270px] sm:rounded-[24px] sm:px-8 sm:py-9 lg:min-h-[320px] lg:rounded-[28px] lg:px-10 lg:py-10">
      {onClick && (
        <button
          type="button"
          onClick={onClick}
          aria-label={`Open ${card.title}`}
          className="absolute inset-0 z-20 appearance-none bg-transparent p-0"
        />
      )}
      <NumberBadge number={card.number} lang={lang} />
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#fff8ed] via-[#fff8ed]/82 to-[#fff8ed]/30" />

      <div className="relative z-10 flex h-full flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left lg:gap-10">
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-[6px] border-white bg-[#13213b] text-[#f8e5b8] shadow-md sm:h-24 sm:w-24 lg:h-28 lg:w-28">
          <Icon className="h-10 w-10 sm:h-[52px] sm:w-[52px] lg:h-[60px] lg:w-[60px]" strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <h3 className="font-serif text-[clamp(26px,6vw,36px)] font-light text-[#17233b] lg:text-[44px]">{localizeDigits(card.title, lang)}</h3>
          <p className="mt-3 max-w-[330px] text-[clamp(15px,3.8vw,20px)] font-light leading-[1.45] text-[#35435b] sm:mt-4 lg:max-w-[460px] lg:text-[26px]">
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
    <main className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#17233b]">
      <section ref={sectionRef} className="relative flex min-h-screen w-[min(96vw,1400px)] min-w-[100vw] flex-col overflow-x-hidden overflow-y-visible bg-[#fbf5eb] px-4 py-6 sm:px-9 sm:py-8 lg:px-14 lg:py-10">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-4 top-4 z-30 grid h-12 w-12 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:left-8 sm:top-8 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          aria-label="Back to Discover"
        >
          <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>
        <div className="absolute left-0 top-0 h-full w-28 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        <div className="relative z-10 mx-auto mb-4 flex w-full max-w-[980px] items-center justify-center gap-3 text-[#b99152] sm:mb-5 sm:gap-5 lg:mb-7">
          <span className="h-0.5 flex-1 bg-[#d5b77a]" />
          <span className="text-2xl sm:text-4xl">✥</span>
          <span className="h-0.5 flex-1 bg-[#d5b77a]" />
        </div>

        {/* Main hero visual placeholder */}
        <div data-land-bg="true" className="pointer-events-none absolute right-0 top-0 h-[min(55vh,520px)] w-full min-w-0 sm:h-[min(72vh,900px)] md:min-w-[760px] lg:h-[min(92vh,1150px)]">
          <img
            src={bg1}
            alt="Land and Future placeholder"
            className="absolute inset-0 h-full w-full object-cover object-[75%_center] sm:object-right"
          />
          {/* Bottom blend into section bg (#fbf5eb) — same tone as the “paper” background */}
          <div
            className="absolute inset-x-0 bottom-0 h-[clamp(72px,14vh,200px)] bg-gradient-to-t from-[#fbf5eb] via-[#fbf5eb]/55 to-transparent"
            aria-hidden
          />
        </div>

        <div className="relative z-10 flex flex-1 flex-col">
          <section className="max-w-[700px] pt-12 pl-0 sm:pt-16 sm:pl-2 lg:pt-20 lg:pl-4">
            <h1 data-land-hero="true" className="font-serif text-[clamp(36px,9vw,70px)] font-light leading-[1.03] tracking-tight text-[#17233b] sm:text-[78px] lg:text-[102px]">
              {isAr ? "الأرض والمستقبل" : isKu ? "خاک و داهاتوو" : "The Land"}
              {!isAr && !isKu && <br />}
              {!isAr && !isKu && "and Future"}
            </h1>

            <p data-land-hero="true" className="z-10 mt-5 font-serif text-[clamp(20px,4.5vw,28px)] leading-tight text-[#9b6d35] sm:mt-7 sm:text-[30px] lg:text-[40px]">
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

            <div className="mt-6 flex w-full max-w-[245px] items-center gap-4 text-[#b99152] sm:mt-9 lg:max-w-[320px]">
              <span data-land-divider="true" className="h-0.5 flex-1 bg-[#b99152]" />
              <span data-land-divider="true" className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>

            <p data-land-hero="true" className="mt-6 max-w-[330px] text-[clamp(16px,3.8vw,20px)] leading-[1.55] sm:mt-8 lg:max-w-[430px] lg:text-[28px]">
              {isAr
                ? "كوردستان أرض حضارات عريقة وهوية فخورة وروح لا تُقهر. نصون تراثنا ونبني بالرؤية ونسير معًا نحو مستقبل أكثر إشراقًا."
                : isKu
                  ? "کوردستان خاکی شارستانییەتە دێرینەکان، ناسنامەیەکی پڕ لە شانازی، و ڕۆحێکی نەبەزە. کەلەپوورمان دەپارێزین، بە دیدگاوە بونیاد دەنێین، و پێکەوە بەرەو داهاتوویەکی گەشتر هەنگاو دەنێین."
                : "Kurdistan is a land of ancient civilizations, proud identity, and unwavering spirit. We protect our heritage, build with vision, and walk together toward a brighter future."}
            </p>
          </section>

          <div className="flex-1" />

          <section className="grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-7 lg:pb-5">
            {localTopCards.map((card) => (
              <SmallCard
                key={card.number}
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

          <section className="grid grid-cols-1 gap-5 pb-4 sm:grid-cols-2 lg:gap-7">
            {localBottomCards.map((card) => (
              <WideCard
                key={card.number}
                card={card}
                lang={lang}
                onClick={card.id === "progress" ? () => onSelectCard?.("progress") : undefined}
              />
            ))}
          </section>
        </div>

        {/* <div className="pointer-events-none absolute bottom-[320px] left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center text-[#b99152] lg:flex">
          <span className="h-28 w-px bg-[#b99152]" />
          <span className="text-6xl">✥</span>
          <span className="h-28 w-px bg-[#b99152]" />
        </div> */}
      </section>
    </main>
  );
}
