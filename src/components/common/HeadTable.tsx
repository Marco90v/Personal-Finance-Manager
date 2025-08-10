import type { SortField, SortState } from "@/type"
import { Button } from "@/components/ui/button"
import { TableHead } from "@/components/ui/table"
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react"

interface Props {
  name: string
  sortField: SortField
  handleSort: (field: SortField) => void
  sortState: SortState
}

const getSortIcon = (field: SortField, sortState:SortState) => {
  if (sortState.field !== field) {
    return <ChevronsUpDown className="ml-2 h-4 w-4" />
  }

  if (sortState.direction === "asc") {
    return <ChevronUp className="ml-2 h-4 w-4" />
  } else if (sortState.direction === "desc") {
    return <ChevronDown className="ml-2 h-4 w-4" />
  }

  return <ChevronsUpDown className="ml-2 h-4 w-4" />
}

const HeadTable = ({ name, sortField, handleSort, sortState }:Props) => {
  return (
    <TableHead>
      <Button
        variant="ghost"
        onClick={() => handleSort(sortField)}
        className="h-auto p-0 font-semibold hover:bg-transparent cursor-pointer"
      >
        {name}
        {getSortIcon(sortField, sortState)}
      </Button>
    </TableHead>
  )
}

export default HeadTable