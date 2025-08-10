// mockData.js

import type { Account, ExpensesType, IncomesType, Transaction } from "@/type";

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
  { id: "Demotx_001", type: "income", recurrence: null, amount: 1000, date: "2025-06-01", origin: "Sueldo", accountId: "cuenta_1", notes: "Pago mensual de trabajo" },
  { id: "Demotx_004", type: "expense", recurrence: "fixed", amount: 200, date: "2025-06-03", origin: "Alquiler", accountId: "cuenta_1", notes: "Renta del mes" },
  { id: "tx_001", type: "income", recurrence: null, amount: 2500, date: "2025-08-01", origin: "Sueldo", accountId: "cuenta_1", notes: "Pago mensual de trabajo" },
  { id: "tx_002", type: "income", recurrence: null, amount: 300, date: "2025-08-12", origin: "Freelance", accountId: "cuenta_1", notes: "Diseño landing page" },
  { id: "tx_003", type: "income", recurrence: null, amount: 100, date: "2025-08-15", origin: "Venta", accountId: "cuenta_2", notes: "Venta de accesorios usados" },
  { id: "tx_004", type: "expense", recurrence: "fixed", amount: 700, date: "2025-08-03", origin: "Alquiler", accountId: "cuenta_1", notes: "Renta del mes" },
  { id: "tx_005", type: "expense", recurrence: "fixed", amount: 100, date: "2025-08-05", origin: "Servicios", accountId: "cuenta_1", notes: "Internet y luz" },
  { id: "tx_006", type: "expense", recurrence: "fixed", amount: 50, date: "2025-08-06", origin: "Suscripciones", accountId: "cuenta_1", notes: "Netflix y Spotify" },
  { id: "tx_007", type: "expense", recurrence: "variable", amount: 80, date: "2025-08-10", origin: "Comida", accountId: "cuenta_2", notes: "Supermercado semanal" },
  { id: "tx_008", type: "expense", recurrence: "variable", amount: 40, date: "2025-08-13", origin: "Transporte", accountId: "cuenta_2", notes: "Gasolina" },
  { id: "tx_009", type: "expense", recurrence: "variable", amount: 120, date: "2025-08-18", origin: "Ocio", accountId: "cuenta_1", notes: "Cena con amigos" },
  { id: "tx_010", type: "expense", recurrence: "variable", amount: 60, date: "2025-08-20", origin: "Compras", accountId: "cuenta_2", notes: "Ropa nueva" },
  { id: "asd", type: "expense", recurrence: "variable", amount: 60, date: "2025-08-20", origin: "Compras", accountId: "cuenta_2", notes: "Ropa nueva" },
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
