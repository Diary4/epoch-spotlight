import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  ChevronRight,
  Globe2,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import OtherFaithTraditionsPage from "@/components/Sections/religions/RelisgionsSection/OtherFaith";

import bg from "@/assets/images/religions/r-3.png";
import meaningImg from "@/assets/mainImages/letter.png";
import principlesImg from "@/assets/mainImages/story-2.png";
import jamkhanaImg from "@/assets/mainImages/shared.png";
import bookImg from "@/assets/mainImages/story-1.png";
import en from "@/data/en.json";
import ar from "@/data/ar.json";

const cards = [
  {
    title: "Meaning",
    text:
      "\u201CYarsan\u201D means lovers of God and His followers. In the Kurdistan Region followers are called Kakais \u2014 from the Kurdish word \u201CKaka\u201D meaning respected elder.",
    image: meaningImg,
  },
  {
    title: "Four Principles",
    text:
      "Purity, Truth, Selflessness (Nisti), and Religiosity (Rada). Three principles focus on human relationships, one on the relationship with God.",
    image: principlesImg,
  },
  {
    title: "Jamkhana",
    text:
      "The sacred gathering place where all religious rites are performed. Music, particularly the tambour, plays a central role in ceremonies and spiritual life.",
    image: jamkhanaImg,
  },
  {
    title: "Sacred Book",
    text:
      "The Sernjam \u2014 written in Gorani and Sorani Kurdish dialects in verse. Covers creation, angels, Adam and Eve, and religious teachings.",
    image: bookImg,
  },
];

function DecorativeLine({ color = "#c99a55" }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
      <span className="text-2xl" style={{ color }}>
        ✥
      </span>
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
    </div>
  );
}

type YarsanismPageProps = {
  lang?: "en" | "ku" | "ar";
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function YarsanismPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: YarsanismPageProps) {
  const data = lang === "ar" ? (ar as any) : (en as any);
  const yarsanismData = data?.religions?.yarsanism ?? {};
  const localizedCards = cards.map((card, i) => ({
    ...card,
    title: yarsanismData?.cards?.[i]?.title ?? card.title,
    text: yarsanismData?.cards?.[i]?.text ?? card.text,
  }));
  const pageTitle = yarsanismData?.title ?? "Yarsanism";
  const pageSubtitle =
    yarsanismData?.subtitle ?? "A quiet path of faith.";
  const pageDescription =
    yarsanismData?.description ??
    "Known in Kurdistan as Kaka\u2019i, Yarsanism is a Kurdish faith of inner light, devotion, and community \u2014 carried in song, gathered in jamkhana, and lived in everyday kinship.";
  const photoLabel =
    yarsanismData?.photoLabel ?? "Kakai Shrine \u2014 Hawar Village";
  const footerTitle =
    yarsanismData?.footer?.title ?? "Inner truth. Living tradition.";
  const footerText =
    yarsanismData?.footer?.text ??
    "From the tambour of the jamkhana to the verses of the Sernjam, Yarsanism endures as a quiet, enduring path of faith.";

  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [subPage, setSubPage] = React.useState<null | "otherFaith">(null);
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-yarsan-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });
      gsap.set("[data-yarsan-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      const tl = gsap.timeline();
      tl.to("[data-yarsan-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        "[data-yarsan-animate='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.07,
          ease: "power2.out",
        },
        "-=0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (subPage === "otherFaith") {
    return (
      <OtherFaithTraditionsPage
        lang={lang}
        languageLabel={languageLabel}
        onLanguageChange={onLanguageChange}
        onBack={() => setSubPage(null)}
      />
    );
  }

  return (
    <main
      dir={dir}
      className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-7 py-9 sm:px-10 lg:px-16"
      >
        <img
          data-yarsan-hero="true"
          src={bg}
          alt=""
          className="absolute left-0 top-0 h-[calc(50vh-160px)] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-[calc(50vh-160px)] z-[1] h-24 -translate-y-full blur-[2px]"
          style={{
            background:
              "linear-gradient(to top, rgba(251,241,223,0.95) 0%, rgba(251,241,223,0.62) 45%, rgba(251,241,223,0) 100%)",
          }}
        />

        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft className="h-7 w-7" />
        </button>

        <button
          type="button"
          onClick={onLanguageChange}
          className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]"
        >
          <Globe2 className="h-5 w-5" />
          {languageLabel}
        </button>

        <div className="relative z-10 mx-auto max-w-[1020px]">
          <header
            data-yarsan-animate="true"
            className="mx-auto max-w-[820px] pt-12 text-center"
          >
            <div className="mx-auto mb-4 w-[440px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="font-serif text-[66px] font-semibold uppercase leading-[1] tracking-[0.1em] text-[#2f1f12] sm:text-[86px] lg:text-[104px]">
              {pageTitle}
            </h1>

            <p className="mt-4 font-serif text-[25px] font-semibold text-[#a46f22] sm:text-[31px]">
              {pageSubtitle}
            </p>

            <div className="mx-auto mt-6 w-[190px]">
              <DecorativeLine color="#c3923a" />
            </div>

            <p className="mx-auto mt-6 max-w-[620px] text-[19px] font-semibold leading-relaxed text-[#3f3528] sm:text-[23px]">
              {pageDescription}
            </p>
          </header>

          <div className="h-[560px]" />

          <div data-yarsan-animate="true" className="mb-6 flex justify-end">
            <span className="rounded-full border border-[#d8b875]/70 bg-[#fff8e9]/90 px-5 py-2 font-serif text-[16px] font-semibold text-[#6a4a25] shadow-sm">
              {photoLabel}
            </span>
          </div>

          <section
            data-yarsan-animate="true"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {localizedCards.map((card) => (
              <article
                key={card.title}
                className="grid min-h-[255px] grid-cols-[135px_1fr] gap-5 rounded-[24px] border-2 border-[#d8b875]/55 bg-[#fff8e9]/92 px-6 py-6 shadow-[0_10px_22px_rgba(75,45,12,0.12)] backdrop-blur-sm"
              >
                <div className="h-[135px] w-[135px] overflow-hidden rounded-full border-2 border-[#d8b875] bg-[#f4e1bb]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-[27px] font-semibold uppercase leading-tight text-[#3b2410]">
                      {card.title}
                    </h3>
                    <Sparkles className="h-8 w-8 shrink-0 text-[#c58b16]" />
                  </div>

                  <div className="my-3 w-[130px]">
                    <DecorativeLine color="#d1a14f" />
                  </div>

                  <p className="whitespace-pre-line text-[17px] font-semibold leading-relaxed text-[#4d3c2a]">
                    {card.text}
                  </p>
                </div>
              </article>
            ))}
          </section>

          <section
            data-yarsan-animate="true"
            className="mx-auto mt-7 flex items-center gap-7 rounded-[26px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <div className="grid h-16 w-16 shrink-0 place-items-center text-[#c58b16]">
              <HeartHandshake className="h-12 w-12" strokeWidth={1.8} />
            </div>

            <p className="flex-1 font-serif text-[27px] font-semibold uppercase leading-tight text-[#3b2410]">
              {footerTitle}
              <br />
              <span className="text-[18px] normal-case font-semibold text-[#6a4a25]">
                {footerText}
              </span>
            </p>

            <button
              type="button"
              onClick={() => setSubPage("otherFaith")}
              className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[#d6b06b] bg-[#fff4dc] text-[#a8751f]"
            >
              <ChevronRight className="h-9 w-9" />
            </button>
          </section>

          <Sparkles className="mx-auto mt-5 h-12 w-12 text-[#c58b16]" />
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
      </section>
    </main>
  );
}
