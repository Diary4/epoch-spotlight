import React from "react";
import { ArrowLeft, BookOpen, Feather, Landmark, Sparkles } from "lucide-react";
import gsap from "gsap";

import knowledgeHero from "@/assets/images/women/c-2.png";
import masturaImg from "@/assets/images/women/w-10.png";
import hapsaImg from "@/assets/images/women/w-11.png";

type WomenKnowledgePageProps = {
  onBack?: () => void;
};

const people = [
  {
    name: "Mastura Ardalan",
    role: "Historian & poet",
    imageSrc: masturaImg,
  },
  {
    name: "Hapsa Khan",
    role: "Education pioneer",
    imageSrc: hapsaImg,
  },
];

const topics = [
  {
    title: "Poetry",
    icon: Feather,
  },
  {
    title: "History",
    icon: Landmark,
  },
  {
    title: "Girls’ Education",
    icon: BookOpen,
  },
];

export default function WomenKnowledgePage({ onBack }: WomenKnowledgePageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-knowledge-fade='true']", {
        autoAlpha: 0,
        y: 26,
      });

      gsap.set("[data-knowledge-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });

      gsap.to("[data-knowledge-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      });

      gsap.to("[data-knowledge-fade='true']", {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power2.out",
        delay: 0.25,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="m-0 flex h-screen w-screen justify-center bg-[#f9f3e8] p-0 text-[#2a1534]">
      <section
        ref={sectionRef}
        className="relative flex h-screen w-[min(100vw,1400px)] flex-col overflow-y-auto overflow-x-hidden bg-[#fcf7ef]"
      >
        <button
          type="button"
          onClick={onBack}
          className="absolute left-4 top-4 z-30 grid h-12 w-12 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:left-8 sm:top-8 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          aria-label="Back to Women"
        >
          <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>

        {/* Hero full-bleed image */}
        <div
          data-knowledge-hero="true"
          className="pointer-events-none absolute right-0 top-0 h-[min(55vh,520px)] w-[100vw] sm:h-[min(72vh,900px)] lg:h-[min(92vh,1150px)]"
        >
           <img
            src={knowledgeHero}
            alt="Women of Knowledge"
            className="absolute inset-0 h-[100%] w-[100%] object-right-top"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[clamp(72px,14vh,200px)] bg-gradient-to-t from-[#fcf7ef] via-[#fcf7ef]/55 to-transparent"
            aria-hidden
          />
        </div>

        {/* Hero text */}
        <section className="relative z-10 px-4 py-5 sm:px-8 sm:py-6 lg:px-14">
          <div data-knowledge-fade="true" className="relative z-20 max-w-[700px] pt-10 sm:pt-14 lg:pt-16">
            <h1 className="font-serif text-[clamp(62px,15vw,110px)] font-medium leading-[0.95] tracking-tight text-[#2c1337]">
              Women
              <br />
              <span className="inline-flex items-center gap-4 text-[0.48em] leading-none">
                <span className="h-px w-20 bg-[#d4b98f]" />
                of
                <span className="h-px w-20 bg-[#d4b98f]" />
              </span>
              <br />
              Knowledge
            </h1>

            <h2 className="mt-5 font-serif text-[clamp(28px,6vw,42px)] font-light text-[#b65f71]">
              Writers & educators.
            </h2>

            <div className="my-6 flex w-full max-w-[300px] items-center gap-3 text-[#b4864d]">
              <span className="h-px flex-1 bg-[#d4b98f]" />
              <Sparkles className="h-5 w-5" />
              <span className="h-px flex-1 bg-[#d4b98f]" />
            </div>

            <p className="max-w-[400px] text-[clamp(17px,4vw,21px)] leading-[1.65] text-[#353445]">
              Voices of learning, literature, and education.
            </p>
          </div>
        </section>

        {/* People */}
        <section className="relative z-20 mt-[clamp(26px,40vh,600px)] grid grid-cols-1 gap-5 px-4 py-4 sm:grid-cols-2 sm:px-8 lg:px-14">
          {people.map((person) => (
            <article
              data-knowledge-fade="true"
              key={person.name}
              className="flex min-h-[430px] flex-col items-center justify-end rounded-[28px] border border-[#e4d5c3] bg-white/65 px-5 pb-8 pt-6 text-center shadow-[0_8px_24px_rgba(76,45,55,0.1)]"
            >
              <img
                src={person.imageSrc}
                alt={person.name}
                className="mb-4 h-[270px] w-full object-contain"
              />

              <Sparkles className="mb-2 h-7 w-7 text-[#b4864d]" />

              <h3 className="font-serif text-[clamp(34px,5vw,48px)] leading-none text-[#43223d]">
                {person.name}
              </h3>

              <p className="mt-2 font-serif text-[clamp(21px,3vw,28px)] text-[#b65f71]">
                {person.role}
              </p>

              <div className="mt-4 flex w-28 items-center gap-2 text-[#b4864d]">
                <span className="h-px flex-1 bg-[#d4b98f]" />
                <span className="h-2 w-2 rotate-45 border border-[#b4864d]" />
                <span className="h-px flex-1 bg-[#d4b98f]" />
              </div>
            </article>
          ))}
        </section>

        {/* Topics */}
        <section className="relative z-20 mt-5 grid grid-cols-1 gap-4 px-4 py-1 sm:grid-cols-3 sm:px-8 lg:px-14">
          {topics.map((topic) => {
            const Icon = topic.icon;

            return (
              <article
                data-knowledge-fade="true"
                key={topic.title}
                className="flex min-h-[180px] flex-col items-center justify-center rounded-[22px] border border-[#e4d5c3] bg-white/65 p-5 text-center shadow-[0_8px_20px_rgba(76,45,55,0.08)]"
              >
                <div className="grid h-20 w-20 place-items-center rounded-full bg-[#f2dfe0] text-[#b4864d]">
                  <Icon className="h-11 w-11" />
                </div>

                <h4 className="mt-4 font-serif text-[clamp(24px,4vw,32px)] text-[#43223d]">
                  {topic.title}
                </h4>

                <div className="mt-3 flex w-24 items-center gap-2 text-[#b4864d]">
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                  <span className="h-2 w-2 rotate-45 border border-[#b4864d]" />
                  <span className="h-px flex-1 bg-[#d4b98f]" />
                </div>
              </article>
            );
          })}
        </section>

        {/* Impact */}
        <section
          data-knowledge-fade="true"
          className="relative z-20 mt-5 mx-4 mb-4 flex min-h-[125px] flex-col items-center justify-center overflow-hidden rounded-[24px] border border-[#e4d5c3] bg-white/65 px-5 text-center shadow-[0_8px_20px_rgba(76,45,55,0.08)] sm:mx-8 lg:mx-14"
        >
          <h3 className="font-serif text-[clamp(30px,5vw,42px)] leading-none text-[#43223d]">
            ✤ Their Impact
          </h3>

          <p className="mt-3 text-[clamp(16px,3vw,21px)] text-[#353445]">
            They opened doors through knowledge.
          </p>
        </section>
      </section>
    </main>
  );
}