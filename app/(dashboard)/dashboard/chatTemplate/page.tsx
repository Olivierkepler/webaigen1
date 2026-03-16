import Link from "next/link";
import { templates } from "./registry";

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Choose a chatbot template</h1>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map(t => (
          <Link key={t.id} href={`/chatTemplate/${t.id}`} className="rounded-2xl border p-4 hover:shadow">
            <div className="text-lg font-medium">{t.name}</div>
            {t.description && <p className="mt-1 text-sm opacity-80">{t.description}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}