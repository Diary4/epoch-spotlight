import React from "react";
import gsap from "gsap";
import { ArrowLeft, Globe2 } from "lucide-react";

import faithsVideo from "@/assets/videos/faiths.webm";
import imgIslam from "@/assets/images/religions/r-1.webp";
import imgChristianity from "@/assets/images/religions/r-2.webp";
import imgYarsanism from "@/assets/images/religions/r-3.webp";
import imgYazidism from "@/assets/images/religions/r-4.webp";
import imgJudaism from "@/assets/images/religions/r-5.webp";
import imgBahai from "@/assets/images/religions/r-6.webp";
import imgZoroastrianism from "@/assets/images/religions/r-7.webp";
import imgSabean from "@/assets/mainImages/story-1.webp";

// Per-faith detail pages — wire up each faith to its own file.
import IslamPage from "@/components/Sections/religions/RelisgionsSection/Islam";
import ChristianityPage from "@/components/Sections/religions/RelisgionsSection/Christianity";
import YazidismPage from "@/components/Sections/religions/RelisgionsSection/Yazidism";
import YarsanismPage from "@/components/Sections/religions/RelisgionsSection/Yarsanism";
import ZoroastrianismPage from "@/components/Sections/religions/RelisgionsSection/Zoroastrianism";
import JudaismPage from "@/components/Sections/religions/RelisgionsSection/Judaism";
import BahaiPage from "@/components/Sections/religions/RelisgionsSection/Bahai";
import SabeanMandaeanismPage from "@/components/Sections/religions/RelisgionsSection/SabeanMandaeanism";

type LangCode = "en" | "ku" | "ar";

type FaithId =
  | "islam"
  | "christianity"
  | "yazidism"
  | "yarsanism"
  | "zoroastrianism"
  | "judaism"
  | "bahai"
  | "sabean-mandaeanism";

type FaithCard = {
  id: FaithId;
  title: string;
  shortIntro: string;
  image: string;
};

type FaithsContent = {
  back: string;
  pageTitle: string;
  pageDescription: string;
  openLabel: string;
  faiths: FaithCard[];
};

const content: Record<LangCode, FaithsContent> = {
  en: {
    back: "Back",
    pageTitle: "Faiths",
    pageDescription:
      "The sacred traditions that share one homeland — their beliefs, practices, and place in Kurdistan today.",
    openLabel: "Open",
    faiths: [
      {
        id: "islam",
        title: "Islam",
        shortIntro: "Faith, worship, and living tradition.",
        image: imgIslam,
      },
      {
        id: "christianity",
        title: "Christianity",
        shortIntro: "Ancient roots, faith, and community.",
        image: imgChristianity,
      },
      {
        id: "yazidism",
        title: "Yazidism",
        shortIntro: "Sacred valley, memory, and resilience.",
        image: imgYazidism,
      },
      {
        id: "yarsanism",
        title: "Yarsanism (Kaka'i)",
        shortIntro: "Inner truth, devotion, and community.",
        image: imgYarsanism,
      },
      {
        id: "zoroastrianism",
        title: "Zoroastrianism",
        shortIntro: "Light, truth, and ancient wisdom.",
        image: imgZoroastrianism,
      },
      {
        id: "judaism",
        title: "Judaism",
        shortIntro: "Memory, heritage, and continuity.",
        image: imgJudaism,
      },
      {
        id: "bahai",
        title: "Baha'i Faith",
        shortIntro: "Unity, peace, and one humanity.",
        image: imgBahai,
      },
      {
        id: "sabean-mandaeanism",
        title: "Sabean-Mandaeanism",
        shortIntro: "Living water, purity, and continuity.",
        image: imgSabean,
      },
    ],
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "ئاینەکان",
    pageDescription:
      "نەریتە پیرۆزەکانی کە یەک نیشتمانیان هاوبەشە — باوەڕ، نوێژ، و جێگەیان لە کوردستانی ئەمڕۆ.",
    openLabel: "بکەرەوە",
    faiths: [
      {
        id: "islam",
        title: "ئیسلام",
        shortIntro: "باوەڕ، پەرستن، و نەریتی زیندوو.",
        image: imgIslam,
      },
      {
        id: "christianity",
        title: "مەسیحی",
        shortIntro: "ڕەگەکانی کۆن، باوەڕ، و کۆمەڵگە.",
        image: imgChristianity,
      },
      {
        id: "yazidism",
        title: "ئێزدیەتی",
        shortIntro: "دۆڵی پیرۆز، یاد، و بەرگری.",
        image: imgYazidism,
      },
      {
        id: "yarsanism",
        title: "یارسانیەتی (کاکەیی)",
        shortIntro: "ڕاستیی ناوەخۆ، تەرخانکردن, و کۆمەڵگە.",
        image: imgYarsanism,
      },
      {
        id: "zoroastrianism",
        title: "زەردەشتیەتی",
        shortIntro: "ڕووناکی، ڕاستی، و دانایی کۆن.",
        image: imgZoroastrianism,
      },
      {
        id: "judaism",
        title: "جوولەکە",
        shortIntro: "یاد، میرات، و بەردەوامی.",
        image: imgJudaism,
      },
      {
        id: "bahai",
        title: "ئاینی بەهایی",
        shortIntro: "یەکگرتوویی، ئاشتی، و یەک مرۆڤایەتی.",
        image: imgBahai,
      },
      {
        id: "sabean-mandaeanism",
        title: "سابیی-مەندەیی",
        shortIntro: "ئاوی زیندوو، پاکی، و بەردەوامی.",
        image: imgSabean,
      },
    ],
  },
  ar: {
    back: "العودة",
    pageTitle: "الأديان",
    pageDescription:
      "التقاليد المقدسة التي تتقاسم وطناً واحداً — معتقداتها وممارساتها ومكانتها في كوردستان اليوم.",
    openLabel: "اعرض",
    faiths: [
      {
        id: "islam",
        title: "الإسلام",
        shortIntro: "إيمان وعبادة وتقليد حيّ.",
        image: imgIslam,
      },
      {
        id: "christianity",
        title: "المسيحية",
        shortIntro: "جذور قديمة وإيمان ومجتمع.",
        image: imgChristianity,
      },
      {
        id: "yazidism",
        title: "الإيزيدية",
        shortIntro: "وادٍ مقدس وذاكرة وصمود.",
        image: imgYazidism,
      },
      {
        id: "yarsanism",
        title: "اليارسانية (الكاكائية)",
        shortIntro: "حقيقة باطنية وتفانٍ ومجتمع.",
        image: imgYarsanism,
      },
      {
        id: "zoroastrianism",
        title: "الزرادشتية",
        shortIntro: "نور وحق وحكمة قديمة.",
        image: imgZoroastrianism,
      },
      {
        id: "judaism",
        title: "اليهودية",
        shortIntro: "ذاكرة وتراث واستمرارية.",
        image: imgJudaism,
      },
      {
        id: "bahai",
        title: "البهائية",
        shortIntro: "وحدة وسلام وإنسانية واحدة.",
        image: imgBahai,
      },
      {
        id: "sabean-mandaeanism",
        title: "الصابئة-المندائية",
        shortIntro: "ماء حيّ وطهارة واستمرارية.",
        image: imgSabean,
      },
    ],
  },
};

function DecorativeLine({ color = "#c3923a" }: { color?: string }) {
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

type FaithsPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function FaithsPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: FaithsPageProps) {
  const [activeId, setActiveId] = React.useState<FaithId | null>(null);
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  // Staggered Page Entrance Animation via useLayoutEffect
  React.useLayoutEffect(() => {
    if (!sectionRef.current || activeId) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      const hero = "[data-f-hero='true']";
      const animElements = "[data-f-animate='true']";
      const cards = "[data-f-card='true']";

      gsap.set(hero, { autoAlpha: 0, scale: 1.04 });
      gsap.set(animElements, { autoAlpha: 0, y: 24 });
      gsap.set(cards, { autoAlpha: 0, y: 35 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(hero, {
        autoAlpha: 1,
        scale: 1,
        duration: 1.0,
        ease: "power2.out",
      }).to(
        animElements,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
        },
        "-=0.5",
      ).to(
        cards,
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.8,
        },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang, activeId]);

  if (activeId === "islam") {
    return (
      <IslamPage
        lang={lang}
        languageLabel={languageLabel}
        onLanguageChange={onLanguageChange}
        onBack={() => setActiveId(null)}
      />
    );
  }

  if (activeId === "christianity") {
    return (
      <ChristianityPage
        lang={lang}
        languageLabel={languageLabel}
        onLanguageChange={onLanguageChange}
        onBack={() => setActiveId(null)}
      />
    );
  }

  if (activeId === "yazidism") {
    return (
      <YazidismPage
        lang={lang}
        languageLabel={languageLabel}
        onLanguageChange={onLanguageChange}
        onBack={() => setActiveId(null)}
      />
    );
  }

  if (activeId === "yarsanism") {
    return (
      <YarsanismPage
        lang={lang}
        languageLabel={languageLabel}
        onLanguageChange={onLanguageChange}
        onBack={() => setActiveId(null)}
      />
    );
  }

  if (activeId === "zoroastrianism") {
    return (
      <ZoroastrianismPage
        lang={lang}
        languageLabel={languageLabel}
        onLanguageChange={onLanguageChange}
        onBack={() => setActiveId(null)}
      />
    );
  }

  if (activeId === "judaism") {
    return (
      <JudaismPage
        lang={lang}
        languageLabel={languageLabel}
        onLanguageChange={onLanguageChange}
        onBack={() => setActiveId(null)}
      />
    );
  }

  if (activeId === "bahai") {
    return (
      <BahaiPage
        lang={lang}
        languageLabel={languageLabel}
        onLanguageChange={onLanguageChange}
        onBack={() => setActiveId(null)}
      />
    );
  }

  if (activeId === "sabean-mandaeanism") {
    return (
      <SabeanMandaeanismPage
        lang={lang}
        languageLabel={languageLabel}
        onLanguageChange={onLanguageChange}
        onBack={() => setActiveId(null)}
      />
    );
  }

  return (
    <main
      dir={dir}
      className="m-0 flex min-h-screen w-screen justify-center bg-[#faf8f5] p-0 text-stone-800"
    >
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-[#faf8f5] px-6 pb-20 pt-10 sm:px-12 lg:px-20"
      >
        {/* Background video (retained completely intact) */}
        <video
          data-f-hero="true"
          src={faithsVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="pointer-events-none absolute inset-0 h-[65vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[55vh] bg-gradient-to-b from-[#faf8f5]/72 via-[#faf8f5]/30 to-[#faf8f5]/95" />

        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border border-stone-200 bg-white/80 text-stone-800 shadow-sm transition hover:bg-stone-50"
          aria-label={c.back}
        >
          <ArrowLeft className="h-7 w-7" />
        </button>

        <button
          type="button"
          onClick={onLanguageChange}
          className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-stone-200 bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-stone-800 shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition hover:bg-stone-50"
        >
          <Globe2 className="h-5 w-5" />
          {languageLabel}
        </button>

        <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col">
          <header
            data-f-animate="true"
            className="mx-auto max-w-[850px] pt-28 text-center sm:pt-32"
          >
            <div className="mx-auto mt-3 mb-3 w-[260px]">
              <DecorativeLine color="#c3923a" />
            </div>
            <h1 className="font-serif text-[56px] font-semibold uppercase leading-[1.04] tracking-[0.04em] text-stone-900 sm:text-[76px] lg:text-[84px]">
              {c.pageTitle}
            </h1>
            <div className="mx-auto mt-5 w-[180px]">
              <DecorativeLine color="#c3923a" />
            </div>
            <p className="mx-auto mt-5 max-w-[620px] text-[18px] font-semibold leading-relaxed text-stone-600 sm:text-[20px]">
              {c.pageDescription}
            </p>
          </header>

          <div
            className="mx-auto mt-[clamp(80px,40vh,860px)] grid w-full max-w-[1180px] grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {c.faiths.map((faith) => (
              <div 
                key={faith.id} 
                data-f-card="true" 
                className="w-full"
              >
                <article
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveId(faith.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveId(faith.id);
                    }
                  }}
                  aria-label={faith.title}
                  className="bg-[#faf8f5] border border-stone-200/60 p-3 sm:p-4 relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[32px] text-left shadow-[0_8px_30px_rgba(28,24,20,0.03)] outline-none focus-visible:ring-2 focus-visible:ring-[#d6a45b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5]"
                >
                  {/* Framed Image Container */}
                  <div className="relative h-[210px] w-full overflow-hidden rounded-2xl bg-stone-100">
                    <img
                      src={faith.image}
                      alt={faith.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    {/* Soft inner shadow for recess depth */}
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_15px_rgba(0,0,0,0.04)]" />
                  </div>

                  {/* Content Area */}
                  <div className="flex flex-1 flex-col pt-4">
                    <h3 className="font-serif text-[20px] font-semibold uppercase leading-tight text-stone-900">
                      {faith.title}
                    </h3>
                    <div className="mt-2 mb-3 w-[45px]">
                      <span className="block h-[1.5px] w-full bg-[#c3923a]" />
                    </div>
                    <p className="text-[13px] leading-relaxed text-stone-600 font-medium">
                      {faith.shortIntro}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-[#faf8f5]/20 to-transparent" />
      </section>
    </main>
  );
}