import React from "react";
import gsap from "gsap";
import { ArrowLeft, BookOpen, Globe2, MapPin, Sparkles } from "lucide-react";
import { detailBackIconClassName, detailBackIconSize } from "@/constants/backNavigation";

import ReligionInfoCard from "@/components/Sections/religions/ReligionInfoCard";

import bg from "@/assets/images/religions/r-3.webp";
import en from "@/data/en.json";
import ar from "@/data/ar.json";

const languages = [
  {
    title: "Kurdish",
    script: "کوردی",
    text: "The heart of Kurdistan. Spoken in many dialects and written in Arabic, Latin, and Cyrillic scripts.",
    color: "#2f6b3f",
  },
  {
    title: "Arabic",
    script: "العربية",
    text: "A shared language across the region with deep roots in literature, faith, and daily life.",
    color: "#c58b16",
  },
  {
    title: "Turkmen",
    script: "مان",
    text: "A Turkic language spoken by Turkmen communities, carrying oral traditions and poetry.",
    color: "#16818b",
  },
  {
    title: "Syriac",
    script: "ܣܘܪܝܝܐ",
    text: "An ancient Aramaic heritage language of Christian communities, kept alive in worship and tradition.",
    color: "#71428c",
  },
  {
    title: "Armenian",
    script: "ԱԲԳ",
    text: "A classical language with a rich literary and cultural legacy in Kurdistan’s historic towns.",
    color: "#a04f1c",
  },
];

function DecorativeLine({ color = "#c99a55" }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
      <span className="text-2xl" style={{ color }}>
        ✥
      </span>
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
    </div>
  );
}

type LanguagesOfKurdistanPageProps = {
  lang?: "en" | "ku" | "ar";
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function LanguagesOfKurdistanPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: LanguagesOfKurdistanPageProps) {
  const data = lang === "ar" ? (ar as any) : (en as any);
  const languagesData = data?.religions?.languagesOfKurdistan ?? {};
  const localizedLanguages = languages.map((item, i) => ({
    ...item,
    title: languagesData?.languages?.[i]?.title ?? item.title,
    text: languagesData?.languages?.[i]?.text ?? item.text,
  }));
  const pageTitle = languagesData?.title ?? ["Languages", "of Kurdistan"];
  const pageTitleLines = Array.isArray(pageTitle) ? pageTitle : [pageTitle];
  const pageSubtitle = languagesData?.subtitle ?? "Voices, Scripts, and Living Identity";
  const pageDescription =
    languagesData?.description ??
    "Across mountains and plains, many communities preserve their identities, pass down their stories, and build their futures-through language.";
  const photoLabel = languagesData?.photoLabel ?? "Qubahan School - Amedi";
  const heritageTitle = languagesData?.heritageCard?.title ?? "Language as Heritage";
  const heritageText =
    languagesData?.heritageCard?.text ??
    "Languages carry our memories, our values, and our worldview. Preserving them means preserving who we are-for today and for generations to come.";
  const footerTitle = languagesData?.footer?.title ?? "Many Tongues, One Homeland.";
  const footerText =
    languagesData?.footer?.text ?? "Different languages. Shared stories. One Kurdistan.";

  const sectionRef = React.useRef<HTMLElement | null>(null);
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-language-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });
      gsap.set("[data-language-animate='true']", {
        autoAlpha: 0,
        y: 24,
      });

      const tl = gsap.timeline();
      tl.to("[data-language-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        "[data-language-animate='true']",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.07,
          ease: "power2.out",
        },
        "-=0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main dir={dir} className="m-0 flex min-h-screen w-screen justify-center bg-[#faf8f5] p-0 text-[#3d2b18]">
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-x-hidden bg-[#faf8f5] px-7 py-9 sm:px-10 lg:px-16"
      >
        <img
          data-language-hero="true"
          src={bg}
          alt=""
          className="absolute left-0 top-0 h-[calc(50vh-160px)] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f5]/15 via-[#faf8f5]/58 to-[#faf8f5]" />
        <div
          className="pointer-events-none absolute inset-x-0 top-[calc(50vh-160px)] z-[1] h-24 -translate-y-full blur-[2px]"
          style={{
            background:
              "linear-gradient(to top, rgba(250,248,245,0.95) 0%, rgba(250,248,245,0.62) 45%, rgba(250,248,245,0) 100%)",
          }}
        />

        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-1/2 z-30 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
        </button>

        <button
          type="button"
          onClick={onLanguageChange}
          className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]"
        >
          <Globe2 className="h-5 w-5" />
          {languageLabel}
        </button>

        <div className="relative z-10 mx-auto max-w-[980px]">
          <header
            data-language-animate="true"
            className="mx-auto max-w-[820px] pt-12 text-center"
          >
            <div className="mx-auto mb-4 w-[430px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="font-serif text-[58px] font-semibold uppercase leading-[1.04] tracking-[0.08em] text-[#2f1f12] sm:text-[78px] lg:text-[92px]">
              {pageTitleLines.map((line, idx) => (
                <React.Fragment key={`${line}-${idx}`}>
                  {line}
                  {idx < pageTitleLines.length - 1 ? <br /> : null}
                </React.Fragment>
              ))}
            </h1>

            <p className="mt-4 font-serif text-[23px] font-semibold uppercase tracking-[0.09em] text-[#a46f22] sm:text-[29px]">
              {pageSubtitle}
            </p>

            <div className="mx-auto mt-7 w-[190px]">
              <DecorativeLine color="#c3923a" />
            </div>

            <p className="mx-auto mt-6 max-w-[650px] text-[20px] font-semibold leading-relaxed text-[#3f3528] sm:text-[24px]">
              {pageDescription}
            </p>
          </header>

          <div className="h-[520px]" />

          <div
            data-language-animate="true"
            className="mb-5 flex justify-end"
          >
            <span className="flex items-center gap-2 rounded-full border border-[#d8b875]/70 bg-[#fff8e9]/90 px-5 py-2 font-serif text-[15px] font-semibold text-[#6a4a25] shadow-sm">
              <MapPin className="h-4 w-4 text-[#c58b16]" />
              {photoLabel}
            </span>
          </div>

          <section
            data-language-animate="true"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {localizedLanguages.map((item, index) => (
              <ReligionInfoCard
                key={item.title}
                title={item.title}
                body={item.text}
                image={bg}
                accent={item.color}
                accentIndex={index}
                align="center"
                titleClassName="uppercase"
              />
            ))}

            <ReligionInfoCard
              title={heritageTitle}
              body={heritageText}
              image={bg}
              accentIndex={localizedLanguages.length}
              align="center"
              titleClassName="uppercase"
            />
          </section>

          <section
            data-language-animate="true"
            className="mx-auto mt-8 rounded-[26px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-8 py-7 text-center shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <Sparkles className="mx-auto mb-4 h-12 w-12 text-[#c58b16]" />

            <h2 className="font-serif text-[34px] font-semibold uppercase leading-tight text-[#3b2410] sm:text-[42px]">
              {footerTitle}
            </h2>

            <p className="mt-3 text-[19px] font-semibold text-[#6a4a25]">
              {footerText}
            </p>

            <div className="mx-auto mt-5 w-[420px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>
          </section>

          <Sparkles className="mx-auto mt-5 h-12 w-12 text-[#c58b16]" />
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
      </section>
    </main>
  );
}
