import React from "react";
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
    <section className="relative min-h-[770px] rounded-[26px] border-2 border-[#ead8b7] bg-white/78 px-8 pb-8 pt-16 shadow-[0_18px_40px_rgba(84,54,16,0.16)] backdrop-blur-md">
      <div className={`absolute left-1/2 top-[-38px] grid h-24 w-24 -translate-x-1/2 place-items-center rounded-full border-[6px] border-white ${circleBg} text-[#f8e5b8] shadow-[0_10px_25px_rgba(84,54,16,0.2)]`}>
        {isGold ? <Trophy size={54} strokeWidth={1.45} /> : <Compass size={54} strokeWidth={1.45} />}
      </div>

      <h2 className="text-center font-serif text-[36px] font-semibold text-[#17233b]">
        {title}
      </h2>

      <div className="mx-auto my-5 max-w-[390px]">
        <DecorativeLine color={main} />
      </div>

      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="grid grid-cols-[92px_1fr] gap-5 border-b border-[#e6d2aa] py-4 last:border-b-0">
              <div className="grid h-18 w-18 place-items-center rounded-full border-2 border-[#ead8b7] bg-[#fffaf0]" style={{ color: main }}>
                <Icon size={42} strokeWidth={1.7} />
              </div>
              <div>
                <h3 className="font-serif text-[28px] font-semibold leading-tight text-[#17233b]">
                  {item.title}
                </h3>
                <p className="mt-1 text-[19px] font-semibold leading-snug text-[#344052]">
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
  onBack?: () => void;
};

export default function PrimeMinisterPage({ onBack }: PrimeMinisterPageProps) {
  return (
    <main className="min-h-screen w-full bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fbf5eb] px-12 py-10">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm"
          aria-label="Back to The System"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="absolute inset-0 opacity-16 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-0 h-full w-28 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute right-0 top-0 h-full w-28 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Replace this with your generated portrait image */}
        <div className="pointer-events-none absolute right-0 top-0 h-[930px] w-[650px]">
          <img
            src={masrourbarzani}
            alt="Prime Minister portrait placeholder"
            className="absolute inset-0 h-full w-full object-cover object-center [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/18 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[260px] bg-gradient-to-b from-transparent to-[#fbf5eb]" /> */}
        </div>

        {/* Scenic base image placeholder */}
        <div className="pointer-events-none absolute left-0 top-[575px] h-[300px] w-[650px]">
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=90"
            alt="Kurdistan landscape placeholder"
            className="h-full w-full object-cover opacity-62 [mask-image:radial-gradient(circle_at_45%_55%,black_0%,black_55%,transparent_82%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fbf5eb] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col">
          <section className="max-w-[510px] pt-32">
            <h1 className="font-serif text-[78px] font-semibold leading-[1.02] tracking-tight text-[#17233b]">
              The Prime<br />Minister
            </h1>

            <p className="mt-5 font-serif text-[42px] leading-tight text-[#9b6d35]">
              Masrour Barzani
            </p>

            <div className="mt-8 w-[360px]">
              <DecorativeLine color="#b99152" />
            </div>

            <p className="mt-8 max-w-[420px] text-[27px] font-semibold leading-[1.45] text-[#2d3549]">
              Leading the Kurdistan Region with a focus on reform, innovation, and building a stronger future for all.
            </p>
          </section>

          <div className="flex-1" />

          <section className="grid grid-cols-2 gap-8 pb-0">
            <InfoPanel title="Selected Achievements" items={achievements} tone="gold" />
            <InfoPanel title="Future Vision" items={vision} tone="green" />
          </section>
        </div>
      </section>
    </main>
  );
}
