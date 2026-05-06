import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  BarChart3,
  Bolt,
  BriefcaseBusiness,
  Compass,
  Handshake,
  Lightbulb,
  Monitor,
  Mountain,
  Route,
  ShieldCheck,
  Trophy,
  UsersRound,
} from "lucide-react";
import bg from "@/assets/mainImages/thesystem/system-1.png";

const achievements = [
  {
    title: "Economic Reform",
    text: "Focused on diversification and private-sector growth.",
    icon: BarChart3,
  },
  {
    title: "MyAccount",
    text: "Expanded payroll modernization and financial inclusion.",
    icon: UsersRound,
  },
  {
    title: "Runaki Program",
    text: "Worked toward more reliable electricity and energy reform.",
    icon: Bolt,
  },
  {
    title: "Infrastructure",
    text: "Advanced roads, water, transport, and strategic projects.",
    icon: Route,
  },
  {
    title: "Digital Services",
    text: "Supported modernization of public services and government systems.",
    icon: Monitor,
  },
];

const vision = [
  {
    title: "A Diversified Economy",
    text: "Build a stronger economy beyond oil.",
    icon: BarChart3,
  },
  {
    title: "Reliable Energy",
    text: "Improve electricity and essential services.",
    icon: Lightbulb,
  },
  {
    title: "Opportunity for Youth",
    text: "Create more jobs, innovation, and entrepreneurship.",
    icon: UsersRound,
  },
  {
    title: "Investment and Partnerships",
    text: "Strengthen global ties and attract investment.",
    icon: Handshake,
  },
  {
    title: "A Modern Kurdistan",
    text: "Support a stable, digital, and future-ready region.",
    icon: Mountain,
  },
];

function DecorativeLine({ color = "#c99a55" }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
      <span className="text-2xl" style={{ color }}>✥</span>
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
    </div>
  );
}

function InfoPanel({ title, items, tone = "gold" }) {
  const isGold = tone === "gold";
  const main = isGold ? "#c69237" : "#5d7757";
  const circleBg = isGold ? "bg-[#c69237]" : "bg-[#5d7757]";

  return (
    <section className="relative rounded-[20px] border-2 border-[#ead8b7] bg-white/78 px-4 pb-5 pt-12 shadow-[0_18px_40px_rgba(84,54,16,0.16)] backdrop-blur-md sm:rounded-[24px] sm:px-6 sm:pb-7 sm:pt-14 lg:rounded-[26px] lg:px-8 lg:pb-9 lg:pt-16">
      <div className={`absolute left-1/2 top-[-30px] grid h-20 w-20 -translate-x-1/2 place-items-center rounded-full border-4 border-white ${circleBg} text-[#f8e5b8] shadow-[0_10px_25px_rgba(84,54,16,0.2)] sm:top-[-34px] sm:h-24 sm:w-24 sm:border-[6px]`}>
        {isGold ? <Trophy className="h-10 w-10 sm:h-12 sm:w-12 lg:h-[54px] lg:w-[54px]" strokeWidth={1.45} /> : <Compass className="h-10 w-10 sm:h-12 sm:w-12 lg:h-[54px] lg:w-[54px]" strokeWidth={1.45} />}
      </div>

      <h2 className="text-center font-serif text-[clamp(1.6rem,4.2vw,2.75rem)] font-semibold text-[#17233b]">
        {title}
      </h2>

      <div className="mx-auto my-5 max-w-[390px]">
        <DecorativeLine color={main} />
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="grid grid-cols-[60px_1fr] gap-3 border-b border-[#e6d2aa] py-3 last:border-b-0 sm:grid-cols-[78px_1fr] sm:gap-4 sm:py-3.5 lg:grid-cols-[92px_1fr] lg:gap-5 lg:py-4">
              <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-[#ead8b7] bg-[#fffaf0] sm:h-16 sm:w-16 lg:h-18 lg:w-18" style={{ color: main }}>
                <Icon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-[42px] lg:w-[42px]" strokeWidth={1.7} />
              </div>
              <div>
                <h3 className="font-serif text-[clamp(1.05rem,2.4vw,2.05rem)] font-semibold leading-tight text-[#17233b]">
                  {item.title}
                </h3>
                <p className="mt-1 text-[clamp(0.9rem,1.8vw,1.45rem)] font-semibold leading-snug text-[#344052]">
                  {item.text}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
    </section>
  );
}

type PrimeMinisterPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

export default function PrimeMinisterPage({ lang = "en", onBack }: PrimeMinisterPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const isAr = lang === "ar";
  const isKu = lang === "ku";
  const title = isAr ? "رئيس الوزراء" : isKu ? "سەرۆک وەزیران" : "The Prime Minister";
  const name = isAr || isKu ? "مەسرور بارزانی" : "Masrour Barzani";
  const subtitle = isAr
    ? "يقود إقليم كوردستان بتركيز على الإصلاح والابتكار وبناء مستقبل أفضل للجميع."
    : isKu
      ? "ڕێبەرایەتی هەرێمی کوردستان دەکات بە پێداگری کردن لەسەر چاکسازی، داهێنان، و بونیادنانی داهاتوویەکی بەهێزتر بۆ هەمووان."
    : "Leading the Kurdistan Region with a focus on reform, innovation, and building a stronger future for all.";
  const achievementsTitle = isAr ? "الإنجازات المختارة" : isKu ? "دەستکەوتەکان" : "Selected Achievements";
  const visionTitle = isAr ? "الرؤية المستقبلية" : isKu ? "ئامانجەکانی داهاتوو" : "Future Vision";
  const localAchievements = isAr
    ? [
        { title: "الإصلاح الاقتصادي", text: "التركيز على التنويع الاقتصادي ونمو القطاع الخاص.", icon: BarChart3 },
        { title: "حسابي", text: "توسيع تحديث الرواتب والشمول المالي.", icon: UsersRound },
        { title: "برنامج ڕووناکی", text: "العمل نحو طاقة كهربائية أكثر موثوقية وإصلاح قطاع الطاقة.", icon: Bolt },
        { title: "البنية التحتية", text: "تطوير الطرق والمياه والنقل والمشاريع الاستراتيجية.", icon: Route },
        { title: "الخدمات الرقمية", text: "دعم تحديث الخدمات العامة وأنظمة الحكومة.", icon: Monitor },
      ]
    : isKu
      ? [
          { title: "چاکسازیی ئابوور", text: "جەختکردنەوە لەسەر هەمەجۆرکردن و گەشەی کەرتی تایبەت.", icon: BarChart3 },
          { title: "هەژماری من", text: "پەرەپێدانی بە دیجیتاڵکردنی مووچە و گشتگیریی دارایی.", icon: UsersRound },
          { title: "پڕۆژەی ڕووناکی", text: "کارکردن بۆ کارەبای جێگیرتر و چاکسازی لە وزەدا.", icon: Bolt },
          { title: "ژێرخان", text: "پێشخستنی ڕێگاوبان، ئاو، گواستنەوە، و پڕۆژە ستراتیژییەکان.", icon: Route },
          { title: "خزمەتگوزارییە دیجیتاڵییەکان", text: "پاڵپشتیکردنی پەرەپێدانی خزمەتگوزارییە گشتییەکان و سیستەمەکانی حکومەت.", icon: Monitor },
        ]
    : achievements;
  const localVision = isAr
    ? [
        { title: "اقتصاد متنوع", text: "بناء اقتصاد أقوى بعيدًا عن الاعتماد على النفط", icon: BarChart3 },
        { title: "طاقة موثوقة", text: "تحسين الكهرباء والخدمات الأساسية.", icon: Lightbulb },
        { title: "فرص للشباب", text: "توفير المزيد من فرص العمل والابتكار وريادة الأعمال.", icon: UsersRound },
        { title: "الاستثمار والشراكات", text: "تعزيز العلاقات الدولية واستقطاب الاستثمارات.", icon: Handshake },
        { title: "كوردستان الحديثة", text: "دعم إقليم مستقر ورقمي وجاهز للمستقبل.", icon: Mountain },
      ]
    : isKu
      ? [
          { title: "ئابوورییەکی هەمەجۆر", text: "بونیادنانی ئابوورییەکی بەهێزتر لە دەرەوەی نەوت.", icon: BarChart3 },
          { title: "وزەی جێگیر", text: "باشترکردنی کارەبا و خزمەتگوزارییە سەرەکییەکان.", icon: Lightbulb },
          { title: "دەرفەت بۆ گەنجان", text: "ڕەخساندنی هەلی کاری زیاتر، داهێنان، و کارسازی.", icon: UsersRound },
          { title: "وەبەرهێنان و هاوبەش", text: "بەهێزکردنی پەیوەندییە جیهانییەکان و ڕاکێشانی وەبەرهێنان.", icon: Handshake },
          { title: "کوردستانێکی مۆدێرن", text: "بونیادنانی هەرێمێکی سەقامگیر، دیجیتاڵ و ئامادە بۆ داهاتوو.", icon: Mountain },
        ]
    : vision;

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-pm-portrait='true']", { autoAlpha: 0, y: 10 });
      gsap.set("[data-pm-rest='true']", { autoAlpha: 0, y: 22 });

      gsap.to("[data-pm-portrait='true'], [data-pm-rest='true']", {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="m-0 flex min-h-screen w-full justify-center overflow-x-hidden bg-[#f8f1e7] p-0 text-[#17233b]">
      <section ref={sectionRef} className="relative flex min-h-screen w-full max-w-[1400px] flex-col overflow-hidden bg-[#fbf5eb] px-4 py-6 sm:px-8 sm:py-9 lg:px-12 lg:py-12">
        <button
          data-pm-rest="true"
          type="button"
          onClick={onBack}
          className="absolute left-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:left-6 sm:top-6 sm:h-12 sm:w-12 lg:left-8 lg:top-8 lg:h-14 lg:w-14"
          aria-label="Back to The System"
        >
          <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
        </button>
        <div className="absolute left-0 top-0 h-full w-16 opacity-16 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] sm:w-24 sm:opacity-20" />
        <div className="absolute right-0 top-0 h-full w-16 opacity-16 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] sm:w-24 sm:opacity-20" />

        {/* Replace this with your generated portrait image */}
        <div data-pm-portrait="true" className="pointer-events-none absolute right-0 top-0 h-[60vh] min-h-[420px] w-full sm:h-[72vh] sm:min-h-[540px] lg:h-[1280px]">
          <img
            src={bg}
            alt="Prime Minister portrait placeholder"
            className="absolute inset-0 h-full w-full object-cover object-[center_top] [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/18 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[260px] bg-gradient-to-b from-transparent to-[#fbf5eb]" /> */}
        </div>

        <div className="relative z-10 flex flex-1 flex-col">
          <section data-pm-rest="true" className="max-w-[710px] pt-16 sm:pt-20 lg:pt-28">
            <h1 className="font-serif text-[clamp(2.2rem,9vw,6.4rem)] font-semibold leading-[1.02] tracking-tight text-[#17233b]">
              {title}
            </h1>

            <p className="mt-3 font-serif text-[clamp(1.5rem,5.2vw,3.25rem)] leading-tight text-[#9b6d35] sm:mt-4">
              {name}
            </p>

            <div className="mt-5 w-[200px] sm:mt-6 sm:w-[300px] lg:w-[430px]">
              <DecorativeLine color="#b99152" />
            </div>

            <p className="mt-5 max-w-[660px] text-[clamp(1rem,2.5vw,2.05rem)] font-semibold leading-[1.45] text-[#2d3549] sm:mt-6">
              {subtitle}
            </p>
          </section>

          <div className="flex-1 min-h-10 sm:min-h-14 lg:min-h-[90px]" />

          <section data-pm-rest="true" className="grid grid-cols-1 gap-4 pb-2 sm:grid-cols-2 sm:gap-6 lg:gap-8">
            <InfoPanel title={achievementsTitle} items={localAchievements} tone="gold" />
            <InfoPanel title={visionTitle} items={localVision} tone="green" />
          </section>
        </div>
      </section>
    </main>
  );
}
