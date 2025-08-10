import z from "zod";

export const filterTransactionSchema = z.object({
  type: z.enum(["all", "income", "expense"]),
  origin: z.string(),
  accountId: z.string(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
})