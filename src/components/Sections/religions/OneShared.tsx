import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  Globe2,
  Landmark,
  MoonStar,
  type LucideIcon,
} from "lucide-react";
import { detailBackIconClassName, detailBackIconSize } from "@/constants/backNavigation";
import { cn } from "@/lib/utils";

import ReligionInfoCard from "@/components/Sections/religions/ReligionInfoCard";
import ReligionsScaledPage from "@/components/Sections/religions/ReligionsScaledPage";

import sharedHero from "@/assets/mainImages/shared.webp";
import mosquesImg from "@/assets/images/religions/sharedlife/mosques.jpeg";
import churchesImg from "@/assets/images/religions/sharedlife/churches.jpeg";
import lalishImg from "@/assets/images/religions/sharedlife/lalish.jpeg";
import zoroImg from "@/assets/images/new/religions/faiths/zoroastrianism.webp";
import eidImg from "@/assets/images/new/religions/faiths/islam.webp";
import christmasImg from "@/assets/images/new/religions/faiths/christianity.webp";
import yazidiFestImg from "@/assets/images/religions/r-5.webp";
import kakaiImg from "@/assets/images/new/religions/faiths/yarsanism.webp";

type LangCode = "en" | "ku" | "ar";
type TabId = "celebrations" | "heritage";

type SharedCard = {
  id: string;
  title: string;
  body: string;
  image: string;
  accent: string;
};

type TabContent = {
  subtitle: string;
  tagline: string;
  cards: SharedCard[];
};

type SharedContent = {
  back: string;
  pageTitle: string;
  pageDescription: string;
  celebrationsTab: string;
  heritageTab: string;
  celebrations: TabContent;
  heritage: TabContent;
};

const content: Record<LangCode, SharedContent> = {
  en: {
    back: "Back",
    pageTitle: "Shared Life",
    pageDescription:
      "Festivals that bring us together and sacred places that hold our shared memory.",
    celebrationsTab: "Celebrations",
    heritageTab: "Heritage",
    celebrations: {
      subtitle: "Festivals, faith, and joyful moments.",
      tagline: "Different traditions. One shared joy.",
      cards: [
        {
          id: "eid",
          title: "Eid Al-Fitr & Eid Al-Adha",
          body: "Official 3 and 4-day holidays. Celebrated with communal prayers, feasts, and visits. Christians in Erbil prepare iftar tables during Ramadan in solidarity with Muslims.",
          image: eidImg,
          accent: "#7a4a12",
        },
        {
          id: "christmas-easter",
          title: "Christmas & Easter",
          body: "Official public holidays in the Kurdistan Region. Easter celebrated with egg coloring and special Easter bread (ka'k). Christmas celebrated December 25 or January 7.",
          image: christmasImg,
          accent: "#a05a18",
        },
        {
          id: "yazidi-festivals",
          title: "Yazidi Festivals",
          body: "New Year (Red Wednesday, April), Jemai (October 6–13), Summer Forty Days (August 2), Day of Êzî (December 16) — all official holidays in the Kurdistan Region.",
          image: yazidiFestImg,
          accent: "#b9822d",
        },
        {
          id: "kakai-festival",
          title: "Kakai Festival",
          body: "Qewltas Festival — a three-day religious festival observed in December by the Kakai community.",
          image: kakaiImg,
          accent: "#c58b16",
        },
      ],
    },
    heritage: {
      subtitle: "Places that hold memory and faith.",
      tagline: "Every sacred place tells a story.",
      cards: [
        {
          id: "mosques",
          title: "Mosques",
          body: "6,103 mosques supervised by the Ministry of Endowments. Including historic sites such as the Erbil Citadel Mosque, Grand Mosque of Akre, and Jalil Khayat Mosque.",
          image: mosquesImg,
          accent: "#7a4a12",
        },
        {
          id: "churches-monasteries",
          title: "Churches & Monasteries",
          body: "Mar Mattai Monastery on Mount Maqlub, Monastery of Hormizd in Alqosh, Rabban Boya Monastery in Shaqlawa, and dozens of active churches across the region.",
          image: churchesImg,
          accent: "#a05a18",
        },
        {
          id: "lalish-temple",
          title: "Lalish Temple",
          body: "The sacred heart of Yazidism. Located in Shekhan, Duhok. Contains the tombs of Yazidi saints and two sacred springs: Kaniya Spi and Zamzam.",
          image: lalishImg,
          accent: "#b9822d",
        },
        {
          id: "zoroastrian-temples",
          title: "Zoroastrian Temples",
          body: "Qazkapan Zoroastrian Temple in Dukan, Sulaymaniyah. Charsten Cave Zoroastrian Temple in Duhok. Ancient sites of pre-Islamic Kurdistan still standing today.",
          image: zoroImg,
          accent: "#c58b16",
        },
      ],
    },
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "ژیانی هاوبەش",
    pageDescription:
      "جەژنەکانی پێکمان دەگەیەنن و شوێنە پیرۆزەکانی یادی هاوبەشمان دەپارێزن.",
    celebrationsTab: "جەژنەکان",
    heritageTab: "میرات",
    celebrations: {
      subtitle: "جەژن، باوەڕ، و کاتە خۆشەکان.",
      tagline: "نەریتی جیاواز. خۆشییەکی هاوبەش.",
      cards: [
        {
          id: "eid",
          title: "جەژنی ڕەمەزان و قوربان",
          body: "پشووی فەرمی ٣ و ٤ ڕۆژە. بە نوێژی کۆمەڵگە، خوان، و سەردانی پێکدێن. مەسیحیەکانی هەولێر لە ڕەمەزاندا خوانی فتاری بۆ موسوڵمانان ئامادە دەکەن.",
          image: eidImg,
          accent: "#7a4a12",
        },
        {
          id: "christmas-easter",
          title: "کریسمەس و عەید پاسکا",
          body: "پشووی فەرمیی هەرێمی کوردستانن. عەید پاسکا بە ڕەنگکردنی هێلکە و نانی تایبەتی (کاک) دەکرێت. کریسمەس لە ٢٥ی کانوونی یەکەم یان ٧ی کانوونی دووەم.",
          image: christmasImg,
          accent: "#a05a18",
        },
        {
          id: "yazidi-festivals",
          title: "جەژنە ئێزدییەکان",
          body: "سەری سال (چوارشەممەی سوور، نیسان)، جەماعی (٦–١٣ تشرینی یەکەم)، چلەی هاوین (٢ی ئاب)، ڕۆژی ئێزی (١٦ی کانوونی یەکەم) — هەموو پشووی فەرمین لە هەرێمی کوردستان.",
          image: yazidiFestImg,
          accent: "#b9822d",
        },
        {
          id: "kakai-festival",
          title: "جەژنی کاکەیی",
          body: "جەژنی قەولتاس — جەژنێکی ئاینیی سێ ڕۆژەیە کە کاکەییەکان لە کانوونی یەکەم بەرپای دەکەن.",
          image: kakaiImg,
          accent: "#c58b16",
        },
      ],
    },
    heritage: {
      subtitle: "شوێنانێک کە یاد و باوەڕیان تێدایە.",
      tagline: "هەر شوێنێکی پیرۆز چیرۆکێکی هەیە.",
      cards: [
        {
          id: "mosques",
          title: "مزگەوتەکان",
          body: "٦,١٠٣ مزگەوت لەژێر چاودێریی وەزارەتی ئەوقاف. لەناویاندا شوێنە مێژووییەکانی وەک مزگەوتی قەڵای هەولێر، مزگەوتی گەورەی ئاکرێ، و مزگەوتی جەلیل خەیات.",
          image: mosquesImg,
          accent: "#7a4a12",
        },
        {
          id: "churches-monasteries",
          title: "کڵێسا و دێرەکان",
          body: "دێری مار مەتای لە چیای مەقلوب، دێری هرمزد لە ئالقۆش، دێری ڕابان بۆیا لە شەقڵاوە، و دەیان کڵێسای چالاک بەسەر هەرێمەکەدا.",
          image: churchesImg,
          accent: "#a05a18",
        },
        {
          id: "lalish-temple",
          title: "پەرستگای لالش",
          body: "دڵە پیرۆزی ئێزدیەتی. لە شێخان، دهۆک. تورباتی پیرۆزانی ئێزدی و دوو کانیی پیرۆز: کانیا سپی و زەمزەم لەخۆ دەگرێت.",
          image: lalishImg,
          accent: "#b9822d",
        },
        {
          id: "zoroastrian-temples",
          title: "پەرستگاکانی زەردەشتی",
          body: "پەرستگای زەردەشتیی قازکەپان لە دۆکان، سلێمانی. پەرستگای ئەشکەوتی چارستێن لە دهۆک. شوێنە کۆنەکانی پێش-ئیسلامیی کوردستان هێشتا ماون.",
          image: zoroImg,
          accent: "#c58b16",
        },
      ],
    },
  },
  ar: {
    back: "العودة",
    pageTitle: "الحياة المشتركة",
    pageDescription:
      "أعياد تجمعنا وأماكن مقدّسة تحفظ ذاكرتنا المشتركة.",
    celebrationsTab: "الاحتفالات",
    heritageTab: "التراث",
    celebrations: {
      subtitle: "أعياد وإيمان ولحظات فرح.",
      tagline: "تقاليد مختلفة. فرحة واحدة مشتركة.",
      cards: [
        {
          id: "eid",
          title: "عيد الفطر وعيد الأضحى",
          body: "عطل رسمية لمدة ٣ و٤ أيام. تُحتفل بالصلوات الجماعية والولائم والزيارات. يُعدّ المسيحيون في أربيل موائد الإفطار في رمضان تضامناً مع المسلمين.",
          image: eidImg,
          accent: "#7a4a12",
        },
        {
          id: "christmas-easter",
          title: "عيد الميلاد وعيد الفصح",
          body: "عطل رسمية في إقليم كوردستان. يُحتفل بعيد الفصح بتلوين البيض وخبز الكعك (ka'k). يُحتفل بعيد الميلاد في ٢٥ ديسمبر أو ٧ يناير.",
          image: christmasImg,
          accent: "#a05a18",
        },
        {
          id: "yazidi-festivals",
          title: "الأعياد الإيزيدية",
          body: "رأس السنة (الأربعاء الأحمر، نيسان)، الجماعية (٦–١٣ تشرين الأول)، أربعينية الصيف (٢ آب)، يوم إيزي (١٦ كانون الأول) — كلها أعياد رسمية في إقليم كوردستان.",
          image: yazidiFestImg,
          accent: "#b9822d",
        },
        {
          id: "kakai-festival",
          title: "العيد الكاكائي",
          body: "عيد القولتاس — عيد ديني يستمر ثلاثة أيام في كانون الأول لدى الطائفة الكاكائية.",
          image: kakaiImg,
          accent: "#c58b16",
        },
      ],
    },
    heritage: {
      subtitle: "أماكن تحمل الذاكرة والإيمان.",
      tagline: "كل مكان مقدس يحكي قصة.",
      cards: [
        {
          id: "mosques",
          title: "المساجد",
          body: "٦,١٠٣ مساجد تشرف عليها وزارة الأوقاف. تشمل مواقع تاريخية كجامع قلعة أربيل، والجامع الكبير في عقرة، وجامع جليل خياط.",
          image: mosquesImg,
          accent: "#7a4a12",
        },
        {
          id: "churches-monasteries",
          title: "الكنائس والأديرة",
          body: "دير مار متى في جبل مقلوب، دير هرمز في القوش، دير ربان بويا في شقلاوة، وعشرات الكنائس النشطة في أنحاء الإقليم.",
          image: churchesImg,
          accent: "#a05a18",
        },
        {
          id: "lalish-temple",
          title: "معبد لالش",
          body: "القلب المقدس للإيزيدية. يقع في شيخان، دهوك. يضم أضرحة قديسي الإيزيدية ونبعَين مقدّسَين: كانيا سبي وزمزم.",
          image: lalishImg,
          accent: "#b9822d",
        },
        {
          id: "zoroastrian-temples",
          title: "المعابد الزرادشتية",
          body: "معبد قازقابان الزرادشتي في دوكان، السليمانية. معبد كهف چارستێن الزرادشتي في دهوك. مواقع قديمة لكوردستان ما قبل الإسلام لا تزال قائمة.",
          image: zoroImg,
          accent: "#c58b16",
        },
      ],
    },
  },
};

const tabs: { id: TabId; icon: LucideIcon }[] = [
  { id: "celebrations", icon: MoonStar },
  { id: "heritage", icon: Landmark },
];

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

type OneSharedHomelandPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function OneSharedHomelandPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: OneSharedHomelandPageProps = {}) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [activeTab, setActiveTab] = React.useState<TabId>("celebrations");
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";
  const tabPanel = activeTab === "celebrations" ? c.celebrations : c.heritage;

  React.useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.set("[data-sh-hero='true']", { autoAlpha: 0 });
      gsap.set("[data-sh-animate='true']", { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to("[data-sh-hero='true']", {
        autoAlpha: 1,
        duration: 1.0,
      }).to(
        "[data-sh-animate='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
        },
        "-=0.5",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <ReligionsScaledPage
      dir={dir}
      lang={lang}
      fitDeps={[lang]}
      sectionRef={sectionRef}
      className="min-h-full px-12 pb-12"
    >
      <img
        data-sh-hero="true"
        src={sharedHero}
        alt=""
        className="pointer-events-none absolute inset-x-0 top-[220px] z-0 h-[900px] w-full object-cover object-center [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-[220px] z-[1] h-[900px] bg-[linear-gradient(to_bottom,#faf8f5_0%,transparent_16%,transparent_84%,#faf8f5_100%)]" />

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/80 text-[#5a3a18] shadow-sm"
          aria-label={c.back}
        >
          <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
        </button>
      )}

      {onLanguageChange && (
        <button
          type="button"
          onClick={onLanguageChange}
          className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]"
        >
          <Globe2 className="h-5 w-5" />
          {languageLabel}
        </button>
      )}

      <div className="relative z-10 mx-auto flex min-h-full w-full max-w-[1220px] flex-col">
        <header data-sh-animate="true" className="mx-auto max-w-[850px] shrink-0 pt-8 text-center">
          <div className="mx-auto mb-2 w-[220px]">
            <DecorativeLine color="#c3923a" />
          </div>
          <h1 className="font-serif text-[72px] font-semibold uppercase leading-[1.02] tracking-[0.04em] text-[#3b2410]">
            {c.pageTitle}
          </h1>
          <div className="mx-auto mt-4 w-[160px]">
            <DecorativeLine color="#c3923a" />
          </div>
          <p className="mx-auto mt-4 max-w-[640px] text-[18px] font-medium leading-relaxed text-[#4d3c2a]">
            {c.pageDescription}
          </p>
        </header>

        <section data-sh-animate="true" className="mt-[920px] flex flex-1 flex-col pb-4">
          <nav className="mb-6 flex shrink-0 justify-center border-b border-[#d7b77e]/45">
            <div className="flex gap-2">
              {tabs.map((tab) => {
                const label =
                  tab.id === "celebrations" ? c.celebrationsTab : c.heritageTab;
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-3 border-b-2 px-8 py-3.5 font-serif text-[20px] transition-colors",
                      isActive
                        ? "border-[#b98222] text-[#2f1f12]"
                        : "border-transparent text-[#8a6a45] hover:text-[#3f2b17]",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="mb-6 text-center">
            <p className="font-serif text-[20px] italic text-[#6a4a25]">{tabPanel.subtitle}</p>
          </div>

          <div className="grid w-full flex-1 grid-cols-4 content-stretch gap-5">
            {tabPanel.cards.map((card, index) => (
              <ReligionInfoCard
                key={card.id}
                title={card.title}
                body={card.body}
                image={card.image}
                accent={card.accent}
                accentIndex={index}
                titleClassName="uppercase"
                imageHeightClass="min-h-[320px] flex-1"
                className="min-h-full"
              />
            ))}
          </div>

          <div className="mx-auto mt-8 w-full max-w-[920px] shrink-0 rounded-[28px] border-2 border-[#c99745]/55 bg-[#fff7e7]/95 px-8 py-6 text-center shadow-[0_12px_26px_rgba(75,45,12,0.14)]">
            <p className="font-serif text-[22px] font-semibold italic leading-snug text-[#6a4a25]">
              {tabPanel.tagline}
            </p>
          </div>
        </section>
      </div>
    </ReligionsScaledPage>
  );
}
