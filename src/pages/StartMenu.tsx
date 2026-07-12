import { useNavigate } from "react-router-dom";
import { requestAppFullscreen } from "@/lib/fullscreen";

type ScreenOption = {
  id: string;
  label: string;
  path: string;
};

const SCREEN_OPTIONS: ScreenOption[] = [
  { id: "01", label: "Screen 1 - Main Experience", path: "/screen-1" },
  { id: "02", label: "Screen 2 - Second Screen", path: "/screen-2" },
  { id: "03", label: "Screen 3 - Portraits", path: "/portraits" },
  { id: "04", label: "Screen 4 - Portrait Detail (ID 1)", path: "/portraits/1" },
  { id: "05", label: "Screen 5 - Portrait Timeline (ID 1)", path: "/portraits/1/timeline" },
  { id: "06", label: "Screen 6 - Touristic (v2 Grid)", path: "/touristic-v2" },
  { id: "07", label: "Screen 7 - Religions", path: "/religions" },
  { id: "08", label: "Screen 8 - Women", path: "/women" },
  { id: "09", label: "Screen 9 - Portrait Detail (ID 2)", path: "/portraits/2" },
  { id: "10", label: "Screen 10 - Portrait Timeline (ID 2)", path: "/portraits/2/timeline" },
  { id: "11", label: "Screen 11 - Portrait Detail (ID 3)", path: "/portraits/3" },
  { id: "12", label: "Screen 12 - Touristic", path: "/touristic" },
  { id: "13", label: "Screen 13 - Library Home", path: "/library" },
  { id: "14", label: "Screen 14 - Library Writers", path: "/library/writers" },
  { id: "15", label: "Screen 15 - Writer Detail (Farhad Pirbal)", path: "/library/writers/farhad-pirbal" },
  { id: "16", label: "Screen 16 - Featured Writer (Dark)", path: "/library/writers/farhad-pirbal/featured" },
  { id: "17", label: "Screen 17 - Book Detail (The Potato Eaters)", path: "/library/books/the-potato-eaters" },
  { id: "18", label: "Screen 18 - Book Reader (Preview)", path: "/library/books/the-potato-eaters/read" },
];

export default function StartMenu() {
  const navigate = useNavigate();

  const handleSelectScreen = (path: string) => {
    void requestAppFullscreen();
    // Replace history so users cannot navigate back to this launcher.
    navigate(path, { replace: true });
  };

  return (
    <main className="min-h-[100dvh] w-full overflow-x-hidden overflow-y-auto bg-[#0c1224] px-4 py-6 text-white sm:px-6 sm:py-10">
      <section className="mx-auto w-full max-w-4xl rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl backdrop-blur-sm sm:p-8">
        <h1 className="text-center text-2xl font-semibold tracking-tight sm:text-4xl">
          Screen Menu
        </h1>
        <p className="mt-3 text-center text-sm text-white/75 sm:text-base">
          Choose one screen to start. You will not be able to go back to this menu.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-8 sm:grid-cols-2 sm:gap-3">
          {SCREEN_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelectScreen(option.path)}
              className="flex w-full items-center justify-between rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-left transition hover:bg-white/10 sm:px-4 sm:py-3"
            >
              <span className="shrink-0 text-sm font-medium text-white/80">{option.id}</span>
              <span className="ml-3 min-w-0 flex-1 text-sm sm:text-base">{option.label}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
