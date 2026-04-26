import React from "react";
import { ArrowLeft, Landmark, Mountain, Vote } from "lucide-react";

const rows = [
  {
    title: "First Election",
    text: "In 1992, the Kurdistan Region held its first parliamentary election.",
    icon: Vote,
    color: "bg-[#c59a4b]",
  },
  {
    title: "Parliament and Government",
    text: "The first parliament and government were formed, marking the beginning of modern self-rule.",
    icon: Landmark,
    color: "bg-[#5d6a50]",
  },
  {
    title: "A Defining Milestone",
    text: "This step transformed earlier achievements into an organized political reality.",
    icon: Mountain,
    color: "bg-[#9d3637]",
  },
];

type Year1992PageProps = {
  onBack?: () => void;
};

export default function Year1992Page({ onBack }: Year1992PageProps) {
  return (
    <main className="min-h-screen w-full bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fbf5eb]">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm"
          aria-label="Back to The Journey"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="absolute inset-0 opacity-18 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Main visual placeholder: replace later with your generated 1992 image */}
        <div className="pointer-events-none absolute right-0 top-[120px] h-[980px] w-[850px]">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=90"
            alt="1992 parliament placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-78 [mask-image:radial-gradient(circle_at_60%_46%,black_0%,black_55%,transparent_84%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbf5eb]" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-14 pt-14 pb-14">
          <section className="max-w-[560px]">
            <h1 className="font-serif text-[150px] font-semibold leading-none tracking-tight text-[#17233b]">
              1992
            </h1>

            <p className="mt-6 text-[37px] font-bold leading-tight text-[#9b6d35]">
              The beginning of self-rule.
            </p>

            <div className="mt-10 flex w-[230px] items-center gap-4 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>

            <p className="mt-10 max-w-[490px] text-[30px] font-medium leading-[1.55] text-[#2d3549]">
              A pivotal year when the Kurdistan Region took a decisive step toward building its own institutions and shaping its future.
            </p>
          </section>

          <div className="flex-1" />

          <section className="space-y-8">
            {rows.map((row) => {
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
                    <h3 className="font-serif text-[41px] font-semibold leading-tight text-[#17233b]">
                      {row.title}
                    </h3>
                    <p className="mt-3 max-w-[560px] text-[25px] font-medium leading-[1.42] text-[#303a50]">
                      {row.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}
