import React from "react";
import { ArrowLeft, ArrowRight, FilePenLine, MessageCircleMore, Scale, Search, UsersRound } from "lucide-react";

const mainCards = [
  {
    title: "Lawmaking",
    text: "Reviews and passes laws for public life.",
    icon: Scale,
    color: "#13213b",
  },
  {
    title: "Representation",
    text: "Reflects the voice and interests of the people.",
    icon: UsersRound,
    color: "#405846",
  },
  {
    title: "Oversight",
    text: "Monitors public affairs and institutional accountability.",
    icon: Search,
    color: "#963538",
  },
];

const bottomItems = [
  {
    title: "Debate",
    text: "Open discussion on issues that shape our society.",
    icon: MessageCircleMore,
  },
  {
    title: "Law",
    text: "Transforming ideas into laws for a just and prosperous future.",
    icon: FilePenLine,
  },
  {
    title: "Representation",
    text: "Elected by the people, working for the people of Kurdistan.",
    icon: UsersRound,
  },
];

function Divider() {
  return (
    <div className="mx-auto my-8 flex w-36 items-center justify-center gap-3 text-[#b99152]">
      <span className="h-0.5 flex-1 bg-[#b99152]" />
      <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
      <span className="h-0.5 flex-1 bg-[#b99152]" />
    </div>
  );
}

type ParliamentPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

export default function ParliamentPage({ lang = "en", onBack }: ParliamentPageProps) {
  const isAr = lang === "ar";
  const isKu = lang === "ku";
  const localMainCards = isAr
    ? [
        { title: "التشريع", text: "يراجع القوانين ويُقرّها لخدمة الحياة العامة.", icon: Scale, color: "#13213b" },
        { title: "التمثيل", text: "يعكس صوت الشعب ومصالحه.", icon: UsersRound, color: "#405846" },
        { title: "الرقابة", text: "يراقب الشؤون العامة ويحاسب المؤسسات.", icon: Search, color: "#963538" },
      ]
    : isKu
      ? [
          { title: "یاسادانان", text: "پێداچوونەوە و پەسەندکردنی یاساکان بۆ ژیانی گشتی.", icon: Scale, color: "#13213b" },
          { title: "نوێنەرایەتیکردن", text: "ڕەنگدانەوەی دەنگ و بەرژەوەندییەکانی گەل.", icon: UsersRound, color: "#405846" },
          { title: "چاودێری", text: "چاودێریکردنی کاروباری گشتی و لێپرسینەوەی دامەزراوەیی.", icon: Search, color: "#963538" },
        ]
    : mainCards;
  const localBottomItems = isAr
    ? [
        { title: "النقاش", text: "حوار مفتوح حول القضايا التي تشكّل مجتمعنا.", icon: MessageCircleMore },
        { title: "القانون", text: "تحويل الأفكار إلى قوانين لمستقبل عادل ومزدهر.", icon: FilePenLine },
        { title: "التمثيل", text: "منتخَب من الشعب، يعمل لخدمة أبناء كوردستان.", icon: UsersRound },
      ]
    : isKu
      ? [
          { title: "گفتوگۆ", text: "گفتوگۆی کراوە لەسەر ئەو پرسانەی کۆمەڵگەکەمان دادەڕێژنەوە.", icon: MessageCircleMore },
          { title: "یاسا", text: "گۆڕینی بیرۆکەکان بۆ یاسا بۆ داهاتوویەکی دادپەروەر و گەشاوە.", icon: FilePenLine },
          { title: "نوێنەرایەتیکردن", text: "لەلایەن گەلەوە هەڵبژێردراون، بۆ گەلی کوردستان کاردەکەن.", icon: UsersRound },
        ]
    : bottomItems;

  return (
    <main className="min-h-screen w-full bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fbf5eb] px-14 py-10">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm"
          aria-label="Back to The System"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="absolute inset-0 opacity-16 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-0 h-full w-28 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Replace this with your generated parliament illustration */}
        <div className="pointer-events-none absolute right-0 top-[70px] h-[760px] w-[820px]">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=90"
            alt="Parliament building placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-76 [mask-image:radial-gradient(circle_at_62%_50%,black_0%,black_57%,transparent_84%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/18 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbf5eb]" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col">
          {/* Hero */}
          <section className="max-w-[540px] pt-24">
            <h1 className="font-serif text-[92px] font-semibold leading-none tracking-tight text-[#17233b]">
              {isAr ? "البرلمان" : isKu ? "پەرلەمان" : "Parliament"}
            </h1>

            <p className="mt-10 text-[34px] font-bold leading-tight text-[#9b6d35]">
              {isAr ? "المؤسسة التشريعية لإقليم كوردستان." : isKu ? "دامەزراوەی یاسادانانی هەرێمی کوردستان." : "The legislative institution of the Kurdistan Region."}
            </p>

            <div className="mt-10 flex w-[230px] items-center gap-4 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>

            <p className="mt-9 max-w-[430px] text-[29px] font-medium leading-[1.52] text-[#2d3549]">
              {isAr
                ? "يناقش البرلمان الشؤون العامة ويُشرّع القوانين ويمثّل الشعب."
                : isKu
                  ? "پەرلەمان گفتوگۆ لەسەر کاروباری گشتی دەکات، یاسا دەر دەکات و نوێنەرایەتیی گەل دەکات."
                : "Parliament discusses public issues, passes laws, and represents the people."}
            </p>
          </section>

          <div className="flex-1" />

          {/* Main cards */}
          <section className="grid grid-cols-3 gap-8 pb-8">
            {localMainCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="relative flex min-h-[520px] flex-col items-center overflow-hidden rounded-[24px] border-2 border-[#ead8b7] bg-white/78 px-8 py-10 text-center shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md"
                >
                  <div
                    className="grid h-28 w-28 place-items-center rounded-full border-[6px] border-white text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)]"
                    style={{ backgroundColor: card.color }}
                  >
                    <Icon size={58} strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-10 font-serif text-[38px] font-semibold leading-tight" style={{ color: card.color }}>
                    {card.title}
                  </h3>

                  <p className="mt-7 text-[24px] font-medium leading-[1.45] text-[#35435b]">
                    {card.text}
                  </p>

                  <Divider />

                  <button
                    className="mt-auto grid h-16 w-16 place-items-center rounded-full text-white shadow-md"
                    style={{ backgroundColor: card.color }}
                  >
                    <ArrowRight size={36} />
                  </button>

                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                </article>
              );
            })}
          </section>

          {/* Bottom information panel */}
          <section className="grid min-h-[290px] grid-cols-3 rounded-[24px] border-2 border-[#ead8b7] bg-white/72 px-8 py-8 text-center shadow-[0_14px_35px_rgba(84,54,16,0.12)] backdrop-blur-md">
            {localBottomItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="relative flex flex-col items-center justify-center px-8">
                  {index !== 0 && <span className="absolute left-0 top-8 h-[210px] w-px bg-[#d8b875]" />}
                  <Icon size={60} strokeWidth={1.5} className="text-[#bd8431]" />
                  <h4 className="mt-5 font-serif text-[34px] font-semibold text-[#17233b]">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-[20px] font-medium leading-snug text-[#35435b]">
                    {item.text}
                  </p>
                </article>
              );
            })}

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
          </section>
        </div>
      </section>
    </main>
  );
}
