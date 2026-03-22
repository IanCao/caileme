"use client";

import { useState, useRef, useEffect } from "react";
import { cityPolicies } from "@/data/cityPolicies";

const hotCities = ["beijing", "shanghai", "guangzhou", "shenzhen", "hangzhou", "chengdu"];

interface CitySelectorProps {
  value: string;
  onChange: (code: string) => void;
  className?: string;
}

export default function CitySelector({ value, onChange, className = "" }: CitySelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const selected = cityPolicies.find((c) => c.code === value);
  const filtered = search
    ? cityPolicies.filter(
        (c) =>
          c.name.includes(search) ||
          c.province.includes(search) ||
          c.code.toLowerCase().includes(search.toLowerCase())
      )
    : cityPolicies;

  const grouped = filtered.reduce<Record<string, typeof cityPolicies>>((acc, c) => {
    const key = c.province;
    if (!acc[key]) acc[key] = [];
    acc[key].push(c);
    return acc;
  }, {});

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 text-left hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-black/10"
      >
        <span className={selected ? "text-black" : "text-gray-400"}>
          {selected ? `📍 ${selected.name}` : "选择城市"}
        </span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
          {/* 搜索 */}
          <div className="p-3 border-b border-gray-100">
            <input
              ref={inputRef}
              type="text"
              placeholder="搜索城市名称或拼音..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          {/* 热门城市 */}
          {!search && (
            <div className="px-3 pt-3 pb-2">
              <div className="text-[10px] text-gray-400 font-medium mb-2 uppercase tracking-wider">热门城市</div>
              <div className="flex flex-wrap gap-2">
                {hotCities.map((code) => {
                  const c = cityPolicies.find((p) => p.code === code);
                  if (!c) return null;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => { onChange(code); setOpen(false); setSearch(""); }}
                      className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                        value === code
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 城市列表 */}
          <div className="max-h-64 overflow-y-auto overscroll-contain border-t border-gray-100">
            {Object.keys(grouped).length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-400">未找到匹配城市</div>
            ) : (
              Object.entries(grouped).map(([province, cities]) => (
                <div key={province}>
                  <div className="px-4 py-1.5 text-[10px] text-gray-400 font-medium bg-gray-50/50 sticky top-0">
                    {province}
                  </div>
                  {cities.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => { onChange(c.code); setOpen(false); setSearch(""); }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${
                        value === c.code ? "bg-blue-50 text-black font-medium" : "text-gray-700"
                      }`}
                    >
                      <span>{c.name}</span>
                      {value === c.code && <span className="text-accent text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
