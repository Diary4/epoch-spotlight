import React from "react";
import {
  ArrowLeft,
  BarChart3,
  Landmark,
  Network,
  Scale,
  SunMedium,
} from "lucide-react";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";
import { localizeDigits } from "@/lib/utils";
import bg from "@/assets/mainImages/thejourney/journey-1.png";
import bg2 from "@/assets/mainImages/thejourney/journey-2.png";
import bg3 from "@/assets/mainImages/thejourney/journey-3.png";

const milestones = [
  {
    title: "1991",
    text: "A historic turning point that opened the path to a new reality.",
    icon: SunMedium,
    color: "#c29242",
  },
  {
    title: "1992",
    text: "The first parliament and government marked the beginning of self-rule.",
    icon: Landmark,
    color: "#425b42",
  },
  {
    title: "Building Institutions",
    text: "Public institutions gradually formed the structure of modern governance.",
    icon: Network,
    color: "#963438",
  },
  {
    title: "2005",
    text: "Federal recognition gave constitutional status to the Kurdistan Region.",
    icon: Scale,
    color: "#0f203a",
  },
  {
    title: "Today",
    text: "Kurdistan continues to grow through institutions, development, and vision.",
    icon: BarChart3,
    color: "#c29242",
  },
];

type LangCode = "ku" | "en" | "ar";
const CONTENT = { en, ar, ku } as const;

type JourneyMilestoneId = "1991" | "1992" | "buildingInstitutions" | "2005" | "today";

type JourneyTimelinePageProps = {
  lang?: LangCode;
  onBack?: () => void;
  onSelectMilestone?: (milestone: JourneyMilestoneId) => void;
};

export default function JourneyTimelinePage({ lang = "en", onBack, onSelectMilestone }: JourneyTimelinePageProps) {
  const data = CONTENT[lang] as any;
  const journey = data?.journey ?? {};
  const journeyItems = Array.isArray(journey.items) ? journey.items : [];
  const localizedMilestones = milestones.map((item, idx) => ({
    ...item,
    title: localizeDigits(journeyItems[idx]?.title ?? item.title, lang),
    text: localizeDigits(journeyItems[idx]?.description ?? item.text, lang),
  }));
  return (
    <main className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] p-0 text-[#17233b]">
      <section className="relative flex min-h-screen w-[min(100vw,1400px)] min-w-[100vw] flex-col overflow-hidden bg-[#fbf5eb]">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-4 top-4 z-30 grid h-12 w-12 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:left-8 sm:top-8 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          aria-label="Back to Discover"
        >
          <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>
        {/* subtle paper/pattern */}
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Right illustration column - replace these with your AI images */}
        <div className="pointer-events-none absolute right-0 top-[90px] z-0 h-[1720px] w-[46vw] min-w-[520px]">
          <img
            src={bg}
            className="absolute right-0 top-0 h-[600px] w-[100%] rounded-[58px] object-cover opacity-80 [mask-image:radial-gradient(circle,black_54%,transparent_79%)]"
            alt="1991 illustration"
          />
          <img
            src={bg2}
            className="absolute right-0 top-[580px] h-[500px] w-[96%] rounded-[58px] object-cover opacity-78 [mask-image:radial-gradient(circle,black_54%,transparent_82%)]"
            alt="1992 illustration"
          />
          <img
            src={bg3}
            className="absolute right-0 top-[1050px] h-[810px] w-[96%] rounded-[58px] object-cover opacity-76 [mask-image:radial-gradient(circle,black_54%,transparent_82%)]"
            alt="building institutions illustration"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#fbf5eb]/10 to-[#fbf5eb]/72" />
          <div className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-b from-transparent to-[#fbf5eb]" /> */}
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-8 pb-10 pt-16 sm:px-12 md:px-16 md:pt-20 lg:px-20 lg:pb-14">
          {/* Title */}
          <section className="max-w-[760px]">
            <h1 className="font-serif text-[76px] font-semibold leading-none text-[#17233b] sm:text-[88px] md:text-[102px] lg:text-[124px]">
              {journey.title ?? "The Journey"}
            </h1>
            <h2 className="mt-5 text-[30px] font-semibold text-[#9b6d35] sm:text-[34px] md:mt-6 md:text-[40px] lg:text-[46px]">
              {localizeDigits(
                lang === "ar" ? "من عام 1991 حتى الوقت الحاضر" : lang === "ku" ? "لە ساڵی ١٩٩١ تا ئێستا" : "From 1991 to the present.",
                lang,
              )}
            </h2>
            <div className="mt-8 flex w-[290px] items-center gap-5 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>
            <p className="mt-8 max-w-[680px] text-[28px] leading-snug text-[#2d3549] md:text-[32px] lg:text-[36px]">
              {localizeDigits(journey.subtitle ?? "Explore the key milestones that shaped the Kurdistan Region.", lang)}
            </p>
          </section>

          {/* Timeline */}
          <section className="relative mt-16 flex-1 md:mt-20">
            {/* Curvy timeline, placed exactly between cards and images */}
            <svg
              className="pointer-events-none absolute left-[clamp(610px,58vw,760px)] top-[40px] z-20 h-[1290px] w-[180px] overflow-visible"
              viewBox="0 0 150 1290"
              fill="none"
            >
              <path
                d="M45 0 C98 128 8 240 58 372 C108 505 12 627 60 761 C108 892 18 1014 64 1144 C73 1178 76 1232 75 1290"
                stroke="#d8b875"
                strokeWidth="17"
                strokeLinecap="round"
              />
              <path
                d="M45 0 C98 128 8 240 58 372 C108 505 12 627 60 761 C108 892 18 1014 64 1144 C73 1178 76 1232 75 1290"
                stroke="#ffffff"
                strokeWidth="9"
                strokeLinecap="round"
              />

              {/* Dots are inside the SVG so they sit exactly on the curvy line */}
              {[
                { x: 59, y: 56 },
                { x: 58, y: 286 },
                { x: 60, y: 530 },
                { x: 61, y: 774 },
                { x: 62, y: 1018 },
              ].map((dot, index) => (
                <g key={index}>
                  <circle cx={dot.x} cy={dot.y} r="19" fill="white" />
                  <circle cx={dot.x} cy={dot.y} r="14" fill="#c89a4e" />
                  <circle cx={dot.x} cy={dot.y} r="7" fill="white" />
                </g>
              ))}
            </svg>

            <div className="space-y-8">
              {localizedMilestones.map((item, index) => {
                const Icon = item.icon;
                const milestoneId: JourneyMilestoneId =
                  index === 0 ? "1991" : index === 1 ? "1992" : index === 2 ? "buildingInstitutions" : index === 3 ? "2005" : "today";
                return (
                  <button
                    type="button"
                    onClick={() => onSelectMilestone?.(milestoneId)}
                    key={item.title}
                    className="relative z-10 flex h-[205px] w-[clamp(640px,56vw,820px)] items-center rounded-[30px] border border-[#ead8b7] bg-white/78 shadow-[0_14px_34px_rgba(84,54,16,0.14)] backdrop-blur-sm"
                  >
                    <div className="flex w-[220px] justify-center">
                      <div
                        className="grid h-32 w-32 place-items-center rounded-full border-[6px] border-white text-[#f7e3b5] shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
                        style={{ backgroundColor: item.color }}
                      >
                        <Icon size={66} strokeWidth={1.5} />
                      </div>
                    </div>

                    <div className="h-[130px] w-px bg-[#e2c99b]" />

                    <div className="px-10">
                      <h3 className="font-serif text-[50px] font-semibold leading-none text-[#17233b]">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-[440px] text-[29px] leading-snug text-[#303a50]">
                        {item.text}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
