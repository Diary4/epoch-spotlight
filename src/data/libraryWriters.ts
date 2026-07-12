import farhadPirbal from "@/assets/images/library/writers/farhad-pirbal.jpg";
import bakhtyarAli from "@/assets/images/library/writers/bakhtiar-ali.jpg";
import rebwarSiwayli from "@/assets/images/library/writers/rebwar-siwayli.jpg";
import taalatTahir from "@/assets/images/library/writers/taalat-tahir.jpg";
import office from "@/assets/office.webp";
import natureBg from "@/assets/images/nature.webp";
import kurdistan from "@/assets/images/kurdistan.webp";
import type { LibraryWriter } from "./libraryTypes";

export const LIBRARY_WRITERS: LibraryWriter[] = [
  {
    id: "farhad-pirbal",
    name: "Farhad Pirbal",
    roles: ["Poet", "Writer", "Thinker"],
    born: "1961",
    birthplace: "Erbil, Kurdistan",
    portrait: farhadPirbal,
    portraitDark: farhadPirbal,
    portraitLibrary: office,
    bio: "Farhad Pirbal is one of the most influential voices in modern Kurdish literature. His poetry and prose explore identity, exile, love, and the enduring spirit of Kurdistan. Through decades of writing, he has shaped how Kurdish readers see themselves and their place in the world.",
    quote: "A word that comes from the heart, reaches another heart.",
    quoteTranslation: "A word that comes from the heart, reaches another heart.",
    timeline: [
      { year: "1961", text: "Born in Erbil, Kurdistan" },
      { year: "1980s", text: "Began publishing poetry and essays during a turbulent era" },
      { year: "1990s", text: "Released landmark collections including Dwem Aseman" },
      { year: "2000s", text: "Became a leading voice in Kurdish intellectual life" },
      { year: "Today", text: "Continues to write, speak, and inspire new generations" },
    ],
    bookIds: ["dwem-aseman", "deng-u-bal", "wesfekani-evin"],
    featured: true,
  },
  {
    id: "bakhtyar-ali",
    name: "Bakhtyar Ali",
    roles: ["Novelist", "Writer"],
    born: "1966",
    birthplace: "Sulaymaniyah, Kurdistan",
    lifespan: "1966 –",
    portrait: bakhtyarAli,
    portraitDark: bakhtyarAli,
    bio: "Bakhtyar Ali is celebrated for his visionary novels that blend surrealism with Kurdish political and cultural history. His work has earned international recognition and brought Kurdish fiction to global audiences.",
    quote: "Literature is the only homeland that cannot be taken away.",
    timeline: [
      { year: "1966", text: "Born in Sulaymaniyah" },
      { year: "1990s", text: "Published early novels and short fiction" },
      { year: "2000s", text: "Gained international acclaim for Ghazalnus and the Gardens of the Metaphysical" },
      { year: "Today", text: "One of the most translated Kurdish novelists" },
    ],
    bookIds: ["sinore-evine", "ghazalnus"],
    featured: true,
  },
  {
    id: "rebwar-siwayli",
    name: "Rebwar Siwayli",
    roles: ["Poet", "Writer"],
    born: "1970",
    birthplace: "Kurdistan",
    portrait: rebwarSiwayli,
    portraitDark: rebwarSiwayli,
    bio: "Rebwar Siwayli is known for lyrical poetry rooted in Kurdish landscape and memory. His verses capture the beauty of mountains, rivers, and the quiet resilience of everyday life.",
    quote: "The mountain remembers what the city forgets.",
    timeline: [
      { year: "1970", text: "Born in Kurdistan" },
      { year: "1990s", text: "Published first poetry collections" },
      { year: "2000s", text: "Established as a leading contemporary Kurdish poet" },
      { year: "Today", text: "Continues to publish and perform poetry" },
    ],
    bookIds: ["kaniya-spi", "baran-u-ciya", "shar-u-giyan"],
    featured: true,
  },
  {
    id: "taalat-tahir",
    name: "Taalat Tahir",
    roles: ["Writer", "Poet"],
    portrait: taalatTahir,
    portraitDark: taalatTahir,
    bio: "Taalat Tahir writes with clarity and warmth, exploring themes of belonging, language, and cultural heritage through poetry and prose.",
    quote: "Every poem is a bridge between what was lost and what must be kept.",
    timeline: [
      { year: "1980s", text: "Began writing and publishing" },
      { year: "2000s", text: "Contributed to Kurdish literary journals" },
      { year: "Today", text: "Active voice in contemporary Kurdish letters" },
    ],
    bookIds: [],
    featured: true,
  },
];

export const getWriterById = (id: string) =>
  LIBRARY_WRITERS.find((writer) => writer.id === id);

export const getFeaturedWriters = () =>
  LIBRARY_WRITERS.filter((writer) => writer.featured);

export const getAllWriters = () => LIBRARY_WRITERS;

export const getWritersWithQuotes = () =>
  LIBRARY_WRITERS.filter((writer) => writer.quote);

export const HERO_BACKGROUND = kurdistan;
export const FEATURED_HERO_BACKGROUND = natureBg;
