import IncomeExpenses from "@/components/common/IncomeExpenses"
import Spending from "@/components/common/Spending"
import CardBalance from "@/components/common/CardBalance"
import Budgets from "@/components/common/Budgets"
import Goals from "@/components/common/Goals"

function App() {
  return (
    <>
      <IncomeExpenses />
      <Spending />
      <CardBalance title="Total Balance" totalBalance={24750} porcentage="+2.5%" arrow="ArrowUpRight" />
      <CardBalance title="Monthly Income" totalBalance={4800} arrow="TrendingUp" textColorTitle="text-green-600" />
      <CardBalance title="Monthly Expenses" totalBalance={3400} arrow="TrendingDown" textColorTitle="text-red-600" />
      <Budgets />
      <Goals />
    </>
  )
}

export default App
