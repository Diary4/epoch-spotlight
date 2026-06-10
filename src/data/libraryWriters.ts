import benjaminfranklin from "@/assets/images/benjaminfranklin.webp";
import napoleon from "@/assets/images/napel.webp";
import trump from "@/assets/images/trump.webp";
import firstPerson from "@/assets/firstperson.webp";
import laylaZana from "@/assets/images/women/layla-zana.webp";
import najibaKhan from "@/assets/images/women/najiba-khan.webp";
import kurdistanMukryani from "@/assets/images/women/kurdistan-mukryani.webp";
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
    portrait: benjaminfranklin,
    portraitDark: benjaminfranklin,
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
    bookIds: ["dwem-aseman", "kaniya-spi"],
    featured: true,
  },
  {
    id: "bakhtyar-ali",
    name: "Bakhtyar Ali",
    roles: ["Novelist", "Writer"],
    born: "1966",
    birthplace: "Sulaymaniyah, Kurdistan",
    lifespan: "1966 –",
    portrait: napoleon,
    portraitDark: napoleon,
    bio: "Bakhtyar Ali is celebrated for his visionary novels that blend surrealism with Kurdish political and cultural history. His work has earned international recognition and brought Kurdish fiction to global audiences.",
    quote: "Literature is the only homeland that cannot be taken away.",
    timeline: [
      { year: "1966", text: "Born in Sulaymaniyah" },
      { year: "1990s", text: "Published early novels and short fiction" },
      { year: "2000s", text: "Gained international acclaim for Ghazalnus and the Gardens of the Metaphysical" },
      { year: "Today", text: "One of the most translated Kurdish novelists" },
    ],
    bookIds: ["sinore-evine"],
    featured: true,
  },
  {
    id: "rebwar-siwayli",
    name: "Rebwar Siwayli",
    roles: ["Poet", "Writer"],
    born: "1970",
    birthplace: "Kurdistan",
    portrait: trump,
    portraitDark: trump,
    bio: "Rebwar Siwayli is known for lyrical poetry rooted in Kurdish landscape and memory. His verses capture the beauty of mountains, rivers, and the quiet resilience of everyday life.",
    quote: "The mountain remembers what the city forgets.",
    timeline: [
      { year: "1970", text: "Born in Kurdistan" },
      { year: "1990s", text: "Published first poetry collections" },
      { year: "2000s", text: "Established as a leading contemporary Kurdish poet" },
      { year: "Today", text: "Continues to publish and perform poetry" },
    ],
    bookIds: ["kaniya-spi"],
    featured: true,
  },
  {
    id: "taalat-tahir",
    name: "Taalat Tahir",
    roles: ["Writer", "Poet"],
    portrait: firstPerson,
    portraitDark: firstPerson,
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
  {
    id: "cegerxwin",
    name: "Cegerxwîn",
    roles: ["Poet", "Writer"],
    lifespan: "1903 – 1984",
    birthplace: "Mardin",
    portrait: laylaZana,
    portraitDark: laylaZana,
    bio: "Cegerxwîn is one of the greatest Kurdish poets of the 20th century. His epic verses celebrate Kurdish identity, resistance, and the beauty of the homeland.",
    quote: "We are the living ones — our language is our weapon and our shield.",
    timeline: [
      { year: "1903", text: "Born in Mardin" },
      { year: "1930s", text: "Published early revolutionary poetry" },
      { year: "1960s", text: "Wrote landmark works including Kîne Em?" },
      { year: "1984", text: "Passed away, leaving a lasting literary legacy" },
    ],
    bookIds: ["zindiyan"],
    featured: true,
  },
  {
    id: "mehmed-uzun",
    name: "Mehmed Uzun",
    roles: ["Writer", "Novelist"],
    lifespan: "1953 – 2007",
    birthplace: "Siverek, Turkey",
    portrait: najibaKhan,
    portraitDark: najibaKhan,
    bio: "Mehmed Uzun was a pioneering Kurdish novelist whose works explored exile, identity, and the Kurdish struggle for cultural survival.",
    quote: "To write in Kurdish is an act of courage, memory, and love.",
    timeline: [
      { year: "1953", text: "Born in Siverek" },
      { year: "1970s", text: "Began writing in exile" },
      { year: "1990s", text: "Published acclaimed novels in Kurdish" },
      { year: "2007", text: "Passed away in Diyarbakır" },
    ],
    bookIds: ["mem-u-zin"],
    featured: true,
  },
  {
    id: "ehmede-khani",
    name: "Ehmedê Xanî",
    roles: ["Poet", "Philosopher"],
    lifespan: "1650 – 1707",
    birthplace: "Hakkari",
    portrait: kurdistanMukryani,
    portraitDark: kurdistanMukryani,
    bio: "Ehmedê Xanî is the author of Mem û Zîn, the greatest Kurdish epic poem. His work remains central to Kurdish literary and cultural identity.",
    quote: "Love is a boundary that no power on earth can ever cross.",
    timeline: [
      { year: "1650", text: "Born in Hakkari region" },
      { year: "1692", text: "Completed Mem û Zîn" },
      { year: "1707", text: "Passed away, leaving the Kurdish national epic" },
    ],
    bookIds: ["mem-u-zin"],
    featured: false,
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
