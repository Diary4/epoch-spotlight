import { Handshake, Scale, TreeDeciduous, Users } from "lucide-react";
import type { ThreadId } from "./threadsTypes";

/**
 * A mihrab arch, drawn in lucide's 24×24 / round-cap idiom so it sits beside
 * the other four badges at the same weight — lucide has no mosque glyph.
 */
function ArchGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4.5 21v-9.5a7.5 7.5 0 0 1 15 0V21" />
      <path d="M2.5 21h19" />
      <path d="M9 21v-5.5a3 3 0 0 1 6 0V21" />
      <path d="M12 4.1V2.4" />
    </svg>
  );
}

type Glyph = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const GLYPHS: Record<ThreadId, Glyph> = {
  faiths: ArchGlyph,
  nations: Users,
  rights: Scale,
  sharedLife: TreeDeciduous,
  coexistence: Handshake,
};

export function ThreadGlyph({ id }: { id: ThreadId }) {
  const Glyph = GLYPHS[id];
  return <Glyph aria-hidden="true" />;
}
