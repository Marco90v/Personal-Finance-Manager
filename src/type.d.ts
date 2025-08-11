import type { formSchemaAccount } from "@/schemas/schemaAccount";
import type { formSchemaExpense } from "@/schemas/schemaExpenses";
import type { filterTransactionSchema } from "@/schemas/schemaFilterTransaction";
import type { formSchemaIncome } from "@/schemas/schemaIncomes";

export type FormIncomeType = z.infer<typeof formSchemaIncome>
export type FormExpenseType = z.infer<typeof formSchemaExpense>
export type FormAccountType = z.infer<typeof formSchemaAccount>
export type TransactionFilters = z.infer<typeof filterTransactionSchema>

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: "bank" | "cash" | "investment" | "other";
  description?: string;
}

export type TypeTransaccion = "income" | "expense";

type Recurrence = "fixed" | "variable";

export type SortField = keyof Transaction
export type SortDirection = "asc" | "desc" | null

export interface SortState {
  field: SortField | null
  direction: SortDirection
}

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
  type: "expense";
  recurrence: Recurrence; // obligatorio y con valor "fixed" o "variable"
  amount: number;
  date: string;
  origin: string;
  accountId: string;
  notes?: string;
};

// Unión de ambos
export type Transaction = IncomeTransaction | ExpenseTransaction;

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
