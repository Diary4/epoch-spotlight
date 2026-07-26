import React from "react";
import {
  ArrowLeft,
  ChevronRight,
  Globe2,
  Sparkles,
  Sun,
  Waves,
  UsersRound,
} from "lucide-react";
import { detailBackIconClassName, detailBackIconSize, religionsOverlayStartClassName, religionsOverlayEndClassName } from "@/constants/backNavigation";

import ReligionInfoCard from "@/components/Sections/religions/ReligionInfoCard";
import ReligionsScaledPage from "@/components/Sections/religions/ReligionsScaledPage";

import yarsanism from "@/assets/images/religions/k-1.webp";
import zoroastrianism from "@/assets/images/religions/zoro/cover.jpeg";
import judaism from "@/assets/images/religions/judaism/card-cover.jpeg";
import bahai from "@/assets/images/religions/bahai/card-cover.jpeg";
import mandaean from "@/assets/images/religions/sabean/card-cover.jpeg";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";
import en from "@/data/en.json";
import ar from "@/data/ar.json";

const faiths = [
  {
    title: "Yarsanism",
    text: "An ancient Kurdish faith rooted in spiritual enlightenment and devotion to the Divine. Yarsanis value inner purity, truth, and respect for all living beings.",
    image: yarsanism,
    icon: Sparkles,
    label: "Kakai Shrines – Hawar Village",
  },
  {
    title: "Zoroastrianism",
    text: "One of the world’s oldest monotheistic faiths, brought to the region through ancient migrations. It teaches the eternal struggle between good and evil and the pursuit of truth and virtue.",
    image: zoroastrianism,
    icon: Sun,
    label: "Zoroastrian Temple – Darbandikhan",
  },
  {
    title: "Judaism",
    text: "An ancient presence in Kurdistan, dating back thousands of years. Kurdish Jews have played a vital role in the cultural, economic, and social life of the region.",
    image: judaism,
    icon: Sparkles,
    label: "Shrine of the Prophet Nahum – Aqosh",
  },
  {
    title: "Baha’i Faith",
    text: "A modern faith that teaches the unity of God, the oneness of humanity, and the harmony of religion, science, and reason. Its message resonates deeply in a diverse world.",
    image: bahai,
    icon: Sparkles,
    label: "",
  },
  {
    title: "Sabean-Mandaeanism",
    text: "An ancient Gnostic faith centered around John the Baptist as a prophet. It honors baptism, purity, and the light of knowledge.",
    image: mandaean,
    icon: Waves,
    label: "",
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

type OtherFaithTraditionsPageProps = {
  lang?: "en" | "ku" | "ar";
  languageLabel?: string;
  onLanguageChange?: () => void;
  onOpenDiversityMap?: () => void;
  onBack?: () => void;
};

export default function OtherFaithTraditionsPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onOpenDiversityMap,
  onBack,
}: OtherFaithTraditionsPageProps) {
  const data = lang === "ar" ? (ar as any) : (en as any);
  const otherFaithData = data?.religions?.otherFaithTraditions ?? {};
  const localizedFaiths = faiths.map((faith, i) => ({
    ...faith,
    title: otherFaithData?.faiths?.[i]?.title ?? faith.title,
    text: otherFaithData?.faiths?.[i]?.text ?? faith.text,
    label: otherFaithData?.faiths?.[i]?.label ?? faith.label,
  }));
  const pageTitle = otherFaithData?.title ?? ["Other Faith", "Traditions"];
  const pageTitleLines = Array.isArray(pageTitle) ? pageTitle : [pageTitle];
  const pageSubtitle =
    otherFaithData?.subtitle ??
    "Yarsanism, Zoroastrianism, Judaism,\nBaha'i Faith, and Sabean-Mandaeanism";
  const pageDescription =
    otherFaithData?.description ??
    "Kurdistan is a land of spiritual depth and cultural harmony, where diverse faiths have lived, prayed, and contributed to a shared legacy of peace and respect.";
  const footerTitle = otherFaithData?.footer?.title ?? "Diversity Is Our Strength";
  const footerText = otherFaithData?.footer?.text ?? "Different paths, one shared home.";

  const sectionRef = React.useRef<HTMLElement | null>(null);
  const dir = lang === "en" ? "ltr" : "rtl";

  useReligionPageAnimation(
    sectionRef,
    {
      hero: "[data-faith-hero='true']",
      animate: "[data-faith-animate='true']",
      controls: "[data-faith-controls='true']",
    },
    [lang],
  );

  return (
    <ReligionsScaledPage dir={dir} lang={lang} fitDeps={[lang]} sectionRef={sectionRef} className="px-12 pb-14">
      <div data-faith-hero="true" className="absolute inset-0 bg-[#faf8f5]" />
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:24px_24px]" />

      <button
        type="button"
        data-faith-controls="true"
        onClick={onBack}
        className={`absolute top-1/2 z-30 grid h-14 w-14 -translate-y-1/2 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm ${religionsOverlayStartClassName(dir)}`}
        aria-label="Back"
      >
        <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
      </button>

      <button
        type="button"
        data-faith-controls="true"
        onClick={onLanguageChange}
        className={`absolute top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)] ${religionsOverlayEndClassName(dir)}`}
      >
        <Globe2 className="h-5 w-5" />
        {languageLabel}
      </button>

      <div className="relative z-10 mx-auto max-w-[1060px]">
        <header
          data-faith-animate="true"
          className="mx-auto max-w-[880px] pt-12 text-center"
        >
          <div className="mx-auto mb-4 w-[440px] max-w-full">
            <DecorativeLine color="#c3923a" />
          </div>

          <h1 className="font-serif text-[88px] font-semibold uppercase leading-[1.03] tracking-[0.07em] text-[#2f1f12]">
            {pageTitleLines.map((line, idx) => (
              <React.Fragment key={`${line}-${idx}`}>
                {line}
                {idx < pageTitleLines.length - 1 ? <br /> : null}
              </React.Fragment>
            ))}
          </h1>

          <p className="mt-4 font-serif text-[28px] font-semibold uppercase leading-snug tracking-[0.06em] text-[#a46f22]">
            {(pageSubtitle ?? "").split("\n").map((line: string, idx: number) => (
              <React.Fragment key={`${line}-${idx}`}>
                {line}
                {idx < (pageSubtitle ?? "").split("\n").length - 1 ? <br /> : null}
              </React.Fragment>
            ))}
          </p>

          <div className="mx-auto mt-6 w-[190px]">
            <DecorativeLine color="#c3923a" />
          </div>

          <p className="mx-auto mt-5 max-w-[690px] text-[23px] font-semibold leading-relaxed text-[#4d3c2a]">
            {pageDescription}
          </p>
        </header>

        <section className="mt-9 grid grid-cols-2 gap-5">
          {localizedFaiths.map((faith, index) => (
            <div key={faith.title} data-faith-animate="true">
              <ReligionInfoCard
                title={faith.title}
                body={faith.text}
                image={faith.image}
                eyebrow={faith.label}
                accentIndex={index}
                titleClassName="uppercase"
              />
            </div>
          ))}
        </section>

        <section
          data-faith-animate="true"
          className="mx-auto mt-7 flex max-w-[760px] items-center gap-7 rounded-[26px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
        >
          <div className="grid h-16 w-16 shrink-0 place-items-center text-[#c58b16]">
            <UsersRound className="h-12 w-12" strokeWidth={1.8} />
          </div>

          <p className="flex-1 font-serif text-[27px] font-semibold uppercase leading-tight text-[#3b2410]">
            {footerTitle}
            <br />
            <span className="text-[18px] normal-case font-semibold text-[#6a4a25]">
              {footerText}
            </span>
          </p>

          <button
            type="button"
            onClick={onOpenDiversityMap}
            className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[#d6b06b] bg-[#fff4dc] text-[#a8751f]"
          >
            <ChevronRight className="h-9 w-9" />
          </button>
        </section>

        <Sparkles className="mx-auto mt-5 h-12 w-12 text-[#c58b16]" />
      </div>

      <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
    </ReligionsScaledPage>
  );
}