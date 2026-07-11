import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, FilePenLine, MessageCircleMore, UsersRound } from "lucide-react";
import { useSystemDetailAnimation } from "@/components/Sections/TheSystem/useSystemDetailAnimation";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import {
  detailBackButtonSideClassName,
  detailBackIconClassName,
  systemCanvasBackButtonClassName,
  systemCanvasBackIconSize,
} from "@/constants/backNavigation";
import bg from "@/assets/images/parliment/parliment.webp";
import lawmakingIcon from "@/assets/icons/thesystem/parliment/lawmaking.webp";
import representationIcon from "@/assets/icons/thesystem/parliment/representation.webp";
import oversightIcon from "@/assets/icons/thesystem/parliment/oversight.webp";

const mainCards = [
  {
    title: "Lawmaking",
    text: "Reviews and passes laws for public life.",
    iconSrc: lawmakingIcon,
  },
  {
    title: "Representation",
    text: "Reflects the voice and interests of the people.",
    iconSrc: representationIcon,
  },
  {
    title: "Oversight",
    text: "Monitors public affairs and institutional accountability.",
    iconSrc: oversightIcon,
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

type ParliamentPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

export default function ParliamentPage({ lang = "en", onBack }: ParliamentPageProps) {
  const rootRef = useSystemDetailAnimation([lang]);
  const isAr = lang === "ar";
  const isKu = lang === "ku";
  const dir = lang === "en" ? "ltr" : "rtl";
  const isRtlScript = discoverRtlScript(lang);
  const displayFont = discoverDisplayFont(lang);

  const localMainCards = isAr
    ? [
        { title: "التشريع", text: "يراجع القوانين ويُقرّها لخدمة الحياة العامة.", iconSrc: lawmakingIcon },
        { title: "التمثيل", text: "يعكس صوت الشعب ومصالحه.", iconSrc: representationIcon },
        { title: "الرقابة", text: "يراقب الشؤون العامة ويحاسب المؤسسات.", iconSrc: oversightIcon },
      ]
    : isKu
      ? [
          { title: "یاسادانان", text: "پێداچوونەوە و پەسەندکردنی یاساکان بۆ ژیانی گشتی.", iconSrc: lawmakingIcon },
          { title: "نوێنەرایەتیکردن", text: "ڕەنگدانەوەی دەنگ و بەرژەوەندییەکانی گەل.", iconSrc: representationIcon },
          { title: "چاودێری", text: "چاودێریکردنی کاروباری گشتی و لێپرسینەوەی دامەزراوەیی.", iconSrc: oversightIcon },
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

  // Fixed design canvas (1400px wide). We measure its natural height and scale
  // the whole canvas to fit the viewport in BOTH dimensions, then center it
  // horizontally and anchor it to the top, so all content stays visible without
  // scrolling on any screen (e.g. 1080x1920) and the hero stays flush to the top.
  const DESIGN_WIDTH = 1400;
  const canvasRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, x: 0 });

  useEffect(() => {
    const recompute = () => {
      const el = canvasRef.current;
      if (!el) return;
      const naturalHeight = el.offsetHeight;
      if (!naturalHeight) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scale = Math.min(vw / DESIGN_WIDTH, vh / naturalHeight);
      const x = (vw - DESIGN_WIDTH * scale) / 2;
      setFit({ scale, x });
    };

    recompute();
    window.addEventListener("resize", recompute);
    const el = canvasRef.current;
    const ro = el ? new ResizeObserver(recompute) : null;
    if (el && ro) ro.observe(el);
    return () => {
      window.removeEventListener("resize", recompute);
      ro?.disconnect();
    };
  }, [lang]);

  return (
    <div
      dir={dir}
      className={`relative h-screen w-screen overflow-hidden bg-[#fbf5eb] ${isRtlScript ? "font-noto-naskh" : ""}`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        ref={canvasRef}
        style={{
          width: `${DESIGN_WIDTH}px`,
          transform: `translate(${fit.x}px, 0px) scale(${fit.scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
          containerType: "inline-size",
        }}
      >
        <main ref={rootRef} className="m-0 w-full bg-[#fbf5eb] text-[#17233b]">
          <section className="relative mx-auto flex w-full flex-col overflow-hidden bg-[#fbf5eb]">
            <button
              type="button"
              onClick={onBack}
              className={`${systemCanvasBackButtonClassName} ${detailBackButtonSideClassName(dir)}`}
              aria-label="Back to The System"
            >
              <ArrowLeft size={systemCanvasBackIconSize} className={detailBackIconClassName(dir)} />
            </button>

            <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

            {/* Main portrait — top-right, fading into the paper */}
            <div className="pointer-events-none absolute right-0 top-0 z-0 h-[940px] w-full overflow-hidden rtl:right-auto rtl:left-0">
              <div className="absolute inset-0 rtl:-scale-x-100">
                <img
                  src={bg}
                  alt="Parliament building portrait"
                  className="system-detail-hero absolute inset-0 h-full w-full object-cover object-[72%_28%] [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.15)_12%,rgba(0,0,0,0.45)_28%,rgba(0,0,0,0.8)_44%,black_68%),linear-gradient(to_bottom,black_0%,black_72%,rgba(0,0,0,0.75)_82%,rgba(0,0,0,0.35)_92%,transparent_100%)] [-webkit-mask-composite:source-in] [mask-composite:intersect]"
                />
              </div>
              <div
                className="absolute inset-0 [background:linear-gradient(to_right,#fbf5eb_0%,#fbf5eb_22%,rgba(251,245,235,0.96)_36%,rgba(251,245,235,0.78)_48%,rgba(251,245,235,0.42)_60%,transparent_74%)] rtl:[background:linear-gradient(to_left,#fbf5eb_0%,#fbf5eb_22%,rgba(251,245,235,0.96)_36%,rgba(251,245,235,0.78)_48%,rgba(251,245,235,0.42)_60%,transparent_74%)]"
              />
              <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-b from-transparent via-[#fbf5eb]/40 to-[#fbf5eb]" />
            </div>

            <div className="relative z-10 flex h-[940px] min-h-0 flex-col px-[clamp(1.4rem,4cqw,4rem)] pt-[clamp(3.5rem,6cqh,5rem)] pb-[clamp(1.2rem,3cqh,2.6rem)]">
              <section className="system-detail-intro max-w-[min(46cqw,720px)]">
                <h1 className={`${displayFont} text-[clamp(6rem,11cqw,10rem)] font-light leading-none tracking-tight text-[#17233b]`}>
                  {isAr ? "البرلمان" : isKu ? "پەرلەمان" : "Parliament"}
                </h1>

                <p className="mt-[clamp(1rem,2.2cqh,2rem)] text-[clamp(1.65rem,2.75cqw,2.7rem)] font-light leading-tight text-[#9b6d35]">
                  {isAr ? "المؤسسة التشريعية لإقليم كوردستان." : isKu ? "دامەزراوەی یاسادانانی هەرێمی کوردستان." : "The legislative institution of the Kurdistan Region."}
                </p>

                <div className="mt-[clamp(1rem,2.3cqh,2rem)] flex w-[clamp(9rem,18cqw,14.5rem)] items-center gap-4 text-[#b99152]">
                  <span className="h-0.5 flex-1 bg-[#b99152]" />
                  <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
                  <span className="h-0.5 flex-1 bg-[#b99152]" />
                </div>

                <p className="mt-[clamp(1rem,2.4cqh,2rem)] max-w-[min(38cqw,590px)] text-[clamp(1.2rem,2cqw,1.95rem)] font-light leading-[1.55] text-[#2d3549]">
                  {isAr
                    ? "يناقش البرلمان الشؤون العامة ويُشرّع القوانين ويمثّل الشعب."
                    : isKu
                      ? "پەرلەمان گفتوگۆ لەسەر کاروباری گشتی دەکات، یاسا دەر دەکات و نوێنەرایەتیی گەل دەکات."
                      : "Parliament discusses public issues, passes laws, and represents the people."}
                </p>
              </section>
            </div>

            <div className="relative z-10 px-[clamp(1.4rem,4cqw,4rem)] pb-[clamp(1.2rem,3cqh,2.6rem)]">
              <section className="grid grid-cols-3 gap-[clamp(0.85rem,1.8cqw,2.1rem)]">
                {localMainCards.map((card) => {
                  return (
                    <article
                      key={card.title}
                      className="system-detail-card relative flex min-h-[clamp(27rem,44cqh,40rem)] flex-col items-center overflow-hidden rounded-[26px] border-2 border-[#ead8b7] bg-white/76 px-[clamp(0.95rem,1.9cqw,2rem)] py-[clamp(1rem,2.2cqh,2rem)] text-center shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md"
                    >
                      <div className="grid h-[clamp(8rem,14cqw,14rem)] w-[clamp(8rem,14cqw,14rem)] shrink-0 place-items-center overflow-hidden rounded-full">
                        <img
                          src={card.iconSrc}
                          alt=""
                          className="h-full w-full object-cover scale-[1.25]"
                        />
                      </div>

                      <h3 className={`mt-[clamp(0.8rem,1.8cqh,1.9rem)] whitespace-pre-line ${displayFont} text-[clamp(1.5rem,2.7cqw,2.5rem)] font-light leading-[0.98] text-[#17233b]`}>
                        {card.title}
                      </h3>

                      <div className="my-[clamp(0.75rem,1.6cqh,1.7rem)] flex w-[clamp(4.8rem,10cqw,8rem)] items-center justify-center gap-3 text-[#b99152]">
                        <span className="h-0.5 flex-1 bg-[#d2b475]" />
                        <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
                        <span className="h-0.5 flex-1 bg-[#d2b475]" />
                      </div>

                      <p className="text-[clamp(1.02rem,1.58cqw,1.5rem)] font-light leading-[1.5] text-[#303a50]">
                        {card.text}
                      </p>

                      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                    </article>
                  );
                })}
              </section>

              <section className="system-detail-panel relative mt-[clamp(1rem,2cqh,2rem)] grid grid-cols-3 gap-[clamp(0.85rem,1.8cqw,2.1rem)] rounded-[26px] border-2 border-[#ead8b7] bg-white/76 px-[clamp(1rem,2.1cqw,2.5rem)] py-[clamp(1rem,2.2cqh,2rem)] text-center shadow-[0_14px_35px_rgba(84,54,16,0.13)] backdrop-blur-md">
                {localBottomItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title} className="relative flex flex-col items-center justify-center px-[clamp(0.5rem,1cqw,1rem)]">
                      {index !== 0 && (
                        <span className="absolute left-0 top-[clamp(0.5rem,1cqh,1rem)] bottom-[clamp(0.5rem,1cqh,1rem)] w-px bg-[#d8b875]" />
                      )}
                      <Icon className="text-[#bd8431]" size={44} strokeWidth={1.5} />
                      <h4 className={`mt-[clamp(0.75rem,1.4cqh,1.25rem)] ${displayFont} text-[clamp(1.2rem,2.2cqw,2rem)] font-light text-[#17233b]`}>
                        {item.title}
                      </h4>
                      <p className="mt-[clamp(0.4rem,0.8cqh,0.75rem)] text-[clamp(0.95rem,1.4cqw,1.25rem)] font-light leading-snug text-[#35435b]">
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
      </div>
    </div>
  );
}
