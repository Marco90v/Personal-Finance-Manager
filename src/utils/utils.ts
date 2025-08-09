import type { Transaccion } from "@/type";
import dayjs from "dayjs";

export function generarRangoMensual(
  transacciones:Transaccion[], 
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
      t.type === "income" && (incomeCategory === "All" || t.origin === incomeCategory);
    const coincideGasto =
      t.type === "expenses" && (expenseCategory === "All" || t.origin === expenseCategory);

    const coincideCategoria =
      t.type === "income" ? coincideIngreso : coincideGasto;

    return coincideMes && coincideCuenta && coincideCategoria;
  });

  const dataPorDia = diasDelMes.map((date) => {
    const income = transaccionesFiltradas
      .filter((t) => t.type === "income" && t.date === date)
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transaccionesFiltradas
      .filter((t) => t.type === "expenses" && t.date === date)
      .reduce((sum, t) => sum + t.amount, 0);

    return { date, income, expenses };
  });

  // Acumulados
  let acumuladoIngresos = 0;
  let acumuladoGastos = 0;

  return dataPorDia.map(({ date, income, expenses }) => {
    acumuladoIngresos += income;
    acumuladoGastos += expenses;
    return {
      date,
      Income: acumuladoIngresos,
      Expenses: acumuladoGastos,
      Balance: acumuladoIngresos - acumuladoGastos,
    };
  });
}

// Función para formatear número con puntos
export const formatNumber = (value: number | string) => {
  // console.log(value)
  if (value === "" || value === null || isNaN(Number(value))) return "";
  // Formato con separador de miles y 2 decimales
  return new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: 1,
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