import { BarChart3, Bolt, Handshake, Leaf, UsersRound } from "lucide-react";
import { usePrimeMinisterAnimation } from "@/components/Sections/TheSystem/usePrimeMinisterAnimation";
import { discoverDisplayFont } from "@/components/Sections/discoverLanguage";
import {
  GoldOrnament,
  ListItemRow,
  PrimeMinisterPageShell,
  SectionHeader,
} from "@/components/Sections/TheSystem/primeMinisterShared";
import landscape from "@/assets/mainImages/theland/land-2.webp";

const pillars = [
  {
    title: "A Strong & Diversified Economy",
    text: "Building sustainable growth and creating opportunities for every citizen.",
    icon: BarChart3,
  },
  {
    title: "Reliable Energy & Infrastructure",
    text: "Securing clean energy and world-class infrastructure for a better life.",
    icon: Bolt,
  },
  {
    title: "Empowering People & Youth",
    text: "Investing in education, skills, and innovation to unlock the potential of our people.",
    icon: UsersRound,
  },
  {
    title: "Good Governance & Partnerships",
    text: "Upholding transparency and building strong partnerships for peace and prosperity.",
    icon: Handshake,
  },
  {
    title: "Sustainable & Resilient Kurdistan",
    text: "Protecting our environment and building a safe, inclusive, and future-ready Kurdistan.",
    icon: Leaf,
  },
];

type PrimeMinisterVisionProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

export default function PrimeMinisterVisionPage({ lang = "en", onBack }: PrimeMinisterVisionProps) {
  const rootRef = usePrimeMinisterAnimation([lang], "list");
  const displayFont = discoverDisplayFont(lang);
  const isAr = lang === "ar";
  const isKu = lang === "ku";

  const subtitle = isAr ? "للمستقبل" : isKu ? "بۆ داهاتوو" : "For the Future";
  const title = isAr ? "الرؤية" : isKu ? "ئامانج" : "Vision";
  const statement = isAr
    ? "رؤيتنا هي بناء كوردستان مزدهرة ومستقرة وجاهزة للمستقبل تضمن جودة حياة عالية لجميع المواطنين وتعزز دورنا في العالم."
    : isKu
      ? "ئامانجمان بونیادنانی کوردستانێکی گەشاوە، سەقامگیر، و ئامادە بۆ داهاتووە کە کوالیتیی ژیانێکی بەرز بۆ هەموو هاوڵاتییەکان دڵنیادەکاتەوە و ڕۆڵمان لە جیهاندا بەهێز دەکات."
      : "Our vision is to build a prosperous, stable, and future-ready Kurdistan that guarantees a high quality of life for all citizens and strengthens our role in the world.";
  const pillarsLabel = isAr ? "ركائز رؤيتنا" : isKu ? "ستوونەکانی ئامانجمان" : "Our Vision Pillars";

  const localPillars = isAr
    ? [
        { title: "اقتصاد قوي ومتنوع", text: "بناء نمو مستدام وخلق فرص لكل مواطن.", icon: BarChart3 },
        { title: "طاقة و بنية تحتية موثوقة", text: "تأمين طاقة نظيفة وبنية تحتية عالمية المستوى لحياة أفضل.", icon: Bolt },
        { title: "تمكين الناس والشباب", text: "الاستثمار في التعليم والمهارات والابتكار لإطلاق إمكانات شعبنا.", icon: UsersRound },
        { title: "حوكمة رشيدة وشراكات", text: "التمسك بالشفافية وبناء شراكات قوية من أجل السلام والازدهار.", icon: Handshake },
        { title: "كوردستان مستدامة ومرنة", text: "حماية بيئتنا وبناء كوردستان آمنة وشاملة وجاهزة للمستقبل.", icon: Leaf },
      ]
    : isKu
      ? [
          { title: "ئابوورییەکی بەهێز و هەمەجۆر", text: "بونیادنانی گەشەی بەردەوام و دروستکردنی دەرفەت بۆ هەموو هاوڵاتی.", icon: BarChart3 },
          { title: "وزە و ژێرخانی جێگیر", text: "دڵنیابوون لە وزەی پاک و ژێرخانی ئاستی جیهانی بۆ ژیانێکی باشتر.", icon: Bolt },
          { title: "توانادارکردنی خەڵک و گەنجان", text: "وەبەرهێنان لە پەروەردە، لێهاتوویی، و داهێنان بۆ ئاشکراکردنی توانای خەڵکمان.", icon: UsersRound },
          { title: "حکومڕانی باش و هاوبەشی", text: "پاراستنی شەفافیەت و بونیادنانی هاوبەشی بەهێز بۆ ئاشتی و گەشە.", icon: Handshake },
          { title: "کوردستانێکی بەردەوام و خۆڕاگر", text: "پاراستنی ژینگە و بونیادنانی کوردستانێکی سەلامەت، گشتگیر، و ئامادە بۆ داهاتوو.", icon: Leaf },
        ]
      : pillars;

  return (
    <div ref={rootRef}>
      <PrimeMinisterPageShell lang={lang} onBack={onBack}>
        <SectionHeader lang={lang} subtitle={subtitle} title={title} />

        <div className="pm-ornament mt-2 flex justify-center">
          <GoldOrnament />
        </div>

        <p className="pm-statement system-detail-intro mx-auto mt-8 max-w-[900px] text-center text-[clamp(1.1rem,2vw,1.75rem)] font-light leading-relaxed text-[#17233b]">
          {statement}
        </p>

        <div className="pm-section-label system-detail-panel mt-10 flex items-center gap-4">
          <span className="h-px flex-1 bg-[#b99152]" />
          <p className={`shrink-0 ${displayFont} text-xs uppercase tracking-[0.25em] text-[#b99152] sm:text-sm`}>
            {pillarsLabel}
          </p>
          <span className="h-px flex-1 bg-[#b99152]" />
        </div>

        <div className="mt-2">
          {localPillars.map((item, index) => (
            <ListItemRow
              key={item.title}
              icon={item.icon}
              title={item.title}
              text={item.text}
              displayFont={displayFont}
              showDivider={index < localPillars.length - 1}
            />
          ))}
        </div>

        <div className="pm-footer-image system-detail-extra relative mt-8 h-[28vh] min-h-[200px] overflow-hidden sm:min-h-[240px] lg:min-h-[300px]">
          <img
            src={landscape}
            alt=""
            className="h-full w-full object-cover object-center [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_75%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_20%,black_75%,transparent)]"
          />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#17233b] to-transparent" />
        </div>
      </PrimeMinisterPageShell>
    </div>
  );
}
