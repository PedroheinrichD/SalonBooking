"use client";

import { useState } from "react";

interface FallbackImageProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
}

/**
 * Plain <img> instead of next/image on purpose: several source files
 * referenced by this page (client before/after photos, course photo)
 * are placeholders that don't exist on disk yet. next/image's build-time
 * static import would fail; this degrades gracefully at runtime instead,
 * so swapping in real photos later is just dropping the file in /public.
 */
export default function FallbackImage({
  src,
  alt,
  label,
  className = "",
}: FallbackImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`fallback-image ${className}`} role="img" aria-label={alt}>
        <span className="fallback-image__label">{label ?? "Imagem em breve"}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- runtime-optional placeholder asset, see comment above
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
