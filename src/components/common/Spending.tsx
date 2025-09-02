import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

const categoryData = [
  { name: "Food & Dining", value: 1200, color: "#8b5cf6" },
  { name: "Transportation", value: 800, color: "#06b6d4" },
  { name: "Shopping", value: 600, color: "#10b981" },
  { name: "Entertainment", value: 400, color: "#f59e0b" },
  { name: "Bills & Utilities", value: 900, color: "#ef4444" },
  { name: "Healthcare", value: 300, color: "#ec4899" },
]

const Spending = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>This month's expense breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8">
          {/* Chart */}
          <div className="flex-1">
            <ChartContainer config={{}} className="aspect-square w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius="40%"
                    outerRadius="70%"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="max-w-xs rounded-lg border bg-white p-3 shadow-md">
                            <p className="font-medium break-words text-sm sm:text-base truncate">
                              {data.name}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              ${data.value.toLocaleString()}
                            </p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Legend */}
          <div className="space-y-2 w-full max-w-xs">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full shrink-0"
                  style={{ backgroundColor: category.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{category.name}</p>
                  <p className="text-xs text-gray-600">
                    ${category.value.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Spending
