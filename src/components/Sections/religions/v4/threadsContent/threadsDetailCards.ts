import type { DetailCard, ThreadsLang } from "../threadsTypes";
import {
  BS,
  ES,
  E2,
  FS,
  jS,
  KS,
  L2,
  M2,
  MS,
  NS,
  PS,
  P2,
  QS,
  R2,
  SS,
  VS,
  WS,
  XS,
  c2,
  e2,
  g2,
  h2,
  k2,
  kS,
  o2,
  p2,
  s2,
  t2,
  u2,
  v2,
  w2,
  x2,
  y2,
} from "./detailData";
import { threadsAssets } from "../threadsAssets";

type TopicContent = {
  topics: Array<{ id: string; title: string; text: string }>;
};

type CardContent = {
  cards: Array<{
    id: string;
    eyebrow: string;
    title: string;
    body: string;
  }>;
};

type CoexistenceSection = {
  cards: Array<{ id: string; title: string; body: string }>;
};

function mapTopics(
  lang: ThreadsLang,
  content: Record<ThreadsLang, TopicContent>,
  images: Record<string, string>,
): DetailCard[] {
  return content[lang].topics.map((topic, index) => ({
    id: topic.id,
    eyebrow: String(index + 1).padStart(2, "0"),
    title: topic.title,
    body: topic.text,
    image: images[topic.id],
  }));
}

function mapCards(
  lang: ThreadsLang,
  content: Record<ThreadsLang, CardContent>,
  images: string[],
): DetailCard[] {
  return content[lang].cards.map((card, index) => ({
    id: card.id,
    eyebrow: card.eyebrow,
    title: card.title,
    body: card.body,
    image: images[index] ?? images[0],
  }));
}

function mapCoexistenceCards(
  lang: ThreadsLang,
  section: "coexistence" | "leaders",
  images: Record<string, string>,
): DetailCard[] {
  const cards = (R2[lang][section] as CoexistenceSection).cards;
  return cards.map((card, index) => ({
    id: card.id,
    eyebrow: String(index + 1).padStart(2, "0"),
    title: card.title,
    body: card.body,
    image: images[card.id],
    imagePosition: section === "leaders" ? "center 24%" : undefined,
  }));
}

function mapTimeline(
  lang: ThreadsLang,
  items: Record<
    ThreadsLang,
    Array<{ id: string; title: string; body: string; image: string }>
  >,
): DetailCard[] {
  return items[lang].map((item, index) => ({
    id: item.id,
    eyebrow: String(index + 1).padStart(2, "0"),
    title: item.title,
    body: item.body,
    image: item.image,
  }));
}

const governmentImages = [
  threadsAssets.xo,
  threadsAssets.renamedToServeAll,
  threadsAssets.Wg,
  threadsAssets.Gg,
];
const parliamentImages = [
  threadsAssets.Ot,
  threadsAssets.Yg,
  threadsAssets.Kg,
  threadsAssets.dollar_g,
];
const lawsImages = [
  threadsAssets.rightsLaws,
  threadsAssets.Yg,
  threadsAssets.Hg,
  threadsAssets.dt,
];
const sanctuaryImages = [
  threadsAssets.rightsYear2014,
  threadsAssets.Qg,
  threadsAssets.A2,
  threadsAssets.Yn,
];

export function resolveDetailCards(
  lang: ThreadsLang,
  storyId: string,
): DetailCard[] {
  switch (storyId) {
    case "islam":
    case "eid":
      return mapTopics(lang, SS, kS);
    case "christianity":
    case "christmas":
      return mapTopics(lang, PS, ES);
    case "yazidism":
    case "yazidi-festivals":
      return mapTopics(lang, jS, MS);
    case "yarsanism":
    case "kakai-festival":
      return mapTopics(lang, VS, NS);
    case "zoroastrianism":
      return mapTopics(lang, BS, FS);
    case "judaism":
      return mapTopics(lang, WS, KS);
    case "bahai":
      return mapTopics(lang, XS, QS);
    case "sabean":
      return mapTopics(lang, t2, e2);
    case "kurds":
      return mapTopics(lang, o2, s2);
    case "turkmens":
      return mapTopics(lang, c2, u2);
    case "assyrians":
      return mapTopics(lang, p2, h2);
    case "armenians":
      return mapTopics(lang, y2, g2);
    case "government":
      return mapCards(lang, v2, governmentImages);
    case "parliament":
      return mapCards(lang, x2, parliamentImages);
    case "laws":
      return mapCards(lang, w2, lawsImages);
    case "sanctuary":
      return mapCards(lang, k2, sanctuaryImages);
    case "coexistence-principles":
      return mapCoexistenceCards(lang, "coexistence", P2);
    case "coexistence-leaders":
      return mapCoexistenceCards(lang, "leaders", E2);
    case "coexistence-stories":
      return mapTimeline(lang, L2);
    case "coexistence-timeline":
      return mapTimeline(lang, M2);
    default:
      return [];
  }
}
