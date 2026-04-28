import React from "react";
import { ArrowLeft, BookOpen, Home, Landmark, Scale, SunMedium } from "lucide-react";
import en from "@/data/en.json";
import ar from "@/data/ar.json";
import ku from "@/data/ku.json";

const rows = [
  {
    number: "1",
    title: "Constitutional Recognition",
    text: "In 2005, Iraq’s constitution officially recognized the Kurdistan Region as a federal region.",
    icon: Landmark,
    color: "bg-[#13213b]",
  },
  {
    number: "2",
    title: "Legal Status",
    text: "This recognition affirmed the legal and constitutional status of the Region and its institutions.",
    icon: Scale,
    color: "bg-[#405846]",
  },
  {
    number: "3",
    title: "A New Chapter",
    text: "It marked an important step in the development of the Kurdistan Region within federal Iraq.",
    icon: BookOpen,
    color: "bg-[#9d3637]",
  },
];

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

function HeaderButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex flex-col items-center gap-1 text-[#17233b]">
      <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-[#d7bd8a] bg-white/55 shadow-sm">
        {icon}
      </span>
      <span className="text-[18px]">{label}</span>
    </button>
  );
}

type LangCode = "ku" | "en" | "ar";
type JourneySection = {
  title?: string;
  headline?: string;
  cards?: { title: string; description: string }[];
};
const CONTENT = { en, ar, ku } as const;

type Year2005PageProps = {
  lang?: LangCode;
  onBack?: () => void;
};

export default function Year2005Page({ lang = "en", onBack }: Year2005PageProps) {
  const data = CONTENT[lang] as any;
  const section: JourneySection =
    data?.journey?.sections?.["2005"] ?? data?.people?.sections?.["2005"] ?? {};
  const localizedRows = rows.map((row, i) => ({
    ...row,
    title: section.cards?.[i]?.title ?? row.title,
    text: section.cards?.[i]?.description ?? row.text,
  }));
  return (
    <main className="min-h-screen w-full bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fbf5eb]">
        <div className="absolute inset-0 opacity-18 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        <header className="relative z-10 flex h-[135px] items-center justify-between border-b border-[#e6d2aa] bg-white/35 px-10">
          <Logo />

          <nav className="flex items-center gap-5 text-[22px]">
            <span>Kurdish</span>
            <span className="h-8 w-px bg-[#b99152]" />
            <span className="border-b-4 border-[#b99152] pb-3 font-semibold">English</span>
            <span className="h-8 w-px bg-[#b99152]" />
            <span>Arabic</span>
          </nav>

          <div className="flex gap-8">
            <HeaderButton icon={<Home size={34} />} label="Home" />
            <HeaderButton icon={<ArrowLeft size={38} />} label="Back" onClick={onBack} />
          </div>
        </header>

        {/* Main visual placeholder: replace with your generated 2005 constitution/legal image */}
        <div className="pointer-events-none absolute right-0 top-[170px] h-[980px] w-[850px]">
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=90"
            alt="2005 recognition placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-78 [mask-image:radial-gradient(circle_at_60%_48%,black_0%,black_55%,transparent_84%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbf5eb]" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-14 pt-22 pb-14">
          <section className="max-w-[520px]">
            <h1 className="font-serif text-[150px] font-semibold leading-none tracking-tight text-[#17233b]">
              {section.title ?? "2005"}
            </h1>

            <p className="mt-6 text-[37px] font-bold leading-tight text-[#9b6d35]">
              {section.headline ?? "Federal recognition within Iraq."}
            </p>

            <div className="mt-10 flex w-[230px] items-center gap-4 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>
          </section>

          <div className="flex-1" />

          <section className="space-y-8">
            {localizedRows.map((row) => {
              const Icon = row.icon;
              return (
                <article
                  key={row.title}
                  className="relative flex min-h-[178px] items-center rounded-[26px] border-2 border-[#ead8b7] bg-white/76 px-10 py-8 shadow-[0_14px_35px_rgba(84,54,16,0.13)] backdrop-blur-md"
                >
                  <div className="flex w-[190px] justify-center">
                    <div className={`grid h-28 w-28 place-items-center rounded-full border-[6px] border-white ${row.color} text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)]`}>
                      <Icon size={58} strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="h-[110px] w-px bg-[#e2c99b]" />

                  <div className="px-10">
                    <div className="flex items-center gap-5">
                      <span className={`grid h-12 w-12 place-items-center rounded-full text-[28px] font-bold text-white ${row.color}`}>
                        {row.number}
                      </span>
                      <h3 className="font-serif text-[39px] font-semibold leading-tight text-[#17233b]">
                        {row.title}
                      </h3>
                    </div>

                    <p className="mt-4 max-w-[610px] text-[25px] font-medium leading-[1.42] text-[#303a50]">
                      {row.text}
                    </p>
                  </div>

                  <div className="pointer-events-none absolute right-0 top-0 h-full w-28 opacity-18 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                </article>
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}
