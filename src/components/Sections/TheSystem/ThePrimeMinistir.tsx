import { BookOpen, Building2, ChevronRight, Flag, Trophy, Compass } from "lucide-react";
import { useSystemDetailAnimation } from "@/components/Sections/TheSystem/useSystemDetailAnimation";
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
  const rootRef = useSystemDetailAnimation([lang]);
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
    <div ref={rootRef as React.RefObject<HTMLDivElement>}>
      <PrimeMinisterPageShell lang={lang} onBack={onBack}>
        {/* Hero */}
        <section className="system-detail-intro relative grid grid-cols-1 items-start gap-6 pt-14 sm:grid-cols-[1fr_auto] sm:gap-8 sm:pt-16">
          <div className="flex flex-col">
            <KrgEmblem className="h-12 w-12 sm:h-14 sm:w-14" />

            <h1 className={`mt-4 ${displayFont} text-[clamp(1.8rem,6vw,3rem)] font-medium leading-none tracking-tight`}>
              <span className="text-[#17233b]">{firstName}</span>{" "}
              <span className="text-[#b99152]">{lastName}</span>
            </h1>

            <div className="mt-3 w-full max-w-[280px]">
              <GoldDiamondDivider />
            </div>

            <p className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-[#17233b] sm:text-sm">
              {roleLine1}
            </p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#344052] sm:text-xs">
              {roleLine2}
            </p>
          </div>

          <div className="relative mx-auto flex h-[240px] w-full max-w-[280px] items-end justify-center sm:mx-0 sm:h-[320px] sm:max-w-[320px]">
            <div className="absolute bottom-[10%] left-1/2 h-[70%] w-[65%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,154,85,0.2),transparent_70%)] blur-xl" />
            <img
              src={primeMinister}
              alt="Masrour Barzani, Prime Minister of the Kurdistan Region"
              className="system-detail-hero relative h-full w-auto max-w-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(31,40,53,0.25)]"
            />
          </div>
        </section>

        {/* Citadel banner */}
        <div className="system-detail-extra relative mt-6 h-36 overflow-hidden sm:mt-8 sm:h-44">
          <img
            src={citadel}
            alt=""
            className="h-full w-full object-cover object-center sepia-[0.35] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_15%,black_80%,transparent)]"
          />
        </div>

        {/* Biography timeline */}
        <section className="relative mt-8 sm:mt-10">
          <TimelineConnector />
          <div className="space-y-8 sm:space-y-10">
            {localTimeline.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="system-detail-panel relative grid grid-cols-[48px_1fr] gap-4 sm:grid-cols-[64px_1fr]">
                  <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full border-2 border-[#d4b476] bg-white text-[#b99152] sm:h-16 sm:w-16">
                    <Icon className="h-5 w-5 sm:h-7 sm:w-7" strokeWidth={1.6} />
                  </div>
                  <div>
                    <h2 className={`${displayFont} text-[clamp(1.05rem,3vw,1.4rem)] font-medium uppercase tracking-wide text-[#17233b]`}>
                      {item.title}
                    </h2>
                    <p className="mt-2 text-[clamp(0.85rem,2vw,1rem)] font-light leading-relaxed text-[#344052]">
                      {item.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Navigation to sub-pages */}
        <section className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5">
          <button
            type="button"
            onClick={onAchievementsClick}
            className="system-detail-card group flex items-center gap-4 rounded-2xl border-2 border-[#ead8b7] bg-white/75 p-5 text-left shadow-[0_10px_28px_rgba(84,54,16,0.12)] backdrop-blur-sm transition hover:border-[#c69237] hover:bg-white/90"
          >
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#c69237] text-[#f8e5b8]">
              <Trophy className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <div className="min-w-0 flex-1">
              <p className={`${displayFont} text-[clamp(1rem,2.5vw,1.25rem)] font-medium text-[#17233b]`}>
                {achievementsLabel}
              </p>
            </div>
            <ChevronRight className={`h-6 w-6 shrink-0 text-[#b99152] transition group-hover:translate-x-0.5 ${isRtlScript ? "rotate-180" : ""}`} />
          </button>

          <button
            type="button"
            onClick={onVisionClick}
            className="system-detail-card group flex items-center gap-4 rounded-2xl border-2 border-[#ead8b7] bg-white/75 p-5 text-left shadow-[0_10px_28px_rgba(84,54,16,0.12)] backdrop-blur-sm transition hover:border-[#5d7757] hover:bg-white/90"
          >
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#5d7757] text-[#e8f0e6]">
              <Compass className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <div className="min-w-0 flex-1">
              <p className={`${displayFont} text-[clamp(1rem,2.5vw,1.25rem)] font-medium text-[#17233b]`}>
                {visionLabel}
              </p>
            </div>
            <ChevronRight className={`h-6 w-6 shrink-0 text-[#5d7757] transition group-hover:translate-x-0.5 ${isRtlScript ? "rotate-180" : ""}`} />
          </button>
        </section>
      </PrimeMinisterPageShell>
    </div>
  );
}
