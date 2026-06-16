import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  Church,
  Egg,
  Flame,
  Globe2,
  Landmark,
  MoonStar,
  Mountain,
  Music,
} from "lucide-react";

import bg from "@/assets/images/religions/nl-1.webp";
import bg2 from "@/assets/images/religions/r-3.webp";

type LangCode = "en" | "ku" | "ar";

type SharedCard = {
  id: string;
  title: string;
  body: string;
  icon: typeof Mountain;
  accent: string;
};

type SharedGroup = {
  id: string;
  title: string;
  subtitle: string;
  cards: SharedCard[];
  tagline: string;
};

type SharedContent = {
  back: string;
  pageTitle: string;
  pageDescription: string;
  groups: [SharedGroup, SharedGroup];
};

const content: Record<LangCode, SharedContent> = {
  en: {
    back: "Back",
    pageTitle: "Shared Life",
    pageDescription:
      "Festivals that bring us together and sacred places that hold our shared memory.",
    groups: [
      {
        id: "shared-celebrations",
        title: "Shared Celebrations",
        subtitle: "Festivals, faith, and joyful moments",
        cards: [
          {
            id: "eid",
            title: "Eid Al-Fitr & Eid Al-Adha",
            body: "Official 3 and 4-day holidays. Celebrated with communal prayers, feasts, and visits. Christians in Erbil prepare iftar tables during Ramadan in solidarity with Muslims.",
            icon: MoonStar,
            accent: "#7a4a12",
          },
          {
            id: "christmas-easter",
            title: "Christmas & Easter",
            body: "Official public holidays in the Kurdistan Region. Easter celebrated with egg coloring and special Easter bread (ka'k). Christmas celebrated December 25 or January 7.",
            icon: Egg,
            accent: "#a05a18",
          },
          {
            id: "yazidi-festivals",
            title: "Yazidi Festivals",
            body: "New Year (Red Wednesday, April), Jemai (October 6–13), Summer Forty Days (August 2), Day of Êzî (December 16) — all official holidays in the Kurdistan Region.",
            icon: Flame,
            accent: "#b9822d",
          },
          {
            id: "kakai-festival",
            title: "Kakai Festival",
            body: "Qewltas Festival — a three-day religious festival observed in December by the Kakai community.",
            icon: Music,
            accent: "#c58b16",
          },
        ],
        tagline: "Different traditions. One shared joy.",
      },
      {
        id: "heritage-sacred-sites",
        title: "Heritage & Sacred Sites",
        subtitle: "Places that hold memory and faith",
        cards: [
          {
            id: "mosques",
            title: "Mosques",
            body: "6,103 mosques supervised by the Ministry of Endowments. Including historic sites such as the Erbil Citadel Mosque, Grand Mosque of Akre, and Jalil Khayat Mosque.",
            icon: Landmark,
            accent: "#7a4a12",
          },
          {
            id: "churches-monasteries",
            title: "Churches & Monasteries",
            body: "Mar Mattai Monastery on Mount Maqlub, Monastery of Hormizd in Alqosh, Rabban Boya Monastery in Shaqlawa, and dozens of active churches across the region.",
            icon: Church,
            accent: "#a05a18",
          },
          {
            id: "lalish-temple",
            title: "Lalish Temple",
            body: "The sacred heart of Yazidism. Located in Shekhan, Duhok. Contains the tombs of Yazidi saints and two sacred springs: Kaniya Spi and Zamzam.",
            icon: Mountain,
            accent: "#b9822d",
          },
          {
            id: "zoroastrian-temples",
            title: "Zoroastrian Temples",
            body: "Qazkapan Zoroastrian Temple in Dukan, Sulaymaniyah. Charsten Cave Zoroastrian Temple in Duhok. Ancient sites of pre-Islamic Kurdistan still standing today.",
            icon: Flame,
            accent: "#c58b16",
          },
        ],
        tagline: "Every sacred place tells a story.",
      },
    ],
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "ژیانی هاوبەش",
    pageDescription:
      "جەژنەکانی پێکمان دەگەیەنن و شوێنە پیرۆزەکانی یادی هاوبەشمان دەپارێزن.",
    groups: [
      {
        id: "shared-celebrations",
        title: "جەژنە هاوبەشەکان",
        subtitle: "جەژن، باوەڕ، و کاتە خۆشەکان",
        cards: [
          {
            id: "eid",
            title: "جەژنی ڕەمەزان و قوربان",
            body: "پشووی فەرمی ٣ و ٤ ڕۆژە. بە نوێژی کۆمەڵگە، خوان، و سەردانی پێکدێن. مەسیحیەکانی هەولێر لە ڕەمەزاندا خوانی فتاری بۆ موسوڵمانان ئامادە دەکەن.",
            icon: MoonStar,
            accent: "#7a4a12",
          },
          {
            id: "christmas-easter",
            title: "کریسمەس و عەید پاسکا",
            body: "پشووی فەرمیی هەرێمی کوردستانن. عەید پاسکا بە ڕەنگکردنی هێلکە و نانی تایبەتی (کاک) دەکرێت. کریسمەس لە ٢٥ی کانوونی یەکەم یان ٧ی کانوونی دووەم.",
            icon: Egg,
            accent: "#a05a18",
          },
          {
            id: "yazidi-festivals",
            title: "جەژنە ئێزدییەکان",
            body: "سەری سال (چوارشەممەی سوور، نیسان)، جەماعی (٦–١٣ تشرینی یەکەم)، چلەی هاوین (٢ی ئاب)، ڕۆژی ئێزی (١٦ی کانوونی یەکەم) — هەموو پشووی فەرمین لە هەرێمی کوردستان.",
            icon: Flame,
            accent: "#b9822d",
          },
          {
            id: "kakai-festival",
            title: "جەژنی کاکەیی",
            body: "جەژنی قەولتاس — جەژنێکی ئاینیی سێ ڕۆژەیە کە کاکەییەکان لە کانوونی یەکەم بەرپای دەکەن.",
            icon: Music,
            accent: "#c58b16",
          },
        ],
        tagline: "نەریتی جیاواز. خۆشییەکی هاوبەش.",
      },
      {
        id: "heritage-sacred-sites",
        title: "میرات و شوێنە پیرۆزەکان",
        subtitle: "شوێنانێک کە یاد و باوەڕیان تێدایە",
        cards: [
          {
            id: "mosques",
            title: "مزگەوتەکان",
            body: "٦,١٠٣ مزگەوت لەژێر چاودێریی وەزارەتی ئەوقاف. لەناویاندا شوێنە مێژووییەکانی وەک مزگەوتی قەڵای هەولێر، مزگەوتی گەورەی ئاکرێ، و مزگەوتی جەلیل خەیات.",
            icon: Landmark,
            accent: "#7a4a12",
          },
          {
            id: "churches-monasteries",
            title: "کڵێسا و دێرەکان",
            body: "دێری مار مەتای لە چیای مەقلوب، دێری هرمزد لە ئالقۆش، دێری ڕابان بۆیا لە شەقڵاوە، و دەیان کڵێسای چالاک بەسەر هەرێمەکەدا.",
            icon: Church,
            accent: "#a05a18",
          },
          {
            id: "lalish-temple",
            title: "پەرستگای لالش",
            body: "دڵە پیرۆزی ئێزدیەتی. لە شێخان، دهۆک. تورباتی پیرۆزانی ئێزدی و دوو کانیی پیرۆز: کانیا سپی و زەمزەم لەخۆ دەگرێت.",
            icon: Mountain,
            accent: "#b9822d",
          },
          {
            id: "zoroastrian-temples",
            title: "پەرستگاکانی زەردەشتی",
            body: "پەرستگای زەردەشتیی قازکەپان لە دۆکان، سلێمانی. پەرستگای ئەشکەوتی چارستێن لە دهۆک. شوێنە کۆنەکانی پێش-ئیسلامیی کوردستان هێشتا ماون.",
            icon: Flame,
            accent: "#c58b16",
          },
        ],
        tagline: "هەر شوێنێکی پیرۆز چیرۆکێکی هەیە.",
      },
    ],
  },
  ar: {
    back: "العودة",
    pageTitle: "الحياة المشتركة",
    pageDescription:
      "أعياد تجمعنا وأماكن مقدّسة تحفظ ذاكرتنا المشتركة.",
    groups: [
      {
        id: "shared-celebrations",
        title: "احتفالات مشتركة",
        subtitle: "أعياد وإيمان ولحظات فرح",
        cards: [
          {
            id: "eid",
            title: "عيد الفطر وعيد الأضحى",
            body: "عطل رسمية لمدة ٣ و٤ أيام. تُحتفل بالصلوات الجماعية والولائم والزيارات. يُعدّ المسيحيون في أربيل موائد الإفطار في رمضان تضامناً مع المسلمين.",
            icon: MoonStar,
            accent: "#7a4a12",
          },
          {
            id: "christmas-easter",
            title: "عيد الميلاد وعيد الفصح",
            body: "عطل رسمية في إقليم كوردستان. يُحتفل بعيد الفصح بتلوين البيض وخبز الكعك (ka'k). يُحتفل بعيد الميلاد في ٢٥ ديسمبر أو ٧ يناير.",
            icon: Egg,
            accent: "#a05a18",
          },
          {
            id: "yazidi-festivals",
            title: "الأعياد الإيزيدية",
            body: "رأس السنة (الأربعاء الأحمر، نيسان)، الجماعية (٦–١٣ تشرين الأول)، أربعينية الصيف (٢ آب)، يوم إيزي (١٦ كانون الأول) — كلها أعياد رسمية في إقليم كوردستان.",
            icon: Flame,
            accent: "#b9822d",
          },
          {
            id: "kakai-festival",
            title: "العيد الكاكائي",
            body: "عيد القولتاس — عيد ديني يستمر ثلاثة أيام في كانون الأول لدى الطائفة الكاكائية.",
            icon: Music,
            accent: "#c58b16",
          },
        ],
        tagline: "تقاليد مختلفة. فرحة واحدة مشتركة.",
      },
      {
        id: "heritage-sacred-sites",
        title: "التراث والمواقع المقدسة",
        subtitle: "أماكن تحمل الذاكرة والإيمان",
        cards: [
          {
            id: "mosques",
            title: "المساجد",
            body: "٦,١٠٣ مساجد تشرف عليها وزارة الأوقاف. تشمل مواقع تاريخية كجامع قلعة أربيل، والجامع الكبير في عقرة، وجامع جليل خياط.",
            icon: Landmark,
            accent: "#7a4a12",
          },
          {
            id: "churches-monasteries",
            title: "الكنائس والأديرة",
            body: "دير مار متى في جبل مقلوب، دير هرمز في القوش، دير ربان بويا في شقلاوة، وعشرات الكنائس النشطة في أنحاء الإقليم.",
            icon: Church,
            accent: "#a05a18",
          },
          {
            id: "lalish-temple",
            title: "معبد لالش",
            body: "القلب المقدس للإيزيدية. يقع في شيخان، دهوك. يضم أضرحة قديسي الإيزيدية ونبعَين مقدّسَين: كانيا سبي وزمزم.",
            icon: Mountain,
            accent: "#b9822d",
          },
          {
            id: "zoroastrian-temples",
            title: "المعابد الزرادشتية",
            body: "معبد قازقابان الزرادشتي في دوكان، السليمانية. معبد كهف چارستێن الزرادشتي في دهوك. مواقع قديمة لكوردستان ما قبل الإسلام لا تزال قائمة.",
            icon: Flame,
            accent: "#c58b16",
          },
        ],
        tagline: "كل مكان مقدس يحكي قصة.",
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
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-sh-hero='true']", { autoAlpha: 0, scale: 1.04 });
      gsap.set("[data-sh-animate='true']", { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline();
      tl.to("[data-sh-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        "[data-sh-animate='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <main
      dir={dir}
      className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative w-full overflow-x-hidden bg-[#fbf1df] px-6 pb-20 pt-10 sm:px-12 lg:px-20"
      >
        <img
          data-sh-hero="true"
          src={bg}
          alt=""
          className="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#fbf1df]/72 via-[#fbf1df]/30 to-[#f4dfbb]/95" />

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/80 text-[#5a3a18] shadow-sm transition"
            aria-label={c.back}
          >
            <ArrowLeft className="h-7 w-7" />
          </button>
        )}

        {onLanguageChange && (
          <button
            type="button"
            onClick={onLanguageChange}
            className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)] transition"
          >
            <Globe2 className="h-5 w-5" />
            {languageLabel}
          </button>
        )}

        <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col">
          <header
            data-sh-animate="true"
            className="mx-auto max-w-[850px] pt-14 text-center"
          >
            <div className="mx-auto mb-3 w-[260px]">
              <DecorativeLine color="#c3923a" />
            </div>
            <h1 className="font-serif text-[56px] font-semibold uppercase leading-[1.04] tracking-[0.04em] text-[#3b2410] sm:text-[76px] lg:text-[88px]">
              {c.pageTitle}
            </h1>
            <div className="mx-auto mt-5 w-[180px]">
              <DecorativeLine color="#c3923a" />
            </div>
            <p className="mx-auto mt-5 max-w-[620px] text-[19px] font-semibold leading-relaxed text-[#4d3c2a] sm:text-[22px]">
              {c.pageDescription}
            </p>
          </header>

          {c.groups.map((group) => (
            <section
              key={group.id}
              data-sh-animate="true"
              className="mt-24 first:mt-20"
              aria-labelledby={`sh-group-${group.id}`}
            >
              <div className="mx-auto max-w-[860px] text-center">
                <h2
                  id={`sh-group-${group.id}`}
                  className="font-serif text-[36px] font-semibold uppercase leading-tight tracking-[0.04em] text-[#3b2410] sm:text-[48px]"
                >
                  {group.title}
                </h2>
                <div className="mx-auto mt-4 w-[200px]">
                  <DecorativeLine color="#c3923a" />
                </div>
                <p className="mx-auto mt-4 max-w-[640px] font-serif text-[18px] italic text-[#6a4a25] sm:text-[20px]">
                  {group.subtitle}
                </p>
              </div>

              <div className="mx-auto mt-10 grid w-full max-w-[1180px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {group.cards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <article
                      key={card.id}
                      className="group relative flex flex-col overflow-x-hidden rounded-[24px] border-2 border-[#f3dfb5] bg-white/90 shadow-[0_16px_32px_rgba(69,43,14,0.18)] transition"
                    >
                      <div
                        className="relative h-[120px] w-full"
                        style={{
                          background: `linear-gradient(135deg, ${card.accent} 0%, ${card.accent}cc 100%)`,
                        }}
                      >
                        <div
                          className="pointer-events-none absolute inset-0 opacity-[0.18]"
                          style={{
                            backgroundImage: `url(${bg2})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            mixBlendMode: "overlay",
                          }}
                        />
                        <div className="absolute inset-x-0 top-5 flex items-center justify-end px-6">
                          <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-white/40 bg-white/15 backdrop-blur-sm">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col px-6 py-6">
                        <h3 className="font-serif text-[20px] font-semibold uppercase leading-tight text-[#3b2410] sm:text-[22px]">
                          {card.title}
                        </h3>
                        <div className="mt-3 mb-4 w-[60px]">
                          <span
                            className="block h-[2px]"
                            style={{ backgroundColor: card.accent }}
                          />
                        </div>
                        <p className="text-[15px] font-medium leading-relaxed text-[#4d3c2a]">
                          {card.body}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mx-auto mt-10 max-w-[860px] rounded-[20px] border-2 border-[#c99745]/55 bg-[#fff7e7]/95 px-7 py-5 text-center shadow-[0_12px_26px_rgba(75,45,12,0.14)]">
                <p className="font-serif text-[17px] font-semibold italic leading-snug text-[#6a4a25] sm:text-[19px]">
                  {group.tagline}
                </p>
              </div>
            </section>
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-[#b9893d]/20 to-transparent" />
      </section>
    </main>
  );
}
