// components/chatTemplates/templates/faqBot/Renderer.tsx
import React from "react";

export type FaqBotConfig = {
  brandColor: string;
  headerTitle: string;
  showCategories: boolean;
  categories: string[];
};

export function FaqBotRenderer({ config }: { config: FaqBotConfig }) {
  const brand = config?.brandColor ?? "#2563eb";
  const title = config?.headerTitle ?? "Support";
  const showCategories = config?.showCategories ?? true;

  const categories =
    Array.isArray(config?.categories) && config.categories.length > 0
      ? config.categories
      : ["Billing", "Account", "Technical"];

  return (
    <div className="w-full overflow-hidden rounded-2xl border bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className="h-9 w-9 rounded-xl"
            style={{ backgroundColor: brand }}
            aria-hidden
          />
          <div>
            <div className="text-sm font-semibold">{title}</div>
            <div className="text-xs opacity-70">FAQ Assistant</div>
          </div>
        </div>

        <button className="rounded-xl border px-3 py-1 text-sm">
          New chat
        </button>
      </div>

      {/* Body */}
      <div className="grid min-h-[460px] grid-cols-1 md:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className="border-b p-3 md:border-b-0 md:border-r">
          <div className="text-xs font-semibold uppercase tracking-wide opacity-70">
            Categories
          </div>

          {!showCategories ? (
            <div className="mt-3 text-sm opacity-70">
              Categories hidden in settings.
            </div>
          ) : (
            <div className="mt-2 space-y-1">
              {categories.map((c) => (
                <button
                  key={c}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-black/5"
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          <div className="mt-5">
            <div className="text-xs font-semibold uppercase tracking-wide opacity-70">
              Suggested
            </div>
            <div className="mt-2 space-y-2">
              {[
                "How do I reset my password?",
                "Where can I view invoices?",
                "How do I contact support?",
              ].map((q) => (
                <button
                  key={q}
                  className="w-full rounded-xl border px-3 py-2 text-left text-sm hover:bg-black/5"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Chat Area */}
        <main className="flex flex-col">
          <div className="flex-1 space-y-3 p-4">
            {/* Bot message */}
            <div className="flex items-start gap-2">
              <div
                className="mt-1 h-7 w-7 rounded-lg"
                style={{ backgroundColor: brand }}
                aria-hidden
              />
              <div className="max-w-[85%] rounded-2xl border bg-white px-4 py-3 text-sm">
                Hi! I’m your FAQ assistant. Pick a category or ask a question and
                I’ll help you find the answer.
              </div>
            </div>

            {/* User message */}
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm text-white"
                   style={{ backgroundColor: brand }}>
                I need help with billing.
              </div>
            </div>

            {/* Bot response with “FAQ style” cards */}
            <div className="flex items-start gap-2">
              <div
                className="mt-1 h-7 w-7 rounded-lg"
                style={{ backgroundColor: brand }}
                aria-hidden
              />
              <div className="max-w-[85%] space-y-2">
                <div className="rounded-2xl border bg-white px-4 py-3 text-sm">
                  Here are a few billing topics. Choose one:
                </div>

                {[
                  { title: "View invoices", desc: "Find invoices in your account billing page." },
                  { title: "Update payment method", desc: "Change card/bank details securely." },
                  { title: "Refunds", desc: "Check eligibility and request a refund." },
                ].map((item) => (
                  <button
                    key={item.title}
                    className="w-full rounded-2xl border px-4 py-3 text-left hover:bg-black/5"
                  >
                    <div className="text-sm font-semibold">{item.title}</div>
                    <div className="mt-1 text-xs opacity-70">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="border-t p-3">
            <div className="flex items-center gap-2">
              <input
                className="w-full rounded-2xl border px-4 py-3 text-sm"
                placeholder="Type your question…"
                disabled
              />
              <button
                className="rounded-2xl px-4 py-3 text-sm text-white"
                style={{ backgroundColor: brand }}
                disabled
              >
                Send
              </button>
            </div>
            <div className="mt-2 text-xs opacity-60">
              (Preview only — wire this to your chat backend later.)
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}