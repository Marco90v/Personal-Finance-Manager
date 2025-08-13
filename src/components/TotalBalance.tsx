import { useFinanceStore } from "@/stores/financeStore"
import { useShallow } from "zustand/shallow"

const TotalBalance = () => {
  const { getTotalBalance } =  useFinanceStore(useShallow(s => ({
    getTotalBalance: s.getTotalBalance,
  })))
  return (
    <div className="flex flex-row gap-2 items-center justify-end max-w-5xl mx-auto px-6 text-xl font-medium text-gray-700">
      Total Balance:
      <div className="text-2xl font-bold">${getTotalBalance().toLocaleString()}</div>
    </div>
  )
}
export default TotalBalance