import { useCallback, useEffect, useState } from "react";
import HeroCharacter from "@/components/HeroCharacter";
import officeBg from "@/assets/office.jpeg";

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

const INTRO_SPEAKING_TEXT: Story = {
  title: "The character is speaking...",
  description: "Please wait, language selection will appear after the intro.",
};

const INTRO_DURATION_MS = 3500;

// ---- Leadership data ----
type Leader = { name: string; years: string; photo?: string };

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
    sectionTitle: "Leadership",
    presidents: "Presidents",
    primeMinisters: "Prime Ministers",
    speakers: "Speakers of Parliament",
    currentPMLabel: "Current Prime Minister",
    achievementsLabel: "Key Achievements",
    visionLabel: "Vision",
    presidentsList: [
      { name: "Massoud Barzani", years: "2005 – 2017" },
      { name: "Nechirvan Barzani", years: "2019 – Present" },
    ],
    pastPMs: [
      { name: "Nechirvan Barzani", years: "1999 – 2009" },
      { name: "Barham Salih", years: "2009 – 2012" },
      { name: "Nechirvan Barzani", years: "2012 – 2019" },
    ],
    speakersList: [
      { name: "Adnan Mufti", years: "2005 – 2009" },
      { name: "Kamal Kirkuki", years: "2009 – 2013" },
      { name: "Yousif Mohammed", years: "2013 – 2018" },
      { name: "Rewaz Faiq", years: "2019 – Present" },
    ],
    currentPM: {
      name: "Masrour Barzani",
      years: "2019 – Present",
      bio: "Prime Minister of the Kurdistan Regional Government, leading reform and modernization across the region.",
      achievements: [
        "Public sector and salary reform",
        "Digital government and e-services",
        "Energy and infrastructure investment",
        "Strengthened international partnerships",
      ],
      vision:
        "Build a transparent, prosperous, and modern Kurdistan grounded in good governance and opportunity for every citizen.",
    },
  },
  ku: {
    sectionTitle: "سەرکردایەتی",
    presidents: "سەرۆکەکان",
    primeMinisters: "سەرۆک وەزیرەکان",
    speakers: "سەرۆکەکانی پەرلەمان",
    currentPMLabel: "سەرۆک وەزیری ئێستا",
    achievementsLabel: "گرنگترین دەستکەوتەکان",
    visionLabel: "بینین",
    presidentsList: [
      { name: "مەسعود بارزانی", years: "٢٠٠٥ – ٢٠١٧" },
      { name: "نێچیرڤان بارزانی", years: "٢٠١٩ – ئێستا" },
    ],
    pastPMs: [
      { name: "نێچیرڤان بارزانی", years: "١٩٩٩ – ٢٠٠٩" },
      { name: "بەرهەم ساڵح", years: "٢٠٠٩ – ٢٠١٢" },
      { name: "نێچیرڤان بارزانی", years: "٢٠١٢ – ٢٠١٩" },
    ],
    speakersList: [
      { name: "عەدنان موفتی", years: "٢٠٠٥ – ٢٠٠٩" },
      { name: "کەمال کەرکوکی", years: "٢٠٠٩ – ٢٠١٣" },
      { name: "یوسف محمد", years: "٢٠١٣ – ٢٠١٨" },
      { name: "ڕێواز فایەق", years: "٢٠١٩ – ئێستا" },
    ],
    currentPM: {
      name: "مەسرور بارزانی",
      years: "٢٠١٩ – ئێستا",
      bio: "سەرۆک وەزیری حکومەتی هەرێمی کوردستان، ڕابەری چاکسازی و نوێکردنەوە لە هەرێمدا.",
      achievements: [
        "چاکسازی کەرتی گشتی و مووچە",
        "حکومەتی دیجیتاڵی و خزمەتگوزاری ئەلیکترۆنی",
        "وەبەرهێنان لە وزە و بنیاتنانی ژێرخان",
        "بەهێزکردنی هاوبەشی نێودەوڵەتی",
      ],
      vision:
        "بنیاتنانی کوردستانێکی شەفاف، دەوڵەمەند و نوێ لە‌سەر بنەمای حکومڕانی باش و دەرفەت بۆ هەموو هاوڵاتیان.",
    },
  },
  ar: {
    sectionTitle: "القيادة",
    presidents: "الرؤساء",
    primeMinisters: "رؤساء الوزراء",
    speakers: "رؤساء البرلمان",
    currentPMLabel: "رئيس الوزراء الحالي",
    achievementsLabel: "أبرز الإنجازات",
    visionLabel: "الرؤية",
    presidentsList: [
      { name: "مسعود بارزاني", years: "٢٠٠٥ – ٢٠١٧" },
      { name: "نيجيرفان بارزاني", years: "٢٠١٩ – الحاضر" },
    ],
    pastPMs: [
      { name: "نيجيرفان بارزاني", years: "١٩٩٩ – ٢٠٠٩" },
      { name: "برهم صالح", years: "٢٠٠٩ – ٢٠١٢" },
      { name: "نيجيرفان بارزاني", years: "٢٠١٢ – ٢٠١٩" },
    ],
    speakersList: [
      { name: "عدنان مفتي", years: "٢٠٠٥ – ٢٠٠٩" },
      { name: "كمال كركوكي", years: "٢٠٠٩ – ٢٠١٣" },
      { name: "يوسف محمد", years: "٢٠١٣ – ٢٠١٨" },
      { name: "ريواز فائق", years: "٢٠١٩ – الحاضر" },
    ],
    currentPM: {
      name: "مسرور بارزاني",
      years: "٢٠١٩ – الحاضر",
      bio: "رئيس وزراء حكومة إقليم كوردستان، يقود الإصلاح والتحديث في الإقليم.",
      achievements: [
        "إصلاح القطاع العام والرواتب",
        "الحكومة الرقمية والخدمات الإلكترونية",
        "الاستثمار في الطاقة والبنية التحتية",
        "تعزيز الشراكات الدولية",
      ],
      vision:
        "بناء كوردستان شفافة ومزدهرة وحديثة قائمة على الحوكمة الرشيدة والفرص لكل مواطن.",
    },
  },
};

const LeaderCard = ({ leader }: { leader: Leader }) => (
  <div
    className="flex items-center gap-4 rounded-lg border p-4 transition-colors"
    style={{
      borderColor: "hsl(var(--hero-foreground) / 0.15)",
      backgroundColor: "hsl(var(--hero-foreground) / 0.04)",
    }}
  >
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-base font-semibold"
      style={{
        backgroundColor: "hsl(var(--hero-foreground) / 0.1)",
        color: "hsl(var(--hero-foreground))",
      }}
      aria-hidden="true"
    >
      {leader.name
        .split(" ")
        .slice(0, 2)
        .map((p) => p[0])
        .join("")}
    </div>
    <div className="min-w-0">
      <p
        className="truncate text-sm font-medium md:text-base"
        style={{ color: "hsl(var(--hero-foreground))" }}
      >
        {leader.name}
      </p>
      <p className="text-xs md:text-sm" style={{ color: "hsl(var(--hero-muted))" }}>
        {leader.years}
      </p>
    </div>
  </div>
);

const Index = () => {
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
      // First interaction: keep same screen, change text, then show language prompt.
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
  const L = LEADERSHIP[activeLang];

  const handleSelectLang = (code: LangCode) => {
    setLang(code);
    setLangClosing(true);
    // Move content first so the overlay fades over leadership.
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
        className="pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover blur-sm"
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

      {/* LEADERSHIP VIEW */}
      {view === "leadership" && (
        <div
          className="relative z-10 mx-auto w-full max-w-5xl animate-fade-in px-6 py-20"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="mb-10 text-center">
            <p
              className="mb-3 text-xs uppercase tracking-[0.4em] md:text-sm"
              style={{ color: "hsl(var(--hero-accent))" }}
            >
              {L.sectionTitle}
            </p>
            <h2
              className="text-3xl font-bold leading-tight md:text-5xl"
              style={{ color: "hsl(var(--hero-foreground))" }}
            >
              {L.presidents} · {L.primeMinisters} · {L.speakers}
            </h2>
          </header>

          {/* Current PM — full treatment */}
          <section
            className="mb-12 rounded-2xl border p-6 md:p-8"
            style={{
              borderColor: "hsl(var(--hero-accent) / 0.4)",
              backgroundColor: "hsl(var(--hero-foreground) / 0.05)",
            }}
          >
            <p
              className="mb-4 text-xs uppercase tracking-[0.3em]"
              style={{ color: "hsl(var(--hero-accent))" }}
            >
              {L.currentPMLabel}
            </p>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
              <div
                className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full text-2xl font-semibold md:h-28 md:w-28"
                style={{
                  backgroundColor: "hsl(var(--hero-foreground) / 0.12)",
                  color: "hsl(var(--hero-foreground))",
                }}
                aria-hidden="true"
              >
                {L.currentPM.name
                  .split(" ")
                  .slice(0, 2)
                  .map((p) => p[0])
                  .join("")}
              </div>
              <div className="min-w-0 flex-1">
                <h3
                  className="text-2xl font-bold md:text-3xl"
                  style={{ color: "hsl(var(--hero-foreground))" }}
                >
                  {L.currentPM.name}
                </h3>
                <p className="mt-1 text-sm" style={{ color: "hsl(var(--hero-muted))" }}>
                  {L.currentPM.years}
                </p>
                <p
                  className="mt-3 text-sm leading-relaxed md:text-base"
                  style={{ color: "hsl(var(--hero-foreground) / 0.85)" }}
                >
                  {L.currentPM.bio}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p
                  className="mb-2 text-xs uppercase tracking-[0.25em]"
                  style={{ color: "hsl(var(--hero-accent))" }}
                >
                  {L.achievementsLabel}
                </p>
                <ul className="space-y-1.5 text-sm md:text-base" style={{ color: "hsl(var(--hero-foreground) / 0.9)" }}>
                  {L.currentPM.achievements.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span style={{ color: "hsl(var(--hero-accent))" }}>•</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p
                  className="mb-2 text-xs uppercase tracking-[0.25em]"
                  style={{ color: "hsl(var(--hero-accent))" }}
                >
                  {L.visionLabel}
                </p>
                <p
                  className="text-sm leading-relaxed md:text-base"
                  style={{ color: "hsl(var(--hero-foreground) / 0.9)" }}
                >
                  {L.currentPM.vision}
                </p>
              </div>
            </div>
          </section>

          {/* Past leaders — simple cards */}
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h4
                className="mb-3 text-sm uppercase tracking-[0.25em]"
                style={{ color: "hsl(var(--hero-accent))" }}
              >
                {L.presidents}
              </h4>
              <div className="space-y-3">
                {L.presidentsList.map((p) => (
                  <LeaderCard key={p.name + p.years} leader={p} />
                ))}
              </div>
            </div>
            <div>
              <h4
                className="mb-3 text-sm uppercase tracking-[0.25em]"
                style={{ color: "hsl(var(--hero-accent))" }}
              >
                {L.primeMinisters}
              </h4>
              <div className="space-y-3">
                {L.pastPMs.map((p) => (
                  <LeaderCard key={p.name + p.years} leader={p} />
                ))}
              </div>
            </div>
            <div>
              <h4
                className="mb-3 text-sm uppercase tracking-[0.25em]"
                style={{ color: "hsl(var(--hero-accent))" }}
              >
                {L.speakers}
              </h4>
              <div className="space-y-3">
                {L.speakersList.map((p) => (
                  <LeaderCard key={p.name + p.years} leader={p} />
                ))}
              </div>
            </div>
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
