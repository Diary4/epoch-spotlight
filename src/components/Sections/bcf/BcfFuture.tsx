import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import BcfChapterPill from "@/components/Sections/bcf/BcfChapterPill";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfBloom,
  bcfDrawX,
  bcfRise,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
import futureThumb from "@/assets/images/religions/coexistence/masoud-barzani.webp";
import futureFill from "@/assets/images/PrimeMinistir/agreement.webp";
import legacyFill from "@/assets/images/religions/coexistence/mustafa-barzani.webp";
import { bcfFutureDetailBg } from "@/components/Sections/bcf/bcfAssets";

type BcfFutureProps = {
  lang: BcfLang;
  onBack: () => void;
  onOpenFuture: () => void;
};

const CIRCLE = 580;

/**
 * One of the two portals. Each is a photograph behind a gold ring rather than a
 * flat outlined disc, with a slow counter-rotating orbit so the pair reads as
 * living artwork on an otherwise still screen.
 */
function FuturePortal({
  index,
  title,
  image,
  onOpen,
  reduceMotion,
}: {
  index: number;
  title: string;
  image: string;
  onOpen: () => void;
  reduceMotion: boolean | null;
}) {
  const [pressed, setPressed] = React.useState(false);
  const label = String(index + 1).padStart(2, "0");

  return (
    <motion.button
      type="button"
      variants={bcfBloom}
      onClick={onOpen}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      whileTap={BCF_TAP}
      transition={BCF_TAP_TRANSITION}
      className="relative grid shrink-0 transform-gpu place-items-center will-change-transform"
      style={{ width: CIRCLE, height: CIRCLE }}
    >
      {/* Orbit: a dashed ring that turns slowly, opposite ways for the two. */}
      {!reduceMotion ? (
        <motion.span
          aria-hidden="true"
          className="absolute rounded-full border border-dashed"
          style={{
            inset: -26,
            borderColor: `${BCF.gold}3d`,
          }}
          animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 78, repeat: Infinity, ease: "linear" }}
        />
      ) : null}

      <span
        className="absolute inset-0 overflow-hidden rounded-full border-2"
        style={{
          borderColor: pressed ? BCF.goldBright : BCF.gold,
          boxShadow: pressed
            ? `0 0 70px ${BCF.gold}66, inset 0 0 60px rgba(0,0,0,0.6)`
            : `0 0 0 rgba(0,0,0,0), inset 0 0 60px rgba(0,0,0,0.6)`,
          transition: "border-color 400ms ease, box-shadow 400ms ease",
        }}
      >
        <img
          src={image}
          alt=""
          decoding="async"
          className="h-full w-full transform-gpu object-cover transition-transform duration-700 ease-smooth-out motion-reduce:transition-none"
          style={{ transform: pressed ? "scale(1.07)" : "scale(1)" }}
        />
        <span
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 42%, rgba(4,7,10,0.45), rgba(4,7,10,0.86) 78%)",
          }}
        />
      </span>

      <span className="relative flex max-w-[420px] flex-col items-center gap-6 px-10 text-center">
        <span dir="ltr" className="text-[64px] font-bold leading-none">
          <span className="text-[#fbf4e4]">{label[0]}</span>
          <span style={{ color: BCF.goldBright }}>{label[1]}</span>
        </span>
        <span className="text-[52px] font-bold leading-tight text-[#fbf4e4]">
          {title}
        </span>
        <span className="flex items-center gap-3" style={{ color: BCF.gold }}>
          <span
            className="h-px bg-current transition-all duration-500 ease-smooth-out motion-reduce:transition-none"
            style={{ width: pressed ? 88 : 64 }}
          />
          <ArrowRight
            className="h-7 w-7 transition-transform duration-500 ease-smooth-out motion-reduce:transition-none rtl:rotate-180"
            style={{ transform: pressed ? "translateX(8px)" : "translateX(0)" }}
          />
        </span>
      </span>
    </motion.button>
  );
}

export default function BcfFuture({ lang, onBack, onOpenFuture }: BcfFutureProps) {
  const c = bcfCopy[lang];
  const reduceMotion = useReducedMotion();

  const portals = [
    { title: c.futureCircle, image: futureFill },
    { title: c.legacyCircle, image: legacyFill },
  ];

  return (
    <BcfShell
      showLogo={false}
      backgroundImage={bcfFutureDetailBg}
      overlayClassName="bg-black/68"
    >
      <motion.div
        className="relative flex min-h-[1920px] flex-col px-10 pb-16 pt-24"
        variants={bcfStagger(0.16, 0.24)}
        initial="initial"
        animate="animate"
      >
        <BcfBackButton onClick={onBack} label={c.back} />

        <motion.div variants={bcfRise}>
          <BcfChapterPill title={c.trustTitle} thumb={futureThumb} />
        </motion.div>

        <motion.span
          variants={bcfDrawX}
          className="mx-auto mt-14 block h-px w-[420px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${BCF.gold}, transparent)`,
          }}
        />

        {/* Two portals on a single vertical thread. They previously sat as
            absolutely-positioned discs inside a fixed 1400px box, which left the
            spacing at the mercy of the container rather than the composition. */}
        <div className="relative mx-auto mt-16 flex w-full max-w-[980px] flex-col items-center gap-[92px]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[280px] h-[300px] w-px -translate-x-1/2"
            style={{
              background: `linear-gradient(180deg, transparent, ${BCF.gold}55, transparent)`,
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[416px] h-3 w-3 -translate-x-1/2 rotate-45"
            style={{ backgroundColor: BCF.gold }}
          />

          {portals.map((portal, index) => (
            <FuturePortal
              key={portal.title}
              index={index}
              title={portal.title}
              image={portal.image}
              onOpen={onOpenFuture}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </motion.div>
    </BcfShell>
  );
}
