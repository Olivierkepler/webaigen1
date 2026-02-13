"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Command, X } from "lucide-react";

import { getSearchItems, type SearchItem } from "@/app/lib/searchIndex";

type SearchBarProps = {
  items?: SearchItem[];
  placeholder?: string;
};

export default function SearchBar({ items, placeholder = "Search…" }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchItems = useMemo(() => items ?? getSearchItems(), [items]);

  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchItems.slice(0, 7);

    return searchItems
      .map((item) => {
        const haystack = [
          item.title,
          item.description ?? "",
          ...(item.keywords ?? []),
          item.href,
          item.meta ?? "",
        ]
          .join(" ")
          .toLowerCase();

        const score =
          (item.title.toLowerCase().includes(q) ? 4 : 0) +
          ((item.keywords ?? []).some((k) => k.toLowerCase().includes(q)) ? 2 : 0) +
          (haystack.includes(q) ? 1 : 0);

        return { item, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.item)
      .slice(0, 10);
  }, [searchItems, query]);

  // Cmd+K / Ctrl+K to focus + keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if ((e.metaKey || e.ctrlKey) && key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
        return;
      }

      if (!isOpen) return;

      if (key === "escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      } else if (key === "arrowdown") {
        e.preventDefault();
        setActiveIndex((i) => clamp(i + 1, 0, Math.max(0, filtered.length - 1)));
      } else if (key === "arrowup") {
        e.preventDefault();
        setActiveIndex((i) => clamp(i - 1, 0, Math.max(0, filtered.length - 1)));
      } else if (key === "enter") {
        e.preventDefault();
        const target = filtered[clamp(activeIndex, 0, Math.max(0, filtered.length - 1))];
        if (target) {
          setIsOpen(false);
          setQuery("");
          router.push(target.href);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, filtered, router]);

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Reset selection on query change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const showDropdown = isOpen && (query.trim().length > 0 || filtered.length > 0);

  return (
    <div className="relative w-full max-w-md">
      {/* Input shell */}
      <div
        className={[
          "group flex items-center gap-2 px-3 py-2 rounded-lg",
          "bg-[#111111]/80 border border-white/10",
          "backdrop-blur-md transition-all duration-200",
          isFocused ? "ring-1 ring-[#d4af37]/70 border-[#d4af37]/30" : "hover:border-white/20",
        ].join(" ")}
      >
        <Search className="w-4 h-4 text-white/45 shrink-0" />

        <input
          ref={inputRef}
          id="navbar-search"
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(true);
          }}
          onBlur={() => {
            setIsFocused(false);
            window.setTimeout(() => setIsOpen(false), 120);
          }}
          className="bg-transparent border-none outline-none text-sm text-white/85 w-full placeholder:text-white/35"
          aria-label="Search"
          aria-expanded={showDropdown}
          aria-controls="navbar-search-results"
          autoComplete="off"
        />

        {query.length > 0 && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
              setIsOpen(true);
            }}
            className="p-1 rounded hover:bg-white/5 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-white/45" />
          </button>
        )}

        <div className="hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.03] text-[10px] text-white/45 font-medium">
          <Command className="w-3 h-3" />
          <span>K</span>
        </div>
      </div>

      {showDropdown && (
        <div
          id="navbar-search-results"
          className="absolute left-0 right-0 mt-2 rounded-xl border border-white/10 bg-[#050505]/95 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.55)] overflow-hidden"
          role="listbox"
        >
          <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between">
            <p className="text-[10px] font-montserrat uppercase tracking-[4px] text-white/40">Results</p>
            <p className="text-[10px] font-mono text-white/35">{filtered.length}</p>
          </div>

          {filtered.length === 0 ? (
            <div className="px-4 py-5 text-sm text-white/55">
              No results for <span className="text-white/85">"{query.trim()}"</span>
            </div>
          ) : (
            <ul className="py-1">
              {filtered.map((item, idx) => {
                const isActive = idx === clamp(activeIndex, 0, filtered.length - 1);
                return (
                  <li key={`${item.title}-${item.href}`} role="option" aria-selected={isActive}>
                    <Link
                      href={item.href}
                      onMouseDown={(e) => e.preventDefault()}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => {
                        setIsOpen(false);
                        setQuery("");
                      }}
                      className={[
                        "flex items-start gap-3 px-4 py-3",
                        "transition-colors",
                        isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.03]",
                      ].join(" ")}
                    >
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.25)]" />
                      <div className="min-w-0">
                        <p className="text-sm text-white/85 font-montserrat tracking-[2px] uppercase">
                          {item.title}
                        </p>
                        {item.description && (
                          <p className="text-xs text-white/45 mt-1 line-clamp-1">{item.description}</p>
                        )}
                        {item.meta && (
                          <p className="text-[10px] text-white/35 font-mono mt-2">{item.meta}</p>
                        )}
                      </div>

                      <span className="ml-auto text-[10px] text-white/35 font-mono hidden sm:block">
                        {item.href}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] text-white/35 font-mono">↑ ↓ navigate • ↵ open • esc close</span>
            <span className="text-[10px] text-white/35 font-mono">⌘K / Ctrl+K</span>
          </div>
        </div>
      )}
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
