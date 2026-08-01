export type ThreadsLang = "en" | "ku" | "ar";

export type ThreadId =
  | "faiths"
  | "nations"
  | "coexistence"
  | "sharedLife"
  | "rights";

export type SceneState =
  | { kind: "attract" }
  | { kind: "hub" }
  | { kind: "closing" }
  | { kind: "thread"; threadId: ThreadId; storyIndex: number }
  | {
      kind: "story";
      threadId: ThreadId;
      storyIndex: number;
      detailIndex: number;
    };

export type ThreadsState = {
  scene: SceneState;
  lang: ThreadsLang;
  languageOpen: boolean;
  languageOrigin: "entry" | "control";
  visited: ThreadId[];
};

export type DetailCard = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  imagePosition?: string;
};

export type Story = {
  id: string;
  title: string;
  body: string;
  context: string;
  significance: string;
  image: string;
  imagePosition?: string;
  /** `contain` letterboxes the photo whole instead of cropping it to the card. */
  imageFit?: "cover" | "contain";
  detailCards: DetailCard[];
};

export type Chapter = {
  id: ThreadId;
  number: string;
  title: string;
  line: string;
  description: string;
  hero: string;
  accent: string;
  stories: Story[];
};

export type ThreadsAction =
  | { type: "ENTER" }
  | { type: "SELECT_LANGUAGE"; lang: ThreadsLang }
  | { type: "OPEN_LANGUAGE" }
  | { type: "CLOSE_LANGUAGE" }
  | { type: "OPEN_THREAD"; threadId: ThreadId }
  | { type: "SELECT_STORY"; storyIndex: number }
  | { type: "OPEN_STORY" }
  | { type: "NEXT_STORY"; storyCount: number }
  | { type: "PREVIOUS_STORY"; storyCount: number }
  | { type: "SELECT_DETAIL"; detailIndex: number }
  | { type: "NEXT_DETAIL"; detailCount: number }
  | { type: "PREVIOUS_DETAIL"; detailCount: number }
  | { type: "BACK" }
  | { type: "HOME" }
  | { type: "OPEN_CLOSING" }
  | { type: "RESET" };

export const THREAD_IDS: ThreadId[] = [
  "faiths",
  "nations",
  "coexistence",
  "sharedLife",
  "rights",
];

export const LANGUAGE_OPTIONS = [
  { code: "en" as const, label: "English", native: "English" },
  { code: "ku" as const, label: "Kurdish", native: "کوردی" },
  { code: "ar" as const, label: "Arabic", native: "العربية" },
];

export const SCENE_TRANSITION = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1] as const,
};
