import { useState } from "react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts" 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartLegend, ChartTooltip } from "@/components/ui/chart"
import SelectFilter from "@/components/common/SelectFilter"
import DatePicker from "@/components/common/DatePicker"
import { useFinanceStore } from "@/stores/financeStore"
import { useShallow } from "zustand/shallow"
import { capitalize, generarRangoMensual } from "@/utils/utils"
import { ACCOUNT, BALANCE, EXPENSE, INCOME } from "@/lib/const"


const grafic = [
  { dataKey: INCOME, stroke: "#10b981" },
  { dataKey: EXPENSE, stroke: "#ef4444" },
  { dataKey: BALANCE, stroke: "#000000" },
]

const IncomeExpenses = () => {

  const {transactions} =  useFinanceStore(useShallow(s => ({
    transactions: s.transactions,
  })))

  const [date, setDate] = useState<Date | undefined>(undefined)
  const [incomeCategory, setIncomeCategory] = useState<string | undefined>(undefined)
  const [expenseCategory, setExpenseCategory] = useState<string | undefined>(undefined)
  const [account, setaccount] = useState<string | undefined>(undefined) 

  const dataMensual = date ? 
    generarRangoMensual(transactions, date?.toISOString().slice(0, 7), incomeCategory, expenseCategory, account) : 
    generarRangoMensual(transactions, undefined, incomeCategory, expenseCategory, account)

  return (
    <>
      {/* <div className="mx-auto flex flex-col gap-5 md:flex-row md:gap-3"> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        {/* <SelectFilter type="month" /> */}
        <DatePicker date={date} setDate={setDate} />
        <SelectFilter type={INCOME} data={incomeCategory} setData={setIncomeCategory} />
        <SelectFilter type={EXPENSE} data={expenseCategory} setData={setExpenseCategory} />
        <SelectFilter type={ACCOUNT} data={account} setData={setaccount} />
      </div>
      <Card className="w-full overflow-hidden pr-4">
        <CardHeader>
          <CardTitle className="text-base md:text-lg">Income vs Expense</CardTitle>
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
                {
                  grafic.map(({ dataKey, stroke }, index) => (
                    <Line
                      key={index}
                      type="monotone"
                      name={capitalize(dataKey)}
                      dataKey={dataKey}
                      stroke={stroke}
                      strokeWidth={3}
                      dot={{ fill: stroke, strokeWidth: 2, r: 3 }}
                    />
                  ))
                }
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default IncomeExpenses