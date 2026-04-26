import React from "react";
import { ArrowLeft, BarChart3, Compass, Grid2X2, Home, Landmark, Network, Scale, SunMedium } from "lucide-react";

const milestones = [
  {
    title: "1991",
    text: "A historic turning point that opened the path to a new reality.",
    icon: SunMedium,
    color: "bg-[#c59a4b]",
  },
  {
    title: "1992",
    text: "The first parliament and government marked the beginning of self-rule.",
    icon: Landmark,
    color: "bg-[#405846]",
  },
  {
    title: "Building Institutions",
    text: "Public institutions gradually formed the structure of modern governance.",
    icon: Network,
    color: "bg-[#8d2d31]",
  },
  {
    title: "2005",
    text: "Federal recognition gave constitutional status to the Kurdistan Region.",
    icon: Scale,
    color: "bg-[#12223c]",
  },
  {
    title: "Today",
    text: "Kurdistan continues to grow through institutions, development, and vision.",
    icon: BarChart3,
    color: "bg-[#b88938]",
  },
];

type JourneyMilestoneId = "1991" | "1992" | "buildingInstitutions" | "2005" | "today";

function Logo() {
  return (
    <div className="flex items-center gap-5">
      <div className="grid h-18 w-18 place-items-center rounded-t-[28px] border-2 border-[#bd9650] text-[#bd9650]">
        <Landmark size={42} strokeWidth={1.4} />
      </div>
      <h2 className="font-serif text-[34px] text-[#17233b]">Gate of Kurdistan</h2>
    </div>
  );
}

function HeaderButton({ icon, label }) {
  return (
    <button className="flex flex-col items-center gap-1 text-[#17233b]">
      <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-[#d7bd8a] bg-white/50 shadow-sm">
        {icon}
      </span>
      <span className="text-[18px]">{label}</span>
    </button>
  );
}

type JourneyTimelinePageProps = {
  onSelectMilestone?: (milestone: JourneyMilestoneId) => void;
};

export default function JourneyTimelinePage({ onSelectMilestone }: JourneyTimelinePageProps) {
  return (
    <main className="min-h-screen w-full bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fbf5eb]">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        <div className="relative z-10 flex flex-1 flex-col px-16 pt-86 pb-0">
          {/* Right collage */}
          <div className="pointer-events-none absolute right-0 top-30 h-[1420px] w-[560px]">
            <img
              src="https://images.unsplash.com/photo-1520986606214-8b456906c813?auto=format&fit=crop&w=900&q=90"
              className="absolute right-8 top-0 h-[430px] w-[420px] rounded-[40px] object-cover opacity-80 [mask-image:radial-gradient(circle,black_50%,transparent_78%)]"
              alt="mountain monument"
            />
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=90"
              className="absolute right-0 top-[470px] h-[360px] w-[460px] rounded-[40px] object-cover opacity-75 [mask-image:radial-gradient(circle,black_50%,transparent_80%)]"
              alt="government building"
            />
            <img
              src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=90"
              className="absolute right-6 top-[860px] h-[350px] w-[430px] rounded-[40px] object-cover opacity-70 [mask-image:radial-gradient(circle,black_50%,transparent_80%)]"
              alt="construction"
            />
            <img
              src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=90"
              className="absolute right-0 bottom-0 h-[340px] w-[460px] rounded-[40px] object-cover opacity-75 [mask-image:radial-gradient(circle,black_50%,transparent_80%)]"
              alt="city bridge"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#fbf5eb]/10 to-[#fbf5eb]/70" />
          </div>

          {/* Title */}
          <section className="relative max-w-[620px]">
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

          {/* Timeline area */}
          <section className="relative mt-64 flex-1 pb-10">
            <svg
              className="absolute left-[505px] top-[-40px] z-20 h-[1010px] w-[120px] overflow-visible"
              viewBox="0 0 120 1010"
              fill="none"
            >
              <path
                d="M45 0 C95 105 8 190 58 300 C104 402 14 495 60 606 C102 708 16 805 62 910 C72 940 75 970 74 1010"
                stroke="#c89a4e"
                strokeWidth="9"
                strokeLinecap="round"
              />
            </svg>

            <div className="relative z-10 space-y-9">
              {milestones.map((item, index) => {
                const Icon = item.icon;
                const milestoneId: JourneyMilestoneId =
                  index === 0 ? "1991" : index === 1 ? "1992" : index === 2 ? "buildingInstitutions" : index === 3 ? "2005" : "today";
                return (
                  <button
                    type="button"
                    key={item.title}
                    onClick={() => {
                      if (milestoneId === "1991") {
                        onSelectMilestone?.("1991");
                      } else if (milestoneId === "1992") {
                        onSelectMilestone?.("1992");
                      } else if (milestoneId === "buildingInstitutions") {
                        onSelectMilestone?.("buildingInstitutions");
                      } else if (milestoneId === "2005") {
                        onSelectMilestone?.("2005");
                      }
                    }}
                    className="relative flex h-[186px] w-[575px] items-center rounded-[26px] border border-[#ead8b7] bg-white/72 shadow-[0_12px_30px_rgba(84,54,16,0.13)] backdrop-blur-sm"
                  >
                    <div className="flex w-[185px] justify-center">
                      <div className={`grid h-104 w-104 place-items-center rounded-full border-[6px] border-white ${item.color} text-[#f6e3b7] shadow-[0_8px_20px_rgba(0,0,0,0.18)]`}>
                        <Icon size={58} strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="h-[126px] w-px bg-[#e2c99b]" />
                    <div className="px-9">
                      <h3 className="font-serif text-[42px] font-semibold leading-none text-[#17233b]">
                        {item.title}
                      </h3>
                      <p className="mt-3 max-w-[325px] text-[23px] leading-[1.35] text-[#303a50]">
                        {item.text}
                      </p>
                    </div>

                    <span
                      className="absolute left-[543px] top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border-[5px] border-white bg-[#c89a4e] shadow-[0_3px_12px_rgba(84,54,16,0.3)]"
                    >
                      <span className="h-4 w-4 rounded-full bg-white" />
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Bottom footer */}
        <footer className="relative z-20 grid h-[190px] grid-cols-[1fr_120px_1fr] items-center border-t-[6px] border-[#c79a50] bg-[#0f1f3b] text-[#f7e7c5]">
          <button className="flex flex-col items-center justify-center">
            <span className="grid h-20 w-20 place-items-center rounded-full border-2 border-[#c79a50] text-[#d8b66e]">
              <Grid2X2 size={44} />
            </span>
            <h4 className="mt-3 font-serif text-[34px]">Main Menu</h4>
            <p className="text-[18px] text-[#d6d0c5]">Return to the main menu</p>
          </button>

          <div className="relative flex h-full items-center justify-center">
            <div className="absolute top-0 h-full w-px bg-[#c79a50]" />
            <div className="grid h-22 w-22 rotate-45 place-items-center border-2 border-[#c79a50] bg-[#0f1f3b]">
              <span className="rotate-[-45deg] text-4xl text-[#d8b66e]">✥</span>
            </div>
          </div>

          <button className="flex flex-col items-center justify-center">
            <span className="grid h-20 w-20 place-items-center rounded-full border-2 border-[#c79a50] text-[#d8b66e]">
              <Compass size={46} />
            </span>
            <h4 className="mt-3 font-serif text-[34px]">Explore More</h4>
            <p className="text-[18px] text-[#d6d0c5]">Continue your journey</p>
          </button>
        </footer>
      </section>
    </main>
  );
}
