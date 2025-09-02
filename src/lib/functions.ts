// utils/budgets.ts
import type { Transaction, BudgetVersion } from "@/type";

import {expensesTypes} from "@/data/mockData";
import { EXPENSE } from "./const";

export function getBudgetsForMonth(
  budgets: BudgetVersion[],
  date: string
): BudgetVersion[] {
  const targetDate = new Date(date);
  const targetYear = targetDate.getFullYear();
  const targetMonth = targetDate.getMonth();

  const latestByCategory = new Map<string, BudgetVersion>();

  // Recorremos de atrás hacia adelante (últimos registros primero)
  for (let i = budgets.length - 1; i >= 0; i--) {
    const b = budgets[i];
    if (latestByCategory.has(b.categoryId)) continue; // ya tenemos el más reciente

    const effDate = new Date(b.effectiveDate);
    if (effDate <= targetDate) {
      latestByCategory.set(b.categoryId, b);
    }
  }

  return Array.from(latestByCategory.values()).filter((b) => {
    const effDate = new Date(b.effectiveDate);
    return (
      effDate.getFullYear() < targetYear ||
      (effDate.getFullYear() === targetYear && effDate.getMonth() <= targetMonth)
    );
  });
}

export function getBudgetsWithSpending(
  budgets: BudgetVersion[],
  transactions: Transaction[],
  date: string
) {
  const targetDate = new Date(date);
  const targetYear = targetDate.getFullYear();
  const targetMonth = targetDate.getMonth();

  // console.log(targetDate, targetYear, targetMonth);

  const activeBudgets = getBudgetsForMonth(budgets, date);

  // Acumular gastos por categoría del mes buscado
  const spentByCategory = new Map<string, number>();
  for (const tx of transactions) {
    const txDate = new Date(tx.date);
    // console.log(txDate, targetDate);
    if (
      tx.type === EXPENSE &&
      txDate.getFullYear() === targetYear &&
      txDate.getMonth() === targetMonth
    ) {
      spentByCategory.set(
        // tx.origin, // 👈 ojo: en tu modelo puede ser `expenseTypeId`
        tx.expenseTypeId,
        (spentByCategory.get(tx.expenseTypeId) || 0) + tx.amount
      );
    }
  }

  return activeBudgets.map((b) => {
    const spent = spentByCategory.get(b.categoryId) || 0;
    return {
      ...b,
      spent,
      remaining: b.allocated - spent,
    };
  });
}

export function getNameCategory(categoryId: string) {
  const data = expensesTypes.find((e) => e.id === categoryId);
  return data?.name ?? "Unknown Category";
}
