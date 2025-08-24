import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { incomesTypes, expensesTypes } from "@/data/mockData"
import { useFinanceStore } from "@/stores/financeStore"
import { useShallow } from "zustand/shallow"
import type { SortDirection, SortField, SortState, TransactionFilters } from "@/type"
import NoFilters from "@/components/common/NoFilters"
import BodyTableHistory from "@/components/common/BodyTableHistory"
import { filterTransactionSchema } from "@/schemas/schemaFilterTransaction"
import { filterChange } from "@/utils/utils"
import HeadTable from "@/components/common/HeadTable"
import { ALL, EXPENSE, headersTable, INCOME } from "@/lib/const"

export default function TransactionHistory() {

  const { accounts,  transactions } =  useFinanceStore(useShallow(s => ({
    accounts: s.accounts,
    transactions: s.transactions,
  })))

  const form = useForm<TransactionFilters>({
    resolver: zodResolver(filterTransactionSchema),
    defaultValues: {
      type: ALL,
      origin: ALL,
      accountId: ALL,
      dateFrom: undefined,
      dateTo: undefined,
    },
  })

  const [sortState, setSortState] = useState<SortState>({
    field: null,
    direction: null,
  }) 

  const [handleFilterChange, setHandleFilterChange] = useState<TransactionFilters>({...form.getValues()})
  const watchedType = form.watch("type")
  const filterAndSortTransactions = filterChange(transactions, handleFilterChange, sortState)
  const availableOrigin =
    watchedType === ALL
      ? [...incomesTypes, ...expensesTypes]
      : { income: incomesTypes, expense: expensesTypes }[watchedType as "income" | "expense"] || []

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
                          form.setValue("origin", ALL)
                          setHandleFilterChange({ ...form.getValues(), type: value as TransactionFilters["type"] })
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full bg-white border-border">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={ALL}>All Types</SelectItem>
                          <SelectItem value={INCOME}>Income</SelectItem>
                          <SelectItem value={EXPENSE}>Expense</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origin</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value)
                          setHandleFilterChange({ ...form.getValues(), origin: value })
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full bg-white border-border">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={ALL}>All Categories</SelectItem>
                          {availableOrigin.map(({id, name}) => (
                            <SelectItem key={id} value={id}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value)
                          setHandleFilterChange({ ...form.getValues(), accountId: value })
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full bg-white border-border">
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={ALL}>All Accounts</SelectItem>
                          {accounts.map(({id, name}) => (
                            <SelectItem key={id} value={id}>
                              {name}
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
                            selected={new Date(String(field.value))}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              field.onChange(date)
                              setHandleFilterChange({ ...form.getValues(), dateFrom: date?.toDateString() })
                            }}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
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
                            selected={new Date(String(field.value))}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              field.onChange(date)
                              setHandleFilterChange({ ...form.getValues(), dateTo: date?.toDateString() })
                            }}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
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
                {headersTable.map(({ name, field, sortField }) => (
                  <HeadTable
                    key={field}
                    name={name}
                    sortField={sortField}
                    handleSort={handleSort}
                    sortState={sortState}
                  />
                ))}
                <TableHead className="text-center font-semibold">Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterAndSortTransactions.length === 0 ? (
                <NoFilters />
              ) : (
                filterAndSortTransactions.map((transaction) => (
                  <BodyTableHistory key={transaction.id} transaction={transaction} />
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
