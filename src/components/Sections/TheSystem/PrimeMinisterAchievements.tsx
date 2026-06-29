import {
  BarChart3,
  Bolt,
  Handshake,
  Monitor,
  Route,
  User,
  UsersRound,
} from "lucide-react";
import { useSystemDetailAnimation } from "@/components/Sections/TheSystem/useSystemDetailAnimation";
import { discoverDisplayFont } from "@/components/Sections/discoverLanguage";
import {
  GoldOrnament,
  ListItemRow,
  PrimeMinisterPageShell,
  SectionHeader,
} from "@/components/Sections/TheSystem/primeMinisterShared";
import cityscape from "@/assets/mainImages/theland/progress-4.webp";

const achievements = [
  {
    title: "Economic Reform",
    text: "Diversified the economy and reduced dependence on oil revenues.",
    icon: BarChart3,
  },
  {
    title: "MyAccount",
    text: "Launched MyAccount to modernize public sector payroll and ensure financial inclusion.",
    icon: User,
  },
  {
    title: "Runaki Program",
    text: "Expanded electricity production and improved the reliability of energy across the region.",
    icon: Bolt,
  },
  {
    title: "Infrastructure Development",
    text: "Invested in roads, bridges, airports, water projects, and urban development to connect communities.",
    icon: Route,
  },
  {
    title: "Digital Transformation",
    text: "Advanced digital services and e-government to make services faster, easier, and more transparent.",
    icon: Monitor,
  },
  {
    title: "Investment & Partnerships",
    text: "Attracted international investment and strengthened partnerships to support sustainable growth.",
    icon: Handshake,
  },
  {
    title: "Job Creation & Youth Empowerment",
    text: "Created more job opportunities and supported youth, entrepreneurship, and private sector development.",
    icon: UsersRound,
  },
];

type PrimeMinisterAchievementsProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

export default function PrimeMinisterAchievementsPage({ lang = "en", onBack }: PrimeMinisterAchievementsProps) {
  const rootRef = useSystemDetailAnimation([lang]);
  const displayFont = discoverDisplayFont(lang);
  const isAr = lang === "ar";
  const isKu = lang === "ku";

  const selectedLabel = isAr ? "مختارة" : isKu ? "هەڵبژێردراو" : "Selected";
  const title = isAr ? "الإنجازات" : isKu ? "دەستکەوتەکان" : "Achievements";

  const localItems = isAr
    ? [
        { title: "الإصلاح الاقتصادي", text: "تنويع الاقتصاد وتقليل الاعتماد على عائدات النفط.", icon: BarChart3 },
        { title: "حسابي", text: "إطلاق حسابي لتحديث رواتب القطاع العام وضمان الشمول المالي.", icon: User },
        { title: "برنامج ڕووناکی", text: "توسيع إنتاج الكهرباء وتحسين موثوقية الطاقة في جميع أنحاء الإقليم.", icon: Bolt },
        { title: "تطوير البنية التحتية", text: "الاستثمار في الطرق والجسور والمطارات ومشاريع المياه والتنمية الحضرية.", icon: Route },
        { title: "التحول الرقمي", text: "تطوير الخدمات الرقمية والحكومة الإلكترونية لجعل الخدمات أسرع وأسهل وأكثر شفافية.", icon: Monitor },
        { title: "الاستثمار والشراكات", text: "جذب الاستثمار الدولي وتعزيز الشراكات لدعم النمو المستدام.", icon: Handshake },
        { title: "خلق فرص العمل وتمكين الشباب", text: "خلق المزيد من فرص العمل ودعم الشباب وريادة الأعمال والقطاع الخاص.", icon: UsersRound },
      ]
    : isKu
      ? [
          { title: "چاکسازیی ئابووری", text: "هەمەجۆرکردنی ئابووری و کەمکردنەوەی پشتبەستن بە داهاتی نەوت.", icon: BarChart3 },
          { title: "هەژماری من", text: "دەستپێکردنی هەژماری من بۆ نوێکردنەوەی مووچەی کەرتی گشتی و دڵنیابوون لە گشتگیریی دارایی.", icon: User },
          { title: "پڕۆژەی ڕووناکی", text: "فراوانکردنی بەرهەمهێنانی کارەبا و باشترکردنی جێگیریی وزە لە سەرانسەری هەرێمدا.", icon: Bolt },
          { title: "پەرەپێدانی ژێرخان", text: "وەبەرهێنان لە ڕێگاوبان، پرد، فڕۆکەخانە، پڕۆژەی ئاو، و پەرەپێدانی شار.", icon: Route },
          { title: "گۆڕینی دیجیتاڵ", text: "پێشخستنی خزمەتگوزارییە دیجیتاڵییەکان و حکومەتی ئەلیکترۆنی بۆ خزمەتگوزاری خێراتر و ئاسانتر.", icon: Monitor },
          { title: "وەبەرهێنان و هاوبەشی", text: "ڕاکێشانی وەبەرهێنانی نێودەوڵەتی و بەهێزکردنی هاوبەشی بۆ پشتگیری گەشەی بەردەوام.", icon: Handshake },
          { title: "دروستکردنی کار و توانادارکردنی گەنجان", text: "دروستکردنی هەلی کاری زیاتر و پاڵپشتی گەنجان، کارسازی، و کەرتی تایبەت.", icon: UsersRound },
        ]
      : achievements;

  return (
    <div ref={rootRef as React.RefObject<HTMLDivElement>}>
      <PrimeMinisterPageShell lang={lang} onBack={onBack}>
        <SectionHeader lang={lang} subtitle={selectedLabel} title={title} />

        <div className="mt-2 flex justify-center">
          <GoldOrnament />
        </div>

        <div className="mt-4">
          {localItems.map((item, index) => (
            <ListItemRow
              key={item.title}
              icon={item.icon}
              title={item.title}
              text={item.text}
              displayFont={displayFont}
              showDivider={index < localItems.length - 1}
            />
          ))}
        </div>

        <div className="system-detail-extra relative mt-6 h-48 overflow-hidden sm:h-56">
          <img
            src={cityscape}
            alt=""
            className="h-full w-full object-cover object-center [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_70%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_25%,black_70%,transparent)]"
          />
        </div>
      </PrimeMinisterPageShell>
    </div>
  );
}
