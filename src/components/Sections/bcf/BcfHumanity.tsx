import React from "react";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { X } from "lucide-react";
import BcfShell, { BcfBackButton } from "@/components/Sections/bcf/BcfShell";
import BcfChapterPill from "@/components/Sections/bcf/BcfChapterPill";
import {
  bcfCopy,
  type BcfLang,
  type ServeCategory,
  type ServeCategoryId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF, BCF_GLASS_CARD } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  BCF_TAP,
  BCF_TAP_TRANSITION,
  bcfDrawX,
  bcfRise,
  bcfStagger,
} from "@/components/Sections/bcf/bcfMotion";
import { type SectorId } from "@/components/Sections/bcf/bcfProjectData";
import { BCF_SECTOR_ICONS } from "@/components/Sections/bcf/bcfSectorMeta";
import { bcfTrustBg } from "@/components/Sections/bcf/bcfAssets";
import foodImg from "@/assets/images/bcf/from-source/humanity-food.webp";
import healthImg from "@/assets/images/bcf/from-source/humanity-health.webp";
import educationImg from "@/assets/images/bcf/from-source/humanity-education.webp";
import environmentImg from "@/assets/images/bcf/from-source/humanity-environment.webp";
import cashImg from "@/assets/images/bcf/from-source/humanity-cash.webp";
import shelterImg from "@/assets/images/bcf/from-source/humanity-shelter.webp";
import campImg from "@/assets/images/bcf/from-source/humanity-camp.webp";
import washImg from "@/assets/images/bcf/from-source/humanity-wash.webp";
import nfiImg from "@/assets/images/bcf/from-source/humanity-nfi.webp";
import protectionImg from "@/assets/images/bcf/from-source/humanity-protection.webp";
import livelihoodImg from "@/assets/images/bcf/from-source/humanity-livelihood.webp";
import rehabilitationImg from "@/assets/images/bcf/from-source/humanity-rehab.webp";

type BcfHumanityProps = {
  lang: BcfLang;
  onBack: () => void;
};

const categoryImages: Record<ServeCategoryId, string> = {
  food: foodImg,
  health: healthImg,
  education: educationImg,
  shelter: shelterImg,
  wash: washImg,
  camp: campImg,
  nfi: nfiImg,
  rehabilitation: rehabilitationImg,
  protection: protectionImg,
  livelihood: livelihoodImg,
  cash: cashImg,
  environment: environmentImg,
};

/**
 * The sector a card corresponds to in the project register, so the dialog can
 * reuse the register's icon. Only `rehabilitation` differs by name — the
 * register calls that work `disability`.
 */
const categorySectors: Record<ServeCategoryId, SectorId> = {
  food: "food",
  health: "health",
  education: "education",
  shelter: "shelter",
  wash: "wash",
  camp: "camp",
  nfi: "nfi",
  rehabilitation: "disability",
  protection: "protection",
  livelihood: "livelihood",
  cash: "cash",
  environment: "environment",
};

/**
 * Figma Who We Serve (50789:12 → 50791:208):
 * 600px cards, 64px gap; inactive y=112 / h=575; active y=0 / h=799 with tags.
 * Strip slides so the active card stays centered (Smart Animate).
 *
 * The active card is taller than the Figma frame because it now carries the
 * sector's framing line and the cue into its dialog, where it used to carry two
 * tags — twelve sectors each have detail behind them, and a card that opens
 * something has to say so.
 */
const CARD_W = 600;
const CARD_GAP = 64;
const CARD_PITCH = CARD_W + CARD_GAP;
const ACTIVE_H = 760;
const INACTIVE_H = 620;
const INACTIVE_Y = 70;
const TRACK_H = ACTIVE_H;
/** Figma Smart Animate default ≈ Ease In And Out @ 400ms */
const ANIM_DURATION = 0.4;
const ANIM_EASE = "power1.inOut";

export default function BcfHumanity({ lang, onBack }: BcfHumanityProps) {
  const c = bcfCopy[lang];
  const chapterTitle =
    c.journeyChapters.find((chapter) => chapter.id === "humanity")?.title ??
    c.journeyChapters[1].title;
  const categories = c.serveCategories;
  const initialIndex = 0;

  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const cardRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const tagRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = React.useRef(initialIndex);
  const dragRef = React.useRef({ startX: 0, baseX: 0, dragging: false, moved: false });
  /**
   * React mirror of `activeIndexRef`, for the position rail only. The ref stays
   * the source of truth during a tween so a re-render never fights GSAP for the
   * card transforms.
   */
  const [dotIndex, setDotIndex] = React.useState(initialIndex);
  /** The sector whose dialog is open, or null. Tapping the centred card opens it. */
  const [detailId, setDetailId] = React.useState<ServeCategoryId | null>(null);
  const detail = detailId
    ? (categories.find((cat) => cat.id === detailId) ?? null)
    : null;

  const trackXForIndex = React.useCallback((index: number, viewportWidth: number) => {
    const center = viewportWidth / 2;
    return center - (index * CARD_PITCH + CARD_W / 2);
  }, []);

  const animateToIndex = React.useCallback(
    (nextIndex: number, immediate = false) => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;

      const clamped = Math.max(0, Math.min(categories.length - 1, nextIndex));
      activeIndexRef.current = clamped;
      setDotIndex(clamped);

      const x = trackXForIndex(clamped, viewport.clientWidth);
      const duration = immediate ? 0 : ANIM_DURATION;

      // GSAP owns x / y / height / tags — avoid React style fighting mid-tween.
      gsap.to(track, {
        x,
        duration,
        ease: ANIM_EASE,
        overwrite: "auto",
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const active = i === clamped;
        gsap.to(card, {
          y: active ? 0 : INACTIVE_Y,
          height: active ? ACTIVE_H : INACTIVE_H,
          duration,
          ease: ANIM_EASE,
          overwrite: "auto",
          boxShadow: active
            ? "0px 0px 20px 4px rgba(251,178,47,0.25)"
            : "0px 0px 0px 0px rgba(251,178,47,0)",
        });
      });

      tagRefs.current.forEach((tags, i) => {
        if (!tags) return;
        const active = i === clamped;
        gsap.to(tags, {
          autoAlpha: active ? 1 : 0,
          y: active ? 0 : 12,
          duration: immediate ? 0 : ANIM_DURATION * 0.9,
          ease: active ? "power2.out" : "power1.in",
          overwrite: "auto",
        });
      });
    },
    [categories.length, trackXForIndex],
  );

  React.useLayoutEffect(() => {
    animateToIndex(initialIndex, true);
  }, [animateToIndex, initialIndex, lang]);

  /** A dialog left open across a language switch would keep the old copy. */
  React.useEffect(() => {
    setDetailId(null);
  }, [lang]);

  React.useEffect(() => {
    const onResize = () => animateToIndex(activeIndexRef.current, true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [animateToIndex]);

  const onPointerDown = (event: React.PointerEvent) => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    dragRef.current = {
      startX: event.clientX,
      baseX: gsap.getProperty(track, "x") as number,
      dragging: true,
      moved: false,
    };
    viewport.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!dragRef.current.dragging || !trackRef.current) return;
    const dx = event.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 8) dragRef.current.moved = true;
    gsap.set(trackRef.current, { x: dragRef.current.baseX + dx });
  };

  const onPointerUp = (event: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    const dx = event.clientX - dragRef.current.startX;
    const threshold = 80;
    if (dx < -threshold) {
      animateToIndex(activeIndexRef.current + 1);
    } else if (dx > threshold) {
      animateToIndex(activeIndexRef.current - 1);
    } else {
      animateToIndex(activeIndexRef.current);
    }
  };

  return (
    <BcfShell
      showLogo={false}
      backgroundImage={bcfTrustBg}
      overlayClassName="bg-black/35"
    >
      <div className="relative flex min-h-[1920px] flex-col overflow-hidden pt-24">
        {/* Subtle dot field behind the carousel (Figma Mini Dots). */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[520px] h-[900px] opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(251,178,47,0.35) 1.5px, transparent 1.6px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 55% 50% at 50% 50%, black, transparent 75%)",
          }}
        />

        <BcfBackButton onClick={onBack} label={c.back} />

        <motion.div
          className="relative z-10 px-14"
          variants={bcfStagger(0.1, 0.18)}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={bcfRise}>
            <BcfChapterPill title={chapterTitle} />
          </motion.div>

          <div className="mt-10 max-w-[1080px]">
            <motion.h1
              variants={bcfRise}
              className="text-[64px] font-bold leading-[1.05]"
            >
              <span className="text-[#fbf4e4]">{c.whoWeServeWhite} </span>
              <span style={{ color: BCF.gold }}>{c.whoWeServeGold}</span>
            </motion.h1>
            <motion.p
              variants={bcfRise}
              className="mt-5 max-w-[860px] text-[26px] leading-relaxed text-white/70"
            >
              {c.whoHowHint}
            </motion.p>
            <motion.span
              variants={bcfDrawX}
              className="mt-6 block h-px w-[420px] origin-left"
              style={{
                background: `linear-gradient(90deg, ${BCF.gold}, transparent)`,
              }}
            />
          </div>

          <motion.div
            variants={bcfRise}
            className="mt-8 grid grid-cols-2 gap-6"
          >
            <ServeListCard title={c.whoServesTitle} items={c.whoServesItems} />
            <ServeListCard title={c.howServesTitle} items={c.howServesItems} />
          </motion.div>
        </motion.div>

        {/* The carousel and its rail take the leftover height as one block, so
            the screen no longer ends on 400px of empty field. */}
        <div className="relative z-10 flex flex-1 flex-col justify-center">
        <motion.div
          ref={viewportRef}
          dir="ltr"
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 h-[820px] w-full touch-pan-y overflow-hidden"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            ref={trackRef}
            dir="ltr"
            className="absolute top-0 flex flex-row will-change-transform"
            style={{ height: TRACK_H, gap: CARD_GAP }}
          >
            {categories.map((category, index) => (
              <button
                key={category.id}
                type="button"
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                data-serve={category.id}
                aria-label={
                  index === dotIndex
                    ? `${category.title} — ${c.serveDetailCta}`
                    : category.title
                }
                onClick={() => {
                  if (dragRef.current.moved) return;
                  // The centred card is already chosen; tapping it again is the
                  // request for its detail. Any other card just comes forward.
                  if (index === activeIndexRef.current) {
                    setDetailId(category.id);
                    return;
                  }
                  animateToIndex(index);
                }}
                className="relative flex shrink-0 flex-col items-center overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] text-center backdrop-blur-[2px]"
                style={{
                  width: CARD_W,
                  height: index === initialIndex ? ACTIVE_H : INACTIVE_H,
                  transform:
                    index === initialIndex
                      ? "translateY(0px)"
                      : `translateY(${INACTIVE_Y}px)`,
                }}
              >
                <span className="relative block h-[500px] w-full shrink-0 overflow-hidden">
                  <img
                    src={categoryImages[category.id]}
                    alt=""
                    className="h-full w-full object-cover object-center"
                    draggable={false}
                  />
                  {/* Warm floor under the photo so the card edge does not cut a
                      bright image dead against the dark field. */}
                  <span
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(4,7,10,0) 70%, rgba(4,7,10,0.35) 100%)",
                    }}
                  />
                </span>

                {/* Twelve sector names, several of them four words long, cannot
                    hold the 64px display size the five-card strip used. */}
                <span
                  dir={lang === "en" ? "ltr" : "rtl"}
                  className="mt-6 block px-6 text-[38px] font-bold leading-[1.14] text-white"
                >
                  {category.title}
                </span>

                <div
                  ref={(el) => {
                    tagRefs.current[index] = el;
                  }}
                  dir={lang === "en" ? "ltr" : "rtl"}
                  className="mt-auto flex w-full flex-col items-center px-6 pb-7"
                  style={{ opacity: 0, visibility: "hidden" }}
                >
                  <span
                    className="inline-flex items-center gap-3 rounded-full border px-8 py-3.5 text-[22px] font-medium"
                    style={{
                      borderColor: `${BCF.gold}66`,
                      backgroundColor: "rgba(251,193,88,0.12)",
                      color: BCF.cream,
                    }}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: BCF.goldBright }}
                    />
                    {c.serveDetailCta}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Position rail — a strip of twelve cards with no indicator gives the
            visitor no idea there is more to the side, or how much. */}
        <motion.div
          className="relative z-10 mt-10 flex items-center justify-center gap-4"
          dir="ltr"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {categories.map((category, index) => (
            <button
              key={`dot-${category.id}`}
              type="button"
              aria-label={category.title}
              onClick={() => animateToIndex(index)}
              className="h-3 rounded-full transition-all duration-500 ease-smooth-out"
              style={{
                width: index === dotIndex ? 64 : 24,
                backgroundColor:
                  index === dotIndex ? BCF.goldBright : "rgba(255,255,255,0.24)",
              }}
            />
          ))}
        </motion.div>
        </div>

        <ServeDetailDialog
          lang={lang}
          category={detail}
          onClose={() => setDetailId(null)}
        />
      </div>
    </BcfShell>
  );
}

/**
 * The modal is both an animating element and the stagger parent for its own
 * heading, figures and photo, so it drives its children by variant label —
 * matching the Future We Build dialog.
 */
const DIALOG_CARD = {
  initial: { opacity: 0, scale: 0.94, y: 30 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: BCF_EASE,
      staggerChildren: 0.06,
      delayChildren: 0.12,
    },
  },
  exit: { opacity: 0, scale: 0.96, y: 18, transition: { duration: 0.22 } },
};

/**
 * A sector's detail, over the strip rather than on a page of its own: a visitor
 * who taps one of twelve cards is asking a question about that card, and
 * answering it in place keeps the other eleven a tap away.
 */
function ServeDetailDialog({
  lang,
  category,
  onClose,
}: {
  lang: BcfLang;
  category: ServeCategory | null;
  onClose: () => void;
}) {
  const c = bcfCopy[lang];
  const Icon = category ? BCF_SECTOR_ICONS[categorySectors[category.id]] : null;

  return (
    <AnimatePresence>
      {category ? (
        <motion.div
          className="absolute inset-0 z-40 flex items-center justify-center px-14 backdrop-blur-[3px]"
          initial={{ opacity: 0, backgroundColor: "rgba(0,0,0,0)" }}
          animate={{ opacity: 1, backgroundColor: "rgba(4,6,9,0.62)" }}
          exit={{ opacity: 0, backgroundColor: "rgba(0,0,0,0)" }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className={`${BCF_GLASS_CARD} relative flex max-h-[1560px] w-full max-w-[980px] flex-col overflow-hidden p-14`}
            role="dialog"
            aria-modal="true"
            aria-label={category.title}
            dir={lang === "en" ? "ltr" : "rtl"}
            onClick={(event) => event.stopPropagation()}
            variants={DIALOG_CARD}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ boxShadow: "0 40px 110px rgba(0,0,0,0.62)" }}
          >
            <motion.button
              type="button"
              onClick={onClose}
              whileTap={BCF_TAP}
              transition={BCF_TAP_TRANSITION}
              className="absolute end-10 top-10 grid h-14 w-14 transform-gpu place-items-center rounded-full border border-white/30 bg-black/40"
              aria-label={c.close}
            >
              <X className="h-7 w-7 text-white" />
            </motion.button>

            <motion.div
              variants={bcfRise}
              className="flex shrink-0 items-center gap-6 pe-20"
            >
              <span
                className="grid h-[92px] w-[92px] shrink-0 place-items-center rounded-full border-2"
                style={{
                  borderColor: `${BCF.gold}80`,
                  backgroundColor: "rgba(251,193,88,0.10)",
                }}
              >
                {Icon ? <Icon className="h-11 w-11" style={{ color: BCF.gold }} /> : null}
              </span>
              <h2
                className="text-[50px] font-bold leading-[1.1]"
                style={{ color: BCF.gold }}
              >
                {category.title}
              </h2>
            </motion.div>

            <motion.span
              variants={bcfDrawX}
              className="mt-8 block h-px w-full shrink-0 origin-left"
              style={{ background: `linear-gradient(90deg, ${BCF.gold}, transparent)` }}
            />

            {/* The longest sectors run to two groups of nine lines; the body
                scrolls so a dialog never grows past the panel. */}
            <div className="mt-8 min-h-0 flex-1 overflow-y-auto overscroll-contain pe-2">
              <motion.p
                variants={bcfRise}
                className={`text-[28px] text-[#fdeed4] ${
                  lang === "en" ? "leading-relaxed" : "leading-[1.8]"
                }`}
              >
                {category.intro}
              </motion.p>

              {category.groups.map((group) => (
                <motion.section key={group.title} variants={bcfRise} className="mt-10">
                  <h3
                    className="text-[26px] font-semibold uppercase tracking-[0.06em]"
                    style={{ color: BCF.nature }}
                  >
                    {group.title}
                  </h3>
                  <ul className="mt-5 flex flex-col gap-4">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className={`flex items-start gap-5 text-[27px] text-white/85 ${
                          lang === "en" ? "leading-snug" : "leading-[1.7]"
                        }`}
                      >
                        <span
                          className="mt-3 h-3 w-3 shrink-0 rounded-full"
                          style={{ backgroundColor: BCF.goldBright }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.section>
              ))}

              {/* The wall text closes the dialog, set apart from the register
                  lines above it — it is the sentence meant to be read, not
                  counted. */}
              {category.headline ? (
                <motion.p
                  variants={bcfRise}
                  className={`mt-10 border-s-2 ps-8 text-[30px] ${
                    lang === "en" ? "leading-relaxed" : "leading-[1.8]"
                  }`}
                  style={{ borderColor: BCF.gold, color: BCF.sand }}
                >
                  {category.headline}
                </motion.p>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ServeListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div
      className={`${BCF_GLASS_CARD} flex flex-col gap-5 p-8`}
      style={{ boxShadow: "0 18px 48px rgba(0,0,0,0.4)" }}
    >
      <h2
        className="text-[28px] font-semibold uppercase tracking-[0.08em]"
        style={{ color: BCF.gold }}
      >
        {title}
      </h2>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-4 text-[24px] leading-snug text-[#fdeed4]"
          >
            <span
              className="mt-[13px] h-[2px] w-7 shrink-0 rounded-full"
              style={{ backgroundColor: BCF.gold }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
