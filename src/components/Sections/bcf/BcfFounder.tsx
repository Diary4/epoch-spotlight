import React from "react";
import { motion } from "motion/react";
import { bcfTrustBg } from "@/components/Sections/bcf/bcfAssets";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import BcfProfileHero from "@/components/Sections/bcf/BcfProfileHero";
import { bcfCopy, type BcfLang } from "@/components/Sections/bcf/bcfContent";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import { bcfRiseCard, bcfStagger } from "@/components/Sections/bcf/bcfMotion";
import founderPortrait from "@/assets/images/bcf/optimized/bcf-founder/portrait.webp";

/** Padded column the record cards are read in — the President's, exactly. */
const COLUMN = "mx-auto w-full max-w-[1000px] px-10";

type BcfFounderProps = {
  lang: BcfLang;
  onBack: () => void;
};

/**
 * Founding Board member.
 *
 * The President's record page, carrying a concise museum label. Four labelled
 * sections in the order a visitor asks for them — who he is, the seats he holds,
 * the Peshmerga struggle, liberation and defense — so the two profiles opened
 * from the same grid read as one pair of documents rather than two designs.
 *
 * No filmstrip between the cards, unlike the President's page: the one
 * photograph there is of him is the studio portrait already carrying the
 * nameplate, and a strip of film holding a single frame is not film.
 */
export default function BcfFounder({ lang, onBack }: BcfFounderProps) {
  const c = bcfCopy[lang];
  const founder = c.bcfFounder;

  return (
    <BcfShell
      key="founder-profile"
      showLogo={false}
      backgroundImage={bcfTrustBg}
      overlayClassName="bg-black/35"
    >
      <div className="relative flex min-h-[1920px] flex-col pb-14">
        <BcfBackButton onClick={onBack} label={c.back} />

        {/* A seated studio portrait cropped into a landscape band: the subject is
            centred and his head sits high in the frame, so the band is pulled
            down off the top of the source to leave headroom above the turban and
            land the nameplate on the chest rather than across the face. */}
        <BcfProfileHero
          image={founderPortrait}
          name={founder.name}
          role={founder.role}
          meta={founder.meta}
          align="center"
          height={640}
          objectPosition="50% 10%"
          plateWidth={760}
        />

        <motion.div
          className="flex w-full flex-col gap-7"
          variants={bcfStagger(0.12, 0.4)}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={bcfRiseCard} className={COLUMN}>
            <RecordCard>
              <RecordRow label={founder.bioLabel}>
                <p className={bodyClass(lang)}>{founder.bio}</p>
              </RecordRow>

              <RecordRow label={founder.rolesLabel} divided>
                <EntryList entries={founder.roles} lang={lang} />
              </RecordRow>
            </RecordCard>
          </motion.div>

          <motion.div variants={bcfRiseCard} className={COLUMN}>
            <RecordCard>
              <RecordRow label={founder.serviceLabel}>
                <p className={`${bodyClass(lang)} mb-2`}>{founder.serviceIntro}</p>
                <EntryList entries={founder.service} lang={lang} />
              </RecordRow>
            </RecordCard>
          </motion.div>

          <motion.div variants={bcfRiseCard} className={COLUMN}>
            <RecordCard>
              <RecordRow label={founder.partyLabel}>
                <EntryList entries={founder.party} lang={lang} />
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

/**
 * A run of headed facts inside one record row. The heading is the fact a
 * visitor scans for — "The 1991 Uprising", "Member of the Political Bureau" —
 * so it gets the gold and its own line, and the prose beneath it is only read
 * by whoever stopped at that heading.
 */
function EntryList({
  entries,
  lang,
}: {
  entries: { id: string; title: string; body: string }[];
  lang: BcfLang;
}) {
  return (
    <div className="flex flex-col">
      {entries.map((entry, index) => (
        <div
          key={entry.id}
          className="py-4 first:pt-0 last:pb-0"
          style={
            index === 0
              ? undefined
              : { borderTop: "1px solid rgba(255,255,255,0.10)" }
          }
        >
          <h3
            className="text-[23px] font-semibold leading-snug"
            style={{ color: BCF.gold }}
          >
            {entry.title}
          </h3>
          <p className={`${bodyClass(lang)} mt-2`}>{entry.body}</p>
        </div>
      ))}
    </div>
  );
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
 * One labelled section, on the same 248px spine the President's page uses so
 * the two profiles share a left edge.
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
