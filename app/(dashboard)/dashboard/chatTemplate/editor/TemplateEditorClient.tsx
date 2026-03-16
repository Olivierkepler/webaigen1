"use client";

import { useMemo, useState } from "react";
import { getTemplate } from "../registry";
import ConfigPanel from "./ConfigPanel";

export default function TemplateEditorClient({ templateId }: { templateId: string }) {
  const template = useMemo(() => getTemplate(templateId), [templateId]);
  if (!template) return null;

  const [config, setConfig] = useState(() => template.defaults);

  return (
    <>
      <div className="rounded-2xl border p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Customize: {template.name}</h2>
          <button
            className="rounded-xl border px-3 py-1"
            onClick={() => setConfig(template.defaults)}
          >
            Reset
          </button>
        </div>

        <div className="mt-4">
          <ConfigPanel schema={template.schema} config={config} onChange={setConfig} />
        </div>

        <div className="mt-4 flex gap-2">
          <button className="rounded-xl bg-black px-3 py-2 text-white"
            onClick={() => {
              const json = JSON.stringify({ templateId, config }, null, 2);
              navigator.clipboard.writeText(json);
            }}
          >
            Copy JSON
          </button>

          <button className="rounded-xl border px-3 py-2"
            onClick={() => {
              // later: POST to your API route to save to DB per user
              console.log("save", { templateId, config });
            }}
          >
            Save
          </button>
        </div>
      </div>

      <div className="rounded-2xl border p-4">
        <h2 className="text-xl font-semibold">Live preview</h2>
        <div className="mt-4">
          {template.Renderer({ config })}
        </div>
      </div>
    </>
  );
}