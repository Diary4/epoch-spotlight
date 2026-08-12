import { motion, useReducedMotion } from "motion/react";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  bcfDrawX,
  bcfRise,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
import { bcfIntroBg } from "@/components/Sections/bcf/bcfAssets";

type BcfIntroProps = {
  lang: BcfLang;
  onContinue: () => void;
};

/**
 * The vow.
 *
 * One screen, one sentence — the line the foundation was built on — set over
 * the honor-to-serve plate, with the three words of the mission standing under
 * it as pillars.
 *
 * It used to run the same looping typewriter the attract ran, on the same three
 * words, over a borrowed press photograph: the visitor met the identical trick
 * twice in ten seconds and neither showing was the point of the screen. The
 * quote is the point, so the quote is the composition, and the three words are
 * demoted to what they actually are — its footing.
 */
export default function BcfIntro({ lang, onContinue }: BcfIntroProps) {
  const c = bcfCopy[lang];
  const reduceMotion = useReducedMotion();
  const pillars = [c.humanity, c.dignity, c.hope];

  return (
    <BcfShell
      backgroundImage={bcfIntroBg}
      overlayClassName="bg-gradient-to-b from-[#04090c]/40 via-[#04090c]/25 to-[#04090c]/95"
    >
      {/* One tap continues, from anywhere on the plate. */}
      <button
        type="button"
        className="absolute inset-0 z-20 cursor-pointer border-0 bg-transparent p-0"
        onClick={onContinue}
        aria-label={c.touchToContinue}
      />

      <motion.div
        // Sit in the open sky above Mustafa Barzani — the plate puts his head
        // in the lower half, so bottom-anchored copy was reading across his face.
        className="pointer-events-none relative z-10 flex min-h-[1920px] flex-col justify-start px-16 pt-[220px]"
        variants={bcfStagger(0.16, 0.3)}
        initial="initial"
        animate="animate"
      >
        <motion.p
          variants={bcfRise}
          className="text-[26px] font-semibold uppercase"
          style={{ color: BCF.nature, letterSpacing: "0.28em" }}
        >
          {c.attractTagline}
        </motion.p>

        <motion.span
          variants={bcfDrawX}
          className="mt-8 block h-px w-[460px] origin-left"
          style={{
            background: `linear-gradient(90deg, ${BCF.gold}, transparent)`,
          }}
        />

        {/* The quote. Set in the display serif at a size that has to be read
            slowly, which is the pace the sentence deserves. */}
        <div className="relative mt-16 max-w-[880px]">
          <motion.span
            variants={bcfRise}
            aria-hidden="true"
            className="absolute -left-2 -top-[86px] font-display-num text-[190px] leading-none rtl:-right-2 rtl:left-auto"
            style={{ color: `${BCF.gold}3d` }}
          >
            “
          </motion.span>
          <motion.p
            variants={bcfRise}
            className="relative font-display-num text-[86px] font-semibold italic leading-[1.14]"
            style={{ color: BCF.cream, textShadow: "0 20px 60px rgba(0,0,0,0.6)" }}
          >
            {c.quote}
          </motion.p>
        </div>

        <motion.div variants={bcfRise} className="mt-12 flex items-center gap-5">
          <span
            className="h-[3px] w-16 rounded-full"
            style={{ backgroundColor: BCF.goldDeep }}
          />
          <p className="text-[40px] font-medium" style={{ color: BCF.gold }}>
            {c.quoteAttr.replace(/^—\s*/, "")}
          </p>
        </motion.div>
      </motion.div>

      {/* Mission words stay at their lower footing, grouped in the center. */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-[520px] z-10 flex justify-center px-16"
        variants={bcfStagger(0.16, 0.9)}
        initial="initial"
        animate="animate"
      >
        <div className="flex items-start justify-center gap-16">
          {pillars.map((word, index) => (
            <motion.div
              key={word}
              variants={bcfRise}
              className="flex flex-col items-center gap-6"
            >
              <motion.span
                className="block w-px origin-bottom"
                style={{
                  height: 96,
                  background: `linear-gradient(0deg, ${BCF.gold}, transparent)`,
                }}
                initial={reduceMotion ? { opacity: 0 } : { scaleY: 0, opacity: 0 }}
                animate={
                  reduceMotion
                    ? { opacity: 1, transition: { duration: 0.3 } }
                    : {
                        scaleY: 1,
                        opacity: 1,
                        transition: {
                          duration: 0.9,
                          ease: BCF_EASE,
                          delay: 0.9 + index * 0.16,
                        },
                      }
                }
              />
              <span
                className="font-sans text-[46px] font-bold uppercase leading-none"
                style={{ color: BCF.creamSoft }}
              >
                {word}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Touch prompt — a breathing line at the foot of the screen rather than a
          scrim across the artwork, so the composition is never hidden. */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-[290px] z-30 flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.85, ease: BCF_EASE }}
      >
        <span
          className={`block h-[74px] w-px ${reduceMotion ? "" : "bcf-beam"}`}
          style={{
            transformOrigin: "top",
            background: `linear-gradient(180deg, transparent, ${BCF.gold})`,
          }}
        />
        <p
          className="text-[28px] font-medium uppercase"
          style={{ color: `${BCF.nature}cc`, letterSpacing: "0.22em" }}
        >
          {c.touchToContinue}
        </p>
      </motion.div>
    </BcfShell>
  );
}
