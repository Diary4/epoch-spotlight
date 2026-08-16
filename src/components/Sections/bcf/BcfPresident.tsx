import React from "react";
import { motion } from "motion/react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import BcfProfileHero from "@/components/Sections/bcf/BcfProfileHero";
import BcfFilmstrip from "@/components/Sections/bcf/BcfFilmstrip";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF, BCF_FIELD_BG } from "@/components/Sections/bcf/bcfTheme";
import { bcfDigits } from "@/components/Sections/bcf/bcfDigits";
import { bcfRiseCard, bcfStagger } from "@/components/Sections/bcf/bcfMotion";
import presidentPortrait from "@/assets/images/bcf/optimized/administration/fff.webp";
/**
 * Context strip under the record.
 *
 * Stand-in photography: BCF field work rather than the President himself, which
 * is the honest placeholder until his own set arrives. Deliberately *not* the
 * other `administration/` portraits — those are other named officers, and a
 * strip on his page reads as him.
 */
import stripConvoy from "@/assets/images/bcf/optimized/flood/8C6A6595.webp";
import stripTeam from "@/assets/images/bcf/optimized/flood/4949107.webp";
import stripClearing from "@/assets/images/bcf/optimized/flood/2B1A6744.webp";
import stripCamp from "@/assets/images/bcf/optimized/camps/harsham.webp";
import stripSchool from "@/assets/images/bcf/optimized/schools/8D1A7003.webp";

const STRIP_IMAGES = [
  stripTeam,
  stripConvoy,
  stripClearing,
  stripCamp,
  stripSchool,
];

/** Padded column the record cards are read in. */
const COLUMN = "mx-auto w-full max-w-[1000px] px-10";

type BcfPresidentProps = {
  lang: BcfLang;
  onBack: () => void;
};

/**
 * BCF President.
 *
 * A record, not an essay. The page opens on the photograph with the nameplate
 * laid into it, then answers three questions in the order a visitor asks them
 * — who he is, how he got here, what he has been given — with the labels down
 * one side so any one of the three can be found without reading the other two.
 *
 * There is no timeline screen behind this one any more. The career it held was
 * five nodes restating the same three facts printed here, and a second screen
 * that only repeats the first is a screen nobody has a reason to open.
 */
export default function BcfPresident({ lang, onBack }: BcfPresidentProps) {
  const c = bcfCopy[lang];
  const president = c.bcfPresident;
  const rtl = lang !== "en";

  return (
    <BcfShell
      key="president-profile"
      showLogo={false}
      overlayClassName="bg-black/0"
      backgroundStyle={{ background: BCF_FIELD_BG }}
    >
      <div className="relative flex min-h-[1920px] flex-col pb-14">
        <BcfBackButton onClick={onBack} label={c.back} />

        <BcfProfileHero
          image={presidentPortrait}
          name={president.name}
          role={president.role}
          meta={president.meta}
          align="center"
          height={640}
          objectPosition="50% 22%"
          plateWidth={700}
        />

        {/* The two record cards sit in the padded column; the filmstrip between
            them does not — it is film, and film runs past the edge of the page
            in both directions. */}
        <motion.div
          className="flex w-full flex-col gap-7"
          variants={bcfStagger(0.12, 0.4)}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={bcfRiseCard} className={COLUMN}>
            <RecordCard>
              <RecordRow label={president.bioLabel}>
                <p className={bodyClass(lang)}>{president.bio}</p>
              </RecordRow>

              <RecordRow label={president.journeyLabel} divided>
                <div className="flex flex-col">
                  {president.journey.map((fact, index) => (
                    <div
                      key={fact.id}
                      className="grid grid-cols-[152px_1fr] gap-6 py-4 first:pt-0 last:pb-0"
                      style={
                        index === 0
                          ? undefined
                          : { borderTop: "1px solid rgba(255,255,255,0.10)" }
                      }
                    >
                      <span
                        className="text-[21px] font-medium leading-snug tabular-nums"
                        style={{ color: BCF.gold }}
                      >
                        {bcfDigits(fact.period, lang)}
                      </span>
                      <p className={bodyClass(lang)}>{fact.body}</p>
                    </div>
                  ))}
                </div>
              </RecordRow>
            </RecordCard>
          </motion.div>

          <motion.div variants={bcfRiseCard}>
            <BcfFilmstrip
              images={STRIP_IMAGES}
              rtl={rtl}
              controls={false}
              size="sm"
              width={1080}
              delay={0}
            />
          </motion.div>

          <motion.div variants={bcfRiseCard} className={COLUMN}>
            <RecordCard>
              <RecordRow label={president.awardsLabel}>
                <p className={bodyClass(lang)}>{president.awards}</p>
              </RecordRow>
            </RecordCard>
          </motion.div>
        </motion.div>
      </div>
    </BcfShell>
  );
}

/** Kurdish and Arabic need the looser leading their scripts are set on. */
function bodyClass(lang: BcfLang) {
  return `text-[21px] text-white/80 ${
    lang === "en" ? "leading-relaxed" : "leading-[1.85]"
  }`;
}

function RecordCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full overflow-hidden backdrop-blur-md"
      style={{
        borderRadius: 16,
        border: `1px solid ${BCF.gold}2e`,
        background:
          "linear-gradient(165deg, rgba(20,15,7,0.66) 0%, rgba(8,8,8,0.58) 100%)",
        boxShadow: "0 22px 56px rgba(0,0,0,0.45)",
      }}
    >
      {children}
    </div>
  );
}

/**
 * One labelled section. The label column is a fixed width in every language so
 * the three cards on the page share a single spine — a column that resized
 * itself to the longest word would put "AWARDS" and "BIOGRAPHY" on different
 * left edges, which is exactly the drift that makes a page look assembled from
 * three unrelated blocks.
 */
function RecordRow({
  label,
  divided = false,
  children,
}: {
  label: string;
  divided?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="grid grid-cols-[248px_1fr] items-start"
      style={
        divided ? { borderTop: "1px solid rgba(255,255,255,0.12)" } : undefined
      }
    >
      <span
        className="px-8 py-7 text-[26px] font-semibold uppercase leading-tight tracking-[0.04em]"
        style={{ color: BCF.gold }}
      >
        {label}
      </span>
      <div
        className="px-8 py-7"
        style={{ borderInlineStart: "1px solid rgba(255,255,255,0.12)" }}
      >
        {children}
      </div>
    </div>
  );
}
