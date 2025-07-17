import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react"

interface CardBalanceProps {
  title: string
  totalBalance: number
  arrow: "ArrowUpRight" | "ArrowDownRight" | "TrendingUp" | "TrendingDown"
  description?: string
  porcentage?: string
  textColorTitle?: string
}

const arrowIcon = {
  ArrowUpRight: <ArrowUpRight className="h-4 w-4" />,
  ArrowDownRight: <ArrowDownRight className="h-4 w-4" />,
  TrendingUp: <TrendingUp className="h-4 w-4 text-green-600" />,
  TrendingDown: <TrendingDown className="h-4 w-4 text-red-600" />,
}
{/* <ArrowUpRight className="h-4 w-4" />
<ArrowDownRight className="h-4 w-4" />
<TrendingUp className="h-4 w-4 text-green-600" />
<TrendingDown className="h-4 w-4 text-red-600" /> */}

// const totalBalance = 24750
// const monthlyIncome = 4800
// const monthlyExpenses = 3400
// const netIncome = monthlyIncome - monthlyExpenses

const CardBalance = ({
  title,
  totalBalance,
  arrow,
  description = "from last month",
  textColorTitle = "text-gray-900",
  porcentage,
}: CardBalanceProps) => {
  return (
    <Card className="md:col-span-1">
      <CardHeader className="pb-3">
        <CardDescription>{title}</CardDescription>
        <CardTitle className={`text-3xl font-bold ${textColorTitle}`}>${totalBalance.toLocaleString()}</CardTitle> 
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1 text-green-600">
            {/* <ArrowUpRight className="h-4 w-4" /> */}
            {arrow && arrowIcon[arrow]}
            {porcentage && <span className="font-medium">{porcentage}</span>}
          </div>
          <span className="text-gray-600">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardBalance