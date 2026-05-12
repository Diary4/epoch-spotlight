import React from "react";
import gsap from "gsap";
import { ArrowLeft, ChevronRight, Globe2 } from "lucide-react";

import bg from "@/assets/images/religions/r-1.png";
import imgIslam from "@/assets/images/religions/r-1.png";
import imgChristianity from "@/assets/images/religions/r-2.png";
import imgYarsanism from "@/assets/images/religions/r-3.png";
import imgYazidism from "@/assets/images/religions/r-4.png";
import imgJudaism from "@/assets/images/religions/r-5.png";
import imgBahai from "@/assets/images/religions/r-6.jpeg";
import imgZoroastrianism from "@/assets/images/religions/r-7.png";
import imgSabean from "@/assets/mainImages/story-1.png";

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
        shortIntro: "ڕاستیی ناوەخۆ، تەرخانکردن، و کۆمەڵگە.",
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

  React.useEffect(() => {
    if (!sectionRef.current || activeId) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-f-hero='true']", { autoAlpha: 0, scale: 1.04 });
      gsap.set("[data-f-animate='true']", { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline();

      tl.to("[data-f-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
      }).to(
        "[data-f-animate='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.25",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang, activeId]);

  // ---------------------------------------------------------------------------
  // Per-faith detail routing.
  // Wired up: Islam, Christianity, Yazidism (existing files in RelisgionsSection/).
  // Add a branch for each new per-faith page you create — uncomment the matching
  // import at the top of this file before enabling it.
  // ---------------------------------------------------------------------------

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
      className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-[#fbf1df] px-6 pb-20 pt-10 sm:px-12 lg:px-20"
      >
        {/* Background image (fades into cream like Nations / Kurds) */}
        <img
          data-f-hero="true"
          src={bg}
          alt=""
          className="pointer-events-none absolute inset-0 h-[55vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[55vh] bg-gradient-to-b from-[#fbf1df]/72 via-[#fbf1df]/30 to-[#f4dfbb]/95" />
        <div className="pointer-events-none absolute inset-5 rounded-[30px] border-2 border-[#d2a35a]/45" />

        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm transition hover:bg-white"
          aria-label={c.back}
        >
          <ArrowLeft className="h-7 w-7" />
        </button>

        <button
          type="button"
          onClick={onLanguageChange}
          className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)] transition hover:bg-white"
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
            <h1 className="font-serif text-[56px] font-semibold uppercase leading-[1.04] tracking-[0.04em] text-[#3b2410] sm:text-[76px] lg:text-[84px]">
              {c.pageTitle}
            </h1>
            <div className="mx-auto mt-5 w-[180px]">
              <DecorativeLine color="#c3923a" />
            </div>
            <p className="mx-auto mt-5 max-w-[620px] text-[18px] font-semibold leading-relaxed text-[#4d3c2a] sm:text-[20px]">
              {c.pageDescription}
            </p>
          </header>

          <div
            data-f-animate="true"
            className="mx-auto mt-[clamp(80px,30vh,360px)] grid w-full max-w-[1180px] grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {c.faiths.map((faith) => (
            <article
              key={faith.id}
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
              className="group relative flex min-h-[420px] cursor-pointer flex-col overflow-hidden rounded-[28px] border-2 border-[#f3dfb5] bg-white/85 shadow-[0_18px_36px_rgba(69,43,14,0.22)] outline-none transition hover:-translate-y-1 hover:shadow-[0_24px_44px_rgba(69,43,14,0.28)] focus-visible:ring-2 focus-visible:ring-[#c3923a]"
            >
              <div className="relative h-[230px] w-full overflow-hidden">
                <img
                  src={faith.image}
                  alt={faith.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f05]/55 via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col px-6 py-6">
                <h3 className="font-serif text-[24px] font-semibold uppercase leading-tight text-[#3b2410]">
                  {faith.title}
                </h3>
                <div className="mt-2 mb-3 w-[60px]">
                  <span className="block h-[2px] bg-[#c3923a]" />
                </div>
                <p className="text-[14px] leading-relaxed text-[#5a4a30]">
                  {faith.shortIntro}
                </p>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="font-serif text-[12px] font-semibold uppercase tracking-[0.28em] text-[#a77423]">
                    {c.openLabel}
                  </span>
                  <div className="grid h-11 w-11 place-items-center rounded-full border border-[#d8bc7b] bg-[#fff4dc] text-[#8a5a12] transition group-hover:bg-[#c3923a] group-hover:text-white">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </article>
          ))}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-[#b9893d]/20 to-transparent" />
      </section>
    </main>
  );
}
