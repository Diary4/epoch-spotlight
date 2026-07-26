import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  Globe2,
  Landmark,
  MoonStar,
  type LucideIcon,
} from "lucide-react";
import { detailBackIconClassName, detailBackIconSize, religionsOverlayStartClassName, religionsOverlayEndClassName } from "@/constants/backNavigation";

import ReligionInfoCard from "@/components/Sections/religions/ReligionInfoCard";
import ReligionsScaledPage from "@/components/Sections/religions/ReligionsScaledPage";
import {
  ReligionsTabNav,
  ReligionsTabPanel,
  usePreloadImages,
} from "@/components/Sections/religions/tabTransitions";

import sharedHero from "@/assets/images/religions/sharedlife/cover.jpeg";
import mosquesImg from "@/assets/images/religions/sharedlife/mosques.jpeg";
import churchesImg from "@/assets/images/religions/sharedlife/churches.jpeg";
import lalishImg from "@/assets/images/religions/sharedlife/lalish.jpeg";
import zoroImg from "@/assets/images/new/religions/faiths/zoroastrianism.webp";
import eidImg from "@/assets/images/religions/sharedlife/mosques.jpeg";
import christmasImg from "@/assets/images/religions/sharedlife/christmas.jpeg";
import yazidiFestImg from "@/assets/images/religions/sharedlife/yazidi-festival.jpeg";
import kakaiImg from "@/assets/images/religions/sharedlife/kakai-festival.jpeg";

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
      "جەژن، باوەڕ و ساتە خۆشەکان",
    celebrationsTab: "جەژنە هاوبەشەکان",
    heritageTab: "میرات و شوێنە پیرۆزەکان",
    celebrations: {
      subtitle: "جەژن، باوەڕ و ساتە خۆشەکان",
      tagline: "نەریتی جیاواز. خۆشی هاوبەش.",
      cards: [
        {
          id: "eid",
          title: "جەژنی ڕەمەزان و قوربان",
          body: "پشووی فەرمین. مەسیحییەکان لەم جەژنانەدا سەردانی هاوڕێ موسڵمانەکانیان دەکەن و خوان ئامادە دەکەن.",
          image: eidImg,
          accent: "#7a4a12",
        },
        {
          id: "christmas-easter",
          title: "لەدایکبوون و قیامەت",
          body: "پشووی فەرمین لە هەرێم. جەژنی قیامەت بە ڕەنگکردنی هێلکە و شیرینی تایبەت پیرۆز دەکرێت.",
          image: christmasImg,
          accent: "#a05a18",
        },
        {
          id: "yazidi-festivals",
          title: "جەژنە ئێزیدییەکان",
          body: "سەری ساڵ (چوارشەممەی سوور)، جەمایێ، چلەی هاوین و ڕۆژووی ئێزی — هەموویان پشووی فەرمین لە هەرێم.",
          image: yazidiFestImg,
          accent: "#b9822d",
        },
        {
          id: "kakai-festival",
          title: "جەژنی کاکەییەکان",
          body: "فیستیڤاڵی قۆڵتاس — جەژنێکی ئایینی سێ ڕۆژەیە لە مانگی کانوونی یەکەمدا.",
          image: kakaiImg,
          accent: "#c58b16",
        },
      ],
    },
    heritage: {
      subtitle: "ئەو شوێنانەی یادەوەری و باوەڕیان هەڵگرتووە",
      tagline: "هەر شوێنێکی پیرۆز چیرۆکێک دەگێڕێتەوە.",
      cards: [
        {
          id: "mosques",
          title: "مزگەوتەکان",
          body: "٦١٠٣ مزگەوت هەن. وەک مزگەوتی قەڵای هەولێر و مزگەوتی گەورەی ئاکرێ و جەلیل خەیات.",
          image: mosquesImg,
          accent: "#7a4a12",
        },
        {
          id: "churches-monasteries",
          title: "کەنیسە و دێرەکان",
          body: "دێری مار مەتی لەسەر چیای مەقلووب، دێری رەبان هورمزد لە ئەلقوش، و دێری ڕەبان بۆیا لە شەقڵاوە.",
          image: churchesImg,
          accent: "#a05a18",
        },
        {
          id: "lalish-temple",
          title: "پەرستگای لالەش",
          body: "دڵی ڕۆحیی ئێزیدییەکانە. دەکەوێتە قەزای شێخان لە پارێزگای دهۆک. مەزارگەی پیرۆزی کەسایەتییە ئایینییەکانی ئێزیدی و دوو کانیی پیرۆز (کانیا سپی و زەمزەم) لەخۆدەگرێت.",
          image: lalishImg,
          accent: "#b9822d",
        },
        {
          id: "zoroastrian-temples",
          title: "پەرستگا زەردەشتییەکان",
          body: "پەرستگای قزقاپان لە دووکان و ئەشکەوتی چارستن لە دهۆک کە مێژووەکەیان بۆ پێش ئیسلام دەگەڕێتەوە و تا ئەمڕۆش وەک خۆیان ماونەتەوە.",
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
      "الأعياد والإيمان واللحظات البهيجة",
    celebrationsTab: "الاحتفالات المشتركة",
    heritageTab: "التراث والمواقع المقدسة",
    celebrations: {
      subtitle: "الأعياد والإيمان واللحظات البهيجة",
      tagline: "تقاليد مختلفة. فرح مشترك واحد.",
      cards: [
        {
          id: "eid",
          title: "عيد الفطر وعيد الأضحى",
          body: "عطلتان رسميتان لمدة 3 و4 أيام. تُقام فيهما صلوات الجماعة والولائم والزيارات. ويُعدّ المسيحيون في أربيل موائد إفطار خلال رمضان تضامناً مع المسلمين.",
          image: eidImg,
          accent: "#7a4a12",
        },
        {
          id: "christmas-easter",
          title: "الميلاد وعيد الفصح",
          body: "عطلتان رسميتان في إقليم كوردستان. يُحتفل بعيد الفصح بتلوين البيض وإعداد كعك العيد التقليدي. ويُحتفل بعيد الميلاد في 25 ديسمبر أو 7 يناير.",
          image: christmasImg,
          accent: "#a05a18",
        },
        {
          id: "yazidi-festivals",
          title: "الأعياد الإيزيدية",
          body: "رأس السنة (الأربعاء الأحمر، أبريل)، وجمايا (6-13 أكتوبر)، وعيد الأربعينية الصيفية (2 أغسطس)، ويوم الإيزي (16 ديسمبر) — جميعها عطل رسمية في الإقليم.",
          image: yazidiFestImg,
          accent: "#b9822d",
        },
        {
          id: "kakai-festival",
          title: "عيد الكاكائيين",
          body: "مهرجان قولتاس — احتفال ديني لثلاثة أيام يُقيمه مجتمع الكاكائيين في شهر ديسمبر.",
          image: kakaiImg,
          accent: "#c58b16",
        },
      ],
    },
    heritage: {
      subtitle: "أماكن تحمل الذاكرة والإيمان",
      tagline: "كل موقع مقدس يروي حكاية.",
      cards: [
        {
          id: "mosques",
          title: "المساجد",
          body: "6,103 مسجداً تشرف عليها وزارة الأوقاف. من بينها مواقع تاريخية كمسجد قلعة أربيل والجامع الكبير في عقرة وجامع جليل خياط.",
          image: mosquesImg,
          accent: "#7a4a12",
        },
        {
          id: "churches-monasteries",
          title: "الكنائس والأديرة",
          body: "دير مار متي على جبل مقلوب، ودير هرمزد في ألقوش، ودير ربان بويا في شقلاوة، وعشرات الكنائس النشطة في أرجاء الإقليم.",
          image: churchesImg,
          accent: "#a05a18",
        },
        {
          id: "lalish-temple",
          title: "معبد لالش",
          body: "القلب الروحي للإيزيدية. يقع في شيخان بدهوك. يضم أضرحة القديسين الإيزيديين وينبوعَين مقدسَين: كانيا سبي وزمزم.",
          image: lalishImg,
          accent: "#b9822d",
        },
        {
          id: "zoroastrian-temples",
          title: "معابد زرادشتية",
          body: "معبد قزقبان الزرادشتي في دوكان بالسليمانية. ومعبد كهف چارستن الزرادشتي في دهوك. مواقع تاريخية تعود إلى ما قبل الإسلام لا تزال قائمة حتى اليوم.",
          image: zoroImg,
          accent: "#c58b16",
        },
      ],
    },
  },
};

const TAB_ORDER = ["celebrations", "heritage"] as const;

const TAB_ICONS: Record<TabId, LucideIcon> = {
  celebrations: MoonStar,
  heritage: Landmark,
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

  const navTabs = React.useMemo(
    () =>
      TAB_ORDER.map((id) => ({
        id,
        icon: TAB_ICONS[id],
        label: id === "celebrations" ? c.celebrationsTab : c.heritageTab,
      })),
    [c],
  );

  // Decode both panels' art up front so switching tabs never pops in.
  usePreloadImages(
    React.useMemo(
      () => [...c.celebrations.cards, ...c.heritage.cards].map((card) => card.image),
      [c],
    ),
  );

  React.useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      gsap.set("[data-sh-hero='true']", { autoAlpha: 0 });
      gsap.set("[data-sh-animate='true']", { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to("[data-sh-hero='true']", {
        autoAlpha: 1,
        duration: 1.2,
      }).to(
        "[data-sh-animate='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.1,
        },
        "-=0.75",
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
          className={`absolute top-1/2 z-30 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border-2 border-[#d9b477] bg-white/80 text-[#5a3a18] shadow-sm ${religionsOverlayStartClassName(dir)}`}
          aria-label={c.back}
        >
          <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
        </button>
      )}

      {onLanguageChange && (
        <button
          type="button"
          onClick={onLanguageChange}
          className={`absolute top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)] ${religionsOverlayEndClassName(dir)}`}
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
          <ReligionsTabNav tabs={navTabs} activeId={activeTab} onChange={setActiveTab} />

          <ReligionsTabPanel
            tabKey={activeTab}
            order={TAB_ORDER}
            dir={dir}
            className="flex flex-1 flex-col"
          >
            {(key) => {
              const panel = key === "celebrations" ? c.celebrations : c.heritage;

              return (
                <>
                  <div data-tab-fx className="mb-6 text-center">
                    <p className="font-serif text-[20px] italic text-[#6a4a25]">
                      {panel.subtitle}
                    </p>
                  </div>

                  <div
                    data-tab-fx-group
                    className="grid w-full flex-1 grid-cols-4 content-stretch gap-5"
                  >
                    {panel.cards.map((card, index) => (
                      <ReligionInfoCard
                        key={card.id}
                        title={card.title}
                        body={card.body}
                        image={card.image}
                        accent={card.accent}
                        accentIndex={index}
                        titleClassName="uppercase"
                        imageHeightClass="min-h-[420px] flex-1"
                        className="min-h-full"
                      />
                    ))}
                  </div>

                  <div
                    data-tab-fx
                    className="mx-auto mt-8 w-full max-w-[920px] shrink-0 rounded-[28px] border-2 border-[#c99745]/55 bg-[#fff7e7]/95 px-8 py-6 text-center shadow-[0_12px_26px_rgba(75,45,12,0.14)]"
                  >
                    <p className="font-serif text-[22px] font-semibold italic leading-snug text-[#6a4a25]">
                      {panel.tagline}
                    </p>
                  </div>
                </>
              );
            }}
          </ReligionsTabPanel>
        </section>
      </div>
    </ReligionsScaledPage>
  );
}
