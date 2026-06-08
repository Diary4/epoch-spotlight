import type { LibraryBook } from "./libraryTypes";
import { getBookById } from "./libraryBooks";
import { FREE_PREVIEW_PAGES } from "@/lib/libraryPreview";

export type BookPage = {
  pageNumber: number;
  content: string;
};

const SAMPLE_PAGES: Record<string, string[]> = {
  "dwem-aseman": [
    "I looked for you in the sky and found you in the words. The evening settled over the mountains like a soft shawl, and the city below breathed in the language of poets who had walked these streets before me.",
    "Every poem in this collection begins with a question: where does the self end and the homeland begin? I write not to answer, but to keep the question alive — to let it echo between heart and horizon.",
    "The moon over Erbil does not know borders. It shines on rooftops and rivers alike, on letters written in exile and songs sung in the marketplace. Dwem Aseman — the second sky — is the sky we carry inside us.",
    "Love, in these pages, is never only personal. It is a bridge between generations, between those who stayed and those who left, between the word spoken aloud and the word held silently in the chest.",
    "I dedicate this opening to every reader who has ever opened a book and found a piece of home inside it. Turn the page, and you will hear the wind moving through Kurdish verse — patient, enduring, alive.",
  ],
  "kaniya-spi": [
    "The white spring runs cold and clear through the high valleys. I came here as a boy, carrying questions I could not yet name. The water answered with silence, and in that silence I learned to listen.",
    "Kaniya Spî — the white spring — is more than a place. It is a memory that returns whenever the world grows too loud. In these poems, the mountain path is both journey and destination.",
    "My father told me that every Kurd carries a spring inside the heart. Some find it in exile, some in the old village, some only in the act of writing. I found mine in the rhythm of verse.",
    "The horse and rider on the cover are not symbols of war but of passage — the long crossing from one season of life to another. Poetry is the hoofbeat that keeps time with the soul.",
    "These opening verses invite you into a landscape of snow, stone, and longing. The full collection waits beyond this spring — but even these first pages hold enough water to quench a thirsty heart.",
  ],
  "sinore-evine": [
    "The boundary of love is not drawn on any map. It exists in the space between two people who cannot fully reach each other — and yet cannot turn away. This novel begins at such a border.",
    "He walked through the city as though it were a dream he had once had and half forgotten. The streets curved back on themselves. Faces repeated. Time moved like water over stone — always forward, always returning.",
    "She told him that love was a country without a flag. He did not believe her until he tried to leave. Every road led back to her voice, to the particular way she pronounced his name.",
    "Politics entered the story the way winter enters a valley — slowly, then all at once. The personal and the political were never separate in Kurdistan. They were two rivers flowing into the same sea.",
    "What you have read so far is only the threshold. Beyond these five pages, the garden grows stranger, the mirror cracks, and love learns its true name. The full journey awaits those who choose to continue.",
  ],
  "zindiyan": [
    "Living ones — zindîyan — we are the living ones. Not the martyrs carved in stone, not the names in history books, but the breath in our lungs and the fire in our songs.",
    "I wrote these verses for my people when the world tried to name us only by our suffering. We are more than struggle. We are laughter in the tea house, wheat in the field, a child's first word in Kurdish.",
    "The tree on the cover stands alone against the sunset. It has stood through every storm. So have we. This is what I want every reader to feel in the opening pages — rooted, upright, alive.",
    "Poetry was never decoration for me. It was survival. When the pen moves, a nation breathes. When the verse is sung, the young learn who they are. These lines are seeds.",
    "You have tasted the first fruits. The orchard is vast — generations of verse waiting in the full edition. But even these five pages carry the scent of the homeland on the wind.",
  ],
  "mem-u-zin": [
    "In the name of God, the Most Merciful. This is the tale of Mem and Zîn — two souls bound by love and torn apart by the cruelty of those who feared what love could unite.",
    "Mem was young and fair, with a heart open as the spring. Zîn was grace itself, daughter of a noble house. When their eyes met at the festival, every poet in Kurdistan should have been there to witness it.",
    "But love that shines too brightly casts a shadow. Beko, the jealous soul, saw what he could not possess and set in motion a tragedy that would echo through centuries.",
    "Ehmedê Xanî wrote not only a love story but a mirror for a people. In Mem's devotion and Zîn's dignity, Kurds saw themselves — passionate, proud, unbroken by betrayal.",
    "These opening cantos set the stage for the greatest Kurdish epic. The full poem spans lifetimes of longing. What you have read is the door. The complete tale lies beyond, waiting to be unlocked.",
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
