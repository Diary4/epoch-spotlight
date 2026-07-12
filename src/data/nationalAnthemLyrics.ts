/**
 * Ey Reqîb — official Sorani lyrics (Wikipedia / KRG), with English and Arabic translations.
 * Timings synced to src/assets/audio/national-anthem.mp3 (53.75s) via onset analysis of the
 * recording: the instrumental intro runs to ~7.4s, the vocal is sung across ~7.44s–50.78s at a
 * steady ~1.3s pulse, and is structured as 5 stanzas of (verse couplet + refrain) = 10 phrases
 * of ~4.33s each. The outro fade begins ~51s.
 */

export type AnthemLang = "ku" | "en" | "ar";

export type AnthemLyricCue = {
  start: number;
  end: number;
  lines: Record<AnthemLang, [string, string]>;
};

const CHORUS: Record<AnthemLang, [string, string]> = {
  ku: ["کەس نەڵێ کورد مردووە، کورد زیندووە،", "زیندووە، قەت نانەوێ ئاڵاکەمان."],
  en: ["Let no one say the Kurds are dead, the Kurds are alive", "The Kurds are alive and their flag will never fall"],
  ar: ["لا يقل أحد أن الكرد زائلون، إن الكرد باقون", "باقون ورايتنا الخفاقة الشامخة إلى الأبد"],
};

/** Verse + chorus pairs, five stanzas. */
export const ANTHEM_LYRIC_CUES: AnthemLyricCue[] = [
  {
    start: 7.44,
    end: 11.77,
    lines: {
      ku: ["ئەی ڕەقیب، ھەر ماوە قەومی کورد زمان،", "نایشکێنێ دانەری تۆپی زەمان."],
      en: [
        "Oh foes who watch us, the nation whose language is Kurdish is alive",
        "It cannot be defeated by makers of weapons of any time",
      ],
      ar: ["أيها الرقيب، سيبقى الكرد بلغتهم وأمتهم باقون للأبد", "لا تقهرهم ولا تمحوهم مدافع الزمان"],
    },
  },
  {
    start: 11.77,
    end: 16.11,
    lines: CHORUS,
  },
  {
    start: 16.11,
    end: 20.44,
    lines: {
      ku: ["ئێمە ڕۆڵەی ڕەنگی سوور و شۆڕشین،", "سەیری کە، خوێناوییە ڕابردوومان."],
      en: ["We are the sons of the red colour of revolution", "Our history is one filled with blood"],
      ar: ["نحن أبناء اللون الأحمر، أبناء الثورة", "تمعّن بماضينا المخضب بالدماء"],
    },
  },
  {
    start: 20.44,
    end: 24.78,
    lines: CHORUS,
  },
  {
    start: 24.78,
    end: 29.11,
    lines: {
      ku: ["ئێمە ڕۆڵەی میدیا و کەیخوسرەوین،", "دینمان، ئایینمان، ھەر نیشتمان"],
      en: ["We are the sons of the Medes and Kai Khosrow", "Our homeland is our faith and religion"],
      ar: ["نحن أبناء الميديين وكي خسرو،", "ديننا إيماننا هو الوطن"],
    },
  },
  {
    start: 29.11,
    end: 33.44,
    lines: CHORUS,
  },
  {
    start: 33.44,
    end: 37.78,
    lines: {
      ku: ["لاوی کورد ھەستایە سەر پێ وەک دلێر،", "تا بە خوێن نەخشی بکا تاجی ژیان."],
      en: ["The Kurdish youth has risen like noble warriors", "To draw the crown of life with blood"],
      ar: ["انتفض شباب الورد مثل السباع", "كي يسطروا بدمائهم تاج الحياة"],
    },
  },
  {
    start: 37.78,
    end: 42.11,
    lines: CHORUS,
  },
  {
    start: 42.11,
    end: 46.45,
    lines: {
      ku: ["لاوی کورد ھەر حازر و ئامادەیە،", "گیانفیدایە، گیانفیدا، ھەر گیانفیدا."],
      en: [
        "The Kurdish youth are ever-ready",
        "And always prepared to sacrifice their lives",
      ],
      ar: ["شباب الكرد على أهبة الاستعداد دائماً للتضحية بأرواحهم", "فدائيون، فدائيون، وكلهم فدائيون"],
    },
  },
  {
    start: 46.45,
    end: 50.78,
    lines: CHORUS,
  },
];

export function getAnthemLyricAt(time: number, lang: AnthemLang): [string, string] | null {
  const cue = ANTHEM_LYRIC_CUES.find((c) => time >= c.start && time < c.end);
  return cue ? cue.lines[lang] : null;
}
