import { notFound } from "next/navigation";
import { formsStore } from "@/lib/formsStore";
import DetailsFormPageUI from "./ui";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailsFormPage({ params }: PageProps) {
  const { id } = await params;
  const formData = formsStore.getById(id);

  if (!formData) return notFound();

  return <DetailsFormPageUI formData={formData} />;
}
