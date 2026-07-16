import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import {
  detailBackButtonClassName,
  detailBackButtonSideClassName,
  detailBackIconClassName,
  detailBackIconSize,
} from "@/constants/backNavigation";
import presidencyPortrait from "@/assets/images/parliment/presidency-centered.webp";
import president1 from "@/assets/images/president/1.jpeg";
import president2 from "@/assets/images/president/2.jpeg";
import president3 from "@/assets/images/president/3.jpeg";
import president4 from "@/assets/images/president/4.jpeg";
import president5 from "@/assets/images/president/5.jpeg";
import president6 from "@/assets/images/president/6.jpeg";
import president7 from "@/assets/images/president/7.jpeg";
import president8 from "@/assets/images/president/8.jpeg";
import president9 from "@/assets/images/president/9.jpeg";

type TimelineDetail =
  | string
  | {
      title: string;
      text: string;
    };

type TimelineEntry = {
  id: string;
  era: string;
  title: string;
  description: string;
  image: string;
  details: TimelineDetail[];
};

type PresidencyTimelineProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

/** English-only for now — Kurdish / Arabic copy to be provided later. */
const TIMELINE: TimelineEntry[] = [
  {
    id: "roots-formation",
    era: "1966",
    title: "Roots & Formation",
    description:
      "Born in 1966 in Barzan, Nechirvan Barzani grew up during one of the most significant periods in modern Kurdish history. His childhood was shaped by the Kurdish national movement and the enduring legacy of the Barzani family.",
    image: president1,
    details: [
      "Born in Barzan, Kurdistan Region.",
      "Grandson of Mustafa Barzani, founder of the Kurdistan Democratic Party (KDP).",
      "Raised within a family deeply connected to the Kurdish national cause.",
    ],
  },
  {
    id: "education-beginnings",
    era: "1989",
    title: "Education & Political Beginnings",
    description:
      "His academic experience and early political engagement helped shape his understanding of diplomacy, governance, and regional affairs.",
    image: president2,
    details: [
      "Studied politics and international relations at the University of Tehran, Iran.",
      "Became a member of the leadership of the Kurdistan Democratic Party.",
      "Later assumed the position of Deputy Leader of the KDP.",
      "Speaks Kurdish (Badini and Sorani), Persian, and English.",
    ],
  },
  {
    id: "building-institutions",
    era: "2006–2019",
    title: "Building Institutions",
    description:
      "As one of the longest-serving Prime Ministers of the Kurdistan Regional Government, Nechirvan Barzani focused on institution-building, economic development, and expanding educational and media sectors.",
    image: president3,
    details: [
      {
        title: "Government Leadership",
        text: "Served as Prime Minister from 2006 to 2009, and returned as Prime Minister from 2012 to 2019.",
      },
      {
        title: "Education",
        text: "Founded the University of Kurdistan Hewlêr (UKH) to strengthen higher education.",
      },
      {
        title: "Media Development",
        text: "Supported the establishment of the Rudaw Media Network in 2008.",
      },
    ],
  },
  {
    id: "facing-challenges",
    era: "2014",
    title: "Facing Regional Challenges",
    description:
      "During the war against ISIS and a period of severe economic pressure, the Kurdistan Region faced unprecedented challenges.",
    image: president4,
    details: [
      "Coordinated with Baghdad and international coalition partners.",
      "Supported the Peshmerga forces in the fight against terrorism.",
      "Managed the humanitarian response for displaced communities.",
      "Promoted economic stability through international energy agreements.",
      "Reaffirmed the Kurdistan Region’s commitment to security and peace.",
    ],
  },
  {
    id: "the-presidency",
    era: "2019–Present",
    title: "The Presidency",
    description:
      "In 2019, Nechirvan Barzani was elected President of the Kurdistan Region, assuming responsibility for strengthening political cooperation and expanding diplomatic relations.",
    image: president5,
    details: [
      "Elected by the Kurdistan Parliament on 28 May 2019.",
      "Officially sworn in on 10 June 2019.",
      "Promotes dialogue, coexistence, and unity among political parties.",
      "Represents the Kurdistan Region internationally.",
    ],
  },
  {
    id: "achievement-diplomacy",
    era: "Achievement",
    title: "Diplomacy & International Relations",
    description:
      "Strengthened relations with regional and international partners, representing the Kurdistan Region on the global stage and encouraging foreign cooperation.",
    image: president6,
    details: [],
  },
  {
    id: "achievement-education",
    era: "Achievement",
    title: "Higher Education",
    description:
      "Founded the University of Kurdistan Hewlêr (UKH), supporting academic excellence and future generations.",
    image: president7,
    details: [],
  },
  {
    id: "achievement-economy",
    era: "Achievement",
    title: "Economic & Energy Development",
    description:
      "Led major economic initiatives and energy agreements aimed at increasing stability and long-term growth.",
    image: president8,
    details: [],
  },
  {
    id: "achievement-unity",
    era: "Achievement",
    title: "Unity & Federalism",
    description:
      "Advocated for political cohesion, constitutional rights, and the protection of the achievements secured since the 1991 Uprising.",
    image: president9,
    details: [],
  },
  {
    id: "vision",
    era: "The Future",
    title: "Vision for the Future",
    description:
      "A Stable and Prosperous Kurdistan — a future built on democratic values, peaceful coexistence, and strong institutions that improve the quality of life for all citizens.",
    image: presidencyPortrait,
    details: [
      {
        title: "Political Unity",
        text: "Strengthening cooperation and mutual understanding among Kurdish political parties.",
      },
      {
        title: "Constitutional Rights",
        text: "Protecting the Kurdistan Region’s federal status and constitutional rights within Iraq.",
      },
      {
        title: "Democratic Governance",
        text: "Promoting transparency, accountability, and shared responsibility.",
      },
      {
        title: "Regional Cooperation",
        text: "Building peaceful partnerships with neighboring countries and the international community.",
      },
      {
        title: "Closing Message",
        text: "“A strong Kurdistan is built through unity, dialogue, and shared responsibility for future generations.”",
      },
    ],
  },
];

function detailKey(detail: TimelineDetail) {
  return typeof detail === "string" ? detail : detail.title;
}

export default function PresidencyTimeline({ lang = "en", onBack }: PresidencyTimelineProps) {
  const isRtl = discoverRtlScript(lang);
  const dir = lang === "en" ? "ltr" : "rtl";
  const displayFont = discoverDisplayFont(lang);

  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const timeline = TIMELINE;

  useEffect(() => {
    const t = window.setTimeout(() => setIsVisible(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;

    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 8) {
      setActiveSection(timeline.length - 1);
      return;
    }

    const scrollPosition = container.scrollTop + container.clientHeight / 3;
    let current = 0;
    sectionRefs.current.forEach((section, index) => {
      if (section && section.offsetTop <= scrollPosition) {
        current = index;
      }
    });
    setActiveSection(current);
  };

  const scrollToSection = (index: number) => {
    const container = scrollContainerRef.current;
    const section = sectionRefs.current[index];
    if (container && section) {
      container.scrollTo({ top: section.offsetTop - 24, behavior: "smooth" });
      setActiveSection(index);
    }
  };

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className={`relative h-full min-h-0 w-full overflow-hidden bg-black ${isRtl ? "font-noto-naskh" : ""}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${presidencyPortrait})`,
          backgroundPosition: "center center",
          filter: "blur(4px)",
          transform: "scale(1.08)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      <button
        type="button"
        onClick={onBack}
        className={`system-detail-back ${detailBackButtonClassName} ${detailBackButtonSideClassName(dir)}`}
        aria-label="Back to Presidency"
      >
        <ArrowLeft size={detailBackIconSize} className={detailBackIconClassName(dir)} />
      </button>

      <div className={`absolute bottom-0 top-0 z-20 hidden md:block ${isRtl ? "right-8" : "left-8"}`}>
        <div className="relative flex h-full flex-col justify-center">
          <div className="relative flex flex-col gap-10">
            {timeline.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(index)}
                className={`group relative flex items-center gap-4 transition-all duration-300 ${
                  isRtl ? "flex-row-reverse text-right" : "text-left"
                }`}
              >
                <div className="relative z-10">
                  <div
                    className={`rounded-full transition-all duration-500 ${
                      activeSection === index
                        ? "h-3 w-3 bg-[#e6c98f] shadow-lg shadow-[#c69237]/50"
                        : "h-2 w-2 bg-white/40 group-hover:bg-white/70"
                    }`}
                  />
                </div>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    activeSection === index
                      ? "max-w-xs opacity-100"
                      : "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100"
                  }`}
                >
                  <p className="whitespace-nowrap text-sm font-light uppercase tracking-[0.2em] text-white/70">
                    {item.era}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={`relative z-10 mx-auto h-full max-w-5xl overflow-y-auto scrollbar-hide px-6 pb-20 pt-28 ${
          isRtl ? "md:pl-8 md:pr-32" : "md:pl-32 md:pr-8"
        }`}
      >
        <div className={`mb-16 ${isRtl ? "text-right" : "text-left"}`}>
          <p className="text-xs font-light uppercase tracking-[0.3em] text-[#e6c98f]">The Journey</p>
          <h1 className={`mt-2 ${displayFont} text-4xl font-light tracking-tight text-white sm:text-5xl`}>
            Nechirvan Barzani
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            President of the Kurdistan Region (2019–Present)
          </p>
        </div>

        <div className="space-y-28">
          {timeline.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              className={`transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
              style={{ transitionDelay: `${Math.min(index, 6) * 120}ms` }}
            >
              <div className="relative">
                <div className="mb-6 inline-block">
                  <div
                    className="rounded-full px-5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#e6c98f]"
                    style={{
                      background: "rgba(0,0,0,0.7)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(201,154,85,0.35)",
                    }}
                  >
                    {item.era}
                  </div>
                </div>

                <div
                  className="overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl"
                  style={{
                    background: "rgba(10,14,22,0.55)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(201,154,85,0.18)",
                  }}
                >
                  <div className="grid md:grid-cols-2">
                    <div
                      className={`relative h-64 overflow-hidden md:h-auto ${
                        index % 2 === 0 ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-110"
                      />
                      <div
                        className="absolute inset-0 md:hidden"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)",
                        }}
                      />
                    </div>

                    <div
                      className={`p-6 md:p-8 ${index % 2 === 0 ? "md:order-2" : "md:order-1"} ${
                        isRtl ? "text-right" : "text-left"
                      }`}
                    >
                      <h2
                        className={`mb-3 ${displayFont} text-2xl font-light tracking-tight text-white md:text-3xl`}
                      >
                        {item.title}
                      </h2>
                      <p
                        className={`${item.details.length > 0 ? "mb-6" : ""} text-sm leading-relaxed text-white/80 md:text-base`}
                      >
                        {item.description}
                      </p>
                      {item.details.length > 0 && (
                        <div className="space-y-4">
                          {item.details.map((detail) => (
                            <div
                              key={detailKey(detail)}
                              className={`flex items-start gap-2 ${isRtl ? "flex-row-reverse" : ""}`}
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c69237]" />
                              {typeof detail === "string" ? (
                                <span className="text-xs text-white/65 md:text-sm">{detail}</span>
                              ) : (
                                <div>
                                  <p className="text-xs font-medium text-white/90 md:text-sm">
                                    {detail.title}
                                  </p>
                                  <p className="mt-1 text-xs leading-relaxed text-white/65 md:text-sm">
                                    {detail.text}
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 pb-10 text-center">
          <div
            className="inline-block max-w-2xl rounded-2xl px-8 py-6"
            style={{
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(201,154,85,0.25)",
            }}
          >
            <p className={`${displayFont} text-base italic leading-relaxed text-[#e6c98f]/90 md:text-lg`}>
              “A strong Kurdistan is built through unity, dialogue, and shared responsibility for
              future generations.”
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
