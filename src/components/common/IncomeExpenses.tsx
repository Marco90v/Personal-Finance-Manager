import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts" 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartLegend, ChartTooltip } from "@/components/ui/chart"
import { useFinanceStore } from "@/stores/financeStore"
import { useShallow } from "zustand/shallow"
import { capitalize, generarRangoMensual } from "@/utils/utils"
import { BALANCE, EXPENSE, INCOME } from "@/lib/const"
import Filters from "../Filters"


const grafic = [
  { dataKey: INCOME, stroke: "#10b981" },
  { dataKey: EXPENSE, stroke: "#ef4444" },
  { dataKey: BALANCE, stroke: "#000000" },
]

const IncomeExpenses = () => {

  const {transactions, filterDate} =  useFinanceStore(useShallow(s => ({
    transactions: s.transactions,
    filterDate: s.filterDate,
  })))

  const dataMensual = filterDate ? 
    generarRangoMensual(transactions, filterDate?.slice(0, 7)) : 
    generarRangoMensual(transactions)

  return (
    <>
      {/* <div className="mx-auto flex flex-col gap-5 md:flex-row md:gap-3"> */}
        {/* <SelectFilter type="month" /> */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        <DatePicker date={date} setDate={setDate} />
        <SelectFilter type={INCOME} data={incomeCategory} setData={setIncomeCategory} />
        <SelectFilter type={EXPENSE} data={expenseCategory} setData={setExpenseCategory} />
        <SelectFilter type={ACCOUNT} data={account} setData={setaccount} />
      </div> */}
      <Card className="w-full overflow-hidden pr-4">
        <CardHeader className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 items-center">
          <div>
            <CardTitle className="text-base md:text-lg">Income vs Expense</CardTitle>
            <CardDescription className="text-sm text-gray-500">Last 30 days comparison</CardDescription>
          </div>
          <div>
            <Filters />
          </div>
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