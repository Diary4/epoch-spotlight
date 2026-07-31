import React from "react";
import { ChevronLeft } from "lucide-react";
import gsap from "gsap";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import BcfImageCard from "@/components/Sections/bcf/BcfImageCard";
import {
  bcfCopy,
  type BcfLang,
  type TrustTopicId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF, BCF_GLASS_CARD } from "@/components/Sections/bcf/bcfTheme";
import leadershipThumb from "@/assets/images/religions/coexistence/masoud-barzani.webp";
import qualityThumb from "@/assets/images/PrimeMinistir/agreement.webp";
import partnershipsThumb from "@/assets/images/PrimeMinistir/economic.webp";
import recognitionThumb from "@/assets/images/religions/coexistence/mustafa-barzani.webp";
import trustBg from "@/assets/images/PrimeMinistir/p-1.webp";
import leadershipBg from "@/assets/images/PrimeMinistir/agreement.webp";
import qualityBg from "@/assets/images/PrimeMinistir/service.webp";
import partnershipsBg from "@/assets/images/religions/main.webp";
import recognitionBg from "@/assets/images/religions/coexistence/coexistence.webp";
import founderA from "@/assets/images/religions/coexistence/mustafa-barzani.webp";
import founderB from "@/assets/images/religions/coexistence/ahmed-barzani.webp";
import founderC from "@/assets/images/religions/coexistence/masoud-barzani.webp";
import founderD from "@/assets/images/religions/coexistence/abdulsalam-barzani.webp";
import certificateImg from "@/assets/images/PrimeMinistir/agreement.webp";

type BcfTrustProps = {
  lang: BcfLang;
  onBack: () => void;
};

const topicThumbs: Record<TrustTopicId, string> = {
  leadership: leadershipThumb,
  quality: qualityThumb,
  partnerships: partnershipsThumb,
  recognition: recognitionThumb,
};

const topicBgs: Record<TrustTopicId, string> = {
  leadership: leadershipBg,
  quality: qualityBg,
  partnerships: partnershipsBg,
  recognition: recognitionBg,
};

const founderAvatars = [founderA, founderB, founderC, founderD];

/**
 * Trust Behind the Work — Figma frames:
 * hub list → Leadership / Quality / Partnerships / Recognition details.
 */
export default function BcfTrust({ lang, onBack }: BcfTrustProps) {
  const c = bcfCopy[lang];
  const [activeId, setActiveId] = React.useState<TrustTopicId | null>(null);
  const [credentialIndex, setCredentialIndex] = React.useState(0);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    if (activeId) return;
    const el = listRef.current;
    if (!el) return;
    const rows = el.querySelectorAll<HTMLElement>("[data-trust-row]");
    gsap.set(rows, { opacity: 0, y: 28 });

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(rows, { opacity: 1, y: 0 });
        return;
      }
      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.12,
      });
    }, el);

    return () => ctx.revert();
  }, [lang, activeId]);

  const goBack = () => {
    if (activeId) {
      setActiveId(null);
      setCredentialIndex(0);
      return;
    }
    onBack();
  };

  if (activeId === "leadership") {
    return (
      <BcfShell backgroundImage={topicBgs.leadership} overlayClassName="bg-black/65">
        <TrustChrome title={c.trustLeadershipTitle} backLabel={c.back} onBack={goBack}>
          <div className="mx-auto mt-16 grid w-full max-w-[980px] grid-cols-2 gap-8">
            {c.trustFounders.map((founder, index) => (
              <div
                key={`${founder.title}-${index}`}
                className={`${BCF_GLASS_CARD} relative flex min-h-[360px] flex-col items-start gap-6 p-10`}
              >
                <span
                  className="h-[96px] w-[96px] overflow-hidden rounded-full border-2"
                  style={{ borderColor: BCF.gold }}
                >
                  <img
                    src={founderAvatars[index % founderAvatars.length]}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </span>
                <div>
                  <h3 className="text-[40px] font-semibold leading-tight text-[#fdeed4]">
                    {founder.title}
                  </h3>
                  <p className="mt-4 text-[26px] leading-relaxed text-white/75">
                    {founder.subtitle}
                  </p>
                </div>
                <span
                  className="mt-auto self-end text-[42px] font-bold tabular-nums"
                  style={{ color: BCF.gold }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </TrustChrome>
      </BcfShell>
    );
  }

  if (activeId === "quality") {
    const activeCredential = c.trustCredentials[credentialIndex] ?? c.trustCredentials[0];

    return (
      <BcfShell backgroundImage={topicBgs.quality} overlayClassName="bg-black/70">
        <TrustChrome title={c.trustQualityTitle} backLabel={c.back} onBack={goBack}>
          <div className="mx-auto mt-14 flex w-full max-w-[1040px] gap-8">
            <div className="flex w-[340px] shrink-0 flex-col gap-4">
              {c.trustCredentials.map((item, index) => {
                const selected = index === credentialIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCredentialIndex(index)}
                    className={`rounded-2xl px-6 py-5 text-left text-[26px] font-medium leading-snug transition ${
                      selected
                        ? "border bg-black/55 text-[#fdeed4]"
                        : "border border-transparent bg-black/30 text-white/70"
                    }`}
                    style={{
                      borderColor: selected ? BCF.gold : "transparent",
                    }}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-8">
              <div
                className={`${BCF_GLASS_CARD} overflow-hidden p-5`}
              >
                <img
                  src={certificateImg}
                  alt=""
                  className="h-[720px] w-full rounded-xl object-cover"
                />
              </div>
              <p className="text-[28px] leading-relaxed text-white/85">
                {activeCredential.body}
              </p>
            </div>
          </div>
        </TrustChrome>
      </BcfShell>
    );
  }

  if (activeId === "partnerships") {
    return (
      <BcfShell backgroundImage={topicBgs.partnerships} overlayClassName="bg-black/75">
        <TrustChrome title={c.trustPartnershipsTitle} backLabel={c.back} onBack={goBack}>
          <p className="mx-auto mt-8 max-w-[720px] text-center text-[28px] text-white/75">
            {c.trustPartnershipsHint}
          </p>
          <div className="mx-auto mt-14 grid w-full max-w-[920px] grid-cols-3 gap-x-10 gap-y-12">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`partner-${index}`}
                className="relative mx-auto flex h-[280px] w-[250px] flex-col items-center justify-center rounded-[28px] rounded-t-[120px] border border-[#f5d7a0]/35"
                style={{
                  background:
                    "linear-gradient(165deg, #e2b66a 0%, #b07a2e 42%, #6d4214 100%)",
                  boxShadow:
                    "0 18px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.28)",
                }}
              >
                <span className="text-[36px] font-semibold tracking-wide text-[#2a1808]/65">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </TrustChrome>
      </BcfShell>
    );
  }

  if (activeId === "recognition") {
    return (
      <BcfShell backgroundImage={topicBgs.recognition} overlayClassName="bg-black/65">
        <TrustChrome title={c.trustRecognitionTitle} backLabel={c.back} onBack={goBack}>
          <div className={`${BCF_GLASS_CARD} mx-auto mt-20 max-w-[900px] p-14 text-center`}>
            <p className="text-[34px] leading-relaxed text-[#fdeed4]">
              {c.trustRecognitionBody}
            </p>
          </div>
        </TrustChrome>
      </BcfShell>
    );
  }

  return (
    <BcfShell backgroundImage={trustBg} overlayClassName="bg-black/70">
      <div className="relative flex min-h-[1920px] flex-col px-12 pb-16 pt-28">
        <button
          type="button"
          onClick={goBack}
          className="absolute right-10 top-10 z-20 grid h-14 w-14 place-items-center rounded-full bg-black/40 backdrop-blur-sm"
          aria-label={c.back}
        >
          <ChevronLeft className="h-7 w-7 text-white" />
        </button>

        <div className="mx-auto flex w-full max-w-[980px] flex-col items-center">
          <h1 className="text-center text-[72px] font-bold leading-none">
            <span style={{ color: BCF.gold }}>{c.trustTitleGold}</span>{" "}
            <span className="text-[#fbf4e4]">{c.trustTitleRest}</span>
          </h1>
          <div className="mt-8 flex w-full max-w-[420px] items-center gap-3">
            <span className="h-px flex-1" style={{ backgroundColor: `${BCF.gold}aa` }} />
            <span
              className="h-3 w-3 rotate-45"
              style={{ backgroundColor: BCF.gold }}
            />
            <span className="h-px flex-1" style={{ backgroundColor: `${BCF.gold}aa` }} />
          </div>
        </div>

        <div ref={listRef} className="mx-auto mt-16 flex w-full max-w-[980px] flex-col gap-8">
          {c.trustTopics.map((topic) => (
            <div key={topic.id} data-trust-row className="opacity-0">
              <BcfImageCard
                title={topic.title}
                image={topicThumbs[topic.id]}
                onClick={() => setActiveId(topic.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </BcfShell>
  );
}

function TrustChrome({
  title,
  backLabel,
  onBack,
  children,
}: {
  title: string;
  backLabel: string;
  onBack: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-[1920px] flex-col px-12 pb-16 pt-28">
      <button
        type="button"
        onClick={onBack}
        className="absolute right-10 top-10 z-20 grid h-14 w-14 place-items-center rounded-full bg-black/40 backdrop-blur-sm"
        aria-label={backLabel}
      >
        <ChevronLeft className="h-7 w-7 text-white" />
      </button>
      <h1
        className="mx-auto max-w-[980px] text-center text-[64px] font-bold leading-tight"
        style={{ color: BCF.gold }}
      >
        {title}
      </h1>
      {children}
    </div>
  );
}
