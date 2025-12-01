import { z } from "zod";
import { UserRole } from "@/types/roles";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  role: z.enum([UserRole.Individual, UserRole.Admin], {
    message: "Please select a valid role",
  }),
});

export type LoginData = z.infer<typeof loginSchema>;
