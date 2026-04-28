import React from "react";
import { ArrowLeft, BarChart3, Flag, Mountain, Shield, Star, SunMedium } from "lucide-react";
import { localizeDigits } from "@/lib/utils";

const topCards = [
  {
    id: "land",
    number: "01",
    title: "The Land",
    text: "A region of breathtaking geography, rich history, and timeless heritage.",
    icon: Mountain,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: "identitySymbols",
    number: "02",
    title: "Identity and Symbols",
    text: "The flag, anthem, language, and heritage reflect the spirit of Kurdistan.",
    icon: SunMedium,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=90",
    featured: true,
  },
  {
    id: "peshmerga",
    number: "03",
    title: "Peshmerga",
    text: "A symbol of courage, protection, and selfless service to the people.",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=90",
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
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "futureVision",
    number: "05",
    title: "Future Vision",
    text: "Kurdistan looks ahead with ambition, opportunity, and confidence.",
    icon: Star,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=90",
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
    <div className="absolute left-5 top-0 z-20 rounded-b-[18px] bg-[#102541] px-4 py-4 font-serif text-[26px] font-semibold text-[#f2cc79] shadow-md">
      {localizeDigits(number, lang)}
    </div>
  );
}

function SmallCard({ card, onClick, lang = "en" }: { card: (typeof topCards)[number]; onClick?: () => void; lang?: "ku" | "en" | "ar" }) {
  const Icon = card.icon;
  const iconBg = card.red ? "#963538" : card.featured ? "#c69237" : "#13213b";
  const iconColor = "#f8e5b8";

  return (
    <article className="relative flex min-h-[435px] flex-col overflow-hidden rounded-[24px] border-2 border-[#ead8b7] bg-white/80 p-7 text-center shadow-[0_14px_35px_rgba(84,54,16,0.16)] backdrop-blur-md">
      {onClick && (
        <button
          type="button"
          onClick={onClick}
          aria-label={`Open ${card.title}`}
          className="absolute inset-0 z-20 appearance-none bg-transparent p-0"
        />
      )}
      <NumberBadge number={card.number} lang={lang} />
      <div className="relative z-10 mx-auto mt-6 grid h-22 w-22 place-items-center rounded-full border-2 border-[#e7cfa1] bg-[#fff8ed] shadow-[0_6px_16px_rgba(0,0,0,0.1)]">
        <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: iconBg, color: iconColor }}>
          <Icon size={34} strokeWidth={1.7} />
        </div>
      </div>

      <h3 className="relative z-10 mt-6 font-serif text-[34px] font-semibold leading-tight text-[#17233b]">
        {localizeDigits(card.title, lang)}
      </h3>

      <Divider className="relative z-10 mx-auto my-5 w-36" />

      <p className="relative z-10 mx-auto mb-6 max-w-[255px] text-[18px] font-semibold leading-[1.45] text-[#35435b]">
        {localizeDigits(card.text, lang)}
      </p>

      <img
        src={card.image}
        alt={card.title}
        className="absolute bottom-0 left-0 h-[152px] w-full object-cover opacity-80"
      />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[176px] bg-gradient-to-t from-[#fff8ed]/95 via-[#fff8ed]/52 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
    </article>
  );
}

function WideCard({ card, onClick, lang = "en" }: { card: (typeof bottomCards)[number]; onClick?: () => void; lang?: "ku" | "en" | "ar" }) {
  const Icon = card.icon;
  return (
    <article className="relative min-h-[270px] overflow-hidden rounded-[24px] border-2 border-[#ead8b7] bg-white/78 px-8 py-9 shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md">
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
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#fff8ed] via-[#fff8ed]/82 to-[#fff8ed]/30" />

      <div className="relative z-10 flex h-full items-center gap-8">
        <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border-[6px] border-white bg-[#13213b] text-[#f8e5b8] shadow-md">
          <Icon size={52} strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="font-serif text-[36px] font-semibold text-[#17233b]">{localizeDigits(card.title, lang)}</h3>
          <p className="mt-4 max-w-[330px] text-[20px] font-semibold leading-[1.45] text-[#35435b]">
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
  const isAr = lang === "ar";
  const localTopCards = isAr
    ? [
        { ...topCards[0], title: "الأرض", text: "إقليم تتجلى فيه جغرافيا خلابة وتاريخ ثري وتراث خالد." },
        { ...topCards[1], title: "الهوية والرموز", text: "العلم والنشيد واللغة والتراث تعكس روح كوردستان ." },
        { ...topCards[2], title: "البيشمركة", text: "رمز الشجاعة والحماية والخدمة المخلصة للشعب." },
      ]
    : topCards;
  const localBottomCards = isAr
    ? [
        { ...bottomCards[0], title: "التقدم", text: "التنمية مستمرة في البنية التحتية والتعليم والاقتصاد والسياحة." },
        { ...bottomCards[1], title: "الرؤية المستقبلية", text: "تتطلع كوردستان إلى الأمام بطموح وفرص وثقة." },
      ]
    : bottomCards;
  return (
    <main className="min-h-screen w-full bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fbf5eb] px-9 py-8">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm"
          aria-label="Back to Discover"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="absolute inset-0 opacity-16 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-0 h-full w-28 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        <div className="relative z-10 mx-auto mb-5 flex w-[720px] items-center justify-center gap-5 text-[#b99152]">
          <span className="h-0.5 flex-1 bg-[#d5b77a]" />
          <span className="text-4xl">✥</span>
          <span className="h-0.5 flex-1 bg-[#d5b77a]" />
        </div>

        {/* Main hero visual placeholder */}
        <div className="pointer-events-none absolute right-0 top-[100px] h-[760px] w-[820px]">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=90"
            alt="Land and Future placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-78 [mask-image:radial-gradient(circle_at_62%_52%,black_0%,black_58%,transparent_84%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbf5eb]" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col">
          <section className="max-w-[490px] pt-20 pl-4">
            <h1 className="font-serif text-[78px] font-semibold leading-[1.03] tracking-tight text-[#17233b]">
              {isAr ? "الأرض والمستقبل" : "The Land"}
              {!isAr && <br />}
              {!isAr && "and Future"}
            </h1>

            <p className="mt-8 font-serif text-[30px] z-10 leading-tight text-[#9b6d35]">
              {isAr ? (
                <>
                  جذور التراث.<br />لآفاق الغد.
                </>
              ) : (
                <>
                  Roots of Heritage.<br />Horizons of Tomorrow.
                </>
              )}
            </p>

            <div className="mt-9 flex w-[245px] items-center gap-4 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>

            <p className="mt-8 max-w-[260px] text-[20px] font-semibold leading-[1.55] text-[#35435b]">
              {isAr
                ? "كوردستان أرض حضارات عريقة وهوية فخورة وروح لا تُقهر. نصون تراثنا ونبني بالرؤية ونسير معًا نحو مستقبل أكثر إشراقًا."
                : "Kurdistan is a land of ancient civilizations, proud identity, and unwavering spirit. We protect our heritage, build with vision, and walk together toward a brighter future."}
            </p>
          </section>

          <div className="flex-1" />

          <section className="grid grid-cols-3 gap-6 pb-5">
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

          <section className="grid grid-cols-2 gap-6 pb-4">
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

        <div className="pointer-events-none absolute bottom-[285px] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center text-[#b99152]">
          <span className="h-24 w-px bg-[#b99152]" />
          <span className="text-5xl">✥</span>
          <span className="h-24 w-px bg-[#b99152]" />
        </div>
      </section>
    </main>
  );
}
