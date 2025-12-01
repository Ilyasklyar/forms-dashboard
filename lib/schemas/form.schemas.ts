import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  fieldsCount: z
    .number()
    .int()
    .min(0, "Fields count cannot be negative")
    .max(50, "Fields count cannot exceed 50"),
  status: z.enum(["draft", "active", "archived"], {
    message: "Please select a status",
  }),
});

export type FormData = z.infer<typeof formSchema>;

export interface Form extends FormData {
  id: string;
  updatedAt: string;
}
