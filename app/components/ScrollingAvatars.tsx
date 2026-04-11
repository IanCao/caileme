"use client";

import contributorsData from "@/data/generatedContributors.json";

const contributors: { name: string; avatar: string; contribution: string; link?: string }[] = contributorsData;

export default function ScrollingAvatars() {
  return (
    <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
      {contributors.map((c, i) => {
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
  );
}
