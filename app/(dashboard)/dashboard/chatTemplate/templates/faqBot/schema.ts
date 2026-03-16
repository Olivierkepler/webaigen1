import type { TemplateDefinition } from "../../types";
import { FaqBotRenderer } from "./Renderer";

export const faqBotTemplate: TemplateDefinition = {
  id: "faq-bot",
  name: "FAQ Support Bot",
  description: "Has category sidebar + suggested questions.",
  defaults: {
    brandColor: "#2563eb",
    headerTitle: "Support",
    showCategories: true,
    categories: ["Billing", "Account", "Technical"],
  },
  schema: {
    version: 1,
    fields: [
      { type: "color", key: "brandColor", label: "Brand color" },
      { type: "text", key: "headerTitle", label: "Header title" },
      { type: "toggle", key: "showCategories", label: "Show categories" },
      // you can later add list editors, image upload, etc.
    ],
  },
  Renderer: FaqBotRenderer,
};