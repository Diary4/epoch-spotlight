import React from "react";
import { ChevronLeft } from "lucide-react";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import BcfImageCard from "@/components/Sections/bcf/BcfImageCard";
import {
  bcfCopy,
  type BcfLang,
  type FutureTopicId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF, BCF_GLASS_CARD } from "@/components/Sections/bcf/bcfTheme";
import { bcfFutureDetailBg } from "@/components/Sections/bcf/bcfAssets";
import topicA from "@/assets/images/religions/coexistence/masoud-barzani.jpeg";
import topicB from "@/assets/images/PrimeMinistir/agreement.webp";
import topicC from "@/assets/images/PrimeMinistir/economic.webp";
import topicD from "@/assets/images/religions/coexistence/mustafa-barzani.jpeg";

const topicImages: Record<FutureTopicId, string> = {
  leadership: topicA,
  quality: topicB,
  partnerships: topicC,
  recognition: topicD,
};

type BcfFutureDetailProps = {
  lang: BcfLang;
  onBack: () => void;
};

export default function BcfFutureDetail({ lang, onBack }: BcfFutureDetailProps) {
  const c = bcfCopy[lang];
  const [activeId, setActiveId] = React.useState<FutureTopicId | null>(null);
  const active = c.futureTopics.find((t) => t.id === activeId) ?? null;

  return (
    <BcfShell backgroundImage={bcfFutureDetailBg} overlayClassName="bg-black/60">
      <div
        className="relative flex min-h-[1920px] flex-col px-14 pb-20 pt-28"
        style={{
          background:
            "radial-gradient(900px 700px at -10% -5%, rgba(32,44,94,0.4), transparent 60%), transparent",
        }}
      >
        <button
          type="button"
          onClick={() => (active ? setActiveId(null) : onBack())}
          className="absolute right-10 top-10 z-20 grid h-14 w-14 place-items-center rounded-full bg-black/40 backdrop-blur-sm"
          aria-label={c.back}
        >
          <ChevronLeft className="h-7 w-7 text-white" />
        </button>

        <div className="mx-auto flex w-full max-w-[1080px] flex-col items-center gap-8">
          <h1 className="text-center text-[80px] font-bold leading-none">
            <span style={{ color: BCF.goldBright }}>{c.futureHeadingWhite}</span>{" "}
            <span className="text-[#fbf4e4]">{c.futureHeadingGold}</span>
            {c.futureHeadingRest ? (
              <>
                {" "}
                <span className="text-[#fbf4e4]">{c.futureHeadingRest}</span>
              </>
            ) : null}
          </h1>
          <div className="flex w-full max-w-[520px] items-center gap-3">
            <span className="h-px flex-1" style={{ backgroundColor: `${BCF.gold}88` }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: BCF.gold }} />
            <span className="h-px flex-1" style={{ backgroundColor: `${BCF.gold}88` }} />
          </div>
        </div>

        {active ? (
          <div className={`${BCF_GLASS_CARD} mx-auto mt-14 w-full max-w-[1080px] overflow-hidden`}>
            <img
              src={topicImages[active.id]}
              alt=""
              className="h-[520px] w-full object-cover"
            />
            <div className="p-10">
              <h2 className="text-[44px] font-semibold text-[#fdeed4]">{active.title}</h2>
              <p className="mt-5 text-[28px] leading-relaxed text-white/80">{active.body}</p>
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-14 flex w-full max-w-[1080px] flex-col gap-[42px]">
            {c.futureTopics.map((topic) => (
              <BcfImageCard
                key={topic.id}
                title={topic.title}
                image={topicImages[topic.id]}
                onClick={() => setActiveId(topic.id)}
              />
            ))}
          </div>
        )}
      </div>
    </BcfShell>
  );
}
