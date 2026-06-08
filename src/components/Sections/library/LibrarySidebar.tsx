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
  { label: "Writers", icon: Users, path: "/library/browse" },
  { label: "Books", icon: BookOpen, path: "/library/browse" },
  { label: "Categories", icon: Grid3X3, path: "/library/browse" },
  { label: "Timeline", icon: Clock, path: "/library/browse" },
  { label: "Map", icon: Map, path: "/library/browse" },
  { label: "Quotes", icon: Quote, path: "/library/browse" },
  { label: "Favorites", icon: Heart, path: "/library/browse" },
];

export default function LibrarySidebar() {
  const location = useLocation();

  return (
    <aside className="hidden w-48 shrink-0 flex-col bg-[#0B1C14] py-8 lg:flex">
      <nav className="flex flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive =
            item.path === location.pathname ||
            (item.label === "Books" && location.pathname.startsWith("/library/books"));

          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-[#1B3022] text-[#C5A059]"
                  : "text-[#B0926A]/80 hover:bg-[#1B3022]/50 hover:text-[#C5A059]",
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
