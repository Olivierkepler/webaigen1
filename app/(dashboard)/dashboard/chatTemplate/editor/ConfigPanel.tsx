"use client";

import type { TemplateSchema } from "../types";

export default function ConfigPanel({
  schema,
  config,
  onChange,
}: {
  schema: TemplateSchema;
  config: Record<string, any>;
  onChange: (next: any) => void;
}) {
  return (
    <div className="space-y-3">
      {schema.fields.map((f) => {
        const value = config[f.key];

        if (f.type === "text") {
          return (
            <label key={f.key} className="block">
              <div className="text-sm font-medium">{f.label}</div>
              <input
                className="mt-1 w-full rounded-xl border px-3 py-2"
                value={value ?? ""}
                placeholder={f.placeholder}
                onChange={(e) => onChange({ ...config, [f.key]: e.target.value })}
              />
            </label>
          );
        }

        if (f.type === "color") {
          return (
            <label key={f.key} className="block">
              <div className="text-sm font-medium">{f.label}</div>
              <input
                className="mt-1 h-10 w-24 cursor-pointer rounded-xl border p-1"
                type="color"
                value={value ?? "#000000"}
                onChange={(e) => onChange({ ...config, [f.key]: e.target.value })}
              />
            </label>
          );
        }

        if (f.type === "toggle") {
          return (
            <label key={f.key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!value}
                onChange={(e) => onChange({ ...config, [f.key]: e.target.checked })}
              />
              <span className="text-sm font-medium">{f.label}</span>
            </label>
          );
        }

        if (f.type === "select") {
          return (
            <label key={f.key} className="block">
              <div className="text-sm font-medium">{f.label}</div>
              <select
                className="mt-1 w-full rounded-xl border px-3 py-2"
                value={value ?? ""}
                onChange={(e) => onChange({ ...config, [f.key]: e.target.value })}
              >
                {f.options.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>
          );
        }

        return null;
      })}
    </div>
  );
}