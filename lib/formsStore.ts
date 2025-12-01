import fs from "fs";
import path from "path";
import { Form, FormData } from "./schemas/form.schemas";
import { formSchema } from "./schemas/form.schemas";

const filePath = path.join(process.cwd(), "data", "forms.json");

function readForms(): Form[] {
  if (!fs.existsSync(filePath)) return [];
  const json = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(json);
}

function writeForms(forms: Form[]) {
  fs.writeFileSync(filePath, JSON.stringify(forms, null, 2));
}

export const formsStore = {
  getAll: (): Form[] =>
    readForms().sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    ),
  getById: (id: string) => readForms().find((f) => f.id === id),
  create: (data: FormData) => {
    const newForm: Form = {
      ...formSchema.parse(data),
      id: Date.now().toString(),
      updatedAt: new Date().toISOString(),
    };
    const forms = readForms();
    forms.push(newForm);
    writeForms(forms);
    return newForm;
  },
  update: (id: string, data: FormData) => {
    const forms = readForms();
    const idx = forms.findIndex((f) => f.id === id);
    if (idx === -1) return null;
    forms[idx] = {
      ...formSchema.parse(data),
      id,
      updatedAt: new Date().toISOString(),
    };
    writeForms(forms);
    return forms[idx];
  },
  remove: (id: string) => {
    const forms = readForms().filter((f) => f.id !== id);
    writeForms(forms);
  },
};
