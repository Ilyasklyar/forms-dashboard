import { Form, FormData } from "../schemas/form.schemas";
import { formSchema } from "../schemas/form.schemas";
import { getBaseUrl } from "../utils/getBaseUrl";

export async function fetchForms(): Promise<Form[]> {
  const res = await fetch(`${getBaseUrl()}/api/forms`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch forms");

  return res.json();
}

export const fetchFormById = async (id: string): Promise<Form> => {
  const res = await fetch(`${getBaseUrl()}/api/forms/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Form not found");
  return res.json();
};

export const createForm = async (form: FormData) => {
  const parsed = formSchema.parse(form);

  const res = await fetch(`${getBaseUrl()}/api/forms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed),
  });

  if (!res.ok) throw new Error("Failed to create form");

  return res.json();
};

export const updateForm = async (id: string, form: FormData) => {
  const parsed = formSchema.parse(form);

  const res = await fetch(`${getBaseUrl()}/api/forms/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed),
  });

  if (!res.ok) throw new Error("Failed to update form");

  return res.json();
};

export const deleteForm = async (id: string) => {
  const res = await fetch(`${getBaseUrl()}/api/forms/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete form");

  return true;
};
