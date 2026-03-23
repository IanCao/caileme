"use client";

import { useEffect, useRef } from "react";
import contributorsData from "@/data/generatedContributors.json";

const contributors: { name: string; avatar: string; contribution: string; link?: string }[] = contributorsData;

export default function ScrollingAvatars() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    let pos = 0;
    const speed = 0.5;
    const animate = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Repeat enough copies for seamless infinite scroll on any screen width
  const minCopies = Math.ceil(8 / (contributors.length || 1));
  const repeated = Array.from({ length: minCopies }, () => contributors).flat();
  // doubled is used for the seamless loop reset (pos resets at scrollWidth / 2)
  const doubled = [...repeated, ...repeated];

  return (
    <div className="overflow-hidden" ref={scrollRef} style={{ scrollBehavior: 'auto' }}>
      <div className="flex gap-4 sm:gap-6 w-max">
        {doubled.map((c, i) => {
          const isImageUrl = c.avatar.startsWith('http');
          const inner = (
            <>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xl sm:text-2xl shadow-sm overflow-hidden">
                {isImageUrl
                  ? <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                  : c.avatar}
              </div>
              <span className="text-xs text-gray-600 font-medium whitespace-nowrap">{c.name}</span>
              <span className="text-[10px] text-gray-400 whitespace-nowrap">{c.contribution}</span>
            </>
          );

          if (c.link) {
            return (
              <a
                key={i}
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 min-w-[80px] sm:min-w-[100px] hover:opacity-75 transition-opacity"
              >
                {inner}
              </a>
            );
          }

          return (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[80px] sm:min-w-[100px]">
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
