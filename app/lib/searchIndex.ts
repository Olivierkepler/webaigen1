/**
 * Search index aggregator — merges all JSON indexes into one searchable array.
 * Works in client components (no fs).
 */

import home from "@/app/data/search/home.json";
import site from "@/app/data/search/site.json";
import projects from "@/app/data/search/projects.json";
import vision from "@/app/data/search/vision.json";
import pricing from "@/app/data/search/pricing.json";
import faq from "@/app/data/search/faq.json";
import testimonials from "@/app/data/search/testimonials.json";
import footer from "@/app/data/search/footer.json";
import hero from "@/app/data/search/hero.json";
import subnav from "@/app/data/search/subnav.json";
import navbar from "@/app/data/search/navbar.json";
import archive from "@/app/data/search/archive.json";
import collective from "@/app/data/search/collective.json";
import exhibitions from "@/app/data/search/exhibitions.json";
import contact from "@/app/data/search/contact.json";
import tryPage from "@/app/data/search/try.json";

export type SearchItem = {
  title: string;
  href: string;
  description?: string;
  keywords?: string[];
  meta?: string;
};

type RawItem = {
  type?: string;
  page?: string;
  component?: string;
  title?: string;
  href?: string;
  summary?: string;
  description?: string;
  subtitle?: string;
  keywords?: string[];
};

function toSearchItem(raw: RawItem, metaOverride?: string): SearchItem {
  const title = raw.title ?? "";
  const href = raw.href ?? "/";
  const description = raw.summary ?? raw.description ?? "";
  const keywords = raw.keywords ?? [];
  const page = raw.page ?? "Home";
  const component = raw.component ?? "Section";
  const meta = metaOverride ?? `${page} • ${component}`;

  return { title, href, description, keywords, meta };
}

function flatten(arr: RawItem[], metaOverride?: string): SearchItem[] {
  return (arr ?? []).map((r) => toSearchItem(r, metaOverride));
}

export function getSearchItems(): SearchItem[] {
  const homeData = home as { sections?: RawItem[] };
  const homeSections = (homeData?.sections ?? []).map((s) =>
    toSearchItem(s, `Home • ${(s as RawItem).component ?? "Section"}`)
  );

  const projectItems = (projects as RawItem[]).map((p) => ({
    ...toSearchItem(p, "Home • Selected Works"),
    description: (p.subtitle ? `${p.subtitle} — ` : "") + (p.summary ?? ""),
    keywords: [p.subtitle, ...(p.keywords ?? [])].filter(Boolean) as string[],
  }));

  const merged: SearchItem[] = [
    ...flatten(site as RawItem[], "Site"),
    ...homeSections,
    ...flatten(hero as RawItem[], "Home • Hero"),
    ...flatten(vision as RawItem[], "Home • Vision"),
    ...flatten(pricing as RawItem[], "Home • Pricing"),
    ...flatten(faq as RawItem[], "Home • FAQ"),
    ...flatten(testimonials as RawItem[], "Home • Testimonials"),
    ...flatten(footer as RawItem[], "Home • Footer"),
    ...flatten(subnav as RawItem[], "Home • Subnav"),
    ...flatten(navbar as RawItem[], "Site • Navbar"),
    ...projectItems,
    ...flatten(archive as RawItem[], "Archive"),
    ...flatten(collective as RawItem[], "Collective"),
    ...flatten(exhibitions as RawItem[], "Exhibitions"),
    ...flatten(contact as RawItem[], "Contact"),
    ...flatten(tryPage as RawItem[], "Try"),
  ];

  const seen = new Set<string>();
  return merged.filter((it) => {
    const key = `${it.title}::${it.href}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
