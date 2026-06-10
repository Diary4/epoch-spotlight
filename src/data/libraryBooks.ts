import dwemCover from "@/assets/images/new/dwem.webp";
import card2 from "@/assets/mainImages/card-2.webp";
import card3 from "@/assets/mainImages/card-3.webp";
import card4 from "@/assets/mainImages/discoverkurdistan/card-1.webp";
import card5 from "@/assets/mainImages/discoverkurdistan/card-2.webp";
import card6 from "@/assets/mainImages/discoverkurdistan/card-3.webp";
import card7 from "@/assets/mainImages/discoverkurdistan/card-4.webp";
import card1 from "@/assets/mainImages/card-1.webp";
import story1 from "@/assets/mainImages/story-1.webp";
import story2 from "@/assets/mainImages/story-2.webp";
import story3 from "@/assets/mainImages/story-3.webp";
import letter from "@/assets/mainImages/letter.webp";
import type { LibraryBook, LibraryCategory } from "./libraryTypes";

export const LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: "dwem-aseman",
    title: "Dwem Aseman",
    authorId: "farhad-pirbal",
    cover: dwemCover,
    genre: "Poetry",
    year: 1991,
    language: "Kurdish",
    readingTime: "2h 15m",
    pages: 128,
    publisher: "Sangar Publications",
    isbn: "978-9957-448-10-4",
    description:
      "A luminous collection of poems that gaze upward — toward sky, longing, and the words that bridge hearts across distance.",
    aboutText:
      "Dwem Aseman gathers Farhad Pirbal's most beloved poems on love, exile, and the Kurdish sky. Each verse is a meditation on what it means to search for home in language and memory.",
    quoteKurdish: "لە ئاسماندا گەڕام، لە وشەکاندا دۆزیومەتەوە",
    quoteEnglish: "I looked for you in the sky, found you in the words.",
    rating: 4.9,
    popular: true,
  },
  {
    id: "kaniya-spi",
    title: "Kaniya Spî",
    authorId: "rebwar-siwayli",
    cover: card2,
    genre: "Poetry",
    year: 1998,
    language: "Kurdish",
    readingTime: "1h 45m",
    pages: 96,
    publisher: "Kurdistan Press",
    description:
      "Poems of white springs and mountain paths — a lyrical journey through Kurdish landscape and longing.",
    aboutText:
      "Kaniya Spî draws on the imagery of Kurdistan's mountains and rivers, weaving personal memory with collective heritage.",
    rating: 4.7,
    popular: true,
  },
  {
    id: "sinore-evine",
    title: "Sînorê Evînê",
    authorId: "bakhtyar-ali",
    cover: card3,
    genre: "Novel",
    year: 2004,
    language: "Kurdish",
    readingTime: "6h 30m",
    pages: 312,
    publisher: "Avesta",
    description:
      "A boundary of love — a novel that explores the edges of desire, politics, and the surreal landscapes of Kurdish life.",
    aboutText:
      "Sînorê Evînê is one of Bakhtyar Ali's most celebrated works, blending dreamlike narrative with the harsh realities of modern Kurdistan.",
    rating: 4.8,
    popular: true,
  },
  {
    id: "zindiyan",
    title: "Zindîyan",
    authorId: "cegerxwin",
    cover: card4,
    genre: "Poetry",
    year: 1970,
    language: "Kurdish",
    readingTime: "3h",
    pages: 180,
    publisher: "Kurdish Literary House",
    description:
      "Living ones — verses that pulse with the heartbeat of a nation and the enduring fire of Kurdish identity.",
    rating: 4.9,
    popular: true,
  },
  {
    id: "mem-u-zin",
    title: "Mem u Zîn",
    authorId: "ehmede-khani",
    cover: card5,
    genre: "Epic Poetry",
    year: 1692,
    language: "Kurdish",
    readingTime: "8h",
    pages: 450,
    publisher: "Classical Editions",
    description:
      "The greatest Kurdish love epic — a timeless tale of passion, tragedy, and the soul of a people.",
    aboutText:
      "Mem û Zîn stands as the cornerstone of Kurdish literature, a poem of love and loss that has shaped Kurdish identity for centuries.",
    rating: 5.0,
    popular: true,
  },
  {
    id: "ghazalnus",
    title: "Ghazalnus and the Gardens",
    authorId: "bakhtyar-ali",
    cover: card6,
    genre: "Novel",
    year: 2008,
    language: "Kurdish",
    readingTime: "7h",
    pages: 380,
    description: "A surreal journey through metaphysical gardens and the fractured landscapes of memory.",
    rating: 4.6,
  },
  {
    id: "kine-em",
    title: "Kîne Em?",
    authorId: "cegerxwin",
    cover: card7,
    genre: "Poetry",
    year: 1960,
    language: "Kurdish",
    readingTime: "2h 30m",
    pages: 140,
    description: "Who are we? — revolutionary verses that ask the defining question of Kurdish identity.",
    rating: 4.8,
  },
  {
    id: "deng-u-bal",
    title: "Deng û Bal",
    authorId: "farhad-pirbal",
    cover: card1,
    genre: "Poetry",
    year: 1988,
    language: "Kurdish",
    readingTime: "1h 50m",
    pages: 112,
    publisher: "Sangar Publications",
    description: "Voice and honey — early poems of tenderness, exile, and the Kurdish homeland.",
    rating: 4.6,
  },
  {
    id: "wesfekani-evin",
    title: "Wesfekanî Evîn",
    authorId: "farhad-pirbal",
    cover: story1,
    genre: "Poetry",
    year: 2003,
    language: "Kurdish",
    readingTime: "2h",
    pages: 136,
    publisher: "Sangar Publications",
    description: "Descriptions of love — lyrical meditations on passion, loss, and the language of the heart.",
    rating: 4.7,
  },
  {
    id: "baran-u-ciya",
    title: "Baran û Çiya",
    authorId: "rebwar-siwayli",
    cover: story2,
    genre: "Poetry",
    year: 2001,
    language: "Kurdish",
    readingTime: "1h 30m",
    pages: 88,
    publisher: "Kurdistan Press",
    description: "Rain and mountains — verses rooted in the rhythms of Kurdish nature and memory.",
    rating: 4.5,
  },
  {
    id: "shar-u-giyan",
    title: "Shar û Giyan",
    authorId: "rebwar-siwayli",
    cover: story3,
    genre: "Poetry",
    year: 2010,
    language: "Kurdish",
    readingTime: "2h 10m",
    pages: 104,
    publisher: "Kurdistan Press",
    description: "City and soul — poems that move between urban life and the enduring Kurdish spirit.",
    rating: 4.6,
  },
  {
    id: "tu",
    title: "Tu",
    authorId: "mehmed-uzun",
    cover: card6,
    genre: "Novel",
    year: 1993,
    language: "Kurdish",
    readingTime: "5h 45m",
    pages: 280,
    publisher: "Avesta",
    description: "You — a novel of identity and exile that helped revive modern Kurdish fiction.",
    rating: 4.7,
  },
  {
    id: "rov",
    title: "Rov",
    authorId: "mehmed-uzun",
    cover: letter,
    genre: "Novel",
    year: 1999,
    language: "Kurdish",
    readingTime: "6h",
    pages: 320,
    publisher: "Avesta",
    description: "The plain — a sweeping narrative of Kurdish life, migration, and cultural survival.",
    rating: 4.8,
  },
  {
    id: "nubihar",
    title: "Nûbihar",
    authorId: "ehmede-khani",
    cover: card4,
    genre: "Poetry",
    year: 1688,
    language: "Kurdish",
    readingTime: "4h",
    pages: 220,
    publisher: "Classical Editions",
    description: "New spring — philosophical and lyrical poems preceding the epic Mem û Zîn.",
    rating: 4.9,
  },
];

export const LIBRARY_CATEGORIES: LibraryCategory[] = [
  { id: "poetry", label: "Poetry", icon: "poetry" },
  { id: "novels", label: "Novels", icon: "novels" },
  { id: "history", label: "History", icon: "history" },
  { id: "philosophy", label: "Philosophy", icon: "philosophy" },
  { id: "biographies", label: "Biographies", icon: "biographies" },
  { id: "culture", label: "Culture", icon: "culture" },
];

export const getBookById = (id: string) =>
  LIBRARY_BOOKS.find((book) => book.id === id);

export const getBooksByAuthor = (authorId: string, excludeBookId?: string) =>
  LIBRARY_BOOKS.filter(
    (book) => book.authorId === authorId && book.id !== excludeBookId,
  );

export const getPopularBooks = () =>
  LIBRARY_BOOKS.filter((book) => book.popular);

export const getFeaturedBooks = () => LIBRARY_BOOKS.slice(0, 4);

export const getAllBooks = () => LIBRARY_BOOKS;

export const getBooksWithQuotes = () =>
  LIBRARY_BOOKS.filter((book) => book.quoteEnglish || book.quoteKurdish);
