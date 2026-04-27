import React from "react";
import {
  ArrowLeft,
  BarChart3,
  Landmark,
  Network,
  Scale,
  SunMedium,
} from "lucide-react";

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

type JourneyMilestoneId = "1991" | "1992" | "buildingInstitutions" | "2005" | "today";

type JourneyTimelinePageProps = {
  onBack?: () => void;
  onSelectMilestone?: (milestone: JourneyMilestoneId) => void;
};

export default function JourneyTimelinePage({ onBack, onSelectMilestone }: JourneyTimelinePageProps) {
  return (
    <main className="min-h-screen w-full bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fbf5eb]">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm"
          aria-label="Back to Discover"
        >
          <ArrowLeft size={28} />
        </button>
        {/* subtle paper/pattern */}
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Right illustration column - replace these with your AI images */}
        <div className="pointer-events-none absolute right-0 top-[120px] z-0 h-[1500px] w-[580px]">
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1000&q=90"
            className="absolute right-0 top-0 h-[430px] w-[520px] rounded-[50px] object-cover opacity-80 [mask-image:radial-gradient(circle,black_52%,transparent_78%)]"
            alt="1991 illustration"
          />
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=90"
            className="absolute right-0 top-[420px] h-[380px] w-[500px] rounded-[50px] object-cover opacity-78 [mask-image:radial-gradient(circle,black_52%,transparent_80%)]"
            alt="1992 illustration"
          />
          <img
            src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=90"
            className="absolute right-0 top-[800px] h-[360px] w-[500px] rounded-[50px] object-cover opacity-76 [mask-image:radial-gradient(circle,black_52%,transparent_80%)]"
            alt="building institutions illustration"
          />
          <img
            src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1000&q=90"
            className="absolute right-0 top-[1160px] h-[330px] w-[520px] rounded-[50px] object-cover opacity-78 [mask-image:radial-gradient(circle,black_52%,transparent_80%)]"
            alt="today illustration"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#fbf5eb]/10 to-[#fbf5eb]/72" />
          <div className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-b from-transparent to-[#fbf5eb]" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-16 pb-10 pt-20">
          {/* Title */}
          <section className="max-w-[620px]">
            <h1 className="font-serif text-[94px] font-semibold leading-none text-[#17233b]">
              The Journey
            </h1>
            <h2 className="mt-6 text-[36px] font-semibold text-[#9b6d35]">
              From 1991 to the present.
            </h2>
            <div className="mt-9 flex w-[260px] items-center gap-4 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>
            <p className="mt-9 max-w-[460px] text-[29px] leading-snug text-[#2d3549]">
              Explore the key milestones that shaped the Kurdistan Region.
            </p>
          </section>

          {/* Timeline */}
          <section className="relative mt-24 flex-1">
            {/* Curvy timeline, placed exactly between cards and images */}
            <svg
              className="pointer-events-none absolute left-[535px] top-[35px] z-20 h-[1110px] w-[150px] overflow-visible"
              viewBox="0 0 150 1110"
              fill="none"
            >
              <path
                d="M45 0 C98 115 8 212 58 330 C108 450 12 555 60 675 C108 790 18 900 64 1015 C73 1042 76 1078 75 1110"
                stroke="#d8b875"
                strokeWidth="15"
                strokeLinecap="round"
              />
              <path
                d="M45 0 C98 115 8 212 58 330 C108 450 12 555 60 675 C108 790 18 900 64 1015 C73 1042 76 1078 75 1110"
                stroke="#ffffff"
                strokeWidth="8"
                strokeLinecap="round"
              />

              {/* Dots are inside the SVG so they sit exactly on the curvy line */}
              {[
                { x: 59, y: 49 },
                { x: 58, y: 247 },
                { x: 60, y: 457 },
                { x: 61, y: 667 },
                { x: 62, y: 877 },
              ].map((dot, index) => (
                <g key={index}>
                  <circle cx={dot.x} cy={dot.y} r="19" fill="white" />
                  <circle cx={dot.x} cy={dot.y} r="14" fill="#c89a4e" />
                  <circle cx={dot.x} cy={dot.y} r="7" fill="white" />
                </g>
              ))}
            </svg>

            <div className="space-y-8">
              {milestones.map((item, index) => {
                const Icon = item.icon;
                const milestoneId: JourneyMilestoneId =
                  index === 0 ? "1991" : index === 1 ? "1992" : index === 2 ? "buildingInstitutions" : index === 3 ? "2005" : "today";
                return (
                  <button
                    type="button"
                    onClick={() => onSelectMilestone?.(milestoneId)}
                    key={item.title}
                    className="relative z-10 flex h-[178px] w-[590px] items-center rounded-[26px] border border-[#ead8b7] bg-white/78 shadow-[0_12px_30px_rgba(84,54,16,0.14)] backdrop-blur-sm"
                  >
                    <div className="flex w-[185px] justify-center">
                      <div
                        className="grid h-28 w-28 place-items-center rounded-full border-[6px] border-white text-[#f7e3b5] shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
                        style={{ backgroundColor: item.color }}
                      >
                        <Icon size={58} strokeWidth={1.5} />
                      </div>
                    </div>

                    <div className="h-[112px] w-px bg-[#e2c99b]" />

                    <div className="px-9">
                      <h3 className="font-serif text-[42px] font-semibold leading-none text-[#17233b]">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-[320px] text-[23px] leading-snug text-[#303a50]">
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
