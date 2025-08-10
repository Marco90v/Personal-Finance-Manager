import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { accounts, expensesTypes } from "@/data/mockData"
import { formatNumber, recalcularCaret, removeFormat } from "@/utils/utils"
import { useRef } from "react"
import type { FormExpenseType, Transaccion } from "@/type"
import { formSchemaExpense } from "@/schemas/schemaExpenses"
import dayjs from "dayjs"
import { useFinanceStore } from "@/stores/financeStore"
import { useShallow } from "zustand/shallow"

// interface AddExpenseFormProps {
//   onSubmit?: (data: FormExpenseType) => void
// }

export default function AddExpenseForm() {

  const inputRef = useRef<HTMLInputElement>(null);

  const {addTransaccion} =  useFinanceStore(useShallow(s => ({
    addTransaccion: s.addTransaccion,
  })))

  const form = useForm<FormExpenseType>({
    resolver: zodResolver(formSchemaExpense),
    defaultValues: {
      amount: undefined,
      date: new Date(),
      notes: "",
      recurrence: "",
      category: "",
      account: "",
    },
  })

  function handleSubmit(data: FormExpenseType) {
    const newData:Transaccion = {
      ...data,
      id: crypto.randomUUID(),
      type: "expenses",
      date: dayjs(data.date).format("YYYY-MM-DD")
    }
    addTransaccion(newData)
    form.reset()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Add Expense</CardTitle>
          <CardDescription>Record a new expense to track your spending</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            {...field}
                            ref={inputRef}
                            type="text"
                            step="0,01"
                            placeholder="0,00"
                            className="pl-8"
                            value={formatNumber(field.value ?? "")}
                            onChange={(e) =>{
                              const start = e.target.selectionStart ?? 0;
                              const numericValue = removeFormat(e)
                              field.onChange(numericValue)
                              // 🔹 recalcular caret después del render
                              requestAnimationFrame(() => {
                                recalcularCaret(inputRef, e, numericValue, start);
                              });
                            }}
                          />
                        </div>
                      </FormControl>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
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
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recurrence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recurrence</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select expense type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed</SelectItem>
                          <SelectItem value="variable">Variable</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value || ""}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {expensesTypes.map(({id, name}) => (
                            <SelectItem key={id} value={id}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Associated Account</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value || ""}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {accounts.map(({id, name}) => (
                          <SelectItem key={id} value={id}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="min-h-[20px]">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any additional notes about this expense..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <div className="min-h-[20px]">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-4">
                <Button type="submit" className="w-full md:w-auto px-8">
                  Save Expense
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
