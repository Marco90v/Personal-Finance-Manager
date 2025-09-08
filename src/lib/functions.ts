// utils/budgets.ts
import type { Transaction, BudgetVersion, SavingGoal, SavingGoalHistory } from "@/type";

import {expensesTypes} from "@/data/mockData";
import { EXPENSE } from "./const";
// import { endOfMonth, isAfter, isBefore, parseISO, startOfMonth } from "date-fns";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

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
    // if (effDate <= targetDate) {
    if (effDate.getMonth() <= targetDate.getMonth() && effDate.getFullYear() <= targetDate.getFullYear()) {
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


// export function getSavingGoalsForMonth(
//     goals: SavingGoal[],
//     dateStr: string // formato "YYYY-MM-DD" ya validado
//   ) {
//     const baseDate = dayjs(dateStr);
//     const monthStart = baseDate.startOf("month");
//     const monthEnd = baseDate.endOf("month");

//     return goals.map((goal) => {
//       const snapshot = goal.history.reduce<SavingGoalHistory | null>(
//         (latest, h) => {
//           const hDate = dayjs(h.date);
//           console.log(hDate.isSameOrBefore(monthEnd));
//           if (hDate.isSameOrBefore(monthEnd)) {
//             if (!latest || hDate.isAfter(dayjs(latest.date))) {
//               return h;
//             }
//           }
//           return latest;
//         },
//         null
//       );

//       if (!snapshot) return null;

//       if (goal.completedAt && dayjs(goal.completedAt).isBefore(monthStart)) {
//         return null;
//       }

//       return {
//         ...goal,
//         currentAmount: snapshot.amount,
//       };
//     })
//     .filter((g): g is SavingGoal & { currentAmount: number } => Boolean(g));
// }

export function getSavingGoalsForMonth(
  goals: SavingGoal[],
  dateStr: string // formato "YYYY-MM-DD" ya validado
) {
  const targetDate = dayjs(dateStr)
  const monthStart = targetDate.startOf("month")
  const monthEnd = targetDate.endOf("month")

  return goals
    .filter(g => {
      // Solo goals creados antes o igual a la fecha y no completados antes de la fecha
      const createdAt = dayjs(g.createdAt)
      const completedAt = g.completedAt ? dayjs(g.completedAt) : null

      const wasCreatedBefore = createdAt.isSameOrBefore(targetDate)
      const isActive = !completedAt || completedAt.isAfter(targetDate)

      return wasCreatedBefore && isActive
    })
    .map(g => {
      // Encontrar el último registro válido de history para el rango
      let history: SavingGoalHistory | null = null

      for (let i = g.history.length - 1; i >= 0; i--) {
        const hDate = dayjs(g.history[i].date)
        // Si está en el mes, ese es el más reciente
        if (hDate.isSameOrAfter(monthStart) && hDate.isSameOrBefore(monthEnd)) {
          history = g.history[i]
          break
        }
        // Si no hay registros en el mes, toma el más reciente anterior al mes
        if (!history && hDate.isBefore(monthStart)) {
          history = g.history[i]
        }
      }

      return {
        ...g,
        history
      }
    })
}