import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  CheckCircle2,
  Flame,
  Globe2,
  Handshake,
  Heart,
  MoonStar,
  Mountain,
  Scale,
  UsersRound,
} from "lucide-react";

import bg from "@/assets/images/religions/r-2.webp";
import bg2 from "@/assets/images/religions/r-3.webp";

type LangCode = "en" | "ku" | "ar";

type IntroCard = {
  id: string;
  title: string;
  body: string;
  icon: typeof Mountain;
  accent: string;
};

type IntroGroup = {
  id: string;
  title: string;
  subtitle: string;
  cards: IntroCard[];
  tagline: string;
};

type IntroductionContent = {
  back: string;
  pageTitle: string;
  pageDescription: string;
  groups: [IntroGroup, IntroGroup];
};

const content: Record<LangCode, IntroductionContent> = {
  en: {
    back: "Back",
    pageTitle: "Introduction",
    pageDescription:
      "A land where many faiths, languages, and peoples have shared one home — and a definition of what truly binds them together.",
    groups: [
      {
        id: "cradle",
        title: "Kurdistan",
        subtitle: "The Cradle of Coexistence",
        cards: [
          {
            id: "religions",
            title: "Religions",
            body: "Multiple faiths have flourished here since ancient times.",
            icon: MoonStar,
            accent: "#7a4a12",
          },
          {
            id: "nationalities",
            title: "Nationalities",
            body: "Kurds, Assyrians, Armenians, Turkmen, and more.",
            icon: UsersRound,
            accent: "#a05a18",
          },
          {
            id: "laws",
            title: "Laws",
            body: "Legal frameworks protect every community.",
            icon: Scale,
            accent: "#b9822d",
          },
          {
            id: "coexistence",
            title: "Coexistence",
            body: "A living identity, not only history.",
            icon: Heart,
            accent: "#c58b16",
          },
        ],
        tagline:
          "Different faiths. Different languages. One shared homeland.",
      },
      {
        id: "what-is-coexistence",
        title: "Coexistence",
        subtitle: "A definition rooted in humanity",
        cards: [
          {
            id: "acceptance",
            title: "Acceptance",
            body: "Recognizing the right of others to believe and worship freely.",
            icon: CheckCircle2,
            accent: "#7a4a12",
          },
          {
            id: "respect",
            title: "Respect",
            body: "Treating difference as strength, not division.",
            icon: Handshake,
            accent: "#a05a18",
          },
          {
            id: "humanity",
            title: "Humanity",
            body: "Relationships built on shared human values.",
            icon: UsersRound,
            accent: "#b9822d",
          },
          {
            id: "living-identity",
            title: "Living Identity",
            body: "Practiced every day, not only remembered.",
            icon: Flame,
            accent: "#c58b16",
          },
        ],
        tagline:
          "Coexistence is not tolerance of others. It is the celebration of them.",
      },
    ],
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "پێشەکی",
    pageDescription:
      "خاکێک کە چەندین ئاین و زمان و گەل ماڵێکیان هاوبەش بووە — و پێناسەی ئەو شتەی بە ڕاستی بەستوویانەتەوە.",
    groups: [
      {
        id: "cradle",
        title: "کوردستان",
        subtitle: "بنکەی هاوبژیویەتی",
        cards: [
          {
            id: "religions",
            title: "ئاینەکان",
            body: "چەندین ئاین لێرە لە سەردەمی کۆنەوە گەشەی کردووە.",
            icon: MoonStar,
            accent: "#7a4a12",
          },
          {
            id: "nationalities",
            title: "نەتەوەکان",
            body: "کورد، ئاشووری، ئەرمەن، تورکمان، و زۆرتر.",
            icon: UsersRound,
            accent: "#a05a18",
          },
          {
            id: "laws",
            title: "یاساکان",
            body: "چوارچێوەی یاسایی هەموو کۆمەڵگەیەک دەپارێزێت.",
            icon: Scale,
            accent: "#b9822d",
          },
          {
            id: "coexistence",
            title: "هاوبژیویەتی",
            body: "ناسنامەیەکی زیندوو، نەک تەنها مێژوو.",
            icon: Heart,
            accent: "#c58b16",
          },
        ],
        tagline:
          "ئاینی جیاواز. زمانی جیاواز. یەک نیشتمانی هاوبەش.",
      },
      {
        id: "what-is-coexistence",
        title: "هاوبژیویەتی",
        subtitle: "پێناسەیەک کە ڕەگی لە مرۆڤایەتیە",
        cards: [
          {
            id: "acceptance",
            title: "پەسەندکردن",
            body: "ناسینەوەی مافی ئەوانی تر بۆ ئەوەی بە ئازادی باوەڕ و پەرستن بکەن.",
            icon: CheckCircle2,
            accent: "#7a4a12",
          },
          {
            id: "respect",
            title: "ڕێز",
            body: "هەڵسوکەوت کردن لەگەڵ جیاوازی وەک هێز، نەک دابڕان.",
            icon: Handshake,
            accent: "#a05a18",
          },
          {
            id: "humanity",
            title: "مرۆڤایەتی",
            body: "پەیوەندی لەسەر بنەمای بەهاوی مرۆڤی هاوبەش.",
            icon: UsersRound,
            accent: "#b9822d",
          },
          {
            id: "living-identity",
            title: "ناسنامەی زیندوو",
            body: "هەموو ڕۆژێک پیادە دەکرێت، نەک تەنها بیر دەکرێتەوە.",
            icon: Flame,
            accent: "#c58b16",
          },
        ],
        tagline:
          "هاوبژیویەتی بەرگەگرتنی ئەوانی تر نییە. ئاهەنگگێرانە بۆیان.",
      },
    ],
  },
  ar: {
    back: "العودة",
    pageTitle: "مقدمة",
    pageDescription:
      "أرضٌ تقاسمت فيها ديانات ولغات وشعوب وطناً واحداً — وتعريفٌ لما يجمعها حقاً.",
    groups: [
      {
        id: "cradle",
        title: "كوردستان",
        subtitle: "مهد التعايش",
        cards: [
          {
            id: "religions",
            title: "الأديان",
            body: "ازدهرت هنا ديانات متعددة منذ العصور القديمة.",
            icon: MoonStar,
            accent: "#7a4a12",
          },
          {
            id: "nationalities",
            title: "القوميات",
            body: "الكورد، الآشوريون، الأرمن، التركمان، وغيرهم.",
            icon: UsersRound,
            accent: "#a05a18",
          },
          {
            id: "laws",
            title: "القوانين",
            body: "الأطر القانونية تحمي كل مجتمع.",
            icon: Scale,
            accent: "#b9822d",
          },
          {
            id: "coexistence",
            title: "التعايش",
            body: "هوية حيّة، لا مجرد تاريخ.",
            icon: Heart,
            accent: "#c58b16",
          },
        ],
        tagline: "ديانات مختلفة. لغات مختلفة. وطن واحد مشترك.",
      },
      {
        id: "what-is-coexistence",
        title: "التعايش",
        subtitle: "تعريف متجذر في الإنسانية",
        cards: [
          {
            id: "acceptance",
            title: "القبول",
            body: "الاعتراف بحق الآخرين في الاعتقاد والعبادة بحرية.",
            icon: CheckCircle2,
            accent: "#7a4a12",
          },
          {
            id: "respect",
            title: "الاحترام",
            body: "التعامل مع الاختلاف بوصفه قوّة لا انقساماً.",
            icon: Handshake,
            accent: "#a05a18",
          },
          {
            id: "humanity",
            title: "الإنسانية",
            body: "علاقات تُبنى على قيم إنسانية مشتركة.",
            icon: UsersRound,
            accent: "#b9822d",
          },
          {
            id: "living-identity",
            title: "هوية حيّة",
            body: "تُمارَس كل يوم، لا تُستذكَر فقط.",
            icon: Flame,
            accent: "#c58b16",
          },
        ],
        tagline:
          "التعايش ليس تحمّلاً للآخرين. إنه احتفاءٌ بهم.",
      },
    ],
  },
};

function DecorativeLine({ color = "#c99a55" }: { color?: string }) {
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

type IntroductionPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function IntroductionPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: IntroductionPageProps = {}) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  // Staggered Page Entrance Animation via useLayoutEffect
  React.useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      const hero = "[data-intro-hero='true']";
      const animElements = "[data-intro-animate='true']";
      const cards = "[data-intro-card='true']";

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
  }, [lang]);

  return (
    <main
      dir={dir}
      className="m-0 flex min-h-screen w-screen justify-center bg-[#faf8f5] p-0 text-stone-800"
    >
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-[#faf8f5] px-6 pb-20 pt-10 sm:px-12 lg:px-20"
      >
        {/* Original Background Image / Grading structure kept intact */}
        <img
          data-intro-hero="true"
          src={bg}
          alt=""
          className="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#faf8f5]/72 via-[#faf8f5]/30 to-[#faf8f5]/95" />

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border border-stone-200 bg-white/85 text-stone-800 shadow-sm transition hover:bg-stone-50"
            aria-label={c.back}
          >
            <ArrowLeft className="h-7 w-7" />
          </button>
        )}

        {onLanguageChange && (
          <button
            type="button"
            onClick={onLanguageChange}
            className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-stone-200 bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-stone-800 shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition hover:bg-stone-50"
          >
            <Globe2 className="h-5 w-5" />
            {languageLabel}
          </button>
        )}

        <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col">
          <header
            data-intro-animate="true"
            className="mx-auto max-w-[850px] pt-28 text-center sm:pt-32"
          >
            <div className="mx-auto mb-3 w-[260px]">
              <DecorativeLine color="#c3923a" />
            </div>
            <h1 className="font-serif text-[56px] font-semibold uppercase leading-[1.04] tracking-[0.04em] text-stone-900 sm:text-[76px] lg:text-[88px]">
              {c.pageTitle}
            </h1>
            <div className="mx-auto mt-5 w-[180px]">
              <DecorativeLine color="#c3923a" />
            </div>
            <p className="mx-auto mt-5 max-w-[660px] text-[19px] font-semibold leading-relaxed text-stone-600 sm:text-[22px]">
              {c.pageDescription}
            </p>
          </header>

          {c.groups.map((group) => (
            <section
              key={group.id}
              data-intro-animate="true"
              className="mt-24 first:mt-20"
              aria-labelledby={`intro-group-${group.id}`}
            >
              <div className="mx-auto max-w-[860px] text-center">
                <h2
                  id={`intro-group-${group.id}`}
                  className="font-serif text-[36px] font-semibold uppercase leading-tight tracking-[0.04em] text-stone-900 sm:text-[48px]"
                >
                  {group.title}
                </h2>
                <div className="mx-auto mt-4 w-[200px]">
                  <DecorativeLine color="#c3923a" />
                </div>
                <p className="mx-auto mt-4 max-w-[640px] font-serif text-[18px] italic text-stone-500 sm:text-[20px]">
                  {group.subtitle}
                </p>
              </div>

              <div className="mx-auto mt-10 grid w-full max-w-[1180px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {group.cards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div 
                      key={card.id} 
                      data-intro-card="true" 
                      className="w-full"
                    >
                      <article className="group bg-[#faf8f5] border border-stone-200/60 p-3 sm:p-4 relative flex w-full flex-col overflow-hidden rounded-[32px] text-left shadow-[0_8px_30px_rgba(28,24,20,0.03)] hover:shadow-[0_16px_40px_rgba(214,164,91,0.06)] hover:border-[#d6a45b]/30 transition-all duration-500">
                        {/* Framed Banner Area */}
                        <div 
                          className="relative h-[110px] w-full overflow-hidden rounded-xl bg-stone-100"
                          style={{
                            background: `linear-gradient(135deg, ${card.accent} 0%, ${card.accent}cc 100%)`,
                          }}
                        >
                          {/* Mixed Overlay Background Pattern */}
                          <div
                            className="pointer-events-none absolute inset-0 opacity-[0.14]"
                            style={{
                              backgroundImage: `url(${bg2})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              mixBlendMode: "overlay",
                            }}
                          />
                          {/* Floating Icon Container */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm">
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          {/* Inner shadow for recess visual depth */}
                          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_15px_rgba(0,0,0,0.05)]" />
                        </div>

                        {/* Content Area */}
                        <div className="flex flex-1 flex-col pt-3 sm:pt-4">
                          <h3 className="font-serif text-[18px] sm:text-[1.1rem] leading-tight text-stone-900 transition duration-300 group-hover:text-[#d6a45b]">
                            {card.title}
                          </h3>
                          <div className="mt-2.5 mb-2.5 w-[45px]">
                            <span
                              className="block h-[1.5px] transition-all duration-300 group-hover:w-[65px]"
                              style={{ backgroundColor: card.accent }}
                            />
                          </div>
                          <p className="text-[13px] leading-relaxed text-stone-600 font-medium">
                            {card.body}
                          </p>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>

              {/* Tagline Container updated to match off-white card design */}
              <div className="mx-auto mt-10 max-w-[860px] rounded-[24px] border border-stone-200 bg-white px-7 py-5 text-center shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                <p className="font-serif text-[17px] font-semibold italic leading-snug text-stone-600 sm:text-[19px]">
                  {group.tagline}
                </p>
              </div>
            </section>
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-[#faf8f5]/20 to-transparent" />
      </section>
    </main>
  );
}