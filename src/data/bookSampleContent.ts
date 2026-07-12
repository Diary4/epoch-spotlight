import type { LibraryBook } from "./libraryTypes";
import { getBookById } from "./libraryBooks";
import { FREE_PREVIEW_PAGES } from "@/lib/libraryPreview";

export type BookPage = {
  pageNumber: number;
  content: string;
};

const SAMPLE_PAGES: Record<string, string[]> = {
  "the-potato-eaters": [
    "The town had learned to live on potatoes alone. Famine had stripped away everything else — coin, commerce, the old hunger for gold. What remained was the starch that kept them breathing, and a quiet agreement that survival was enough.",
    "When he returned from his travels, his pockets heavy with gold, he expected astonishment. Instead he found indifference. The streets smelled of boiled potatoes. Faces turned away. He had become a stranger in the country he had left behind.",
    "In \"Lamartine,\" a poetry scholar with a doctorate on Lamartine's lines visits a career agency and asks, in plain verse, for a livelihood. He imagines a world where poets are paid by the line rather than the hour — and then tells the statue of his hero that artists and poets live pitifully, nursed on misfortune from the beginning of time.",
    "In \"The Deserter,\" a forgetful soldier hobbles for nearly ten days searching for his lost leg. When his Corporal orders him to prepare for war, the two scavenge through piles of human body parts. \"My generation and I,\" he reflects, \"we are the sacrifice of our era — the sacrifice to war and the dirty battles of those fools and frauds we call today's leaders.\"",
    "Each story in this collection ends without easy resolution — lives cut short, questions left unanswered. Pirbal writes of otherness and displacement with a voice that is at once Kurdish and universal. The full collection awaits beyond this preview.",
  ],
  "hotel-europe": [
    "کاتێک گەڕامەوە ماڵەوە، دەمویست بچم بۆ ئەوە کە چەمپت و کۆڵەم بخەمە سەر بۆ ئەوەی سبەی بەیانی ڕاوەم بۆ جبه.",
    "ناکاو تێبینی ئەوەم کرد کە پێی ڕاستی ونبووم نامەیەکم بۆ ناردبێت. بە شێوەیەکی سەرپێچی نامەکەم کردەوە. لە خۆشحاڵییەوە پڕ دەبووم.",
    "پێی ڕاستی ونبووم لە نامەکەدا نووسیبوو، چەند ڕۆژێک پێشتر پۆلیس لە بازاڕ کەڵکی ناسنامەی خوێ کردۆتەوە. ئەویش کە هیچ ناسنامەیەکی نەبوو، بە دەرچوویەک دادەنرێت؛ گوتبوون چونکە کوردە و دەرچووە دەبێت یەکسەر بنێرن بۆ جبه.",
    "When I returned home, I wanted to pack my suitcase and backpack to leave for the front tomorrow morning. Suddenly I noticed that my missing right leg had sent me a letter.",
    "My missing right leg had written that the police in the market had asked him for identification. With none to show, they called him a fugitive — Kurdish, they said, and on the run — and must be sent to the front at once. He fled through the market, ran without stopping to Baghdad, forged papers, boarded a minibus at Kani garage, and returned to Hewler.",
  ],
  "triangular-tomb": [
    "لەم ڕۆمانەدا پاڵەوانەکە فەرەیدونە. باوکی لە ڕووداوێکدا بێسەروشوێن کراوە کاتێک تەمەنی تەنها ١٤ ساڵ بوو. ئەوەندە دوور بووەوە کە هەرگیز نەزانی چی ڕوویدا.",
    "لێرە لەگەڵ حەوت کەسی تر لە نێو ئەشکەوتێک دەژین کە نازانن کەوتۆتە کوێ. تەمەن و کاتیان لەبیرچۆتەوە — ڕۆژ و شەو و ساڵ وەک یەکێکن، وەک ئەوەی هیچ شتێک لە دەرەوە بوونی نییە.",
    "گەڕان بەدوای قەبرە سێگۆشەکەی باوکی فەرەیدون لە ئەشکەوتەکە دەردەهێنێت. لە ڕێگادا دووچاری خێزانێک دەبێت و بۆی دەردەکەوێت کەوتۆتە باکوری کوردستان.",
    "Fereidun falls in love with Rendan, a girl who promises to help him find his father's triangular tomb. But the world outside the cave is unforgiving — and Fereidun is arrested, held in prison, while the search continues.",
    "Beyond this central quest, the novel gathers a constellation of events and adventures — memory, love, imprisonment, and the slow uncovering of where the cave-dwellers truly belong.",
  ],
};

function buildFallbackPages(book: LibraryBook): string[] {
  const base = book.aboutText ?? book.description;
  return Array.from({ length: FREE_PREVIEW_PAGES }, (_, index) => {
    const part = index + 1;
    if (part === 1) {
      return `${base} This is the opening of ${book.title}, a work of ${book.genre.toLowerCase()} first published in ${book.year}.`;
    }
    if (part === FREE_PREVIEW_PAGES) {
      return `You have reached the end of the free preview of ${book.title}. The remaining ${(book.pages ?? 100) - FREE_PREVIEW_PAGES} pages are available with the full edition.`;
    }
    return `From ${book.title}, page ${part}: the narrative deepens here, drawing the reader further into the world the author has crafted. Each verse and sentence builds toward the heart of this ${book.genre.toLowerCase()} work.`;
  });
}

export function getBookPreviewPages(bookId: string): BookPage[] {
  const book = getBookById(bookId);
  if (!book) return [];

  const texts = SAMPLE_PAGES[bookId] ?? buildFallbackPages(book);

  return texts.slice(0, FREE_PREVIEW_PAGES).map((content, index) => ({
    pageNumber: index + 1,
    content,
  }));
}
