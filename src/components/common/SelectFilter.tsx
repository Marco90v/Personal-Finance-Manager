import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { accounts, expensesTypes, incomesTypes } from "@/data/mockData"

type Type = "income" | "expenses" | "account"

interface labels {
  items: string[]
  title: string
  selectLabel: string
}

interface props {
  type: Type
  data: string | undefined
  setData: React.Dispatch<React.SetStateAction<string | undefined>>
}

const labels:Record<Type, labels> = {
  income : {
    items: incomesTypes.map(t => t.name),
    title: "Filter by income category",
    selectLabel: "Select by income",
  },
  expenses : {
    items: expensesTypes.map(t => t.name),
    title: "Filter by expense category",
    selectLabel: "Select by expense",
  },
  account : {
    items: accounts.map(c => c.name),
    title: "Filter by account",
    selectLabel: "Select an account",
  }
}

function SelectFilter({type, data, setData}:props) {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
          {labels[type].title}
      </Label>
      <Select defaultValue={data} onValueChange={setData}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={labels[type].selectLabel} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem key="0001" value={"All"}>
              All
            </SelectItem>
            {labels[type].items.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectFilter
