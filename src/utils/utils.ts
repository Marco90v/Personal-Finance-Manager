import { EXPENSE, INCOME } from "@/lib/const";
import type { SortState, Transaction, TransactionFilters } from "@/type";
import dayjs from "dayjs";

export function generarRangoMensual(
  transacciones:Transaction[], 
  mes = dayjs().format("YYYY-MM"), 
  incomeCategory = "All", 
  expenseCategory = "All", 
  accountId = "All"
  ) {
  
  const diasDelMes = Array.from({ length: dayjs(mes).daysInMonth() }, (_, i) =>
    dayjs(`${mes}-${String(i + 1).padStart(2, "0")}`).format("YYYY-MM-DD")
  );

  const transaccionesFiltradas = transacciones.filter((t) => {
    const coincideMes = t.date.startsWith(mes);
    const coincideCuenta = accountId === "All" || t.accountId === accountId;
    const coincideIngreso =
      t.type === INCOME && (incomeCategory === "All" || t.origin === incomeCategory);
    const coincideGasto =
      t.type === EXPENSE && (expenseCategory === "All" || t.origin === expenseCategory);

    const coincideCategoria =
      t.type === INCOME ? coincideIngreso : coincideGasto;

    return coincideMes && coincideCuenta && coincideCategoria;
  });

  const dataPorDia = diasDelMes.map((date) => {
    const income = transaccionesFiltradas
      .filter((t) => t.type === INCOME && t.date === date)
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transaccionesFiltradas
      .filter((t) => t.type === EXPENSE && t.date === date)
      .reduce((sum, t) => sum + t.amount, 0);

    return { date, income, expense };
  });

  // Acumulados
  let acumuladoIngresos = 0;
  let acumuladoGastos = 0;

  return dataPorDia.map(({ date, income, expense }) => {
    acumuladoIngresos += income;
    acumuladoGastos += expense;
    return {
      date,
      income: acumuladoIngresos,
      expense: acumuladoGastos,
      balance: acumuladoIngresos - acumuladoGastos,
    };
  });
}

// Función para formatear número con puntos
export const formatNumber = (value: number | string) => {
  if (value === "" || value === null || isNaN(Number(value))) return "";
  // Formato con separador de miles y 2 decimales
  return new Intl.NumberFormat("es-ES", {
    // style: "currency",
    // currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  }).format(Number(value));
};

// Función para quitar los puntos y comas
export const removeFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
  const rawValue = e.target.value
    .replace(/\./g, "") // quitar miles
    .replace(",", "."); // cambiar coma por punto para parsear
  const numericValue = rawValue === "" ? "" : Number(rawValue);
  return numericValue;
};

// Función que recalcula caret después del render
export const recalcularCaret = (
  inputRef: React.RefObject<HTMLInputElement | null>,
  e: React.ChangeEvent<HTMLInputElement>,
  numericValue: number | string,
  start: number
) => {
  if (inputRef.current) {
    const formatted = formatNumber(numericValue ?? "");
    const diff = formatted.length - e.target.value.length;
    const newPos = Math.max(start + diff, 0);
    inputRef.current.setSelectionRange(newPos, newPos);
  }
};

export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const filterChange = (transactions: Transaction[], filters: TransactionFilters, sortState:SortState) => {
  let filtered = transactions

  // Filter by type
  if (filters.type !== "all") {
    filtered = filtered.filter((t) => t.type === filters.type)
  }

  // Filter by category
  if (filters.origin && filters.origin !== "all") {
    filtered = filtered.filter((t) => t.origin === filters.origin)
  }

  // Filter by account
  if (filters.accountId && filters.accountId !== "all") {
    filtered = filtered.filter((t) => t.accountId === filters.accountId)
  }

  // Filter by date range
  if (filters.dateFrom) {
    filtered = filtered.filter((t) => dayjs(t.date) >= dayjs(filters.dateFrom!))
  }
  if (filters.dateTo) {
    filtered = filtered.filter((t) => t.date <= filters.dateTo!)
  }

  // Apply sorting to filtered results
  const sorted = getSortedTransactions(filtered, sortState)
  // setFilteredTransactions(sorted)
  // return filtered
  return sorted
}

export const getSortedTransactions = (transactions: Transaction[], sortState:SortState): Transaction[] => {
  if (!sortState.field || !sortState.direction) return transactions

  const field = sortState.field

  return [...transactions].sort((a, b) => {
    const aValue = a[field]
    const bValue = b[field]

    let comparison = 0

    if (field === "date") {
      // comparison = new Date(aValue).getTime() - new Date(bValue).getTime()
      const aDate = dayjs(String(aValue))
      const bDate = dayjs(String(bValue))
      comparison = aDate.valueOf() - bDate.valueOf()
    } else if (field === "amount") {
      comparison = aValue as number - (bValue as number)
    } else {
      const aStr = String(aValue).toLowerCase()
      const bStr = String(bValue).toLowerCase()
      comparison = aStr.localeCompare(bStr)
    }

    return sortState.direction === "asc" ? comparison : -comparison
  })
}
