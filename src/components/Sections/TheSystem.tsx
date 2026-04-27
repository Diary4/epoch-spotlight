import React from "react";
import { ArrowLeft, ArrowRight, Home, Landmark, Building2, Bird } from "lucide-react";

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
      <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-[#d7bd8a] bg-white/55 shadow-sm">
        {icon}
      </span>
      <span className="text-[18px]">{label}</span>
    </button>
  );
}

function InstitutionNode({ label, icon, color, className = "" }) {
  const Icon = icon;
  return (
    <div className={`absolute flex flex-col items-center ${className}`}>
      <div className={`grid h-40 w-40 place-items-center rounded-full border-[7px] border-white ${color} text-[#f8e5b8] shadow-[0_10px_28px_rgba(84,54,16,0.2)] ring-2 ring-[#c49a55]`}>
        <Icon size={76} strokeWidth={1.35} />
      </div>
      <p className="mt-6 font-serif text-[31px] font-bold uppercase tracking-[0.06em] text-[#17233b]">
        {label}
      </p>
    </div>
  );
}

export default function SystemPage() {
  return (
    <main className="min-h-screen w-full bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fbf5eb]">
        <div className="absolute inset-0 opacity-18 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Replace this visual later with your generated building/flag image */}
        <div className="pointer-events-none absolute right-0 top-[170px] h-[470px] w-[560px]">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=90"
            alt="System building placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-72 [mask-image:radial-gradient(circle_at_58%_48%,black_0%,black_55%,transparent_84%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbf5eb]" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-14 pt-22 pb-7">
          <section className="max-w-[575px]">
            <h1 className="font-serif text-[88px] font-semibold leading-[1.03] tracking-tight text-[#17233b]">
              The System
            </h1>

            <p className="mt-8 text-[34px] font-bold leading-tight text-[#9b6d35]">
              How Kurdistan’s institutions<br />work together.
            </p>

            <div className="mt-10 flex w-[230px] items-center gap-4 text-[#b99152]">
              <span className="h-0.5 flex-1 bg-[#b99152]" />
              <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
            </div>

            <p className="mt-10 max-w-[535px] text-[28px] font-medium leading-[1.5] text-[#2d3549]">
              The Kurdistan Region operates through a parliamentary system in which institutions work together to support public life.
            </p>
          </section>

          {/* Diagram */}
          <section className="relative mx-auto mt-28 h-[610px] w-[720px]">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 720 610" fill="none">
              <circle cx="360" cy="300" r="270" stroke="#d8c09a" strokeWidth="1" strokeDasharray="4 7" />
              <circle cx="360" cy="300" r="205" stroke="#d8c09a" strokeWidth="1" strokeDasharray="4 7" />
              <path d="M360 105 C260 160 180 250 160 392" stroke="#b99152" strokeWidth="3" fill="none" />
              <path d="M360 105 C465 160 545 250 560 392" stroke="#b99152" strokeWidth="3" fill="none" />
              <path d="M160 392 C260 455 460 455 560 392" stroke="#b99152" strokeWidth="3" fill="none" />
              <path d="M360 205 L360 315 M245 392 L360 315 M475 392 L360 315" stroke="#b99152" strokeWidth="3" />
              {[360,160,560,245,475,360].map((x, i) => (
                <circle key={i} cx={x} cy={i === 0 ? 105 : i === 1 || i === 2 ? 392 : i === 5 ? 315 : 392} r="10" fill="#c59a4b" />
              ))}
            </svg>

            <InstitutionNode label="Parliament" icon={Landmark} color="bg-[#13213b]" className="left-1/2 top-0 -translate-x-1/2" />
            <InstitutionNode label="Government" icon={Building2} color="bg-[#405846]" className="left-0 top-[285px]" />
            <InstitutionNode label="Presidency" icon={Bird} color="bg-[#9d3637]" className="right-0 top-[285px]" />

            <div className="absolute left-1/2 top-[300px] grid h-20 w-20 -translate-x-1/2 place-items-center rounded-full border-2 border-[#d4b476] bg-[#fbf5eb] text-[#b99152] shadow-sm">
              <span className="text-4xl">✥</span>
            </div>
          </section>

          <button className="mx-auto mt-8 flex h-[130px] w-[780px] items-center justify-between rounded-[24px] border-4 border-[#cda55e] bg-white/62 px-16 font-serif text-[55px] font-semibold text-[#17233b] shadow-[0_12px_30px_rgba(84,54,16,0.14)]">
            <span className="text-[#b99152] text-6xl">✥</span>
            <span>Prime Minister</span>
            <ArrowRight size={56} strokeWidth={1.6} className="text-[#b99152]" />
          </button>

          <div className="mt-auto flex min-h-[110px] items-center rounded-[18px] border-2 border-[#ead8b7] bg-white/62 shadow-[0_10px_25px_rgba(84,54,16,0.1)]">
            <div className="ml-12 mr-14 grid h-24 w-24 place-items-center rounded-full bg-[#c59a4b] text-[#f8e5b8] ring-4 ring-white">
              <span className="text-5xl">✥</span>
            </div>
            <p className="font-serif text-[34px] leading-tight text-[#17233b] p-4">
              Together, these institutions support<br />governance, law, and public administration.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
