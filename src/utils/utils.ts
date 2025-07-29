import dayjs from "dayjs";

interface transacciones {
  id: string,
  tipo: "income" | "expenses",
  monto: number,
  fecha: string,
  categoria: "Sueldo" | "Freelance" | "Venta" | "Alquiler" | "Servicios" | "Comida" | "Transporte" | "Ocio" | "Compras",
  cuentaId: "cuenta_1" | "cuenta_2",
  notas: string,
}

export function generarRangoMensual(transacciones:transacciones[], mes = "2025-07") {
  const diasDelMes = Array.from({ length: dayjs(mes).daysInMonth() }, (_, i) =>
    dayjs(`${mes}-${String(i + 1).padStart(2, "0")}`).format("YYYY-MM-DD")
  );

  const dataPorDia = diasDelMes.map((date) => {
    const income = transacciones
      .filter((t) => t.tipo === "income" && t.fecha === date)
      .reduce((sum, t) => sum + t.monto, 0);

    const expenses = transacciones
      .filter((t) => t.tipo === "expenses" && t.fecha === date)
      .reduce((sum, t) => sum + t.monto, 0);

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
