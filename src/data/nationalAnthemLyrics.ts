/**
 * Ey Reqîb — word-timed karaoke lyrics synced to national-anthem.mp3 (~53.75s).
 * Each word has its own start/end so repeats (زیندووە, کورد, …) stay distinct.
 * Word `start` values within a line must be strictly increasing.
 */

export type AnthemLang = "ku" | "en" | "ar";

export type WordToken = {
  text: string;
  start: number;
  end: number;
};

export type AnthemLyricLine = {
  start: number;
  end: number;
  words: Record<AnthemLang, WordToken[]>;
};

/**
 * Non-overlapping line windows. Within each language array, word starts
 * must increase so karaoke can reveal one token at a time.
 */
export const ANTHEM_LYRIC_LINES: AnthemLyricLine[] = [
  // Cue 1 — line 1
  {
    start: 7.44,
    end: 12.6,
    words: {
      ku: [
        { text: "ئەی", start: 7.44, end: 7.8 },
        { text: "ڕەقیب", start: 7.8, end: 8.6 },
        { text: "ھەر", start: 8.6, end: 9.4 },
        { text: "ماوە", start: 9.4, end: 10.2 },
        { text: "قەومی", start: 10.2, end: 11.0 },
        { text: "کورد", start: 11.0, end: 11.8 },
        { text: "زمان", start: 11.8, end: 12.6 },
      ],
      en: [
        { text: "Oh", start: 7.44, end: 7.9 },
        { text: "foes", start: 7.9, end: 8.4 },
        { text: "who", start: 8.4, end: 8.9 },
        { text: "watch", start: 8.9, end: 9.4 },
        { text: "us,", start: 9.4, end: 10.0 },
        { text: "the", start: 10.0, end: 10.5 },
        { text: "nation", start: 10.5, end: 11.0 },
        { text: "whose", start: 11.0, end: 11.4 },
        { text: "language", start: 11.4, end: 11.8 },
        { text: "is", start: 11.8, end: 12.1 },
        { text: "Kurdish", start: 12.1, end: 12.4 },
        { text: "alive", start: 12.4, end: 12.6 },
      ],
      ar: [
        { text: "أيها", start: 7.44, end: 8.1 },
        { text: "الرقيب،", start: 8.1, end: 9.0 },
        { text: "سيبقى", start: 9.0, end: 9.8 },
        { text: "الكرد", start: 9.8, end: 10.5 },
        { text: "بلغتهم", start: 10.5, end: 11.2 },
        { text: "وأمتهم", start: 11.2, end: 11.8 },
        { text: "باقون", start: 11.8, end: 12.2 },
        { text: "للأبد", start: 12.2, end: 12.6 },
      ],
    },
  },
  // Cue 1 — line 2 (phrase sung twice)
  {
    start: 12.6,
    end: 19.6,
    words: {
      ku: [
        { text: "نایشکێنێ", start: 12.6, end: 13.8 },
        { text: "دانەری", start: 13.8, end: 14.6 },
        { text: "تۆپی", start: 14.6, end: 15.4 },
        { text: "زەمان", start: 15.4, end: 16.2 },
        { text: "نایشکێنێ", start: 17.0, end: 17.8 },
        { text: "دانەری", start: 17.8, end: 18.6 },
        { text: "تۆپی", start: 18.6, end: 19.1 },
        { text: "زەمان", start: 19.1, end: 19.6 },
      ],
      en: [
        { text: "It", start: 12.6, end: 13.1 },
        { text: "cannot", start: 13.1, end: 13.7 },
        { text: "be", start: 13.7, end: 14.1 },
        { text: "defeated", start: 14.1, end: 14.9 },
        { text: "by", start: 14.9, end: 15.3 },
        { text: "makers", start: 15.3, end: 15.9 },
        { text: "of", start: 15.9, end: 16.3 },
        { text: "weapons", start: 16.3, end: 17.0 },
        { text: "of", start: 17.0, end: 17.4 },
        { text: "any", start: 17.4, end: 18.0 },
        { text: "time", start: 18.0, end: 18.81 },
      ],
      ar: [
        { text: "لا", start: 12.6, end: 13.2 },
        { text: "تقهرهم", start: 13.2, end: 14.3 },
        { text: "ولا", start: 14.3, end: 15.1 },
        { text: "تمحوهم", start: 15.1, end: 16.3 },
        { text: "مدافع", start: 16.3, end: 17.4 },
        { text: "الزمان", start: 17.4, end: 18.81 },
      ],
    },
  },
  // Cue 2 — line 1
  {
    start: 21.44,
    end: 27.7,
    words: {
      ku: [
        { text: "کەس", start: 21.44, end: 21.9 },
        { text: "نەڵێ", start: 21.9, end: 22.35 },
        { text: "کورد", start: 22.35, end: 22.8 },
        { text: "مردووە", start: 22.8, end: 23.35 },
        { text: "کەس", start: 23.35, end: 23.8 },
        { text: "نەڵێ", start: 23.8, end: 24.25 },
        { text: "کورد", start: 24.25, end: 24.7 },
        { text: "مردووە", start: 24.7, end: 25.2 },
        { text: "کورد", start: 25.2, end: 26.7 },
        { text: "زیندووە", start: 26.7, end: 27.7 },
      ],
      en: [
        { text: "Let", start: 21.44, end: 21.8 },
        { text: "no", start: 21.8, end: 22.1 },
        { text: "one", start: 22.1, end: 22.5 },
        { text: "say", start: 22.5, end: 22.9 },
        { text: "the", start: 22.9, end: 23.3 },
        { text: "Kurds", start: 23.3, end: 23.8 },
        { text: "are", start: 23.8, end: 24.2 },
        { text: "dead,", start: 24.2, end: 24.7 },
        { text: "the", start: 24.7, end: 25.2 },
        { text: "Kurds", start: 25.2, end: 26.0 },
        { text: "are", start: 26.0, end: 26.5 },
        { text: "alive", start: 26.5, end: 27.7 },
      ],
      ar: [
        { text: "لا", start: 21.44, end: 21.8 },
        { text: "يقل", start: 21.8, end: 22.3 },
        { text: "أحد", start: 22.3, end: 22.8 },
        { text: "أن", start: 22.8, end: 23.3 },
        { text: "الكرد", start: 23.3, end: 23.9 },
        { text: "زائلون،", start: 23.9, end: 24.5 },
        { text: "إن", start: 24.5, end: 25.2 },
        { text: "الكرد", start: 25.2, end: 26.5 },
        { text: "باقون", start: 26.5, end: 27.7 },
      ],
    },
  },
  // Cue 2 — line 2 (phrase sung twice)
  {
    start: 27.7,
    end: 36.04,
    words: {
      ku: [
        { text: "زیندووە", start: 27.7, end: 28.7 },
        { text: "قەت", start: 28.7, end: 29.6 },
        { text: "نانەوێ", start: 29.6, end: 30.3 },
        { text: "ئاڵاکەمان", start: 30.3, end: 32.44 },
        { text: "زیندووە", start: 32.44, end: 33.44 },
        { text: "قەت", start: 33.44, end: 34.34 },
        { text: "نانەوێ", start: 34.34, end: 35.04 },
        { text: "ئاڵاکەمان", start: 35.04, end: 36.04 },
      ],
      en: [
        { text: "The", start: 27.7, end: 28.1 },
        { text: "Kurds", start: 28.1, end: 28.5 },
        { text: "are", start: 28.5, end: 28.85 },
        { text: "alive", start: 28.85, end: 29.4 },
        { text: "and", start: 29.4, end: 29.8 },
        { text: "their", start: 29.8, end: 30.3 },
        { text: "flag", start: 30.3, end: 30.9 },
        { text: "will", start: 30.9, end: 31.3 },
        { text: "never", start: 31.3, end: 31.8 },
        { text: "fall", start: 31.8, end: 32.44 },
        { text: "The", start: 32.44, end: 32.8 },
        { text: "Kurds", start: 32.8, end: 33.15 },
        { text: "are", start: 33.15, end: 33.45 },
        { text: "alive", start: 33.45, end: 33.9 },
        { text: "and", start: 33.9, end: 34.2 },
        { text: "their", start: 34.2, end: 34.55 },
        { text: "flag", start: 34.55, end: 34.95 },
        { text: "will", start: 34.95, end: 35.25 },
        { text: "never", start: 35.25, end: 35.6 },
        { text: "fall", start: 35.6, end: 36.04 },
      ],
      ar: [
        { text: "باقون", start: 27.7, end: 28.7 },
        { text: "ورايتنا", start: 28.7, end: 29.6 },
        { text: "الخفاقة", start: 29.6, end: 30.5 },
        { text: "الشامخة", start: 30.5, end: 31.4 },
        { text: "إلى", start: 31.4, end: 31.85 },
        { text: "الأبد", start: 31.85, end: 32.44 },
        { text: "باقون", start: 32.44, end: 33.3 },
        { text: "ورايتنا", start: 33.3, end: 34.1 },
        { text: "الخفاقة", start: 34.1, end: 34.8 },
        { text: "الشامخة", start: 34.8, end: 35.35 },
        { text: "إلى", start: 35.35, end: 35.65 },
        { text: "الأبد", start: 35.65, end: 36.04 },
      ],
    },
  },
  // Cue 3 — line 1
  {
    start: 36.04,
    end: 42.595,
    words: {
      ku: [
        { text: "ئێمە", start: 36.04, end: 37.04 },
        { text: "ڕۆڵەی", start: 37.04, end: 39.04 },
        { text: "میدیا", start: 39.04, end: 40.04 },
        { text: "و", start: 40.04, end: 41.2 },
        { text: "کەیخوسرەوین", start: 41.2, end: 42.595 },
      ],
      en: [
        { text: "We", start: 36.04, end: 36.6 },
        { text: "are", start: 36.6, end: 37.1 },
        { text: "the", start: 37.1, end: 37.5 },
        { text: "sons", start: 37.5, end: 38.4 },
        { text: "of", start: 38.4, end: 38.8 },
        { text: "the", start: 38.8, end: 39.2 },
        { text: "Medes", start: 39.2, end: 40.3 },
        { text: "and", start: 40.3, end: 40.8 },
        { text: "Kai", start: 40.8, end: 41.5 },
        { text: "Khosrow", start: 41.5, end: 42.595 },
      ],
      ar: [
        { text: "نحن", start: 36.04, end: 37.2 },
        { text: "أبناء", start: 37.2, end: 38.6 },
        { text: "الميديين", start: 38.6, end: 40.3 },
        { text: "وكي", start: 40.3, end: 41.3 },
        { text: "خسرو", start: 41.3, end: 42.595 },
      ],
    },
  },
  // Cue 3 — line 2 (phrase sung twice)
  {
    start: 42.595,
    end: 53.75,
    words: {
      ku: [
        { text: "دینمان", start: 42.595, end: 43.595 },
        { text: "ئایینمان", start: 43.595, end: 44.595 },
        { text: "ھەر", start: 44.595, end: 45.595 },
        { text: "نیشتمان", start: 45.595, end: 46.595 },
        { text: "دینمان", start: 46.595, end: 47.595 },
        { text: "ئایینمان", start: 47.595, end: 48.595 },
        { text: "ھەر", start: 48.595, end: 49.595 },
        { text: "نیشتمان", start: 49.595, end: 53.75 },
      ],
      en: [
        { text: "Our", start: 42.595, end: 43.2 },
        { text: "homeland", start: 43.2, end: 44.1 },
        { text: "is", start: 44.1, end: 44.6 },
        { text: "our", start: 44.6, end: 45.1 },
        { text: "faith", start: 45.1, end: 45.7 },
        { text: "and", start: 45.7, end: 46.1 },
        { text: "religion", start: 46.1, end: 46.595 },
        { text: "Our", start: 46.595, end: 47.3 },
        { text: "homeland", start: 47.3, end: 48.4 },
        { text: "is", start: 48.4, end: 49.0 },
        { text: "our", start: 49.0, end: 49.6 },
        { text: "faith", start: 49.6, end: 51.0 },
        { text: "and", start: 51.0, end: 52.0 },
        { text: "religion", start: 52.0, end: 53.75 },
      ],
      ar: [
        { text: "ديننا", start: 42.595, end: 43.5 },
        { text: "إيماننا", start: 43.5, end: 44.6 },
        { text: "هو", start: 44.6, end: 45.4 },
        { text: "الوطن", start: 45.4, end: 46.595 },
        { text: "ديننا", start: 46.595, end: 47.8 },
        { text: "إيماننا", start: 47.8, end: 49.5 },
        { text: "هو", start: 49.5, end: 51.2 },
        { text: "الوطن", start: 51.2, end: 53.75 },
      ],
    },
  },
];

export type AnthemKaraokeWord = {
  text: string;
  current: boolean;
  isPast: boolean;
};

export type AnthemKaraokeLine = {
  words: AnthemKaraokeWord[];
};

/** Force increasing starts so a mistimed repeat can never dump a whole phrase at once. */
function normalizeMonotonic(tokens: WordToken[]): WordToken[] {
  let prevEnd = Number.NEGATIVE_INFINITY;
  return tokens.map((word) => {
    const duration = Math.max(0.12, word.end - word.start);
    const start = Math.max(word.start, prevEnd);
    const end = Math.max(word.end, start + duration);
    prevEnd = end;
    return { text: word.text, start, end };
  });
}

/**
 * Returns the active line with words revealed up to `time` (one-by-one).
 * Uses the latest matching line window so overlaps don't stick on an old cue.
 */
export function getAnthemKaraokeAt(time: number, lang: AnthemLang): AnthemKaraokeLine[] | null {
  if (time < ANTHEM_LYRIC_LINES[0].start) return null;

  const last = ANTHEM_LYRIC_LINES[ANTHEM_LYRIC_LINES.length - 1];
  if (time >= last.end) {
    return [
      {
        words: last.words[lang].map((word) => ({
          text: word.text,
          current: false,
          isPast: true,
        })),
      },
    ];
  }

  let activeIndex = -1;
  for (let i = 0; i < ANTHEM_LYRIC_LINES.length; i++) {
    const line = ANTHEM_LYRIC_LINES[i];
    if (time >= line.start && time < line.end) activeIndex = i;
  }

  // Hold the previous line fully during gaps between cues.
  if (activeIndex < 0) {
    for (let i = ANTHEM_LYRIC_LINES.length - 1; i >= 0; i--) {
      if (time >= ANTHEM_LYRIC_LINES[i].end) {
        return [
          {
            words: ANTHEM_LYRIC_LINES[i].words[lang].map((word) => ({
              text: word.text,
              current: false,
              isPast: true,
            })),
          },
        ];
      }
    }
    return null;
  }

  const tokens = normalizeMonotonic(ANTHEM_LYRIC_LINES[activeIndex].words[lang]);
  const mappedWords: AnthemKaraokeWord[] = [];

  for (const word of tokens) {
    if (time < word.start) break;
    mappedWords.push({
      text: word.text,
      current: time >= word.start && time < word.end,
      isPast: time >= word.end,
    });
  }

  if (mappedWords.length && !mappedWords.some((w) => w.current)) {
    const lastVisible = mappedWords[mappedWords.length - 1];
    lastVisible.current = true;
    lastVisible.isPast = false;
  }

  return mappedWords.length ? [{ words: mappedWords }] : null;
}

export function getAnthemLyricAt(time: number, lang: AnthemLang): [string, string] | null {
  const karaoke = getAnthemKaraokeAt(time, lang);
  if (!karaoke?.length) return null;
  const lines = karaoke.map((l) => l.words.map((w) => w.text).join(" "));
  return [lines[0] ?? "", lines[1] ?? ""];
}
