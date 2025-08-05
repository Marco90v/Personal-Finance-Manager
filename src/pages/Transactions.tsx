"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, ChevronDown, ChevronsUpDown, ChevronUp, Edit, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
// import type { Transaction, TransactionFilters } from "@/types/transaction"

type TransactionType = "income" | "expense"

type Transaction = {
  id: string
  type: TransactionType
  amount: number
  category: string
  account: string
  description: string
  date: Date
}

// type TransactionFilters = {
//   type: TransactionType | "all"
//   category: string
//   account: string
//   dateFrom: Date | undefined
//   dateTo: Date | undefined
// }

// type SortField = "date" | "type" | "category" | "description" | "account" | "amount"
type SortField = keyof Transaction
type SortDirection = "asc" | "desc" | null

interface SortState {
  field: SortField | null
  direction: SortDirection
}

const filterSchema = z.object({
  type: z.enum(["all", "income", "expense"]),
  category: z.string(),
  account: z.string(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
})

type TransactionFilters = z.infer<typeof filterSchema>

// Mock data for demonstration
const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "income",
    amount: 3500,
    category: "Salary",
    account: "Checking Account",
    description: "Monthly salary",
    date: new Date("2024-01-15"),
  },
  {
    id: "2",
    type: "expense",
    amount: 1200,
    category: "Rent",
    account: "Checking Account",
    description: "Monthly rent payment",
    date: new Date("2024-01-01"),
  },
  {
    id: "3",
    type: "expense",
    amount: 450,
    category: "Groceries",
    account: "Credit Card",
    description: "Weekly grocery shopping",
    date: new Date("2024-01-10"),
  },
  {
    id: "4",
    type: "income",
    amount: 500,
    category: "Freelance",
    account: "Savings Account",
    description: "Web design project",
    date: new Date("2024-01-20"),
  },
]

const categories = {
  income: ["Salary", "Freelance", "Investment", "Other Income"],
  expense: ["Rent", "Groceries", "Transportation", "Entertainment", "Utilities", "Other Expense"],
}

const accounts = ["Checking Account", "Savings Account", "Credit Card", "Cash"]

interface TransactionHistoryProps {
  onEdit?: (transaction: Transaction) => void
  onRemove?: (transactionId: string) => void
}

export default function TransactionHistory({ onEdit, onRemove }: TransactionHistoryProps) {
  const [transactions] = useState<Transaction[]>(mockTransactions)
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(mockTransactions)
  const [sortState, setSortState] = useState<SortState>({
    field: null,
    direction: null,
  })

  const form = useForm<TransactionFilters>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      type: "all",
      category: "all",
      account: "all",
      dateFrom: undefined,
      dateTo: undefined,
    },
  })

  const watchedType = form.watch("type")

  const handleFilterChange = (filters: TransactionFilters) => {
    // console.log(filters)
    let filtered = transactions

    // Filter by type
    if (filters.type !== "all") {
      filtered = filtered.filter((t) => t.type === filters.type)
    }

    // Filter by category
    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter((t) => t.category === filters.category)
    }

    // Filter by account
    if (filters.account && filters.account !== "all") {
      filtered = filtered.filter((t) => t.account === filters.account)
    }

    // Filter by date range
    if (filters.dateFrom) {
      filtered = filtered.filter((t) => t.date >= filters.dateFrom!)
    }
    if (filters.dateTo) {
      filtered = filtered.filter((t) => t.date <= filters.dateTo!)
    }

    // Apply sorting to filtered results
    const sorted = getSortedTransactions(filtered)
    setFilteredTransactions(sorted)
  }

  const handleSort = (field: SortField) => {
    let direction: SortDirection = "asc"

    if (sortState.field === field) {
      if (sortState.direction === "asc") {
        direction = "desc"
      } else if (sortState.direction === "desc") {
        direction = null
      }
    }

    setSortState({ field: direction ? field : null, direction })
  }

 const getSortedTransactions = (transactions: Transaction[]): Transaction[] => {
  if (!sortState.field || !sortState.direction) return transactions

  const field = sortState.field

  return [...transactions].sort((a, b) => {
    const aValue = a[field]
    const bValue = b[field]

    let comparison = 0

    if (field === "date") {
      comparison = new Date(aValue).getTime() - new Date(bValue).getTime()
    } else if (field === "amount") {
      comparison = aValue as number - (bValue as number)
    } else {
      const aStr = String(aValue).toLowerCase()
      const bStr = String(bValue).toLowerCase()
      comparison = aStr.localeCompare(bStr)
    }

    return sortState.direction === "asc" ? comparison : -comparison
  })
}

  const getSortIcon = (field: SortField) => {
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

  const availableCategories =
    watchedType === "all"
      ? [...categories.income, ...categories.expense]
      : categories[watchedType as keyof typeof categories] || []

  return (
    <div className="mx-4 md:mx-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value)
                          form.setValue("category", "all")
                          handleFilterChange({ ...form.getValues(), type: value as TransactionFilters["type"] })
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="income">Income</SelectItem>
                          <SelectItem value="expense">Expense</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value)
                          handleFilterChange({ ...form.getValues(), category: value })
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {availableCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="account"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value)
                          handleFilterChange({ ...form.getValues(), account: value })
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">All Accounts</SelectItem>
                          {accounts.map((account) => (
                            <SelectItem key={account} value={account}>
                              {account}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              field.onChange(date)
                              handleFilterChange({ ...form.getValues(), dateFrom: date })
                            }}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              field.onChange(date)
                              handleFilterChange({ ...form.getValues(), dateTo: date })
                            }}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("date")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Date
                    {getSortIcon("date")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("type")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Type
                    {getSortIcon("type")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("category")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Category
                    {getSortIcon("category")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("description")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Description
                    {getSortIcon("description")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("account")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Account
                    {getSortIcon("account")}
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("amount")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Amount
                    {getSortIcon("amount")}
                  </Button>
                </TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getSortedTransactions(filteredTransactions).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No transactions found matching your filters.
                  </TableCell>
                </TableRow>
              ) : (
                getSortedTransactions(filteredTransactions).map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{format(transaction.date, "MMM dd, yyyy")}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          transaction.type === "income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
                        )}
                      >
                        {transaction.type === "income" ? "Income" : "Expense"}
                      </span>
                    </TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.account}</TableCell>
                    <TableCell className="text-right font-medium">
                      <span className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
                        {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => onEdit?.(transaction)} className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit transaction</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemove?.(transaction.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove transaction</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
