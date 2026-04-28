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
  const localMainCards = isAr
    ? [
        { number: "1", title: "الخدمات العامة", text: "دعم التعليم والصحة والمياه والكهرباء والخدمات اليومية.", icon: UsersRound, color: "#13213b" },
        { number: "2", title: "تنفيذ السياسات", text: "تحويل الخطط والقرارات إلى واقع ملموس.", icon: ClipboardCheck, color: "#405846" },
        { number: "3", title: "الإدارة", text: "تنسيق عمل الوزارات والمؤسسات.", icon: Building2, color: "#963538" },
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
    : keyAreas;

  return (
    <main className="min-h-screen w-full bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fbf5eb] px-12 py-8">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm"
          aria-label="Back to The System"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="absolute inset-0 opacity-16 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-0 h-full w-28 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute right-0 top-0 h-full w-28 opacity-14 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Replace this with your generated government background image */}
        <div className="pointer-events-none absolute right-0 top-[80px] h-[680px] w-[850px]">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=90"
            alt="Government building placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-76 [mask-image:radial-gradient(circle_at_62%_52%,black_0%,black_57%,transparent_84%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/24 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbf5eb]" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col">
          {/* Top breadcrumb */}
          <div className="flex items-center gap-4 text-[27px] font-semibold text-[#9b6d35]">
            <span className="text-4xl">‹</span>
            <span>{isAr ? "النظام" : "The System"}</span>
          </div>

          {/* Hero */}
          <section className="mt-7 max-w-[570px]">
            <div className="grid h-28 w-28 place-items-center rounded-full border-[6px] border-white bg-[#405846] text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)]">
              <Building2 size={58} strokeWidth={1.45} />
            </div>

            <h1 className="mt-12 font-serif text-[88px] font-semibold leading-none tracking-tight text-[#17233b]">
              {isAr ? "الحكومة" : "Government"}
            </h1>

            <p className="mt-8 text-[32px] font-bold leading-tight text-[#9b6d35]">
              {isAr ? "الجهاز التنفيذي المسؤول عن الإدارة والخدمات العامة." : "The executive body responsible for administration and public services."}
            </p>

            <div className="mt-9 flex w-[230px] items-center gap-4 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>

            <p className="mt-9 max-w-[460px] text-[25px] font-medium leading-[1.55] text-[#2d3549]">
              {isAr
                ? "تنفّذ الحكومة السياسات وتدير الخدمات وتشرف على الإدارة اليومية."
                : "The government implements policy, manages services, and oversees daily administration."}
            </p>
          </section>

          <div className="flex-1" />

          {/* 3 Cards */}
          <section className="grid grid-cols-3 gap-8 pb-8">
            {localMainCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="relative flex min-h-[430px] flex-col items-center overflow-hidden rounded-[24px] border-2 border-[#ead8b7] bg-white/78 px-8 py-9 text-center shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md"
                >
                  <div
                    className="grid h-28 w-28 place-items-center rounded-full border-[6px] border-white text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)]"
                    style={{ backgroundColor: card.color }}
                  >
                    <Icon size={58} strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-8 flex items-center justify-center gap-3 font-serif text-[27px] font-semibold leading-tight" style={{ color: card.color }}>
                    <span
                      className="grid h-9 w-9 place-items-center rounded-full text-[22px] font-bold text-white"
                      style={{ backgroundColor: card.color }}
                    >
                      {card.number}
                    </span>
                    {card.title}
                  </h3>

                  <SmallDivider />

                  <p className="text-[23px] font-medium leading-[1.45] text-[#35435b]">
                    {card.text}
                  </p>

                  <button
                    className="mt-auto grid h-15 w-15 place-items-center rounded-full text-white shadow-md"
                    style={{ backgroundColor: card.color }}
                  >
                    <ArrowRight size={34} />
                  </button>

                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                </article>
              );
            })}
          </section>

          {/* Key areas section */}
          <section className="rounded-[22px] border-2 border-[#ead8b7] bg-white/60 px-5 pb-6 pt-0 shadow-[0_12px_30px_rgba(84,54,16,0.1)] backdrop-blur-md">
            <div className="mb-5 flex items-center gap-5 px-3 pt-0 font-serif text-[28px] font-semibold text-[#9b6d35]">
              {isAr ? <span>المجالات الرئيسية لعمل الحكومة</span> : <span>Key Areas of Government Work</span>}
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
                : "The government works to improve quality of life, protect rights, and build a stronger Kurdistan."}
            </p>
            <div className="ml-auto h-full w-[260px] opacity-25 [background-image:url('https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=70')] bg-cover bg-center" />
          </section>
        </div>
      </section>
    </main>
  );
}
