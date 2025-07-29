import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts" 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"// import Spending from "./Spending"
import { Tooltip } from "../ui/tooltip"
import { generarRangoMensual } from "@/utils/utils"

import {transacciones} from "@/data/mockData"


const chartConfig = {
  income: {
    label: "Income",
    color: "#10b981",
  },
  expenses: {
    label: "Expenses",
    color: "#ef4444",
  },
  saldo: {
    label: "Saldo",
    color: "#60a5fa",
  },  
}

const incomeExpenseData = [
  { date: "Jan 1", income: 4500, expenses: 3200 },
  { date: "Jan 5", income: 4200, expenses: 2800 },
  { date: "Jan 10", income: 4800, expenses: 3500 },
  { date: "Jan 15", income: 4600, expenses: 3100 },
  { date: "Jan 20", income: 5000, expenses: 3800 },
  { date: "Jan 25", income: 4700, expenses: 3300 },
  { date: "Jan 30", income: 4900, expenses: 3600 },
]

const dataMensual = generarRangoMensual(transacciones)
// console.log(dataMensual)

{/* Income vs Expenses Chart */}
const IncomeExpenses = () => {
  return (
    <Card className="w-full overflow-hidden pr-4">
      <CardHeader>
        <CardTitle className="text-base md:text-lg">Income vs Expenses</CardTitle>
        <CardDescription className="text-sm text-gray-500">Last 30 days comparison</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataMensual}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <ChartTooltip />
              <ChartLegend />
              <Line
                type="monotone"
                dataKey="Income"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="Expenses"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="Balance"
                // stroke="#60a5fa"
                stroke="#000000"
                strokeWidth={3}
                dot={{ fill: "#000000", strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
// const IncomeExpenses = () => {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Income vs Expenses</CardTitle>
//         <CardDescription>Last 30 days comparison</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig} className="h-[300px]">
//           <ResponsiveContainer width="100%" height="100%">
//             {/* <LineChart data={incomeExpenseData}> */}
//             <LineChart data={dataMensual}>
//               <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
//               <XAxis dataKey="date" className="text-xs text-gray-600" axisLine={false} tickLine={false} />
//               <YAxis className="text-xs text-gray-600" axisLine={false} tickLine={false} />
//               <ChartTooltip content={<ChartTooltipContent />} />
//               <ChartLegend content={<ChartLegendContent />} />
//               <Line
//                 type="monotone"
//                 dataKey="income"
//                 stroke="#10b981"
//                 strokeWidth={3}
//                 dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="expenses"
//                 stroke="#ef4444"
//                 strokeWidth={3}
//                 dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="saldo"
//                 stroke="#60a5fa"
//                 strokeWidth={3}
//                 dot={{ fill: "#60a5fa", strokeWidth: 2, r: 4 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </ChartContainer>
//       </CardContent>
//     </Card> 

//     // <ResponsiveContainer width="100%" height={300}>
//     //   <LineChart data={dataMensual}>
//     //     <CartesianGrid strokeDasharray="3 3" />
//     //     <XAxis dataKey="dia" />
//     //     <YAxis />
//     //     <Tooltip />
//     //     <Line type="monotone" dataKey="ingresos" stroke="#4ade80" name="Ingresos" />
//     //     <Line type="monotone" dataKey="gastos" stroke="#f87171" name="Gastos" />
//     //     <Line type="monotone" dataKey="saldo" stroke="#60a5fa" name="Saldo" />
//     //   </LineChart>
//     // </ResponsiveContainer>
//   )
// }

export default IncomeExpenses