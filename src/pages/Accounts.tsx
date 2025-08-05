import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Plus, Edit, Trash2, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Types
interface Account {
  id: string
  name: string
  balance: number
  type: "bank" | "cash" | "investment" | "other"
}

// Form schema
const accountSchema = z.object({
  name: z.string().min(1, "Account name is required").max(50, "Account name must be less than 50 characters"),
  initialBalance: z.string().refine((val) => !isNaN(Number(val)), "Must be a valid number"),
})

type AccountFormData = z.infer<typeof accountSchema>

// Mock data - replace with your actual data source
const initialAccounts: Account[] = [
  { id: "1", name: "Chase Checking", balance: 2500.0, type: "bank" },
  { id: "2", name: "Savings Account", balance: 15000.0, type: "bank" },
  { id: "3", name: "Cash Wallet", balance: 150.0, type: "cash" },
  { id: "4", name: "Investment Portfolio", balance: 8500.0, type: "investment" },
]

export default function AccountsManager() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)

  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      initialBalance: "",
    },
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getAccountTypeColor = (type: Account["type"]) => {
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

  const onSubmit = (data: AccountFormData) => {
    const newAccount: Account = {
      id: Date.now().toString(),
      name: data.name,
      balance: Number.parseFloat(data.initialBalance),
      type: "other", // You can add logic to determine type based on name or add a type field
    }

    if (editingAccount) {
      setAccounts(
        accounts.map((acc) =>
          acc.id === editingAccount.id
            ? { ...acc, name: data.name, balance: Number.parseFloat(data.initialBalance) }
            : acc,
        ),
      )
      setEditingAccount(null)
    } else {
      setAccounts([...accounts, newAccount])
    }

    form.reset()
    setIsAddDialogOpen(false)
  }

  const handleEdit = (account: Account) => {
    setEditingAccount(account)
    form.setValue("name", account.name)
    form.setValue("initialBalance", account.balance.toString())
    setIsAddDialogOpen(true)
  }

  const handleDelete = (accountId: string) => {
    setAccounts(accounts.filter((acc) => acc.id !== accountId))
  }

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

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
                  name="initialBalance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{editingAccount ? "Current Balance" : "Initial Balance"}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="0.00" className="pl-9" type="number" step="0.01" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
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
                  <Button type="submit">{editingAccount ? "Update Account" : "Add Account"}</Button>
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
          <div className="text-3xl font-bold text-green-600">{formatCurrency(totalBalance)}</div>
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
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(account.balance)}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center md:flex-row md:space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(account)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(account.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
