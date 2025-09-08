import type { formSchemaAccount } from "@/schemas/schemaAccount";
import type { formSchemaExpense } from "@/schemas/schemaExpenses";
import type { filterTransactionSchema } from "@/schemas/schemaFilterTransaction";
import type { formSchemaIncome } from "@/schemas/schemaIncomes";
import type { loginSchema, registerSchema } from "@/schemas/schemaAuth";

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>

export type FormIncomeType = z.infer<typeof formSchemaIncome>
export type FormExpenseType = z.infer<typeof formSchemaExpense>
export type FormAccountType = z.infer<typeof formSchemaAccount>
export type TransactionFilters = z.infer<typeof filterTransactionSchema>

export interface FilterTransByMonth {
  date: string;
  income: number;
  expense: number;
  balance: number;
}

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
  expenseTypeId: string;
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
  expenseTypeId: string;
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


export interface BudgetVersion {
  id: string;
  categoryId: string;     // Ej: "e0004" → comida
  allocated: number;      // monto asignado
  effectiveDate: string;  // fecha en que entra en vigor
  color?: string;
}

export interface SavingGoalHistory {
  date: string;           // Fecha de la actualización (ej: "2025-08-10")
  amount: number;         // Cantidad acumulada en esa fecha
}

export interface SavingGoal {
  id: string;
  name: string;              // Ej: "Vacaciones"
  targetAmount: number;      // Meta final
  history: SavingGoalHistory[];
  completedAt: string | null;      // Fecha en que fue marcado como cumplido
  createdAt: string;
  color?: string;
}

