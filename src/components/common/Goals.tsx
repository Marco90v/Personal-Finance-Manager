import { DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const savingsGoals = [
  {
    name: "Emergency Fund",
    target: 10000,
    current: 7500,
    progress: 75,
    color: "#8b5cf6",
  },
  {
    name: "Vacation Fund",
    target: 3000,
    current: 1800,
    progress: 60,
    color: "#06b6d4",
  },
  {
    name: "New Car",
    target: 25000,
    current: 8500,
    progress: 34,
    color: "#10b981",
  },
  {
    name: "Home Down Payment",
    target: 50000,
    current: 12000,
    progress: 24,
    color: "#f59e0b",
  },
]

const Goals = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Savings Goals
        </CardTitle>
        <CardDescription>Progress towards your financial goals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {savingsGoals.map((goal, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{goal.name}</span>
              <Badge variant="secondary" className="text-xs">
                {goal.progress}%
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm text-gray-600">
                <span>${goal.current.toLocaleString()}</span>
                <span>${goal.target.toLocaleString()}</span>
              </div>
              {/* <Progress
                value={goal.progress}
                className="h-2"
                style={
                  {
                    "--progress-background": goal.color,
                  } as React.CSSProperties
                }
              /> */}
              <Progress
                value={Math.min(goal.progress, 100)}
                className="h-2"
                // style={
                //   {
                //     "--progress-background": isOverBudget ? "#ef4444" : budget.color,
                //   } as React.CSSProperties
                // }
                indicatorColor={goal.color}
              />
              <div className="text-xs text-gray-600">
                ${(goal.target - goal.current).toLocaleString()} remaining
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
export default Goals