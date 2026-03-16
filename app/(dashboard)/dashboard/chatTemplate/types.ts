import type { ReactNode } from "react";

export type ConfigField =
  | { type: "color"; key: string; label: string }
  | { type: "text"; key: string; label: string; placeholder?: string }
  | { type: "select"; key: string; label: string; options: { label: string; value: string }[] }
  | { type: "toggle"; key: string; label: string };

export type TemplateSchema = {
  version: number;
  fields: ConfigField[];
};

export type TemplateDefinition<TConfig extends Record<string, any> = any> = {
  id: string;
  name: string;
  description?: string;
  defaults: TConfig;
  schema: TemplateSchema;
  Renderer: (props: { config: TConfig }) => ReactNode;
};