export type LangCode = "en" | "ku" | "ar";

export type LocalizedText = Partial<Record<LangCode, string>>;

export type LibraryWriter = {
  id: string;
  name: string;
  roles: string[];
  born?: string;
  birthplace?: string;
  lifespan?: string;
  portrait: string;
  portraitDark?: string;
  portraitLibrary?: string;
  bio: string;
  quote?: string;
  quoteTranslation?: string;
  timeline: { year: string; text: string }[];
  bookIds: string[];
  featured?: boolean;
};

export type LibraryBook = {
  id: string;
  title: string;
  authorId: string;
  cover: string;
  genre: string;
  year: number;
  language: string;
  readingTime?: string;
  pages?: number;
  publisher?: string;
  isbn?: string;
  description: string;
  aboutText?: string;
  originalTitle?: string;
  titleLocalized?: LocalizedText;
  genreLocalized?: LocalizedText;
  descriptionLocalized?: LocalizedText;
  aboutTextLocalized?: LocalizedText;
  quoteKurdish?: string;
  quoteEnglish?: string;
  quoteArabic?: string;
  rating?: number;
  popular?: boolean;
};

export type LibraryCategory = {
  id: string;
  label: string;
  icon: "poetry" | "novels" | "history" | "philosophy" | "biographies" | "culture";
};
