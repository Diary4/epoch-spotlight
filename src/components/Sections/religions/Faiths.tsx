import React from "react";
import gsap from "gsap";
import { ArrowLeft, Globe2 } from "lucide-react";
import { detailBackIconClassName, detailBackIconSize, religionsOverlayStartClassName, religionsOverlayEndClassName } from "@/constants/backNavigation";

import ReligionInfoCard from "@/components/Sections/religions/ReligionInfoCard";
import ReligionsScaledPage from "@/components/Sections/religions/ReligionsScaledPage";
import { useSectionExit } from "@/components/Sections/religions/useSectionExit";

import faithsVideo from "@/assets/videos/faiths.webm";
import imgIslam from "@/assets/images/religions/islam/barzani.jpeg";
import imgChristianity from "@/assets/images/new/religions/faiths/christianity.webp";
import imgYazidism from "@/assets/images/religions/yazidi/lalish.jpeg";
import imgYarsanism from "@/assets/images/religions/kakayi/cover.jpeg";
import imgZoroastrianism from "@/assets/images/new/religions/faiths/zoroastrianism.webp";
import imgJudaism from "@/assets/images/religions/judaism/card-cover.jpeg";
import imgBahai from "@/assets/images/religions/bahai/card-cover.jpeg";
import imgSabean from "@/assets/images/religions/sabean/card-cover.jpeg";

// Per-faith detail pages
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
      "Faith, worship, and living traditions across Kurdistan.",
    openLabel: "Open",
    faiths: [
      {
        id: "islam",
        title: "Islam",
        shortIntro: "Faith, Worship, and Living Traditions.",
        image: imgIslam,
      },
      {
        id: "christianity",
        title: "Christianity",
        shortIntro: "Ancient Roots, Enduring Faith, and a United Community.",
        image: imgChristianity,
      },
      {
        id: "yazidism",
        title: "Yazidism",
        shortIntro: "The Sacred Valley, Memory, and Resilience.",
        image: imgYazidism,
      },
      {
        id: "yarsanism",
        title: "Yarsanism (Kaka'i)",
        shortIntro: "Inner Truth, Faith, and Community.",
        image: imgYarsanism,
      },
      {
        id: "zoroastrianism",
        title: "Zoroastrianism",
        shortIntro: "Light, Truth, and Wisdom.",
        image: imgZoroastrianism,
      },
      {
        id: "judaism",
        title: "Judaism",
        shortIntro: "Memory, Heritage, and Continuity.",
        image: imgJudaism,
      },
      {
        id: "bahai",
        title: "The Bahá’í Faith",
        shortIntro: "Harmony, Peace, and the Unity of Humanity.",
        image: imgBahai,
      },
      {
        id: "sabean-mandaeanism",
        title: "Mandaean Sabians",
        shortIntro: "Living water, purity, and continuity.",
        image: imgSabean,
      },
    ],
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "ئایینەکان",
    pageDescription:
      "لە سەرەتایی مێژووەوە چەندین ئاینی جیاواز لێرەدا سەری هەڵداوە",
    openLabel: "بکەرەوە",
    faiths: [
      {
        id: "islam",
        title: "ئیسلام",
        shortIntro: "باوەڕ، پەرستن و نەریتە زیندووەکان",
        image: imgIslam,
      },
      {
        id: "christianity",
        title: "مەسیحییەت",
        shortIntro: "ڕەگی دێرین، باوەڕی چەسپاو و کۆمەڵگەی یەکگرتوو",
        image: imgChristianity,
      },
      {
        id: "yazidism",
        title: "ئێزیدیاتی",
        shortIntro: "دۆڵە پیرۆزەکە، یادەوەری و خۆڕاگری",
        image: imgYazidism,
      },
      {
        id: "yarsanism",
        title: "یارسانی (کاکەیی)",
        shortIntro: "ڕاستی ناخ، باوەڕداری و کۆمەڵگە",
        image: imgYarsanism,
      },
      {
        id: "zoroastrianism",
        title: "زەردەشتی",
        shortIntro: "ڕووناکی، ڕاستی و دانایی",
        image: imgZoroastrianism,
      },
      {
        id: "judaism",
        title: "جوو",
        shortIntro: "یادەوەری، میرات و بەردەوامی",
        image: imgJudaism,
      },
      {
        id: "bahai",
        title: "ئایینی بەهایی",
        shortIntro: "تەبایی، ئاشتی و یەکبوون لە مرۆڤایەتیدا.",
        image: imgBahai,
      },
      {
        id: "sabean-mandaeanism",
        title: "سابیئەی مەندائی",
        shortIntro: "ئاوی زیندوو، پاکوخاوێنی و بەردەوامی",
        image: imgSabean,
      },
    ],
  },
  ar: {
    back: "العودة",
    pageTitle: "الأديان",
    pageDescription:
      "أديان متعددة ازدهرت هنا منذ فجر التاريخ.",
    openLabel: "اعرض",
    faiths: [
      {
        id: "islam",
        title: "الإسلام",
        shortIntro: "الإيمان والعبادة والتقاليد الحية",
        image: imgIslam,
      },
      {
        id: "christianity",
        title: "المسيحية",
        shortIntro: "جذور عريقة وإيمان راسخ ومجتمع متماسك",
        image: imgChristianity,
      },
      {
        id: "yazidism",
        title: "الإيزيدية",
        shortIntro: "الوادي المقدس والذاكرة والصمود",
        image: imgYazidism,
      },
      {
        id: "yarsanism",
        title: "اليارسانية (الكاكائية)",
        shortIntro: "الحقيقة الداخلية والتقوى والمجتمع",
        image: imgYarsanism,
      },
      {
        id: "zoroastrianism",
        title: "الزرادشتية",
        shortIntro: "النور والحقيقة والحكمة العريقة",
        image: imgZoroastrianism,
      },
      {
        id: "judaism",
        title: "اليهودية",
        shortIntro: "الذاكرة والتراث والاستمرارية",
        image: imgJudaism,
      },
      {
        id: "bahai",
        title: "الديانة البهائية",
        shortIntro: "الوحدة والسلام وإنسانية واحدة",
        image: imgBahai,
      },
      {
        id: "sabean-mandaeanism",
        title: "الصابئة المندائيون",
        shortIntro: "الماء الحي والطهارة والاستمرارية",
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
  const { runExit, resetExit } = useSectionExit(sectionRef);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  // Fade the grid out before opening a faith so the card change stays smooth.
  const openFaith = (id: FaithId) => runExit(() => setActiveId(id));

  React.useLayoutEffect(() => {
    if (!sectionRef.current || activeId) return;

    resetExit();

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
        duration: 2,
      }).to(
        animElements,
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.8,
          stagger: 0.16,
        },
        "-=1.2",
      ).to(
        cards,
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.16,
          duration: 1.8,
        },
        "-=1.15"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang, activeId, resetExit]);

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
    <ReligionsScaledPage dir={dir} lang={lang} fitDeps={[lang]} sectionRef={sectionRef} className="px-12 pb-14">
      <video
        data-f-hero="true"
        src={faithsVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="pointer-events-none absolute inset-x-0 top-0 h-[900px] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[900px] bg-gradient-to-b from-[#faf8f5]/72 via-[#faf8f5]/30 to-[#faf8f5]/95" />

      <button
        type="button"
        onClick={onBack}
        className={`absolute top-1/2 z-30 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border border-stone-200 bg-white/80 text-stone-800 shadow-sm transition ${religionsOverlayStartClassName(dir)}`}
        aria-label={c.back}
      >
        <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
      </button>

      <button
        type="button"
        onClick={onLanguageChange}
        className={`absolute top-8 z-30 flex items-center gap-3 rounded-full border border-stone-200 bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-stone-800 shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition ${religionsOverlayEndClassName(dir)}`}
      >
        <Globe2 className="h-5 w-5" />
        {languageLabel}
      </button>

      <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col">
        <header
          data-f-animate="true"
          className="mx-auto max-w-[850px] pt-32 text-center"
        >
          <div className="mx-auto mb-3 mt-3 w-[260px]">
            <DecorativeLine color="#c3923a" />
          </div>
          <h1 className="break-words font-serif text-[84px] font-semibold uppercase leading-[1.04] tracking-[0.04em] text-[#F5EDD6]">
            {c.pageTitle}
          </h1>
          <div className="mx-auto mt-5 w-[180px]">
            <DecorativeLine color="#c3923a" />
          </div>
          <p className="mx-auto mt-5 max-w-[620px] text-[20px] font-semibold leading-relaxed text-[#F5EDD6]">
            {c.pageDescription}
          </p>
        </header>

        <div className="mx-auto mt-[480px] grid w-full max-w-[1180px] grid-cols-4 gap-7">
          {c.faiths.map((faith, index) => (
            <div key={faith.id} data-f-card="true" className="w-full">
              <ReligionInfoCard
                title={faith.title}
                body={faith.shortIntro}
                image={faith.image}
                accentIndex={index}
                onClick={() => openFaith(faith.id)}
                ariaLabel={faith.title}
                titleClassName="uppercase"
                className="min-h-[520px]"
                imageHeightClass="h-[320px]"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-[#faf8f5]/20 to-transparent" />
    </ReligionsScaledPage>
  );
}