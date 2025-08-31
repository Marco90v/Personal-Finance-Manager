import z from "zod"

export const formSchemaPreference = z.object({
  // currency: z.enum(["USD", "EUR", "GBP", "JPY", "BRL", "MXN", "ARS", "CLP", "COP", "INR"]),
  currency: z.enum(["USD"]),
  theme: z.enum(["light", "dark", "system"]),
})

export type PreferenceFormValues = z.infer<typeof formSchemaPreference>