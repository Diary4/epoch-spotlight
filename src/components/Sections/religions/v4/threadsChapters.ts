import type { Chapter, Story, ThreadsLang } from "./threadsTypes";
import { N2 } from "./threadsContent/detailData";
import { resolveDetailCards } from "./threadsContent/threadsDetailCards";
import {
  coexistenceStories,
  faithStories,
  nationsStories,
  rightsStories,
  sharedLifeStories,
} from "./threadsContent/threadStories";
import { threadsAssets } from "./threadsAssets";

type StoryTuple = [string, string, string, string];

/**
 * Wide festival group shots whose subjects sit at the edges of the frame — the
 * card's portrait crop cuts the outer players off, so these are shown whole.
 */
const FULL_FRAME_STORIES = new Set([
  "eid",
  "christmas",
  "yazidi-festivals",
  "kakai-festival",
]);

function buildStories(lang: ThreadsLang, tuples: StoryTuple[]): Story[] {
  return tuples.map(([id, title, body, image]) => {
    const context = N2[lang][id as keyof (typeof N2)["en"]];
    return {
      id,
      title,
      body,
      context: context?.context ?? "",
      significance: context?.significance ?? "",
      image,
      imageFit: FULL_FRAME_STORIES.has(id) ? "contain" : undefined,
      detailCards: resolveDetailCards(lang, id),
    };
  });
}

const CHAPTER_META: Record<
  ThreadsLang,
  Record<
    Chapter["id"],
    Omit<Chapter, "stories">
  >
> = {
  en: {
    faiths: {
      id: "faiths",
      number: "01",
      title: "Faiths",
      line: "Sacred stories · living traditions",
      description:
        "Eight faith traditions carry sacred places, teachings, rituals, and memories into Kurdistan’s present.",
      hero: threadsAssets.uo,
      accent: "#a86e34",
    },
    nations: {
      id: "nations",
      number: "02",
      title: "Nations",
      line: "Language · culture · belonging",
      description:
        "Four communities reveal how language, dress, celebration, education, and public recognition shape belonging.",
      hero: threadsAssets.go,
      accent: "#506b61",
    },
    coexistence: {
      id: "coexistence",
      number: "03",
      title: "Coexistence",
      line: "Values · leaders · lived courage",
      description:
        "Four paths bring coexistence into focus: the leaders who defended it, the values beneath it, the daily acts that sustain it, and its living timeline.",
      hero: threadsAssets.dt,
      accent: "#b58a47",
    },
    sharedLife: {
      id: "sharedLife",
      number: "04",
      title: "Shared Life",
      line: "Celebrations · Heritage",
      description:
        "Festivals that bring communities together, and sacred places that hold shared memory — from Eid and Christmas to mosques, churches, Lalish, and Zoroastrian temples.",
      hero: threadsAssets.Rt,
      accent: "#b24438",
    },
    rights: {
      id: "rights",
      number: "05",
      title: "Rights & Recognition",
      line: "Protection made visible",
      description:
        "Government, parliament, law, and humanitarian action trace how recognition became visible from the institutions of 1992 to refuge in 2014.",
      hero: threadsAssets.Ot,
      accent: "#42658c",
    },
  },
  ku: {
    faiths: {
      id: "faiths",
      number: "٠١",
      title: "ئایینەکان",
      line: "باوەڕ · پەرستن · نەریت",
      description:
        "هەشت نەریتی ئایینی شوێنە پیرۆز، فێرکاری، ڕێوڕەسم و یادەوەرییەکانیان تا ئەمڕۆی کوردستان زیندوو ڕاگرتووە.",
      hero: threadsAssets.uo,
      accent: "#a86e34",
    },
    nations: {
      id: "nations",
      number: "٠٢",
      title: "نەتەوەکان",
      line: "زمان · کەلەپوور · ناسنامە",
      description:
        "چوار کۆمەڵگە نیشان دەدەن کە زمان، جلوبەرگ، جەژن، خوێندن و دانپێدانانی گشتی چۆن ناسنامە پێکدەهێنن.",
      hero: threadsAssets.go,
      accent: "#506b61",
    },
    coexistence: {
      id: "coexistence",
      number: "٠٣",
      title: "پێکەوەژیان",
      line: "بەها · ڕێبەر · ئازایەتیی زیندوو",
      description:
        "چوار ڕێگا پێکەوەژیان دەخەنە بەرچاو: ئەو ڕێبەرانەی بەرگرییان لێکرد، بەهاکانی بنەڕەت، کردەوە ڕۆژانەکان و هێڵی کاتە زیندووەکەی.",
      hero: threadsAssets.dt,
      accent: "#b58a47",
    },
    sharedLife: {
      id: "sharedLife",
      number: "٠٤",
      title: "ژیانی هاوبەش",
      line: "جەژن · میرات",
      description:
        "جەژنەکان کە کۆمەڵگەکان کۆدەکەنەوە، و شوێنە پیرۆزەکان کە یادەوەریی هاوبەش هەڵدەگرن — لە جەژنی ڕەمەزان و لەدایکبوونەوە تا مزگەوت، کەنیسە، لالەش و پەرستگا زەردەشتییەکان.",
      hero: threadsAssets.Rt,
      accent: "#b24438",
    },
    rights: {
      id: "rights",
      number: "٠٥",
      title: "مافەکان و دانپێدانان",
      line: "یاسا · پاراستن · نوێنەرایەتی",
      description:
        "حکومەت، پەرلەمان، یاسا و کردەوەی مرۆیی نیشان دەدەن کە دانپێدانان لە دامەزراوەکانی ١٩٩٢ تا پەناگەی ٢٠١٤ چۆن دیار بووە.",
      hero: threadsAssets.Ot,
      accent: "#42658c",
    },
  },
  ar: {
    faiths: {
      id: "faiths",
      number: "٠١",
      title: "الأديان",
      line: "إيمان · عبادة · تقاليد",
      description:
        "تحمل ثمانية تقاليد دينية أماكنها المقدسة وتعاليمها وطقوسها وذاكرتها إلى حاضر كوردستان.",
      hero: threadsAssets.uo,
      accent: "#a86e34",
    },
    nations: {
      id: "nations",
      number: "٠٢",
      title: "القوميات",
      line: "لغة · تراث · انتماء",
      description:
        "تكشف أربعة مجتمعات كيف تصوغ اللغة والملابس والاحتفال والتعليم والاعتراف العام معنى الانتماء.",
      hero: threadsAssets.go,
      accent: "#506b61",
    },
    coexistence: {
      id: "coexistence",
      number: "٠٣",
      title: "التعايش",
      line: "قيم · قادة · شجاعة حية",
      description:
        "أربعة مسارات تجعل التعايش في صميم التجربة: القادة الذين دافعوا عنه، والقيم التي تحمله، والممارسات اليومية، وخطه الزمني الحي.",
      hero: threadsAssets.dt,
      accent: "#b58a47",
    },
    sharedLife: {
      id: "sharedLife",
      number: "٠٤",
      title: "الحياة المشتركة",
      line: "احتفالات · تراث",
      description:
        "أعياد تجمع المجتمعات، وأماكن مقدسة تحمل الذاكرة المشتركة — من عيد الفطر والميلاد إلى المساجد والكنائس ولالش والمعابد الزرادشتية.",
      hero: threadsAssets.Rt,
      accent: "#b24438",
    },
    rights: {
      id: "rights",
      number: "٠٥",
      title: "الحقوق والاعتراف",
      line: "حماية مرئية",
      description:
        "الحكومة والبرلمان والقانون والعمل الإنساني يرسمون كيف أصبح الاعتراف مرئياً من مؤسسات 1992 إلى اللجوء في 2014.",
      hero: threadsAssets.Ot,
      accent: "#42658c",
    },
  },
};

export function getThreadsChapters(lang: ThreadsLang): Record<Chapter["id"], Chapter> {
  const meta = CHAPTER_META[lang];
  return {
    faiths: {
      ...meta.faiths,
      stories: buildStories(lang, faithStories[lang] as StoryTuple[]),
    },
    nations: {
      ...meta.nations,
      stories: buildStories(lang, nationsStories[lang] as StoryTuple[]),
    },
    coexistence: {
      ...meta.coexistence,
      stories: buildStories(lang, coexistenceStories[lang] as StoryTuple[]),
    },
    sharedLife: {
      ...meta.sharedLife,
      stories: buildStories(lang, sharedLifeStories[lang] as StoryTuple[]),
    },
    rights: {
      ...meta.rights,
      stories: buildStories(lang, rightsStories[lang] as StoryTuple[]),
    },
  };
}
