import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "../ui/label"

interface props {
  // type: "category" | "account"
  type: "income" | "expenses" | "account"
  data: string | undefined
  setData: React.Dispatch<React.SetStateAction<string | undefined>>
}

let items:string[] = [] 
let title:string = ""
let selectLabel:string = ""

function SelectFilter({type, data, setData}:props) {
  if(type === "income") {
    items = ["All", "Sueldo", "Freelance", "Venta"]
    title = "Filter by income category"
    selectLabel = "Select a category by income"
  }
  if(type === "expenses") {
    items = ["All", "Alquiler", "Servicios", "Comida", "Transporte", "Ocio", "Compras"]
    title = "Filter by expense category"
    selectLabel = "Select a category by expense"
  }
  if(type === "account") {
    items = ["All", "cuenta_1", "cuenta_2"]
    title = "Filter by account"
    selectLabel = "Select an account"
  }
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
          {title}
      </Label>
      <Select defaultValue={data} onValueChange={setData}>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder={selectLabel} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem key={"void"} value={" "}>
            </SelectItem>
            {items.map((value) => (
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
