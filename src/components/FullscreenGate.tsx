type FullscreenGateProps = {
  visible: boolean;
  onActivate: () => void;
};

export default function FullscreenGate({ visible, onActivate }: FullscreenGateProps) {
  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      className="fixed inset-0 z-[9999] flex cursor-pointer flex-col items-center justify-center border-0 bg-[#0c1224] p-8 text-center text-white touch-manipulation"
      aria-label="Tap to begin"
      onClick={onActivate}
    >
      <span className="text-2xl font-light tracking-wide sm:text-3xl">Tap anywhere to begin</span>
    </button>
  );
}
