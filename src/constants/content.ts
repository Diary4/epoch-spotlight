import type { LangCode, Story, PeopleContent, JourneyContent, SystemContent, LandFutureContent, MenuUI } from "@/types/types";
import peshmargaBg from "@/assets/images/peshmarga.jpg";
import bg2 from "@/assets/images/bg-2.jpg";
import bg3 from "@/assets/images/bg-3.jpg";

export const UI_COLORS = {
  panelBg: "rgba(8, 16, 30, 0.62)",
  panelBgStrong: "rgba(8, 16, 30, 0.74)",
  panelBorder: "rgba(214, 170, 92, 0.44)",
  panelBorderStrong: "rgba(214, 170, 92, 0.62)",
  textPrimary: "rgba(246, 236, 216, 0.98)",
  textMuted: "rgba(235, 222, 194, 0.82)",
  accent: "rgba(214, 170, 92, 0.98)",
};

export const STORIES: Record<LangCode, Story[]> = {
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

export const LANG_OPTIONS: { code: LangCode; label: string; native: string; dir: "ltr" | "rtl" }[] = [
  { code: "ku", label: "Kurdish", native: "کوردی", dir: "rtl" },
  { code: "en", label: "English", native: "English", dir: "ltr" },
  { code: "ar", label: "Arabic", native: "العربية", dir: "rtl" },
];

export const HINTS: Record<LangCode, string> = {
  en: "Tap anywhere to explore",
  ku: "بۆ گەڕان دەستبدە بە هەر شوێنێک",
  ar: "انقر في أي مكان للاستكشاف",
};

export const INTRO_SPEAKING_TEXT: Story = {
  title: "The character is speaking...",
  description: "Please wait, language selection will appear after the intro.",
};

export const INTRO_DURATION_MS = 3500;

export const MENU_UI: Record<LangCode, MenuUI> = {
  en: { previous: "Previous", returnToMain: "Return to Main Menu", next: "Next" },
  ku: { previous: "پێشوو", returnToMain: "گەڕانەوە بۆ مێنیوی سەرەکی", next: "دواتر" },
  ar: { previous: "السابق", returnToMain: "العودة إلى القائمة الرئيسية", next: "التالي" },
};

export const SECTION_STEP_LABELS: Record<LangCode, string[]> = {
  en: ["The People", "The Journey", "The System", "The Land and Future"],
  ku: ["خەڵک", "گەشت", "سیستەم", "خاک و داهاتوو"],
  ar: ["الشعب", "الرحلة", "النظام", "الأرض والمستقبل"],
};

// PEOPLE CONTENT
export const PEOPLE_CONTENT: Record<LangCode, PeopleContent> = {
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

// JOURNEY CONTENT
export const JOURNEY_CONTENT: Record<LangCode, JourneyContent> = {
  en: {
    title: "The Journey",
    subtitle: "Explore the key milestones that shaped the Kurdistan Region from 1991 until today.",
    items: [
      { id: "1991", title: "1991", description: "A historic turning point that opened the path to a new reality.", image: peshmargaBg, icon: "★" },
      { id: "1992", title: "1992", description: "The first parliament and government marked the beginning of self-rule.", image: bg2, icon: "🏛" },
      { id: "institutions", title: "Building Institutions", description: "Public institutions gradually formed the structure of modern governance.", image: bg3, icon: "👥" },
      { id: "2005", title: "2005", description: "Federal recognition gave constitutional status to the Kurdistan Region.", image: bg2, icon: "📜" },
      { id: "today", title: "Today", description: "Kurdistan continues to grow through institutions, development, and vision.", image: bg3, icon: "☀" },
    ],
  },
  ku: {
    title: "گەشت",
    subtitle: "گرنگترین وێستگەکان بگەڕێ کە لە ساڵی ١٩٩١ تا ئێستا هەرێمی کوردستانیان شێوە دا.",
    items: [
      { id: "1991", title: "١٩٩١", description: "خاڵێکی مێژوویی گرنگ کە ڕێگای قۆناغێکی نوێی کردەوە.", image: peshmargaBg, icon: "★" },
      { id: "1992", title: "١٩٩٢", description: "یەکەم پەرلەمان و حکومەت دەستپێکی خۆبەڕێوەبردنیان نیشاندا.", image: bg2, icon: "🏛" },
      { id: "institutions", title: "بنیاتنانی دامەزراوەکان", description: "دامەزراوە گشتییەکان هەنگاو بە هەنگاو شێوەی حکومڕانی نوێیان درووست کرد.", image: bg3, icon: "👥" },
      { id: "2005", title: "٢٠٠٥", description: "ناساندنی فیدراڵی باری یاسایی دەستووری بە هەرێمەکە دا.", image: bg2, icon: "📜" },
      { id: "today", title: "ئێستا", description: "کوردستان بەردەوامە لە پێشکەوتن بە هۆی دامەزراوە و گەشەپێدان و بینین.", image: bg3, icon: "☀" },
    ],
  },
  ar: {
    title: "الرحلة",
    subtitle: "استكشف المحطات الأساسية التي شكّلت إقليم كوردستان من عام 1991 حتى اليوم.",
    items: [
      { id: "1991", title: "1991", description: "نقطة تحول تاريخية فتحت الطريق نحو واقع جديد.", image: peshmargaBg, icon: "★" },
      { id: "1992", title: "1992", description: "أول برلمان وحكومة شكّلا بداية الحكم الذاتي.", image: bg2, icon: "🏛" },
      { id: "institutions", title: "بناء المؤسسات", description: "تكوّنت المؤسسات العامة تدريجياً لتشكّل بنية الحكم الحديث.", image: bg3, icon: "👥" },
      { id: "2005", title: "2005", description: "منح الاعتراف الاتحادي الإقليمَ مكانةً دستورية.", image: bg2, icon: "📜" },
      { id: "today", title: "اليوم", description: "يواصل كوردستان النمو عبر المؤسسات والتنمية والرؤية.", image: bg3, icon: "☀" },
    ],
  },
};

// SYSTEM CONTENT
export const SYSTEM_CONTENT: Record<LangCode, SystemContent> = {
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

// LAND & FUTURE CONTENT
export const LAND_FUTURE_CONTENT: Record<LangCode, LandFutureContent> = {
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