import React from "react";
import gsap from "gsap";
import {
  ArrowLeft,
  ChevronRight,
  Globe2,
  UsersRound,
  Sparkles,
} from "lucide-react";
import { detailBackIconClassName, detailBackIconSize } from "@/constants/backNavigation";

import ReligionInfoCard from "@/components/Sections/religions/ReligionInfoCard";

import bg from "@/assets/images/religions/r-3.webp";
import LanguagesOfKurdistanPage from "@/components/Sections/religions/Languages/KurdistanLanguages";
import en from "@/data/en.json";
import ar from "@/data/ar.json";

const communities = [
  {
    title: "Kurds",
    text: "The indigenous people of Kurdistan with a rich cultural heritage, language, and enduring spirit.",
    color: "#9b7a34",
  },
  {
    title: "Turkmens",
    text: "Descendants of Oghuz Turkic tribes, known for their hospitality, traditions, and vibrant culture.",
    color: "#1681a2",
  },
  {
    title: "Assyrians",
    text: "An ancient Christian community with a deep historical presence and a strong cultural legacy.",
    color: "#8c795d",
  },
  {
    title: "Chaldeans",
    text: "A distinct Christian community preserving the Chaldean rite, faith, and centuries-old traditions.",
    color: "#9a3f2d",
  },
  {
    title: "Syriacs",
    text: "Keepers of one of the world's oldest liturgical traditions and a proud heritage of faith and learning.",
    color: "#3b718f",
  },
  {
    title: "Armenians",
    text: "An ancient community with a rich cultural, religious, and artistic heritage in Kurdistan.",
    color: "#71428c",
  },
  {
    title: "Yazidis",
    text: "A spiritual community with unique beliefs, honoring peace, tolerance, and the cycles of nature.",
    color: "#d0a143",
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

type LangCode = "en" | "ku" | "ar";

type NationalitiesProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function Nationalities({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: NationalitiesProps) {
  const data = lang === "ar" ? (ar as any) : (en as any);
  const nationalitiesData = data?.religions?.nationalities ?? {};
  const localizedCommunities = communities.map((item, i) => ({
    ...item,
    title: nationalitiesData?.communities?.[i]?.title ?? item.title,
    text: nationalitiesData?.communities?.[i]?.text ?? item.text,
  }));
  const pageTitle = nationalitiesData?.title ?? ["Nationalities &", "Communities"];
  const pageTitleLines = Array.isArray(pageTitle) ? pageTitle : [pageTitle];
  const pageSubtitle = nationalitiesData?.subtitle ?? "Languages, Heritage, and Belonging.";
  const pageDescription =
    nationalitiesData?.description ??
    "Kurdistan is a home to many peoples. Each community brings its own history, language, and traditions-weaving together in a shared identity.";
  const footerTitle = nationalitiesData?.footer?.title ?? "United in Diversity";
  const footerText = nationalitiesData?.footer?.text ?? "Different roots, one homeland.";

  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [subPage, setSubPage] = React.useState<null | "languages">(null);
  const dir = lang === "en" ? "ltr" : "rtl";

  React.useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-nationality-hero='true']", {
        autoAlpha: 0,
        scale: 1.04,
      });
      gsap.set("[data-nationality-animate='true']", {
        autoAlpha: 0,
        y: 22,
      });

      const tl = gsap.timeline();
      tl.to("[data-nationality-hero='true']", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      }).to(
        "[data-nationality-animate='true']",
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

  if (subPage === "languages") {
    const languagesPageProps = {
      lang,
      languageLabel,
      onLanguageChange,
      onBack: () => setSubPage(null),
    } as const;

    return (
      <LanguagesOfKurdistanPage {...(languagesPageProps as React.ComponentProps<any>)} />
    );
  }

  return (
    <main
      dir={dir}
      className="m-0 flex min-h-screen w-screen justify-center bg-[#faf8f5] p-0 text-[#3d2b18]"
    >
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-x-hidden bg-[#faf8f5] px-7 py-9 sm:px-10 lg:px-16"
      >
        <img
          data-nationality-hero="true"
          src={bg}
          alt=""
          className="pointer-events-none absolute left-0 top-0 z-[1] h-[max(14rem,calc(50vh-10rem))] w-full object-cover [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-[max(14rem,calc(50vh-10rem))] z-[1] h-24 -translate-y-full blur-[2px]"
          style={{
            background:
              "linear-gradient(to top, rgba(250,248,245,0.95) 0%, rgba(250,248,245,0.62) 45%, rgba(250,248,245,0) 100%)",
          }}
        />

        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#faf8f5]/15 via-[#faf8f5]/58 to-[#faf8f5]" />

        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm"
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

        <div className="relative z-10 mx-auto max-w-[1040px]">
          <header
            data-nationality-animate="true"
            className="mx-auto max-w-[850px] pt-16 text-center"
          >
            <div className="mx-auto mb-4 w-[420px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="font-serif text-[56px] font-semibold uppercase leading-[1.03] tracking-[0.07em] text-[#2f1f12] sm:text-[76px] lg:text-[88px]">
              {pageTitleLines.map((line, idx) => (
                <React.Fragment key={`${line}-${idx}`}>
                  {line}
                  {idx < pageTitleLines.length - 1 ? <br /> : null}
                </React.Fragment>
              ))}
            </h1>

            <p className="mt-4 font-serif text-[24px] font-semibold uppercase tracking-[0.13em] text-[#a46f22] sm:text-[30px]">
              {pageSubtitle}
            </p>

            <div className="mx-auto mt-6 w-[190px]">
              <DecorativeLine color="#c3923a" />
            </div>

            <p className="mx-auto mt-5 max-w-[610px] text-[20px] font-semibold leading-relaxed text-[#4d3c2a] sm:text-[24px]">
              {pageDescription}
            </p>
          </header>

          <div className="h-[230px]" />

          <section
            data-nationality-animate="true"
            className="mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {localizedCommunities.map((item, index) => (
              <ReligionInfoCard
                key={item.title}
                title={item.title}
                body={item.text}
                image={bg}
                accent={item.color}
                accentIndex={index}
                titleClassName="uppercase"
              />
            ))}
          </section>

          <section
            data-nationality-animate="true"
            className="mx-auto mt-6 flex items-center gap-7 rounded-[24px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <div className="grid h-16 w-16 shrink-0 place-items-center text-[#c58b16]">
              <UsersRound className="h-12 w-12" strokeWidth={1.8} />
            </div>

            <p className="flex-1 font-serif text-[29px] font-semibold uppercase leading-tight text-[#3b2410]">
              {footerTitle}
              <br />
              <span className="text-[20px] normal-case font-semibold text-[#6a4a25]">
                {footerText}
              </span>
            </p>

            <button
              type="button"
              onClick={() => setSubPage("languages")}
              className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#c58b16] text-white shadow-[0_8px_18px_rgba(75,45,12,0.18)]"
            >
              <ChevronRight className="h-9 w-9" />
            </button>
          </section>

          <Sparkles className="mx-auto mt-5 h-12 w-12 text-[#c58b16]" />
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
      </section>
    </main>
  );
}
