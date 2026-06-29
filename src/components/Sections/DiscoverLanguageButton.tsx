import React from "react";
import { Globe2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DISCOVER_LANG_OPTIONS,
  type DiscoverLangCode,
} from "@/components/Sections/discoverLanguage";

type DiscoverLanguageButtonProps = {
  lang: DiscoverLangCode;
  onSelect: (code: DiscoverLangCode) => void;
  className?: string;
  placement?: "start" | "end";
};

export default function DiscoverLanguageButton({
  lang,
  onSelect,
  className = "",
  placement = "end",
}: DiscoverLanguageButtonProps) {
  const [open, setOpen] = React.useState(false);
  const alignSide = placement === "start" ? "start" : "end";
  const positionClass =
    placement === "start" ? "left-3 sm:left-6" : "right-3 sm:right-6";

  const handleSelect = (code: DiscoverLangCode) => {
    setOpen(false);
    onSelect(code);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Choose language"
          onClick={(e) => e.stopPropagation()}
          className={`absolute top-3 z-50 grid h-9 w-9 place-items-center rounded-full border border-[#c49b52]/70 bg-[#fffaf0]/90 text-[#9b6d35] shadow-sm backdrop-blur-sm transition-colors hover:border-[#c49b52] hover:bg-[#fff3dc] sm:top-6 sm:h-10 sm:w-10 ${positionClass} ${className}`}
        >
          <Globe2 className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.75} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align={alignSide}
        sideOffset={8}
        onClick={(e) => e.stopPropagation()}
        className="w-auto min-w-[168px] rounded-xl border border-[#e1bf7a] bg-[#fffaf0] p-1.5 shadow-[0_10px_30px_rgba(84,54,16,0.14)]"
      >
        <p className="px-2.5 pb-1 pt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#9b6d35]">
          Language
        </p>
        <div className="flex flex-col gap-0.5">
          {DISCOVER_LANG_OPTIONS.map((opt) => (
            <button
              key={opt.code}
              type="button"
              dir={opt.dir}
              onClick={() => handleSelect(opt.code)}
              className={`flex w-full flex-col rounded-lg px-3 py-2 text-start transition-colors hover:bg-[#f8edd8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c49b52]/50 ${
                lang === opt.code ? "bg-[#f3e4c4]" : ""
              }`}
            >
              <span className="text-sm font-medium text-[#18362d]">{opt.native}</span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#9b6d35]">
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
