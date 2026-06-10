import { useNavigate } from "react-router-dom";

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
  { id: "06", label: "Screen 6 - Slider", path: "/slider" },
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
  { id: "17", label: "Screen 17 - Book Detail (Dwem Aseman)", path: "/library/books/dwem-aseman" },
  { id: "18", label: "Screen 18 - Book Reader (Preview)", path: "/library/books/dwem-aseman/read" },
];

export default function StartMenu() {
  const navigate = useNavigate();

  const handleSelectScreen = (path: string) => {
    // Replace history so users cannot navigate back to this launcher.
    navigate(path, { replace: true });
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#0c1224] px-6 py-10 text-white">
      <section className="w-full max-w-4xl rounded-2xl border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
        <h1 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
          Screen Menu
        </h1>
        <p className="mt-3 text-center text-sm text-white/75 sm:text-base">
          Choose one screen to start. You will not be able to go back to this menu.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SCREEN_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelectScreen(option.path)}
              className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10"
            >
              <span className="text-sm font-medium text-white/80">{option.id}</span>
              <span className="ml-3 flex-1 text-base">{option.label}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
