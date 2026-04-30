import React from "react";
import { ArrowLeft, ArrowRight, BookOpenCheck, Building2, Landmark, Scale, UsersRound } from "lucide-react";

const cards = [
  {
    title: "Constitutional Role",
    text: "Supports the institutional framework of the Region.",
    icon: BookOpenCheck,
  },
  {
    title: "National Role",
    text: "Represents unity, continuity, and public dignity.",
    icon: UsersRound,
  },
  {
    title: "Institutional Balance",
    text: "Works within the wider governance system.",
    icon: Building2,
  },
];

function Divider({ wide = false }) {
  return (
    <div className={`flex items-center gap-4 text-[#b99152] ${wide ? "w-[260px]" : "w-[120px]"}`}>
      <span className="h-0.5 flex-1 bg-[#b99152]" />
      <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
      <span className="h-0.5 flex-1 bg-[#b99152]" />
    </div>
  );
}

type PresidencyPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

export default function PresidencyPage({ lang = "en", onBack }: PresidencyPageProps) {
  const isAr = lang === "ar";
  const isKu = lang === "ku";
  const localCards = isAr
    ? [
        { title: "الدور الدستوري", text: "دعم الإطار المؤسسي للإقليم.", icon: BookOpenCheck },
        { title: "الدور الوطني", text: "تمثيل الوحدة والاستمرارية والكرامة الوطنية.", icon: UsersRound },
        { title: "التوازن المؤسسي", text: "العمل ضمن منظومة الحوكمة الأشمل.", icon: Building2 },
      ]
    : isKu
      ? [
          { title: "ڕۆڵی دەستووری", text: "پاڵپشتی چوارچێوەی دامەزراوەیی هەرێم دەکات.", icon: BookOpenCheck },
          { title: "ڕۆڵی نیشتمانی", text: "نوێنەرایەتی یەکڕیزی، بەردەوامی، و شکۆی گشتی دەکات.", icon: UsersRound },
          { title: "هاوسەنگی دامەزراوەیی", text: "لەناو سیستەمێكی حکومڕانی فراوانتردا کاردەکات.", icon: Building2 },
        ]
    : cards;

  return (
    <main className="min-h-screen w-full bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fbf5eb] px-14 py-12">
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

        {/* Replace this with your generated Presidency building image */}
        <div className="pointer-events-none absolute right-0 top-[90px] h-[700px] w-[760px]">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=90"
            alt="Presidency building placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-76 [mask-image:radial-gradient(circle_at_62%_48%,black_0%,black_56%,transparent_84%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbf5eb]" />
        </div>

        {/* Soft city strip */}
        <div className="pointer-events-none absolute left-0 right-0 top-[820px] h-[190px] opacity-25">
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80"
            alt="city strip placeholder"
            className="h-full w-full object-cover [mask-image:linear-gradient(to_bottom,transparent_0%,black_35%,black_70%,transparent_100%)]"
          />
        </div>

        <div className="relative z-10 flex flex-1 flex-col">
          {/* Hero */}
          <section className="max-w-[560px] pt-28">
            <h1 className="font-serif text-[92px] font-semibold leading-none tracking-tight text-[#943134]">
              {isAr ? "الرئاسة" : isKu ? "سەرۆکایەتی" : "Presidency"}
            </h1>

            <div className="mt-10">
              <Divider wide />
            </div>

            <p className="mt-9 text-[35px] font-bold leading-[1.35] text-[#9b6d35]">
              {isAr ? "مؤسسة دستورية وطنية في المنظومة الإقليمية." : isKu ? "دامەزراوەیەکی دەستووری و نیشتمانی لەناو سیستەمی هەرێمیدا." : "A constitutional and national institution within the regional system."}
            </p>

            <div className="mt-10">
              <Divider wide />
            </div>

            <p className="mt-9 max-w-[510px] text-[29px] font-medium leading-[1.55] text-[#2d3549]">
              {isAr
                ? "تُسهم الرئاسة في الإطار الدستوري والحياة العامة والتوازن المؤسسي الأشمل لإقليم كوردستان."
                : isKu
                  ? "سەرۆکایەتی کۆڵەکەیەکی بنەڕەتییە لە چوارچێوەی دەستووری، ژیانی گشتی و پاراستنی هاوسەنگیی دامەزراوەیی لە هەرێمی کوردستان."
                : "The Presidency contributes to the constitutional framework, public life, and the broader institutional balance of the Kurdistan Region."}
            </p>
          </section>

          <div className="flex-1" />

          {/* Cards */}
          <section className="grid grid-cols-3 gap-7 pb-2">
            {localCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="relative flex min-h-[525px] flex-col items-center overflow-hidden rounded-[24px] border-2 border-[#ead8b7] bg-white/78 px-7 py-10 text-center shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md"
                >
                  <div className="grid h-30 w-30 place-items-center rounded-full border-[6px] border-white bg-[#963538] text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)] ring-2 ring-[#c58e65]">
                    <Icon size={62} strokeWidth={1.45} />
                  </div>

                  <h3 className="mt-10 font-serif text-[32px] font-semibold leading-tight text-[#17233b]">
                    {card.title}
                  </h3>

                  <div className="my-8">
                    <Divider />
                  </div>

                  <p className="text-[23px] font-medium leading-[1.45] text-[#35435b]">
                    {card.text}
                  </p>

                  <button className="mt-auto grid h-16 w-16 place-items-center rounded-full bg-[#963538] text-white shadow-md ring-4 ring-white">
                    <ArrowRight size={36} />
                  </button>

                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                </article>
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}
