import React from "react";
import { useSystemDetailAnimation } from "@/components/Sections/TheSystem/useSystemDetailAnimation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  ClipboardCheck,
  FileText,
  Handshake,
  Landmark,
  Settings,
  ShieldCheck,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { localizeDigits } from "@/lib/utils";
import bg from "@/assets/mainImages/government.webp"
import bg2 from "@/assets/mainImages/government-2.webp"
import pattern1 from "@/assets/images/patterns/card-1.png";
import pattern2 from "@/assets/images/patterns/card-2.png";
import pattern3 from "@/assets/images/patterns/card-3.png";

const cardPatterns = [pattern1, pattern2, pattern3];

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
    <div className="mx-auto my-3 xs:my-4 sm:my-6 flex w-12 xs:w-16 sm:w-44 items-center justify-center gap-1 sm:gap-3 text-[#b99152]">
      <span className="h-0.5 flex-1 bg-[#d7bc81]" />
      <span className="h-1.5 w-1.5 xs:h-2 xs:w-2 sm:h-3 sm:w-3 rotate-45 border border-[#b99152] sm:border-2" />
      <span className="h-0.5 flex-1 bg-[#d7bc81]" />
    </div>
  );
}

type GovernmentPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

export default function GovernmentPage({ lang = "en", onBack }: GovernmentPageProps) {
  const rootRef = useSystemDetailAnimation([lang]);
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
    <main ref={rootRef} className="m-0 flex min-h-[100dvh] w-full max-w-full flex-col overflow-x-hidden bg-[#f8f1e7] text-[#17233b] [padding-bottom:max(env(safe-area-inset-bottom),12px)]">
      <section className="relative mx-auto flex w-full max-w-[min(100vw,1400px)] flex-1 flex-col overflow-x-clip rounded-[clamp(12px,1.5vw,28px)] bg-[#fbf5eb]">
        
        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          className="system-detail-back absolute left-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-full border border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:border-2 sm:left-6 sm:top-6 sm:h-14 sm:w-14 lg:left-8 lg:top-8 lg:h-16 lg:w-16"
          aria-label="Back to The System"
        >
          <ArrowLeft className="h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>
        <div className="absolute left-0 top-0 hidden h-full w-[clamp(64px,10vw,112px)] opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] sm:block" />
        <div className="absolute right-0 top-0 hidden h-full w-[clamp(64px,10vw,112px)] opacity-14 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px] sm:block" />

        {/* Blended background illustration — anchored to the top on every screen so
            there is no white gap above it, fading into the paper at the bottom. */}
        <div className="pointer-events-none absolute right-0 top-0 h-[min(86vh,1000px)] w-full overflow-hidden">
          <img
            src={bg}
            alt="Government building portrait placeholder"
            className="system-detail-hero absolute inset-0 h-full w-full object-cover object-right
                      [mask-image:linear-gradient(to_bottom,black_0%,black_72%,rgba(0,0,0,0.75)_82%,rgba(0,0,0,0.35)_92%,transparent_100%)]"
          />
          {/* Left fade keeps the heading readable over the image on every screen */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/25 to-transparent" />
        </div>

        {/* Padding px-3 on mobile to maximize card grid width */}
        <div className="px-3 xs:px-[clamp(18px,3.2vw,52px)] py-[clamp(14px,2vh,36px)] relative z-10 flex min-h-0 flex-1 flex-col gap-y-[clamp(24px,3.5vh,56px)]">
          <section className="system-detail-intro max-w-[min(92vw,720px)] break-words pt-12 sm:pt-0 mt-[clamp(4px,1vh,12px)]">
            <h1 className="font-serif text-[clamp(2.4rem,9vw,5.5rem)] font-light leading-none tracking-tight text-[#17233b]">
              {isAr ? "الحكومة" : isKu ? "حکومەت" : "Government"}
            </h1>

            <p className="mt-[clamp(16px,3vh,36px)] text-[clamp(1.25rem,2.6vw,2rem)] font-light leading-tight text-[#9b6d35]">
              {isAr ? "الجهاز التنفيذي المسؤول عن الإدارة والخدمات العامة." : isKu ? "دەستەی جێبەجێکار کە بەرپرسە لە کارگێڕی و خزمەتگوزارییە گشتییەکان." : "The executive body responsible for administration and public services."}
            </p>

            <div className="mt-[clamp(16px,3vh,36px)] flex w-[min(150px,52vw)] items-center gap-3 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-2.5 w-2.5 rotate-45 border-2 border-[#b99152]" />
              <span className="h-0.5 flex-1 bg-[#b99152]" />
            </div>

            <p className="mt-[clamp(16px,3vh,36px)] max-w-[min(92vw,480px)] text-[clamp(1.0625rem,1.9vw,1.5625rem)] font-medium leading-[1.55] text-[#2d3549]">
              {isAr
                ? "تنفّذ الحكومة السياسات وتدير الخدمات وتشرف على الإدارة اليومية."
                : isKu
                  ? "حکومەت سیاسەتەکان جێبەجێ دەکات، خزمەتگوزارییەکان بەڕێوەدەبات، و سەرپەرشتی کارگێڕی ڕۆژانە دەکات."
                : "The government implements policy, manages services, and oversees daily administration."}
            </p>
          </section>

          {/* Cards section - mt-12 (xs:mt-16) pushes cards below text content on mobile */}
          <section className="relative z-10 mt-[200px] sm:mt-[500px] grid grid-cols-3 gap-1.5 xs:gap-2.5 sm:gap-5 pb-4 pt-4 lg:gap-6 lg:pb-8 lg:pt-10">
            {localMainCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="system-detail-card relative flex min-h-[140px] xs:min-h-[180px] sm:min-h-[420px] lg:min-h-[480px] flex-col items-center overflow-hidden rounded-[12px] border border-[#ead8b7] bg-white/78 px-1.5 py-4 xs:px-3 xs:py-5 sm:border-2 sm:rounded-[20px] sm:px-6 sm:py-8 lg:px-[clamp(16px,2.4vw,36px)] lg:py-[clamp(18px,2.2vh,36px)] text-center shadow-[0_4px_12px_rgba(84,54,16,0.1)] sm:shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md touch-manipulation"
                >
                  <div
                    className="grid h-10 w-10 xs:h-12 xs:w-12 sm:h-[clamp(88px,11vw,112px)] sm:w-[clamp(88px,11vw,112px)] place-items-center rounded-full border-2 xs:border-4 sm:border-[6px] border-white text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)]"
                    style={{ backgroundColor: card.color }}
                  >
                    <Icon className="h-5 w-5 xs:h-6 xs:w-6 sm:h-[clamp(40px,5vw,58px)] sm:w-[clamp(40px,5vw,58px)]" strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-2.5 xs:mt-4 sm:mt-[clamp(20px,2.5vh,32px)] flex flex-wrap items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 font-serif text-[9px] xs:text-[11px] sm:text-[24px] lg:text-[34px] font-light leading-tight" style={{ color: card.color }}>
                    <span
                      className="grid h-4 w-4 xs:h-5 xs:w-5 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-full text-[7px] xs:text-[9px] sm:text-[clamp(1rem,1.6vw,1.375rem)] font-light text-white"
                      style={{ backgroundColor: card.color }}
                    >
                      {localizeDigits(card.number, lang)}
                    </span>
                    {localizeDigits(card.title, lang)}
                  </h3>

                  <SmallDivider />

                  <p className="text-[8px] xs:text-[9.5px] sm:text-[15px] lg:text-[24px] font-medium leading-[1.45] text-[#35435b]">
                    {localizeDigits(card.text, lang)}
                  </p>

                  <button
                    type="button"
                    className="relative z-10 mt-auto grid h-7 w-7 xs:h-9 xs:w-9 sm:h-16 sm:w-16 place-items-center rounded-full text-white shadow-md touch-manipulation"
                    style={{ backgroundColor: card.color }}
                  >
                    <ArrowRight className="h-3.5 w-3.5 xs:h-4.5 xs:w-4.5 sm:h-[clamp(26px,3.5vw,34px)] sm:w-[clamp(26px,3.5vw,34px)]" />
                  </button>

                  <img
                    src={cardPatterns[index % cardPatterns.length]}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-[clamp(24px,4vh,72px)] w-full object-cover opacity-[0.15] [mask-image:linear-gradient(to_top,black_45%,transparent_100%)]"
                  />
                </article>
              );
            })}
          </section>

          {/* Key areas section */}
          <section className="system-detail-panel rounded-[12px] sm:rounded-[22px] border border-[#ead8b7] sm:border-2 bg-white/60 px-3 pb-6 pt-3 xs:px-4 xs:pb-8 xs:pt-4 sm:px-5 shadow-[0_4px_12px_rgba(84,54,16,0.1)] sm:shadow-[0_12px_30px_rgba(84,54,16,0.1)] backdrop-blur-md">
            <div className="mb-4 flex flex-col items-start gap-1.5 px-1 pt-0 font-serif text-[15px] xs:text-[18px] sm:text-[28px] font-light text-[#9b6d35] sm:flex-row sm:items-center sm:gap-5 sm:px-3">
              {isAr ? <span>المجالات الرئيسية لعمل الحكومة</span> : isKu ? <span>بوارە سەرەکییەکانی کاری حکومەت</span> : <span>Key Areas of Government Work</span>}
              <span className="hidden h-0.5 flex-1 bg-[#c7a05d] sm:block" />
              <span className="hidden h-3 w-3 rotate-45 border-2 border-[#c7a05d] sm:block" />
            </div>

            <div className="grid grid-cols-1 gap-3 xs:gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-6">
              {localKeyAreas.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="flex min-h-[140px] xs:min-h-[185px] sm:min-h-[205px] flex-col items-center justify-start rounded-[8px] xs:rounded-[14px] border border-[#ead8b7] bg-[#fffaf0]/80 px-2 py-4 xs:px-3 xs:py-5 text-center"
                  >
                    <Icon className="h-8 w-8 xs:h-10 xs:w-10 sm:h-[clamp(40px,10vw,52px)] sm:w-[clamp(40px,10vw,52px)]" strokeWidth={1.5} style={{ color: item.color }} />
                    <h4 className="mt-3 xs:mt-4 font-serif text-[12px] xs:text-[14px] sm:text-[20px] font-light leading-tight text-[#17233b]">
                      {item.title}
                    </h4>
                    <p className="mt-1.5 xs:mt-2 text-[10px] xs:text-[12px] sm:text-[15px] font-light leading-snug text-[#35435b]">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Bottom note */}
          <section className="system-detail-panel mt-6 flex flex-col items-center gap-4 overflow-hidden rounded-[12px] sm:rounded-[18px] border border-[#ead8b7] sm:border-2 bg-white/68 px-4 py-5 shadow-[0_4px_12px_rgba(84,54,16,0.1)] sm:shadow-[0_10px_25px_rgba(84,54,16,0.1)] backdrop-blur-md sm:min-h-[115px] sm:flex-row sm:items-center sm:px-0 sm:py-0">
            <div className="grid h-12 w-12 xs:h-16 xs:w-16 sm:h-24 sm:w-24 shrink-0 place-items-center rounded-full border-2 xs:border-[4px] sm:border-[6px] border-white bg-[#c59a4b] text-[#f8e5b8] shadow-md sm:ml-10 sm:mr-8">
              <FileText className="h-6 w-6 xs:h-8 xs:w-8 sm:h-[clamp(36px,9vw,54px)] sm:w-[clamp(36px,9vw,54px)]" strokeWidth={1.45} />
            </div>
            <p className="max-w-[700px] break-words text-center text-[12px] xs:text-[15px] sm:text-[25px] font-light leading-tight text-[#2d3549] sm:text-left">
              {isAr
                ? "تعمل الحكومة على تحسين جودة الحياة وحماية الحقوق وبناء كوردستان أقوى."
                : isKu
                  ? "حکومەت کاردەکات بۆ باشترکردنی کوالێتی ژیان، پاراستنی مافەکان، و بونیادنانی کوردستانێکی بەهێزتر."
                : "The government works to improve quality of life, protect rights, and build a stronger Kurdistan."}
            </p>
            <img src={bg2} alt="Government background" className="mx-auto h-[100px] xs:h-[130px] sm:h-auto w-full max-w-[320px] shrink-0 object-cover object-center sm:ml-auto sm:block sm:min-h-[100px] sm:w-[clamp(180px,22vw,280px)] sm:max-w-none" />
          </section>
        </div>
      </section>
    </main>
  );
}