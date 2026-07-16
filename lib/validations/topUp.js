import { z } from "zod";

export const topUpSchema = z.object({
  amount: z
    .string()
    .trim()
    .min(1, "Amount is required")
    .refine((value) => /^\d+(\.\d{1,2})?$/.test(value), {
      message: "Enter a valid amount",
    })
    .refine((value) => Number(value) >= 1, {
      message: "Minimum amount is 1 GEL",
    })
    .refine((value) => Number(value) <= 10000, {
      message: "Maximum amount is 10000 GEL",
    }),
});