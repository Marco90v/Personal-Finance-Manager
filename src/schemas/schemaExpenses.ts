import z from "zod";

export const formSchemaExpense = z.object({
  amount: z
    .number({error: "Amount is required",})
    .min(0.01, {error: "Amount must be a positive number"}),
  date: z.date({
    error: "Date is required.",
  }),
  recurrence: z.enum(["fixed", "variable"], {
    error: "Please select an expense type.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  account: z.string().min(1, {
    message: "Please select an account.",
  }),
  notes: z.string().optional(),
})