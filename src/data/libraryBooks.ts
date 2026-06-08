import card1 from "@/assets/mainImages/card-1.webp";
import card2 from "@/assets/mainImages/card-2.webp";
import card3 from "@/assets/mainImages/card-3.webp";
import card4 from "@/assets/mainImages/discoverkurdistan/card-1.webp";
import card5 from "@/assets/mainImages/discoverkurdistan/card-2.webp";
import card6 from "@/assets/mainImages/discoverkurdistan/card-3.webp";
import card7 from "@/assets/mainImages/discoverkurdistan/card-4.webp";
import type { LibraryBook, LibraryCategory } from "./libraryTypes";

export const LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: "dwem-aseman",
    title: "Dwem Aseman",
    authorId: "farhad-pirbal",
    cover: card1,
    coverColor: "#1B3022",
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
    coverColor: "#C4A882",
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
    coverColor: "#2D4635",
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
    coverColor: "#C67B4E",
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
    coverColor: "#4A3728",
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
    coverColor: "#3D5A4C",
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
    coverColor: "#5C4033",
    genre: "Poetry",
    year: 1960,
    language: "Kurdish",
    readingTime: "2h 30m",
    pages: 140,
    description: "Who are we? — revolutionary verses that ask the defining question of Kurdish identity.",
    rating: 4.8,
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

export const getBooksByAuthor = (authorId: string) =>
  LIBRARY_BOOKS.filter((book) => book.authorId === authorId);

export const getPopularBooks = () =>
  LIBRARY_BOOKS.filter((book) => book.popular);

export const getFeaturedBooks = () => LIBRARY_BOOKS.slice(0, 4);
