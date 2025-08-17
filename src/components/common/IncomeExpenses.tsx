import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts" 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartLegend, ChartTooltip } from "@/components/ui/chart"
import { useFinanceStore } from "@/stores/financeStore"
import { useShallow } from "zustand/shallow"
import { capitalize, generarRangoMensual } from "@/utils/utils"
import { BALANCE, EXPENSE, INCOME } from "@/lib/const"
import Filters from "../Filters"
import dayjs from "dayjs"

const grafic = [
  { dataKey: INCOME, stroke: "#10b981" },
  { dataKey: EXPENSE, stroke: "#ef4444" },
  { dataKey: BALANCE, stroke: "#1c398e" },
]

const IncomeExpenses = () => {
  const { transactions, filterDate } = useFinanceStore(
    useShallow((s) => ({
      transactions: s.transactions,
      filterDate: s.filterDate,
    }))
  )

  const dataMensual = filterDate
    ? generarRangoMensual(transactions, filterDate?.slice(0, 7))
    : generarRangoMensual(transactions)

  return (
    <Card className="w-full overflow-hidden pr-4">
      <CardHeader className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 items-center">
        <div>
          <CardTitle className="text-base md:text-lg">Income vs Expense</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Last 30 days comparison
          </CardDescription>
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
              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (!active || !payload) return null
                  const isFuture = dayjs(label).isAfter(dayjs(), "day")
                  if (isFuture) {
                    return (
                      <div className="p-2 bg-white border rounded shadow text-sm text-gray-600">
                        {label}: Sin datos aún
                      </div>
                    )
                  }
                  return (
                    <div className="p-2 bg-white border rounded shadow">
                      <span className="text-sm">{label}</span>
                      {payload.map((entry, index) => {
                        return(
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span>{`${entry.name}: $${entry.value}`}</span>
                          </div>
                        )
                      })}
                    </div>
                  )
                }}
              />
              <ChartLegend />
              {grafic.map(({ dataKey, stroke }, index) => (
                <Line
                  key={index}
                  type="monotone"
                  name={capitalize(dataKey)}
                  dataKey={dataKey}
                  stroke={stroke}
                  strokeWidth={3}
                  // dot={{ fill: stroke, strokeWidth: 2, r: 3 }}
                  dot={(props) => {
                    const { cx, cy, payload, index } = props;
                    const isToday = dayjs(payload.date).isSame(dayjs(), "day");

                    return (
                      <circle
                        key={index}
                        cx={cx}
                        cy={cy}
                        r={isToday ? 6 : 3} // más grande si es hoy
                        stroke={isToday ? "#000" : stroke}
                        strokeWidth={isToday ? 2 : 1}
                        fill={isToday ? "#fff" : stroke}
                      />
                    );
                  }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default IncomeExpenses
