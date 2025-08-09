import z from "zod";

export const formSchemaIncome = z.object({
  amount: z
    .number({error: "Amount is required",})
    .min(0.01, {error: "Amount must be a positive number"}),
  date: z.date({
    error: "Date is required",
  }),
  origin: z.string().min(1, "Source is required"),
  accountId: z.string().min(1, "Account is required"),
  notes: z.string().optional(),
})