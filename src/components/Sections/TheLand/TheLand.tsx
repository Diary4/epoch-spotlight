import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLandDetailAnimation } from "@/components/Sections/TheLand/useLandDetailAnimation";
import {
  detailBackButtonClassName,
  detailBackButtonSideClassName,
  detailBackIconClassName,
  detailBackIconSize,
} from "@/constants/backNavigation";
import { discoverDisplayFont, discoverRtlScript, type DiscoverLangCode } from "@/components/Sections/discoverLanguage";
import { localizeDigits } from "@/lib/utils";
import WomenScaledCanvas from "@/components/Sections/women/WomenScaledCanvas";
import bg from "@/assets/mainImages/bg-2.webp";
import mapImage from "@/assets/mainImages/theland/land-1.webp";
import mapImage2 from "@/assets/mainImages/theland/land-2.webp";
import mapImage3 from "@/assets/mainImages/theland/land-3.webp";

const mapCards = [
  {
    number: "1",
    title: "Kurdistan Region\nof Iraq",
    text: "Explore the officially recognized Kurdistan Region of Iraq — its governorates, major cities, and borders.",
    color: "#c69237",
    mapImage: mapImage3,
  },
  {
    number: "2",
    title: "Disputed Areas",
    text: "Explore the disputed areas between Kurdistan and Iraq, shown here in pink.",
    color: "#963538",
    mapImage: mapImage2,
  },
  {
    number: "3",
    title: "Kurdish Presence\nAcross Countries",
    text: "See the broader areas where Kurdish communities live across the region.",
    color: "#c69237",
    mapImage: mapImage,
  },
];

function Divider({ color = "#b99152" }) {
  return (
    <div className="mx-auto my-[clamp(0.75rem,1.6cqw,1.5rem)] flex w-32 items-center justify-center gap-3" style={{ color }}>
      <span className="h-0.5 flex-1" style={{ backgroundColor: color }} />
      <span className="h-3 w-3 rotate-45 border-2" style={{ borderColor: color }} />
      <span className="h-0.5 flex-1" style={{ backgroundColor: color }} />
    </div>
  );
}

function MapCard({ card, lang = "en" }: { card: (typeof mapCards)[number]; lang?: DiscoverLangCode }) {
  const displayFont = discoverDisplayFont(lang);
  return (
    <article className="land-detail-card grid min-h-0 w-full flex-1 grid-cols-[clamp(180px,14.6cqw,205px)_1fr] items-stretch overflow-hidden rounded-[26px] border-2 border-[#ead8b7] bg-white/72 shadow-[0_12px_32px_rgba(84,54,16,0.13)] backdrop-blur-md">
      <div className="flex flex-col items-center justify-center border-r border-[#ead8b7] px-[clamp(1rem,1.5cqw,1.75rem)] py-[clamp(1.25rem,2cqw,2rem)] text-center">
        <div
          className="grid h-[clamp(3.5rem,5.7cqw,5rem)] w-[clamp(3.5rem,5.7cqw,5rem)] place-items-center rounded-full border-[5px] border-white text-[clamp(1.5rem,2.43cqw,34px)] font-light text-white shadow-md"
          style={{ backgroundColor: card.color }}
        >
          {localizeDigits(card.number, lang)}
        </div>

        <Divider color={card.color} />

        <h3 className={`whitespace-pre-line ${displayFont} text-[clamp(1.1rem,1.71cqw,24px)] font-light leading-tight text-[#17233b]`}>
          {localizeDigits(card.title, lang)}
        </h3>

        <p className="mt-[clamp(0.75rem,1.4cqw,1.5rem)] text-[clamp(0.85rem,1.21cqw,17px)] font-light leading-[1.45] text-[#35435b]">
          {localizeDigits(card.text, lang)}
        </p>

        <button
          type="button"
          className="mt-auto grid h-[clamp(3rem,4.57cqw,4rem)] w-[clamp(3rem,4.57cqw,4rem)] place-items-center rounded-full text-white shadow-md"
          style={{ backgroundColor: card.color }}
        >
          <ArrowRight className="h-[clamp(1.5rem,2.43cqw,34px)] w-[clamp(1.5rem,2.43cqw,34px)] rtl:rotate-180" />
        </button>
      </div>

      <div className="relative h-full min-h-0 w-full min-w-0 overflow-hidden bg-[#f7efe2]">
        <img
          src={card.mapImage}
          alt={card.title.replace("\n", " ")}
          className="block h-full w-full max-w-none object-cover object-center align-middle"
        />
        <div className="pointer-events-none absolute inset-0 bg-[#fbf5eb]/20 mix-blend-multiply" />
      </div>
    </article>
  );
}

type TheLandPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

export default function TheLandPage({ lang = "en", onBack }: TheLandPageProps) {
  const rootRef = useLandDetailAnimation([lang]);
  const isAr = lang === "ar";
  const isKu = lang === "ku";
  const dir = lang === "en" ? "ltr" : "rtl";
  const isRtlScript = discoverRtlScript(lang);
  const displayFont = discoverDisplayFont(lang);
  const localMapCards = isAr
    ? [
        { ...mapCards[0], title: "إقليم كوردستان العراق", text: "استكشف إقليم كوردستان المعترف به رسميًا في العراق، محافظاته ومدنه الكبرى وحدوده." },
        { ...mapCards[1], title: "المناطق المتنازع عليها", text: "استكشف المناطق المتنازع عليها بين كوردستان والعراق، الموضحة باللون الوردي." },
        { ...mapCards[2], title: "الوجود الكوردي\nعبر الدول", text: "تعرّف على المناطق الأوسع التي يعيش فيها المجتمعات الكوردية في المنطقة." },
      ]
    : isKu
      ? [
          { ...mapCards[0], title: "هەرێمی کوردستانی عێراق", text: "گەڕان لەناو هەرێمی کوردستانی عێراق کە بە فەرمی ناسراوە — پارێزگاکانی، شارە سەرەکییەکانی، و سنوورەکانی." },
          { ...mapCards[1], title: "ناوچە جێناکۆکەکان", text: "گەڕان لەناو ناوچە جێناکۆکەکانی نێوان هەرێمی کوردستان و عێراق، کە لێرەدا بە ڕەنگی پەمەیی دیاری کراوە." },
          { ...mapCards[2], title: "بوونی کورد\nلە سەرانسەری وڵاتان", text: "ئەو ناوچە فراوانانەی کە کۆمەڵگە کوردییەکانی لێ نیشتەجێیە لە سەرانسەری ناوچەکەدا." },
        ]
      : mapCards;

  return (
    <WomenScaledCanvas
      dir={dir}
      fitDeps={[lang]}
      bgClassName={`bg-[#fbf5eb] ${isRtlScript ? "font-noto-naskh" : ""}`}
      overlay={
        <button
          type="button"
          onClick={onBack}
          className={`land-detail-back ${detailBackButtonClassName} ${detailBackButtonSideClassName(dir)}`}
          aria-label="Back to The Land and Future"
        >
          <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
        </button>
      }
    >
      <main
        ref={rootRef}
        className={`m-0 flex min-h-full w-full flex-col bg-[#fbf5eb] text-[#17233b] ${isRtlScript ? "font-noto-naskh" : ""}`}
        style={{ containerType: "inline-size" }}
      >
        <section className="relative mx-auto flex min-h-full w-full flex-1 flex-row overflow-hidden bg-[#fbf5eb] p-[clamp(10px,1.3cqw,20px)]">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-28 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] rtl:left-auto rtl:right-0" />

          {/* Left scenic backdrop */}
          <div className="land-detail-hero pointer-events-none absolute bottom-0 left-0 h-[clamp(620px,70cqw,980px)] w-[clamp(260px,28cqw,470px)] overflow-hidden rtl:left-auto rtl:right-0">
            <div className={`absolute inset-0 ${dir === "rtl" ? "-scale-x-100" : ""}`}>
              <img
                src={bg}
                alt="Kurdistan landscape placeholder"
                className="absolute inset-0 h-full w-full object-cover object-left-bottom opacity-72 [mask-image:linear-gradient(to_right,black_0%,black_52%,rgba(0,0,0,0.78)_68%,rgba(0,0,0,0.38)_82%,transparent_100%),linear-gradient(to_bottom,transparent_0%,black_10%,black_76%,rgba(0,0,0,0.45)_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,black_0%,black_52%,rgba(0,0,0,0.78)_68%,rgba(0,0,0,0.38)_82%,transparent_100%),linear-gradient(to_bottom,transparent_0%,black_10%,black_76%,rgba(0,0,0,0.45)_90%,transparent_100%)] [mask-composite:intersect] [-webkit-mask-composite:source-in]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fbf5eb]/18 to-[#fbf5eb] rtl:bg-gradient-to-l" />
            <div className="absolute top-0 left-0 h-32 w-full bg-gradient-to-b from-[#fbf5eb] via-[#fbf5eb]/45 to-transparent" />
            <div className="absolute bottom-0 left-0 h-36 w-full bg-gradient-to-b from-transparent via-[#fbf5eb]/50 to-[#fbf5eb]" />
          </div>

          {/* Left text */}
          <aside className="land-detail-intro relative z-10 flex w-[clamp(300px,30cqw,470px)] shrink-0 flex-col pl-[clamp(8px,1.1cqw,20px)] pt-[clamp(64px,8cqw,120px)]">
            <h1 className={`${displayFont} text-[clamp(44px,7.7cqw,108px)] font-light leading-[0.98] tracking-tight text-[#17233b]`}>
              {isAr ? (
                "الأرض"
              ) : isKu ? (
                "خاک"
              ) : (
                <>
                  The
                  <br />
                  Land
                </>
              )}
            </h1>

            <div className="mt-[clamp(24px,3.3cqw,44px)] w-[clamp(160px,16cqw,260px)]">
              <Divider />
            </div>

            <p className={`mt-[clamp(10px,1.5cqw,22px)] ${displayFont} text-[clamp(24px,3cqw,42px)] leading-tight text-[#9b6d35]`}>
              {isAr ? (
                "إقليم من الجمال والجغرافيا والتراث."
              ) : isKu ? (
                "ناوچەیەک لە جوانی، جوگرافیا، و کەلەپوور."
              ) : (
                <>
                  A region of beauty,
                  <br />
                  geography, and heritage.
                </>
              )}
            </p>

            <p className="mt-[clamp(18px,2.8cqw,40px)] max-w-[clamp(250px,25cqw,430px)] text-[clamp(15px,1.86cqw,26px)] font-light leading-[1.55] text-[#35435b]">
              {isAr
                ? "كوردستان أرض الجبال والأنهار والتاريخ العريق. من قلبها في شمال العراق إلى المناطق الأوسع التي يعيش فيها الكورد في أرجاء الشرق الأوسط، هذه أرض تتجسد فيها الصلابة والثقافة والإنسان."
                : isKu
                  ? "کوردستان خاکی چیاکان سەرکەشەکان، ڕووبارەکان، و مێژوویەکی دەوڵەمەندە. لە دڵی هەرێمی کوردستانی عێراق تا ناوچە فراوانەکانی تر کە کورد لێی نیشتەجێیە لە سەرانسەری ڕۆژهەڵاتی ناوەڕاست، ئەمە خاکێکە کە بە خۆڕاگری، کولتوور، و شکۆی خەڵکەکەی دەناسرێتەوە."
                  : "Kurdistan is a land of mountains, rivers, and rich history. From its heart in northern Iraq to the wider regions where Kurds live across the Middle East, this is a land defined by resilience, culture, and people."}
            </p>

            <div className="mt-[clamp(18px,2.8cqw,40px)] w-[clamp(110px,10cqw,180px)]">
              <Divider />
            </div>
          </aside>

          {/* Right maps */}
          <section className="relative z-10 flex min-h-0 w-full min-w-0 flex-1 flex-col gap-[clamp(14px,1.6cqw,28px)] pl-[clamp(6px,1cqw,18px)]">
            {localMapCards.map((card) => (
              <MapCard key={card.number} card={card} lang={lang} />
            ))}
          </section>
        </section>
      </main>
    </WomenScaledCanvas>
  );
}
