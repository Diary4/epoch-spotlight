import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Gauge,
  Handshake,
  Landmark,
  Settings,
  ShieldCheck,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { localizeDigits } from "@/lib/utils";
import bg from "@/assets/mainImages/government.png"
import bg2 from "@/assets/mainImages/government-2.png"

const mainCards = [
  {
    number: "1",
    title: "Public Services",
    text: "Supports education, health, water, electricity, and daily services.",
    icon: UsersRound,
    color: "#13213b",
  },
  {
    number: "2",
    title: "Policy Implementation",
    text: "Turns plans and decisions into action.",
    icon: ClipboardCheck,
    color: "#405846",
  },
  {
    number: "3",
    title: "Administration",
    text: "Coordinates ministries and institutional work.",
    icon: Building2,
    color: "#963538",
  },
];

const keyAreas = [
  {
    title: "Ministries",
    text: "Lead core sectors of governance.",
    icon: Landmark,
    color: "#13213b",
  },
  {
    title: "Public Services",
    text: "Deliver essential services to citizens.",
    icon: UsersRound,
    color: "#405846",
  },
  {
    title: "Community Engagement",
    text: "Work with local communities.",
    icon: Handshake,
    color: "#963538",
  },
  {
    title: "Economic Management",
    text: "Manage resources and budgets.",
    icon: TrendingUp,
    color: "#405846",
  },
  {
    title: "Transparency & Accountability",
    text: "Uphold integrity and public trust.",
    icon: ShieldCheck,
    color: "#13213b",
  },
  {
    title: "Planning & Development",
    text: "Plan for growth and improvement.",
    icon: Settings,
    color: "#13213b",
  },
];

function SmallDivider() {
  return (
    <div className="mx-auto my-6 flex w-44 items-center justify-center gap-3 text-[#b99152]">
      <span className="h-0.5 flex-1 bg-[#d7bc81]" />
      <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
      <span className="h-0.5 flex-1 bg-[#d7bc81]" />
    </div>
  );
}

type GovernmentPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

export default function GovernmentPage({ lang = "en", onBack }: GovernmentPageProps) {
  const isAr = lang === "ar";
  const isKu = lang === "ku";
  const localMainCards = isAr
    ? [
        { number: "1", title: "الخدمات العامة", text: "دعم التعليم والصحة والمياه والكهرباء والخدمات اليومية.", icon: UsersRound, color: "#13213b" },
        { number: "2", title: "تنفيذ السياسات", text: "تحويل الخطط والقرارات إلى واقع ملموس.", icon: ClipboardCheck, color: "#405846" },
        { number: "3", title: "الإدارة", text: "تنسيق عمل الوزارات والمؤسسات.", icon: Building2, color: "#963538" },
      ]
    : isKu
      ? [
          { number: "1", title: "خزمەتگوزارییە گشتییەکان", text: "پاڵپشتی پەروەردە، تەندروستی، ئاو، کارەبا، و خزمەتگوزارییەکانی ڕۆژانەکان دەکات.", icon: UsersRound, color: "#13213b" },
          { number: "2", title: "جێبەجێکردنی سیاسەت", text: "پلان و بڕیارەکان دەگۆڕێت بۆ کردار.", icon: ClipboardCheck, color: "#405846" },
          { number: "3", title: "کارگێڕی", text: "هەماهەنگی لەنێوان وەزارەتەکان و کارە دامەزراوەیییەکان دەکات.", icon: Building2, color: "#963538" },
        ]
    : mainCards;
  const localKeyAreas = isAr
    ? [
        { title: "الوزارات", text: "قيادة القطاعات الأساسية للحوكمة.", icon: Landmark, color: "#13213b" },
        { title: "الخدمات العامة", text: "تقديم الخدمات الأساسية للمواطنين.", icon: UsersRound, color: "#405846" },
        { title: "المشاركة المجتمعية", text: "العمل مع المجتمعات المحلية.", icon: Handshake, color: "#963538" },
        { title: "الإدارة الاقتصادية", text: "إدارة الموارد والميزانيات.", icon: TrendingUp, color: "#405846" },
        { title: "الشفافية والمساءلة", text: "صون النزاهة وثقة المواطن.", icon: ShieldCheck, color: "#13213b" },
        { title: "التخطيط والتنمية", text: "التخطيط للنمو والتحسين المستمر.", icon: Settings, color: "#13213b" },
      ]
    : isKu
      ? [
          { title: "وەزارەتەکان", text: "ڕێبەرایەتی کەرتە سەرەکییەکانی حکومڕانی دەکەن.", icon: Landmark, color: "#13213b" },
          { title: "خزمەتگوزارییە گشتییەکان", text: "گەیاندنی خزمەتگوزارییە سەرەکییەکان بۆ هاووڵاتییان.", icon: UsersRound, color: "#405846" },
          { title: "بەشداریی کۆمەڵایەتی", text: "کارکردن لەگەڵ کۆمەڵگە ناوخۆیییەکان.", icon: Handshake, color: "#963538" },
          { title: "بەڕێوەبردنی ئابووری", text: "بەڕێوەبردنی سەرچاوەکان و بودجەکان.", icon: TrendingUp, color: "#405846" },
          { title: "شەفافیەت و لێپرسینەوە", text: "پاراستنی دەستپاکی و متمانەی گشتی.", icon: ShieldCheck, color: "#13213b" },
          { title: "پلاندانان و گەشەپێدان", text: "پلاندانان بۆ گەشە و پەرەپێدان.", icon: Settings, color: "#13213b" },
        ]
    : keyAreas;

  return (
    <main className="m-0 flex min-h-[100dvh] w-full max-w-none flex-col bg-[#f8f1e7] text-[#17233b] [padding-bottom:max(env(safe-area-inset-bottom),12px)]">
      <section className="relative mx-auto flex w-[min(100vw,1400px)] max-w-none flex-1 flex-col overflow-hidden rounded-[clamp(12px,1.5vw,28px)] bg-[#fbf5eb]">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-[clamp(16px,2.5vw,40px)] top-[clamp(16px,2vh,36px)] z-30 grid h-[clamp(52px,7vw,72px)] w-[clamp(52px,7vw,72px)] place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm touch-manipulation"
          aria-label="Back to The System"
        >
          <ArrowLeft className="h-[clamp(22px,3vw,32px)] w-[clamp(22px,3vw,32px)]" />
        </button>
        <div className="absolute left-0 top-0 h-full w-[clamp(64px,10vw,112px)] opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute right-0 top-0 h-full w-[clamp(64px,10vw,112px)] opacity-14 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        <div className="pointer-events-none absolute right-0 top-0 z-0 h-[min(92vh,1100px)] w-full overflow-hidden">
          <img
            src={bg}
            alt="Government building placeholder"
            className="absolute inset-0 h-full w-full object-cover object-right"
          />
        </div>

        <div className="px-[clamp(18px,3.2vw,52px)] py-[clamp(14px,2vh,36px)] relative z-10 flex min-h-0 flex-1 flex-col gap-y-[clamp(24px,3.5vh,56px)]">
          <section className="mt-[clamp(4px,1vh,12px)] max-w-[min(92vw,720px)]">
            <div className="grid h-[clamp(88px,11vw,112px)] w-[clamp(88px,11vw,112px)] place-items-center rounded-full border-[6px] border-white bg-[#405846] text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)]">
              <Building2 className="h-[clamp(40px,5vw,58px)] w-[clamp(40px,5vw,58px)]" strokeWidth={1.45} />
            </div>

            <h1 className="mt-[clamp(28px,4vh,48px)] font-serif text-[clamp(3rem,9vw,5.5rem)] font-semibold leading-none tracking-tight text-[#17233b]">
              {isAr ? "الحكومة" : isKu ? "حکومەت" : "Government"}
            </h1>

            <p className="mt-[clamp(20px,3vh,36px)] text-[clamp(1.25rem,2.6vw,2rem)] font-bold leading-tight text-[#9b6d35]">
              {isAr ? "الجهاز التنفيذي المسؤول عن الإدارة والخدمات العامة." : isKu ? "دەستەی جێبەجێکار کە بەرپرسە لە کارگێڕی و خزمەتگوزارییە گشتییەکان." : "The executive body responsible for administration and public services."}
            </p>

            <div className="mt-[clamp(20px,3vh,36px)] flex w-[min(230px,52vw)] items-center gap-4 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>

            <p className="mt-[clamp(20px,3vh,36px)] max-w-[min(92vw,480px)] text-[clamp(1.0625rem,1.9vw,1.5625rem)] font-medium leading-[1.55] text-[#2d3549]">
              {isAr
                ? "تنفّذ الحكومة السياسات وتدير الخدمات وتشرف على الإدارة اليومية."
                : isKu
                  ? "حکومەت سیاسەتەکان جێبەجێ دەکات، خزمەتگوزارییەکان بەڕێوەدەبات، و سەرپەرشتی کارگێڕی ڕۆژانە دەکات."
                : "The government implements policy, manages services, and oversees daily administration."}
            </p>
          </section>

          <section className="mt-[clamp(36px,24vh,400px)] grid grid-cols-1 gap-[clamp(16px,2.2vw,36px)] pb-[clamp(8px,1.5vh,20px)] sm:grid-cols-3">
            {localMainCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="relative flex min-h-[clamp(300px,34vh,480px)] flex-col items-center overflow-hidden rounded-[clamp(18px,2vw,28px)] border-2 border-[#ead8b7] bg-white/78 px-[clamp(16px,2.4vw,36px)] py-[clamp(18px,2.2vh,36px)] text-center shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md touch-manipulation"
                >
                  <div
                    className="grid h-[clamp(88px,11vw,112px)] w-[clamp(88px,11vw,112px)] place-items-center rounded-full border-[6px] border-white text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)]"
                    style={{ backgroundColor: card.color }}
                  >
                    <Icon className="h-[clamp(40px,5vw,58px)] w-[clamp(40px,5vw,58px)]" strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-[clamp(20px,2.5vh,32px)] flex flex-wrap items-center justify-center gap-3 font-serif text-[clamp(1.125rem,2vw,1.6875rem)] font-semibold leading-tight" style={{ color: card.color }}>
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[clamp(1rem,1.6vw,1.375rem)] font-bold text-white"
                      style={{ backgroundColor: card.color }}
                    >
                      {localizeDigits(card.number, lang)}
                    </span>
                    {localizeDigits(card.title, lang)}
                  </h3>

                  <SmallDivider />

                  <p className="text-[clamp(1.0625rem,1.75vw,1.4375rem)] font-medium leading-[1.45] text-[#35435b]">
                    {localizeDigits(card.text, lang)}
                  </p>

                  <button
                    type="button"
                    className="mt-auto grid h-16 w-16 place-items-center rounded-full text-white shadow-md touch-manipulation"
                    style={{ backgroundColor: card.color }}
                  >
                    <ArrowRight className="h-[clamp(26px,3.5vw,34px)] w-[clamp(26px,3.5vw,34px)]" />
                  </button>

                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                </article>
              );
            })}
          </section>

          {/* Key areas section */}
          <section className="rounded-[22px] border-2 border-[#ead8b7] bg-white/60 px-5 pb-6 pt-0 shadow-[0_12px_30px_rgba(84,54,16,0.1)] backdrop-blur-md">
            <div className="mb-5 flex items-center gap-5 px-3 pt-0 font-serif text-[28px] font-semibold text-[#9b6d35]">
              {isAr ? <span>المجالات الرئيسية لعمل الحكومة</span> : isKu ? <span>بوارە سەرەکییەکانی کاری حکومەت</span> : <span>Key Areas of Government Work</span>}
              <span className="h-0.5 flex-1 bg-[#c7a05d]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#c7a05d]" />
            </div>

            <div className="grid grid-cols-6 gap-5">
              {localKeyAreas.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="flex min-h-[205px] flex-col items-center justify-start rounded-[14px] border border-[#ead8b7] bg-[#fffaf0]/80 px-3 py-5 text-center"
                  >
                    <Icon size={52} strokeWidth={1.5} style={{ color: item.color }} />
                    <h4 className="mt-4 font-serif text-[20px] font-semibold leading-tight text-[#17233b]">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-[15px] font-semibold leading-snug text-[#35435b]">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Bottom note */}
          <section className="mt-6 flex min-h-[115px] items-center overflow-hidden rounded-[18px] border-2 border-[#ead8b7] bg-white/68 shadow-[0_10px_25px_rgba(84,54,16,0.1)] backdrop-blur-md">
            <div className="ml-10 mr-8 grid h-24 w-24 place-items-center rounded-full border-[6px] border-white bg-[#c59a4b] text-[#f8e5b8] shadow-md">
              <FileText size={54} strokeWidth={1.45} />
            </div>
            <p className="max-w-[700px] text-[25px] font-semibold leading-tight text-[#2d3549]">
              {isAr
                ? "تعمل الحكومة على تحسين جودة الحياة وحماية الحقوق وبناء كوردستان أقوى."
                : isKu
                  ? "حکومەت کاردەکات بۆ باشترکردنی کوالێتی ژیان، پاراستنی مافەکان، و بونیادنانی کوردستانێکی بەهێزتر."
                : "The government works to improve quality of life, protect rights, and build a stronger Kurdistan."}
            </p>
            <img src={bg2} alt="Government background" className="h-[min(200px,16vh)] w-full shrink-0 bg-center sm:ml-auto sm:block sm:h-auto sm:min-h-[100px] sm:w-[clamp(180px,22vw,280px)]" />
          </section>
        </div>
      </section>
    </main>
  );
}
