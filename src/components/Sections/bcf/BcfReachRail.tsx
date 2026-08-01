import { motion } from "motion/react";
import { Globe2, Home } from "lucide-react";
import { BCF } from "@/components/Sections/bcf/bcfTheme";
import {
  BCF_EASE,
  BCF_TAP_FIRM,
  BCF_TAP_TRANSITION,
} from "@/components/Sections/bcf/bcfMotion";

type BcfReachRailProps = {
  homeLabel: string;
  languageLabel: string;
  /** Home is meaningless before the journey starts, so it is optional. */
  onHome?: () => void;
  onLanguage: () => void;
  /** True on the chapter menu — Home is where the visitor already is. */
  homeActive?: boolean;
  /**
   * Screens that draw their own back control need the rail to start below it.
   * Everything else starts at the same top inset the back control uses.
   */
  offsetForBackButton?: boolean;
};

/**
 * Persistent controls, stacked under the back button in the top-right corner.
 *
 * Before this, the only way to change language was to walk the whole experience
 * back to the second screen, and the only way home was to press back once per
 * chapter. Both now live in one place that never moves between screens — the
 * thing that makes an experience feel navigable rather than merely animated.
 */
export default function BcfReachRail({
  homeLabel,
  languageLabel,
  onHome,
  onLanguage,
  homeActive = false,
  offsetForBackButton = true,
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
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <motion.nav
      aria-label="Experience controls"
      // The rail stays mounted across screens and slides between its two
      // insets, so it never re-announces itself on a navigation.
      // `right-10`, not `end-10`: the back control this stacks under is itself
      // pinned right in every language, so the pair must not split in RTL.
      className="absolute right-10 z-40 flex flex-col items-center gap-3 rounded-full border p-3 backdrop-blur-md transition-[top] duration-500 ease-smooth-out"
      style={{
        top: offsetForBackButton ? 148 : 40,
        borderColor: `${BCF.gold}2e`,
        backgroundColor: "rgba(6,9,12,0.42)",
        boxShadow: "0 10px 34px rgba(0,0,0,0.4)",
      }}
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
          className="grid h-[76px] w-[76px] place-items-center rounded-full border transition-colors duration-300"
          style={{
            borderColor: active ? `${BCF.gold}80` : "transparent",
            backgroundColor: active ? `${BCF.gold}1f` : "transparent",
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
