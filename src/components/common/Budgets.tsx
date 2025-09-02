import { Calendar, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getBudgetsWithSpending, getNameCategory } from "@/lib/functions"
import { useShallow } from "zustand/shallow"
import { useFinanceStore } from "@/stores/financeStore"

// const budgets = [
//   {
//     category: "Food & Dining",
//     allocated: 1500,
//     spent: 1200,
//     remaining: 300,
//     daysLeft: 8,
//     color: "#8b5cf6",
//   },
//   {
//     category: "Transportation",
//     allocated: 1000,
//     spent: 800,
//     remaining: 200,
//     daysLeft: 8,
//     color: "#06b6d4",
//   },
//   {
//     category: "Entertainment",
//     allocated: 500,
//     spent: 400,
//     remaining: 100,
//     daysLeft: 8,
//     color: "#f59e0b",
//   },
//   {
//     category: "Shopping",
//     allocated: 800,
//     spent: 6000,
//     remaining: -200,
//     daysLeft: 8,
//     color: "#10b981",
//   },
// ]

const Budgets = () => {

  const {transacciones, budgets} = useFinanceStore(useShallow(s=> ({
    transacciones: s.transactions,
    budgets: s.budgets
  })));

  const data = getBudgetsWithSpending(budgets, transacciones, "2025-08-31");
  // console.log(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Active Budgets
        </CardTitle>
        <CardDescription>Track your monthly spending limits</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((budget, index) => {
          const percentage = (budget.spent / budget.allocated) * 100
          // const percentage = 50
          const isOverBudget = percentage > 100

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: budget.color }} />
                  <span className="font-medium">{getNameCategory(budget.categoryId)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {/* <span className="text-gray-600">{budget.daysLeft} days left</span> */}
                  <span className="text-gray-600">0 days left</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    ${budget.spent.toLocaleString()} of ${budget.allocated.toLocaleString()}
                    {/* $0 of ${budget.allocated.toLocaleString()} */}
                  </span>
                  <span className={`font-medium ${isOverBudget ? "text-red-600" : "text-gray-900"}`}>
                    {percentage.toFixed(0)}%
                  </span>
                </div>
                <Progress
                  value={Math.min(percentage, 100)}
                  className="h-2"
                  // style={
                  //   {
                  //     "--progress-background": isOverBudget ? "#ef4444" : budget.color,
                  //   } as React.CSSProperties
                  // }
                  indicatorColor={budget.color}
                />
                <div className="flex justify-between text-xs">
                  <span className={`${budget.remaining > 0 ? "text-green-600" : "text-red-600"}`}>
                    ${Math.abs(budget.remaining).toLocaleString()}{" "}
                    {budget.remaining > 0 ? "remaining" : "over budget"}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
export default Budgets