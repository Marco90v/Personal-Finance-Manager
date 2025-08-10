import z from "zod";

export const formSchemaAccount = z.object({
  name: z
    .string()
    .min(1, "Account name is required")
    .max(50, "Account name must be less than 50 characters"),
  balance: z
      .number({error: "Amount is required",})
      .min(0.01, {error: "Amount must be a positive number"}),
  type: z.enum(["bank", "cash", "investment", "other"]),
  description: z.string().optional(),
})