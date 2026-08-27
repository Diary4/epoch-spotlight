import { useNavigate } from "react-router-dom";
import { requestAppFullscreen } from "@/lib/fullscreen";

type ScreenOption = {
  id: string;
  label: string;
  path: string;
};

const SCREEN_OPTIONS: ScreenOption[] = [
  { id: "01", label: "Kurdistan", path: "/screen-1" },
  { id: "02", label: "Religion", path: "/religions-v4" },
  { id: "03", label: "Women", path: "/women" },
  { id: "04", label: "Touristic Places", path: "/touristic-v2" },
  { id: "05", label: "Digital Library", path: "/library" },
  { id: "06", label: "BCF", path: "/bcf" },
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
