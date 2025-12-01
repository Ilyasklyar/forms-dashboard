import { Form, FormData } from "./schemas/form.schemas";

let forms: Form[] = [
  {
    id: "1",
    title: "Form 1",
    description: "description 1",
    fieldsCount: 3,
    status: "draft",
    updatedAt: "2025-11-20T00:00:00Z",
  },
  {
    id: "2",
    title: "Form 2",
    description: "description 2",
    fieldsCount: 5,
    status: "active",
    updatedAt: "2025-11-30T00:00:00Z",
  },
  {
    id: "3",
    title: "Form 3",
    description: "description 3",
    fieldsCount: 10,
    status: "archived",
    updatedAt: "2025-11-10T00:00:00Z",
  },
];

export const formsStore = {
  getAll: (): Form[] =>
    forms
      .slice()
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      ),

  getById: (id: string) => forms.find((f) => f.id === id),

  create: (data: FormData) => {
    const newForm: Form = {
      ...data,
      id: Date.now().toString(),
      updatedAt: new Date().toISOString(),
    };
    forms.push(newForm);
    return newForm;
  },

  update: (id: string, data: FormData) => {
    const idx = forms.findIndex((f) => f.id === id);
    if (idx === -1) return null;
    forms[idx] = { ...data, id, updatedAt: new Date().toISOString() };
    return forms[idx];
  },

  remove: (id: string) => {
    forms = forms.filter((f) => f.id !== id);
  },
};
