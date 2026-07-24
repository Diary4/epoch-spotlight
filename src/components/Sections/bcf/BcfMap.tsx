import React from "react";
import { Building2, Globe2, Tent, Siren, ChevronLeft, X, ArrowRight } from "lucide-react";
import BcfShell from "@/components/Sections/bcf/BcfShell";
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
    <BcfShell>
      <img
        src={mapBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40 brightness-50 contrast-125 saturate-50"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(20,30,50,0.35),_#050505_75%)]" />

      <div className="relative z-10 flex min-h-[1920px] flex-col px-10 pb-16 pt-36">
        <button
          type="button"
          onClick={onBack}
          className="mb-8 flex w-fit items-center gap-2 text-[22px] text-white/70"
        >
          <ChevronLeft className="h-6 w-6" />
          {c.back}
        </button>

        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-[22px] tracking-[0.16em] text-white/65">{c.whereWeWork}</p>
            <h1 className="mt-3 text-[72px] font-semibold leading-none">
              <span style={{ color: BCF.gold }}>03 </span>
              <span className="text-white">{c.across} </span>
              <span style={{ color: BCF.gold }}>{c.borders}</span>
            </h1>
          </div>
        </div>

        <div className="relative min-h-[1200px] flex-1 overflow-hidden rounded-[28px] border border-white/10">
          <img
            src={mapBg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover brightness-[0.45] contrast-125"
          />
          <div className="absolute inset-0 bg-black/35" />

          <aside className={`${BCF_GLASS_CARD} absolute left-6 top-6 z-20 w-[280px] p-5`}>
            {(Object.keys(c.filters) as MapFilterId[]).map((id) => {
              const Icon = filterIcons[id];
              const on = activeFilters.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleFilter(id)}
                  className="mb-3 flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left last:mb-0"
                >
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-full border ${
                      on ? "border-[#e8c56a] text-[#e8c56a]" : "border-white/25 text-white/45"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className={`text-[22px] ${on ? "text-white" : "text-white/45"}`}>
                    {c.filters[id]}
                  </span>
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
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: loc.x, top: loc.y }}
            >
              <span className="relative flex flex-col items-center">
                <span className="h-4 w-4 rounded-full bg-white shadow-[0_0_18px_rgba(232,197,106,0.9)]" />
                <span className="mt-2 rounded-full bg-black/55 px-3 py-1 text-[18px] text-white backdrop-blur-sm">
                  {c.locations[loc.id].name}
                </span>
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
            <div className="absolute inset-x-10 bottom-10 z-30 mx-auto max-w-[920px]">
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
                  className="mt-8 flex w-full items-center justify-between rounded-full border border-[#e8c56a]/50 px-8 py-5"
                >
                  <span className="text-[28px] text-white">{selected.explore}</span>
                  <span
                    className="grid h-14 w-14 place-items-center rounded-full border-2"
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
