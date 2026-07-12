/**
 * Ey Reqîb — official Sorani lyrics (Wikipedia / KRG), with English and Arabic translations.
 * Timings tuned to src/assets/audio/national-anthem.mp3 (~53.75s, instrumental intro ~8s).
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
    start: 8.0,
    end: 13.0,
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
    start: 13.0,
    end: 18.0,
    lines: CHORUS,
  },
  {
    start: 18.0,
    end: 23.0,
    lines: {
      ku: ["ئێمە ڕۆڵەی ڕەنگی سوور و شۆڕشین،", "سەیری کە، خوێناوییە ڕابردوومان."],
      en: ["We are the sons of the red colour of revolution", "Our history is one filled with blood"],
      ar: ["نحن أبناء اللون الأحمر، أبناء الثورة", "تمعّن بماضينا المخضب بالدماء"],
    },
  },
  {
    start: 23.0,
    end: 28.0,
    lines: CHORUS,
  },
  {
    start: 28.0,
    end: 33.0,
    lines: {
      ku: ["ئێمە ڕۆڵەی میدیا و کەیخوسرەوین،", "دینمان، ئایینمان، ھەر نیشتمان"],
      en: ["We are the sons of the Medes and Kai Khosrow", "Our homeland is our faith and religion"],
      ar: ["نحن أبناء الميديين وكي خسرو،", "ديننا إيماننا هو الوطن"],
    },
  },
  {
    start: 33.0,
    end: 38.0,
    lines: CHORUS,
  },
  {
    start: 38.0,
    end: 43.0,
    lines: {
      ku: ["لاوی کورد ھەستایە سەر پێ وەک دلێر،", "تا بە خوێن نەخشی بکا تاجی ژیان."],
      en: ["The Kurdish youth has risen like noble warriors", "To draw the crown of life with blood"],
      ar: ["انتفض شباب الورد مثل السباع", "كي يسطروا بدمائهم تاج الحياة"],
    },
  },
  {
    start: 43.0,
    end: 47.5,
    lines: CHORUS,
  },
  {
    start: 47.5,
    end: 50.5,
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
    start: 50.5,
    end: 52.0,
    lines: CHORUS,
  },
];

export function getAnthemLyricAt(time: number, lang: AnthemLang): [string, string] | null {
  const cue = ANTHEM_LYRIC_CUES.find((c) => time >= c.start && time < c.end);
  return cue ? cue.lines[lang] : null;
}
