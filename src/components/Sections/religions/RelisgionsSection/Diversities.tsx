import React from "react";
import {
  ArrowLeft,
  ChevronRight,
  Church,
  Compass,
  Cross,
  Globe2,
  Landmark,
  MapPin,
  MoonStar,
  Scale,
  UsersRound,
} from "lucide-react";
import { detailBackIconClassName, detailBackIconSize } from "@/constants/backNavigation";

import bg from "@/assets/images/religions/r-7.webp";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";
import placeImg from "@/assets/mainImages/story-1.webp";
import en from "@/data/en.json";
import ar from "@/data/ar.json";

const places = [
  { title: "Duhok", text: "A mosaic of cultures in the north.", x: "18%", y: "15%", icon: MoonStar, color: "#2f8a55" },
  { title: "Amedi", text: "Historic Christian heritage and natural beauty.", x: "63%", y: "20%", icon: Cross, color: "#7c3fa0" },
  { title: "Alqosh", text: "One of the world's oldest Christian communities.", x: "21%", y: "39%", icon: Cross, color: "#7c3fa0" },
  { title: "Erbil", text: "A modern city with ancient roots.", x: "52%", y: "39%", icon: MoonStar, color: "#2f8a55" },
  { title: "Ankawa", text: "A diverse neighborhood where communities thrive.", x: "72%", y: "42%", icon: Cross, color: "#7c3fa0" },
  { title: "Lalish", text: "Sacred to the Yazidi community for centuries.", x: "44%", y: "59%", icon: Church, color: "#d45d22" },
  { title: "Sulaymaniyah", text: "A cultural and intellectual heart of Kurdistan.", x: "72%", y: "64%", icon: MoonStar, color: "#2f8a55" },
  { title: "Halabja", text: "A symbol of resilience, peace, and coexistence.", x: "75%", y: "79%", icon: MapPin, color: "#2f78a8" },
];

const infoCards = [
  {
    title: "8 Recognized Religions",
    text: "Islam, Christianity, Yazidism, Judaism, Sabean-Mandaeism, Zoroastrianism, Hinduism, and the Baha’i Faith.",
    icon: Cross,
  },
  {
    title: "Shared Heritage",
    text: "Centuries of living together—building communities, traditions, and a shared identity that unites.",
    icon: UsersRound,
  },
  {
    title: "Protected by Law",
    text: "Religious freedom and diversity are guaranteed by the Constitution of the Kurdistan Region.",
    icon: Scale,
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

type DiversityMapPageProps = {
  lang?: "en" | "ku" | "ar";
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function DiversityMapPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: DiversityMapPageProps) {
  const data = lang === "ar" ? (ar as any) : (en as any);
  const mapData = data?.religions?.diversityMap ?? {};
  const localizedPlaces = places.map((place, i) => ({
    ...place,
    title: mapData?.places?.[i]?.title ?? place.title,
    text: mapData?.places?.[i]?.text ?? place.text,
  }));
  const localizedInfoCards = infoCards.map((card, i) => ({
    ...card,
    title: mapData?.infoCards?.[i]?.title ?? card.title,
    text: mapData?.infoCards?.[i]?.text ?? card.text,
  }));
  const pageTitle = mapData?.title ?? ["Explore", "The Diversity"];
  const pageTitleLines = Array.isArray(pageTitle) ? pageTitle : [pageTitle];
  const pageSubtitle = mapData?.subtitle ?? "A Living Map of Coexistence";
  const pageDescription =
    mapData?.description ??
    "Across mountains and valleys, different faiths, languages, and communities have woven a rich tapestry of life together-today and for generations.";
  const countries = mapData?.countries ?? ["Turkey", "Iran", "Syria", "Iraq"];
  const footerTitle = mapData?.footer?.title ?? "Every place has a story.";
  const footerText =
    mapData?.footer?.text ?? "Explore, learn, and celebrate the beautiful diversity of Kurdistan.";

  const sectionRef = React.useRef<HTMLElement | null>(null);
  const dir = lang === "en" ? "ltr" : "rtl";

  useReligionPageAnimation(
    sectionRef,
    {
      hero: "[data-map-hero='true']",
      animate: "[data-map-animate='true']",
      controls: "[data-map-controls='true']",
    },
    [lang],
  );

  return (
    <main dir={dir} className="m-0 flex min-h-screen w-screen justify-center bg-[#faf8f5] p-0 text-[#3d2b18]">
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full overflow-x-hidden bg-[#faf8f5] px-7 py-9 sm:px-10 lg:px-16"
      >
        <div
          data-map-hero="true"
          className="absolute inset-0 bg-top bg-no-repeat"
          style={{ backgroundImage: `url(${bg})`, backgroundSize: "100% 100%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f5] via-[#faf8f5]/88 to-[#faf8f5]/55" />
        {/* <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:24px_24px]" /> */}

        <button
          type="button"
          data-map-controls="true"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#5a3a18] shadow-sm"
          aria-label="Back"
        >
          <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
        </button>

        <button
          type="button"
          data-map-controls="true"
          onClick={onLanguageChange}
          className="absolute right-8 top-8 z-30 flex items-center gap-3 rounded-full border border-[#d9b477] bg-white/75 px-5 py-3 font-serif text-sm font-semibold text-[#4b3219] shadow-[0_8px_20px_rgba(84,54,16,0.15)]"
        >
          <Globe2 className="h-5 w-5" />
          {languageLabel}
        </button>

        <div className="relative z-10 mx-auto max-w-[1180px]">
          <header data-map-animate="true" className="mx-auto max-w-[790px] pt-8 text-center">
            <div className="mx-auto mb-3 w-[430px] max-w-full">
              <DecorativeLine color="#c3923a" />
            </div>

            <h1 className="font-serif text-[58px] font-semibold uppercase leading-[0.98] tracking-[0.08em] text-[#2f1f12] sm:text-[78px] lg:text-[92px]">
              {pageTitleLines.map((line, idx) => (
                <React.Fragment key={`${line}-${idx}`}>
                  {line}
                  {idx < pageTitleLines.length - 1 ? <br /> : null}
                </React.Fragment>
              ))}
            </h1>

            <p className="mt-4 font-serif text-[24px] font-semibold uppercase tracking-[0.08em] text-[#a46f22] sm:text-[30px]">
              {pageSubtitle}
            </p>

            <div className="mx-auto mt-5 w-[190px]">
              <DecorativeLine color="#c3923a" />
            </div>

            <p className="mx-auto mt-5 max-w-[650px] text-[19px] font-semibold leading-relaxed text-[#3f3528] sm:text-[22px]">
              {pageDescription}
            </p>
          </header>

          <section className="relative mx-auto mt-7 h-[720px] max-w-[960px]">
            <Compass className="absolute right-[-55px] top-10 z-20 h-32 w-32 text-[#b8862e]/70" strokeWidth={1.2} />

            <div className="relative h-full w-full drop-shadow-[0_18px_26px_rgba(77,46,14,0.28)]">
              {/* <div className="absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_25%_25%,#a5ad67_0_5%,transparent_6%),radial-gradient(circle_at_70%_70%,#7d9d61_0_5%,transparent_6%),linear-gradient(140deg,#d5b56f,#839e5d_42%,#d8bd82_78%)] [clip-path:polygon(15%_10%,34%_3%,52%_14%,65%_8%,83%_24%,90%_44%,82%_58%,91%_78%,72%_94%,55%_85%,42%_94%,31%_76%,18%_70%,9%_52%,15%_35%)]" />
              <div className="absolute inset-0 border-[8px] border-[#b78a38]/80 [clip-path:polygon(15%_10%,34%_3%,52%_14%,65%_8%,83%_24%,90%_44%,82%_58%,91%_78%,72%_94%,55%_85%,42%_94%,31%_76%,18%_70%,9%_52%,15%_35%)]" />
              <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(35deg,transparent_48%,#157c87_49%,transparent_51%),linear-gradient(85deg,transparent_48%,#157c87_49%,transparent_51%)]" /> */}

              <span className="absolute left-[40%] top-[10%] font-serif text-[18px] font-semibold uppercase tracking-[0.25em] text-[#9b6d35]">
                {countries[0] ?? "Turkey"}
              </span>
              <span className="absolute right-[3%] top-[28%] font-serif text-[18px] font-semibold uppercase tracking-[0.25em] text-[#9b6d35]">
                {countries[1] ?? "Iran"}
              </span>
              <span className="absolute left-[8%] bottom-[23%] font-serif text-[18px] font-semibold uppercase tracking-[0.25em] text-[#9b6d35]">
                {countries[2] ?? "Syria"}
              </span>
              <span className="absolute left-[28%] bottom-[7%] font-serif text-[18px] font-semibold uppercase tracking-[0.25em] text-[#9b6d35]">
                {countries[3] ?? "Iraq"}
              </span>

              {localizedPlaces.map((place) => {
                const Icon = place.icon;

                return (
                  <article
                    key={place.title}
                    data-map-animate="true"
                    className="absolute z-30 flex -translate-x-1/2 -translate-y-1/2 items-center"
                    style={{ left: place.x, top: place.y }}
                  >
                    <div className="relative h-[82px] w-[82px] shrink-0 overflow-x-hidden rounded-full border-[5px] border-[#d5b873] bg-[#ead6a3] shadow-[0_8px_16px_rgba(50,30,10,0.25)]">
                      <img src={placeImg} alt={place.title} className="h-full w-full object-cover" />

                      <div
                        className="absolute bottom-[-2px] right-[-2px] grid h-8 w-8 place-items-center rounded-full border-2 border-[#f7e4b9] text-white"
                        style={{ backgroundColor: place.color }}
                      >
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      </div>
                    </div>

                    <div className="-ml-2 w-[165px] rounded-xl border border-[#d3ad68] bg-[#fff4db]/95 px-4 py-3 shadow-[0_8px_18px_rgba(65,38,10,0.15)]">
                      <h3 className="font-serif text-[21px] font-semibold leading-none text-[#3b2410]">
                        {place.title}
                      </h3>
                      <p className="mt-1 text-[12px] font-semibold leading-snug text-[#4b3a27]">
                        {place.text}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="mx-auto mt-4 grid max-w-[960px] grid-cols-1 gap-6 sm:grid-cols-3">
            {localizedInfoCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  data-map-animate="true"
                  className="min-h-[255px] rounded-[26px] border-2 border-[#c99745]/45 bg-[#fff6e1]/92 px-7 py-7 shadow-[0_12px_28px_rgba(75,45,12,0.13)] backdrop-blur-md"
                >
                  <div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-b from-[#dba437] to-[#b27612] text-white">
                    <Icon className="h-8 w-8" strokeWidth={1.8} />
                  </div>

                  <h3 className="font-serif text-[23px] font-semibold uppercase leading-tight text-[#3b2410]">
                    {card.title}
                  </h3>

                  <p className="mt-4 text-[15px] font-semibold leading-relaxed text-[#4d3c2a]">
                    {card.text}
                  </p>

                  <div className="mx-auto mt-5 w-[150px]">
                    <DecorativeLine color="#c3923a" />
                  </div>
                </article>
              );
            })}
          </section>

          <section
            data-map-animate="true"
            className="mx-auto mt-9 flex max-w-[820px] items-center gap-7 rounded-[28px] border-2 border-[#c99745]/45 bg-[#fff7e7]/95 px-8 py-5 shadow-[0_12px_28px_rgba(75,45,12,0.16)]"
          >
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#cf921d] text-white">
              <MapPin className="h-9 w-9" />
            </div>

            <p className="flex-1 font-serif text-[20px] leading-snug text-[#3b2410]">
              {footerTitle}
              <br />
              <span className="text-[17px] font-semibold text-[#6a4a25]">
                {footerText}
              </span>
            </p>

            <button className="grid h-14 w-14 place-items-center rounded-full border border-[#d5b873] bg-[#fff4dc] text-[#8a5a12]">
              <ChevronRight className="h-8 w-8" />
            </button>
          </section>

          <Landmark className="mx-auto mt-5 h-12 w-12 text-[#c58b16]" />
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
      </section>
    </main>
  );
}