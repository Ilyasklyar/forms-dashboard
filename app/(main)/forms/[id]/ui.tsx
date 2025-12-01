import CreateUpdateForm from "../components/create-update-form";
import { Form } from "@/lib/schemas/form.schemas";

export default function DetailsFormPageUI({ formData }: { formData: Form }) {
  return <CreateUpdateForm isUpdate formData={formData} />;
}
