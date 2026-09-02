import React from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  ChevronLeft,
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
import credKrgEn from "@/assets/images/bcf/Credibility page/krg-en.webp";
import credKrgKr from "@/assets/images/bcf/Credibility page/krg-kr.webp";
import credIraq from "@/assets/images/bcf/Credibility page/iraq.webp";
import credUsa from "@/assets/images/bcf/Credibility page/us.webp";
import credEcosoc from "@/assets/images/bcf/Credibility page/un.webp";
import credUk from "@/assets/images/bcf/Credibility page/uk-en.webp";
import credKuwait from "@/assets/images/bcf/Credibility page/kuwait.webp";
/** Portrait for the Board Chief card on the Leadership grid. */
import chiefPortrait from "@/assets/images/bcf/thumbs/board-chief/main.webp";
/** Studio portrait for Musa Ahmad's leadership card (detail cover stays separate). */
import presidentPortrait from "@/assets/images/bcf/from-source/president-musa-card.webp";
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
    /** One or more certificate scans. KRG alone ships both language pages. */
    srcs: string[];
    fit: "cover" | "contain";
    pad?: string;
    position?: string;
    /** White mat behind letterboxed scans. Skip it when the document is already a white page. */
    mat?: "white";
    /**
     * Width ÷ height of the frame, for artwork whose own shape should set it.
     * Without this the panel is one tall box for every credential and a
     * portrait page floats in it between two black bands. With it the frame is
     * cut to the document, and `contain` has nothing left to letterbox.
     */
    ratio?: number;
  }
> = {
  /* Licence scans are portrait pages — show whole, on a white mat. */
  krg: {
    srcs: [credKrgEn, credKrgKr],
    fit: "contain",
    pad: "p-3",
    mat: "white",
  },
  iraq: { srcs: [credIraq], fit: "contain", pad: "p-3", mat: "white" },
  usa: { srcs: [credUsa], fit: "contain", pad: "p-3", mat: "white" },
  kuwait: { srcs: [credKuwait], fit: "cover" },
  ecosoc: { srcs: [credEcosoc], fit: "contain", pad: "p-3", mat: "white" },
  uk: { srcs: [credUk], fit: "contain", pad: "p-3", mat: "white" },
  /* The scan is 1045×1472 — A4 — so the frame is too, to the pixel. */
  iso: {
    srcs: [isoCertificate],
    fit: "contain",
    pad: "p-0",
    ratio: 1045 / 1472,
  },
};

const PARTNER_GROUPS: PartnerLogoGroupId[] = ["partners", "donors"];

/**
 * Trust Behind the Work — Figma frames:
 * hub list → Leadership / Quality / Partnerships / Recognition details.
 */
export default function BcfTrust({ lang, onBack }: BcfTrustProps) {
  const c = bcfCopy[lang];
  const [activeId, setActiveId] = React.useState<TrustTopicId | null>(null);
  const [credentialIndex, setCredentialIndex] = React.useState(0);
  /** Page inside a multi-scan credential (KRG English / Kurdish). */
  const [credentialPage, setCredentialPage] = React.useState(0);
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
                portraitZoom={1.02}
                portraitPosition="50% 22%"
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
      const artSrcs = activeArt?.srcs ?? [certificateImg];
      const artFit = activeArt?.fit ?? "contain";
      const artPad = activeArt?.pad ?? "";
      const artPosition = activeArt?.position ?? "";
      const artRatio = activeArt?.ratio;
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
          <TrustChrome
            title={qualityTitle}
            backLabel={c.back}
            onBack={goBack}
            titleClassName="text-[52px]"
          >
            {/* The rail used to arrive as one slab with the panel. Cascading the
                credentials down and letting the certificate settle beside
                them reads as the page assembling itself. */}
            <motion.div
              className="mx-auto mt-12 flex w-full max-w-[1240px] items-stretch gap-8"
              variants={bcfStagger(0.16, 0.2)}
              initial="initial"
              animate="animate"
            >
              <motion.div
                /* 400, not 540. The column the artboard leaves is 984px wide,
                   so every pixel the rail gives up is a pixel the certificate
                   and its caption get — the panel goes from 404 to 552, half
                   again as wide, and the caption stops breaking every three
                   words. */
                className="flex w-[400px] shrink-0 flex-col gap-4"
                variants={bcfStagger(0.07, 0)}
              >
                {c.trustCredentials.map((item, index) => {
                  const selected = index === credentialIndex;
                  return (
                    <motion.div key={item.id} variants={bcfRiseCard}>
                    <motion.button
                      type="button"
                      onClick={() => {
                        setCredentialIndex(index);
                        setCredentialPage(0);
                      }}
                      whileTap={BCF_TAP}
                      transition={BCF_TAP_TRANSITION}
                      /* Down a size with the rail, so the labels wrap no more
                         than they did at 540 wide. */
                      className="relative flex w-full transform-gpu items-center justify-between gap-4 overflow-hidden rounded-2xl px-6 py-5 text-start text-[28px] font-medium leading-snug backdrop-blur-md"
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
                {/* A credential with its own `ratio` is framed to the shape of
                    the document; everything else keeps the one tall panel and
                    fills whatever height the row settles at. KRG alone is a
                    slider — one language page at a time, never merged. */}
                <CredentialArtPanel
                  srcs={artSrcs}
                  page={Math.min(credentialPage, artSrcs.length - 1)}
                  onPageChange={setCredentialPage}
                  fit={artFit}
                  pad={artPad}
                  position={artPosition}
                  ratio={artRatio}
                  mat={activeArt?.mat}
                  pageLabel={`${bcfDigits(Math.min(credentialPage, artSrcs.length - 1) + 1, lang)} / ${bcfDigits(artSrcs.length, lang)}`}
                />
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

            <AwardWall images={bcfAwardImages} />
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
  portraitZoom = 1,
  portraitPosition = "50% 0%",
  onClick,
}: {
  name: string;
  role: string;
  /** Screen-reader label only — the card shows an arrow, not this copy. */
  label: string;
  portrait: string;
  /** Scale the plate so waist-up studio shots match head-and-shoulders framing. */
  portraitZoom?: number;
  portraitPosition?: string;
  onClick: () => void;
}) {
  const [pressed, setPressed] = React.useState(false);
  const baseScale = portraitZoom;
  const pressedScale = portraitZoom * 1.06;

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
          className="h-full w-full transform-gpu object-cover transition-transform duration-700 ease-smooth-out motion-reduce:transition-none"
          style={{
            objectPosition: portraitPosition,
            transform: `scale(${pressed ? pressedScale : baseScale})`,
          }}
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

/**
 * The wall of awards, and the fade over its edges.
 *
 * The wall is as tall as it needs to be, up to the room the artboard has for
 * it: on most devices every award fits and nothing scrolls at all. So the fade
 * cannot be painted unconditionally — a mask over a list with nothing below it
 * just dims the last row for no reason, which is what a fixed gradient here
 * did. It is built from the live scroll position instead: a top edge once the
 * list has moved, a bottom edge while anything is still under the fold, and no
 * mask whatsoever when it all fits on screen.
 */
function AwardWall({ images }: { images: string[] }) {
  const wall = React.useRef<HTMLDivElement>(null);
  const [edges, setEdges] = React.useState({ top: false, bottom: false });

  const measure = React.useCallback(() => {
    const el = wall.current;
    if (!el) return;
    /* A few pixels of slack: sub-pixel layout leaves a scrollHeight a hair
       over the clientHeight on lists that do not actually scroll. */
    const slack = el.scrollHeight - el.clientHeight;
    const scrolls = slack > 4;
    const next = {
      top: scrolls && el.scrollTop > 4,
      bottom: scrolls && el.scrollTop < slack - 4,
    };
    setEdges((prev) =>
      prev.top === next.top && prev.bottom === next.bottom ? prev : next,
    );
  }, []);

  React.useEffect(() => {
    measure();
    const el = wall.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    /* Only the box itself needs watching. The plates are sized by their own
       aspect-ratio and the photographs inside them are out of flow, so the
       scroll height is settled at first layout and cannot move when the
       images decode — all that is left to react to is the box changing size
       under a rotation or a resize. */
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure, images]);

  /* Painted on the scroller itself rather than on a wrapper around it: the
     gradient's stops are percentages of the box they are painted on, and only
     the scroller is guaranteed to be exactly the box the visitor is looking
     through. */
  const mask =
    edges.top && edges.bottom
      ? "linear-gradient(to bottom, transparent 0%, #000 72px, #000 calc(100% - 88px), transparent 100%)"
      : edges.top
        ? "linear-gradient(to bottom, transparent 0%, #000 72px)"
        : edges.bottom
          ? "linear-gradient(to bottom, #000 calc(100% - 88px), transparent 100%)"
          : undefined;

  return (
    <motion.div
      ref={wall}
      onScroll={measure}
      /* The height cap is what makes this a scroller at all, and it has to be
         a `max-h` rather than `flex-1`. TrustChrome is a column flex box with
         a `min-height` and no definite height, and in that case a `flex: 1 1
         0%` item has no free space to grow into — it sizes to its content
         instead. With 109 plates that is some 20,000px: the wall stops
         scrolling, the artboard grows to match, and the contain-fit shrinks
         the entire page down to a thin ribbon. */
      className="mx-auto mt-10 grid max-h-[1420px] w-full max-w-[980px] grid-cols-2 gap-6 overflow-y-auto overscroll-contain scrollbar-hide px-2 pb-8"
      style={{ WebkitMaskImage: mask, maskImage: mask }}
      variants={bcfStagger(0.03, 0.1)}
      initial="initial"
      animate="animate"
    >
      {images.map((src, index) => (
        <motion.div
          key={src}
          variants={bcfRiseCard}
          /* White plate: the certificates and plaques are photographed on
             every kind of ground, and a dark card let each one set its own
             apparent size. One white field, one size.

             The photograph is taken out of the flow entirely. Left in it, a
             tall portrait certificate could outgrow the 4:3 box — `max-h-full`
             is a percentage of a height the box only derives from its own
             aspect-ratio, which WebKit declines to resolve — and that one
             plate grew while the plate beside it stayed at 4:3. Absolute means
             the ratio is the only thing that can set the height, so every
             plate in the wall is identical on every engine. */
          className="relative aspect-[4/3] w-full transform-gpu overflow-hidden rounded-[24px] border border-white/14 bg-white"
          style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.42)" }}
        >
          <img
            src={src}
            alt=""
            decoding="async"
            loading={index < 6 ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-contain p-6"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

function CredentialArtPanel({
  srcs,
  page,
  onPageChange,
  fit,
  pad,
  position,
  ratio,
  mat,
  pageLabel,
}: {
  srcs: string[];
  page: number;
  onPageChange: (page: number) => void;
  fit: "cover" | "contain";
  pad: string;
  position: string;
  ratio?: number;
  mat?: "white";
  pageLabel: string;
}) {
  /** Only KRG ships more than one scan — that is the sole slider case. */
  const isSlider = srcs.length > 1;
  const safePage = Math.max(0, Math.min(page, srcs.length - 1));
  const src = srcs[safePage] ?? srcs[0];
  const dragRef = React.useRef({ x: 0, active: false });

  const blockSave = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const onPointerDown = (event: React.PointerEvent) => {
    if (!isSlider) return;
    dragRef.current = { x: event.clientX, active: true };
  };

  const onPointerUp = (event: React.PointerEvent) => {
    if (!isSlider || !dragRef.current.active) return;
    const dx = event.clientX - dragRef.current.x;
    dragRef.current.active = false;
    if (Math.abs(dx) < 48) return;
    if (dx < 0 && safePage < srcs.length - 1) onPageChange(safePage + 1);
    if (dx > 0 && safePage > 0) onPageChange(safePage - 1);
  };

  return (
    <div
      className={`relative overflow-hidden touch-pan-y ${
        ratio ? "w-full shrink-0" : "min-h-[760px] flex-1"
      }`}
      style={{
        aspectRatio: ratio,
        backgroundColor: fit === "contain" && mat === "white" ? "#fff" : "#111",
      }}
      onContextMenu={blockSave}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        dragRef.current.active = false;
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={src}
          src={src}
          alt=""
          decoding="async"
          draggable={false}
          onDragStart={blockSave}
          onContextMenu={blockSave}
          className={
            fit === "cover"
              ? `absolute inset-0 h-full w-full select-none object-cover ${position}`
              : `absolute inset-0 h-full w-full select-none object-contain ${pad}`
          }
          style={{ WebkitUserDrag: "none", userSelect: "none", pointerEvents: "none" }}
          initial={{ opacity: 0, x: isSlider ? 28 : 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isSlider ? -28 : 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      {isSlider ? (
        <>
          <button
            type="button"
            aria-label="Previous document"
            disabled={safePage <= 0}
            onClick={() => onPageChange(safePage - 1)}
            className="absolute start-5 top-1/2 z-10 grid h-16 w-16 -translate-y-1/2 place-items-center rounded-full disabled:opacity-25"
            style={{
              backgroundColor: "rgba(4,6,9,0.72)",
              border: `1.5px solid ${BCF.gold}88`,
              color: BCF.cream,
              boxShadow: `0 8px 24px rgba(0,0,0,0.35)`,
            }}
          >
            <ChevronLeft className="h-9 w-9 rtl:rotate-180" strokeWidth={2.4} />
          </button>
          <button
            type="button"
            aria-label="Next document"
            disabled={safePage >= srcs.length - 1}
            onClick={() => onPageChange(safePage + 1)}
            className="absolute end-5 top-1/2 z-10 grid h-16 w-16 -translate-y-1/2 place-items-center rounded-full disabled:opacity-25"
            style={{
              backgroundColor: "rgba(4,6,9,0.72)",
              border: `1.5px solid ${BCF.gold}88`,
              color: BCF.cream,
              boxShadow: `0 8px 24px rgba(0,0,0,0.35)`,
            }}
          >
            <ChevronRight className="h-9 w-9 rtl:rotate-180" strokeWidth={2.4} />
          </button>
          <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex flex-col items-center gap-3">
            <div className="pointer-events-auto flex items-center gap-2.5">
              {srcs.map((slideSrc, index) => (
                <button
                  key={slideSrc}
                  type="button"
                  aria-label={`Document ${index + 1}`}
                  onClick={() => onPageChange(index)}
                  className="h-3 rounded-full transition-all duration-300"
                  style={{
                    width: index === safePage ? 44 : 14,
                    backgroundColor:
                      index === safePage ? BCF.goldBright : "rgba(4,6,9,0.4)",
                    boxShadow:
                      index === safePage
                        ? `0 0 0 2px ${BCF.gold}`
                        : "0 0 0 1px rgba(255,255,255,0.55)",
                  }}
                />
              ))}
            </div>
            <span
              className="rounded-full px-5 py-2 text-[20px] font-medium"
              style={{
                backgroundColor: "rgba(4,6,9,0.72)",
                color: BCF.cream,
                border: `1px solid ${BCF.gold}55`,
              }}
            >
              {pageLabel}
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
}

function TrustChrome({
  title,
  backLabel,
  onBack,
  children,
  /**
   * Trust's four screens share one heading size. Quality and Credibility is
   * the one that cannot hold it: the longest title of the four, over the only
   * screen with a full-height panel under it, so 64px pushes the certificate
   * down the artboard. It asks for a step down; the rest are unaffected.
   */
  titleClassName = "text-[64px]",
}: {
  title: React.ReactNode;
  backLabel: string;
  onBack: () => void;
  children: React.ReactNode;
  titleClassName?: string;
}) {
  return (
    <div className="relative flex min-h-[1920px] flex-col px-12 pb-16 pt-28">
      <BcfBackButton onClick={onBack} label={backLabel} />
      <motion.h1
        className={`mx-auto max-w-[980px] text-center font-bold leading-tight ${titleClassName}`}
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
