import { useShallow } from "zustand/shallow";
import { useFinanceStore } from "@/stores/financeStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react"

type StatCardType = "incomes" | "expenses" | "balance";

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
  incomes : {
    title: "Total Income",
    description: "from last month",
    textColorTitle: "text-green-600",
    arrow: "ArrowUpRight",
  },
  expenses : {
    title: "Total Expenses",
    description: "from last month",
    textColorTitle: "text-red-600",
    arrow: "TrendingDown",
  },
  balance : {
    title: "Monthly Balance",
    description: "from last month",
    textColorTitle: "text-gray-900",
    arrow: "TrendingUp",
  }
}

const CardBalance = ({ type, porcentage }: CardBalanceProps) => {

  const {getTotalBalance, getIncomesTotal, getExpensesTotal} =  useFinanceStore(useShallow(s => ({
    getTotalBalance: s.getTotalBalance,
    getIncomesTotal: s.getIncomesTotal,
    getExpensesTotal: s.getExpensesTotal,
  })))

  const actionsMap: Record<StatCardType, () => number> = {
    incomes: getIncomesTotal,
    expenses: getExpensesTotal,
    balance: getTotalBalance,
  };

  const value = actionsMap[type]();

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