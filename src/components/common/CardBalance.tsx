import { useShallow } from "zustand/shallow";
import { useFinanceStore } from "@/stores/financeStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react"

type StatCardType = "income" | "expense" | "balance";

interface labels {
  title: string
  description: string
  textColorTitle: string
  arrow: "ArrowUpRight" | "ArrowDownRight" | "TrendingUp" | "TrendingDown"
}

interface CardBalanceProps {
  type: StatCardType
  porcentage?: string
}

const arrowIcon = {
  ArrowUpRight: <ArrowUpRight className="h-4 w-4" />,
  ArrowDownRight: <ArrowDownRight className="h-4 w-4" />,
  TrendingUp: <TrendingUp className="h-4 w-4 text-green-600" />,
  TrendingDown: <TrendingDown className="h-4 w-4 text-red-600" />,
}

const labels:Record<StatCardType, labels> = {
  income : {
    title: "Monthly Income",
    description: "from last month",
    textColorTitle: "text-green-600",
    arrow: "ArrowUpRight",
  },
  expense : {
    title: "Monthly Expense",
    description: "from last month",
    textColorTitle: "text-red-600",
    arrow: "TrendingDown",
  },
  balance : {
    title: "Monthly Balance",
    description: "from last month",
    textColorTitle: "text-blue-900",
    arrow: "TrendingUp",
  }
}

const CardBalance = ({ type, porcentage }: CardBalanceProps) => {

  const { filterDate, getTotalByMonthBlance, getIncomeByMonthBlance, getExpenseByMonthBlance } =  useFinanceStore(useShallow(s => ({
    filterDate: s.filterDate,
    getTotalByMonthBlance: s.getTotalByMonthBlance,
    getIncomeByMonthBlance: s.getIncomeByMonthBlance,
    getExpenseByMonthBlance: s.getExpenseByMonthBlance,
  })))

  const actionsMap: Record<StatCardType, (date:string | undefined) => number> = {
    income: getIncomeByMonthBlance,
    expense: getExpenseByMonthBlance,
    balance: getTotalByMonthBlance,
  };

  const value = actionsMap[type](filterDate);

  return (
    <Card className="md:col-span-1">
      <CardHeader className="pb-3">
        <CardDescription>{labels[type].title}</CardDescription>
        <CardTitle className={`text-3xl font-bold ${labels[type].textColorTitle}`}>${value.toLocaleString()}</CardTitle> 
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1 text-green-600">
            {arrowIcon[labels[type].arrow]}
            {porcentage && <span className="font-medium">{porcentage}</span>}
          </div>
          <span className="text-gray-600">{labels[type].description}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardBalance