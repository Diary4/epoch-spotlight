import React from "react";
import { AnimatePresence, motion } from "motion/react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import BcfImageCard from "@/components/Sections/bcf/BcfImageCard";
import {
  bcfCopy,
  type BcfLang,
  type TrustTopicId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF, BCF_GLASS_CARD } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfDrawX,
  bcfRise,
  bcfRiseCard,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
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

  const goBack = () => {
    if (activeId) {
      setActiveId(null);
      setCredentialIndex(0);
      return;
    }
    onBack();
  };

  /**
   * The hub and its four topics are separate scenes, so they get their own
   * `AnimatePresence` — keying `BcfShell` per topic means opening Leadership
   * dissolves exactly the way entering the chapter did. Previously each branch
   * re-rendered the same shell in place and the backdrop cut hard.
   */
  const scene = (() => {
    if (activeId === "leadership") {
      return (
        <BcfShell
          key="leadership"
          showLogo={false}
          backgroundImage={topicBgs.leadership}
          overlayClassName="bg-black/70"
        >
          <TrustChrome title={c.trustLeadershipTitle} backLabel={c.back} onBack={goBack}>
            <motion.div
              className="mx-auto mt-16 grid w-full max-w-[980px] grid-cols-2 gap-8"
              variants={bcfStagger(0.09, 0.26)}
              initial="initial"
              animate="animate"
            >
              {c.trustFounders.map((founder, index) => (
                <motion.div
                  key={`${founder.title}-${index}`}
                  variants={bcfRiseCard}
                  className={`${BCF_GLASS_CARD} relative flex min-h-[360px] flex-col items-start gap-6 p-10`}
                  style={{ boxShadow: "0 22px 60px rgba(0,0,0,0.45)" }}
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
                </motion.div>
              ))}
            </motion.div>
          </TrustChrome>
        </BcfShell>
      );
    }

    if (activeId === "quality") {
      const activeCredential = c.trustCredentials[credentialIndex] ?? c.trustCredentials[0];

      return (
        <BcfShell
          key="quality"
          showLogo={false}
          backgroundImage={topicBgs.quality}
          overlayClassName="bg-black/75"
        >
          <TrustChrome title={c.trustQualityTitle} backLabel={c.back} onBack={goBack}>
            <motion.div
              className="mx-auto mt-14 flex w-full max-w-[1040px] gap-8"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex w-[340px] shrink-0 flex-col gap-4">
                {c.trustCredentials.map((item, index) => {
                  const selected = index === credentialIndex;
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      onClick={() => setCredentialIndex(index)}
                      whileTap={BCF_TAP}
                      transition={BCF_TAP_TRANSITION}
                      className="relative transform-gpu overflow-hidden rounded-2xl px-6 py-5 text-start text-[26px] font-medium leading-snug will-change-transform"
                      style={{
                        border: "1px solid",
                        borderColor: selected ? BCF.gold : "transparent",
                        backgroundColor: selected
                          ? "rgba(0,0,0,0.55)"
                          : "rgba(0,0,0,0.3)",
                        color: selected ? BCF.creamSoft : "rgba(255,255,255,0.7)",
                        boxShadow: selected ? `0 0 30px ${BCF.gold}2e` : "none",
                        transition:
                          "border-color 300ms cubic-bezier(0.22,1,0.36,1), background-color 300ms cubic-bezier(0.22,1,0.36,1), color 300ms, box-shadow 300ms",
                      }}
                    >
                      {/* Selected marker rides between rows instead of blinking
                          on and off in place. */}
                      {selected ? (
                        <motion.span
                          layoutId="bcf-credential-marker"
                          className="absolute inset-y-3 start-0 w-[3px] rounded-full"
                          style={{ backgroundColor: BCF.goldBright }}
                          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                        />
                      ) : null}
                      {item.title}
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-8">
                <div className={`${BCF_GLASS_CARD} overflow-hidden p-5`}>
                  <img
                    src={certificateImg}
                    alt=""
                    className="h-[720px] w-full rounded-xl object-cover"
                  />
                </div>
                {/* The body text belongs to the selected credential, so it
                    cross-fades with the selection rather than snapping. */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeCredential.id}
                    className="text-[28px] leading-relaxed text-white/85"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {activeCredential.body}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          </TrustChrome>
        </BcfShell>
      );
    }

    if (activeId === "partnerships") {
      return (
        <BcfShell
          key="partnerships"
          showLogo={false}
          backgroundImage={topicBgs.partnerships}
          overlayClassName="bg-black/80"
        >
          <TrustChrome title={c.trustPartnershipsTitle} backLabel={c.back} onBack={goBack}>
            <motion.p
              className="mx-auto mt-8 max-w-[720px] text-center text-[28px] text-white/75"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {c.trustPartnershipsHint}
            </motion.p>
            <motion.div
              className="mx-auto mt-14 grid w-full max-w-[920px] grid-cols-3 gap-x-10 gap-y-12"
              variants={bcfStagger(0.07, 0.3)}
              initial="initial"
              animate="animate"
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={`partner-${index}`}
                  variants={bcfRiseCard}
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
                </motion.div>
              ))}
            </motion.div>
          </TrustChrome>
        </BcfShell>
      );
    }

    if (activeId === "recognition") {
      return (
        <BcfShell
          key="recognition"
          showLogo={false}
          backgroundImage={topicBgs.recognition}
          overlayClassName="bg-black/70"
        >
          <TrustChrome title={c.trustRecognitionTitle} backLabel={c.back} onBack={goBack}>
            <motion.div
              className={`${BCF_GLASS_CARD} mx-auto mt-20 max-w-[900px] p-14 text-center`}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}
            >
              <p className="text-[34px] leading-relaxed text-[#fdeed4]">
                {c.trustRecognitionBody}
              </p>
            </motion.div>
          </TrustChrome>
        </BcfShell>
      );
    }

    return (
      <BcfShell
        key="hub"
        showLogo={false}
        backgroundImage={trustBg}
        overlayClassName="bg-black/75"
      >
        <div className="relative flex min-h-[1920px] flex-col px-12 pb-16 pt-28">
          <BcfBackButton onClick={goBack} label={c.back} />

          <motion.div
            className="mx-auto flex w-full max-w-[980px] flex-col items-center"
            variants={bcfStagger(0.1, 0.16)}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              variants={bcfRise}
              className="text-center text-[72px] font-bold leading-none"
            >
              <span style={{ color: BCF.gold }}>{c.trustTitleGold}</span>{" "}
              <span className="text-[#fbf4e4]">{c.trustTitleRest}</span>
            </motion.h1>
            <motion.div
              variants={bcfDrawX}
              className="mt-8 flex w-full max-w-[420px] items-center gap-3"
            >
              <span className="h-px flex-1" style={{ backgroundColor: `${BCF.gold}aa` }} />
              <span className="h-3 w-3 rotate-45" style={{ backgroundColor: BCF.gold }} />
              <span className="h-px flex-1" style={{ backgroundColor: `${BCF.gold}aa` }} />
            </motion.div>
          </motion.div>

          <motion.div
            className="mx-auto mt-16 flex w-full max-w-[980px] flex-col gap-8"
            variants={bcfStagger(0.1, 0.3)}
            initial="initial"
            animate="animate"
          >
            {c.trustTopics.map((topic) => (
              <motion.div key={topic.id} variants={bcfRiseCard}>
                <BcfImageCard
                  title={topic.title}
                  image={topicThumbs[topic.id]}
                  onClick={() => setActiveId(topic.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </BcfShell>
    );
  })();

  return (
    <AnimatePresence mode="wait" initial={false}>
      {scene}
    </AnimatePresence>
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
      <BcfBackButton onClick={onBack} label={backLabel} />
      <motion.h1
        className="mx-auto max-w-[980px] text-center text-[64px] font-bold leading-tight"
        style={{ color: BCF.gold }}
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.68, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h1>
      <motion.span
        className="mx-auto mt-7 block h-px w-[320px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${BCF.gold}, transparent)`,
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      {children}
    </div>
  );
}
