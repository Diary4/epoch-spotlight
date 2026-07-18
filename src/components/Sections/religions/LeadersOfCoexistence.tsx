import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  Globe2,
  HeartHandshake,
  Users,
} from "lucide-react";
import { detailBackIconClassName, detailBackIconSize, religionsOverlayStartClassName, religionsOverlayEndClassName } from "@/constants/backNavigation";
import { cn } from "@/lib/utils";

import ReligionInfoCard from "@/components/Sections/religions/ReligionInfoCard";
import ReligionsScaledPage from "@/components/Sections/religions/ReligionsScaledPage";

import bg from "@/assets/images/religions/nc-1.webp";
import coexistenceHero from "@/assets/images/religions/coexistence/coexistence.jpeg";
import cradleImg from "@/assets/images/religions/main.webp";
import nationsImg from "@/assets/images/religions/nations.webp";
import sharedImg from "@/assets/images/religions/nl-1.webp";
import faithsImg from "@/assets/images/religions/faiths.webp";
import mustafaBarzaniImg from "@/assets/images/malaMustafa/mustafa-barzani.jpg";

const leaderImages: Record<string, string> = {
  "mustafa-barzani": mustafaBarzaniImg,
};

const coexistenceImages: Record<string, string> = {
  acceptance: cradleImg,
  respect: nationsImg,
  humanity: sharedImg,
  "living-identity": faithsImg,
};

type LangCode = "en" | "ku" | "ar";
type TabId = "coexistence" | "leaders";

type PrincipleCard = {
  id: string;
  title: string;
  body: string;
  accent: string;
};

type LeaderCard = {
  id: string;
  title: string;
  body: string;
  accent: string;
};

type PageContent = {
  back: string;
  pageTitle: string;
  coexistenceTab: string;
  leadersTab: string;
  coexistence: {
    subtitle: string;
    cards: PrincipleCard[];
    tagline: string;
  };
  leaders: {
    subtitle: string;
    description: string;
    cards: LeaderCard[];
    tagline: string;
  };
};

const content: Record<LangCode, PageContent> = {
  en: {
    back: "Back",
    pageTitle: "Coexistence",
    coexistenceTab: "Coexistence",
    leadersTab: "Leaders of Coexistence",
    coexistence: {
      subtitle: "A definition rooted in humanity",
      cards: [
        {
          id: "acceptance",
          title: "Acceptance",
          body: "Recognizing the right of others to believe and worship freely.",
          accent: "#7a4a12",
        },
        {
          id: "respect",
          title: "Respect",
          body: "Treating difference as strength, not division.",
          accent: "#a05a18",
        },
        {
          id: "humanity",
          title: "Humanity",
          body: "Relationships built on shared human values.",
          accent: "#b9822d",
        },
        {
          id: "living-identity",
          title: "Living Identity",
          body: "Practiced every day, not only remembered.",
          accent: "#c58b16",
        },
      ],
      tagline: "Coexistence is not tolerance of others. It is the celebration of them.",
    },
    leaders: {
      subtitle: "A legacy of protection and brotherhood",
      description:
        "Figures whose courage and conviction turned coexistence from an ideal into lived practice across Kurdistan.",
      cards: [
        {
          id: "abdul-salam-barzani",
          title: "Sheikh Abdul Salam Barzani",
          body: "Known as “Sheikh of the Christians.” Opposed calls for jihad against Christians. Christians sheltered him when the Ottoman state sought his arrest.",
          accent: "#3a2f12",
        },
        {
          id: "mustafa-barzani",
          title: "Mullah Mustafa Barzani",
          body: "Declared: “The Jews are very dear to me, and anyone who causes them trouble will be punished by me.”",
          accent: "#52351a",
        },
        {
          id: "ahmed-barzani",
          title: "Sheikh Ahmed Barzani",
          body: "Sent 200 fighters to aid Armenians against the Ottomans, resulting in 14 casualties defending Armenian families.",
          accent: "#6b3a1a",
        },
        {
          id: "masoud-barzani",
          title: "Masoud Barzani",
          body: "“The Yazidis enjoyed the same security under the revolution as they had never seen before. Christians responded with loyalty and sacrifice.”",
          accent: "#5a3a18",
        },
      ],
      tagline: "Coexistence was never a law here. It was always a value.",
    },
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "پێکەوەژیان",
    coexistenceTab: "پێکەوەژیان",
    leadersTab: "ڕابەرانی پێکەوەژیان",
    coexistence: {
      subtitle: "پێناسەیەک کە ڕەگی لە مرۆڤایەتیدایە",
      cards: [
        {
          id: "acceptance",
          title: "پەسەندکردن",
          body: "ناسینەوەی مافی ئەوانی تر بۆ ئەوەی بە ئازادی باوەڕ و پەرستن بکەن.",
          accent: "#7a4a12",
        },
        {
          id: "respect",
          title: "ڕێز",
          body: "جیاوازی وەک هێز مامەڵە پێوە دەکرێت، نەک وەک دابەشبوون.",
          accent: "#a05a18",
        },
        {
          id: "humanity",
          title: "مرۆڤایەتی",
          body: "پەیوەندییەکان لەسەر بەهای مرۆڤایەتیی هاوبەش دروست دەبن.",
          accent: "#b9822d",
        },
        {
          id: "living-identity",
          title: "ناسنامەی زیندوو",
          body: "هەموو ڕۆژێک پراکتیزە دەکرێت، نەک تەنها یاد دەکرێتەوە.",
          accent: "#c58b16",
        },
      ],
      tagline: "پێکەوەژیان خۆساڕاستن بۆ یەکتر نییە. بەرزڕاگرتنی یەکترە.",
    },
    leaders: {
      subtitle: "میراتێکی پاراستن و برایەتی",
      description:
        "کەسایەتییەکان کە لە ڕێگەی بوێری و باوەڕەوە پێکەوەژیان لە بیرۆکەیەکی ئەخلاقییەوە بوو بە ڕەوشتی ژیان لە کوردستان.",
      cards: [
        {
          id: "abdul-salam-barzani",
          title: "شێخ عەبدوسەلام بارزانی",
          body: "ناسراو بە «شێخی مەسیحیەکان». دژایەتی بانگەشەی جیهادی دژی مەسیحیەکانی کرد. مەسیحیەکان پەنایان دا کاتێک حکومەتی عوسمانی دەستگیرکردنی ویست.",
          accent: "#3a2f12",
        },
        {
          id: "mustafa-barzani",
          title: "مەلا مستەفا بارزانی",
          body: "ڕایگەیاند: «جوولەکە لای من زۆر بەنرخن، و ئەو کەسەی ئازاریان بدا لە لای منەوە سزا دەدرێت».",
          accent: "#52351a",
        },
        {
          id: "ahmed-barzani",
          title: "شێخ ئەحمەد بارزانی",
          body: "٢٠٠ جەنگاوەری بۆ یارمەتیدانی ئەرمەنەکان دژی عوسمانیەکان نارد، کە بووە هۆی ١٤ قوربانی لە بەرگریکردن لە بنەماڵە ئەرمەنیەکان.",
          accent: "#6b3a1a",
        },
        {
          id: "masoud-barzani",
          title: "مەسعود بارزانی",
          body: "«ئێزدیەکان لە سایەی شۆڕشدا هەمان ئاسایش بۆ یەکەم جار بینیان. مەسیحیەکانیش بە وەفاداری و قوربانیدان وەڵامیان دایەوە».",
          accent: "#5a3a18",
        },
      ],
      tagline: "پێکەوەژیان لێرە هیچ کاتێک یاسا نەبووە. هەمیشە بەهایەکی پیرۆز بووە.",
    },
  },
  ar: {
    back: "العودة",
    pageTitle: "التعايش",
    coexistenceTab: "التعايش",
    leadersTab: "قادة التعايش",
    coexistence: {
      subtitle: "تعريف متجذّر في الإنسانية",
      cards: [
        {
          id: "acceptance",
          title: "القبول",
          body: "الاعتراف بحق الآخرين في الإيمان والعبادة بحرية.",
          accent: "#7a4a12",
        },
        {
          id: "respect",
          title: "الاحترام",
          body: "التعامل مع الاختلاف كقوة لا كسبب للانقسام.",
          accent: "#a05a18",
        },
        {
          id: "humanity",
          title: "الإنسانية",
          body: "علاقات مبنية على القيم الإنسانية المشتركة.",
          accent: "#b9822d",
        },
        {
          id: "living-identity",
          title: "هوية حية",
          body: "تُمارَس كل يوم، لا تُستذكر فقط.",
          accent: "#c58b16",
        },
      ],
      tagline: "التعايش ليس تحمّل الآخرين. إنه الاحتفاء بهم.",
    },
    leaders: {
      subtitle: "إرث من الحماية والأخوّة",
      description:
        "شخصيات حوّلت شجاعتها وإيمانها التعايش من مثال أخلاقي إلى ممارسة حية في كوردستان.",
      cards: [
        {
          id: "abdul-salam-barzani",
          title: "الشيخ عبد السلام البارزاني",
          body: "عُرف بـ«شيخ المسيحيين». رفض دعوات الجهاد ضد المسيحيين. وأواه المسيحيون حين أرادت الدولة العثمانية اعتقاله.",
          accent: "#3a2f12",
        },
        {
          id: "mustafa-barzani",
          title: "الملا مصطفى البارزاني",
          body: "أعلن: «اليهود أعزّاء جداً عليّ، ومن يؤذيهم سيلقى عقابي».",
          accent: "#52351a",
        },
        {
          id: "ahmed-barzani",
          title: "الشيخ أحمد البارزاني",
          body: "أرسل ٢٠٠ مقاتل لنجدة الأرمن ضد العثمانيين، وسقط ١٤ شهيداً دفاعاً عن العائلات الأرمنية.",
          accent: "#6b3a1a",
        },
        {
          id: "masoud-barzani",
          title: "مسعود البارزاني",
          body: "«نعم الإيزيديون في ظل الثورة بأمان لم يعرفوه من قبل، وردّ المسيحيون بالولاء والتضحية».",
          accent: "#5a3a18",
        },
      ],
      tagline: "التعايش هنا لم يكن قانوناً يوماً. كان دائماً قيمة.",
    },
  },
};

const tabs: { id: TabId; icon: typeof HeartHandshake }[] = [
  { id: "coexistence", icon: HeartHandshake },
  { id: "leaders", icon: Users },
];

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
  const [activeTab, setActiveTab] = React.useState<TabId>("coexistence");
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";
  const tabPanel = activeTab === "coexistence" ? c.coexistence : c.leaders;

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-lc-hero='true']", { autoAlpha: 0 });
      gsap.set("[data-lc-animate='true']", { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline();
      tl.to("[data-lc-hero='true']", {
        autoAlpha: 1,
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
    <ReligionsScaledPage
      dir={dir}
      lang={lang}
      fitDeps={[lang]}
      sectionRef={sectionRef}
      className="min-h-full px-12 pb-12"
    >
      <img
        data-lc-hero="true"
        src={coexistenceHero}
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
        <header data-lc-animate="true" className="mx-auto max-w-[850px] shrink-0 pt-8 text-center">
          <div className="mx-auto mb-2 w-[220px]">
            <DecorativeLine color="#c3923a" />
          </div>
          <h1 className="font-serif text-[72px] font-semibold uppercase leading-[1.02] tracking-[0.04em] text-[#3b2410]">
            {c.pageTitle}
          </h1>
          <div className="mx-auto mt-4 w-[160px]">
            <DecorativeLine color="#c3923a" />
          </div>
        </header>

        <section data-lc-animate="true" className="mt-[1020px] flex flex-1 flex-col pb-4">
          <nav className="mb-6 flex shrink-0 justify-center border-b border-[#d7b77e]/45">
            <div className="flex gap-2">
              {tabs.map((tab) => {
                const label = tab.id === "coexistence" ? c.coexistenceTab : c.leadersTab;
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
            {activeTab === "leaders" ? (
              <p className="mx-auto mt-3 max-w-[620px] text-[17px] font-medium leading-relaxed text-[#4d3c2a]">
                {c.leaders.description}
              </p>
            ) : null}
          </div>

          <div className="grid w-full flex-1 grid-cols-4 content-stretch gap-5">
            {activeTab === "coexistence"
              ? c.coexistence.cards.map((card, index) => (
                  <ReligionInfoCard
                    key={card.id}
                    title={card.title}
                    body={card.body}
                    image={coexistenceImages[card.id] ?? bg}
                    accent={card.accent}
                    accentIndex={index}
                    imageHeightClass="min-h-[360px] flex-1"
                    className="min-h-full"
                  />
                ))
              : c.leaders.cards.map((card, index) => (
                  <ReligionInfoCard
                    key={card.id}
                    title={card.title}
                    body={card.body}
                    image={leaderImages[card.id] ?? bg}
                    accent={card.accent}
                    accentIndex={index}
                    titleClassName="uppercase tracking-[0.03em] text-[18px]"
                    imageHeightClass="min-h-[360px] flex-1"
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
