import React from "react";
import { Building2, Globe2, Tent, Siren, ChevronLeft, X, ArrowRight } from "lucide-react";
import BcfShell from "@/components/Sections/bcf/BcfShell";
import BcfChapterPill from "@/components/Sections/bcf/BcfChapterPill";
import {
  BCF_LOCATIONS,
  bcfCopy,
  type BcfLang,
  type LocationId,
  type MapFilterId,
} from "@/components/Sections/bcf/bcfContent";
import { BCF, BCF_GLASS_CARD } from "@/components/Sections/bcf/bcfTheme";
import BcfStatValue from "@/components/Sections/bcf/BcfStatValue";
import mapBg from "@/assets/images/kurdistan.webp";
import mapThumb from "@/assets/images/TouristicPlace/ErbilCastle/IMG_8636 copy.webp";
import erbilImg from "@/assets/images/TouristicPlace/ErbilCastle/IMG_8636 copy.webp";
import duhokImg from "@/assets/images/TouristicPlace/GaliAliBag/16.webp";
import zakhoImg from "@/assets/images/TouristicPlace/Bekodian/1000140576.webp";
import kirkukImg from "@/assets/images/TouristicPlace/XanzadCastle/IMG_8529 copy 3.webp";
import sulayImg from "@/assets/images/TouristicPlace/AhmedAwa/1000140566.webp";

const locationImages: Record<LocationId, string> = {
  erbil: erbilImg,
  duhok: duhokImg,
  zakho: zakhoImg,
  kirkuk: kirkukImg,
  sulaymaniyah: sulayImg,
};

const filterIcons: Record<MapFilterId, typeof Building2> = {
  offices: Building2,
  camps: Tent,
  geographic: Globe2,
  emergency: Siren,
};

type BcfMapProps = {
  lang: BcfLang;
  selectedLocation: LocationId | null;
  onSelectLocation: (id: LocationId | null) => void;
  onExploreProjects: (id: LocationId) => void;
  onBack: () => void;
};

export default function BcfMap({
  lang,
  selectedLocation,
  onSelectLocation,
  onExploreProjects,
  onBack,
}: BcfMapProps) {
  const c = bcfCopy[lang];
  const [activeFilters, setActiveFilters] = React.useState<MapFilterId[]>([
    "offices",
    "camps",
    "geographic",
    "emergency",
  ]);
  const [hintVisible, setHintVisible] = React.useState(true);

  const toggleFilter = (id: MapFilterId) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const visibleLocations = BCF_LOCATIONS.filter((loc) =>
    loc.filters.some((f) => activeFilters.includes(f)),
  );

  const selected = selectedLocation ? c.locations[selectedLocation] : null;

  return (
    <BcfShell backgroundImage={mapBg} overlayClassName="bg-black/45">
      <div className="relative flex min-h-[1920px] flex-col px-10 pb-16 pt-24">
        <button
          type="button"
          onClick={onBack}
          className="absolute right-10 top-10 z-30 grid h-14 w-14 place-items-center rounded-full bg-black/40 backdrop-blur-sm"
          aria-label={c.back}
        >
          <ChevronLeft className="h-7 w-7 text-white" />
        </button>

        <BcfChapterPill title={c.whereWeWork} thumb={mapThumb} />

        <div className="mt-12 max-w-[640px]">
          <p dir="ltr" className="text-[80px] font-bold leading-none">
            <span className="text-[#fbf4e4]">0</span>
            <span style={{ color: BCF.gold }}>3</span>
          </p>
          <h1 className="mt-6 text-[80px] font-bold leading-[1.05]">
            <span className="text-[#fbf4e4]">{c.across} </span>
            <span style={{ color: BCF.gold }}>{c.borders}</span>
          </h1>
        </div>

        <div className="relative mt-10 min-h-[1100px] flex-1 overflow-hidden">
          <img
            src={mapBg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover brightness-[0.55] contrast-125"
          />
          <div className="absolute inset-0 bg-black/30" />

          <aside className="absolute left-6 top-6 z-20 w-[300px] rounded-[24px] bg-black/40 p-5 backdrop-blur-sm">
            {(Object.keys(c.filters) as MapFilterId[]).map((id) => {
              const Icon = filterIcons[id];
              const on = activeFilters.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleFilter(id)}
                  className="mb-3 flex w-full items-center justify-between gap-3 rounded-xl px-2 py-3 text-left transition-colors duration-200 hover:bg-white/[0.06] active:scale-[0.98] last:mb-0"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full border transition-colors duration-300 ${
                        on ? "border-[#fbc158] text-[#fbc158]" : "border-white/25 text-white/45"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      className={`text-[28px] transition-colors duration-300 ${
                        on ? "text-[#fbf4e4]" : "text-white/45"
                      }`}
                    >
                      {c.filters[id]}
                    </span>
                  </span>
                  {on ? <span className="h-px w-8 bg-[#fbc158]" /> : null}
                </button>
              );
            })}
          </aside>

          {visibleLocations.map((loc) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => {
                setHintVisible(false);
                onSelectLocation(loc.id);
              }}
              className="group absolute z-10 -translate-x-1/2 -translate-y-full transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:z-20 hover:scale-110 active:scale-100"
              style={{ left: loc.x, top: loc.y }}
            >
              <span className="relative flex flex-col items-center">
                <span className="rounded-full border border-[#fbb22f] bg-black/50 px-5 py-3 text-[28px] font-medium text-[#fbf4e4] transition-[background-color,border-color,box-shadow] duration-300 group-hover:border-[#fbc158] group-hover:bg-black/70 group-hover:shadow-[0_0_28px_rgba(251,193,88,0.4)]">
                  {c.locations[loc.id].name}
                </span>
                <span
                  className="mt-1 h-0 w-0 border-l-[10px] border-r-[10px] border-t-[14px] border-l-transparent border-r-transparent"
                  style={{ borderTopColor: BCF.goldBright }}
                />
              </span>
            </button>
          ))}

          {hintVisible && !selectedLocation ? (
            <div className="pointer-events-none absolute left-1/2 top-[52%] z-20 -translate-x-1/2 text-center">
              <p className="rounded-full bg-black/55 px-6 py-3 text-[24px] text-white backdrop-blur-sm">
                {c.tapToExplore}
              </p>
            </div>
          ) : null}

          {selected && selectedLocation ? (
            <div
              key={selectedLocation}
              className="absolute inset-x-10 bottom-10 z-30 mx-auto max-w-[920px] animate-fade-in"
            >
              <div className={`${BCF_GLASS_CARD} p-8`}>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h2 className="text-[48px] font-semibold" style={{ color: BCF.gold }}>
                    {selected.name}
                  </h2>
                  <button
                    type="button"
                    onClick={() => onSelectLocation(null)}
                    className="grid h-12 w-12 place-items-center rounded-full border border-white/30"
                    aria-label={c.close}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <p className="max-w-[760px] text-[24px] leading-relaxed text-white/80">
                  {selected.description}
                </p>
                <img
                  src={locationImages[selectedLocation]}
                  alt=""
                  className="mt-6 h-[280px] w-full rounded-xl object-cover"
                />
                <div className="mt-7 grid grid-cols-2 gap-8">
                  <div>
                    <BcfStatValue value={selected.projectsStat} className="text-[52px] font-bold leading-none" />
                    <p className="mt-2 text-[22px] text-white/75">{selected.projectsLabel}</p>
                  </div>
                  <div>
                    <BcfStatValue value={selected.peopleStat} className="text-[52px] font-bold leading-none" />
                    <p className="mt-2 text-[22px] text-white/75">{selected.peopleLabel}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onExploreProjects(selectedLocation)}
                  className="group mt-8 flex w-full items-center justify-between rounded-full border border-[#fbc158]/50 px-8 py-5 transition-[background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#fbc158]/10 hover:shadow-[0_0_36px_rgba(251,193,88,0.22)] active:scale-[0.99]"
                >
                  <span className="text-[28px] text-white">{selected.explore}</span>
                  <span
                    className="grid h-14 w-14 place-items-center rounded-full border-2 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                    style={{ borderColor: BCF.gold }}
                  >
                    <ArrowRight className="h-7 w-7" style={{ color: BCF.gold }} />
                  </span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </BcfShell>
  );
}
