import { z } from "zod";
export const transactionAddSchema = z.object({
  account: z
    .string()
    .min(1, "Account is required"),
  amount:z
  .coerce
  .number()
  .int("Amount must be an integer")
  .min(1, "Amount must be at least 1"),
  description: z.string().min(1, "Description is required"),
});

// Type inference
export type TransactionAddFormValues = z.infer<typeof transactionAddSchema>;
