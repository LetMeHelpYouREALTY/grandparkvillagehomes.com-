import Image from "next/image";
import { headers } from "next/headers";
import { AGENT_IMAGES, getAgentPortraitCopy } from "@/lib/agent-portrait";
import { siteConfig } from "@/lib/site-config";

type DrJanPortraitProps = {
  variant?: "card" | "feature" | "hero";
  pathname?: string;
};

const SITE = siteConfig.url;

export function DrJanPortrait({ variant = "card", pathname }: DrJanPortraitProps) {
  const path = pathname ?? headers().get("x-pathname") ?? "/";
  const slot = variant === "hero" ? "hero" : variant === "feature" ? "feature" : "card";
  const copy = getAgentPortraitCopy(path, slot);
  const src =
    variant === "feature"
      ? AGENT_IMAGES.badge
      : variant === "hero"
        ? AGENT_IMAGES.circle
        : AGENT_IMAGES.portrait;

  const imageSchema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: `${SITE}${src}`,
    caption: copy.caption,
    description: copy.alt,
    creditText: "Dr. Jan Duffy",
    acquireLicensePage: `${SITE}/contact`,
    creator: {
      "@type": "Person",
      name: "Dr. Jan Duffy",
      jobTitle: "REALTOR",
    },
    contentLocation: {
      "@type": "Place",
      name: copy.place,
    },
    about: {
      "@type": "Thing",
      name: copy.topic,
    },
  };

  if (variant === "hero") {
    return (
      <figure className="mx-auto mb-6 w-fit">
        <Image
          src={AGENT_IMAGES.circle}
          alt={copy.alt}
          width={128}
          height={128}
          priority
          className="mx-auto h-24 w-24 rounded-full border border-white/40 md:h-28 md:w-28"
        />
        <figcaption className="mt-3 text-sm font-medium tracking-wide text-white">
          By Dr. Jan Duffy
        </figcaption>
      </figure>
    );
  }

  if (variant === "feature") {
    return (
      <figure className="overflow-hidden rounded-2xl bg-white">
        <Image
          src={AGENT_IMAGES.badge}
          alt={copy.alt}
          width={960}
          height={960}
          priority
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, 480px"
        />
        <figcaption className="px-4 py-3 text-sm text-slate-600">{copy.caption}</figcaption>
      </figure>
    );
  }

  return (
    <section className="border-t border-slate-200 bg-white" aria-label="Dr. Jan Duffy">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
      />
      <div className="container mx-auto flex flex-col items-center gap-5 px-4 py-10 md:flex-row md:items-center md:gap-8">
        <Image
          src={AGENT_IMAGES.portrait}
          alt={copy.alt}
          width={160}
          height={160}
          className="h-28 w-28 shrink-0 rounded-full object-cover md:h-36 md:w-36"
        />
        <div className="text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
            Grand Park Village Homes
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">By Dr. Jan Duffy</p>
          <p className="mt-2 max-w-3xl text-slate-600">{copy.caption}</p>
        </div>
      </div>
    </section>
  );
}
