import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts" 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"// import Spending from "./Spending"
import { Tooltip } from "../ui/tooltip"
import { generarRangoMensual } from "@/utils/utils"

import SelectFilter from "@/components/common/SelectFilter"
import DatePicker from "@/components/common/DatePicker"
import {transacciones} from "@/data/mockData"
import { useEffect, useState } from "react"


// const chartConfig = {
//   income: {
//     label: "Income",
//     color: "#10b981",
//   },
//   expenses: {
//     label: "Expenses",
//     color: "#ef4444",
//   },
//   saldo: {
//     label: "Saldo",
//     color: "#60a5fa",
//   },  
// }

// const incomeExpenseData = [
//   { date: "Jan 1", income: 4500, expenses: 3200 },
//   { date: "Jan 5", income: 4200, expenses: 2800 },
//   { date: "Jan 10", income: 4800, expenses: 3500 },
//   { date: "Jan 15", income: 4600, expenses: 3100 },
//   { date: "Jan 20", income: 5000, expenses: 3800 },
//   { date: "Jan 25", income: 4700, expenses: 3300 },
//   { date: "Jan 30", income: 4900, expenses: 3600 },
// ]

// const dataMensual = generarRangoMensual(transacciones)
// console.log(dataMensual)

{/* Income vs Expenses Chart */}
const IncomeExpenses = () => {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [incomeCategory, setIncomeCategory] = useState<string | undefined>(undefined)
  const [expenseCategory, setExpenseCategory] = useState<string | undefined>(undefined)
  const [account, setaccount] = useState<string | undefined>(undefined) 
  // console.log(category, account)
  const dataMensual = date ? 
    generarRangoMensual(transacciones, date?.toISOString().slice(0, 7), incomeCategory, expenseCategory, account) : 
    generarRangoMensual(transacciones, undefined, incomeCategory, expenseCategory, account)

  useEffect(() => {
    // console.log(category, account)  
    // console.log(dataMensual)
    return () => {}
  }, [incomeCategory, account, dataMensual])
  

  return (
    <>
      <div className="flex flex-col gap-5 md:flex-row md:gap-3">
        {/* <SelectFilter type="month" /> */}
        <DatePicker date={date} setDate={setDate} />
        <SelectFilter type="income" data={incomeCategory} setData={setIncomeCategory} />
        <SelectFilter type="expenses" data={expenseCategory} setData={setExpenseCategory} />
        <SelectFilter type="account" data={account} setData={setaccount} />
      </div>
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
    </>
  );
};

export default IncomeExpenses