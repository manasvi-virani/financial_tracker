import { z } from "zod";
export const accountAddSchema = z.object({
  account: z.string().min(1, "Account is required"),
  account_number: z.string().optional(),
  account_balance: z.coerce
    .number()
    .min(100, "Initial balance must be minimum 100")
    .max(1000000000, "Account balance must not exceed 9 digits"),
});
export const addMoneySchema = z.object({
  account_balance: z.coerce
    .number()
    .min(1, "Minimum amount must be greater than 1")
    .max(1000000000, "Account balance must not exceed 9 digits"),
});

export const transferMoneySchema = z.object({
  account: z.string().min(1, "Account is required"),
  amount: z.coerce
    .number()
    .min(1, "Minimum amount must be greater than 1")
    .max(1000000000, "Account balance must not exceed 9 digits"),
});

// Type inference
export type AccountAddFormValues = z.infer<typeof accountAddSchema>;
export type AddMoneyFormValues = z.infer<typeof addMoneySchema>;
export type TransferMoneyFormValues = z.infer<typeof transferMoneySchema>;
