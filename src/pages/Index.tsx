import { useCallback, useEffect, useState } from "react";
import HeroCharacter from "@/components/HeroCharacter";
import officeBg from "@/assets/office-bg.jpg";

type LangCode = "ku" | "en" | "ar";

type Story = { title: string; description: string };

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

const LANG_PROMPT: Record<LangCode | "default", string> = {
  default: "Select a language",
  en: "Select a language",
  ku: "زمانێک هەڵبژێرە",
  ar: "اختر لغة",
};

const Index = () => {
  const [index, setIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [lang, setLang] = useState<LangCode | null>(null);
  const [showLangPrompt, setShowLangPrompt] = useState(false);

  const advance = useCallback(() => {
    if (showLangPrompt) return;
    setInteracted(true);
    // After the very first interaction (one text change), show language prompt
    if (lang === null && index === 0) {
      setIndex(1);
      setShowLangPrompt(true);
      return;
    }
    setIndex((i) => (i + 1) % STORIES.en.length);
  }, [index, lang, showLangPrompt]);

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
    if (showLangPrompt) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      advance();
    }
  };

  const activeLang: LangCode = lang ?? "en";
  const dir = LANG_OPTIONS.find((l) => l.code === activeLang)?.dir ?? "ltr";
  const current = STORIES[activeLang][index];

  const handleSelectLang = (code: LangCode) => {
    setLang(code);
    setShowLangPrompt(false);
  };

  return (
    <main
      role="button"
      tabIndex={0}
      aria-label="Tap to explore the next historical context"
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
        className="pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover blur-sm"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--hero-overlay) / 0.55), hsl(var(--hero-overlay) / 0.75))",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 text-center">
        <HeroCharacter className="mb-8 h-40 w-auto md:mb-12 md:h-56" />

        <div key={`${activeLang}-${index}`} className="animate-fade-in">
          <h1
            className="text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl"
            style={{ color: "hsl(var(--hero-foreground))" }}
          >
            {current.title}
          </h1>
          <p
            className="mt-5 text-base font-light tracking-wide md:mt-7 md:text-lg"
            style={{ color: "hsl(var(--hero-muted))" }}
          >
            {current.description}
          </p>
        </div>
      </div>

      {/* Hint */}
      <div
        className={`pointer-events-none absolute bottom-8 left-0 right-0 z-10 text-center text-xs uppercase tracking-[0.3em] transition-opacity duration-500 md:text-sm ${
          interacted || showLangPrompt ? "opacity-0" : "opacity-70"
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
          className="absolute inset-0 z-20 flex animate-fade-in items-center justify-center px-6"
          style={{ backgroundColor: "hsl(var(--hero-overlay) / 0.78)" }}
        >
          <div className="flex w-full max-w-md flex-col items-center text-center">
            <p
              className="mb-8 text-xs uppercase tracking-[0.4em] md:text-sm"
              style={{ color: "hsl(var(--hero-accent))" }}
            >
              {LANG_PROMPT.default}
            </p>
            <h2
              className="mb-10 text-3xl font-bold leading-tight md:text-4xl"
              style={{ color: "hsl(var(--hero-foreground))" }}
            >
              {LANG_PROMPT.ku} · {LANG_PROMPT.en} · {LANG_PROMPT.ar}
            </h2>

            <div className="flex w-full flex-col gap-3">
              {LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectLang(opt.code);
                  }}
                  dir={opt.dir}
                  className="group flex w-full items-center justify-between rounded-md border px-5 py-4 text-left transition-colors duration-300 hover:bg-[hsl(var(--hero-foreground)/0.08)] focus:outline-none focus-visible:ring-2"
                  style={{
                    borderColor: "hsl(var(--hero-foreground) / 0.25)",
                    color: "hsl(var(--hero-foreground))",
                  }}
                >
                  <span className="text-lg font-medium md:text-xl">{opt.native}</span>
                  <span
                    className="text-xs uppercase tracking-[0.25em]"
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
