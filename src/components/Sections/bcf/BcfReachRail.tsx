import { motion } from "motion/react";
import { Globe2, HeartHandshake, Home } from "lucide-react";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  BCF_TAP_FIRM,
  BCF_TAP_TRANSITION,
} from "@/components/Sections/bcf/bcfMotion";

type BcfReachRailProps = {
  homeLabel: string;
  languageLabel: string;
  donateLabel: string;
  /** Home is meaningless before the journey starts, so it is optional. */
  onHome?: () => void;
  onLanguage: () => void;
  onDonate: () => void;
  /** True on the chapter menu — Home is where the visitor already is. */
  homeActive?: boolean;
};

/**
 * Persistent controls, in the top-right corner.
 *
 * Before this, the only way to change language was to walk the whole experience
 * back to the second screen, and the only way home was to press back once per
 * chapter. Both now live in one place that never moves between screens — the
 * thing that makes an experience feel navigable rather than merely animated.
 *
 * A row, not a column. Stacked under the back button the rail reached 300px
 * down the right edge, which is the depth every page title has to start below
 * — and in Kurdish and Arabic, where the title begins at that edge, the two
 * simply printed over each other. Laid out sideways the whole of the chrome is
 * one 76px band across the top of the artboard, and the corner buttons are the
 * same circle as the back control now facing them from the other side.
 */
export default function BcfReachRail({
  homeLabel,
  languageLabel,
  donateLabel,
  onHome,
  onLanguage,
  onDonate,
  homeActive = false,
}: BcfReachRailProps) {
  const items = [
    onHome
      ? {
          key: "home",
          label: homeLabel,
          icon: Home,
          onClick: onHome,
          active: homeActive,
        }
      : null,
    {
      key: "language",
      label: languageLabel,
      icon: Globe2,
      onClick: onLanguage,
      active: false,
    },
    {
      key: "donate",
      label: donateLabel,
      icon: HeartHandshake,
      onClick: onDonate,
      active: false,
    },
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <motion.nav
      aria-label="Experience controls"
      // The rail stays mounted across screens, so it never re-announces itself
      // on a navigation.
      // `right-10`, not `end-10`: it is pinned to the physical right in every
      // language, the way the back control is pinned to the physical left, so
      // the two corners never trade places under an RTL title.
      className="absolute right-10 top-10 z-40 flex items-center gap-3"
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: BCF_EASE, delay: 0.3 }}
    >
      {items.map(({ key, label, icon: Icon, onClick, active }) => (
        <motion.button
          key={key}
          type="button"
          onClick={onClick}
          aria-label={label}
          aria-current={active ? "page" : undefined}
          whileTap={BCF_TAP_FIRM}
          transition={BCF_TAP_TRANSITION}
          className="grid h-[76px] w-[76px] place-items-center rounded-full border backdrop-blur-md transition-colors duration-300"
          style={{
            borderColor: active ? `${BCF.gold}80` : `${BCF.gold}59`,
            backgroundColor: active ? `${BCF.gold}1f` : "rgba(6,9,12,0.45)",
            boxShadow: "0 10px 34px rgba(0,0,0,0.45)",
          }}
        >
          <Icon
            className="h-9 w-9"
            strokeWidth={1.5}
            style={{ color: active ? BCF.goldBright : BCF.sand }}
          />
        </motion.button>
      ))}
    </motion.nav>
  );
}
