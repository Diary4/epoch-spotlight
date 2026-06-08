import { BookOpen, Feather, Mountain, Leaf, Users, Star } from "lucide-react";
import type { LibraryCategory } from "@/data/libraryTypes";

const iconMap = {
  poetry: Feather,
  novels: BookOpen,
  history: Mountain,
  philosophy: Leaf,
  biographies: Users,
  culture: Star,
};

type CategoryCardProps = {
  category: LibraryCategory;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon];

  return (
    <button
      type="button"
      className="flex w-24 shrink-0 flex-col items-center gap-2 rounded-2xl bg-[#F0EBE3] px-3 py-4 transition-colors hover:bg-[#E8E0D4] sm:w-28"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C5A059]/30">
        <Icon className="h-6 w-6 text-[#C5A059]" strokeWidth={1.5} />
      </div>
      <span className="text-center text-xs text-[#2D4635]">{category.label}</span>
    </button>
  );
}
