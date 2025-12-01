import { Form } from "@/lib/schemas/form.schemas";
import FormPageUI from "./ui";
import { fetchForms } from "@/lib/service/forms";
import { getServerSession } from "next-auth";
import { UserRole } from "@/types/roles";
import { authOptions } from "@/lib/utils/authOptions";

export default async function FormPage() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === UserRole.Admin;
  let forms: Form[] = [];

  try {
    forms = await fetchForms();
  } catch (err) {
    console.log("Failed to fetch forms:", err);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Forms</h1>

      <FormPageUI forms={forms} isAdmin={isAdmin} />
    </div>
  );
}
