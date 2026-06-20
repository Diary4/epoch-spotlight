import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  Globe2,
  Shield,
  Award,
  Crown,
  BookOpen,
  Quote,
} from "lucide-react";

import bg from "@/assets/images/religions/nc-1.webp";
import bg2 from "@/assets/images/religions/r-3.webp";

type LangCode = "en" | "ku" | "ar";

type LeaderCard = {
  id: string;
  number: number;
  title: string;
  body: string;
  icon: typeof Shield;
  accent: string;
  isQuote?: boolean;
};

type LeadersContent = {
  back: string;
  pageTitle: string;
  pageSubtitle: string;
  pageDescription: string;
  tagline: string;
  cards: LeaderCard[];
};

const content: Record<LangCode, LeadersContent> = {
  en: {
    back: "Back",
    pageTitle: "Leaders of Coexistence",
    pageSubtitle: "A legacy of protection and brotherhood",
    pageDescription:
      "Figures whose courage and conviction turned coexistence from an ideal into lived practice across Kurdistan.",
    tagline: "Coexistence was never a law here. It was always a value.",
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
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "ڕابەرانی پێکەوەژیان",
    pageSubtitle: "میراتێکی پاراستن و برایەتی",
    pageDescription:
      "کەسایەتییەکان کە لە ڕێگەی بوێری و باوەڕەوە پێکەوەژیان لە بیرۆکەیەکی ئەخلاقییەوە بوو بە ڕەوشتی ژیان لە کوردستان.",
    tagline: "پێکەوەژیان لێرە هیچ کاتێک یاسا نەبووە. هەمیشە بەهایەکی پیرۆز بووە.",
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
  },
  ar: {
    back: "العودة",
    pageTitle: "قادة التعايش",
    pageSubtitle: "إرث من الحماية والأخوّة",
    pageDescription:
      "شخصيات حوّلت شجاعتها وإيمانها التعايش من مثال أخلاقي إلى ممارسة حية في كوردستان.",
    tagline: "التعايش هنا لم يكن قانوناً يوماً. كان دائماً قيمة.",
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

type LeadersOfCoexistencePageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function LeadersOfCoexistencePage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: LeadersOfCoexistencePageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-lc-hero='true']", { autoAlpha: 0, scale: 1.04 });
      gsap.set("[data-lc-animate='true']", { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline();
      tl.to("[data-lc-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        "[data-lc-animate='true']",
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
      className="m-0 flex min-h-screen w-screen justify-center bg-[#faf8f5] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#faf8f5] px-6 pt-10 sm:px-12 lg:px-20"
      >
        <img
          data-lc-hero="true"
          src={bg}
          alt=""
          className="absolute inset-0 h-[60vh] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
        />
        <div className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-[#faf8f5]/72 via-[#faf8f5]/30 to-[#faf8f5]/95" />

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

        <div className="relative z-10 mx-auto min-h-screen w-full max-w-[1180px]">
          <header
            data-lc-animate="true"
            className="mx-auto max-w-[850px] shrink-0 pt-14 text-center"
          >
            <div className="mx-auto mt-3 mb-3 w-[260px]">
              <DecorativeLine color="#c3923a" />
            </div>
            <h1 className="font-serif text-[56px] font-semibold uppercase leading-[1.04] tracking-[0.04em] text-[#3b2410] sm:text-[76px] lg:text-[88px]">
              {c.pageTitle}
            </h1>
            <div className="mx-auto mt-5 w-[180px]">
              <DecorativeLine color="#c3923a" />
            </div>
            <p className="mx-auto mt-5 max-w-[640px] font-serif text-[18px] italic text-[#6a4a25] sm:text-[20px]">
              {c.pageSubtitle}
            </p>
            <p className="mx-auto mt-5 max-w-[620px] text-[19px] font-semibold leading-relaxed text-[#4d3c2a] sm:text-[22px]">
              {c.pageDescription}
            </p>
          </header>

          <section
            data-lc-animate="true"
            className="absolute inset-x-0 top-[60vh] z-10 w-full pb-[200px]"
          >
            <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {c.cards.map((card) => {
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
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-white/40 bg-white/15 backdrop-blur-sm">
                          <Icon className="h-7 w-7 text-white" />
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
                {c.tagline}
              </p>
            </div>
          </section>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-t from-[#b9893d]/20 to-transparent" />
      </section>
    </main>
  );
}
