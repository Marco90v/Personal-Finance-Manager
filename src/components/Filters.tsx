import DatePicker from "@/components/common/DatePicker"
import { useFinanceStore } from "@/stores/financeStore"
// import dayjs from "dayjs"
import { useEffect } from "react"
import { useShallow } from "zustand/shallow"

const Filters = () => {

  const {filterDate, addFilterDate} =  useFinanceStore(useShallow(s => ({
    filterDate: s.filterDate,
    addFilterDate: s.addFilterDate,
  })))

  useEffect(() => {
    // console.log(filterDate)
  }, [filterDate])

  // const [date, setDate] = useState<Date | undefined>(undefined)
  // console.log(dayjs(date).format("YYYY-MM-DD"))
  // console.log(dayjs().format("YYYY-MM-DD"))

  return (
    <div className="mt-4 md:mt-0 md:max-w-[200px] md:ml-auto">
      <DatePicker date={filterDate} setDate={addFilterDate} />
    </div>
  )
}

export default Filters