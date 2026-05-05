import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  ChevronRight,
  Globe2,
  Landmark,
  Church,
  UsersRound,
  HeartHandshake,
} from "lucide-react";

import bg from "@/assets/images/religions/r-1.png";
import card1 from "@/assets/mainImages/2005.png";
import card2 from "@/assets/mainImages/2005.png";
import card3 from "@/assets/mainImages/2005.png";
import ReligionsKurdistan from "@/components/Sections/religions/ReligionsKurdistan";
import Nationalities from "@/components/Sections/religions/Nationalities";
import StoriesOfCoexistencePage from "@/components/Sections/religions/Coexistence";

type LangCode = "en" | "ku" | "ar";

const pageContent: Record<
  LangCode,
  {
    languageLabel: string;
    title: [string, string, string];
    subtitle: string;
    description: string;
    sharedTitle: string;
    sharedText: string;
    cards: {
      id: "religions" | "nationalities" | "coexistence";
      title: string;
      text: string;
      image: string;
      icon: typeof Church;
      color: string;
    }[];
  }
> = {
  en: {
    languageLabel: "ENGLISH",
    title: ["Religious &", "National Diversity", "in Kurdistan"],
    subtitle: "Kurdistan: The Cradle of Coexistence",
    description:
      "Across faiths, languages, and cultures, Kurdistan stands as a timeless home of respect, unity, and shared heritage.",
    sharedTitle: "Shared Celebrations",
    sharedText: "Festivals and holidays we celebrate together.",
    cards: [
      {
        id: "religions",
        title: "Religions",
        text: "Explore the rich religious heritage and sacred traditions of Kurdistan.",
        image: card1,
        icon: Church,
        color: "#244b1f",
      },
      {
        id: "nationalities",
        title: "Nationalities",
        text: "Discover the diverse ethnic communities, their languages, and cultural contributions.",
        image: card2,
        icon: UsersRound,
        color: "#16466b",
      },
      {
        id: "coexistence",
        title: "Stories of Coexistence",
        text: "Real stories of unity, protection, and everyday coexistence across Kurdistan.",
        image: card3,
        icon: HeartHandshake,
        color: "#52235f",
      },
    ],
  },
  ku: {
    languageLabel: "کوردی",
    title: ["ئاینی و", "فرە نەتەوەیی", "لە کوردستان"],
    subtitle: "کوردستان: گهوارەی هاوبژین",
    description:
      "لە نێوان ئاین و زمان و کلتوورە جیاوازەکاندا، کوردستان ماڵی ڕێز و یەکگرتوویی و میراتی هاوبەشە.",
    sharedTitle: "جەژنە هاوبەشەکان",
    sharedText: "فێستیڤاڵ و پشوویەکان کە پێکەوە جێژنیان دەکەین.",
    cards: [
      {
        id: "religions",
        title: "ئاینەکان",
        text: "بگەڕێ بە میراتی دەوڵەمەندی ئاینی و نەریتە پیرۆزەکانی کوردستان.",
        image: card1,
        icon: Church,
        color: "#244b1f",
      },
      {
        id: "nationalities",
        title: "نەتەوەکان",
        text: "کۆمەڵگە نەتەوەییە جیاوازەکان و زمان و بەشداری کلتوورییان بناسە.",
        image: card2,
        icon: UsersRound,
        color: "#16466b",
      },
      {
        id: "coexistence",
        title: "چیرۆکی هاوبژین",
        text: "چیرۆکی ڕاستەقینەی یەکگرتوویی و پاراستن و هاوبژینی ڕۆژانە لە کوردستان.",
        image: card3,
        icon: HeartHandshake,
        color: "#52235f",
      },
    ],
  },
  ar: {
    languageLabel: "العربية",
    title: ["التنوع الديني", "والقومي", "في كوردستان"],
    subtitle: "كوردستان: مهد التعايش",
    description:
      "عبر الأديان واللغات والثقافات، تظل كوردستان موطناً دائماً للاحترام والوحدة والتراث المشترك.",
    sharedTitle: "احتفالات مشتركة",
    sharedText: "مهرجانات وأعياد نحتفل بها معاً.",
    cards: [
      {
        id: "religions",
        title: "الأديان",
        text: "اكتشف الإرث الديني الغني والتقاليد المقدسة في كوردستان.",
        image: card1,
        icon: Church,
        color: "#244b1f",
      },
      {
        id: "nationalities",
        title: "القوميات",
        text: "تعرّف على المجتمعات القومية المتنوعة ولغاتها وإسهاماتها الثقافية.",
        image: card2,
        icon: UsersRound,
        color: "#16466b",
      },
      {
        id: "coexistence",
        title: "قصص التعايش",
        text: "قصص حقيقية عن الوحدة والحماية والتعايش اليومي في كوردستان.",
        image: card3,
        icon: HeartHandshake,
        color: "#52235f",
      },
    ],
  },
};

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

type ReligiousDiversityPageProps = {
  onBack?: () => void;
};

export default function ReligiousDiversityPage({
  onBack,
}: ReligiousDiversityPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [lang, setLang] = React.useState<LangCode>("en");
  const [subPage, setSubPage] = React.useState<
    null | "religionsKurdistan" | "nationalities" | "coexistence"
  >(null);
  const content = pageContent[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  const handleLanguageChange = () => {
    setLang((prev) => (prev === "en" ? "ku" : prev === "ku" ? "ar" : "en"));
  };

  React.useEffect(() => {
    if (!sectionRef.current || subPage) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-rd-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });
      gsap.set("[data-rd-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      const tl = gsap.timeline();
      tl.to("[data-rd-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        "[data-rd-animate='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [subPage]);

  if (subPage === "religionsKurdistan") {
    return (
      <ReligionsKurdistan
        lang={lang}
        languageLabel={content.languageLabel}
        onLanguageChange={handleLanguageChange}
        onBack={() => setSubPage(null)}
      />
    );
  }

  if (subPage === "nationalities") {
    return (
      <Nationalities
        lang={lang}
        languageLabel={content.languageLabel}
        onLanguageChange={handleLanguageChange}
        onBack={() => setSubPage(null)}
      />
    );
  }

  if (subPage === "coexistence") {
    return <StoriesOfCoexistencePage onBack={() => setSubPage(null)} />;
  }

  return (
    <main
      dir={dir}
      className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-hidden bg-[#fbf1df] px-8 py-10 sm:px-12 lg:px-20"
      >
        <img
          data-rd-hero="true"
          src={bg}
          alt=""
          className="absolute inset-0 h-[calc(70vh-160px)] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-[calc(70vh-160px)] z-[1] h-24 -translate-y-full blur-[2px]"
          style={{
            background:
              "linear-gradient(to top, rgba(251,241,223,0.95) 0%, rgba(251,241,223,0.62) 45%, rgba(251,241,223,0) 100%)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf1df]/78 via-[#fbf1df]/20 to-[#f4dfbb]/92" />
        <div className="pointer-events-none absolute inset-5 rounded-[30px] border-2 border-[#d2a35a]/45" />

        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft className="h-7 w-7" />
        </button>

        <button
          data-rd-animate="true"
          type="button"
          onClick={handleLanguageChange}
          className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]"
        >
          <Globe2 className="h-5 w-5" />
          {content.languageLabel}
        </button>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-[1180px] flex-col">
          <header
            data-rd-animate="true"
            className="mx-auto max-w-[850px] pt-12 text-center"
          >
            <div className="mx-auto mb-2 w-[420px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="font-serif text-[56px] font-semibold uppercase leading-[1.04] tracking-[0.06em] text-[#3b2410] sm:text-[76px] lg:text-[88px]">
              {content.title[0]}
              <br />
              {content.title[1]}
              <br />
              {content.title[2]}
            </h1>

            <h2 className="mt-5 font-serif text-[24px] font-semibold uppercase tracking-[0.08em] text-[#b27a22] sm:text-[30px]">
              {content.subtitle}
            </h2>

            <div className="mx-auto mt-4 w-[190px]">
              <DecorativeLine color="#c3923a" />
            </div>

            <p className="mx-auto mt-5 max-w-[610px] text-[21px] font-semibold leading-relaxed text-[#4d3c2a] sm:text-[26px]">
              {content.description}
            </p>
          </header>

          <div className="flex-1" />

          <section
            data-rd-animate="true"
            className="mx-auto grid w-full max-w-[1040px] grid-cols-1 gap-6 pb-7 sm:grid-cols-3"
          >
            {content.cards.map((card) => {
              const Icon = card.icon;
              const subPageTarget =
                card.id === "religions"
                  ? ("religionsKurdistan" as const)
                  : card.id === "nationalities"
                    ? ("nationalities" as const)
                    : card.id === "coexistence"
                      ? ("coexistence" as const)
                      : null;
              const isNavCard = subPageTarget !== null;

              return (
                <article
                  key={card.id}
                  role={isNavCard ? "button" : undefined}
                  tabIndex={isNavCard ? 0 : undefined}
                  onClick={isNavCard ? () => setSubPage(subPageTarget) : undefined}
                  onKeyDown={
                    isNavCard
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSubPage(subPageTarget);
                          }
                        }
                      : undefined
                  }
                  aria-label={isNavCard ? `${card.title}` : undefined}
                  className={`group relative min-h-[calc(30vh-160px)] overflow-hidden rounded-[28px] border-2 border-[#f3dfb5] shadow-[0_18px_35px_rgba(69,43,14,0.24)] ${isNavCard ? "cursor-pointer outline-none transition hover:ring-2 hover:ring-[#d2a35a]/50 focus-visible:ring-2 focus-visible:ring-[#c3923a]" : ""}`}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, rgba(30,20,10,0.05), ${card.color}ee 72%, ${card.color})`,
                    }}
                  />

                  <div className="relative z-10 flex h-full flex-col justify-end px-7 py-7 text-white">
                    <div className="mb-5 grid h-20 w-20 place-items-center rounded-full border-2 border-[#e4c47e] bg-white/12 backdrop-blur-sm">
                      <Icon className="h-10 w-10" strokeWidth={1.7} />
                    </div>

                    <h3 className="font-serif text-[32px] font-semibold uppercase leading-tight">
                      {card.title}
                    </h3>

                    <p className="mt-3 min-h-[82px] text-[18px] font-semibold leading-snug text-white/90">
                      {card.text}
                    </p>

                    <div className="mt-6 grid h-16 w-full place-items-center rounded-2xl border-2 border-[#d8bc7b] bg-white/5 text-white backdrop-blur-sm transition group-hover:bg-white/15">
                      <ChevronRight className="h-9 w-9" aria-hidden />
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          <section
            data-rd-animate="true"
            className="mx-auto mb-4 flex w-full max-w-[760px] items-center gap-7 rounded-[28px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#cf921d] text-white">
              <UsersRound className="h-9 w-9" />
            </div>

            <p className="flex-1 font-serif text-[25px] font-semibold uppercase leading-tight text-[#3b2410]">
              {content.sharedTitle}
              <br />
              <span className="text-[17px] normal-case font-semibold text-[#6a4a25]">
                {content.sharedText}
              </span>
            </p>

            <button className="grid h-14 w-14 place-items-center rounded-full border border-[#d5b873] bg-[#fff4dc] text-[#8a5a12]">
              <ChevronRight className="h-8 w-8" />
            </button>
          </section>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-[#b9893d]/25 to-transparent" />
        <Landmark className="pointer-events-none absolute bottom-8 left-1/2 h-14 w-14 -translate-x-1/2 text-[#c3923a]/70" />
      </section>
    </main>
  );
}