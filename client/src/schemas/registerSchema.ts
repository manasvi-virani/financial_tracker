import { z } from "zod";

export const registerSchema = z.object({
  firstname: z.string().min(2, "First name is required"),
  lastname: z.string().min(1, "First name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't exceed 15 digits")
    .regex(/^\d+$/, "Phone number must contain only numbers"),
  country: z.string().min(1, "Country is required"),
  currency: z.string().min(1, "Currency is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[!@#$%^&*])/, "Must contain at least one special character"),
});

// Optional: Infer TS type
export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[!@#$%^&*])/, "Must contain at least one special character"),
});
// Optional: Infer TS type
export type LoginFormValues = z.infer<typeof loginSchema>;
