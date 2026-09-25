import Image from "next/image";
import Link from "next/link";
import { AGENT_IMAGES } from "@/lib/agent-portrait";

type SiteLogoProps = {
  imageAlt: string;
  tone?: "dark" | "light";
  priority?: boolean;
};

export function SiteLogo({ imageAlt, tone = "dark", priority = false }: SiteLogoProps) {
  const titleColor = tone === "light" ? "text-white" : "text-slate-900";
  const subColor = tone === "light" ? "text-white/80" : "text-slate-600";

  return (
    <Link href="/" className="flex min-w-0 items-center gap-2">
      <Image
        src={AGENT_IMAGES.phoneCircle}
        alt={imageAlt}
        width={56}
        height={56}
        priority={priority}
        sizes="56px"
        className="h-12 w-12 shrink-0 rounded-full object-contain md:h-14 md:w-14"
      />
      <span className="flex min-w-0 flex-col text-left leading-tight">
        <span className={`text-[13px] font-bold leading-tight sm:text-base ${titleColor}`}>
          Grand Park Village Homes
        </span>
        <span className={`text-[11px] sm:text-xs ${subColor}`}>By Dr. Jan Duffy</span>
      </span>
    </Link>
  );
}
