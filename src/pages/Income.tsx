import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
import { CalendarIcon, DollarSign } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"
import { accounts, incomesTypes } from "@/data/mockData"
import type { FormIncomeType, Transaccion } from "@/type"
import { formSchemaIncome } from "@/schemas/schemaIncomes"
import { useFinanceStore } from "@/stores/financeStore"
import { useShallow } from "zustand/shallow"
import { formatNumber, recalcularCaret, removeFormat } from "@/utils/utils"

function AddIncomeForm() {

  const inputRef = useRef<HTMLInputElement>(null);

  const {addTransaccion} =  useFinanceStore(useShallow(s => ({
    addTransaccion: s.addTransaccion,
  })))
  const [isCustomSource, setIsCustomSource] = useState(false)

  const form = useForm<FormIncomeType>({
    resolver: zodResolver(formSchemaIncome),
    defaultValues: {
      amount: undefined,
      date: new Date(),
      origin: "",
      accountId: "",
      notes: "",
    },
  })

  const onSubmit = (data: FormIncomeType) => {
    const newData:Transaccion = {
      ...data,
      id: crypto.randomUUID(),
      type: "income",
      date: dayjs(data.date).format("YYYY-MM-DD")
    }
    addTransaccion(newData)
    form.reset()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Add Income
          </CardTitle>
          <CardDescription>Record a new income transaction to track your earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          ref={inputRef}
                          type="text"
                          step="0,01"
                          placeholder="0,00"
                          className="pl-10"
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin</FormLabel>
                    <div className="space-y-3">
                      <Select
                        value={isCustomSource ? "custom" : field.value}
                        onValueChange={(value) => {
                          if (value === "custom") {
                            setIsCustomSource(true)
                            field.onChange("")
                          } else {
                            setIsCustomSource(false)
                            field.onChange(value)
                          }
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select income source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {incomesTypes.map(({id, name}) => (
                            <SelectItem key={id} value={name}>
                              {name}
                            </SelectItem>
                          ))}
                          <SelectItem value="custom">Custom...</SelectItem>
                        </SelectContent>
                      </Select>
                      {isCustomSource && (
                        <FormControl>
                          <Input {...field} placeholder="Enter custom source" className="mt-2" />
                        </FormControl>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountId"
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
                    <FormMessage />
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
                        {...field}
                        placeholder="Add any additional notes about this income..."
                        className="min-h-[80px] resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Save Income
                </Button>
                <Button type="button" variant="outline" onClick={() => form.reset()} className="flex-1">
                  Clear
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddIncomeForm