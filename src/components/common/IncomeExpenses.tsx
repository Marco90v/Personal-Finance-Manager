import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts" 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"// import Spending from "./Spending"

const chartConfig = {
  income: {
    label: "Income",
    color: "#10b981",
  },
  expenses: {
    label: "Expenses",
    color: "#ef4444",
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

{/* Income vs Expenses Chart */}
const IncomeExpenses = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>
        <CardDescription>Last 30 days comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={incomeExpenseData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis dataKey="date" className="text-xs text-gray-600" axisLine={false} tickLine={false} />
              <YAxis className="text-xs text-gray-600" axisLine={false} tickLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card> 
  )
}

export default IncomeExpenses