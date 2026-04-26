import React from "react";
import { BarChart3, Building2, Landmark } from "lucide-react";

const rows = [
  {
    title: "Public Institutions",
    text: "Over time, Kurdistan developed institutions that helped organize governance and public life.",
    icon: Landmark,
    color: "bg-[#13213b]",
  },
  {
    title: "Parliament, Government, Presidency",
    text: "These institutions became essential parts of the regional political system.",
    icon: Building2,
    color: "bg-[#405846]",
  },
  {
    title: "Institutional Growth",
    text: "Together, they helped shape a more structured and functioning regional administration.",
    icon: BarChart3,
    color: "bg-[#943134]",
  },
];

export default function BuildingInstitutionsPage() {
  return (
    <main className="min-h-screen w-full bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fbf5eb] px-16 py-16">
        <div className="absolute inset-0 opacity-18 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-0 h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute right-0 top-0 h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Right-side visual placeholder: replace this image later */}
        <div className="pointer-events-none absolute right-0 top-[120px] h-[1110px] w-[720px]">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=90"
            alt="Institutions placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-75 [mask-image:radial-gradient(circle_at_62%_42%,black_0%,black_54%,transparent_84%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbf5eb]" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col">
          {/* Hero text */}
          <section className="max-w-[570px] pt-18">
            <h1 className="font-serif text-[96px] font-semibold leading-[1.02] tracking-tight text-[#17233b]">
              Building<br />Institutions
            </h1>

            <p className="mt-8 text-[35px] font-bold leading-tight text-[#9b6d35]">
              From transition to governance.
            </p>

            <div className="mt-10 flex w-[230px] items-center gap-4 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>

            <p className="mt-10 max-w-[480px] text-[30px] font-medium leading-[1.48] text-[#2d3549]">
              Discover how institutions were established and strengthened to serve the people of Kurdistan.
            </p>
          </section>

          {/* Institution relationship diagram */}
          <section className="relative mt-36 h-[380px] w-[520px]">
            <div className="absolute left-[110px] top-[20px] h-[330px] w-[330px] rounded-full border-2 border-[#b99152]" />
            <div className="absolute left-[215px] top-[125px] h-[120px] w-[120px] rounded-full border-2 border-dashed border-[#b99152]" />
            <div className="absolute left-[245px] top-[155px] grid h-16 w-16 place-items-center rounded-full bg-[#b99152] text-[#f8e5b8]">
              <Landmark size={34} strokeWidth={1.4} />
            </div>

            <div className="absolute left-[220px] top-0 grid h-28 w-28 place-items-center rounded-full border-[6px] border-white bg-[#13213b] text-[#f8e5b8] shadow-lg">
              <Landmark size={58} strokeWidth={1.5} />
            </div>
            <div className="absolute left-0 top-[210px] grid h-28 w-28 place-items-center rounded-full border-[6px] border-white bg-[#405846] text-[#f8e5b8] shadow-lg">
              <Building2 size={58} strokeWidth={1.5} />
            </div>
            <div className="absolute right-0 top-[210px] grid h-28 w-28 place-items-center rounded-full border-[6px] border-white bg-[#943134] text-[#f8e5b8] shadow-lg">
              <BarChart3 size={58} strokeWidth={1.5} />
            </div>
          </section>

          <div className="flex-1" />

          {/* Rows */}
          <section className="space-y-7 pb-6">
            {rows.map((row) => {
              const Icon = row.icon;
              return (
                <article
                  key={row.title}
                  className="relative flex min-h-[170px] items-center rounded-[24px] border-2 border-[#ead8b7] bg-white/76 px-10 py-8 shadow-[0_14px_35px_rgba(84,54,16,0.13)] backdrop-blur-md"
                >
                  <div className="flex w-[190px] justify-center">
                    <div className={`grid h-28 w-28 place-items-center rounded-full border-[6px] border-white ${row.color} text-[#f8e5b8] shadow-[0_8px_20px_rgba(0,0,0,0.16)]`}>
                      <Icon size={58} strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="h-[108px] w-px bg-[#e2c99b]" />

                  <div className="px-10">
                    <h3 className="font-serif text-[39px] font-semibold leading-tight text-[#17233b]">
                      {row.title}
                    </h3>
                    <p className="mt-3 max-w-[610px] text-[25px] font-medium leading-[1.42] text-[#303a50]">
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
