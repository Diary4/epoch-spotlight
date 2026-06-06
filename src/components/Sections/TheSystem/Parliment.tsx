import React from "react";
import { ArrowLeft, ArrowRight, FilePenLine, MessageCircleMore, Scale, Search, UsersRound } from "lucide-react";
import { useSystemDetailAnimation } from "@/components/Sections/TheSystem/useSystemDetailAnimation";
import bg from "@/assets/mainImages/parliment.webp"

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
  const rootRef = useSystemDetailAnimation([lang]);
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
    <main ref={rootRef} className="m-0 flex min-h-[100dvh] w-full max-w-full flex-col overflow-x-hidden bg-[#f8f1e7] text-[#17233b] [padding-bottom:max(env(safe-area-inset-bottom),12px)]">
      <section className="relative mx-auto flex w-full max-w-[min(100vw,1400px)] flex-1 flex-col overflow-hidden rounded-[clamp(12px,1.5vw,28px)] bg-[#fbf5eb]">
        <button
          type="button"
          onClick={onBack}
          className="system-detail-back absolute left-[clamp(16px,2.5vw,40px)] top-[clamp(16px,2vh,36px)] z-30 grid h-[clamp(52px,7vw,72px)] w-[clamp(52px,7vw,72px)] place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm touch-manipulation"
          aria-label="Back to The System"
        >
          <ArrowLeft className="h-[clamp(22px,3vw,32px)] w-[clamp(22px,3vw,32px)]" />
        </button>
        <div className="absolute left-0 top-0 hidden h-full w-[clamp(64px,10vw,112px)] opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] sm:block" />

        {/* Mobile hero */}
        <div className="relative h-[min(38vh,300px)] min-h-[200px] w-full overflow-hidden sm:hidden">
          <img
            src={bg}
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fbf5eb] to-transparent" />
        </div>

        <div className="pointer-events-none absolute right-0 top-0 z-0 hidden h-[min(92vh,1100px)] w-full overflow-hidden sm:block">
          <img
            src={bg}
            alt="Parliament building placeholder"
            className="system-detail-hero absolute inset-0 h-full w-full object-cover object-right
                      [mask-image:linear-gradient(to_bottom,black_0%,black_72%,rgba(0,0,0,0.75)_82%,rgba(0,0,0,0.35)_92%,transparent_100%)]
                      [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_72%,rgba(0,0,0,0.75)_82%,rgba(0,0,0,0.35)_92%,transparent_100%)]"
          />
          {/* Bottom painterly fade */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-[#fbf5eb]/40 to-[#fbf5eb]" />
        </div>
        <div className="px-[clamp(18px,3.2vw,52px)] py-[clamp(14px,2vh,36px)] relative z-10 flex min-h-0 flex-1 flex-col gap-y-[clamp(28px,4vh,64px)]">
          <section className="system-detail-intro max-w-[min(92vw,720px)] break-words pt-0 sm:pt-[clamp(72px,10vh,120px)]">
            <h1 className="font-serif text-[clamp(3rem,9.5vw,5.75rem)] font-light leading-none tracking-tight text-[#17233b]">
              {isAr ? "البرلمان" : isKu ? "پەرلەمان" : "Parliament"}
            </h1>

            <p className="mt-[clamp(24px,3vh,40px)] text-[clamp(1.25rem,2.8vw,2.125rem)] font-light leading-tight text-[#9b6d35]">
              {isAr ? "المؤسسة التشريعية لإقليم كوردستان." : isKu ? "دامەزراوەی یاسادانانی هەرێمی کوردستان." : "The legislative institution of the Kurdistan Region."}
            </p>

            <div className="mt-[clamp(24px,3vh,40px)] flex w-[min(230px,52vw)] items-center gap-4 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>

            <p className="mt-[clamp(20px,2.6vh,36px)] max-w-[min(92vw,460px)] text-[clamp(1.125rem,2.1vw,1.8125rem)] font-medium leading-[1.52] text-[#2d3549]">
              {isAr
                ? "يناقش البرلمان الشؤون العامة ويُشرّع القوانين ويمثّل الشعب."
                : isKu
                  ? "پەرلەمان گفتوگۆ لەسەر کاروباری گشتی دەکات، یاسا دەر دەکات و نوێنەرایەتیی گەل دەکات."
                : "Parliament discusses public issues, passes laws, and represents the people."}
            </p>
          </section>

          <section className="mt-8 grid grid-cols-1 gap-[clamp(16px,2.2vw,36px)] pb-[clamp(8px,1.5vh,20px)] sm:mt-[clamp(36px,24vh,400px)] sm:grid-cols-3">
            {localMainCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="system-detail-card relative flex min-h-[clamp(340px,38vh,560px)] flex-col items-center overflow-hidden rounded-[clamp(18px,2vw,28px)] border-2 border-[#ead8b7] bg-white/78 px-[clamp(16px,2.4vw,36px)] py-[clamp(20px,2.5vh,40px)] text-center shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md touch-manipulation"
                >
                  <div
                    className="grid h-[clamp(88px,11vw,112px)] w-[clamp(88px,11vw,112px)] place-items-center rounded-full border-[6px] border-white text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)]"
                    style={{ backgroundColor: card.color }}
                  >
                    <Icon className="h-[clamp(40px,5vw,58px)] w-[clamp(40px,5vw,58px)]" strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-[clamp(20px,2.5vh,40px)] font-serif text-[clamp(1.375rem,2.4vw,2.375rem)] font-light leading-tight" style={{ color: card.color }}>
                    {card.title}
                  </h3>

                  <p className="mt-[clamp(16px,2vh,28px)] text-[clamp(1rem,1.65vw,1.5rem)] font-medium leading-[1.45] text-[#35435b]">
                    {card.text}
                  </p>

                  <Divider />

                  <button
                    type="button"
                    className="mt-auto grid h-[clamp(52px,6.5vw,64px)] w-[clamp(52px,6.5vw,64px)] place-items-center rounded-full text-white shadow-md touch-manipulation"
                    style={{ backgroundColor: card.color }}
                  >
                    <ArrowRight className="h-[clamp(26px,3.5vw,36px)] w-[clamp(26px,3.5vw,36px)]" />
                  </button>

                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                </article>
              );
            })}
          </section>

          <section className="system-detail-panel relative grid min-h-[clamp(220px,26vh,340px)] grid-cols-1 rounded-[clamp(18px,2vw,28px)] border-2 border-[#ead8b7] bg-white/72 px-[clamp(16px,2.4vw,36px)] py-[clamp(20px,2.5vh,36px)] text-center shadow-[0_14px_35px_rgba(84,54,16,0.12)] backdrop-blur-md sm:grid-cols-3">
            {localBottomItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="relative flex flex-col items-center justify-center px-[clamp(12px,2vw,32px)] py-2 sm:py-0">
                  {index !== 0 && <span className="absolute left-0 top-8 hidden h-[min(210px,22vh)] w-px bg-[#d8b875] sm:block" />}
                  <Icon className="h-[clamp(44px,5.5vw,60px)] w-[clamp(44px,5.5vw,60px)] text-[#bd8431]" strokeWidth={1.5} />
                  <h4 className="mt-[clamp(16px,2vh,28px)] font-serif text-[clamp(1.25rem,2.4vw,2.125rem)] font-light text-[#17233b]">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-[clamp(0.95rem,1.5vw,1.25rem)] font-medium leading-snug text-[#35435b]">
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
