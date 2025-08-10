import type { SortField } from "@/type"

interface HeadersTable {
  name: string
  field: SortField
  sortField: SortField
}

export const headersTable:HeadersTable[] = [
  { name: "Date", field: "date", sortField: "date" },
  { name: "Type", field: "type", sortField: "type" },
  { name: "Origin", field: "origin", sortField: "origin" },
  { name: "Account", field: "accountId", sortField: "accountId" },
  { name: "Amount", field: "amount", sortField: "amount" },
]