import React from "react";
import type { DiscoverLangCode } from "@/components/Sections/discoverLanguage";
import {
  animateDiscoverLanguageIn,
  animateDiscoverLanguageOut,
} from "@/components/Sections/discoverLanguageAnimation";

export function useDiscoverLanguageTransition(
  sectionRef: React.RefObject<HTMLElement | null>,
  lang: DiscoverLangCode,
  onLanguageChange?: (lang: DiscoverLangCode) => void,
  introDone = false,
) {
  const langChangedRef = React.useRef(false);
  const prevLangRef = React.useRef(lang);

  React.useLayoutEffect(() => {
    if (!introDone || !sectionRef.current) return;
    if (!langChangedRef.current) {
      prevLangRef.current = lang;
      return;
    }
    if (prevLangRef.current === lang) return;

    const tween = animateDiscoverLanguageIn(sectionRef.current);
    prevLangRef.current = lang;
    return () => {
      tween.kill();
    };
  }, [lang, introDone, sectionRef]);

  const handleLanguageSelect = React.useCallback(
    (code: DiscoverLangCode) => {
      if (code === lang || !sectionRef.current) return;
      animateDiscoverLanguageOut(sectionRef.current, () => {
        langChangedRef.current = true;
        onLanguageChange?.(code);
      });
    },
    [lang, onLanguageChange, sectionRef],
  );

  return handleLanguageSelect;
}
