import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  Globe2,
  Mountain,
  Star,
  Cross,
  Sun,
  Shield,
  Award,
  Crown,
  BookOpen,
  Quote,
} from "lucide-react";

import bg from "@/assets/images/religions/r-1.png";
import bg2 from "@/assets/images/religions/r-3.png";

type LangCode = "en" | "ku" | "ar";

type SlideCard = {
  id: string;
  number: number;
  title: string;
  body: string;
  icon: typeof Mountain;
  accent: string;
  isQuote?: boolean;
};

type Slide = {
  id: string;
  number: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: SlideCard[];
  tagline: string;
};

type HistoryContent = {
  back: string;
  sectionLabel: string;
  pageTitle: string;
  pageDescription: string;
  cardLabel: string;
  slides: [Slide, Slide];
};

const content: Record<LangCode, HistoryContent> = {
  en: {
    back: "Back",
    sectionLabel: "Section 2",
    pageTitle: "History",
    pageDescription:
      "Two slides tracing how Kurdistan became a homeland of refuge and a legacy of coexistence.",
    cardLabel: "Card",
    slides: [
      {
        id: "land-of-refuge",
        number: 3,
        eyebrow: "Slide 3",
        title: "A Land of Refuge",
        subtitle: "Where threatened peoples always found safety",
        cards: [
          {
            id: "ancient-roots",
            number: 1,
            title: "Ancient Roots",
            body: "Religions including Mithraism, Judaism, Zoroastrianism, Christianity, Yazidism, and Islam all flourished here since ancient times.",
            icon: Mountain,
            accent: "#7a4a12",
          },
          {
            id: "jewish-community",
            number: 2,
            title: "Jewish Community",
            body: "Jews settled in Kurdistan in the 6th century BCE and chose to remain because they found Kurds exceptionally tolerant.",
            icon: Star,
            accent: "#2a3550",
          },
          {
            id: "christians",
            number: 3,
            title: "Christians",
            body: "Christianity reached Erbil in the 1st century CE through Apostles Addai and Mari. Erbil became a major Christian center by the 3rd century.",
            icon: Cross,
            accent: "#244b1f",
          },
          {
            id: "bahaullah",
            number: 4,
            title: "Bahá'u'lláh",
            body: "Founder of the Baha'i Faith chose Kurdistan for seclusion, describing it as \u201Cthe happiest days of his life.\u201D",
            icon: Sun,
            accent: "#a05a14",
          },
        ],
        tagline:
          "Stability and peace made Kurdistan a sanctuary through the ages.",
      },
      {
        id: "leaders-of-coexistence",
        number: 4,
        eyebrow: "Slide 4",
        title: "Leaders of Coexistence",
        subtitle: "A legacy of protection and brotherhood",
        cards: [
          {
            id: "abdul-salam-barzani",
            number: 1,
            title: "Sheikh Abdul Salam Barzani",
            body: "Known as \u201CSheikh of the Christians.\u201D Opposed calls for jihad against Christians. Christians sheltered him when the Ottoman state sought his arrest.",
            icon: Shield,
            accent: "#3a2f12",
          },
          {
            id: "mustafa-barzani",
            number: 2,
            title: "Mullah Mustafa Barzani",
            body: "Declared: \u201CThe Jews are very dear to me, and anyone who causes them trouble will be punished by me.\u201D",
            icon: Award,
            accent: "#52351a",
            isQuote: true,
          },
          {
            id: "ahmed-barzani",
            number: 3,
            title: "Sheikh Ahmed Barzani",
            body: "Sent 200 fighters to aid Armenians against the Ottomans, resulting in 14 casualties defending Armenian families.",
            icon: Crown,
            accent: "#6b3a1a",
          },
          {
            id: "masoud-barzani",
            number: 4,
            title: "Masoud Barzani",
            body: "\u201CThe Yazidis enjoyed the same security under the revolution as they had never seen before. Christians responded with loyalty and sacrifice.\u201D",
            icon: BookOpen,
            accent: "#5a3a18",
            isQuote: true,
          },
        ],
        tagline:
          "Coexistence was never a law here. It was always a value.",
      },
    ],
  },
  ku: {
    back: "گەڕانەوە",
    sectionLabel: "بەشی ٢",
    pageTitle: "مێژوو",
    pageDescription:
      "دوو سلاید کە چۆن کوردستان بوو بە نیشتمانی پەناگە و میراتێکی پێکەوەژیان.",
    cardLabel: "کارت",
    slides: [
      {
        id: "land-of-refuge",
        number: 3,
        eyebrow: "سلایدی ٣",
        title: "وڵاتی پەنابەری",
        subtitle: "شوێنێک کە گەلانی ترسێنراو هەمیشە تێیدا ئاسایشیان دۆزیوەتەوە",
        cards: [
          {
            id: "ancient-roots",
            number: 1,
            title: "ڕەگەکانی کۆن",
            body: "ئاینەکانی وەک میترایی، جوولەکە، زەردەشتی، مەسیحی، ئێزدی، و ئیسلام لێرە لە کۆنەوە گەشەیان کردووە.",
            icon: Mountain,
            accent: "#7a4a12",
          },
          {
            id: "jewish-community",
            number: 2,
            title: "کۆمەڵگەی جوولەکە",
            body: "جوولەکە لە سەدەی شەشەمی پێش زاینی لە کوردستان نیشتەجێ بوون و لێرە مانەوە چونکە کوردیان وەک گەلێکی زۆر چاوپۆشێن دۆزیەوە.",
            icon: Star,
            accent: "#2a3550",
          },
          {
            id: "christians",
            number: 3,
            title: "مەسیحیەکان",
            body: "مەسیحیەت لە سەدەی یەکەمی زاینی لە ڕێگەی نێردراوەکانی ئەدای و ماری گەیشتە هەولێر. هەولێر لە سەدەی سێیەمدا بوو بە سەنتەرێکی گرنگی مەسیحیەت.",
            icon: Cross,
            accent: "#244b1f",
          },
          {
            id: "bahaullah",
            number: 4,
            title: "بەهائوڵڵا",
            body: "دامەزرێنەری ئاینی بەهائی کوردستانی بۆ گۆشەگیری هەڵبژارد، و وەسفی کرد بە «خۆشترین ڕۆژەکانی ژیانی».",
            icon: Sun,
            accent: "#a05a14",
          },
        ],
        tagline:
          "جێگیری و ئاشتی کوردستانی کردووە بە پەناگەیەک بەدرێژایی سەردەمەکان.",
      },
      {
        id: "leaders-of-coexistence",
        number: 4,
        eyebrow: "سلایدی ٤",
        title: "ڕابەرانی پێکەوەژیان",
        subtitle: "میراتێکی پاراستن و برایەتی",
        cards: [
          {
            id: "abdul-salam-barzani",
            number: 1,
            title: "شێخ عەبدوسەلام بارزانی",
            body: "ناسراو بە «شێخی مەسیحیەکان». دژایەتی بانگەشەی جیهادی دژی مەسیحیەکانی کرد. مەسیحیەکان پەنایان دا کاتێک حکومەتی عوسمانی دەستگیرکردنی ویست.",
            icon: Shield,
            accent: "#3a2f12",
          },
          {
            id: "mustafa-barzani",
            number: 2,
            title: "مەلا مستەفا بارزانی",
            body: "ڕایگەیاند: «جوولەکە لای من زۆر بەنرخن، و ئەو کەسەی ئازاریان بدا لە لای منەوە سزا دەدرێت».",
            icon: Award,
            accent: "#52351a",
            isQuote: true,
          },
          {
            id: "ahmed-barzani",
            number: 3,
            title: "شێخ ئەحمەد بارزانی",
            body: "٢٠٠ جەنگاوەری بۆ یارمەتیدانی ئەرمەنەکان دژی عوسمانیەکان نارد، کە بووە هۆی ١٤ قوربانی لە بەرگریکردن لە بنەماڵە ئەرمەنیەکان.",
            icon: Crown,
            accent: "#6b3a1a",
          },
          {
            id: "masoud-barzani",
            number: 4,
            title: "مەسعود بارزانی",
            body: "«ئێزدیەکان لە سایەی شۆڕشدا هەمان ئاسایش بۆ یەکەم جار بینیان. مەسیحیەکانیش بە وەفاداری و قوربانیدان وەڵامیان دایەوە».",
            icon: BookOpen,
            accent: "#5a3a18",
            isQuote: true,
          },
        ],
        tagline:
          "پێکەوەژیان لێرە هیچ کاتێک یاسا نەبووە. هەمیشە بەهایەکی پیرۆز بووە.",
      },
    ],
  },
  ar: {
    back: "العودة",
    sectionLabel: "القسم ٢",
    pageTitle: "التاريخ",
    pageDescription:
      "شريحتان تتتبعان كيف صارت كوردستان أرض لجوء وإرثاً للتعايش.",
    cardLabel: "البطاقة",
    slides: [
      {
        id: "land-of-refuge",
        number: 3,
        eyebrow: "الشريحة ٣",
        title: "أرض اللجوء",
        subtitle: "حيث وجدت الشعوب المهددة الأمان دائماً",
        cards: [
          {
            id: "ancient-roots",
            number: 1,
            title: "جذور قديمة",
            body: "ازدهرت هنا منذ القدم أديان منها المثرائية، اليهودية، الزرادشتية، المسيحية، الإيزيدية، والإسلام.",
            icon: Mountain,
            accent: "#7a4a12",
          },
          {
            id: "jewish-community",
            number: 2,
            title: "الجالية اليهودية",
            body: "استقرّ اليهود في كوردستان في القرن السادس قبل الميلاد واختاروا البقاء لأنهم وجدوا الكورد متسامحين بشكل استثنائي.",
            icon: Star,
            accent: "#2a3550",
          },
          {
            id: "christians",
            number: 3,
            title: "المسيحيون",
            body: "وصلت المسيحية إلى أربيل في القرن الأول الميلادي عبر الرسولين أداي وماري، وأصبحت أربيل مركزاً مسيحياً رئيسياً بحلول القرن الثالث.",
            icon: Cross,
            accent: "#244b1f",
          },
          {
            id: "bahaullah",
            number: 4,
            title: "بهاء الله",
            body: "اختار مؤسس الديانة البهائية كوردستان للخلوة ووصفها بأنها «أسعد أيام حياته».",
            icon: Sun,
            accent: "#a05a14",
          },
        ],
        tagline:
          "الاستقرار والسلام جعلا كوردستان ملاذاً عبر العصور.",
      },
      {
        id: "leaders-of-coexistence",
        number: 4,
        eyebrow: "الشريحة ٤",
        title: "قادة التعايش",
        subtitle: "إرث من الحماية والأخوّة",
        cards: [
          {
            id: "abdul-salam-barzani",
            number: 1,
            title: "الشيخ عبد السلام البارزاني",
            body: "عُرف بـ«شيخ المسيحيين». رفض دعوات الجهاد ضد المسيحيين. وأواه المسيحيون حين أرادت الدولة العثمانية اعتقاله.",
            icon: Shield,
            accent: "#3a2f12",
          },
          {
            id: "mustafa-barzani",
            number: 2,
            title: "الملا مصطفى البارزاني",
            body: "أعلن: «اليهود أعزّاء جداً عليّ، ومن يؤذيهم سيلقى عقابي».",
            icon: Award,
            accent: "#52351a",
            isQuote: true,
          },
          {
            id: "ahmed-barzani",
            number: 3,
            title: "الشيخ أحمد البارزاني",
            body: "أرسل ٢٠٠ مقاتل لنجدة الأرمن ضد العثمانيين، وسقط ١٤ شهيداً دفاعاً عن العائلات الأرمنية.",
            icon: Crown,
            accent: "#6b3a1a",
          },
          {
            id: "masoud-barzani",
            number: 4,
            title: "مسعود البارزاني",
            body: "«نعم الإيزيديون في ظل الثورة بأمان لم يعرفوه من قبل، وردّ المسيحيون بالولاء والتضحية».",
            icon: BookOpen,
            accent: "#5a3a18",
            isQuote: true,
          },
        ],
        tagline:
          "التعايش هنا لم يكن قانوناً يوماً. كان دائماً قيمة.",
      },
    ],
  },
};

function DecorativeLine({ color = "#c99a55" }) {
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

type HistoryPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function HistoryPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: HistoryPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-h-hero='true']", { autoAlpha: 0, scale: 1.04 });
      gsap.set("[data-h-animate='true']", { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline();
      tl.to("[data-h-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        "[data-h-animate='true']",
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
        className="relative w-full overflow-hidden bg-[#fbf1df] px-6 pb-20 pt-10 sm:px-12 lg:px-20"
      >
        <img
          data-h-hero="true"
          src={bg}
          alt=""
          className="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#fbf1df]/72 via-[#fbf1df]/30 to-[#f4dfbb]/95" />
        <div className="pointer-events-none absolute inset-5 rounded-[30px] border-2 border-[#d2a35a]/45" />

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/80 text-[#5a3a18] shadow-sm"
            aria-label={c.back}
          >
            <ArrowLeft className="h-7 w-7" />
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

        <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col">
          <header
            data-h-animate="true"
            className="mx-auto max-w-[850px] pt-14 text-center"
          >
            <span className="font-serif text-[14px] font-semibold uppercase tracking-[0.32em] text-[#a77423]">
              {c.sectionLabel}
            </span>
            <div className="mx-auto mt-3 mb-3 w-[260px]">
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

          {c.slides.map((slide) => (
            <section
              key={slide.id}
              data-h-animate="true"
              className="mt-24 first:mt-20"
              aria-labelledby={`h-slide-${slide.id}`}
            >
              <div className="mx-auto max-w-[860px] text-center">
                <span className="font-serif text-[13px] font-semibold uppercase tracking-[0.34em] text-[#a77423]">
                  {slide.eyebrow}
                </span>
                <h2
                  id={`h-slide-${slide.id}`}
                  className="mt-3 font-serif text-[36px] font-semibold uppercase leading-tight tracking-[0.04em] text-[#3b2410] sm:text-[48px]"
                >
                  {slide.title}
                </h2>
                <div className="mx-auto mt-4 w-[200px]">
                  <DecorativeLine color="#c3923a" />
                </div>
                <p className="mx-auto mt-4 max-w-[640px] font-serif text-[18px] italic text-[#6a4a25] sm:text-[20px]">
                  {slide.subtitle}
                </p>
              </div>

              <div className="mx-auto mt-10 grid w-full max-w-[1180px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {slide.cards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <article
                      key={card.id}
                      className="group relative flex flex-col overflow-hidden rounded-[24px] border-2 border-[#f3dfb5] bg-white/90 shadow-[0_16px_32px_rgba(69,43,14,0.18)] transition hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(69,43,14,0.25)]"
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
                        <div className="absolute inset-x-0 top-5 flex items-center justify-between px-6">
                          <span className="font-serif text-[11px] font-semibold uppercase tracking-[0.32em] text-white/85">
                            {c.cardLabel} {card.number}
                          </span>
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
                        {card.isQuote ? (
                          <div className="relative pt-2">
                            <Quote
                              className="absolute -top-1 left-0 h-5 w-5 opacity-50"
                              style={{ color: card.accent }}
                            />
                            <p className="pl-7 text-[15px] font-medium italic leading-relaxed text-[#4d3c2a]">
                              {card.body}
                            </p>
                          </div>
                        ) : (
                          <p className="text-[15px] font-medium leading-relaxed text-[#4d3c2a]">
                            {card.body}
                          </p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mx-auto mt-10 max-w-[860px] rounded-[20px] border-2 border-[#c99745]/55 bg-[#fff7e7]/95 px-7 py-5 text-center shadow-[0_12px_26px_rgba(75,45,12,0.14)]">
                <p className="font-serif text-[17px] font-semibold italic leading-snug text-[#6a4a25] sm:text-[19px]">
                  {slide.tagline}
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
