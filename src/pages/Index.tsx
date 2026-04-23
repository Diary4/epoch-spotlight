import { useCallback, useEffect, useState } from "react";
import HeroCharacter from "@/components/HeroCharacter";
import officeBg from "@/assets/office.jpeg";
import peshmargaBg from "@/assets/images/peshmarga.jpg";
import bg2 from "@/assets/images/bg-2.jpg";
import bg3 from "@/assets/images/bg-3.jpg";

type LangCode = "ku" | "en" | "ar";

type Story = { title: string; description: string };
type SectionCard = { title: string; description: string; icon: string };
type JourneyItem = { id: string; title: string; description: string; image: string; icon: string };

const STORIES: Record<LangCode, Story[]> = {
  en: [
    { title: "The Great Kurdistan", description: "An ancient land of mountains, poets, and resilience." },
    { title: "The Silk Road", description: "Where empires, ideas, and caravans crossed continents." },
    { title: "Mesopotamia", description: "The cradle of civilization between two rivers." },
    { title: "The Ottoman Era", description: "Six centuries that reshaped three continents." },
    { title: "The Persian Empire", description: "From Cyrus to Darius — an empire of tolerance and reach." },
  ],
  ku: [
    { title: "کوردستانی مەزن", description: "خاکێکی کۆنی چیا و شاعیران و بەرگری." },
    { title: "ڕێگای ئاوریشم", description: "شوێنی تێپەڕینی ئیمپراتۆریەکان، بیر و کاروانەکان لە کیشوەرەکاندا." },
    { title: "میزۆپۆتامیا", description: "گاهوارەی شارستانیەت لە نێوان دوو ڕووباردا." },
    { title: "سەردەمی عوسمانی", description: "شەش سەدە کە سێ کیشوەری گۆڕی." },
    { title: "ئیمپراتۆریەتی فارس", description: "لە کۆرشەوە بۆ داریوش — ئیمپراتۆریەتێکی لێبووردەیی و فراوان." },
  ],
  ar: [
    { title: "كردستان العظمى", description: "أرض عريقة من الجبال والشعراء والصمود." },
    { title: "طريق الحرير", description: "حيث تعبر الإمبراطوريات والأفكار والقوافل القارات." },
    { title: "بلاد ما بين النهرين", description: "مهد الحضارة بين نهرين." },
    { title: "العصر العثماني", description: "ستة قرون أعادت تشكيل ثلاث قارات." },
    { title: "الإمبراطورية الفارسية", description: "من كورش إلى داريوش — إمبراطورية التسامح والامتداد." },
  ],
};

const LANG_OPTIONS: { code: LangCode; label: string; native: string; dir: "ltr" | "rtl" }[] = [
  { code: "ku", label: "Kurdish", native: "کوردی", dir: "rtl" },
  { code: "en", label: "English", native: "English", dir: "ltr" },
  { code: "ar", label: "Arabic", native: "العربية", dir: "rtl" },
];

const HINTS: Record<LangCode, string> = {
  en: "Tap anywhere to explore",
  ku: "بۆ گەڕان دەستبدە بە هەر شوێنێک",
  ar: "انقر في أي مكان للاستكشاف",
};

const INTRO_SPEAKING_TEXT: Story = {
  title: "The character is speaking...",
  description: "Please wait, language selection will appear after the intro.",
};

const INTRO_DURATION_MS = 3500;

const MENU_UI: Record<
  LangCode,
  {
    previous: string;
    returnToMain: string;
    next: string;
  }
> = {
  en: { previous: "Previous", returnToMain: "Return to Main Menu", next: "Next" },
  ku: { previous: "پێشوو", returnToMain: "گەڕانەوە بۆ مێنیوی سەرەکی", next: "دواتر" },
  ar: { previous: "السابق", returnToMain: "العودة إلى القائمة الرئيسية", next: "التالي" },
};

const JOURNEY_CONTENT: Record<
  LangCode,
  {
    title: string;
    subtitle: string;
    items: JourneyItem[];
  }
> = {
  en: {
    title: "The Journey",
    subtitle: "Explore the key milestones that shaped the Kurdistan Region from 1991 until today.",
    items: [
      {
        id: "1991",
        title: "1991",
        description: "A historic turning point that opened the path to a new reality.",
        image: peshmargaBg,
        icon: "★",
      },
      {
        id: "1992",
        title: "1992",
        description: "The first parliament and government marked the beginning of self-rule.",
        image: bg2,
        icon: "🏛",
      },
      {
        id: "institutions",
        title: "Building Institutions",
        description: "Public institutions gradually formed the structure of modern governance.",
        image: bg3,
        icon: "👥",
      },
      {
        id: "2005",
        title: "2005",
        description: "Federal recognition gave constitutional status to the Kurdistan Region.",
        image: bg2,
        icon: "📜",
      },
      {
        id: "today",
        title: "Today",
        description: "Kurdistan continues to grow through institutions, development, and vision.",
        image: bg3,
        icon: "☀",
      },
    ],
  },
  ku: {
    title: "گەشت",
    subtitle: "گرنگترین وێستگەکان بگەڕێ کە لە ساڵی ١٩٩١ تا ئێستا هەرێمی کوردستانیان شێوە دا.",
    items: [
      {
        id: "1991",
        title: "١٩٩١",
        description: "خاڵێکی مێژوویی گرنگ کە ڕێگای قۆناغێکی نوێی کردەوە.",
        image: peshmargaBg,
        icon: "★",
      },
      {
        id: "1992",
        title: "١٩٩٢",
        description: "یەکەم پەرلەمان و حکومەت دەستپێکی خۆبەڕێوەبردنیان نیشاندا.",
        image: bg2,
        icon: "🏛",
      },
      {
        id: "institutions",
        title: "بنیاتنانی دامەزراوەکان",
        description: "دامەزراوە گشتییەکان هەنگاو بە هەنگاو شێوەی حکومڕانی نوێیان درووست کرد.",
        image: bg3,
        icon: "👥",
      },
      {
        id: "2005",
        title: "٢٠٠٥",
        description: "ناساندنی فیدراڵی باری یاسایی دەستووری بە هەرێمەکە دا.",
        image: bg2,
        icon: "📜",
      },
      {
        id: "today",
        title: "ئێستا",
        description: "کوردستان بەردەوامە لە پێشکەوتن بە هۆی دامەزراوە و گەشەپێدان و بینین.",
        image: bg3,
        icon: "☀",
      },
    ],
  },
  ar: {
    title: "الرحلة",
    subtitle: "استكشف المحطات الأساسية التي شكّلت إقليم كوردستان من عام 1991 حتى اليوم.",
    items: [
      {
        id: "1991",
        title: "1991",
        description: "نقطة تحول تاريخية فتحت الطريق نحو واقع جديد.",
        image: peshmargaBg,
        icon: "★",
      },
      {
        id: "1992",
        title: "1992",
        description: "أول برلمان وحكومة شكّلا بداية الحكم الذاتي.",
        image: bg2,
        icon: "🏛",
      },
      {
        id: "institutions",
        title: "بناء المؤسسات",
        description: "تكوّنت المؤسسات العامة تدريجياً لتشكّل بنية الحكم الحديث.",
        image: bg3,
        icon: "👥",
      },
      {
        id: "2005",
        title: "2005",
        description: "منح الاعتراف الاتحادي الإقليمَ مكانةً دستورية.",
        image: bg2,
        icon: "📜",
      },
      {
        id: "today",
        title: "اليوم",
        description: "يواصل كوردستان النمو عبر المؤسسات والتنمية والرؤية.",
        image: bg3,
        icon: "☀",
      },
    ],
  },
};

const SECTION_MENU: Record<
  LangCode,
  {
    title: string;
    subtitle: string;
    cards: SectionCard[];
  }
> = {
  en: {
    title: "Explore the Gate of Kurdistan",
    subtitle: "Choose a chapter to continue your journey.",
    cards: [
      {
        title: "The People",
        description: "Who the Kurds are, their identity, values, and resilience.",
        icon: "👥",
      },
      {
        title: "The Journey",
        description: "Major milestones that shaped the Kurdistan Region.",
        icon: "✨",
      },
      {
        title: "The System",
        description: "How institutions and leadership roles are organized.",
        icon: "🏛️",
      },
      {
        title: "The Land and Future",
        description: "Geography, symbols, progress, and future vision.",
        icon: "⛰️",
      },
    ],
  },
  ku: {
    title: "دەروازەی کوردستان بگەڕێ",
    subtitle: "بەشێک هەڵبژێرە بۆ بەردەوامبوون لە گەشتەکەت.",
    cards: [
      {
        title: "خەڵک",
        description: "کێن کوردەکان، ناسنامە، بەها و بەرگرییان.",
        icon: "👥",
      },
      {
        title: "گەشت",
        description: "گرنگترین وێستگە مێژووییەکانی هەرێم.",
        icon: "✨",
      },
      {
        title: "سیستەم",
        description: "ڕێکخستنی دامەزراوەکان و ڕۆڵەکانی سەرکردایەتی.",
        icon: "🏛️",
      },
      {
        title: "خاک و داهاتوو",
        description: "جوگرافیا، نیشانەکان، پێشکەوتن و بینینی داهاتوو.",
        icon: "⛰️",
      },
    ],
  },
  ar: {
    title: "اكتشف بوابة كوردستان",
    subtitle: "اختر فصلاً لمتابعة الرحلة.",
    cards: [
      {
        title: "الشعب",
        description: "من هم الكرد وقيمهم وهويتهم وصمودهم.",
        icon: "👥",
      },
      {
        title: "الرحلة",
        description: "أهم المحطات التي شكلت إقليم كوردستان.",
        icon: "✨",
      },
      {
        title: "النظام",
        description: "كيف تُنظم المؤسسات وأدوار القيادة.",
        icon: "🏛️",
      },
      {
        title: "الأرض والمستقبل",
        description: "الجغرافيا والرموز والتقدم ورؤية المستقبل.",
        icon: "⛰️",
      },
    ],
  },
};

const Index = () => {
  const [index, setIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [lang, setLang] = useState<LangCode | null>(null);
  const [showLangPrompt, setShowLangPrompt] = useState(false);
  const [langClosing, setLangClosing] = useState(false);
  const [introPlaying, setIntroPlaying] = useState(false);
  const [view, setView] = useState<"hero" | "menu" | "journey">("hero");

  const advance = useCallback(() => {
    if (showLangPrompt || langClosing || introPlaying) return;
    setInteracted(true);
    if (lang === null) {
      // First interaction: keep same screen, change text, then show language prompt.
      setIntroPlaying(true);
      window.setTimeout(() => {
        setIntroPlaying(false);
        setShowLangPrompt(true);
      }, INTRO_DURATION_MS);
      return;
    }
    if (view === "hero") {
      setView("menu");
      return;
    }
    setIndex((i) => (i + 1) % STORIES.en.length);
  }, [lang, showLangPrompt, langClosing, introPlaying, view]);

  useEffect(() => {
    document.title = "The Great Kurdistan — Historical Characters";
    const meta =
      document.querySelector('meta[name="description"]') ??
      (() => {
        const m = document.createElement("meta");
        m.setAttribute("name", "description");
        document.head.appendChild(m);
        return m;
      })();
    meta.setAttribute(
      "content",
      "Explore historical characters and civilizations — from The Great Kurdistan to the Silk Road, Mesopotamia, the Ottoman and Persian Empires.",
    );
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (showLangPrompt || langClosing || introPlaying) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      advance();
    }
  };

  const activeLang: LangCode = lang ?? "en";
  const dir = LANG_OPTIONS.find((l) => l.code === activeLang)?.dir ?? "ltr";
  const current = STORIES[activeLang][index];
  const visibleStory = introPlaying ? INTRO_SPEAKING_TEXT : current;
  const menu = SECTION_MENU[activeLang];
  const menuUi = MENU_UI[activeLang];
  const journey = JOURNEY_CONTENT[activeLang];

  const handleSelectLang = (code: LangCode) => {
    setLang(code);
    setLangClosing(true);
    // Move content first so the overlay fades over section menu.
    setView("menu");
    window.setTimeout(() => {
      setShowLangPrompt(false);
      setLangClosing(false);
    }, 400);
  };

  return (
    <main
      role="button"
      tabIndex={0}
      aria-label="Tap to explore the next section"
      onClick={advance}
      onKeyDown={onKeyDown}
      dir={dir}
      className="relative flex min-h-screen w-full cursor-pointer select-none items-center justify-center overflow-hidden outline-none"
      style={{ backgroundColor: "hsl(var(--hero-background))" }}
    >
      <img
        src={officeBg}
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover blur-sm transition-opacity duration-700 ${
          view === "hero" ? "opacity-100" : "opacity-0"
        }`}
      />
      <img
        src={peshmargaBg}
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover blur-[1px] transition-opacity duration-700 ${
          view === "hero" ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--hero-overlay) / 0.55), hsl(var(--hero-overlay) / 0.75))",
        }}
      />

      {/* HERO VIEW */}
      {view === "hero" && (
        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 text-center animate-fade-in">
          <HeroCharacter className="mb-8 h-40 w-auto md:mb-12 md:h-56" />

          <div
            key={`${activeLang}-${index}-${introPlaying ? "intro" : "story"}`}
            className="animate-fade-in transition-all duration-700 ease-out"
          >
            <h1
              className="text-4xl font-bold leading-tight tracking-tight transition-all duration-700 ease-out md:text-6xl lg:text-7xl"
              style={{ color: "hsl(var(--hero-foreground))" }}
            >
              {visibleStory.title}
            </h1>
            <p
              className="mt-5 text-base font-light tracking-wide transition-all duration-700 ease-out md:mt-7 md:text-lg"
              style={{ color: "hsl(var(--hero-muted))" }}
            >
              {visibleStory.description}
            </p>
          </div>
        </div>
      )}

      {/* SECTION MENU VIEW */}
      {view === "menu" && (
        <div
          className="relative z-10 mx-auto w-full max-w-5xl animate-fade-in px-6 py-8 md:py-10"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="mb-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-8 rounded-md border"
                  style={{
                    borderColor: "hsl(var(--hero-accent) / 0.7)",
                    backgroundColor: "hsl(var(--hero-foreground) / 0.08)",
                  }}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "hsl(var(--hero-muted))" }}>
                    Gate of Kurdistan
                  </p>
                  <p className="text-xs font-medium" style={{ color: "hsl(var(--hero-foreground))" }}>
                    GOK
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm">
                {LANG_OPTIONS.map((opt, idx) => (
                  <div key={opt.code} className="flex items-center gap-3">
                    <span
                      style={{
                        color:
                          opt.code === activeLang
                            ? "hsl(var(--hero-accent))"
                            : "hsl(var(--hero-foreground) / 0.7)",
                      }}
                    >
                      {opt.label}
                    </span>
                    {idx < LANG_OPTIONS.length - 1 && (
                      <span style={{ color: "hsl(var(--hero-foreground) / 0.35)" }}>|</span>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="ml-2 flex h-8 w-8 items-center justify-center rounded-full border text-sm"
                  style={{ borderColor: "hsl(var(--hero-accent) / 0.4)", color: "hsl(var(--hero-foreground))" }}
                  onClick={() => setView("hero")}
                >
                  ⌂
                </button>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full border text-sm"
                  style={{ borderColor: "hsl(var(--hero-accent) / 0.4)", color: "hsl(var(--hero-foreground))" }}
                >
                  ←
                </button>
              </div>
            </div>

            <div className="text-center">
            <p
              className="mb-3 text-xs uppercase tracking-[0.4em] md:text-sm"
              style={{ color: "hsl(var(--hero-accent))" }}
            >
              {menu.title}
            </p>
            <h2
              className="text-xl font-medium leading-tight md:text-2xl"
              style={{ color: "hsl(var(--hero-foreground))" }}
            >
              {menu.subtitle}
            </h2>
            </div>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            {menu.cards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border p-5 transition-colors duration-300 hover:bg-[hsl(var(--hero-foreground)/0.08)] md:p-6"
                style={{
                  borderColor: "hsl(var(--hero-accent) / 0.35)",
                  backgroundColor: "hsl(var(--hero-foreground) / 0.04)",
                }}
              >
                <div
                  className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border text-lg"
                  style={{
                    borderColor: "hsl(var(--hero-accent) / 0.5)",
                    color: "hsl(var(--hero-accent))",
                  }}
                >
                  <span aria-hidden="true">{card.icon}</span>
                </div>
                <h3
                  className="mb-2 text-xl font-semibold md:text-2xl"
                  style={{ color: "hsl(var(--hero-foreground))" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm leading-relaxed md:text-base"
                  style={{ color: "hsl(var(--hero-muted))" }}
                >
                  {card.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            <button
              type="button"
              className="rounded-xl border px-4 py-3 text-sm"
              style={{
                borderColor: "hsl(var(--hero-accent) / 0.45)",
                color: "hsl(var(--hero-foreground))",
                backgroundColor: "hsl(var(--hero-foreground) / 0.04)",
              }}
              onClick={() => setView("hero")}
            >
              ← {menuUi.previous}
            </button>
            <button
              type="button"
              className="rounded-xl border px-4 py-3 text-sm"
              style={{
                borderColor: "hsl(var(--hero-accent) / 0.55)",
                color: "hsl(var(--hero-foreground))",
                backgroundColor: "hsl(var(--hero-foreground) / 0.08)",
              }}
              onClick={() => setView("hero")}
            >
              {menuUi.returnToMain}
            </button>
            <button
              type="button"
              className="rounded-xl border px-4 py-3 text-sm"
              style={{
                borderColor: "hsl(var(--hero-accent) / 0.45)",
                color: "hsl(var(--hero-foreground))",
                backgroundColor: "hsl(var(--hero-foreground) / 0.04)",
              }}
              onClick={() => setView("journey")}
            >
              {menuUi.next} →
            </button>
          </div>

          <div className="mt-6 text-center">
            <p
              className="mb-3 text-[10px] uppercase tracking-[0.4em] md:text-xs"
              style={{ color: "hsl(var(--hero-accent))" }}
            >
              Explore the Gate of Kurdistan
            </p>
            <div className="mx-auto grid max-w-xl grid-cols-4 items-center gap-2">
              {menu.cards.map((card, i) => (
                <div key={card.title} className="flex items-center gap-2">
                  <span
                    className={`h-3 w-3 rounded-full border ${i === 1 ? "shadow-[0_0_12px_rgba(255,214,128,0.65)]" : ""}`}
                    style={{
                      borderColor: "hsl(var(--hero-accent) / 0.7)",
                      backgroundColor: i === 1 ? "hsl(var(--hero-accent))" : "transparent",
                    }}
                  />
                  <span
                    className="hidden text-[10px] uppercase tracking-[0.1em] md:inline"
                    style={{ color: i === 1 ? "hsl(var(--hero-accent))" : "hsl(var(--hero-muted))" }}
                  >
                    {card.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* JOURNEY VIEW */}
      {view === "journey" && (
        <div className="relative z-10 mx-auto w-full max-w-5xl animate-fade-in px-6 py-8 md:py-10" onClick={(e) => e.stopPropagation()}>
          <header className="mb-6 text-center">
            <h2 className="text-5xl font-bold leading-tight md:text-6xl" style={{ color: "hsl(var(--hero-foreground))" }}>
              {journey.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm md:text-lg" style={{ color: "hsl(var(--hero-muted))" }}>
              {journey.subtitle}
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-[70px_1fr]">
            <div className="hidden md:flex md:flex-col md:items-center md:gap-4">
              <div className="h-4 w-[2px]" style={{ backgroundColor: "hsl(var(--hero-accent) / 0.4)" }} />
              {journey.items.map((item, i) => (
                <div key={item.id} className="flex flex-col items-center gap-4">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full border text-sm"
                    style={{
                      borderColor: "hsl(var(--hero-accent) / 0.7)",
                      color: "hsl(var(--hero-accent))",
                      backgroundColor: "hsl(var(--hero-background) / 0.55)",
                    }}
                  >
                    {item.icon}
                  </div>
                  {i < journey.items.length - 1 && (
                    <div className="h-10 w-[2px]" style={{ backgroundColor: "hsl(var(--hero-accent) / 0.4)" }} />
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {journey.items.map((item) => (
                <article
                  key={item.id}
                  className="group flex items-center gap-4 rounded-2xl border p-3 transition-colors hover:bg-[hsl(var(--hero-foreground)/0.08)] md:p-4"
                  style={{
                    borderColor: "hsl(var(--hero-accent) / 0.35)",
                    backgroundColor: "hsl(var(--hero-background) / 0.5)",
                  }}
                >
                  <img src={item.image} alt={item.title} className="h-20 w-28 rounded-xl object-cover md:h-24 md:w-36" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-2xl font-bold md:text-4xl" style={{ color: "hsl(var(--hero-foreground))" }}>
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm md:text-base" style={{ color: "hsl(var(--hero-muted))" }}>
                      {item.description}
                    </p>
                  </div>
                  <span className="text-2xl" style={{ color: "hsl(var(--hero-accent))" }}>
                    ›
                  </span>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button
              type="button"
              className="rounded-xl border px-4 py-3 text-sm"
              style={{
                borderColor: "hsl(var(--hero-accent) / 0.45)",
                color: "hsl(var(--hero-foreground))",
                backgroundColor: "hsl(var(--hero-foreground) / 0.04)",
              }}
              onClick={() => setView("menu")}
            >
              ← {menuUi.previous}
            </button>
            <button
              type="button"
              className="rounded-xl border px-4 py-3 text-sm"
              style={{
                borderColor: "hsl(var(--hero-accent) / 0.55)",
                color: "hsl(var(--hero-foreground))",
                backgroundColor: "hsl(var(--hero-foreground) / 0.08)",
              }}
              onClick={() => setView("menu")}
            >
              {menuUi.returnToMain}
            </button>
            <button
              type="button"
              className="rounded-xl border px-4 py-3 text-sm"
              style={{
                borderColor: "hsl(var(--hero-accent) / 0.45)",
                color: "hsl(var(--hero-foreground))",
                backgroundColor: "hsl(var(--hero-foreground) / 0.04)",
              }}
            >
              {menuUi.next} →
            </button>
          </div>
        </div>
      )}

      {/* Hint */}
      <div
        className={`pointer-events-none absolute bottom-8 left-0 right-0 z-10 text-center text-xs uppercase tracking-[0.3em] transition-opacity duration-500 md:text-sm ${
          interacted || showLangPrompt || introPlaying ? "opacity-0" : "opacity-70"
        }`}
        style={{ color: "hsl(var(--hero-muted))" }}
      >
        {HINTS[activeLang]}
      </div>

      {/* Language selection overlay */}
      {showLangPrompt && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Select a language"
          onClick={(e) => e.stopPropagation()}
          className={`absolute inset-0 z-20 flex items-center justify-center px-6 backdrop-blur-md ${
            langClosing ? "animate-fade-out" : "animate-fade-in"
          }`}
          style={{ backgroundColor: "hsl(var(--hero-overlay) / 0.6)" }}
        >
          <div className="flex w-full max-w-3xl flex-col items-center text-center">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              {LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectLang(opt.code);
                  }}
                  dir={opt.dir}
                  className="group flex flex-1 flex-col items-center gap-1 rounded-md border px-6 py-5 transition-colors duration-300 hover:bg-[hsl(var(--hero-foreground)/0.1)] focus:outline-none focus-visible:ring-2"
                  style={{
                    borderColor: "hsl(var(--hero-foreground) / 0.25)",
                    color: "hsl(var(--hero-foreground))",
                  }}
                >
                  <span className="text-xl font-medium md:text-2xl">{opt.native}</span>
                  <span
                    className="text-[10px] uppercase tracking-[0.25em] md:text-xs"
                    style={{ color: "hsl(var(--hero-muted))" }}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Index;
