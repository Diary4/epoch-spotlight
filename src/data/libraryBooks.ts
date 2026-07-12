import dwemCover from "@/assets/images/new/dwem.webp";
import card3 from "@/assets/mainImages/card-3.webp";
import story1 from "@/assets/mainImages/story-1.webp";
import type { LibraryBook, LibraryCategory } from "./libraryTypes";

export const LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: "the-potato-eaters",
    title: "The Potato Eaters: Stories",
    authorId: "farhad-pirbal",
    cover: story1,
    genre: "Short Stories",
    year: 2024,
    language: "English",
    readingTime: "5h",
    pages: 179,
    publisher: "Deep Vellum Publishing",
    isbn: "9781646052912",
    description:
      "From Kurdish poet and writer Farhad Pirbal, a heartbreaking collection of short stories about isolation, displacement, and otherness in contemporary society.",
    aboutText:
      "Translated by Alana Marie Levinson-Labrosse and Jiyar Homer. Each tale in The Potato Eaters underlines otherness — isolation and displacement in contemporary society. Pirbal's characters are at once resonant and shocking, his ability to decry trauma reminiscent of American greats like Morrison and Hurston. The title story is one of the most acclaimed Kurdish short stories: a famine-stricken town survives on potatoes alone, abandoning currency for their coveted starch. When the protagonist returns from his travels with gold, he is met with utter apathy — a stranger in his own country. Also included are \"Lamartine,\" about a poetry scholar who imagines a world where artists are paid by the line, and \"The Deserter,\" in which a forgetful soldier searches for his lost leg before war calls him back.",
    rating: 3.93,
    popular: true,
  },
  {
    id: "hotel-europe",
    title: "هوتێل ئەوروپا",
    originalTitle: "هوتێل ئەوروپا",
    authorId: "farhad-pirbal",
    cover: dwemCover,
    genre: "Literature",
    year: 2010,
    language: "Kurdish",
    readingTime: "6h",
    pages: 212,
    publisher: "کولتوور",
    isbn: "B0DLZSVWM2",
    description:
      "Hotel Europe narrates stories of Kurdish migrants living in Europe — displaced, far from homeland, and immersed in the loneliness of the West.",
    aboutText:
      "Farhad Pirbal has sought to forge from his intensely formalist literature a tool to portray the many facets of Eastern migrants' lives. First published in 2010; 2020 paperback edition by کولتوور.",
    titleLocalized: {
      en: "Hotel Europe",
      ku: "هوتێل ئەوروپا",
      ar: "فندق أوروبا",
    },
    genreLocalized: {
      en: "Literature",
      ku: "ئەدەبیات",
      ar: "أدب",
    },
    descriptionLocalized: {
      en: "Hotel Europe narrates stories of Kurdish migrants living in Europe — displaced, far from homeland, and immersed in the loneliness of the West.",
      ku: "هوتێل ئەوروپا چیرۆکەکانی کۆچبەرە کوردەکانی نیشتەجێبووی ئەوروپایە؛ دوور لە نیشتمان و لە تەنهایی ڕۆژئاوادا نوقوم.",
      ar: "فندق أوروبا يروي قصصاً للمهاجرين الأكراد المقيمين في أوروبا؛ بلا وطن وبعيدين عن الديار وغرقى في وحدة الغرب.",
    },
    aboutTextLocalized: {
      en: "Farhad Pirbal has sought to forge from his intensely formalist literature a tool to portray the many facets of Eastern migrants' lives. First published in 2010; 2020 paperback edition by کولتوور.",
      ku: "فرهاد پیربال هەوڵی داوە لە ئەدەبیەتە فۆرمالیستەکەیەوە ئامرازێک دروست بکات بۆ وێناکردنی لایە جیاوازەکانی ژیانی کۆچبەرانی ڕۆژھەڵات. یەکەم جار لە ٢٠١٠ بڵاوکراوەتەوە؛ چاپی ٢٠٢٠ لەلایەن کولتوور.",
      ar: "حاول فرهاد پيربال أن يصنع من أدبه الرسمي المكثف أداة لتصوير وجوه الحياة المختلفة للمهاجرين الشرقيين. نُشر لأول مرة عام ٢٠١٠؛ طبعة ورقية ٢٠٢٠ من كولتوور.",
    },
    quoteKurdish:
      "کاتێک گەڕامەوە ماڵەوە، دەمویست بچم بۆ ئەوە کە چەمپت و کۆڵەم بخەمە سەر بۆ ئەوەی سبەی بەیانی ڕاوەم بۆ جبه.",
    quoteEnglish:
      "When I returned home, I wanted to pack my suitcase and backpack to leave for the front tomorrow morning.",
    quoteArabic:
      "عندما عدت إلى البيت، أردت أن أذهب لأحزم حقيبتي وحقيبة ظهري لأغادر إلى الجبهة صباح الغد.",
    rating: 4.5,
    popular: true,
  },
  {
    id: "triangular-tomb",
    title: "قەبرێکی سێگۆشە",
    originalTitle: "قەبرێکی سێگۆشە",
    authorId: "farhad-pirbal",
    cover: card3,
    genre: "Novel",
    year: 2013,
    language: "Kurdish",
    readingTime: "7h",
    pages: 264,
    publisher: "کولتوور",
    isbn: "B0DM2589XJ",
    description:
      "Fereidun's father vanished when he was fourteen. Trapped in a cave with seven strangers who have forgotten time itself, he sets out to find his father's triangular tomb.",
    aboutText:
      "Farhad Pirbal's novel follows Fereidun as he emerges from the cave, discovers he is in northern Kurdistan, falls in love with Rendan, and is imprisoned — all while searching for the tomb that holds the key to his past. Published February 1, 2013 by کولتوور.",
    titleLocalized: {
      en: "A Triangular Tomb",
      ku: "قەبرێکی سێگۆشە",
      ar: "قبر مثلث",
    },
    genreLocalized: {
      en: "Novel",
      ku: "ڕۆمان",
      ar: "رواية",
    },
    descriptionLocalized: {
      en: "Fereidun's father vanished when he was fourteen. Trapped in a cave with seven strangers who have forgotten time itself, he sets out to find his father's triangular tomb.",
      ku: "لەم ڕۆمانەدا پاڵەوانەکە فەرەیدونە؛ باوکی لە ڕووداوێکدا بێسەروشوێن کراوە کاتێک تەمەنی ١٤ ساڵ بووە. لەگەڵ حەوت کەسی تر لە ناو ئەشکەوتێک دەژین کە نازانن کەوتۆتە کوێ و تەمەن و کاتیان لەبیرچۆتەوە.",
      ar: "اختفى والد فريدون في حادث عندما كان في الرابعة عشرة. يعيش مع سبعة غرباء في كهف لا يعرفون أين سقطوا، وقد نسوا أعمارهم وزمانهم، وينطلق بحثاً عن قبر والده المثلث.",
    },
    aboutTextLocalized: {
      en: "Farhad Pirbal's novel follows Fereidun as he emerges from the cave, discovers he is in northern Kurdistan, falls in love with Rendan, and is imprisoned — all while searching for the tomb that holds the key to his past. Published February 1, 2013 by کولتوور.",
      ku: "فەرەیدون لە ئەشکەوتەکە دەردەچێت، لە ڕێگادا دووچاری خێزانێک دەبێت و بۆی دەردەکەوێت کەوتۆتە باکوری کوردستان. عاشقی ڕەندان دەبێت کە بەڵێنی پێدەدا یارمەتی بدات بۆ دۆزینەوەی قەبرە سێگۆشەکەی باوکی، هەرچەندە فەرەیدون دەستگیر دەکرێت و لە زیندان دەمینێتەوە. ڕۆمانەکە کۆمەڵێک ڕووداو و بەسەرهاتی لەخۆدەگرێت.",
      ar: "يتبع فرهاد پيربال فريدون وهو يخرج من الكهف، ويلتقي بعائلة فيدرك أنهم في شمال كردستان. يقع في حب رندان التي وعدته بمساعدته في العثور على قبر والده، بينما يُعتقل ويبقى في السجن. الرواية تضم مجموعة من الأحداث والمغامرات.",
    },
    quoteKurdish:
      "لێرە لەگەڵ حەوت کەسی تر لە نێو ئەشکەوتێک دەژین کە نازانن کەوتۆتە کوێ، هەروەها تەمەن و کاتیان لەبیرچۆتەوە.",
    quoteEnglish:
      "Here we live with seven others inside a cave, not knowing where we have landed — our age and sense of time forgotten.",
    quoteArabic:
      "هنا نعيش مع سبعة آخرين في كهف، لا نعرف أين سقطنا، وقد نُسي عمرنا وزماننا.",
    rating: 4.6,
    popular: true,
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
