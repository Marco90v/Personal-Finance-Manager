import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

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
    items: ["All", "Sueldo", "Freelance", "Venta"],
    title: "Filter by income category",
    selectLabel: "Select by income",
  },
  expenses : {
    items: ["All", "Alquiler", "Servicios", "Comida", "Transporte", "Ocio", "Compras"],
    title: "Filter by expense category",
    selectLabel: "Select by expense",
  },
  account : {
    items: ["All", "cuenta_1", "cuenta_2"],
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
            <SelectItem key={"void"} value={" "}>
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
