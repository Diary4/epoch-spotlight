import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  BookOpen,
  Grid3X3,
  Clock,
  Map,
  Quote,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", icon: Home, path: "/library" },
  { label: "Writers", icon: Users, path: "/library/writers" },
  { label: "Books", icon: BookOpen, path: "/library/books" },
  { label: "Categories", icon: Grid3X3, path: "/library/books" },
  { label: "Timeline", icon: Clock, path: "/library/writers" },
  { label: "Map", icon: Map, path: "/library" },
  { label: "Quotes", icon: Quote, path: "/library/writers" },
  { label: "Favorites", icon: Heart, path: "/library" },
];

export default function LibrarySidebar() {
  const location = useLocation();

  return (
    <aside className="hidden w-48 shrink-0 flex-col bg-[#0B1C14] py-8 lg:flex xl:w-56 3xl:w-64 3xl:py-10">
      <nav className="flex flex-col gap-1 px-3 xl:px-4 3xl:gap-2">
        {navItems.map((item) => {
          const isActive =
            item.path === location.pathname ||
            (item.label === "Books" &&
              (location.pathname === "/library/books" ||
                /^\/library\/books\/[^/]+$/.test(location.pathname))) ||
            (item.label === "Writers" &&
              (location.pathname === "/library/writers" ||
                location.pathname.startsWith("/library/writers/")));

          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors xl:text-base 3xl:gap-4 3xl:px-4 3xl:py-3.5 3xl:text-lg",
                isActive
                  ? "bg-[#1B3022] text-[#C5A059]"
                  : "text-[#B0926A]/80",
              )}
            >
              <item.icon className="h-4 w-4 shrink-0 xl:h-5 xl:w-5 3xl:h-6 3xl:w-6" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
