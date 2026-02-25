// components/LoadingOverlay.tsx
import LogoLoader from "./LogoLoader";

type LoadingOverlayProps = {
  open: boolean;
  label?: string;
};

export default function LoadingOverlay({ open, label }: LoadingOverlayProps) {
  if (!open) return null;

  return (
    <div
      className="fixed p-10 inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm"
      aria-hidden={!open}
    >
      <LogoLoader size={180} label={label ?? "Loading WebAiGen…"} />
    </div>
  );
}