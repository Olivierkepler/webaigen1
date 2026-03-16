import { notFound } from "next/navigation";
import { getTemplate } from "../../chatTemplate/registry";
import TemplateEditorClient from "../../chatTemplate/editor/TemplateEditorClient";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const template = getTemplate(id);
  if (!template) return notFound();

  return (
<div>

olivier
</div>

  )
}