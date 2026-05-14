import React from "react";
import { ArrowLeft, BookOpen, Crown, Feather, Flower2, Landmark } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import gsap from "gsap";

import mainHero from "@/assets/images/women/le-1.webp";
import masturaImg from "@/assets/images/women/w-10.webp";
import adelaImg from "@/assets/images/women/w-3.webp";
import hafsaImg from "@/assets/images/women/w-11.webp";
import khanzadImg from "@/assets/images/women/w-6.webp";
import halimaImg from "@/assets/images/women/w-4.webp";
import flowerAccent from "@/assets/images/women/icons/flower-1.webp";

type HistoricPageProps = {
  onBack?: () => void;
};

type MuseumBlock = {
  intro: string;
  knownFor: string;
  legacy: string;
  placeEra: string;
  quote: string;
};

type HistoricFigure = {
  id: string;
  name: string;
  role: string;
  roleTitle: string;
  teaser: string;
  imageSrc: string;
  icon: "crown" | "flower";
  museum: MuseumBlock;
};

const historicWomen: HistoricFigure[] = [
  {
    id: "mastura-ardalan",
    name: "Mastura Ardalan",
    role: "Poet and historian",
    roleTitle: "Poet and Historian",
    teaser:
      "A leading Kurdish writer who preserved identity and memory through poetry and history.",
    imageSrc: masturaImg,
    icon: "flower",
    museum: {
      intro:
        "An early Kurdish writer whose poetry and historical writing preserved memory, identity, and the story of her time.",
      knownFor: "Writing poetry and history.",
      legacy: "One of the earliest Kurdish women of letters.",
      placeEra: "Ardalan Principality • 19th century.",
      quote: "She wrote herself into history.",
    },
  },
  {
    id: "adela-khanum",
    name: "Adila Khanum",
    role: "Ruler of Halabja",
    roleTitle: "Ruler of Halabja",
    teaser:
      "A visionary governor remembered for justice, diplomacy, and rebuilding her city.",
    imageSrc: adelaImg,
    icon: "crown",
    museum: {
      intro:
        "A visionary leader who governed Halabja with justice and diplomacy, turning attention to trade, order, and the dignity of her people.",
      knownFor: "Governing Halabja with wisdom, reform, and steady diplomacy.",
      legacy: "Remembered as a model of civic leadership in Kurdish history.",
      placeEra: "Halabja • late 19th & early 20th century.",
      quote: "True leadership can uplift a city and forge a nation.",
    },
  },
  {
    id: "hafsa-khanum",
    name: "Hafsa Khanum",
    role: "Education pioneer",
    roleTitle: "Education Pioneer",
    teaser:
      "Opened the door of learning to girls and showed that education is the foundation of national renewal.",
    imageSrc: hafsaImg,
    icon: "flower",
    museum: {
      intro:
        "A tireless advocate who widened access to learning for girls and treated schooling as the foundation of a stronger society.",
      knownFor: "Founding and expanding programmes for girls’ education.",
      legacy: "Demonstrated that literacy and schools reshape families and futures.",
      placeEra: "Sulaymaniyah • 20th century.",
      quote: "Every girl who studies opens a new door toward tomorrow.",
    },
  },
  {
    id: "khanzada-khanum",
    name: "Khanzada Khanum",
    role: "Ruler of Soran",
    roleTitle: "Ruler of Soran",
    teaser:
      "A capable mir who defended her emirate with strategic skill, courage, and wide-ranging authority.",
    imageSrc: khanzadImg,
    icon: "flower",
    museum: {
      intro:
        "A formidable mir who held the Soran emirate together with strategic nerve, courage, and command respected far beyond her court.",
      knownFor: "Defending the emirate and exercising broad political authority.",
      legacy: "Celebrated for strategic rule, courage, and far-sighted statesmanship.",
      placeEra: "Soran • early 17th century.",
      quote: "Her rule was known for strength and strategic vision.",
    },
  },
  {
    id: "halima-khanum",
    name: "Halima Khanum",
    role: "Leader of the Bashqal tribe",
    roleTitle: "Leader of the Bashqal Tribe",
    teaser:
      "A historical Kurdish leader who stood by her people with steady judgment in times of change.",
    imageSrc: halimaImg,
    icon: "crown",
    museum: {
      intro:
        "A Kurdish leader of memory who stood with her people through political upheaval, offering steadiness when the ground itself seemed to shift.",
      knownFor: "Defending her community and guiding the Bashqal through hardship.",
      legacy: "A reminder that tribal leadership and counsel belonged to women too.",
      placeEra: "Bashqal • 19th century.",
      quote: "Leadership and guidance had women’s share in them too.",
    },
  },
];

function GoldDiamondRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex max-w-[220px] items-center gap-3 ${className}`}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#b8894a] to-[#b8894a]" />
      <span className="text-[15px] leading-none text-[#b8894a]" aria-hidden>
        ◆
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#b8894a] to-[#b8894a]" />
    </div>
  );
}

function MuseumInfoCard({
  title,
  body,
  Icon,
}: {
  title: string;
  body: string;
  Icon: LucideIcon;
}) {
  return (
    <article
      data-museum-fade="true"
      className="flex flex-col rounded-[22px] border border-[#e8dcc8] bg-white/90 px-5 py-6 shadow-[0_14px_36px_rgba(72,38,63,0.08)] sm:px-6 sm:py-7"
    >
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#5c2840] text-[#fdf6ec] shadow-inner sm:h-16 sm:w-16">
        <Icon className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.5} />
      </div>
      <h3 className="text-center font-serif text-lg font-semibold tracking-tight text-[#4a1f32] sm:text-xl">
        {title}
      </h3>
      <div className="mx-auto my-3 w-full max-w-[120px]">
        <GoldDiamondRow className="max-w-none" />
      </div>
      <p className="text-center font-serif text-[15px] leading-relaxed text-[#3d2f35] sm:text-[16px]">
        {body}
      </p>
    </article>
  );
}

function HistoricMuseumDetail({ figure }: { figure: HistoricFigure }) {
  const m = figure.museum;

  return (
    <div className="relative flex min-h-screen w-full flex-1 bg-[#f2e9dc] text-[#2f1a28]">
      {/* Parchment grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.12'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      {/* Left spine: geometric strip + MUSEUM */}
      <aside
        className="relative z-[1] hidden w-[52px] shrink-0 border-r border-[#c9a66a]/45 bg-[#e8dcc8]/65 sm:flex sm:flex-col sm:items-center sm:pt-10"
        aria-hidden
      >
        <div
          className="absolute inset-y-0 left-0 w-3 bg-[repeating-linear-gradient(180deg,transparent_0px,transparent_6px,rgba(92,40,64,0.14)_6px,rgba(92,40,64,0.14)_8px)]"
          aria-hidden
        />
        <span
          className="mt-4 select-none font-serif text-[11px] font-semibold uppercase tracking-[0.42em] text-[#5c2840]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Museum
        </span>
      </aside>

      <div className="relative z-[2] flex-1 px-5 pb-16 pt-16 sm:px-10 sm:pt-20 lg:px-14 lg:pt-24">
        {/* Hero: copy + portrait */}
        <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:items-start lg:gap-14">
          <div data-museum-fade="true" className="relative min-w-0">
            <h1 className="font-serif text-[clamp(36px,6vw,56px)] font-semibold leading-[1.05] tracking-tight text-[#4a1f32]">
              {figure.name}
            </h1>
            <p className="mt-2 font-serif text-[clamp(20px,3.2vw,26px)] italic text-[#8b3d55]">
              {figure.roleTitle}
            </p>
            <GoldDiamondRow className="mt-5" />
            <p className="mt-5 max-w-[520px] font-serif text-[clamp(16px,2.4vw,18px)] leading-[1.75] text-[#3d2f35]">
              {m.intro}
            </p>

            {/* Decorative “still life” strip — books / blossom wash */}
            <div
              className="pointer-events-none absolute -bottom-6 left-0 hidden h-32 w-48 rounded-2xl opacity-90 sm:block lg:-left-4"
              aria-hidden
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#c9a66a]/25 via-transparent to-[#e8b4c4]/35 blur-2xl" />
              <div className="absolute bottom-0 left-2 h-16 w-20 rounded-lg border border-[#c9a66a]/30 bg-[#5c2840]/10 shadow-sm" />
              <div className="absolute bottom-1 left-8 h-14 w-16 -rotate-6 rounded-lg border border-[#c9a66a]/35 bg-[#fdf6ec]/80 shadow-sm" />
              <div className="absolute -bottom-1 left-14 h-3 w-10 rounded-full bg-[#5c2840]/20" />
            </div>
          </div>

          <div data-museum-fade="true" className="relative mx-auto w-full max-w-[400px] lg:mx-0 lg:max-w-none">
            <div
              className="pointer-events-none absolute -right-6 top-1/2 h-[120%] w-[80%] -translate-y-1/2 rounded-[40%] bg-[radial-gradient(ellipse_at_center,rgba(232,180,196,0.45)_0%,transparent_68%)] blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-4 bottom-8 h-24 w-32 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,166,106,0.35)_0%,transparent_70%)] blur-xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[26px] border-2 border-[#d4b98f]/55 bg-[#fdf6ec] shadow-[0_28px_60px_rgba(74,31,50,0.18)]">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(92,40,64,0.15) 0%, transparent 40%, transparent 60%, rgba(201,166,106,0.12) 100%)",
                }}
                aria-hidden
              />
              <img
                src={figure.imageSrc}
                alt={figure.name}
                className="relative z-[1] aspect-[4/5] w-full object-cover object-[center_15%]"
              />
            </div>
          </div>
        </div>

        {/* Three museum cards */}
        <div className="mx-auto mt-14 grid max-w-[1100px] grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-3 sm:gap-6">
          <MuseumInfoCard title="Known For" body={m.knownFor} Icon={Feather} />
          <MuseumInfoCard title="Legacy" body={m.legacy} Icon={BookOpen} />
          <MuseumInfoCard title="Place & Era" body={m.placeEra} Icon={Landmark} />
        </div>

        {/* Quote band */}
        <div
          data-museum-fade="true"
          className="relative mx-auto mt-14 max-w-[1100px] overflow-hidden rounded-[26px] border border-[#e0cdb0] bg-[#faf3e8]/95 px-6 py-10 shadow-[0_18px_40px_rgba(74,31,50,0.1)] sm:mt-16 sm:px-12 sm:py-12"
        >
          <div className="pointer-events-none absolute -left-8 bottom-0 top-0 w-[clamp(72px,18vw,140px)] opacity-[0.55] sm:block">
            <img src={flowerAccent} alt="" className="h-full w-full object-contain object-left" />
          </div>
          <div className="pointer-events-none absolute -right-8 bottom-0 top-0 w-[clamp(72px,18vw,140px)] scale-x-[-1] opacity-[0.55] sm:block">
            <img src={flowerAccent} alt="" className="h-full w-full object-contain object-left" />
          </div>

          <div className="relative z-[1] mx-auto max-w-[720px] text-center">
            <span className="font-serif text-[clamp(52px,10vw,76px)] leading-none text-[#8b3d55]/90" aria-hidden>
              “
            </span>
            <blockquote className="-mt-2 font-serif text-[clamp(22px,4vw,34px)] font-medium italic leading-snug text-[#4a1f32]">
              {m.quote}
            </blockquote>
            <div className="mx-auto mt-8 max-w-[280px]">
              <GoldDiamondRow className="max-w-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function runListIntroAnimation(sectionRef: React.RefObject<HTMLElement | null>) {
  if (!sectionRef.current) return () => {};
  const ctx = gsap.context(() => {
    gsap.set("[data-hist-fade='true']", { autoAlpha: 0, y: 28 });
    gsap.set("[data-hist-hero='true']", { autoAlpha: 0, scale: 1.04 });
    gsap.set("[data-hist-card='true']", {
      autoAlpha: 0,
      y: 35,
      rotateX: -8,
      transformOrigin: "center top",
    });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.to("[data-hist-hero='true']", { autoAlpha: 1, scale: 1, duration: 1.25 })
      .to("[data-hist-fade='true']", { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.12 }, "-=0.7")
      .to(
        "[data-hist-card='true']",
        { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.85, stagger: 0.12 },
        "-=0.4",
      );
  }, sectionRef);
  return () => ctx.revert();
}

function runMuseumIntroAnimation(sectionRef: React.RefObject<HTMLElement | null>) {
  if (!sectionRef.current) return () => {};
  const ctx = gsap.context(() => {
    gsap.set("[data-museum-fade='true']", { autoAlpha: 0, y: 22 });
    gsap.timeline({ defaults: { ease: "power2.out" } }).to("[data-museum-fade='true']", {
      autoAlpha: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.1,
    });
  }, sectionRef);
  return () => ctx.revert();
}

export default function WomenHistoricPage({ onBack }: HistoricPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const selected = selectedId
    ? historicWomen.find((w) => w.id === selectedId) ?? null
    : null;

  React.useLayoutEffect(() => {
    const cleanup = selected
      ? runMuseumIntroAnimation(sectionRef)
      : runListIntroAnimation(sectionRef);
    return cleanup;
  }, [selectedId]);

  const handleBack = () => {
    if (selectedId) setSelectedId(null);
    else onBack?.();
  };

  return (
    <main
      className={`m-0 flex min-h-screen w-screen justify-center p-0 ${
        selected ? "bg-[#f2e9dc] text-[#2f1a28]" : "bg-[#f9f3e8] text-[#2a1534]"
      }`}
    >
      <section
        ref={sectionRef}
        className={`relative flex min-h-screen w-[min(100vw,1400px)] flex-col overflow-x-hidden overflow-y-auto ${
          selected ? "bg-transparent" : "bg-[#fcf7ef]"
        }`}
      >
        <button
          type="button"
          onClick={handleBack}
          className={`absolute z-40 grid h-12 w-12 place-items-center rounded-full border-2 border-[#c9a66a]/80 bg-[#fdf6ec]/95 text-[#4a1f32] shadow-md transition hover:bg-white sm:h-14 sm:w-14 lg:h-16 lg:w-16 ${
            selected ? "left-3 top-4 sm:left-[4.25rem] sm:top-6" : "left-4 top-4 sm:left-8 sm:top-8"
          }`}
          aria-label={selectedId ? "Back to list" : "Back to Women"}
        >
          <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>

        {selected ? (
          <HistoricMuseumDetail figure={selected} />
        ) : (
          <>
            <div
              data-hist-hero="true"
              className="pointer-events-none absolute right-0 top-0 h-[min(55vh,520px)] w-[80vw] sm:h-[min(72vh,900px)] lg:h-[min(100vh,1000px)]"
            >
              <img
                src={mainHero}
                alt=""
                className="absolute inset-0 h-full w-full object-[75%_center] sm:object-right"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-[clamp(72px,14vh,200px)] bg-gradient-to-t from-[#fcf7ef] via-[#fcf7ef]/55 to-transparent"
                aria-hidden
              />
            </div>

            <section className="relative z-10 px-4 py-5 sm:px-8 sm:py-6 lg:px-14">
              <div data-hist-fade="true" className="relative z-20 max-w-[700px] pt-10 sm:pt-14 lg:pt-16">
                <div className="mb-4 flex justify-center lg:justify-start lg:pl-24">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-[#bd6877] text-[#fff8ef] shadow-[0_8px_20px_rgba(90,42,62,0.18)] sm:h-20 sm:w-20">
                    <Crown className="h-8 w-8 sm:h-10 sm:w-10" />
                  </div>
                </div>

                <h1 className="font-serif text-[clamp(58px,15vw,112px)] font-medium leading-[0.88] tracking-tight text-[#48263f]">
                  Historic
                  <br />
                  Women
                </h1>

                <div className="my-6 flex w-full max-w-[260px] items-center gap-3 text-[#b4864d] sm:my-7">
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                  <span className="h-3 w-3 rotate-45 bg-[#b4864d]" />
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                </div>

                <h2 className="font-serif text-[clamp(26px,6vw,38px)] font-light italic leading-tight text-[#b65f71]">
                  Poets, rulers, teachers,
                  <br />
                  and tribal leaders.
                </h2>

                <p className="mt-7 max-w-[410px] text-[clamp(16px,4vw,19px)] leading-[1.7] text-[#353445]">
                  Figures from Kurdish history who led, wrote, taught, and defended their communities—each
                  remembered for a distinct legacy.
                </p>
              </div>
            </section>

            <section className="relative z-20 mt-[clamp(26px,40vh,400px)] grid grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-2 lg:gap-5">
              {historicWomen.map((woman) => {
                const Icon = woman.icon === "crown" ? Crown : Flower2;
                return (
                  <button
                    type="button"
                    key={woman.id}
                    data-hist-card="true"
                    onClick={() => setSelectedId(woman.id)}
                    className="relative grid min-h-[560px] w-full cursor-pointer grid-cols-[0.95fr_1.05fr] overflow-hidden rounded-[28px] border border-[#e4d5c3] bg-white/62 p-4 text-left shadow-[inset_0_0_24px_rgba(159,116,81,0.08),0_8px_22px_rgba(70,38,48,0.08)] backdrop-blur-sm transition hover:border-[#d8b979] sm:min-h-[500px] sm:rounded-[34px] sm:p-5"
                  >
                    <div className="flex items-center justify-center">
                      <div className="h-[260px] w-[220px] overflow-hidden rounded-full border-2 border-[#d8b979] bg-[#d8a6ae]/30 p-1 sm:h-[360px] sm:w-[240px]">
                        <img
                          src={woman.imageSrc}
                          alt=""
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="relative flex flex-col justify-center pr-1">
                      <div className="absolute right-0 top-0 grid h-12 w-12 place-items-center rounded-full bg-[#bd6877] text-[#fff8ef] sm:h-14 sm:w-14">
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                      </div>

                      <h3 className="max-w-[220px] font-serif text-[clamp(26px,4.5vw,38px)] font-semibold leading-[1.05] text-[#4c2d43]">
                        {woman.name}
                      </h3>

                      <p className="mt-2 font-serif text-[clamp(16px,3.2vw,22px)] italic leading-snug text-[#b65f71]">
                        ({woman.role})
                      </p>

                      <div className="my-3 flex w-24 items-center gap-2 text-[#b4864d]">
                        <span className="h-px flex-1 bg-[#d4b98f]" />
                        <span className="h-2 w-2 rotate-45 bg-[#b4864d]" />
                        <span className="h-px flex-1 bg-[#d4b98f]" />
                      </div>

                      <p className="mt-1 max-w-[260px] text-left text-[clamp(13px,2.7vw,16px)] leading-[1.45] text-[#353445]">
                        {woman.teaser}
                      </p>
                    </div>
                  </button>
                );
              })}
            </section>
          </>
        )}
      </section>
    </main>
  );
}
