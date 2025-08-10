export type FormIncomeType = z.infer<typeof formSchemaIncome>
export type FormExpenseType = z.infer<typeof formSchemaExpense>
export type FormAccountType = z.infer<typeof formSchemaAccount>

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: "bank" | "cash" | "investment" | "other";
  description?: string;
}

export type TypeTransaccion = "income" | "expenses";

type Recurrence = "fixed" | "variable";

// export interface Transaccion {
//   id: string;
//   type: TypeTransaccion;
//   amount: number;
//   date: string;
//   origin: string;
//   accountId: string;
//   notes?: string;
// }

type IncomeTransaction = {
  id: string;
  type: "income";
  recurrence?: Recurrence | null; // null o undefined
  amount: number;
  date: string;
  origin: string;
  accountId: string;
  notes?: string;
};

// Transacción de gastos
type ExpenseTransaction = {
  id: string;
  type: "expenses";
  recurrence: Recurrence; // obligatorio y con valor "fixed" o "variable"
  amount: number;
  date: string;
  origin: string;
  accountId: string;
  notes?: string;
};

// Unión de ambos
export type Transaccion = IncomeTransaction | ExpenseTransaction;

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
