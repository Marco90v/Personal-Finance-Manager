import Budgets from "@/components/common/Budgets"
import Goals from "@/components/common/Goals"
import Spending from "@/components/common/Spending"
import CardBalance from "@/components/common/CardBalance"
import IncomeExpenses from "@/components/common/IncomeExpenses"
import TotalBalance from "@/components/TotalBalance"
import { BALANCE, EXPENSE, INCOME } from "@/lib/const"

const Home = () => {
  return (
    <>
      <TotalBalance />
      <div className="p-6 mx-auto grid max-w-[1440px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"> 
        <CardBalance type={BALANCE} porcentage="+2.5%" />
        <CardBalance type={INCOME} />
        <CardBalance type={EXPENSE} />
      </div>
      <div className="p-6 mx-auto max-w-[1440px] flex flex-col gap-4">
        <IncomeExpenses />
      </div>
      <div className="p-6 mx-auto max-w-[1440px] grid grid-cols-1 md:grid-cols-2 gap-4">
        <Budgets />
        <Goals />
      </div>
      <div className="p-6 mx-auto max-w-[1440px] grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <Spending /> */}
      </div>
    </>
  )
}

export default Home