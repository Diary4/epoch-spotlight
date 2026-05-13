import { useCallback, useEffect, useState } from "react";
import HeroCharacter from "@/components/HeroCharacter";
import secondBg from "@/assets/images/nature.webp";

type LangCode = "ku" | "en" | "ar";
type Story = { title: string; description: string };
type Leader = { name: string; years: string; photo?: string };

const STORIES: Record<LangCode, Story[]> = {
  en: [
    { title: "Commander Arin", description: "A fictional strategist known for building peace after conflict." },
    { title: "The Mountain Pact", description: "An alliance formed to protect villages and trade routes." },
    { title: "The Crystal Archive", description: "A hidden library preserving oral history and science." },
  ],
  ku: [
    { title: "فەرماندە ئارین", description: "سەرکردەیەکی خەیاڵی بە ناسنامەی ئاشتی‌سازی دوای ململاێنێ." },
    { title: "پەیمانی چیا", description: "هاوپەیمانیەک بۆ پاراستنی گوندەکان و ڕێگای بازرگانی." },
    { title: "ئەرشیفی کریستاڵ", description: "کتێبخانەیەکی نهێنی بۆ پاراستنی مێژوو و زانست." },
  ],
  ar: [
    { title: "القائد آرين", description: "قائد خيالي اشتهر ببناء السلام بعد الصراع." },
    { title: "ميثاق الجبال", description: "تحالف تشكل لحماية القرى وطرق التجارة." },
    { title: "أرشيف الكريستال", description: "مكتبة مخفية تحفظ التاريخ الشفهي والعلوم." },
  ],
};

const LANG_OPTIONS: { code: LangCode; label: string; native: string; dir: "ltr" | "rtl" }[] = [
  { code: "ku", label: "Kurdish", native: "کوردی", dir: "rtl" },
  { code: "en", label: "English", native: "English", dir: "ltr" },
  { code: "ar", label: "Arabic", native: "العربية", dir: "rtl" },
];

const HINTS: Record<LangCode, string> = {
  en: "Tap to start this character story",
  ku: "بۆ دەستپێکردنی چیرۆکی ئەم کاراکتەرە دەستبدە",
  ar: "انقر لبدء قصة هذه الشخصية",
};

const INTRO_SPEAKING_TEXT: Story = {
  title: "Arin is speaking...",
  description: "Subtitle and language options will appear after the intro.",
};

const INTRO_DURATION_MS = 3500;

const LEADERSHIP: Record<
  LangCode,
  {
    sectionTitle: string;
    presidents: string;
    primeMinisters: string;
    speakers: string;
    currentPMLabel: string;
    achievementsLabel: string;
    visionLabel: string;
    presidentsList: Leader[];
    pastPMs: Leader[];
    speakersList: Leader[];
    currentPM: {
      name: string;
      years: string;
      photo?: string;
      bio: string;
      achievements: string[];
      vision: string;
    };
  }
> = {
  en: {
    sectionTitle: "Command Council",
    presidents: "Council Heads",
    primeMinisters: "Field Commanders",
    speakers: "Archive Speakers",
    currentPMLabel: "Current Commander",
    achievementsLabel: "Highlights",
    visionLabel: "Mission",
    presidentsList: [
      { name: "Dara Haval", years: "2008 - 2015" },
      { name: "Arin Soran", years: "2016 - Present" },
    ],
    pastPMs: [
      { name: "Nalin Azad", years: "2004 - 2009" },
      { name: "Rayan Zhyar", years: "2010 - 2016" },
      { name: "Avin Rebaz", years: "2017 - 2021" },
    ],
    speakersList: [
      { name: "Kawa Norem", years: "2007 - 2011" },
      { name: "Lana Barin", years: "2012 - 2018" },
      { name: "Tara Helin", years: "2019 - Present" },
    ],
    currentPM: {
      name: "Arin Soran",
      years: "2016 - Present",
      bio: "Fictional second character used as placeholder content for your new screen.",
      achievements: ["Modernized city planning", "Expanded schools and clinics", "Secured trade corridors"],
      vision: "Build a safe, educated, and creative region powered by cooperation.",
    },
  },
  ku: {
    sectionTitle: "ئەنجومەنی فەرماندەیی",
    presidents: "سەرۆکی ئەنجومەن",
    primeMinisters: "فەرماندە مەیدانییەکان",
    speakers: "قەسەکەرانی ئەرشیف",
    currentPMLabel: "فەرماندەی ئێستا",
    achievementsLabel: "گرنگترین خاڵەکان",
    visionLabel: "ئامانج",
    presidentsList: [
      { name: "دارا هاڤاڵ", years: "٢٠٠٨ - ٢٠١٥" },
      { name: "ئارین سۆران", years: "٢٠١٦ - ئێستا" },
    ],
    pastPMs: [
      { name: "نالین ئازاد", years: "٢٠٠٤ - ٢٠٠٩" },
      { name: "ڕایان ژیار", years: "٢٠١٠ - ٢٠١٦" },
      { name: "ئاوین ڕێباز", years: "٢٠١٧ - ٢٠٢١" },
    ],
    speakersList: [
      { name: "کاوا نۆرەم", years: "٢٠٠٧ - ٢٠١١" },
      { name: "لانا بارین", years: "٢٠١٢ - ٢٠١٨" },
      { name: "تارا هەلین", years: "٢٠١٩ - ئێستا" },
    ],
    currentPM: {
      name: "ئارین سۆران",
      years: "٢٠١٦ - ئێستا",
      bio: "ناوەڕۆکی کاتییە بۆ کاراکتەری دووەم تا تۆ دواتر بگۆڕیت.",
      achievements: ["نوێکردنەوەی پلاندانانی شار", "زیادکردنی قوتابخانە و نەخۆشخانە", "پاراستنی ڕێگای بازرگانی"],
      vision: "بنیاتنانی ناوچەیەکی ئارام و فێربوو و داهێنەر.",
    },
  },
  ar: {
    sectionTitle: "مجلس القيادة",
    presidents: "رؤساء المجلس",
    primeMinisters: "قادة الميدان",
    speakers: "متحدثو الأرشيف",
    currentPMLabel: "القائد الحالي",
    achievementsLabel: "أبرز النقاط",
    visionLabel: "المهمة",
    presidentsList: [
      { name: "دارا هافال", years: "٢٠٠٨ - ٢٠١٥" },
      { name: "آرين سوران", years: "٢٠١٦ - الآن" },
    ],
    pastPMs: [
      { name: "نالين آزاد", years: "٢٠٠٤ - ٢٠٠٩" },
      { name: "ريان ژيار", years: "٢٠١٠ - ٢٠١٦" },
      { name: "آفين ريباز", years: "٢٠١٧ - ٢٠٢١" },
    ],
    speakersList: [
      { name: "كاوا نورم", years: "٢٠٠٧ - ٢٠١١" },
      { name: "لانا بارين", years: "٢٠١٢ - ٢٠١٨" },
      { name: "تارا هيلين", years: "٢٠١٩ - الآن" },
    ],
    currentPM: {
      name: "آرين سوران",
      years: "٢٠١٦ - الآن",
      bio: "محتوى عشوائي مؤقت للشخصية الثانية ويمكنك تعديله لاحقاً.",
      achievements: ["تحديث تخطيط المدن", "توسيع المدارس والعيادات", "تأمين مسارات التجارة"],
      vision: "بناء منطقة آمنة ومتعلمة ومبدعة قائمة على التعاون.",
    },
  },
};

const SecondScreen = () => {
  const [index, setIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [lang, setLang] = useState<LangCode | null>(null);
  const [showLangPrompt, setShowLangPrompt] = useState(false);
  const [langClosing, setLangClosing] = useState(false);
  const [introPlaying, setIntroPlaying] = useState(false);
  const [view, setView] = useState<"hero" | "leadership">("hero");

  const advance = useCallback(() => {
    if (showLangPrompt || langClosing || introPlaying) return;
    setInteracted(true);
    if (lang === null) {
      setIntroPlaying(true);
      window.setTimeout(() => {
        setIntroPlaying(false);
        setShowLangPrompt(true);
      }, INTRO_DURATION_MS);
      return;
    }
    if (view === "hero") {
      setView("leadership");
      return;
    }
    setIndex((i) => (i + 1) % STORIES.en.length);
  }, [lang, showLangPrompt, langClosing, introPlaying, view]);

  useEffect(() => {
    document.title = "Second Character — Historical Characters";
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
  const L = LEADERSHIP[activeLang];

  const handleSelectLang = (code: LangCode) => {
    setLang(code);
    setLangClosing(true);
    setView("leadership");
    window.setTimeout(() => {
      setShowLangPrompt(false);
      setLangClosing(false);
    }, 400);
  };

  return (
    <main
      role="button"
      tabIndex={0}
      lang={activeLang}
      aria-label="Tap to explore the next section"
      onClick={advance}
      onKeyDown={onKeyDown}
      dir={dir}
      className="relative flex h-screen w-full cursor-pointer select-none items-center justify-center overflow-hidden outline-none"
      style={{ backgroundColor: "hsl(var(--hero-background))" }}
    >
      <img
        src={secondBg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover blur-sm"
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to bottom, hsl(var(--hero-overlay) / 0.45), hsl(var(--hero-overlay) / 0.8))" }}
      />

      {view === "hero" && (
        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 text-center animate-fade-in">
          <HeroCharacter className="mb-8 h-40 w-auto md:mb-12 md:h-56" />
          <div key={`${activeLang}-${index}-${introPlaying ? "intro" : "story"}`} className="animate-fade-in transition-all duration-700 ease-out">
            <h1 className="text-4xl font-bold leading-tight tracking-tight transition-all duration-700 ease-out md:text-6xl lg:text-7xl" style={{ color: "hsl(var(--hero-foreground))" }}>
              {visibleStory.title}
            </h1>
            <p className="mt-5 text-base font-light tracking-wide transition-all duration-700 ease-out md:mt-7 md:text-lg" style={{ color: "hsl(var(--hero-muted))" }}>
              {visibleStory.description}
            </p>
          </div>
        </div>
      )}

      {view === "leadership" && (
        <div className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col justify-between animate-fade-in px-6 py-6" onClick={(e) => e.stopPropagation()}>
          <div className="mb-3 flex w-full justify-end md:mb-4">
            <div className="translate-x-4 opacity-100 transition-all duration-700 ease-out md:translate-x-8">
              <HeroCharacter className="h-[48vh] w-auto md:h-[56vh] lg:h-[62vh]" />
            </div>
          </div>

          <header className="mb-4 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] md:text-sm" style={{ color: "hsl(var(--hero-accent))" }}>
              {L.sectionTitle}
            </p>
            <h2 className="text-2xl font-bold leading-tight md:text-3xl" style={{ color: "hsl(var(--hero-foreground))" }}>
              Quick Overview
            </h2>
          </header>

          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <h4 className="mb-3 text-sm uppercase tracking-[0.25em]" style={{ color: "hsl(var(--hero-accent))" }}>
                {L.presidents}
              </h4>
              <div className="rounded-xl border p-4" style={{ borderColor: "hsl(var(--hero-foreground) / 0.2)", backgroundColor: "hsl(var(--hero-foreground) / 0.05)" }}>
                <p className="text-sm md:text-base" style={{ color: "hsl(var(--hero-foreground) / 0.9)" }}>
                  {L.presidentsList[0]?.name}
                </p>
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-sm uppercase tracking-[0.25em]" style={{ color: "hsl(var(--hero-accent))" }}>
                {L.primeMinisters}
              </h4>
              <div className="rounded-xl border p-4" style={{ borderColor: "hsl(var(--hero-foreground) / 0.2)", backgroundColor: "hsl(var(--hero-foreground) / 0.05)" }}>
                <p className="text-sm md:text-base" style={{ color: "hsl(var(--hero-foreground) / 0.9)" }}>
                  {L.pastPMs[0]?.name}
                </p>
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-sm uppercase tracking-[0.25em]" style={{ color: "hsl(var(--hero-accent))" }}>
                {L.speakers}
              </h4>
              <div className="rounded-xl border p-4" style={{ borderColor: "hsl(var(--hero-foreground) / 0.2)", backgroundColor: "hsl(var(--hero-foreground) / 0.05)" }}>
                <p className="text-sm md:text-base" style={{ color: "hsl(var(--hero-foreground) / 0.9)" }}>
                  {L.speakersList[0]?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`pointer-events-none absolute bottom-8 left-0 right-0 z-10 text-center text-xs uppercase tracking-[0.3em] transition-opacity duration-500 md:text-sm ${
          interacted || showLangPrompt || introPlaying ? "opacity-0" : "opacity-70"
        }`}
        style={{ color: "hsl(var(--hero-muted))" }}
      >
        {HINTS[activeLang]}
      </div>

      {showLangPrompt && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Select a language"
          onClick={(e) => e.stopPropagation()}
          className={`absolute inset-0 z-20 flex items-center justify-center px-6 backdrop-blur-md ${langClosing ? "animate-fade-out" : "animate-fade-in"}`}
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
                  style={{ borderColor: "hsl(var(--hero-foreground) / 0.25)", color: "hsl(var(--hero-foreground))" }}
                >
                  <span className="text-xl font-medium md:text-2xl">{opt.native}</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] md:text-xs" style={{ color: "hsl(var(--hero-muted))" }}>
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

export default SecondScreen;
