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
    <div className="mx-auto my-3 xs:my-4 sm:my-8 flex w-12 xs:w-16 sm:w-36 items-center justify-center gap-1 sm:gap-3 text-[#b99152]">
      <span className="h-0.5 flex-1 bg-[#b99152]" />
      <span className="h-1.5 w-1.5 xs:h-2 xs:w-2 sm:h-3 sm:w-3 rotate-45 border border-[#b99152] sm:border-2" />
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
      <section className="relative mx-auto flex w-full max-w-[min(100vw,1400px)] flex-1 flex-col overflow-x-clip rounded-[clamp(12px,1.5vw,28px)] bg-[#fbf5eb]">
        
        {/* Back button scales proportionately */}
        <button
          type="button"
          onClick={onBack}
          className="system-detail-back absolute left-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-full border border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:border-2 sm:left-6 sm:top-6 sm:h-14 sm:w-14 lg:left-8 lg:top-8 lg:h-16 lg:w-16"
          aria-label="Back to The System"
        >
          <ArrowLeft className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>
        <div className="absolute left-0 top-0 hidden h-full w-[clamp(64px,10vw,112px)] opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] sm:block" />

        {/* Blended background illustration — anchored to the top on every screen so
            there is no white gap above it, fading into the paper at the bottom. */}
        <div className="pointer-events-none absolute right-0 top-0 h-[min(86vh,1000px)] w-full overflow-hidden">
          <img
            src={bg}
            alt="Parliament building portrait placeholder"
            className="system-detail-hero absolute inset-0 h-full w-full object-cover object-right
                      [mask-image:linear-gradient(to_bottom,black_0%,black_72%,rgba(0,0,0,0.75)_82%,rgba(0,0,0,0.35)_92%,transparent_100%)]"
          />
          {/* Left fade keeps the heading readable over the image on every screen */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/25 to-transparent" />
          {/* Bottom painterly fade */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-[#fbf5eb]/40 to-[#fbf5eb]" />
        </div>

        {/* Outer content margins - tight paddings on mobile (px-3) to allow cards maximum horizontal space */}
        <div className="px-3 xs:px-[clamp(18px,3.2vw,52px)] py-[clamp(14px,2vh,36px)] relative z-10 flex min-h-0 flex-1 flex-col gap-y-[clamp(16px,4vh,64px)]">
          <section className="system-detail-intro max-w-[min(92vw,720px)] break-words pt-12 sm:pt-[clamp(72px,10vh,120px)]">
            <h1 className="font-serif text-[clamp(2.4rem,9.5vw,5.75rem)] font-light leading-none tracking-tight text-[#17233b]">
              {isAr ? "البرلمان" : isKu ? "پەرلەمان" : "Parliament"}
            </h1>

            <p className="mt-[clamp(16px,3vh,40px)] text-[clamp(1.25rem,2.8vw,2.125rem)] font-light leading-tight text-[#9b6d35]">
              {isAr ? "المؤسسة التشريعية لإقليم كوردستان." : isKu ? "دامەزراوەی یاسادانانی هەرێمی کوردستان." : "The legislative institution of the Kurdistan Region."}
            </p>

            <div className="mt-[clamp(16px,3vh,40px)] flex w-[min(150px,52vw)] items-center gap-3 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-2.5 w-2.5 rotate-45 border-2 border-[#b99152]" />
              <span className="h-0.5 flex-1 bg-[#b99152]" />
            </div>

            <p className="mt-[clamp(16px,2.6vh,36px)] max-w-[min(92vw,460px)] text-[clamp(1.125rem,2.1vw,1.8125rem)] font-medium leading-[1.52] text-[#2d3549]">
              {isAr
                ? "يناقش البرلمان الشؤون العامة ويُشرّع القوانين ويمثّل الشعب."
                : isKu
                  ? "پەرلەمان گفتوگۆ لەسەر کاروباری گشتی دەکات، یاسا دەر دەکات و نوێنەرایەتیی گەل دەکات."
                : "Parliament discusses public issues, passes laws, and represents the people."}
            </p>
          </section>

          {/* Cards section - mt-12 (xs:mt-16) pushes cards below header safely on mobile */}
          <section className="relative z-10 mt-[200px] sm:mt-[0] xs:mt-[200px] sm:mt-0 grid grid-cols-3 gap-1.5 xs:gap-2.5 sm:gap-5 pb-4 pt-4 lg:gap-6 lg:pb-8 lg:pt-10">
            {localMainCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="system-detail-card relative flex min-h-[140px] xs:min-h-[180px] sm:min-h-[420px] lg:min-h-[560px] flex-col items-center overflow-hidden rounded-[12px] border border-[#ead8b7] bg-white/78 px-1.5 py-4 xs:px-3 xs:py-5 sm:border-2 sm:rounded-[20px] sm:px-6 sm:py-8 lg:px-[clamp(16px,2.4vw,36px)] lg:py-[clamp(20px,2.5vh,40px)] text-center shadow-[0_4px_12px_rgba(84,54,16,0.1)] sm:shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md touch-manipulation"
                >
                  <div
                    className="grid h-10 w-10 xs:h-12 xs:w-12 sm:h-[clamp(88px,11vw,112px)] sm:w-[clamp(88px,11vw,112px)] place-items-center rounded-full border-2 xs:border-4 sm:border-[6px] border-white text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)]"
                    style={{ backgroundColor: card.color }}
                  >
                    <Icon className="h-5 w-5 xs:h-6 xs:w-6 sm:h-[clamp(40px,5vw,58px)] sm:w-[clamp(40px,5vw,58px)]" strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-2.5 xs:mt-4 sm:mt-[clamp(20px,2.5vh,40px)] font-serif text-[9px] xs:text-[11px] sm:text-[24px] lg:text-[34px] font-light leading-tight" style={{ color: card.color }}>
                    {card.title}
                  </h3>

                  <p className="mt-1.5 xs:mt-3 sm:mt-[clamp(16px,2vh,28px)] text-[8px] xs:text-[9.5px] sm:text-[15px] lg:text-[24px] font-medium leading-[1.45] text-[#35435b]">
                    {card.text}
                  </p>

                  <Divider />

                  <button
                    type="button"
                    className="mt-auto grid h-7 w-7 xs:h-9 xs:w-9 sm:h-[clamp(52px,6.5vw,64px)] sm:w-[clamp(52px,6.5vw,64px)] place-items-center rounded-full text-white shadow-md touch-manipulation"
                    style={{ backgroundColor: card.color }}
                  >
                    <ArrowRight className="h-3.5 w-3.5 xs:h-4.5 xs:w-4.5 sm:h-[clamp(26px,3.5vw,36px)] sm:w-[clamp(26px,3.5vw,36px)]" />
                  </button>

                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                </article>
              );
            })}
          </section>

          {/* Bottom Panel - Forced 3-column horizontal grid across all viewports */}
          <section className="system-detail-panel mt-[-50px] sm:mt-[0] relative grid grid-cols-3 gap-1 px-1.5 py-4 xs:px-3 xs:py-5 sm:px-[clamp(16px,2.4vw,36px)] sm:py-[clamp(20px,2.5vh,36px)] rounded-[12px] border border-[#ead8b7] bg-white/72 text-center shadow-[0_4px_12px_rgba(84,54,16,0.1)] sm:border-2 sm:rounded-[20px] sm:shadow-[0_14px_35px_rgba(84,54,16,0.12)] backdrop-blur-md">
            {localBottomItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="relative flex flex-col items-center justify-center px-1.5 py-1.5 xs:px-2 sm:px-[clamp(12px,2vw,32px)] sm:py-0">
                  {/* Fine column separator line on mobile */}
                  {index !== 0 && <span className="absolute left-0 top-2 bottom-2 w-px bg-[#d8b875] sm:top-8 sm:h-[min(210px,22vh)]" />}
                  <Icon className="h-5 w-5 xs:h-6 xs:w-6 sm:h-[clamp(44px,5.5vw,60px)] sm:w-[clamp(44px,5.5vw,60px)] text-[#bd8431]" strokeWidth={1.5} />
                  <h4 className="mt-1.5 xs:mt-3 sm:mt-[clamp(16px,2vh,28px)] font-serif text-[9px] xs:text-[11px] sm:text-[24px] lg:text-[34px] font-light text-[#17233b]">
                    {item.title}
                  </h4>
                  <p className="mt-1 xs:mt-1.5 sm:mt-3 text-[8px] xs:text-[9.5px] sm:text-[15px] lg:text-[20px] font-medium leading-snug text-[#35435b]">
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