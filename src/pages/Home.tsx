import Budgets from "@/components/common/Budgets"
import CardBalance from "@/components/common/CardBalance"
import Goals from "@/components/common/Goals"
import IncomeExpenses from "@/components/common/IncomeExpenses"
import Spending from "@/components/common/Spending"
import {transacciones} from "@/data/mockData"

// console.log(transacciones)

interface transacciones {
  id: string,
  tipo: "income" | "expenses",
  monto: number,
  fecha: string,
  categoria: "Sueldo" | "Freelance" | "Venta" | "Alquiler" | "Servicios" | "Comida" | "Transporte" | "Ocio" | "Compras",
  cuentaId: "cuenta_1" | "cuenta_2",
  notas: string,
}

const income = transacciones.filter((tx:transacciones) => tx.tipo === "income").reduce((acum:number, tx:transacciones) => acum + tx.monto, 0)
const expenses = transacciones.filter((tx:transacciones) => tx.tipo === "expenses").reduce((acum:number, tx:transacciones) => acum + tx.monto, 0)
const total = income - expenses

// console.log(income, expenses, total)

const Home = () => {
  return (
    <>
      <div className="p-6 mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"> 
        <CardBalance title="Total Balance" totalBalance={total} porcentage="+2.5%" arrow="ArrowUpRight" />
        <CardBalance title="Monthly Income" totalBalance={income} arrow="TrendingUp" textColorTitle="text-green-600" />
        <CardBalance title="Monthly Expenses" totalBalance={expenses} arrow="TrendingDown" textColorTitle="text-red-600" />
      </div>
      <div className="p-6 mx-auto max-w-[1024px] flex flex-col gap-4"> 
        <IncomeExpenses />
      </div>
      {/* <Budgets /> */}
      {/* <Goals /> */}
      {/* <Spending /> */}
    </>
  )
}

export default Home