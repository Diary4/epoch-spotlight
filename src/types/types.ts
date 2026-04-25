export type LangCode = "ku" | "en" | "ar";

export type Story = { title: string; description: string };

export type PeopleItem = { 
  id: string; 
  title: string; 
  description: string; 
  image: string; 
  icon: string 
};

export type JourneyItem = { 
  id: string; 
  title: string; 
  description: string; 
  image: string; 
  icon: string 
};

export type SystemNode = { 
  title: string; 
  subtitle: string; 
  icon: string 
};

export type SystemItem = { 
  id: string; 
  title: string; 
  description: string; 
  image: string; 
  icon: string 
};

export type LandItem = { 
  id: string; 
  title: string; 
  description: string; 
  image: string; 
  icon: string 
};

export type SectionView = "hero" | "people" | "journey" | "system" | "landFuture";

export interface PeopleContent {
  title: string;
  subtitle: string;
  heroImage: string;
  items: PeopleItem[];
}

export interface JourneyContent {
  title: string;
  subtitle: string;
  items: JourneyItem[];
}

export interface SystemContent {
  title: string;
  subtitle: string;
  center: SystemNode;
  left: SystemNode;
  right: SystemNode;
  items: SystemItem[];
}

export interface LandFutureContent {
  title: string;
  subtitle: string;
  mapTitle: string;
  mapCities: string[];
  items: LandItem[];
}

export interface MenuUI {
  previous: string;
  returnToMain: string;
  next: string;
}