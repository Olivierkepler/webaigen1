// components/LogoLoader.tsx
import Image from "next/image";
import Logo from "../components/logo"

type LogoLoaderProps = {
  size?: number;            // px
  label?: string;
  showLabel?: boolean;
  className?: string;
};

export default function LogoLoader({
  size = 72,
  label = "Loading…",
  showLabel = true,
  className = "",
}: LogoLoaderProps) {
  return (
    <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <div
        className="relative"
        style={{ width: size, height: size }}
        role="status"
        aria-label={label}
      >
        {/* subtle glow */}
        <span className="absolute inset-0 rounded-full bg-white/10 blur-xl" />

        {/* spinning ring */}
        <span className="absolute inset-0 rounded-full border-2 border-white/10 border-t-white animate-spin" />

        {/* logo */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="animate-pulse ">
            {/* <Image
              src="/images/weiagenlogo1.png"
              alt=""
              width={Math.round(size * 0.68)}
              height={Math.round(size * 0.68)}
              priority
              className="select-none"
              draggable={false}
            /> */}
            <Logo/>
          </div>
        </div>
      </div>

      {showLabel && <span className="text-sm text-white">Loading WEBAIGEN...</span>}
    </div>
  );
}