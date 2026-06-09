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
      className="flex w-24 shrink-0 flex-col items-center gap-2 rounded-2xl bg-[#F0EBE3] px-3 py-4 sm:w-28 lg:w-36 lg:gap-3 lg:py-6 xl:w-40 3xl:w-48 3xl:py-8"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#C5A059]/30 lg:h-16 lg:w-16 3xl:h-20 3xl:w-20">
        <Icon className="h-6 w-6 text-[#C5A059] lg:h-8 lg:w-8 3xl:h-10 3xl:w-10" strokeWidth={1.5} />
      </div>
      <span className="text-center text-xs text-[#2D4635] lg:text-sm 3xl:text-lg">{category.label}</span>
    </button>
  );
}
