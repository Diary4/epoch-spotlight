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
import masrourbarzani from "@/assets/images/masrourbarzani-removebg-preview.png";

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
    <section className="relative min-h-[700px] rounded-[24px] border-2 border-[#ead8b7] bg-white/78 px-6 pb-7 pt-14 shadow-[0_18px_40px_rgba(84,54,16,0.16)] backdrop-blur-md sm:min-h-[770px] sm:rounded-[26px] sm:px-8 sm:pb-8 sm:pt-16 lg:min-h-[860px] lg:px-9 lg:pb-10 lg:pt-18">
      <div className={`absolute left-1/2 top-[-38px] grid h-24 w-24 -translate-x-1/2 place-items-center rounded-full border-[6px] border-white ${circleBg} text-[#f8e5b8] shadow-[0_10px_25px_rgba(84,54,16,0.2)]`}>
        {isGold ? <Trophy size={54} strokeWidth={1.45} /> : <Compass size={54} strokeWidth={1.45} />}
      </div>

      <h2 className="text-center font-serif text-[30px] font-semibold text-[#17233b] sm:text-[36px] lg:text-[44px]">
        {title}
      </h2>

      <div className="mx-auto my-5 max-w-[390px]">
        <DecorativeLine color={main} />
      </div>

      <div className="space-y-1.5 lg:space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="grid grid-cols-[78px_1fr] gap-4 border-b border-[#e6d2aa] py-3.5 last:border-b-0 sm:grid-cols-[92px_1fr] sm:gap-5 sm:py-4 lg:grid-cols-[102px_1fr] lg:py-5">
              <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-[#ead8b7] bg-[#fffaf0] sm:h-18 sm:w-18 lg:h-20 lg:w-20" style={{ color: main }}>
                <Icon className="h-8 w-8 sm:h-[42px] sm:w-[42px] lg:h-[46px] lg:w-[46px]" strokeWidth={1.7} />
              </div>
              <div>
                <h3 className="font-serif text-[23px] font-semibold leading-tight text-[#17233b] sm:text-[28px] lg:text-[34px]">
                  {item.title}
                </h3>
                <p className="mt-1 text-[16px] font-semibold leading-snug text-[#344052] sm:text-[19px] lg:text-[23px]">
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
  const title = isAr ? "رئيس الوزراء" : "The Prime Minister";
  const name = isAr ? "مسرور بارزاني" : "Masrour Barzani";
  const subtitle = isAr
    ? "يقود إقليم كوردستان بتركيز على الإصلاح والابتكار وبناء مستقبل أفضل للجميع."
    : "Leading the Kurdistan Region with a focus on reform, innovation, and building a stronger future for all.";
  const achievementsTitle = isAr ? "الإنجازات المختارة" : "Selected Achievements";
  const visionTitle = isAr ? "الرؤية المستقبلية" : "Future Vision";
  const localAchievements = isAr
    ? [
        { title: "الإصلاح الاقتصادي", text: "التركيز على التنويع الاقتصادي ونمو القطاع الخاص.", icon: BarChart3 },
        { title: "حسابي", text: "توسيع تحديث الرواتب والشمول المالي.", icon: UsersRound },
        { title: "برنامج ڕووناکی", text: "العمل نحو طاقة كهربائية أكثر موثوقية وإصلاح قطاع الطاقة.", icon: Bolt },
        { title: "البنية التحتية", text: "تطوير الطرق والمياه والنقل والمشاريع الاستراتيجية.", icon: Route },
        { title: "الخدمات الرقمية", text: "دعم تحديث الخدمات العامة وأنظمة الحكومة.", icon: Monitor },
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
    <main className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#17233b]">
      <section ref={sectionRef} className="relative flex min-h-screen w-[min(96vw,1400px)] min-w-[100vw] flex-col overflow-hidden bg-[#fbf5eb] px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
        <button
          data-pm-rest="true"
          type="button"
          onClick={onBack}
          className="absolute left-4 top-4 z-30 grid h-12 w-12 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:left-8 sm:top-8 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          aria-label="Back to The System"
        >
          <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>
        <div className="absolute inset-0 opacity-16 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-0 h-full w-28 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute right-0 top-0 h-full w-28 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Replace this with your generated portrait image */}
        <div data-pm-portrait="true" className="pointer-events-none absolute right-0 top-0 h-[980px] w-[46vw] min-w-[620px]">
          <img
            src={masrourbarzani}
            alt="Prime Minister portrait placeholder"
            className="absolute inset-0 h-full w-full object-cover object-center [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/18 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[260px] bg-gradient-to-b from-transparent to-[#fbf5eb]" /> */}
        </div>

        {/* Scenic base image placeholder */}
        <div data-pm-rest="true" className="pointer-events-none absolute left-0 top-[620px] h-[360px] w-[50vw] min-w-[640px]">
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=90"
            alt="Kurdistan landscape placeholder"
            className="h-full w-full object-cover opacity-62 [mask-image:radial-gradient(circle_at_45%_55%,black_0%,black_55%,transparent_82%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fbf5eb] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col">
          <section data-pm-rest="true" className="max-w-[710px] pt-20 sm:pt-24 lg:pt-30">
            <h1 className="font-serif text-[62px] font-semibold leading-[1.02] tracking-tight text-[#17233b] sm:text-[78px] lg:text-[102px]">
              {title}
            </h1>

            <p className="mt-4 font-serif text-[34px] leading-tight text-[#9b6d35] sm:mt-5 sm:text-[42px] lg:text-[52px]">
              {name}
            </p>

            <div className="mt-7 w-[260px] sm:w-[360px] lg:w-[430px]">
              <DecorativeLine color="#b99152" />
            </div>

            <p className="mt-7 max-w-[560px] text-[21px] font-semibold leading-[1.45] text-[#2d3549] sm:text-[27px] lg:max-w-[660px] lg:text-[33px]">
              {subtitle}
            </p>
          </section>

          <div className="flex-1 min-h-[70px] lg:min-h-[100px]" />

          <section data-pm-rest="true" className="grid grid-cols-1 gap-6 pb-2 sm:grid-cols-2 sm:gap-7 lg:gap-8">
            <InfoPanel title={achievementsTitle} items={localAchievements} tone="gold" />
            <InfoPanel title={visionTitle} items={localVision} tone="green" />
          </section>
        </div>
      </section>
    </main>
  );
}
