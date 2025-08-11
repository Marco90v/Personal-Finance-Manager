import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"// import * as z from "zod"
import { Plus, Edit, Trash2, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import { typeAccounts } from "@/data/mockData"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formSchemaAccount } from "@/schemas/schemaAccount"
import type { Account, FormAccountType } from "@/type"
import { capitalize, formatNumber, recalcularCaret, removeFormat } from "@/utils/utils"
import { useFinanceStore } from "@/stores/financeStore"
import { useShallow } from "zustand/shallow"

const getAccountTypeColor = (type: Account["type"]):string => {
  switch (type) {
    case "bank":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    case "cash":
      return "bg-green-100 text-green-800 hover:bg-green-200"
    case "investment":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200"
  }
}

export default function AccountsManager() {
  const inputRef = useRef<HTMLInputElement>(null);

  const {accounts, addAccount, updateAccount, removeAccount, getTotalBalance} =  useFinanceStore(useShallow(s => ({
    accounts: s.accounts,
    addAccount: s.addAccount,
    updateAccount: s.updateAccount,
    removeAccount: s.removeAccount,
    getTotalBalance: s.getTotalBalance,
  })))
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)

  const form = useForm<FormAccountType>({
    resolver: zodResolver(formSchemaAccount),
    defaultValues: {
      name: "",
      balance: undefined,
      type: "",
      description: "",
    },
  })

  const onSubmit = (data: FormAccountType) => {

    if (editingAccount) {
      updateAccount(editingAccount.id, data)
    } else {
      const newAccount: Account = {
        ...data,
        id: crypto.randomUUID(),
      }
      addAccount(newAccount)
    }

    form.reset()
    setIsAddDialogOpen(false)
  }

  const handleEdit = (account: Account) => {
    setEditingAccount(account)
    form.setValue("name", account.name)
    form.setValue("balance", account.balance.toString())
    form.setValue("type", account.type)
    form.setValue("description", account.description)
    setIsAddDialogOpen(true)
  }

  const handleDelete = (accountId: string) => {
    removeAccount(accountId)
  }

  return (
    <div className="space-y-6 mx-4 my-8 xl:mx-auto max-w-[980px]"> 
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Accounts / Funds</h2>
          <p className="text-muted-foreground">Manage your financial accounts and track balances</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="cursor-pointer"
              onClick={() => {
                setEditingAccount(null)
                form.reset()
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Account
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingAccount ? "Edit Account" : "Add New Account"}</DialogTitle>
              <DialogDescription>
                {editingAccount
                  ? "Update your account information below."
                  : "Create a new account to track your finances."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Chase Checking, Cash Wallet" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="balance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{editingAccount ? "Current Balance" : "Initial Balance"}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
                  name="type"
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
                          {typeAccounts.map(({id, name}) => (
                            <SelectItem key={id} value={name}>
                              {capitalize(name)}
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    className="cursor-pointer"
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddDialogOpen(false)
                      setEditingAccount(null)
                      form.reset()
                    }}
                  >
                    Cancel
                  </Button>
                  <Button className="cursor-pointer" type="submit">{editingAccount ? "Update Account" : "Add Account"}</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">{formatNumber(getTotalBalance())}</div>
          <p className="text-sm text-muted-foreground mt-1">
            Across {accounts.length} account{accounts.length !== 1 ? "s" : ""}
          </p>
        </CardContent>
      </Card>

      {/* Accounts List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Your Accounts</h3>
        {accounts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No accounts yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Get started by adding your first account to track your finances.
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Account
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {accounts.map((account) => (
              <Card key={account.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-lg">{account.name}</h4>
                          <Badge variant="secondary" className={getAccountTypeColor(account.type)}>
                            {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{formatNumber(account.balance)}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center md:flex-row md:space-x-2">
                      <Button className="cursor-pointer" variant="outline" size="sm" onClick={() => handleEdit(account)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(account.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
