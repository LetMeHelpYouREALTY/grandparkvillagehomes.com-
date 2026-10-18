import Image from "next/image";

import { AGENT_IMAGES } from "@/lib/agent-portrait";

export const AGENT_PHOTO_SRC = AGENT_IMAGES.circle;

type AgentPhotoProps = {
  /** Rendered width/height in pixels (the image is a circle). */
  size?: number;
  className?: string;
  priority?: boolean;
};

/** Dr. Jan Duffy's round gold-ring headshot. */
export default function AgentPhoto({ size = 48, className = "", priority = false }: AgentPhotoProps) {
  return (
    <Image
      src={AGENT_PHOTO_SRC}
      alt="Dr. Jan Duffy, REALTOR®, Grand Park Village Homes"
      width={size}
      height={size}
      priority={priority}
      sizes={`${size}px`}
      className={`inline-block shrink-0 rounded-full ${className}`}
    />
  );
}
