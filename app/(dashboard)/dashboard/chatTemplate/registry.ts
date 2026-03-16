import type { TemplateDefinition } from "./types";

import { minimalTemplate } from "./templates/minimal/schema";
import { faqBotTemplate } from "./templates/faqBot/schema";

export const templates = [minimalTemplate, faqBotTemplate] satisfies TemplateDefinition[];

export function getTemplate(id: string) {
  return templates.find(t => t.id === id) ?? null;
}