import { BookOpen, Building2, ChevronRight, Flag, Trophy, Compass } from "lucide-react";
import { usePrimeMinisterAnimation } from "@/components/Sections/TheSystem/usePrimeMinisterAnimation";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import {
  GoldDiamondDivider,
  KrgEmblem,
  PrimeMinisterPageShell,
  TimelineConnector,
} from "@/components/Sections/TheSystem/primeMinisterShared";
import primeMinister from "@/assets/images/PrimeMinistir/pm.jpeg";
import citadel from "@/assets/mainImages/building.webp";

const timeline = [
  {
    title: "Early Life",
    text: "Masrour Barzani was born in 1969 in the Barzan region, within a family with a historic role in the Kurdish national movement. He was raised in a resolute environment focused on leadership, discipline, and service. Education and resilience formed the core foundation of his early life.",
    icon: BookOpen,
  },
  {
    title: "Public Service",
    text: "He entered leadership during periods of conflict and transition, contributing to security and institutional development. He led strategic efforts to build stronger structures, support national reconciliation, and serve Kurdish communities and the future of Kurdistan.",
    icon: Building2,
  },
  {
    title: "Prime Minister",
    text: "In 2019, he became Prime Minister of the Kurdistan Regional Government with a mandate centered on reform, stability, and sustainable development. His leadership focuses on diversifying the economy, strengthening energy and infrastructure, advancing digital government, attracting investment, creating opportunities for youth, and positioning Kurdistan as a secure, connected, and forward-looking region.",
    icon: Flag,
  },
];

type PrimeMinisterPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
  onAchievementsClick?: () => void;
  onVisionClick?: () => void;
};

export default function PrimeMinisterPage({
  lang = "en",
  onBack,
  onAchievementsClick,
  onVisionClick,
}: PrimeMinisterPageProps) {
  const rootRef = usePrimeMinisterAnimation([lang], "main");
  const isAr = lang === "ar";
  const isKu = lang === "ku";
  const isRtlScript = discoverRtlScript(lang);
  const displayFont = discoverDisplayFont(lang);

  const firstName = isAr || isKu ? "مەسرور" : "MASROUR";
  const lastName = isAr || isKu ? "بارزانی" : "BARZANI";
  const roleLine1 = isAr ? "رئيس الوزراء" : isKu ? "سەرۆک وەزیران" : "Prime Minister";
  const roleLine2 = isAr ? "حكومة إقليم كوردستان" : isKu ? "حکومەتی هەرێمی کوردستان" : "Kurdistan Regional Government";

  const achievementsLabel = isAr ? "الإنجازات المختارة" : isKu ? "دەستکەوتە هەڵبژێردراوەکان" : "Selected Achievements";
  const visionLabel = isAr ? "الرؤية المستقبلية" : isKu ? "ئامانجی داهاتوو" : "Vision for the Future";

  const localTimeline = isAr
    ? [
        {
          title: "الحياة المبكرة",
          text: "وُلد مسرور بارزاني عام 1969 في منطقة بارزان، في عائلة لها دور تاريخي في الحركة الوطنية الكردية. نشأ في بيئة راسخة تركز على القيادة والانضباط والخدمة.",
          icon: BookOpen,
        },
        {
          title: "الخدمة العامة",
          text: "دخل القيادة خلال فترات الصراع والتحول، وساهم في الأمن والتطوير المؤسسي. قاد جهودًا استراتيجية لبناء هياكل أقوى ودعم المصالحة الوطنية.",
          icon: Building2,
        },
        {
          title: "رئيس الوزراء",
          text: "في عام 2019، أصبح رئيسًا للوزراء في حكومة إقليم كوردستان بمهمة تركز على الإصلاح والاستقرار والتنمية المستدامة.",
          icon: Flag,
        },
      ]
    : isKu
      ? [
          {
            title: "ژیانی سەرەتایی",
            text: "مەسرور بارزانی لە ساڵی ١٩٦٩ لە ناوچەی بارزان لە دایکبوو، لە خێزانێک کە ڕۆڵێکی مێژوویی هەبوو لە بزووتنەوەی نەتەوەیی کوردیدا.",
            icon: BookOpen,
          },
          {
            title: "خزمەتی گشتی",
            text: "لە کاتی ناکۆکی و گۆڕانکارییەکاندا چووە ناو ڕێبەرایەتی، بەشداری لە ئاسایش و پەرەپێدانی دامەزراوەیی کرد.",
            icon: Building2,
          },
          {
            title: "سەرۆک وەزیران",
            text: "لە ساڵی ٢٠١٩ بوو بە سەرۆک وەزیرانی حکومەتی هەرێمی کوردستان بە مانداتێک کە جەخت لەسەر چاکسازی، سەقامگیری، و گەشەی بەردەوام دەکات.",
            icon: Flag,
          },
        ]
      : timeline;

  return (
    <div ref={rootRef}>
      <PrimeMinisterPageShell lang={lang} onBack={onBack}>
        {/* Hero */}
        <section className="system-detail-intro grid grid-cols-2 items-center gap-3 pt-14 xs:gap-5 sm:pt-16 lg:gap-10 lg:pt-20">
          <div className="pm-hero-text flex w-full max-w-[680px] flex-col text-left">
            <KrgEmblem className="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20" />

            <h1 className={`mt-4 ${displayFont} text-[clamp(2rem,5.5vw,6.4rem)] font-medium leading-[1.02] tracking-tight`}>
              <span className="text-[#17233b]">{firstName}</span>{" "}
              <span className="text-[#b99152]">{lastName}</span>
            </h1>

            <div className="mt-3 w-[110px] xs:w-[170px] sm:mt-6 sm:w-[300px] lg:w-[430px]">
              <GoldDiamondDivider />
            </div>

            <p className="mt-3 text-[clamp(0.75rem,1.6vw,1.5rem)] font-medium uppercase tracking-[0.22em] text-[#17233b] sm:mt-4">
              {roleLine1}
            </p>
            <p className="mt-1 text-[clamp(0.65rem,1.3vw,1.15rem)] font-medium uppercase tracking-[0.18em] text-[#344052]">
              {roleLine2}
            </p>
          </div>

          <div className="relative flex h-[28vh] min-h-[180px] w-full shrink-0 items-end justify-center xs:h-[34vh] sm:h-[46vh] lg:h-[58vh] kiosk-portrait:h-[40vh]">
            <div className="absolute bottom-[8%] left-1/2 h-[78%] w-[62%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,154,85,0.22),transparent_68%)] blur-2xl" />
            <img
              src={primeMinister}
              alt="Masrour Barzani, Prime Minister of the Kurdistan Region"
              className="system-detail-hero relative h-full w-auto max-w-none object-contain object-bottom drop-shadow-[0_24px_50px_rgba(31,40,53,0.28)]"
            />
          </div>
        </section>

        {/* Citadel banner */}
        <div className="pm-citadel system-detail-extra relative mt-8 h-[22vh] min-h-[160px] overflow-hidden sm:mt-10 sm:min-h-[200px] lg:min-h-[260px]">
          <img
            src={citadel}
            alt=""
            className="h-full w-full object-cover object-center sepia-[0.35] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_15%,black_80%,transparent)]"
          />
        </div>

        {/* Biography timeline */}
        <section className="pm-timeline relative mt-10 sm:mt-12 lg:mt-14">
          <TimelineConnector />
          <div className="space-y-8 sm:space-y-10 lg:space-y-12">
            {localTimeline.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="pm-timeline-item system-detail-panel relative grid grid-cols-[56px_1fr] gap-4 sm:grid-cols-[72px_1fr] sm:gap-5 lg:grid-cols-[88px_1fr] lg:gap-6">
                  <div className="pm-timeline-icon relative z-10 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d4b476] bg-white text-[#b99152] sm:h-16 sm:w-16 lg:h-20 lg:w-20">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-9 lg:w-9" strokeWidth={1.6} />
                  </div>
                  <div className="pm-timeline-copy">
                    <h2 className={`${displayFont} text-[clamp(1.15rem,2.4vw,2.05rem)] font-light uppercase tracking-wide text-[#17233b]`}>
                      {item.title}
                    </h2>
                    <p className="mt-2 text-[clamp(0.95rem,1.8vw,1.45rem)] font-light leading-snug text-[#344052] sm:mt-3">
                      {item.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Navigation to sub-pages */}
        <section className="mt-10 grid w-full grid-cols-1 gap-5 pb-2 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:gap-8">
          <button
            type="button"
            onClick={onAchievementsClick}
            className="system-detail-card group flex items-center gap-5 rounded-[20px] border-2 border-[#ead8b7] bg-white/78 px-5 py-5 text-left shadow-[0_18px_40px_rgba(84,54,16,0.16)] backdrop-blur-md transition hover:border-[#c69237] hover:bg-white/90 sm:rounded-[24px] sm:px-6 sm:py-6 lg:rounded-[26px] lg:px-8 lg:py-7"
          >
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#c69237] text-[#f8e5b8] sm:h-20 sm:w-20">
              <Trophy className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.45} />
            </div>
            <div className="min-w-0 flex-1">
              <p className={`${displayFont} text-[clamp(1.2rem,2.4vw,2.05rem)] font-light text-[#17233b]`}>
                {achievementsLabel}
              </p>
            </div>
            <ChevronRight className={`h-8 w-8 shrink-0 text-[#b99152] transition group-hover:translate-x-0.5 sm:h-10 sm:w-10 ${isRtlScript ? "rotate-180" : ""}`} />
          </button>

          <button
            type="button"
            onClick={onVisionClick}
            className="system-detail-card group flex items-center gap-5 rounded-[20px] border-2 border-[#ead8b7] bg-white/78 px-5 py-5 text-left shadow-[0_18px_40px_rgba(84,54,16,0.16)] backdrop-blur-md transition hover:border-[#5d7757] hover:bg-white/90 sm:rounded-[24px] sm:px-6 sm:py-6 lg:rounded-[26px] lg:px-8 lg:py-7"
          >
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#5d7757] text-[#e8f0e6] sm:h-20 sm:w-20">
              <Compass className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.45} />
            </div>
            <div className="min-w-0 flex-1">
              <p className={`${displayFont} text-[clamp(1.2rem,2.4vw,2.05rem)] font-light text-[#17233b]`}>
                {visionLabel}
              </p>
            </div>
            <ChevronRight className={`h-8 w-8 shrink-0 text-[#5d7757] transition group-hover:translate-x-0.5 sm:h-10 sm:w-10 ${isRtlScript ? "rotate-180" : ""}`} />
          </button>
        </section>
      </PrimeMinisterPageShell>
    </div>
  );
}
