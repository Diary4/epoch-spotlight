import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import BcfImageCard from "@/components/Sections/bcf/BcfImageCard";
import BcfBoardChief, {
  type BoardChiefView,
} from "@/components/Sections/bcf/BcfBoardChief";
import {
  bcfCopy,
  type BcfLang,
  type RecognitionItem,
  type RecognitionItemId,
  type TrustTopicId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF, BCF_GLASS_CARD } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfBloom,
  bcfDrawX,
  bcfRise,
  bcfRiseCard,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
import qualityThumb from "@/assets/images/bcf/selected/impact-schools.webp";
import partnershipsThumb from "@/assets/images/bcf/selected/humanity-relief.webp";
import qualityBg from "@/assets/images/bcf/selected/impact-schools.webp";
import partnershipsBg from "@/assets/images/bcf/optimized/camps/debaga.webp";
import leadershipThumb from "@/assets/images/bcf/selected/humanity-community.webp";
import leadershipBg from "@/assets/images/bcf/selected/humanity-community.webp";
import recognitionThumb from "@/assets/images/bcf/selected/impact-employees.webp";
import recognitionBg from "@/assets/images/bcf/optimized/camps/kawrgosk.webp";
import trustBg from "@/assets/images/bcf/optimized/camps/harsham.webp";
import founderA from "@/assets/images/bcf/optimized/administration/8C6A0612.webp";
import founderB from "@/assets/images/bcf/optimized/administration/8C6A0443.webp";
import founderC from "@/assets/images/bcf/optimized/administration/405A9925.webp";
import founderD from "@/assets/images/bcf/optimized/administration/8C6A7443.webp";
import certificateImg from "@/assets/images/bcf/selected/impact-schools.webp";
import awardsNode from "@/assets/images/bcf/optimized/schools/8D1A7008.webp";
import certificationsNode from "@/assets/images/bcf/optimized/schools/IMG_6698.webp";
import parliamentNode from "@/assets/images/bcf/optimized/children-activity/DSC_1567.webp";
import lettersNode from "@/assets/images/bcf/optimized/flood/2B1A6924.webp";
import timelineNode from "@/assets/images/bcf/optimized/children-activity/8C6A6112.webp";
/** Square crop of the chief, for the portrait card on the Leadership grid. */
import chiefPortrait from "@/assets/images/bcf/thumbs/board-chief/8C6A0295.webp";

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
  /** Null while the Leadership grid is up; the profile and its timeline sit under it. */
  const [chiefView, setChiefView] = React.useState<BoardChiefView | null>(null);

  const goBack = () => {
    if (chiefView === "timeline") {
      setChiefView("profile");
      return;
    }
    if (chiefView) {
      setChiefView(null);
      return;
    }
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
    if (chiefView) {
      return (
        <BcfBoardChief
          key={`chief-${chiefView}`}
          lang={lang}
          view={chiefView}
          onOpenTimeline={() => setChiefView("timeline")}
          onBack={goBack}
        />
      );
    }

    if (activeId === "leadership") {
      return (
        <BcfShell
          key="leadership"
          showLogo={false}
          backgroundImage={topicBgs.leadership}
          overlayClassName="bg-black/70"
        >
          <TrustChrome title={c.trustLeadershipTitle} backLabel={c.back} onBack={goBack}>
            {/* The four cards below name the layers of the foundation but nobody
                stands in them. This is the one person the chapter opens into. */}
            <ChiefCard
              name={c.boardChief.name}
              role={c.boardChief.role}
              open={c.boardChief.open}
              onClick={() => setChiefView("profile")}
            />

            <motion.div
              className="mx-auto mt-10 grid w-full max-w-[980px] grid-cols-2 gap-8"
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
            {/* The six credentials used to sit in a 340px rail beside the
                photograph, which left the certificate a narrow slot on a 1080
                artboard. As a wrapping row above it, the image gets the full
                width and the labels get kiosk-sized touch targets. */}
            <motion.div
              className="mt-12 flex flex-1 flex-col"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-wrap justify-center gap-4">
                {c.trustCredentials.map((item, index) => {
                  const selected = index === credentialIndex;
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      onClick={() => setCredentialIndex(index)}
                      whileTap={BCF_TAP}
                      transition={BCF_TAP_TRANSITION}
                      className="relative transform-gpu overflow-hidden rounded-full px-9 py-6 text-[29px] font-medium leading-none"
                      style={{
                        border: "1px solid",
                        borderColor: selected ? BCF.gold : "rgba(255,255,255,0.14)",
                        backgroundColor: selected
                          ? "rgba(0,0,0,0.6)"
                          : "rgba(0,0,0,0.34)",
                        color: selected ? BCF.creamSoft : "rgba(255,255,255,0.7)",
                        boxShadow: selected ? `0 0 34px ${BCF.gold}33` : "none",
                        transition:
                          "border-color 300ms cubic-bezier(0.22,1,0.36,1), background-color 300ms cubic-bezier(0.22,1,0.36,1), color 300ms, box-shadow 300ms",
                      }}
                    >
                      {/* Selected marker rides between chips instead of
                          blinking on and off in place. */}
                      {selected ? (
                        <motion.span
                          layoutId="bcf-credential-marker"
                          className="absolute inset-x-9 bottom-[10px] h-[3px] rounded-full"
                          style={{ backgroundColor: BCF.goldBright }}
                          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                        />
                      ) : null}
                      {item.title}
                    </motion.button>
                  );
                })}
              </div>

              {/* The certificate takes whatever height is left, so the pane
                  fills the panel in every language instead of ending in a
                  band of dead space. */}
              <div
                className={`${BCF_GLASS_CARD} mt-12 min-h-0 flex-1 overflow-hidden p-6`}
              >
                <img
                  src={certificateImg}
                  alt=""
                  className="h-full w-full rounded-2xl object-cover"
                />
              </div>

              {/* The body text belongs to the selected credential, so it
                  cross-fades with the selection rather than snapping. */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeCredential.id}
                  className="mt-10 min-h-[160px] text-center text-[33px] leading-relaxed text-white/85"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {activeCredential.body}
                </motion.p>
              </AnimatePresence>
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
            <motion.p
              className={`mx-auto mt-10 max-w-[820px] text-center text-[30px] text-[#fdeed4] ${
                lang === "en" ? "leading-relaxed" : "leading-[1.75]"
              }`}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {c.trustRecognitionBody}
            </motion.p>
            <RecognitionArc
              items={c.trustRecognitionItems}
              hint={c.tapToExplore}
              closeLabel={c.close}
              rtl={lang !== "en"}
            />
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

const recognitionNodes: Record<RecognitionItemId, string> = {
  awards: awardsNode,
  certifications: certificationsNode,
  parliament: parliamentNode,
  letters: lettersNode,
  timeline: timelineNode,
};

/** Stage the constellation is drawn in. Nodes zigzag down a single thread. */
const ARC_W = 1000;
const ARC_H = 1240;
const NODE_R = 95;
/** x is the LTR centre; the whole stage mirrors for Kurdish and Arabic. */
const ARC_NODES: { x: number; y: number }[] = [
  { x: 250, y: 150 },
  { x: 420, y: 385 },
  { x: 250, y: 620 },
  { x: 420, y: 855 },
  { x: 250, y: 1090 },
];

/** Smooth S-curve through the node centres — control points sit half a step out. */
function arcPath(mirror: boolean) {
  const at = (i: number) => {
    const n = ARC_NODES[i];
    return { x: mirror ? ARC_W - n.x : n.x, y: n.y };
  };
  let d = `M${at(0).x} ${at(0).y}`;
  for (let i = 1; i < ARC_NODES.length; i += 1) {
    const a = at(i - 1);
    const b = at(i);
    const half = (b.y - a.y) / 2;
    d += ` C${a.x} ${a.y + half} ${b.x} ${b.y - half} ${b.x} ${b.y}`;
  }
  return d;
}

/**
 * Recognition — the five proofs read as one descending thread rather than a
 * paragraph. Tapping a node opens the awards behind that heading, so the page
 * carries the roadmap's detail without printing a list nobody reads standing up.
 */
function RecognitionArc({
  items,
  hint,
  closeLabel,
  rtl,
}: {
  items: RecognitionItem[];
  hint: string;
  closeLabel: string;
  rtl: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = React.useState<RecognitionItemId | null>(null);
  const thread = React.useMemo(() => arcPath(rtl), [rtl]);
  const active = items.find((item) => item.id === activeId) ?? null;

  return (
    <div className="mx-auto mt-10 w-full max-w-[1000px]">
      <motion.p
        className={`text-center text-[24px] text-white/45 ${rtl ? "" : "tracking-[0.16em]"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {hint}
      </motion.p>

      <div
        className="relative mx-auto mt-6"
        style={{ width: ARC_W, height: ARC_H }}
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${ARC_W} ${ARC_H}`}
          fill="none"
          aria-hidden="true"
        >
          {/* Two wide guide arcs give the thread something to belong to. */}
          {[700, 890].map((r, i) => (
            <motion.circle
              key={r}
              cx={rtl ? ARC_W + 120 : -120}
              cy={ARC_H / 2}
              r={r}
              stroke="rgba(255,255,255,0.09)"
              strokeWidth={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.3 + i * 0.12 }}
            />
          ))}

          <motion.path
            d={thread}
            stroke="rgba(255,255,255,0.16)"
            strokeWidth={1.4}
            initial={reduceMotion ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 1,
              transition: { duration: 1.5, delay: 0.34, ease: BCF_EASE },
            }}
          />
          {/* A slow travelling glint, so the thread reads as live wiring. */}
          {!reduceMotion ? (
            <motion.path
              d={thread}
              stroke={BCF.gold}
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="70 1200"
              opacity={0.75}
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -1270 }}
              transition={{
                duration: 7.5,
                repeat: Infinity,
                ease: "linear",
                delay: 1.4,
              }}
            />
          ) : null}
        </svg>

        {items.map((item, index) => {
          const node = ARC_NODES[index] ?? ARC_NODES[ARC_NODES.length - 1];
          const cx = rtl ? ARC_W - node.x : node.x;
          const isActive = activeId === item.id;
          const labelGap = NODE_R + 28;
          /** Labels sit on the open side of the thread and fill toward the node. */
          const labelStyle: React.CSSProperties = rtl
            ? {
                left: 12,
                right: ARC_W - cx + labelGap,
                top: node.y,
                transform: "translateY(-50%)",
              }
            : {
                left: cx + labelGap,
                right: 12,
                top: node.y,
                transform: "translateY(-50%)",
              };

          return (
            <React.Fragment key={item.id}>
              {/* Node — a plain wrapper carries the centring translate, because
                  motion owns `transform` on the button itself. */}
              <div
                className="absolute z-20"
                style={{
                  left: cx - NODE_R,
                  top: node.y - NODE_R,
                  width: NODE_R * 2,
                  height: NODE_R * 2,
                }}
              >
                <motion.button
                  type="button"
                  onClick={() => setActiveId(isActive ? null : item.id)}
                  aria-label={item.title}
                  aria-expanded={isActive}
                  variants={bcfBloom}
                  initial="initial"
                  animate="animate"
                  whileTap={BCF_TAP}
                  transition={{ ...BCF_TAP_TRANSITION, delay: 0.4 + index * 0.11 }}
                  className="relative block h-full w-full transform-gpu overflow-hidden rounded-full"
                  style={{
                    border: `2px solid ${isActive ? BCF.goldBright : `${BCF.gold}88`}`,
                    boxShadow: isActive
                      ? `0 0 46px ${BCF.gold}77`
                      : "0 16px 40px rgba(0,0,0,0.5)",
                    transition: "border-color 400ms ease, box-shadow 400ms ease",
                  }}
                >
                  <img
                    src={recognitionNodes[item.id]}
                    alt=""
                    decoding="async"
                    className="h-full w-full transform-gpu object-cover transition-transform duration-700 ease-smooth-out motion-reduce:transition-none"
                    style={{ transform: isActive ? "scale(1.08)" : "scale(1)" }}
                  />
                  <span
                    className="absolute inset-0"
                    style={{
                      background: isActive
                        ? "radial-gradient(circle at 50% 40%, rgba(4,7,10,0.05), rgba(4,7,10,0.45) 92%)"
                        : "radial-gradient(circle at 50% 40%, rgba(4,7,10,0.2), rgba(4,7,10,0.62) 92%)",
                      transition: "background 400ms ease",
                    }}
                  />
                </motion.button>
              </div>

              {/* Label pill, anchored to its node. The detail opens as a card
                  over the constellation — grown in place it ran into the next
                  node down, and the text was unreadable behind it. */}
              <motion.div
                className={`absolute z-10 flex ${rtl ? "justify-end" : "justify-start"}`}
                style={labelStyle}
                initial={{ opacity: 0, x: rtl ? 26 : -26 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.66,
                  delay: 0.52 + index * 0.11,
                  ease: BCF_EASE,
                }}
              >
                <div
                  className="max-w-full rounded-[38px] px-9 py-5 backdrop-blur-md"
                  style={{
                    border: `1px solid ${isActive ? `${BCF.gold}99` : "rgba(255,255,255,0.16)"}`,
                    backgroundColor: isActive
                      ? "rgba(0,0,0,0.62)"
                      : "rgba(0,0,0,0.42)",
                    transition:
                      "border-color 340ms ease, background-color 340ms ease",
                  }}
                >
                  <p
                    className={`text-[30px] leading-tight text-[#fbf4e4] ${
                      rtl ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
              </motion.div>
            </React.Fragment>
          );
        })}

        {/* Detail card. It dims the constellation behind it so the awards are
            read against a settled backdrop, and any tap closes it. */}
        <AnimatePresence>
          {active ? (
            <motion.div
              className="absolute inset-0 z-40 flex items-center justify-center px-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              onClick={() => setActiveId(null)}
            >
              <div
                className="absolute inset-0 backdrop-blur-[3px]"
                style={{ backgroundColor: "rgba(4,6,9,0.72)" }}
              />

              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={active.title}
                onClick={(event) => event.stopPropagation()}
                className={`${BCF_GLASS_CARD} relative w-full max-w-[820px] overflow-hidden`}
                initial={{ opacity: 0, scale: 0.95, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 14 }}
                transition={{ duration: 0.4, ease: BCF_EASE }}
                style={{ boxShadow: "0 40px 110px rgba(0,0,0,0.62)" }}
              >
                <img
                  src={recognitionNodes[active.id]}
                  alt=""
                  decoding="async"
                  className="h-[320px] w-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[320px]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(4,6,9,0.25) 0%, rgba(4,6,9,0.15) 50%, rgba(0,0,0,0.85) 100%)",
                  }}
                />

                <div className="p-12 pt-10">
                  <h3
                    className="text-[46px] font-semibold leading-tight"
                    style={{ color: BCF.gold }}
                  >
                    {active.title}
                  </h3>
                  <p className="mt-7 text-[32px] leading-relaxed text-[#fdeed4]">
                    {active.detail}
                  </p>
                </div>

                <motion.button
                  type="button"
                  onClick={() => setActiveId(null)}
                  whileTap={BCF_TAP}
                  transition={BCF_TAP_TRANSITION}
                  className="absolute end-7 top-7 grid h-16 w-16 transform-gpu place-items-center rounded-full border border-white/30 bg-black/55 backdrop-blur-md"
                  aria-label={closeLabel}
                >
                  <X className="h-8 w-8 text-white" />
                </motion.button>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * The Board Chief entry on the Leadership grid.
 *
 * A portrait rather than another titled rectangle: it is the only card here
 * that opens onto a person, and it has to look unlike the four governance
 * cards for a visitor to know that before they touch it.
 */
function ChiefCard({
  name,
  role,
  open,
  onClick,
}: {
  name: string;
  role: string;
  open: string;
  onClick: () => void;
}) {
  const [pressed, setPressed] = React.useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      whileTap={BCF_TAP}
      className="mx-auto mt-14 flex w-full max-w-[980px] transform-gpu items-center gap-10 rounded-[28px] border p-8 text-start"
      style={{
        borderColor: pressed ? BCF.goldBright : `${BCF.gold}59`,
        backgroundColor: pressed ? "rgba(251,193,88,0.09)" : "rgba(0,0,0,0.5)",
        boxShadow: pressed
          ? `0 0 48px ${BCF.gold}33`
          : "0 22px 60px rgba(0,0,0,0.45)",
        transition:
          "border-color 400ms cubic-bezier(0.22,1,0.36,1), background-color 400ms cubic-bezier(0.22,1,0.36,1), box-shadow 400ms cubic-bezier(0.22,1,0.36,1)",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...BCF_TAP_TRANSITION, duration: 0.72, delay: 0.26, ease: BCF_EASE }}
    >
      <span
        className="h-[188px] w-[188px] shrink-0 overflow-hidden rounded-full border-2"
        style={{ borderColor: BCF.gold }}
      >
        <img
          src={chiefPortrait}
          alt=""
          decoding="async"
          className="h-full w-full transform-gpu object-cover transition-transform duration-700 ease-smooth-out motion-reduce:transition-none"
          style={{ transform: pressed ? "scale(1.06)" : "scale(1)" }}
        />
      </span>

      <span className="flex min-w-0 flex-col">
        <span className="text-[46px] font-semibold leading-tight text-[#fdeed4]">
          {name}
        </span>
        <span className="mt-3 text-[26px] leading-snug text-white/70">{role}</span>
        <span
          className="mt-6 flex items-center gap-3 text-[25px] font-medium"
          style={{ color: BCF.gold }}
        >
          {open}
          <ArrowRight
            className={`h-6 w-6 transform-gpu transition-transform duration-500 ease-smooth-out motion-reduce:transition-none rtl:rotate-180 ${
              pressed ? "translate-x-2 rtl:-translate-x-2" : ""
            }`}
          />
        </span>
      </span>
    </motion.button>
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
