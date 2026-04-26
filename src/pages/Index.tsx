import { useCallback, useEffect, useState } from "react";
import HeroCharacter from "@/components/HeroCharacter";
import DiscoverKurdistan from "@/components/Sections/DiscoverKurdistan";
import ThePeoplePage from "@/components/Sections/ThePeople";
import JourneyTimelinePage from "@/components/Sections/TheJourney";
import officeBg from "@/assets/office.jpeg";
import peshmargaBg from "@/assets/images/peshmarga.jpg";
import bg2 from "@/assets/images/bg-2.jpg";
import bg3 from "@/assets/images/bg-3.jpg";
import kurdistan1Bg from "@/assets/images/kurdistan-1.jpeg";
import kurdistan2Bg from "@/assets/images/kurdistan-2.jpeg";
import kurdistan3Bg from "@/assets/images/kurdistan-3.jpeg";

type LangCode = "ku" | "en" | "ar";

type Story = { title: string; description: string };
type PeopleItem = { id: string; title: string; description: string; image: string; icon: string };
type JourneyItem = { id: string; title: string; description: string; image: string; icon: string };
type SystemNode = { title: string; subtitle: string; icon: string };
type SystemItem = { id: string; title: string; description: string; image: string; icon: string };
type LandItem = { id: string; title: string; description: string; image: string; icon: string };

const UI_COLORS = {
  panelBg: "rgba(8, 16, 30, 0.62)",
  panelBgStrong: "rgba(8, 16, 30, 0.74)",
  panelBorder: "rgba(214, 170, 92, 0.44)",
  panelBorderStrong: "rgba(214, 170, 92, 0.62)",
  textPrimary: "rgba(246, 236, 216, 0.98)",
  textMuted: "rgba(235, 222, 194, 0.82)",
  accent: "rgba(214, 170, 92, 0.98)",
};

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

const PEOPLE_CONTENT: Record<
  LangCode,
  {
    title: string;
    subtitle: string;
    heroImage: string;
    items: PeopleItem[];
  }
> = {
  en: {
    title: "The People",
    subtitle: "Discover who the Kurds are and the values, identity, and resilience that shape their story.",
    heroImage: bg3,
    items: [
      { id: "who", title: "Who Are the Kurds?", description: "An ancient people of the Middle East known for courage, hospitality, and cultural richness.", image: bg2, icon: "🏛" },
      { id: "identity", title: "A Shared Identity", description: "A people connected by language, history, tradition, and collective memory.", image: peshmargaBg, icon: "❖" },
      { id: "resilience", title: "A Story of Resilience", description: "A history shaped by endurance, dignity, and hope.", image: bg3, icon: "☀" },
    ],
  },
  ku: {
    title: "خەڵک",
    subtitle: "بزانە کوردەکان کێن و چۆن بەها و ناسنامە و خۆڕاگرییان چیرۆکەکەیان درووست کردووە.",
    heroImage: bg3,
    items: [
      { id: "who", title: "کوردەکان کێن؟", description: "گەلەکی کۆنی ڕۆژهەڵاتی ناوەڕاست، بە ناوبانگی ئازایەتی و میوانداری و دەوڵەمی کلتووری.", image: bg2, icon: "🏛" },
      { id: "identity", title: "ناسنامەی هاوبەش", description: "گەلێک کە بە زمان، مێژوو، نەریت و یادەوەری هاوبەش پێکەوە گرێدراون.", image: peshmargaBg, icon: "❖" },
      { id: "resilience", title: "چیرۆکی خۆڕاگری", description: "مێژوویەک شێوەدراو بە خۆڕاگری، شکۆ و هیوا.", image: bg3, icon: "☀" },
    ],
  },
  ar: {
    title: "الشعب",
    subtitle: "اكتشف من هم الكرد والقيم والهوية والصلابة التي تشكّل قصتهم.",
    heroImage: bg3,
    items: [
      { id: "who", title: "من هم الكرد؟", description: "شعب عريق في الشرق الأوسط معروف بالشجاعة والكرم والغنى الثقافي.", image: bg2, icon: "🏛" },
      { id: "identity", title: "هوية مشتركة", description: "شعب يجمعه اللغة والتاريخ والتقاليد والذاكرة الجماعية.", image: peshmargaBg, icon: "❖" },
      { id: "resilience", title: "قصة صمود", description: "تاريخ تشكّل بالصبر والكرامة والأمل.", image: bg3, icon: "☀" },
    ],
  },
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

const SYSTEM_CONTENT: Record<
  LangCode,
  {
    title: string;
    subtitle: string;
    center: SystemNode;
    left: SystemNode;
    right: SystemNode;
    items: SystemItem[];
  }
> = {
  en: {
    title: "The System",
    subtitle: "Learn how the Kurdistan Region is governed through its key institutions and leadership roles.",
    center: { title: "Parliament", subtitle: "Legislative Power", icon: "🏛" },
    left: { title: "Government", subtitle: "Executive Power", icon: "⚖" },
    right: { title: "Presidency", subtitle: "Constitutional Power", icon: "🦅" },
    items: [
      { id: "1", title: "1. Parliament", description: "The legislative institution responsible for laws and representation.", image: bg2, icon: "🏛" },
      { id: "2", title: "2. Government", description: "The executive body responsible for administration and public services.", image: bg3, icon: "🦅" },
      { id: "3", title: "3. Presidency", description: "A constitutional and national institution within the regional system.", image: peshmargaBg, icon: "🦅" },
      { id: "4", title: "4. How It Works", description: "Institutions work together through a parliamentary system.", image: bg2, icon: "👥" },
      { id: "5", title: "5. Leadership", description: "Presidents, Prime Ministers, and Speakers helped shape the Region's development.", image: bg3, icon: "👥" },
    ],
  },
  ku: {
    title: "سیستەم",
    subtitle: "فێربە چۆن هەرێمی کوردستان لە ڕێگای دامەزراوە سەرەکییەکانەوە بەڕێوەدەچێت.",
    center: { title: "پەرلەمان", subtitle: "هێزی یاسادانان", icon: "🏛" },
    left: { title: "حکومەت", subtitle: "هێزی جێبەجێکردن", icon: "⚖" },
    right: { title: "سەرۆکایەتی", subtitle: "هێزی دەستووری", icon: "🦅" },
    items: [
      { id: "1", title: "١. پەرلەمان", description: "دامەزراوەی یاسادانان کە بەرپرسیارە لە یاساکان و نوێنەرایەتی.", image: bg2, icon: "🏛" },
      { id: "2", title: "٢. حکومەت", description: "دەستەی جێبەجێکار بەرپرسیار لە بەڕێوەبردن و خزمەتگوزارییە گشتییەکان.", image: bg3, icon: "🦅" },
      { id: "3", title: "٣. سەرۆکایەتی", description: "دامەزراوەیەکی دەستووری و نەتەوەیی لە چوارچێوەی سیستەمی هەرێم.", image: peshmargaBg, icon: "🦅" },
      { id: "4", title: "٤. چۆنیەتی کارکردن", description: "دامەزراوەکان لە ڕێگای سیستەمی پەرلەمانی هاوکاری دەکەن.", image: bg2, icon: "👥" },
      { id: "5", title: "٥. سەرکردایەتی", description: "سەرۆک و سەرۆک وەزیر و سەرۆکی پەرلەمان ڕۆڵیان هەبووە لە پێشکەوتنی هەرێم.", image: bg3, icon: "👥" },
    ],
  },
  ar: {
    title: "النظام",
    subtitle: "تعرّف كيف يُحكم إقليم كوردستان عبر مؤسساته الأساسية وأدوار القيادة.",
    center: { title: "البرلمان", subtitle: "السلطة التشريعية", icon: "🏛" },
    left: { title: "الحكومة", subtitle: "السلطة التنفيذية", icon: "⚖" },
    right: { title: "الرئاسة", subtitle: "السلطة الدستورية", icon: "🦅" },
    items: [
      { id: "1", title: "1. البرلمان", description: "المؤسسة التشريعية المسؤولة عن القوانين والتمثيل.", image: bg2, icon: "🏛" },
      { id: "2", title: "2. الحكومة", description: "الهيئة التنفيذية المسؤولة عن الإدارة والخدمات العامة.", image: bg3, icon: "🦅" },
      { id: "3", title: "3. الرئاسة", description: "مؤسسة دستورية ووطنية ضمن النظام الإقليمي.", image: peshmargaBg, icon: "🦅" },
      { id: "4", title: "4. كيف يعمل", description: "تعمل المؤسسات معاً عبر نظام برلماني.", image: bg2, icon: "👥" },
      { id: "5", title: "5. القيادة", description: "ساهم الرؤساء ورؤساء الوزراء ورؤساء البرلمان في تشكيل تطور الإقليم.", image: bg3, icon: "👥" },
    ],
  },
};

const LAND_FUTURE_CONTENT: Record<
  LangCode,
  {
    title: string;
    subtitle: string;
    mapTitle: string;
    mapCities: string[];
    items: LandItem[];
  }
> = {
  en: {
    title: "The Land and Future",
    subtitle: "Explore Kurdistan's geography, symbols, protection, development, and future vision.",
    mapTitle: "Kurdistan",
    mapCities: ["Duhok", "Erbil", "Sulaymaniyah", "Halabja"],
    items: [
      { id: "land", title: "The Land", description: "Erbil, Sulaymaniyah, Duhok, and Halabja form a region of beauty and heritage.", image: bg3, icon: "⛰" },
      { id: "symbols", title: "Identity and Symbols", description: "The flag, anthem, language, and heritage reflect the spirit of Kurdistan.", image: peshmargaBg, icon: "☀" },
      { id: "peshmarga", title: "Peshmerga", description: "A symbol of courage, protection, and service.", image: peshmargaBg, icon: "★" },
      { id: "progress", title: "Progress", description: "Development continues in infrastructure, education, economy, and tourism.", image: bg2, icon: "📈" },
      { id: "future", title: "Future Vision", description: "Kurdistan looks ahead with ambition, opportunity, and confidence.", image: bg3, icon: "☼" },
    ],
  },
  ku: {
    title: "خاک و داهاتوو",
    subtitle: "جوگرافیا، نیشانەکان، پاراستن، پێشکەوتن، و بینینی داهاتووی کوردستان بگەڕێ.",
    mapTitle: "کوردستان",
    mapCities: ["دهۆک", "هەولێر", "سلێمانی", "هەڵەبجە"],
    items: [
      { id: "land", title: "خاک", description: "هەولێر، سلێمانی، دهۆک و هەڵەبجە ناوچەیەکی جوان و میراتی پێکدەهێنن.", image: bg3, icon: "⛰" },
      { id: "symbols", title: "ناسنامە و نیشانەکان", description: "ئاڵا، سروود، زمان و میرات ڕووحی کوردستان پیشان دەدەن.", image: peshmargaBg, icon: "☀" },
      { id: "peshmarga", title: "پێشمەرگە", description: "هێمای ئازایەتی، پاراستن و خزمەت.", image: peshmargaBg, icon: "★" },
      { id: "progress", title: "پێشکەوتن", description: "گەشەپێدان بەردەوامە لە ژێرخان، خوێندن، ئابووری و گەشتیاری.", image: bg2, icon: "📈" },
      { id: "future", title: "بینینی داهاتوو", description: "کوردستان بە هیوا و دەرفەت و متمانەوە بۆ داهاتوو دەڕوات.", image: bg3, icon: "☼" },
    ],
  },
  ar: {
    title: "الأرض والمستقبل",
    subtitle: "استكشف جغرافية كوردستان ورموزها وحمايتها وتطورها ورؤيتها للمستقبل.",
    mapTitle: "كوردستان",
    mapCities: ["دهوك", "أربيل", "السليمانية", "حلبجة"],
    items: [
      { id: "land", title: "الأرض", description: "أربيل والسليمانية ودهوك وحلبجة تشكّل منطقة من الجمال والتراث.", image: bg3, icon: "⛰" },
      { id: "symbols", title: "الهوية والرموز", description: "العلم والنشيد واللغة والتراث تعكس روح كوردستان.", image: peshmargaBg, icon: "☀" },
      { id: "peshmarga", title: "البيشمركة", description: "رمز للشجاعة والحماية والخدمة.", image: peshmargaBg, icon: "★" },
      { id: "progress", title: "التقدم", description: "يتواصل التطور في البنية التحتية والتعليم والاقتصاد والسياحة.", image: bg2, icon: "📈" },
      { id: "future", title: "رؤية المستقبل", description: "تنظر كوردستان إلى المستقبل بطموح وفرص وثقة.", image: bg3, icon: "☼" },
    ],
  },
};

const SECTION_STEP_LABELS: Record<LangCode, string[]> = {
  en: ["The People", "The Journey", "The System", "The Land and Future"],
  ku: ["خەڵک", "گەشت", "سیستەم", "خاک و داهاتوو"],
  ar: ["الشعب", "الرحلة", "النظام", "الأرض والمستقبل"],
};

type SectionView = "hero" | "discover" | "people" | "journey" | "system" | "landFuture";

const SectionNav = ({
  ui,
  onPrevious,
  onNext,
}: {
  ui: { previous: string; next: string };
  onPrevious: () => void;
  onNext?: () => void;
}) => (
  <div className="mt-6 grid grid-cols-2 gap-3">
    <button
      type="button"
      onClick={onPrevious}
      className="rounded-xl border px-4 py-3 text-sm transition-colors hover:bg-[hsl(var(--hero-foreground)/0.08)]"
      style={{
        borderColor: UI_COLORS.panelBorder,
        color: UI_COLORS.textPrimary,
        backgroundColor: UI_COLORS.panelBg,
      }}
      aria-label="Previous section"
    >
      {ui.previous}
    </button>
    <button
      type="button"
      onClick={onNext}
      disabled={!onNext}
      className="rounded-xl border px-4 py-3 text-sm transition-colors hover:bg-[hsl(var(--hero-foreground)/0.08)] disabled:cursor-not-allowed disabled:opacity-45"
      style={{
        borderColor: UI_COLORS.panelBorder,
        color: UI_COLORS.textPrimary,
        backgroundColor: UI_COLORS.panelBg,
      }}
      aria-label="Next section"
    >
      {ui.next}
    </button>
  </div>
);

const SectionProgress = ({ labels, activeIndex }: { labels: string[]; activeIndex: number }) => (
  <div className="mt-6 text-center">
    <p className="mb-3 text-[10px] uppercase tracking-[0.4em] md:text-xs" style={{ color: UI_COLORS.accent }}>
      Explore the Gate of Kurdistan
    </p>
    <div className="mx-auto grid max-w-xl grid-cols-4 items-center gap-2">
      {labels.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <span
            className={`h-3 w-3 rounded-full border ${i === activeIndex ? "shadow-[0_0_12px_rgba(255,214,128,0.65)]" : ""}`}
            style={{
              borderColor: UI_COLORS.panelBorderStrong,
              backgroundColor: i === activeIndex ? UI_COLORS.accent : "transparent",
            }}
          />
          <span
            className="hidden text-[10px] uppercase tracking-[0.1em] md:inline"
            style={{ color: i === activeIndex ? UI_COLORS.accent : UI_COLORS.textMuted }}
          >
            {label}
          </span>
        </div>
      ))}
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
  const [view, setView] = useState<SectionView>("hero");

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
      setView("discover");
      return;
    }
    if (view === "discover") {
      setView("people");
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
  const stepLabels = SECTION_STEP_LABELS[activeLang];
  const menuUi = MENU_UI[activeLang];
  const system = SYSTEM_CONTENT[activeLang];
  const landFuture = LAND_FUTURE_CONTENT[activeLang];
  const bgByView: Record<SectionView, string> = {
    hero: officeBg,
    discover: officeBg,
    people: bg2,
    journey: kurdistan2Bg,
    system: kurdistan3Bg,
    landFuture: bg2,
  };

  const handleSelectLang = (code: LangCode) => {
    setLang(code);
    setLangClosing(true);
    // Move content first so the overlay fades into Discover Kurdistan.
    setView("discover");
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
      className="relative flex min-h-screen w-full cursor-pointer select-none items-center justify-center overflow-hidden outline-none"
      style={{ backgroundColor: "hsl(var(--hero-background))" }}
    >
      {[officeBg, bg2, kurdistan1Bg, kurdistan2Bg, bg2].map((bg, idx) => (
        <img
          key={`${bg}-${idx}`}
          src={bg}
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover blur-[1px] transition-opacity duration-700 ${
            bgByView[view] === bg ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(5,10,20,0.48), rgba(5,10,20,0.78))",
        }}
      />
      {view === "landFuture" && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56"
          style={{ background: "linear-gradient(to top, rgba(5,10,20,0.9), rgba(5,10,20,0))" }}
        />
      )}

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

      {/* DISCOVER VIEW */}
      {view === "discover" && (
        <div className="relative z-10 w-full animate-fade-in" onClick={(e) => e.stopPropagation()}>
          <DiscoverKurdistan
            onStartExploring={() => {
              setView("people");
              setIntroPlaying(false);
              setShowLangPrompt(false);
              setLangClosing(false);
            }}
            onSelectSection={(section) => {
              setView(section);
              setIntroPlaying(false);
              setShowLangPrompt(false);
              setLangClosing(false);
            }}
          />
        </div>
      )}

      {/* PEOPLE VIEW */}
      {view === "people" && (
        <div className="relative z-10 w-full animate-fade-in" onClick={(e) => e.stopPropagation()}>
          <ThePeoplePage />
        </div>
      )}

      {/* JOURNEY VIEW */}
      {view === "journey" && (
        <div className="relative z-10 w-full animate-fade-in" onClick={(e) => e.stopPropagation()}>
          <JourneyTimelinePage />
        </div>
      )}

      {/* SYSTEM VIEW */}
      {view === "system" && (
        <div className="relative z-10 mx-auto w-full max-w-5xl animate-fade-in px-6 py-8 md:py-10" onClick={(e) => e.stopPropagation()}>
          <header className="mb-6 text-center">
            <h2 className="text-5xl font-bold leading-tight md:text-6xl" style={{ color: "hsl(var(--hero-foreground))" }}>
              {system.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm md:text-lg" style={{ color: "hsl(var(--hero-muted))" }}>
              {system.subtitle}
            </p>
          </header>

          <div className="mb-6 rounded-2xl border p-4 md:p-6" style={{ borderColor: "hsl(var(--hero-accent) / 0.35)", backgroundColor: "hsl(var(--hero-background) / 0.45)" }}>
            <div className="grid items-center gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full border text-2xl" style={{ borderColor: "hsl(var(--hero-accent) / 0.7)", color: "hsl(var(--hero-accent))" }}>{system.left.icon}</div>
                <p className="text-lg font-semibold" style={{ color: "hsl(var(--hero-foreground))" }}>{system.left.title}</p>
                <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "hsl(var(--hero-muted))" }}>{system.left.subtitle}</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full border text-3xl" style={{ borderColor: "hsl(var(--hero-accent) / 0.8)", color: "hsl(var(--hero-accent))" }}>{system.center.icon}</div>
                <p className="text-xl font-semibold" style={{ color: "hsl(var(--hero-foreground))" }}>{system.center.title}</p>
                <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "hsl(var(--hero-muted))" }}>{system.center.subtitle}</p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full border text-2xl" style={{ borderColor: "hsl(var(--hero-accent) / 0.7)", color: "hsl(var(--hero-accent))" }}>{system.right.icon}</div>
                <p className="text-lg font-semibold" style={{ color: "hsl(var(--hero-foreground))" }}>{system.right.title}</p>
                <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "hsl(var(--hero-muted))" }}>{system.right.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {system.items.map((item) => (
              <article
                key={item.id}
                className="group relative flex items-center gap-4 rounded-2xl border p-3 pr-14 transition-colors hover:bg-[hsl(var(--hero-foreground)/0.08)] md:p-4 md:pr-16"
                style={{
                  borderColor: "hsl(var(--hero-accent) / 0.35)",
                  backgroundColor: "hsl(var(--hero-background) / 0.5)",
                }}
              >
                <img src={item.image} alt={item.title} className="h-20 w-28 rounded-xl object-cover md:h-24 md:w-36" />
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm" style={{ borderColor: "hsl(var(--hero-accent) / 0.6)", color: "hsl(var(--hero-accent))" }}>
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-2xl font-bold md:text-3xl" style={{ color: "hsl(var(--hero-foreground))" }}>
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm md:text-base" style={{ color: "hsl(var(--hero-muted))" }}>
                    {item.description}
                  </p>
                </div>
                <span
                  className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-2xl transition-transform duration-200 group-hover:scale-110"
                  style={{ color: "hsl(var(--hero-accent) / 0.92)" }}
                >
                  ›
                </span>
              </article>
            ))}
          </div>

          <SectionNav ui={menuUi} onPrevious={() => setView("journey")} onNext={() => setView("landFuture")} />
          <SectionProgress labels={stepLabels} activeIndex={2} />
        </div>
      )}

{view === "landFuture" && (
  <div
    className="relative z-10 mx-auto w-full max-w-7xl px-6 py-10 text-center"
    onClick={(e) => e.stopPropagation()}
  >
    <header className="mb-10">
      <h2 className="text-5xl md:text-7xl font-semibold tracking-wide text-[#E6D3A3]">
        {landFuture.title}
      </h2>

      <div className="mt-3 flex items-center justify-center gap-2">
        <div className="h-[1px] w-10 bg-[#E6D3A3]/40"></div>
        <div className="h-2 w-2 rotate-45 bg-[#E6D3A3]"></div>
        <div className="h-[1px] w-10 bg-[#E6D3A3]/40"></div>
      </div>

      <p className="mx-auto mt-4 max-w-2xl text-sm md:text-lg text-[#CFC6B0]">
        {landFuture.subtitle}
      </p>
    </header>

    <section className="grid gap-4 md:grid-cols-5">
      {landFuture.items.map((item) => (
        <article
          key={item.id}
          className="group relative flex flex-col justify-between rounded-2xl border border-[#E6D3A3]/30 bg-[#0B1A24]/70 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#E6D3A3]/70"
        >
          <img
            src={item.image}
            alt={item.title}
            className="mb-4 h-36 w-full rounded-xl object-cover"
          />

          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#E6D3A3]/60 text-lg text-[#E6D3A3]">
            {item.icon}
          </div>

          <h3 className="text-xl font-semibold text-[#E6D3A3] md:text-2xl">
            {item.title}
          </h3>

          <div className="my-2 flex items-center justify-center gap-2">
            <div className="h-[1px] w-6 bg-[#E6D3A3]/40"></div>
            <div className="h-1 w-1 rounded-full bg-[#E6D3A3]"></div>
            <div className="h-[1px] w-6 bg-[#E6D3A3]/40"></div>
          </div>

          <p className="text-sm leading-relaxed text-[#CFC6B0]">
            {item.description}
          </p>
        </article>
      ))}
    </section>

    <SectionNav ui={menuUi} onPrevious={() => setView("system")} />
    <SectionProgress labels={stepLabels} activeIndex={3} />
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
