import React from "react";
import { ArrowLeft, ArrowRight, MapPinned } from "lucide-react";
import { localizeDigits } from "@/lib/utils";

const mapCards = [
  {
    number: "1",
    title: "Kurdistan Region\nof Iraq",
    text: "Explore the officially recognized Kurdistan Region of Iraq — its governorates, major cities, and borders.",
    color: "#c69237",
    mapImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Iraqi_Kurdistan_in_Iraq_%28disputed_hatched%29.svg/1280px-Iraqi_Kurdistan_in_Iraq_%28disputed_hatched%29.svg.png",
  },
  {
    number: "2",
    title: "Disputed Areas",
    text: "Explore the disputed areas between Kurdistan and Iraq, shown here in pink.",
    color: "#963538",
    mapImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Iraqi_Kurdistan_in_Iraq_%28disputed_hatched%29.svg/1280px-Iraqi_Kurdistan_in_Iraq_%28disputed_hatched%29.svg.png",
  },
  {
    number: "3",
    title: "Kurdish Presence\nAcross Countries",
    text: "See the broader areas where Kurdish communities live across the region.",
    color: "#c69237",
    mapImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Kurdish-inhabited_area_by_CIA_%281992%29.jpg/1280px-Kurdish-inhabited_area_by_CIA_%281992%29.jpg",
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
    <article className="grid min-h-[440px] grid-cols-[205px_1fr] overflow-hidden rounded-[26px] border-2 border-[#ead8b7] bg-white/72 shadow-[0_12px_32px_rgba(84,54,16,0.13)] backdrop-blur-md">
      <div className="flex flex-col items-center justify-center border-r border-[#ead8b7] px-7 py-8 text-center">
        <div
          className="grid h-20 w-20 place-items-center rounded-full border-[5px] border-white text-[34px] font-bold text-white shadow-md"
          style={{ backgroundColor: card.color }}
        >
          {localizeDigits(card.number, lang)}
        </div>

        <Divider color={card.color} />

        <h3 className="whitespace-pre-line font-serif text-[24px] font-semibold leading-tight text-[#17233b]">
          {localizeDigits(card.title, lang)}
        </h3>

        <p className="mt-6 text-[17px] font-semibold leading-[1.45] text-[#35435b]">
          {localizeDigits(card.text, lang)}
        </p>

        <button
          className="mt-auto grid h-16 w-16 place-items-center rounded-full text-white shadow-md"
          style={{ backgroundColor: card.color }}
        >
          <ArrowRight size={34} />
        </button>
      </div>

      <div className="relative bg-[#f7efe2]">
        <img src={card.mapImage} alt={card.title.replace("\n", " ")} className="h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-[#fbf5eb]/20 mix-blend-multiply" />
      </div>
    </article>
  );
}

type TheLandPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

export default function TheLandPage({ lang = "en", onBack }: TheLandPageProps) {
  const isAr = lang === "ar";
  const isKu = lang === "ku";
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
    <main className="m-0 min-h-[100vh] w-[100vw] max-w-none bg-[#f8f1e7] p-0 text-[#17233b]">
      <section className="relative mx-auto flex min-h-[100vh] w-[min(100vw,1400px)] max-w-none overflow-hidden rounded-[clamp(22px,2.4vw,34px)] bg-[#fbf5eb] p-0">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-[clamp(16px,2vw,30px)] top-[clamp(16px,2vh,30px)] z-30 grid h-[clamp(50px,4.8vw,64px)] w-[clamp(50px,4.8vw,64px)] place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm"
          aria-label="Back to The Land and Future"
        >
          <ArrowLeft size={30} />
        </button>
        <div className="absolute inset-0 opacity-16 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-0 h-full w-28 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Left scenic placeholder */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-[clamp(620px,70vh,980px)] w-[clamp(260px,28vw,470px)]">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=90"
            alt="Kurdistan landscape placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-72 [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_76%,transparent_100%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fbf5eb]/25 to-[#fbf5eb]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fbf5eb] via-transparent to-[#fbf5eb]" />
        </div>

        {/* Left text */}
        <aside className="relative z-10 flex w-[clamp(300px,30vw,470px)] shrink-0 flex-col pt-[clamp(64px,8vh,120px)] pl-[clamp(8px,1.1vw,20px)]">
          <h1 className="font-serif text-[clamp(60px,7.2vw,108px)] font-semibold leading-[0.98] tracking-tight text-[#17233b]">
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

          <p className="mt-[clamp(18px,2.8vh,40px)] max-w-[clamp(250px,25vw,430px)] text-[clamp(16px,1.7vw,26px)] font-semibold leading-[1.55] text-[#35435b]">
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
        <section className="relative z-10 flex flex-1 flex-col gap-[clamp(14px,1.6vh,28px)] pl-[clamp(6px,1vw,18px)]">
          {localMapCards.map((card) => (
            <MapCard key={card.number} card={card} lang={lang} />
          ))}
        </section>
      </section>
    </main>
  );
}
