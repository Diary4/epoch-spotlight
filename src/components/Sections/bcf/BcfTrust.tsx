import React from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  ChevronRight,
  User,
  Users,
} from "lucide-react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import BcfImageCard from "@/components/Sections/bcf/BcfImageCard";
import BcfBoardChief, {
  type BoardChiefView,
} from "@/components/Sections/bcf/BcfBoardChief";
import BcfPresident from "@/components/Sections/bcf/BcfPresident";
import BcfFounder from "@/components/Sections/bcf/BcfFounder";
import {
  bcfCopy,
  type BcfLang,
  type TrustTopicId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF, BCF_GLASS_CARD } from "@/components/Sections/bcf/bcfTheme";
import { bcfDigits } from "@/components/Sections/bcf/bcfDigits";
import {
  BCF_EASE,
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfDrawX,
  bcfRise,
  bcfRiseCard,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
import {
  bcfPartnerLogos,
  type PartnerLogoGroupId,
} from "@/components/Sections/bcf/bcfPartnerLogos";
import { bcfAwardImages } from "@/components/Sections/bcf/bcfAwardImages";
import { bcfStaffPortraits } from "@/components/Sections/bcf/bcfStaffPortraits";
import { bcfTrustBg } from "@/components/Sections/bcf/bcfAssets";
import leadershipThumb from "@/assets/images/bcf/from-source/trust-leadership.webp";
import qualityThumb from "@/assets/images/bcf/selected/impact-schools.webp";
import partnershipsThumb from "@/assets/images/bcf/from-source/trust-partnerships.webp";
import recognitionThumb from "@/assets/images/bcf/from-source/trust-recognition.webp";
import certificateImg from "@/assets/images/PrimeMinistir/agreement.webp";
import isoCertificate from "@/assets/images/bcf/credentials/iso-9001.webp";
import credKurdistan from "@/assets/images/bcf/Credibility page/Kurdistan.jpg";
import credIraq from "@/assets/images/bcf/Credibility page/Iraq.png";
import credUsa from "@/assets/images/bcf/Credibility page/USA.jpg";
import credEcosoc from "@/assets/images/bcf/credentials/ecosoc.webp";
import credBcc from "@/assets/images/bcf/credentials/bcc.webp";
import credKuwait from "@/assets/images/bcf/Credibility page/Kuwait.jpg";
/** Portrait for the Board Chief card on the Leadership grid. */
import chiefPortrait from "@/assets/images/bcf/thumbs/board-chief/main.webp";
import presidentPortrait from "@/assets/images/bcf/thumbs/bcf-president.webp";
/** Studio portrait for Sidad Barzani's leadership card. */
import founderPortrait from "@/assets/images/bcf/thumbs/bcf-founder.webp";

type BcfTrustProps = {
  lang: BcfLang;
  onBack: () => void;
};

/** The two name-only rosters hanging off the Leadership grid. */
type RosterId = "departments" | "offices";

const topicThumbs: Record<TrustTopicId, string> = {
  leadership: leadershipThumb,
  quality: qualityThumb,
  partnerships: partnershipsThumb,
  recognition: recognitionThumb,
};

/**
 * Credential artwork, keyed by `trustCredentials[].id`.
 *
 * `fit` is not a taste call. A photograph or a flag crops fine, so it fills the
 * frame. A scanned document does not: the ISO certificate is a 1045×1472
 * portrait page, and cropping it to fill a landscape-ish panel cuts the
 * EUROCERT mark off the top right, the certificate number and both validity
 * dates off the left rail, and the director's signature off the foot — which is
 * the entire reason a visitor would stand in front of it. Documents are shown
 * whole, on the white backing the panel paints behind `contain`, so the
 * letterbox reads as the page rather than as a gap.
 */
const credentialArt: Record<
  string,
  {
    src: string;
    fit: "cover" | "contain";
    pad?: string;
    position?: string;
    /** White mat behind letterboxed scans. Skip it when the document is already a white page. */
    mat?: "white";
  }
> = {
  "iraq": { src: credIraq, fit: "cover" },
  "krg": { src: credKurdistan, fit: "cover" },
  usa: { src: credUsa, fit: "cover" },
  kuwait: { src: credKuwait, fit: "cover" },
  ecosoc: { src: credEcosoc, fit: "contain", pad: "p-14", mat: "white" },
  uk: { src: credBcc, fit: "contain", pad: "p-12", mat: "white" },
  iso: { src: isoCertificate, fit: "contain", pad: "p-0" },
};

const PARTNER_GROUPS: PartnerLogoGroupId[] = [
  "partners",
  "donors",
  "sponsors",
];

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
  /** The President has one screen — his record is printed on the profile. */
  const [presidentOpen, setPresidentOpen] = React.useState(false);
  /** The Founding Board member beside him, same shape: one screen, one record. */
  const [founderOpen, setFounderOpen] = React.useState(false);
  const [adminBoardOpen, setAdminBoardOpen] = React.useState(false);
  /**
   * The two name-only rosters that sit under the board card: department heads
   * and office directors. One slot, since only one can be up at a time.
   */
  const [rosterOpen, setRosterOpen] = React.useState<RosterId | null>(null);
  const [partnerGroup, setPartnerGroup] =
    React.useState<PartnerLogoGroupId>("partners");

  const goBack = () => {
    if (chiefView === "timeline") {
      setChiefView("profile");
      return;
    }
    if (chiefView) {
      setChiefView(null);
      return;
    }
    if (presidentOpen) {
      setPresidentOpen(false);
      return;
    }
    if (founderOpen) {
      setFounderOpen(false);
      return;
    }
    if (adminBoardOpen) {
      setAdminBoardOpen(false);
      return;
    }
    if (rosterOpen) {
      setRosterOpen(null);
      return;
    }
    if (activeId) {
      setActiveId(null);
      setCredentialIndex(0);
      setPartnerGroup("partners");
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

    if (presidentOpen) {
      return <BcfPresident key="president" lang={lang} onBack={goBack} />;
    }

    if (founderOpen) {
      return <BcfFounder key="founder" lang={lang} onBack={goBack} />;
    }

    if (adminBoardOpen) {
      return (
        <BcfShell
          key="admin-board"
          showLogo={false}
          backgroundImage={bcfTrustBg}
          overlayClassName="bg-black/35"
        >
          <TrustChrome
            title={c.trustAdminBoardTitle}
            backLabel={c.back}
            onBack={goBack}
          >
            <motion.p
              className={`mx-auto mt-8 max-w-[820px] text-center text-[28px] text-[#fdeed4] ${
                lang === "en" ? "leading-relaxed" : "leading-[1.75]"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: BCF_EASE }}
            >
              {c.trustAdminBoardBody}
            </motion.p>
            {/* Named roster: the vice president and the board seats. Portraits
                are the named Board Members headshots. A single group repeats
                the page title, so its heading is dropped. */}
            <motion.div
              className="mx-auto mt-12 flex w-full max-w-[980px] flex-col gap-12"
              variants={bcfStagger(0.1, 0.24)}
              initial="initial"
              animate="animate"
            >
              {c.trustStaffGroups.map((group) => (
                <motion.section key={group.id} variants={bcfRiseCard}>
                  {c.trustStaffGroups.length > 1 ? (
                    <>
                      <h2
                        className="text-[34px] font-semibold leading-tight"
                        style={{ color: BCF.gold }}
                      >
                        {group.title}
                      </h2>
                      <span
                        className="mt-4 block h-px w-full"
                        style={{
                          background: `linear-gradient(90deg, ${BCF.gold}66, transparent)`,
                        }}
                      />
                    </>
                  ) : null}
                  <div className="mt-7 grid grid-cols-2 gap-5">
                    {group.members.map((member) => {
                      const portrait = bcfStaffPortraits[member.id];
                      return (
                      <div
                        key={member.id}
                        className={`${BCF_GLASS_CARD} flex items-center gap-5 p-6`}
                        style={{ boxShadow: "0 18px 48px rgba(0,0,0,0.4)" }}
                      >
                        <span
                          className="h-[112px] w-[96px] shrink-0 overflow-hidden rounded-xl border-2"
                          style={{ borderColor: BCF.gold }}
                        >
                          {portrait ? (
                            <img
                              src={portrait}
                              alt=""
                              className="h-full w-full object-cover object-top"
                            />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center bg-white/5">
                              <User className="h-12 w-12 text-white/35" />
                            </span>
                          )}
                        </span>
                        <span className="flex min-w-0 flex-col">
                          <span className="text-[28px] font-semibold leading-snug text-[#fdeed4]">
                            {member.name}
                          </span>
                          <span
                            className={`mt-2 text-[21px] ${
                              lang === "en" ? "leading-snug" : "leading-[1.7]"
                            }`}
                            style={{ color: BCF.gold }}
                          >
                            {member.role}
                          </span>
                        </span>
                      </div>
                      );
                    })}
                  </div>
                </motion.section>
              ))}
            </motion.div>
          </TrustChrome>
        </BcfShell>
      );
    }

    if (rosterOpen) {
      const roster =
        rosterOpen === "departments"
          ? {
              title: c.trustDepartmentsTitle,
              body: c.trustDepartmentsBody,
              members: c.trustDepartmentsMembers,
            }
          : {
              title: c.trustOfficesTitle,
              body: c.trustOfficesBody,
              members: c.trustOfficesMembers,
            };

      return (
        <BcfShell
          key={`roster-${rosterOpen}`}
          showLogo={false}
          backgroundImage={bcfTrustBg}
          overlayClassName="bg-black/35"
        >
          <TrustChrome title={roster.title} backLabel={c.back} onBack={goBack}>
            <motion.p
              className={`mx-auto mt-8 max-w-[820px] text-center text-[28px] text-[#fdeed4] ${
                lang === "en" ? "leading-relaxed" : "leading-[1.75]"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: BCF_EASE }}
            >
              {roster.body}
            </motion.p>
            <motion.div
              className="mx-auto mt-12 grid w-full max-w-[980px] grid-cols-2 gap-5"
              variants={bcfStagger(0.08, 0.26)}
              initial="initial"
              animate="animate"
            >
              {roster.members.map((member) => {
                const portrait = bcfStaffPortraits[member.id];
                return (
                  <motion.div
                    key={member.id}
                    variants={bcfRiseCard}
                    className={`${BCF_GLASS_CARD} flex items-center gap-5 p-6`}
                    style={{ boxShadow: "0 18px 48px rgba(0,0,0,0.4)" }}
                  >
                    <span
                      className="h-[112px] w-[96px] shrink-0 overflow-hidden rounded-xl border-2"
                      style={{ borderColor: BCF.gold }}
                    >
                      {portrait ? (
                        <img
                          src={portrait}
                          alt=""
                          className="h-full w-full object-cover object-top"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center bg-white/5">
                          <User className="h-12 w-12 text-white/35" />
                        </span>
                      )}
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-[28px] font-semibold leading-snug text-[#fdeed4]">
                        {member.name}
                      </span>
                      <span
                        className={`mt-2 text-[21px] ${
                          lang === "en" ? "leading-snug" : "leading-[1.7]"
                        }`}
                        style={{ color: BCF.gold }}
                      >
                        {member.role}
                      </span>
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </TrustChrome>
        </BcfShell>
      );
    }

    if (activeId === "leadership") {
      return (
        <BcfShell
          key="leadership"
          showLogo={false}
          backgroundImage={bcfTrustBg}
          overlayClassName="bg-black/35"
        >
          <TrustChrome title={c.trustLeadershipTitle} backLabel={c.back} onBack={goBack}>
            <motion.div
              className="mx-auto mt-10 flex w-full max-w-[980px] flex-col gap-6"
              variants={bcfStagger(0.09, 0.32)}
              initial="initial"
              animate="animate"
            >
              <LeadershipPersonCard
                name={c.boardChief.name}
                role={c.boardChief.role}
                label={c.boardChief.open}
                portrait={chiefPortrait}
                onClick={() => setChiefView("profile")}
              />
              <LeadershipPersonCard
                name={c.bcfFounder.name}
                role={c.bcfFounder.role}
                label={c.bcfFounder.open}
                portrait={founderPortrait}
                onClick={() => setFounderOpen(true)}
              />
              <LeadershipPersonCard
                name={c.bcfPresident.name}
                role={c.bcfPresident.role}
                label={c.bcfPresident.open}
                portrait={presidentPortrait}
                onClick={() => setPresidentOpen(true)}
              />

              <LeadershipGroupCard
                icon={Users}
                title={c.trustAdminBoardTitle}
                body={c.trustAdminBoardBody}
                label={c.trustAdminBoardOpen}
                onClick={() => setAdminBoardOpen(true)}
              />
              <LeadershipGroupCard
                icon={Briefcase}
                title={c.trustDepartmentsTitle}
                body={c.trustDepartmentsBody}
                label={c.trustDepartmentsOpen}
                onClick={() => setRosterOpen("departments")}
              />
              <LeadershipGroupCard
                icon={Building2}
                title={c.trustOfficesTitle}
                body={c.trustOfficesBody}
                label={c.trustOfficesOpen}
                onClick={() => setRosterOpen("offices")}
              />
            </motion.div>
          </TrustChrome>
        </BcfShell>
      );
    }

    if (activeId === "quality") {
      const activeCredential = c.trustCredentials[credentialIndex] ?? c.trustCredentials[0];
      const activeArt = credentialArt[activeCredential.id];
      const artSrc = activeArt?.src ?? certificateImg;
      const artFit = activeArt?.fit ?? "contain";
      const artPad = activeArt?.pad ?? "";
      const artPosition = activeArt?.position ?? "";
      const qualityTitle =
        lang === "en" ? (
          <>
            <span style={{ color: BCF.gold }}>Quality</span>{" "}
            <span className="text-[#fbf4e4]">and</span>{" "}
            <span style={{ color: BCF.gold }}>Credibility</span>
          </>
        ) : (
          c.trustQualityTitle
        );

      return (
        <BcfShell
          key="quality"
          showLogo={false}
          backgroundImage={bcfTrustBg}
          overlayClassName="bg-black/35"
        >
          <TrustChrome title={qualityTitle} backLabel={c.back} onBack={goBack}>
            {/* The rail used to arrive as one slab with the panel. Cascading the
                credentials down and letting the certificate settle beside
                them reads as the page assembling itself. */}
            <motion.div
              className="mx-auto mt-12 flex w-full max-w-[1240px] items-stretch gap-10"
              variants={bcfStagger(0.16, 0.2)}
              initial="initial"
              animate="animate"
            >
              <motion.div
                className="flex w-[540px] shrink-0 flex-col gap-4"
                variants={bcfStagger(0.07, 0)}
              >
                {c.trustCredentials.map((item, index) => {
                  const selected = index === credentialIndex;
                  return (
                    <motion.div key={item.id} variants={bcfRiseCard}>
                    <motion.button
                      type="button"
                      onClick={() => setCredentialIndex(index)}
                      whileTap={BCF_TAP}
                      transition={BCF_TAP_TRANSITION}
                      className="relative flex w-full transform-gpu items-center justify-between gap-5 overflow-hidden rounded-2xl px-8 py-5 text-start text-[32px] font-medium leading-snug backdrop-blur-md"
                      style={{
                        border: "1px solid",
                        borderColor: selected ? BCF.gold : "rgba(255,255,255,0.22)",
                        backgroundColor: selected
                          ? "rgba(0,0,0,0.55)"
                          : "rgba(0,0,0,0.3)",
                        color: selected ? BCF.creamSoft : "rgba(255,255,255,0.78)",
                        boxShadow: selected ? `0 0 30px ${BCF.gold}40` : "none",
                        transition:
                          "border-color 300ms cubic-bezier(0.22,1,0.36,1), background-color 300ms cubic-bezier(0.22,1,0.36,1), color 300ms, box-shadow 300ms",
                      }}
                    >
                      <span className="min-w-0 flex-1">
                        {bcfDigits(item.title, lang)}
                      </span>
                      <ChevronRight
                        className="h-8 w-8 shrink-0 rtl:rotate-180"
                        style={{ color: BCF.gold }}
                        strokeWidth={2.25}
                      />
                    </motion.button>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                variants={bcfRiseCard}
                className={`${BCF_GLASS_CARD} flex min-w-0 flex-1 flex-col overflow-hidden`}
                style={{ boxShadow: `0 0 40px ${BCF.gold}18` }}
              >
                <div
                  className="relative min-h-[760px] flex-1 overflow-hidden"
                  style={{
                    backgroundColor:
                      artFit === "contain" && activeArt?.mat === "white"
                        ? "#fff"
                        : "#111",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={artSrc}
                      src={artSrc}
                      alt=""
                      decoding="async"
                      className={
                        artFit === "cover"
                          ? `absolute inset-0 h-full w-full object-cover ${artPosition}`
                          : `absolute inset-0 h-full w-full object-contain ${artPad}`
                      }
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeCredential.id}
                    className={`px-8 py-8 text-[32px] text-white/85 ${
                      lang === "en" ? "leading-relaxed" : "leading-[1.75]"
                    }`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {activeCredential.body}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </TrustChrome>
        </BcfShell>
      );
    }

    if (activeId === "partnerships") {
      const groupLabels: Record<PartnerLogoGroupId, string> = {
        partners: c.trustPartnersLabel,
        donors: c.trustDonorsLabel,
        sponsors: c.trustSponsorsLabel,
      };
      const logos = bcfPartnerLogos[partnerGroup];

      return (
        <BcfShell
          key="partnerships"
          showLogo={false}
          backgroundImage={bcfTrustBg}
          overlayClassName="bg-black/35"
        >
          <TrustChrome title={c.trustPartnershipsTitle} backLabel={c.back} onBack={goBack}>
            <motion.p
              className="mx-auto mt-8 max-w-[780px] text-center text-[28px] text-white/75"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {c.trustPartnershipsHint}
            </motion.p>

            <motion.div
              className="mx-auto mt-10 flex w-full max-w-[920px] justify-center gap-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {PARTNER_GROUPS.map((group) => {
                const selected = partnerGroup === group;
                return (
                  <motion.button
                    key={group}
                    type="button"
                    onClick={() => setPartnerGroup(group)}
                    whileTap={BCF_TAP}
                    transition={BCF_TAP_TRANSITION}
                    className="min-w-[200px] transform-gpu rounded-2xl px-8 py-4 text-[26px] font-medium backdrop-blur-md"
                    style={{
                      border: "1px solid",
                      borderColor: selected ? BCF.gold : "rgba(255,255,255,0.22)",
                      backgroundColor: selected
                        ? "rgba(0,0,0,0.55)"
                        : "rgba(0,0,0,0.3)",
                      color: selected ? BCF.creamSoft : "rgba(255,255,255,0.72)",
                      boxShadow: selected ? `0 0 28px ${BCF.gold}38` : "none",
                      transition:
                        "border-color 280ms ease, background-color 280ms ease, color 280ms, box-shadow 280ms",
                    }}
                  >
                    {groupLabels[group]}
                  </motion.button>
                );
              })}
            </motion.div>

            <div
              className="mx-auto mt-12 min-h-0 w-full max-w-[980px] flex-1"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 72px, #000 calc(100% - 88px), transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, #000 72px, #000 calc(100% - 88px), transparent 100%)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={partnerGroup}
                  className="grid max-h-[1280px] grid-cols-3 gap-x-8 gap-y-8 overflow-y-auto overscroll-contain scrollbar-hide px-2 pb-16 pt-10"
                  variants={bcfStagger(0.035, 0.04)}
                  initial="initial"
                  animate="animate"
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.22 } }}
                >
                  {logos.map((src, index) => (
                    <motion.div
                      key={`${partnerGroup}-${index}`}
                      variants={bcfRiseCard}
                      className="mx-auto flex h-[220px] w-[220px] items-center justify-center overflow-hidden rounded-[28px] border border-white/25 bg-white p-6"
                      style={{
                        boxShadow:
                          "0 16px 36px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.9)",
                      }}
                    >
                      <img
                        src={src}
                        alt=""
                        decoding="async"
                        loading="lazy"
                        className="h-full w-full object-contain object-center"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </TrustChrome>
        </BcfShell>
      );
    }

    if (activeId === "recognition") {
      return (
        <BcfShell
          key="recognition"
          showLogo={false}
          backgroundImage={bcfTrustBg}
          overlayClassName="bg-black/35"
        >
          <TrustChrome title={c.trustRecognitionTitle} backLabel={c.back} onBack={goBack}>
            <motion.p
              className={`mx-auto mt-8 max-w-[820px] text-center text-[28px] text-[#fdeed4] ${
                lang === "en" ? "leading-relaxed" : "leading-[1.75]"
              }`}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {c.trustRecognitionBody}
            </motion.p>

            <motion.div
              className="mx-auto mt-10 grid max-h-[1420px] w-full max-w-[980px] grid-cols-2 gap-6 overflow-y-auto overscroll-contain px-2 pb-8"
              variants={bcfStagger(0.03, 0.1)}
              initial="initial"
              animate="animate"
            >
              {bcfAwardImages.map((src, index) => (
                <motion.div
                  key={src}
                  variants={bcfRiseCard}
                  /* White plate: the certificates and plaques are photographed
                     on every kind of ground, and a dark card let each one set
                     its own apparent size. One white field, one size. */
                  className="flex aspect-[4/3] transform-gpu items-center justify-center rounded-[24px] border border-white/14 bg-white p-6"
                  style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.42)" }}
                >
                  <img
                    src={src}
                    alt=""
                    decoding="async"
                    loading={index < 6 ? "eager" : "lazy"}
                    className="max-h-full max-w-full object-contain"
                  />
                </motion.div>
              ))}
            </motion.div>
          </TrustChrome>
        </BcfShell>
      );
    }

    // The hub and the Leadership grid were the only two Trust screens with no
    // photograph behind them, so they also had no ken-burns drift — two still
    // pages among four drifting ones.
    return (
      <BcfShell
        key="hub"
        showLogo={false}
        backgroundImage={bcfTrustBg}
        overlayClassName="bg-black/35"
      >
        <div className="relative flex min-h-[1920px] w-full flex-col items-center justify-center px-[100px] py-16">
          <BcfBackButton onClick={goBack} label={c.back} />

          <motion.div
            className="flex w-full max-w-[880px] flex-col items-center"
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
            className="mt-16 flex w-full max-w-[880px] flex-col gap-8"
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

  /*
   * No `initial={false}` here, and it matters more than it looks.
   *
   * `AnimatePresence` publishes that flag on React context, and every `motion`
   * element underneath reads it — not just the direct child. On the render
   * where this chapter mounts, it told the whole tree to skip its entrance, so
   * opening Trust snapped the hub into place fully formed: no shell dissolve,
   * no staggered cards. Only the screens opened afterwards animated, which is
   * why the chapter felt dead exactly at the moment a visitor first looks at it.
   */
  return (
    <AnimatePresence mode="wait">
      {scene}
    </AnimatePresence>
  );
}

/**
 * One leadership profile on the Governance grid — horizontal rectangle with a
 * portrait plate on the start edge, name and role beside it.
 */
function LeadershipPersonCard({
  name,
  role,
  label,
  portrait,
  onClick,
}: {
  name: string;
  role: string;
  /** Screen-reader label only — the card shows an arrow, not this copy. */
  label: string;
  portrait: string;
  onClick: () => void;
}) {
  const [pressed, setPressed] = React.useState(false);

  return (
    <motion.button
      type="button"
      aria-label={label}
      variants={bcfRiseCard}
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      whileTap={BCF_TAP}
      transition={BCF_TAP_TRANSITION}
      className={`${BCF_GLASS_CARD} relative flex h-[200px] w-full transform-gpu items-stretch overflow-hidden text-start`}
      style={{
        borderColor: pressed ? BCF.gold : undefined,
        boxShadow: pressed
          ? `0 0 40px ${BCF.gold}33, 0 22px 60px rgba(0,0,0,0.45)`
          : "0 22px 60px rgba(0,0,0,0.45)",
        transition:
          "border-color 400ms cubic-bezier(0.22,1,0.36,1), box-shadow 400ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <span
        className="w-[200px] shrink-0 overflow-hidden border-e-2"
        style={{ borderColor: BCF.gold }}
      >
        <img
          src={portrait}
          alt=""
          decoding="async"
          className="h-full w-full transform-gpu object-cover object-top transition-transform duration-700 ease-smooth-out motion-reduce:transition-none"
          style={{ transform: pressed ? "scale(1.06)" : "scale(1)" }}
        />
      </span>

      <span className="flex min-w-0 flex-1 items-center justify-between gap-6 px-10 py-6">
        <span className="flex min-w-0 flex-col">
          <span className="text-[38px] font-semibold leading-tight text-[#fdeed4]">
            {name}
          </span>
          <span className="mt-3 text-[26px] leading-snug" style={{ color: BCF.gold }}>
            {role}
          </span>
        </span>
        <ArrowRight
          className={`h-7 w-7 shrink-0 transform-gpu transition-transform duration-500 ease-smooth-out motion-reduce:transition-none rtl:rotate-180 ${
            pressed ? "translate-x-2 rtl:-translate-x-2" : ""
          }`}
          style={{ color: BCF.gold }}
        />
      </span>
    </motion.button>
  );
}

/**
 * A group on the Governance grid — same rectangle as `LeadershipPersonCard`,
 * but the plate carries an icon because a group has no one portrait.
 */
function LeadershipGroupCard({
  icon: Icon,
  title,
  body,
  label,
  onClick,
}: {
  icon: typeof Users;
  title: string;
  body: string;
  /** Screen-reader label only — the card shows an arrow, not this copy. */
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      variants={bcfRiseCard}
      whileTap={BCF_TAP}
      transition={BCF_TAP_TRANSITION}
      onClick={onClick}
      className={`${BCF_GLASS_CARD} relative flex h-[200px] w-full transform-gpu items-stretch overflow-hidden text-start`}
      style={{ boxShadow: "0 22px 60px rgba(0,0,0,0.45)" }}
    >
      <span
        className="flex w-[200px] shrink-0 items-center justify-center border-e-2 bg-white/5"
        style={{ borderColor: BCF.gold }}
      >
        <Icon className="h-16 w-16" style={{ color: BCF.gold }} />
      </span>
      <span className="flex min-w-0 flex-1 items-center justify-between gap-6 px-10 py-6">
        <span className="flex min-w-0 flex-col">
          <h3 className="text-[38px] font-semibold leading-tight text-[#fdeed4]">
            {title}
          </h3>
          <p className="mt-3 line-clamp-2 text-[24px] leading-relaxed text-white/75">
            {body}
          </p>
        </span>
        <ArrowRight className="h-7 w-7 shrink-0 rtl:rotate-180" style={{ color: BCF.gold }} />
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
  title: React.ReactNode;
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
