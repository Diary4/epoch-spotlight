import React from "react";
import gsap from "gsap";
import { ArrowLeft, Sparkles, TreePine } from "lucide-react";

import WomenDetailPanel from "@/components/Sections/women/WomenDetailPanel";

import cultureHero from "@/assets/images/women/c-1.webp";
import imgAysha from "@/assets/images/women/w-10.webp";
import imgPakiza from "@/assets/images/women/w-11.webp";
import imgHana from "@/assets/images/women/w-1.webp";
import imgMaryam from "@/assets/images/women/w-2.webp";
import imgKurdistan from "@/assets/images/women/w-3.webp";
import imgKurdistanMukryani from "@/assets/images/women/kurdistan-mukryani.png";

type LangCode = "ku" | "en" | "ar";
type ListIcon = "crown" | "flower";

type CultureFigureCopy = {
  name: string;
  nameLine1: string;
  nameLine2: string;
  role: string;
  teaser: string;
  knownFor: string;
  placeEra: string;
  quote: string;
};

type CultureFigure = CultureFigureCopy & {
  id: string;
  image: string;
  listIcon: ListIcon;
};

type CulturePageCopy = {
  backToWomen: string;
  backToList: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  heroIntro: string;
  cardKnownFor: string;
  cardPlaceEra: string;
  livingMemoryTitle: string;
  livingMemoryText: string;
};

const pageCopy: Record<LangCode, CulturePageCopy> = {
  en: {
    backToWomen: "Back to Women",
    backToList: "Back to culture list",
    heroTitleLine1: "Women of Culture",
    heroTitleLine2: "and Memory",
    heroSubtitle: "Poetry, oral tradition, and cultural preservation.",
    heroIntro:
      "Not every influential woman left official records. Some live on through song, poetry, oral tradition, and the memory of their communities.",
    cardKnownFor: "Known for",
    cardPlaceEra: "Place & era",
    livingMemoryTitle: "Living memory",
    livingMemoryText:
      "Oral tradition carried Kurdish identity across generations. Where written records were few, women helped preserve memory.",
  },
  ku: {
    backToWomen: "گەڕانەوە بۆ ژنان",
    backToList: "گەڕانەوە بۆ لیستی کولتوور",
    heroTitleLine1: "ژنانی کولتووری",
    heroTitleLine2: "و یادەوەری",
    heroSubtitle: "شیعر، میراتی دەمبێژ، و پاراستنی کولتوور.",
    heroIntro:
      "هەر ژنێکی کاریگەر تۆمارێکی فەرمی نەهێشت. هەندێک لە ڕێگەی گۆرانی، شیعر، میراتی دەمبێژ، و یادەوەی کۆمەڵەکەیان دەژین.",
    cardKnownFor: "ناوبانگی",
    cardPlaceEra: "شوێن و سەردەم",
    livingMemoryTitle: "یادەوەیی زیندوو",
    livingMemoryText:
      "میراتی دەمبێژ ناسنامەی کوردی لە نەوەکان بۆ نەوەکان گواست. لە شوێنێکدا تۆمارە نووسراوەکان کەم بوون، ژنان یارمەتی پاراستنی یادەوەرییان دا.",
  },
  ar: {
    backToWomen: "العودة إلى النساء",
    backToList: "العودة إلى قائمة الثقافة",
    heroTitleLine1: "نساء الثقافة",
    heroTitleLine2: "والذاكرة",
    heroSubtitle: "الشعر، التراث الشفهي، والحفاظ على الثقافة.",
    heroIntro:
      "لم تترك كل امرأة مؤثرة سجلات رسمية. بعضهن يعشن من خلال الأغنية والشعر والتراث الشفهي وذاكرة مجتمعاتهن.",
    cardKnownFor: "اشتهرت بـ",
    cardPlaceEra: "المكان والعصر",
    livingMemoryTitle: "ذاكرة حية",
    livingMemoryText:
      "حمل التراث الشفهي الهوية الكردية عبر الأجيال. حيث كانت السجلات المكتوبة قليلة، ساعدت النساء في حفظ الذاكرة.",
  },
};

const cultureWomenByLang: Record<LangCode, CultureFigure[]> = {
  en: [
    {
      id: "aysha-shan",
      name: "Aysha Shan",
      nameLine1: "Aysha",
      nameLine2: "Shan",
      role: "Voice of Kurdish song",
      teaser:
        "A great artist who, through a voice full of feeling, preserved recognition of her people and care for their future.",
      knownFor: "Keeping a sense of national belonging alive through song.",
      placeEra: "Twentieth century, Kurdistan and the diaspora.",
      quote: "She gave sharp voice to what others wished to silence.",
      image: imgKurdistan,
      listIcon: "flower",
    },
    {
      id: "pakiza-refiq-hilmi",
      name: "Pakiza Refiq Hilmi",
      nameLine1: "Pakiza",
      nameLine2: "Refiq Hilmi",
      role: "Linguist and scholar",
      teaser:
        "A leading intellectual who served Kurdish deeply through language study and the defence of cultural identity.",
      knownFor: "Advancing Kurdish linguistics and literature.",
      placeEra: "Twentieth century, Sulaymaniyah and beyond.",
      quote: "Science and knowledge can preserve identity.",
      image: imgKurdistan,
      listIcon: "crown",
    },
    {
      id: "hana-malan",
      name: "Hana Malan",
      nameLine1: "Hana",
      nameLine2: "Malan",
      role: "Folklore poet",
      teaser:
        "An oral poet who helped Kurdish folklore memory and stories from being lost.",
      knownFor: "Preserving culture through oral poetry.",
      placeEra: "Oral heritage and Kurdish cultural memory.",
      quote: "Before there were books, memory and mind carried the stories.",
      image: imgHana,
      listIcon: "flower",
    },
    {
      id: "maryam-khan",
      name: "Maryam Khan",
      nameLine1: "Maryam",
      nameLine2: "Khan",
      role: "Negotiator and tribal leader",
      teaser:
        "A woman of authority known in an age of war and conflict for her intelligence and diplomacy.",
      knownFor: "Negotiating on behalf of her people in wartime.",
      placeEra: "River region, First World War era.",
      quote: "Authority must speak with the language of wisdom.",
      image: imgKurdistan,
      listIcon: "crown",
    },
    {
      id: "kurdistan-mukriani",
      name: "Dr. Kurdistan Mukriani",
      nameLine1: "Kurdistan",
      nameLine2: "Mukriani",
      role: "Linguist and academic",
      teaser:
        "A leading scholar who devoted her life to scientific inquiry and the defence of the Kurdish language.",
      knownFor: "Defending Kurdish through academic research and teaching.",
      placeEra: "Twentieth century, Kurdistan and Moscow.",
      quote: "Language is the identity of a people.",
      image: imgKurdistanMukryani,
      listIcon: "crown",
    },
  ],
  ku: [
    {
      id: "aysha-shan",
      name: "ئایشێ شان",
      nameLine1: "ئایشێ",
      nameLine2: "شان",
      role: "دەنگی گۆرانیی کوردی",
      teaser:
        "هونەرمەندێکی مەزن بوو کە بە دەنگە پڕ لە سۆزەکەی شوناس و خەمی نەتەوەکەی پاراست.",
      knownFor: "زیندووڕاگرتنی هەستی نەتەوایەتی لە ڕێگەی گۆرانییەوە.",
      placeEra: "سەدەی بیستەم، کوردستان و تاراوگە.",
      quote: "ئەو وشانەی چڕی کە ئەوانی تر دەیانویست بێدەنگی بکەن.",
      image: imgAysha,
      listIcon: "flower",
    },
    {
      id: "pakiza-refiq-hilmi",
      name: "پاکیزە ڕەفیق حیلمی",
      nameLine1: "پاکیزە",
      nameLine2: "ڕەفیق حیلمی",
      role: "زمانناس و زانا",
      teaser:
        "ڕۆشنبیرێکی پێشەنگ بوو کە خزمەتێکی زۆری بە لێکۆڵینەوەی زمان و پاراستنی شوناسی کولتووری کرد.",
      knownFor: "پەرەپێدانی زمانەوانی و ئەدەبیاتی کوردی.",
      placeEra: "سەدەی بیستەم، سلێمانی و دەرەوە.",
      quote: "زانست و زانین دەتوانێت شوناس بپارێزێت.",
      image: imgPakiza,
      listIcon: "crown",
    },
    {
      id: "hana-malan",
      name: "هانا مالان",
      nameLine1: "هانا",
      nameLine2: "ماالن",
      role: "شاعیری فۆلکلۆر",
      teaser:
        "شاعیرێکی دەمبێژ بوو کە یادەوەری و چیرۆکە فۆلکلۆرییەکانی کوردستانی لە فەوتان پاراست.",
      knownFor: "پاراستنی کولتوور لە ڕێگەی شیعری زارەکییەوە.",
      placeEra: "میراتی زارەکی و یادەوەریی کولتووری کوردی.",
      quote: "پێش ئەوەی کتێب هەبێت، یادە و هزر هەڵگری چیرۆکەکان بوون.",
      image: imgHana,
      listIcon: "flower",
    },
    {
      id: "maryam-khan",
      name: "مەریەم خان",
      nameLine1: "مەریەم",
      nameLine2: "خان",
      role: "دانوستانکار و سەرکردەی هۆز",
      teaser:
        "ژنێکی خاوەن دەسەڵات بوو کە بە ژیری و دیپلۆماسییەتەکەی لە سەردەمی جەنگ و ململانێدا ناسراو بوو.",
      knownFor: "دانوستان بەناوی گەلەکەیەوە لە کاتی جەنگدا.",
      placeEra: "ناوچەی نەهری، سەردەمی جەنگی جیهانی یەکەم.",
      quote: "پێویستە دەسەڵات بە زمانی ژیری بدوێت.",
      image: imgMaryam,
      listIcon: "crown",
    },
    {
      id: "kurdistan-mukriani",
      name: "د. کوردستان موکریانی",
      nameLine1: "کوردستان",
      nameLine2: "موکریانی",
      role: "زمانناس و ئەکادیمی",
      teaser:
        "زانایەکی پێشەنگ بوو کە ژیانی خۆی بەخشی بە لێکۆڵینەوەی زانستی و پاراستنی زمانی کوردی.",
      knownFor: "داکۆکیکردن لە زمانی کوردی لە ڕێگەی توێژینەوەی ئەکادیمی و وانەوتنەوە.",
      placeEra: "سەدەی بیستەم، کوردستان و مۆسکۆ.",
      quote: "زمان شوناسی نەتەوەیە.",
      image: imgKurdistanMukryani,
      listIcon: "crown",
    },
  ],
  ar: [
    {
      id: "aysha-shan",
      name: "عائشة شان",
      nameLine1: "عائشة",
      nameLine2: "شان",
      role: "صوت الأغنية الكردية",
      teaser:
        "فنانة عظيمة حفظت من خلال صوت مليء بالشعور هوية شعبها واهتمامها بمستقبله.",
      knownFor: "إبقاء الإحساس بالانتماء الوطني حياً من خلال الغناء.",
      placeEra: "القرن العشرون، كردستان والشتات.",
      quote: "أعطت صوتاً حاداً لما أراد الآخرون إسكاته.",
      image: imgAysha,
      listIcon: "flower",
    },
    {
      id: "pakiza-refiq-hilmi",
      name: "باكيزا رفيق حلمي",
      nameLine1: "باكيزا",
      nameLine2: "رفيق حلمي",
      role: "لغوية وباحثة",
      teaser:
        "مثقفة رائدة خدمت اللغة الكردية بعمق من خلال دراسة اللغة والدفاع عن الهوية الثقافية.",
      knownFor: "تطوير اللغويات والأدب الكردي.",
      placeEra: "القرن العشرون، السليمانية وما وراءها.",
      quote: "العلم والمعرفة يمكنهما أن يحفظا الهوية.",
      image: imgPakiza,
      listIcon: "crown",
    },
    {
      id: "hana-malan",
      name: "حنا مالان",
      nameLine1: "حنا",
      nameLine2: "مالان",
      role: "شاعرة الفولكلور",
      teaser:
        "شاعرة شفوية ساعدت في حماية ذاكرة الفولكلور الكردي وقصصه من الضياع.",
      knownFor: "الحفاظ على الثقافة من خلال الشعر الشفهي.",
      placeEra: "التراث الشفهي والذاكرة الثقافية الكردية.",
      quote: "قبل وجود الكتب، حملت الذاكرة والعقل القصص.",
      image: imgHana,
      listIcon: "flower",
    },
    {
      id: "maryam-khan",
      name: "مريم خان",
      nameLine1: "مريم",
      nameLine2: "خان",
      role: "مفاوضة وقائدة قبيلة",
      teaser:
        "امرأة ذات سلطة عُرفت في عصر الحرب والصراع بذكائها ودبلوماسيتها.",
      knownFor: "التفاوض نيابة عن شعبها في وقت الحرب.",
      placeEra: "منطقة الأنهار، عصر الحرب العالمية الأولى.",
      quote: "يجب أن تتحدث السلطة بلغة الحكمة.",
      image: imgMaryam,
      listIcon: "crown",
    },
    {
      id: "kurdistan-mukriani",
      name: "د. كردستان مكراني",
      nameLine1: "كردستان",
      nameLine2: "مكراني",
      role: "لغوية وأكاديمية",
      teaser:
        "باحثة رائدة كرّست حياتها للبحث العلمي والدفاع عن اللغة الكردية.",
      knownFor: "الدفاع عن الكردية من خلال البحث الأكاديمي والتدريس.",
      placeEra: "القرن العشرون، كردستان وموسكو.",
      quote: "اللغة هي هوية الشعب.",
      image: imgKurdistanMukryani,
      listIcon: "crown",
    },
  ],
};

type CulturePageProps = {
  lang?: LangCode;
  onBack?: () => void;
  languageLabel?: string;
  onLanguageChange?: () => void;
};

function runCultureListIntro(sectionRef: React.RefObject<HTMLElement | null>) {
  if (!sectionRef.current) return () => {};
  const ctx = gsap.context(() => {
    gsap.set("[data-culture-fade='true']", { autoAlpha: 0, y: 28 });
    gsap.set("[data-culture-hero='true']", { autoAlpha: 0, scale: 1.04 });
    gsap.set("[data-culture-card='true']", {
      autoAlpha: 0,
      y: 35,
      rotateX: -8,
      transformOrigin: "center top",
    });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.to("[data-culture-hero='true']", { autoAlpha: 1, scale: 1, duration: 1.2 })
      .to("[data-culture-fade='true']", { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 }, "-=0.7")
      .to(
        "[data-culture-card='true']",
        { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.85, stagger: 0.1 },
        "-=0.35",
      );
  }, sectionRef);
  return () => ctx.revert();
}

function runCultureDetailIntro(sectionRef: React.RefObject<HTMLElement | null>) {
  if (!sectionRef.current) return () => {};
  const ctx = gsap.context(() => {
    gsap.set("[data-women-detail-fade='true']", { autoAlpha: 0, y: 18 });
    gsap.timeline({ defaults: { ease: "power2.out" } }).to("[data-women-detail-fade='true']", {
      autoAlpha: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.08,
    });
  }, sectionRef);
  return () => ctx.revert();
}

export default function WomenCultureMemoryPage({
  lang: langProp = "en",
  onBack,
  languageLabel,
  onLanguageChange,
}: CulturePageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const lang: LangCode =
    langProp === "en" || langProp === "ku" || langProp === "ar" ? langProp : "en";
  const copy = pageCopy[lang];
  const cultureWomen = cultureWomenByLang[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  const selected = selectedId ? cultureWomen.find((w) => w.id === selectedId) ?? null : null;

  React.useLayoutEffect(() => {
    const cleanup = selected ? runCultureDetailIntro(sectionRef) : runCultureListIntro(sectionRef);
    return cleanup;
  }, [selectedId]);

  const handleBack = () => {
    if (selectedId) setSelectedId(null);
    else onBack?.();
  };

  const detailCards = (w: CultureFigure) => [
    { icon: "✦", title: copy.cardKnownFor, text: w.knownFor },
    { icon: "⛩", title: copy.cardPlaceEra, text: w.placeEra },
  ];

  return (
    <main
      dir={dir}
      className={`m-0 flex w-screen flex-col justify-start p-0 ${
        selectedId ? "min-h-min bg-[#f7efe3] text-[#2d1436]" : "min-h-screen bg-[#f9f3e8] text-[#2a1534]"
      }`}
    >
      <section
        ref={sectionRef}
        className={`relative flex w-[min(100vw,1400px)] flex-col overflow-x-hidden overflow-y-auto ${
          selectedId ? "min-h-min bg-transparent" : "min-h-screen bg-[#fcf7ef]"
        }`}
      >
        <button
          type="button"
          onClick={handleBack}
          className={`absolute top-4 z-50 grid h-12 w-12 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#2c1337] shadow-sm backdrop-blur-sm transition-all hover:bg-white sm:top-8 sm:h-14 sm:w-14 ${
            dir === "rtl" ? "right-4 sm:right-8" : "left-4 sm:left-8"
          }`}
          aria-label={selectedId ? copy.backToList : copy.backToWomen}
        >
          <ArrowLeft className={`h-6 w-6 sm:h-7 sm:w-7 ${dir === "rtl" ? "rotate-180" : ""}`} />
        </button>

        {onLanguageChange && languageLabel && (
          <button
            type="button"
            onClick={onLanguageChange}
            className={`absolute top-4 z-50 rounded-full border-2 border-[#d9b477] bg-white/80 px-4 py-2 font-serif text-sm text-[#2c1337] shadow-sm backdrop-blur-sm transition hover:bg-white sm:top-8 sm:px-5 sm:py-2.5 sm:text-base ${
              dir === "rtl" ? "left-4 sm:left-8" : "right-4 sm:right-8"
            }`}
          >
            {languageLabel}
          </button>
        )}

        {selected ? (
          <WomenDetailPanel
            dir={dir}
            nameLine1={selected.nameLine1}
            nameLine2={selected.nameLine2}
            role={selected.role}
            intro={selected.teaser}
            portraitSrc={selected.image}
            portraitAlt={selected.name}
            cards={detailCards(selected)}
            quote={selected.quote}
            listIcon={selected.listIcon}
          />
        ) : (
          <>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_6%,rgba(205,143,151,0.15),transparent_30%),radial-gradient(circle_at_20%_48%,rgba(212,185,143,0.12),transparent_32%)]" />

            <section
              data-culture-hero="true"
              className="relative z-10 min-h-0 overflow-hidden pb-[clamp(200px,42vh,420px)] text-center sm:min-h-[720px] sm:pb-[clamp(260px,38vh,480px)] lg:min-h-[960px] lg:pb-0"
            >
              <div
                data-culture-fade="true"
                className="relative z-20 mx-auto max-w-[900px] px-3 pt-16 sm:px-4 sm:pt-20 lg:pt-14"
              >

                <div className="mx-auto mb-5 flex w-full max-w-[300px] items-center justify-center gap-3 text-[#b4864d] sm:mb-6">
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                  <Sparkles className="h-6 w-6 sm:h-8 sm:w-8" />
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                </div>

                <h1 className="font-serif text-[clamp(34px,8vw,80px)] font-medium leading-[1.05] tracking-tight text-[#2c1337]">
                  {copy.heroTitleLine1}
                  <br />
                  {copy.heroTitleLine2}
                </h1>

                <h2 className="mx-auto mt-5 max-w-[640px] font-serif text-[clamp(17px,3.8vw,28px)] italic leading-snug text-[#a75a69] sm:mt-8">
                  {copy.heroSubtitle}
                </h2>

                <div className="mx-auto my-5 flex w-full max-w-[270px] items-center justify-center gap-3 text-[#b4864d] sm:my-7">
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                  <span className="h-3 w-3 rotate-45 bg-[#b4864d]" />
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                </div>

                <p className="mx-auto max-w-[680px] text-[clamp(15px,3.4vw,20px)] leading-relaxed text-[#55505a]">
                  {copy.heroIntro}
                </p>
              </div>

              <img
                src={cultureHero}
                alt=""
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto h-[clamp(220px,48vh,820px)] w-full max-w-[100vw] object-cover object-bottom sm:h-[clamp(320px,45vh,720px)] lg:h-[820px] lg:w-screen"
              />
            </section>

            <section className="relative z-20 mt-2 grid grid-cols-1 gap-5 px-5 pb-6 sm:grid-cols-2 sm:gap-6 lg:mt-4 lg:grid-cols-3 lg:px-10">
              {cultureWomen.map((woman) => (
                <button
                  type="button"
                  data-culture-card="true"
                  key={woman.id}
                  onClick={() => setSelectedId(woman.id)}
                  className={`relative flex cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[#dfcdb7] bg-white/65 p-4 shadow-[0_10px_25px_rgba(67,35,45,0.12)] transition hover:border-[#d8b979] sm:p-5 ${
                    dir === "rtl" ? "text-right" : "text-left"
                  }`}
                >
                  <div className="relative mx-auto h-[200px] w-full max-w-[280px] overflow-hidden rounded-[20px] sm:h-[240px] sm:max-w-none">
                    <img
                      src={woman.image}
                      alt={woman.name}
                      className="relative z-10 h-full w-full object-cover object-[center_20%]"
                    />
                  </div>

                  <h3 className="mt-3 font-serif text-[clamp(20px,4vw,30px)] leading-tight text-[#2c1736] sm:mt-4">
                    {woman.name}
                  </h3>

                  <p className="mt-2 font-serif text-[clamp(14px,2.8vw,19px)] italic text-[#a75a69]">
                    ({woman.role})
                  </p>

                  <div className="my-3 flex w-24 items-center gap-2 text-[#b4864d]">
                    <span className="h-px flex-1 bg-[#d4b98f]" />
                    <Sparkles className="h-4 w-4" />
                    <span className="h-px flex-1 bg-[#d4b98f]" />
                  </div>

                  <p
                    className={`text-[14px] leading-relaxed text-[#4a3f50] sm:text-[15px] ${
                      dir === "rtl" ? "text-right" : "text-left"
                    }`}
                  >
                    {woman.teaser}
                  </p>
                </button>
              ))}
            </section>

            <section
              data-culture-fade="true"
              className="relative z-20 mx-5 mb-8 mt-4 flex min-h-0 flex-col items-stretch gap-4 overflow-hidden rounded-[20px] border border-[#dfcdb7] bg-white/60 px-4 py-5 shadow-[0_8px_22px_rgba(67,35,45,0.1)] sm:mx-10 sm:mb-10 sm:flex-row sm:items-center sm:gap-6 sm:rounded-[28px] sm:px-8 sm:py-6 lg:px-12"
            >
              <div className="mx-auto grid h-20 w-20 shrink-0 place-items-center rounded-full border border-[#dfcdb7] bg-[#fff7ef] sm:mx-0 sm:h-24 sm:w-24 lg:h-28 lg:w-28">
                <TreePine className="h-12 w-12 fill-[#4b183c]/10 text-[#4b183c] sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
              </div>

              <div className={`min-w-0 flex-1 text-center ${dir === "rtl" ? "sm:text-right" : "sm:text-left"}`}>
                <h2 className="font-serif text-[clamp(26px,5vw,40px)] leading-none text-[#2c1736]">
                  {copy.livingMemoryTitle}
                </h2>

                <div className="mx-auto my-3 flex w-full max-w-[250px] items-center gap-3 text-[#b4864d] sm:mx-0 sm:my-4">
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                  <Sparkles className="h-5 w-5" />
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                </div>

                <p className="max-w-[850px] text-[clamp(14px,3.2vw,19px)] leading-relaxed text-[#4f4a55]">
                  {copy.livingMemoryText}
                </p>
              </div>

              <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-[120px] opacity-20 bg-[repeating-linear-gradient(45deg,#b76e83_0_2px,transparent_2px_16px)] sm:block sm:w-[200px] lg:w-[270px] lg:opacity-25" />
            </section>
          </>
        )}
      </section>
    </main>
  );
}
