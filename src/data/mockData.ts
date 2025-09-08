// mockData.js

import type { Account, BudgetVersion, ExpensesType, IncomesType, SavingGoal, Transaction } from "@/type";

export const typeAccounts = [
  {id : "0001", name: "bank"},
  {id : "0002", name: "cash"},
  {id : "0003", name: "investment"},
  {id : "0004", name: "other"},
];

export const accounts:Account[] = [
  { id: "cuenta_1", name: "Cuenta Bancaria", balance: 3000, type:"bank" },
  { id: "cuenta_2", name: "Efectivo", balance: 500, type:"other" },
];

export const transacciones: Transaction[] = [
  { id: "Demotx_001", type: "income", recurrence: null, amount: 1000, date: "2025-06-01", expenseTypeId: "i0002", accountId: "cuenta_1", notes: "Pago mensual de trabajo" },
  { id: "Demotx_004", type: "expense", recurrence: "fixed", amount: 200, date: "2025-06-03", expenseTypeId: "e0002", accountId: "cuenta_1", notes: "Renta del mes" },
  { id: "tx_001", type: "income", recurrence: null, amount: 2500, date: "2025-08-01", expenseTypeId: "i0002", accountId: "cuenta_1", notes: "Pago mensual de trabajo" },
  { id: "tx_002", type: "income", recurrence: null, amount: 300, date: "2025-08-12", expenseTypeId: "i0003", accountId: "cuenta_1", notes: "Diseño landing page" },
  { id: "tx_003", type: "income", recurrence: null, amount: 100, date: "2025-08-15", expenseTypeId: "i0004", accountId: "cuenta_2", notes: "Venta de accesorios usados" },
  { id: "tx_004", type: "expense", recurrence: "fixed", amount: 700, date: "2025-08-03", expenseTypeId: "e0002", accountId: "cuenta_1", notes: "Renta del mes" },
  { id: "tx_005", type: "expense", recurrence: "fixed", amount: 100, date: "2025-08-05", expenseTypeId: "e0003", accountId: "cuenta_1", notes: "Internet y luz" },
  { id: "tx_006", type: "expense", recurrence: "fixed", amount: 50, date: "2025-08-06", expenseTypeId: "e0008", accountId: "cuenta_1", notes: "Netflix y Spotify" },
  { id: "tx_007", type: "expense", recurrence: "variable", amount: 80, date: "2025-08-10", expenseTypeId: "e0004", accountId: "cuenta_2", notes: "Supermercado semanal" },
  { id: "tx_008", type: "expense", recurrence: "variable", amount: 40, date: "2025-08-13", expenseTypeId: "e0005", accountId: "cuenta_2", notes: "Gasolina" },
  { id: "tx_009", type: "expense", recurrence: "variable", amount: 120, date: "2025-08-18", expenseTypeId: "e0006", accountId: "cuenta_1", notes: "Cena con amigos" },
  { id: "tx_010", type: "expense", recurrence: "variable", amount: 60, date: "2025-08-20", expenseTypeId: "e0007", accountId: "cuenta_2", notes: "Ropa nueva" },
  { id: "asd", type: "expense", recurrence: "variable", amount: 60, date: "2025-08-20", expenseTypeId: "e0007", accountId: "cuenta_2", notes: "Ropa nueva" },
];

export const incomesTypes:IncomesType[] = [
  // {id: "0001", name: "All", description: "Todos los ingresos"},
  {id: "i0002", name: "Sueldo", description: "Ingresos de sueldo"},
  {id: "i0003", name: "Freelance", description: "Ingresos de freelance"},
  {id: "i0004", name: "Venta", description: "Ingresos de venta"},
];

export const expensesTypes:ExpensesType[] = [
  // {id: "0001", name: "All", description: "Todos los gastos"},
  {id: "e0002", name: "Alquiler", description: "Gastos de alquiler"},
  {id: "e0003", name: "Servicios", description: "Gastos de servicios"},
  {id: "e0004", name: "Comida", description: "Gastos de comida"},
  {id: "e0005", name: "Transporte", description: "Gastos de transporte"},
  {id: "e0006", name: "Ocio", description: "Gastos de ocio"},
  {id: "e0007", name: "Compras", description: "Gastos de compras"},
  {id: "e0008", name: "Suscripciones", description: "Gastos de suscripciones"},
  {id: "e0009", name: "Internet", description: "Gastos de internet"},
  {id: "e0010", name: "Luz", description: "Gastos de luz"},
  {id: "e0011", name: "Netflix", description: "Gastos de Netflix"},
  {id: "e0012", name: "Spotify", description: "Gastos de Spotify"},
];



// Relacionamos budgets con `expensesTypes` (ej: "e0004" = comida)
export const budgets: BudgetVersion[] = [
  // Agosto 2025
  {
    id: "b001",
    categoryId: "e0002", // Alquiler
    allocated: 800,
    effectiveDate: "2025-08-01", // vigente desde inicio de agosto
    color: "#f87171",
  },
  {
    id: "b002",
    categoryId: "e0003", // Servicios
    allocated: 150,
    effectiveDate: "2025-08-01",
    color: "#60a5fa",
  },
  {
    id: "b003",
    categoryId: "e0004", // Comida
    allocated: 400,
    effectiveDate: "2025-08-05", // creado el 5 de agosto
    color: "#8b5cf6",
  },
  {
    id: "b004",
    categoryId: "e0005", // Transporte
    allocated: 120,
    effectiveDate: "2025-08-01",
    color: "#06b6d4",
  },
  {
    id: "b005",
    categoryId: "e0006", // Ocio
    allocated: 200,
    effectiveDate: "2025-08-01",
    color: "#f59e0b",
  },
  {
    id: "b006",
    categoryId: "e0007", // Compras
    allocated: 300,
    effectiveDate: "2025-08-01",
    color: "#10b981",
  },
  {
    id: "b007",
    categoryId: "e0008", // Suscripciones
    allocated: 60,
    effectiveDate: "2025-08-01",
    color: "#6366f1",
  },

  // Septiembre 2025 - actualización parcial
  {
    id: "b008",
    categoryId: "e0004", // Comida
    allocated: 500,
    effectiveDate: "2025-09-03", // nuevo presupuesto desde 3 de septiembre
    color: "#8b5cf6",
  },
  {
    id: "b009",
    categoryId: "e0006", // Ocio
    allocated: 300,
    effectiveDate: "2025-09-20", // reajuste el 20 de septiembre
    color: "#f59e0b",
  },
];

export const savingGoals: SavingGoal[] = [
  {
    id: "goal_001",
    name: "Vacaciones",
    targetAmount: 2000,
    history: [
      { date: "2025-08-01", amount: 600 },  // agosto → tenías $600
      { date: "2025-09-05", amount: 700 },  // septiembre → agregaste $100 más
    ],
    createdAt: "2025-08-01",
    completedAt: "2025-12-01", // Se cumplió en diciembre
    color: "#8b5cf6",
  },
  {
    id: "goal_002",
    name: "Auto nuevo",
    targetAmount: 10000,
    history: [
      { date: "2025-07-15", amount: 500 }, 
      { date: "2025-09-10", amount: 1200 }, 
    ],
    createdAt: "2025-07-15",
    completedAt: null,
    color: "#06b6d4",
  }
];


