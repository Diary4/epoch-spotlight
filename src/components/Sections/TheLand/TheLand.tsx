import React from "react";
import { ArrowLeft, ArrowRight, MapPinned } from "lucide-react";
import { detailBackIconClassName, detailBackIconSize } from "@/constants/backNavigation";
import { useLandDetailAnimation } from "@/components/Sections/TheLand/useLandDetailAnimation";
import { localizeDigits } from "@/lib/utils";
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
    <div className="mx-auto my-6 flex w-32 items-center justify-center gap-3" style={{ color }}>
      <span className="h-0.5 flex-1" style={{ backgroundColor: color }} />
      <span className="h-3 w-3 rotate-45 border-2" style={{ borderColor: color }} />
      <span className="h-0.5 flex-1" style={{ backgroundColor: color }} />
    </div>
  );
}

function MapCard({ card, lang = "en" }: { card: (typeof mapCards)[number]; lang?: "ku" | "en" | "ar" }) {
  return (
    <article className="land-detail-card grid w-full min-h-0 flex-1 grid-cols-1 items-stretch overflow-hidden rounded-[20px] border-2 border-[#ead8b7] bg-white/72 shadow-[0_12px_32px_rgba(84,54,16,0.13)] backdrop-blur-md sm:rounded-[24px] lg:grid-cols-[205px_1fr] lg:rounded-[26px]">
      <div className="flex flex-col items-center justify-center border-b border-[#ead8b7] px-5 py-6 text-center sm:px-7 sm:py-8 lg:border-b-0 lg:border-r">
        <div
          className="grid h-16 w-16 place-items-center rounded-full border-[5px] border-white text-[28px] font-light text-white shadow-md sm:h-20 sm:w-20 sm:text-[34px]"
          style={{ backgroundColor: card.color }}
        >
          {localizeDigits(card.number, lang)}
        </div>

        <Divider color={card.color} />

        <h3 className="whitespace-pre-line font-serif text-[20px] font-light leading-tight text-[#17233b] sm:text-[24px]">
          {localizeDigits(card.title, lang)}
        </h3>

        <p className="mt-4 text-[15px] font-light leading-[1.45] text-[#35435b] sm:mt-6 sm:text-[17px]">
          {localizeDigits(card.text, lang)}
        </p>

        <button
          type="button"
          className="mt-5 grid h-14 w-14 place-items-center rounded-full text-white shadow-md sm:mt-auto sm:h-16 sm:w-16"
          style={{ backgroundColor: card.color }}
        >
          <ArrowRight className="h-7 w-7 sm:h-[34px] sm:w-[34px] rtl:rotate-180" />
        </button>
      </div>

      <div className="relative w-full min-w-0 overflow-hidden bg-[#f7efe2] lg:flex lg:h-full lg:min-h-0 lg:items-stretch">
        <img
          src={card.mapImage}
          alt={card.title.replace("\n", " ")}
          className="block h-auto w-full max-w-none align-middle"
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
  const localMapCards = isAr
    ? [
        { ...mapCards[0], title: "إقليم كوردستان العراق", text: "استكشف إقليم كوردستان المعترف به رسميًا في العراق، محافظاته ومدنه الكبرى وحدوده." },
        { ...mapCards[1], title: "المناطق المتنازع عليها", text: "استكشف المناطق المتنازع عليها بين كوردستان والعراق، الموضحة باللون الوردي." },
        { ...mapCards[2], title: "الوجود الكوردي\nعبر الدول", text: "تعرّف على المناطق الأوسع التي تعيش فيها المجتمعات الكوردية في المنطقة." },
      ]
    : isKu
      ? [
          { ...mapCards[0], title: "هەرێمی کوردستانی عێراق", text: "گەڕان لەناو هەرێمی کوردستانی عێراق کە بە فەرمی ناسراوە — پارێزگاکانی، شارە سەرەکییەکانی، و سنوورەکانی." },
          { ...mapCards[1], title: "ناوچە جێناکۆکەکان", text: "گەڕان لەناو ناوچە جێناکۆکەکانی نێوان هەرێمی کوردستان و عێراق، کە لێرەدا بە ڕەنگی پەمەیی دیاری کراوە." },
          { ...mapCards[2], title: "بوونی کورد\nلە سەرانسەری وڵاتان", text: "ئەو ناوچە فراوانانەی کە کۆمەڵگە کوردییەکانی لێ نیشتەجێیە لە سەرانسەری ناوچەکەدا." },
        ]
      : mapCards;
  return (
    <main ref={rootRef} dir={dir} className="m-0 min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-0 w-full max-w-[1400px] flex-col gap-6 overflow-x-hidden overflow-y-auto rounded-[22px] bg-[#fbf5eb] p-4 sm:gap-8 sm:p-5 sm:rounded-[28px] lg:min-h-[calc(100vh-clamp(16px,2.6vh,32px))] lg:flex-row lg:gap-0 lg:overflow-hidden lg:rounded-[clamp(22px,2.4vw,34px)] lg:p-[clamp(10px,1.3vw,20px)]">
        <button
          type="button"
          onClick={onBack}
          className="land-detail-back absolute left-4 top-4 z-30 grid h-12 w-12 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:left-6 sm:top-6 sm:h-14 sm:w-14 lg:left-[clamp(16px,2vw,30px)] lg:top-[clamp(16px,2vh,30px)] lg:h-[clamp(50px,4.8vw,64px)] lg:w-[clamp(50px,4.8vw,64px)] rtl:left-auto rtl:right-4 sm:rtl:right-6 lg:rtl:right-[clamp(16px,2vw,30px)]"
          aria-label="Back to The Land and Future"
        >
          <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName} />
        </button>
        <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-28 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] sm:block rtl:left-auto rtl:right-0" />

        {/* Left scenic placeholder */}
        <div className="land-detail-hero pointer-events-none absolute bottom-0 left-0 hidden h-[min(42vh,320px)] w-[min(52vw,220px)] overflow-hidden opacity-70 sm:block lg:h-[clamp(620px,70vh,980px)] lg:w-[clamp(260px,28vw,470px)] lg:opacity-100 rtl:left-auto rtl:right-0">
          <div className={`absolute inset-0 ${dir === "rtl" ? "-scale-x-100" : ""}`}>
            <img
              src={bg}
              alt="Kurdistan landscape placeholder"
              className="absolute inset-0 h-full w-full object-cover object-[center_35%] lg:object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fbf5eb]/25 to-[#fbf5eb] rtl:bg-gradient-to-l" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fbf5eb] via-transparent to-[#fbf5eb]" />
        </div>

        {/* Left text */}
        <aside className="land-detail-intro relative z-10 flex w-full shrink-0 flex-col px-1 pt-20 sm:px-2 sm:pt-24 lg:w-[clamp(300px,30vw,470px)] lg:pt-[clamp(64px,8vh,120px)] lg:pl-[clamp(8px,1.1vw,20px)]">
          <h1 className="font-serif text-[clamp(44px,12vw,108px)] font-light leading-[0.98] tracking-tight text-[#17233b]">
            {isAr ? (
              "الأرض"
            ) : isKu ? (
              "خاک"
            ) : (
              <>
                The<br />Land
              </>
            )}
          </h1>

          <div className="mt-[clamp(24px,3.3vh,44px)] w-[clamp(160px,16vw,260px)]">
            <Divider />
          </div>

          <p className="mt-[clamp(10px,1.5vh,22px)] font-serif text-[clamp(24px,2.8vw,42px)] leading-tight text-[#9b6d35]">
            {isAr ? (
              "إقليم من الجمال والجغرافيا والتراث."
            ) : isKu ? (
              "ناوچەیەک لە جوانی، جوگرافیا، و کەلەپوور."
            ) : (
              <>
                A region of beauty,<br />geography, and heritage.
              </>
            )}
          </p>

          <p className="mt-[clamp(18px,2.8vh,40px)] max-w-none text-[clamp(15px,4vw,26px)] font-light leading-[1.55] text-[#35435b] lg:max-w-[clamp(250px,25vw,430px)]">
            {isAr
              ? "كوردستان أرض الجبال والأنهار والتاريخ العريق. من قلبها في شمال العراق إلى المناطق الأوسع التي يعيش فيها الكورد في أرجاء الشرق الأوسط، هذه أرض تتجسد فيها الصلابة والثقافة والإنسان."
              : isKu
                ? "کوردستان خاکی چیاکان سەرکەشەکان، ڕووبارەکان، و مێژوویەکی دەوڵەمەندە. لە دڵی هەرێمی کوردستانی عێراق تا ناوچە فراوانەکانی تر کە کورد لێی نیشتەجێیە لە سەرانسەری ڕۆژهەڵاتی ناوەڕاست، ئەمە خاکێکە کە بە خۆڕاگری، کولتوور، و شکۆی خەڵکەکەی دەناسرێتەوە."
              : "Kurdistan is a land of mountains, rivers, and rich history. From its heart in northern Iraq to the wider regions where Kurds live across the Middle East, this is a land defined by resilience, culture, and people."}
          </p>

          <div className="mt-[clamp(18px,2.8vh,40px)] w-[clamp(110px,10vw,180px)]">
            <Divider />
          </div>
        </aside>

        {/* Right maps */}
        <section className="relative z-10 flex w-full min-w-0 flex-1 flex-col gap-4 pb-8 sm:gap-5 sm:pb-10 lg:gap-[clamp(14px,1.6vh,28px)] lg:pl-[clamp(6px,1vw,18px)] lg:pb-[clamp(4px,0.8vh,10px)]">
          {localMapCards.map((card) => (
            <MapCard key={card.number} card={card} lang={lang} />
          ))}
        </section>
      </section>
    </main>
  );
}
