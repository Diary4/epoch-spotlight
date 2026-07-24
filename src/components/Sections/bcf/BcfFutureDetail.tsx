import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BcfShell from "@/components/Sections/bcf/BcfShell";
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
      <div className="relative flex min-h-[1920px] flex-col px-14 pb-20 pt-40">
        <button
          type="button"
          onClick={() => (active ? setActiveId(null) : onBack())}
          className="mb-10 flex w-fit items-center gap-2 text-[24px] text-white/70"
        >
          <ChevronLeft className="h-7 w-7" />
          {c.back}
        </button>

        <h1 className="text-[64px] font-semibold leading-tight">
          <span className="text-white">{c.futureHeadingWhite} </span>
          <span style={{ color: BCF.gold }}>{c.futureHeadingGold}</span>
          {c.futureHeadingRest ? (
            <>
              {" "}
              <span className="text-white">{c.futureHeadingRest}</span>
            </>
          ) : null}
        </h1>

        {active ? (
          <div className={`${BCF_GLASS_CARD} mt-14 overflow-hidden`}>
            <img
              src={topicImages[active.id]}
              alt=""
              className="h-[520px] w-full object-cover"
            />
            <div className="p-10">
              <h2 className="text-[44px] font-semibold text-white">{active.title}</h2>
              <p className="mt-5 text-[28px] leading-relaxed text-white/80">{active.body}</p>
            </div>
          </div>
        ) : (
          <div className="mt-14 flex flex-col gap-6">
            {c.futureTopics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => setActiveId(topic.id)}
                className={`${BCF_GLASS_CARD} flex items-center gap-6 overflow-hidden p-4 text-left transition active:scale-[0.99]`}
              >
                <div className="min-w-0 flex-1 px-4">
                  <h2 className="text-[32px] font-semibold text-white">{topic.title}</h2>
                </div>
                <img
                  src={topicImages[topic.id]}
                  alt=""
                  className="h-28 w-40 shrink-0 rounded-xl object-cover"
                />
                <ChevronRight className="mr-3 h-8 w-8 shrink-0 text-[#e8c56a]" />
              </button>
            ))}
          </div>
        )}
      </div>
    </BcfShell>
  );
}
