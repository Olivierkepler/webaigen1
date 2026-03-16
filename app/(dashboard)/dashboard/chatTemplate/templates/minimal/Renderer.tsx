// components/chatTemplates/templates/minimal/Renderer.tsx
import React from "react";

export type MinimalConfig = {
  primaryColor: string;
  botName: string;
  rounded: boolean;
};

export function MinimalRenderer({ config }: { config: MinimalConfig }) {
  const primary = config?.primaryColor ?? "#111827";
  const botName = config?.botName ?? "Assistant";
  const radius = config?.rounded ? "16px" : "6px";

  return (
    <div className="w-full overflow-hidden rounded-2xl border bg-white">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 text-white"
        style={{ backgroundColor: primary }}
      >
        <div className="text-sm font-semibold">{botName}</div>
        <div className="text-xs opacity-80">Minimal Chat</div>
      </div>

      {/* Chat area */}
      <div className="min-h-[420px] space-y-3 p-4 bg-gray-50">
        {/* Bot message */}
        <div className="flex items-start">
          <div
            className="max-w-[80%] border bg-white px-4 py-3 text-sm"
            style={{ borderRadius: radius }}
          >
            Hi! I'm {botName}. How can I help you today?
          </div>
        </div>

        {/* User message */}
        <div className="flex justify-end">
          <div
            className="max-w-[80%] px-4 py-3 text-sm text-white"
            style={{
              backgroundColor: primary,
              borderRadius: radius,
            }}
          >
            Can you tell me about your services?
          </div>
        </div>

        {/* Bot reply */}
        <div className="flex items-start">
          <div
            className="max-w-[80%] border bg-white px-4 py-3 text-sm"
            style={{ borderRadius: radius }}
          >
            Absolutely! This minimal template focuses on clean design and simple
            conversation flow.
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="border-t p-3 bg-white">
        <div className="flex items-center gap-2">
          <input
            className="w-full rounded-xl border px-4 py-3 text-sm"
            placeholder="Type a message…"
            disabled
          />
          <button
            className="rounded-xl px-4 py-3 text-sm text-white"
            style={{ backgroundColor: primary }}
            disabled
          >
            Send
          </button>
        </div>

        <div className="mt-2 text-xs opacity-60">
          (Preview only — connect to your chat backend later.)
        </div>
      </div>
    </div>
  );
}