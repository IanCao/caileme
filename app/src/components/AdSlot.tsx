"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdVariant = "display" | "inArticle" | "multiplex";

interface AdSlotProps {
  variant?: AdVariant;
  slot?: string;
  className?: string;
}

const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-1331537179356559";

const slotByVariant: Record<AdVariant, string | undefined> = {
  display:
    process.env.NEXT_PUBLIC_ADSENSE_DISPLAY_SLOT || "5553655755",
  inArticle:
    process.env.NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT || "8638255142",
  multiplex:
    process.env.NEXT_PUBLIC_ADSENSE_MULTIPLEX_SLOT || "7325173473",
};

export function AdSlot({
  variant = "display",
  slot,
  className = "",
}: AdSlotProps) {
  const insRef = useRef<HTMLElement | null>(null);
  const resolvedSlot = slot || slotByVariant[variant];

  useEffect(() => {
    if (!resolvedSlot || !insRef.current) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ignore duplicate-init/runtime errors from AdSense.
    }
  }, [resolvedSlot]);

  if (!resolvedSlot) return null;

  const baseClassName =
    "overflow-hidden rounded-2xl border border-gray-100 bg-white p-4";

  if (variant === "inArticle") {
    return (
      <aside className={`${baseClassName} ${className}`} aria-label="Advertisement">
        <div className="mb-3 text-[11px] uppercase tracking-[0.24em] text-gray-400">
          Advertisement
        </div>
        <ins
          ref={insRef}
          className="adsbygoogle block text-center"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={resolvedSlot}
          data-ad-layout="in-article"
          data-ad-format="fluid"
        />
      </aside>
    );
  }

  if (variant === "multiplex") {
    return (
      <aside className={`${baseClassName} ${className}`} aria-label="Advertisement">
        <div className="mb-3 text-[11px] uppercase tracking-[0.24em] text-gray-400">
          More Sponsored Links
        </div>
        <ins
          ref={insRef}
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={resolvedSlot}
          data-ad-format="autorelaxed"
        />
      </aside>
    );
  }

  return (
    <aside className={`${baseClassName} ${className}`} aria-label="Advertisement">
      <div className="mb-3 text-[11px] uppercase tracking-[0.24em] text-gray-400">
        Advertisement
      </div>
      <ins
        ref={insRef}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={resolvedSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
