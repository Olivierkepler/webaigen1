import type { TemplateDefinition } from "../../types";
import { MinimalRenderer } from "./Renderer";

export const minimalTemplate: TemplateDefinition = {
  id: "minimal",
  name: "Minimal Chat",
  description: "Simple layout, clean bubbles.",
  defaults: {
    primaryColor: "#111827",
    botName: "Assistant",
    rounded: true,
  },
  schema: {
    version: 1,
    fields: [
      { type: "color", key: "primaryColor", label: "Primary color" },
      { type: "text", key: "botName", label: "Bot name", placeholder: "Assistant" },
      { type: "toggle", key: "rounded", label: "Rounded bubbles" },
    ],
  },
  Renderer: MinimalRenderer,
};