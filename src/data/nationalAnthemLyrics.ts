/**
 * Ey Reqîb — word-timed karaoke lyrics synced to national-anthem.mp3 (~53.75s)
 * and national-anthem.srt phrase windows. Words appear one-by-one; repeats are
 * separate tokens (e.g. زیندووە / زیندووە).
 */

export type AnthemLang = "ku" | "en" | "ar";

export type AnthemLyricLine = {
  start: number;
  end: number;
  /** Word tokens in singing order — duplicates are intentional when sung twice. */
  words: Record<AnthemLang, string[]>;
};

/** Phrase windows from national-anthem.srt, split into lines for word timing. */
export const ANTHEM_LYRIC_LINES: AnthemLyricLine[] = [
  // Cue 1 — line 1
  {
    start: 7.44,
    end: 14.275,
    words: {
      ku: ["ئەی", "ڕەقیب", "ھەر", "ماوە", "قەومی", "کورد", "زمان"],
      en: ["Oh", "foes", "who", "watch", "us,", "the", "nation", "whose", "language", "is", "Kurdish", "is", "alive"],
      ar: ["أيها", "الرقيب،", "سيبقى", "الكرد", "بلغتهم", "وأمتهم", "باقون", "للأبد"],
    },
  },
  // Cue 1 — line 2
  {
    start: 14.275,
    end: 21.11,
    words: {
      ku: ["نایشکێنێ", "دانەری", "تۆپی", "زەمان"],
      en: ["It", "cannot", "be", "defeated", "by", "makers", "of", "weapons", "of", "any", "time"],
      ar: ["لا", "تقهرهم", "ولا", "تمحوهم", "مدافع", "الزمان"],
    },
  },
  // Cue 2 — line 1 (زیندووە once here)
  {
    start: 21.44,
    end: 25.44,
    words: {
      ku: ["کەس", "نەڵێ", "کورد", "مردووە", "کورد", "زیندووە"],
      en: ["Let", "no", "one", "say", "the", "Kurds", "are", "dead,", "the", "Kurds", "are", "alive"],
      ar: ["لا", "يقل", "أحد", "أن", "الكرد", "زائلون،", "إن", "الكرد", "باقون"],
    },
  },
  // Cue 2 — line 2 (زیندووە again — sung twice)
  {
    start: 25.44,
    end: 29.44,
    words: {
      ku: ["زیندووە", "قەت", "نانەوێ", "ئاڵاکەمان"],
      en: ["The", "Kurds", "are", "alive", "and", "their", "flag", "will", "never", "fall"],
      ar: ["باقون", "ورايتنا", "الخفاقة", "الشامخة", "إلى", "الأبد"],
    },
  },
  // Cue 3 — line 1
  {
    start: 29.44,
    end: 41.595,
    words: {
      ku: ["ئێمە", "ڕۆڵەی", "میدیا", "و", "کەیخوسرەوین"],
      en: ["We", "are", "the", "sons", "of", "the", "Medes", "and", "Kai", "Khosrow"],
      ar: ["نحن", "أبناء", "الميديين", "وكي", "خسرو"],
    },
  },
  // Cue 3 — line 2
  {
    start: 41.595,
    end: 53.75,
    words: {
      ku: ["دینمان", "ئایینمان", "ھەر", "نیشتمان"],
      en: ["Our", "homeland", "is", "our", "faith", "and", "religion"],
      ar: ["ديننا", "إيماننا", "هو", "الوطن"],
    },
  },
];

export type AnthemKaraokeWord = {
  text: string;
  /** True for the word currently being sung. */
  current: boolean;
};

export type AnthemKaraokeLine = {
  words: AnthemKaraokeWord[];
};

function wordStart(line: AnthemLyricLine, index: number, count: number): number {
  if (count <= 0) return line.start;
  return line.start + ((line.end - line.start) * index) / count;
}

/**
 * Returns karaoke lines with only words that have started by `time`.
 * Empty / null when nothing should show yet (intro) or after the last line ends.
 */
export function getAnthemKaraokeAt(time: number, lang: AnthemLang): AnthemKaraokeLine[] | null {
  if (time < ANTHEM_LYRIC_LINES[0].start) return null;

  const last = ANTHEM_LYRIC_LINES[ANTHEM_LYRIC_LINES.length - 1];
  if (time >= last.end) {
    // Hold the final line fully revealed until audio ends.
    return [
      {
        words: last.words[lang].map((text, i, arr) => ({
          text,
          current: i === arr.length - 1,
        })),
      },
    ];
  }

  // Show the active line (and keep the previous line of the same couplet if still in window).
  const activeIndex = ANTHEM_LYRIC_LINES.findIndex((line) => time >= line.start && time < line.end);
  if (activeIndex < 0) return null;

  const coupletStart = activeIndex % 2 === 0 ? activeIndex : activeIndex - 1;
  const result: AnthemKaraokeLine[] = [];

  for (let li = coupletStart; li <= activeIndex; li++) {
    const line = ANTHEM_LYRIC_LINES[li];
    const tokens = line.words[lang];
    const visible: AnthemKaraokeWord[] = [];

    for (let i = 0; i < tokens.length; i++) {
      const start = wordStart(line, i, tokens.length);
      if (time < start) break;
      const nextStart = i + 1 < tokens.length ? wordStart(line, i + 1, tokens.length) : line.end;
      visible.push({
        text: tokens[i],
        current: time >= start && time < nextStart,
      });
    }

    if (visible.length) {
      // If this is a completed prior line in the couplet, no word is "current".
      if (li < activeIndex) {
        visible.forEach((w) => {
          w.current = false;
        });
      } else if (!visible.some((w) => w.current) && visible.length) {
        visible[visible.length - 1].current = true;
      }
      result.push({ words: visible });
    }
  }

  return result.length ? result : null;
}

/** @deprecated Prefer getAnthemKaraokeAt — kept for any leftover call sites. */
export function getAnthemLyricAt(time: number, lang: AnthemLang): [string, string] | null {
  const karaoke = getAnthemKaraokeAt(time, lang);
  if (!karaoke?.length) return null;
  const lines = karaoke.map((l) => l.words.map((w) => w.text).join(" "));
  return [lines[0] ?? "", lines[1] ?? ""];
}
