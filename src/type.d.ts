export type FormIncomeType = z.infer<typeof formSchemaIncome>

export interface Cuenta {
  id: string;
  name: string;
  balance: number;
  description?: string;
}

export type TypeTransaccion = "income" | "expenses";

export interface Transaccion {
  id: string;
  type: TypeTransaccion;
  amount: number;
  date: string;
  origin: string;
  accountId: string;
  notes?: string;
}

export interface IncomesType {
  id: string;
  name: string;
  description: string;
}

export interface ExpensesType {
  id: string;
  name: string;
  description: string;
}
