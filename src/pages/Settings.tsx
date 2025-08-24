import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Sun, Moon, Eye, EyeOff, RefreshCw, ShieldCheck, Save } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
// import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const schema = z.object({
  currency: z.string().min(1, "Select a currency"),
  theme: z.enum(["light", "dark"]),
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().optional(),
}).refine(
  (vals) => {
    // If user is changing password, require current and confirming match
    const changing = !!vals.newPassword || !!vals.confirmPassword || !!vals.currentPassword
    if (!changing) return true
    if (!vals.currentPassword) return false
    if (!vals.newPassword) return false
    if (vals.newPassword !== vals.confirmPassword) return false
    return true
  },
  {
    message: "To change your password, fill current password and ensure new passwords match.",
    path: ["confirmPassword"],
  }
)

export type ConfigurationFormValues = z.infer<typeof schema>

export type ConfigurationProps = {
  defaultValues?: Partial<ConfigurationFormValues>
  onSubmit?: (values: ConfigurationFormValues) => Promise<void> | void
  onResetData?: () => Promise<void> | void
  className?: string
}

const DEFAULTS: ConfigurationFormValues = {
  currency: "USD",
  theme: "light",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}

/**
 * Configuration component for a personal finance app:
 * - Currency selection
 * - Light/Dark theme toggle
 * - Password change
 * - Reset local/testing data (confirm dialog)
 *
 * Style matches clean card-based aesthetic similar to modern dashboards.
 */
export default function Configuration({ defaultValues, onSubmit, onResetData, className }: ConfigurationProps) {
  const mergedDefaults = { ...DEFAULTS, ...defaultValues }
  // const { toast } = useToast()
  const form = useForm<ConfigurationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: mergedDefaults,
    mode: "onBlur",
  })

  const [showCurrent, setShowCurrent] = React.useState(false)
  const [showNew, setShowNew] = React.useState(false)
  const [showConfirm, setShowConfirm] = React.useState(false)

  async function handleSubmit(values: ConfigurationFormValues) {
    try {
      if (onSubmit) {
        await onSubmit(values)
      }
      // toast({ title: "Settings saved", description: "Your configuration has been updated." })
    } catch (e) {
      console.log(e)
      // toast({
      //   title: "Save failed",
      //   description: "There was an issue saving your settings. Please try again.",
      //   variant: "destructive",
      // })
    }
  }

  async function handleReset() {
    try {
      if (onResetData) {
        await onResetData()
      }
      // toast({
      //   title: "Data reset",
      //   description: "Local/testing data has been reset.",
      // })
    } catch (e) {
      console.log(e)

      // toast({
      //   title: "Reset failed",
      //   description: "Could not reset test data. Try again.",
      //   variant: "destructive",
      // })
    }
  }

  const currencyPreview = React.useMemo(() => {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: form.watch("currency") || "USD",
      }).format(3500)
    } catch {
      return "$3,500.00"
    }
  }, [form])

  const isSubmitting = form.formState.isSubmitting
  const hasPasswordChange =
    !!form.watch("currentPassword") || !!form.watch("newPassword") || !!form.watch("confirmPassword")

  return (
    <section className={cn("mx-auto w-full max-w-4xl space-y-6 p-2 md:p-4", className)} aria-label="Configuration">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Configuration</h1>
          <p className="text-sm text-muted-foreground">Update preferences and manage your local data.</p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="gap-2 cursor-pointer"
          onClick={() => form.reset(mergedDefaults)}
        >
          <RefreshCw className="h-4 w-4" />
          Reset form
        </Button>
      </header>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Preferences */}
        <Card className="border-muted-foreground/10">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Choose your currency and appearance.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            {/* Currency */}
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={form.watch("currency")}
                onValueChange={(val) => form.setValue("currency", val, { shouldDirty: true, shouldValidate: true })}
              >
                <SelectTrigger id="currency" disabled={true} className="bg-white border-border">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD — United States Dollar</SelectItem>
                  <SelectItem value="EUR">EUR — Euro</SelectItem>
                  <SelectItem value="GBP">GBP — British Pound</SelectItem>
                  <SelectItem value="JPY">JPY — Japanese Yen</SelectItem>
                  <SelectItem value="BRL">BRL — Brazilian Real</SelectItem>
                  <SelectItem value="MXN">MXN — Mexican Peso</SelectItem>
                  <SelectItem value="ARS">ARS — Argentine Peso</SelectItem>
                  <SelectItem value="CLP">CLP — Chilean Peso</SelectItem>
                  <SelectItem value="COP">COP — Colombian Peso</SelectItem>
                  <SelectItem value="INR">INR — Indian Rupee</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Preview: {currencyPreview}</p>
              {form.formState.errors.currency && (
                <p className="text-xs text-destructive">{form.formState.errors.currency.message}</p>
              )}
            </div>

            {/* Theme */}
            <div className="space-y-2">
              <Label>Theme</Label>
              <ToggleGroup
                type="single"
                value={form.watch("theme")}
                onValueChange={(val) => {
                  if (!val) return
                  form.setValue("theme", val as "light" | "dark", { shouldDirty: true, shouldValidate: true })
                }}
                className="w-fit rounded-md border bg-background p-1"
              >
                <ToggleGroupItem value="light" aria-label="Light" className="gap-2 cursor-pointer">
                  <Sun className="h-4 w-4" />
                  <span className="hidden sm:inline">Light</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="dark" aria-label="Dark" className="gap-2 cursor-pointer">
                  <Moon className="h-4 w-4" />
                  <span className="hidden sm:inline">Dark</span>
                </ToggleGroupItem>
              </ToggleGroup>
              <p className="text-xs text-muted-foreground">Switch between light and dark modes.</p>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit" className="gap-2 cursor-pointer" disabled={isSubmitting}>
              <Save className="h-4 w-4" />
              Save preferences
            </Button>
          </CardFooter>
        </Card>

        {/* Password */}
        <Card className="border-muted-foreground/10">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password. Leave fields empty to keep your current password.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current password</Label>
              <div className="relative">
                <Input
                  className="bg-white border-border"
                  id="currentPassword"
                  type={showCurrent ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...form.register("currentPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => setShowCurrent((s) => !s)}
                  aria-label={showCurrent ? "Hide current password" : "Show current password"}
                >
                  {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New password</Label>
              <div className="relative">
                <Input
                  className="bg-white border-border"
                  id="newPassword"
                  type={showNew ? "text" : "password"}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  {...form.register("newPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => setShowNew((s) => !s)}
                  aria-label={showNew ? "Hide new password" : "Show new password"}
                >
                  {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {form.formState.errors.newPassword && (
                <p className="text-xs text-destructive">{form.formState.errors.newPassword.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm new password</Label>
              <div className="relative">
                <Input
                  className="bg-white border-border"
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat new password"
                  autoComplete="new-password"
                  {...form.register("confirmPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => setShowConfirm((s) => !s)}
                  aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {form.formState.errors.confirmPassword && (
                <p className="text-xs text-destructive">{form.formState.errors.confirmPassword.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="justify-between flex-col gap-3 sm:flex-row sm:gap-0">
            <p className={cn("text-xs text-muted-foreground", !hasPasswordChange && "opacity-70")}>
              Tip: Use a strong passphrase with numbers and symbols.
            </p>
            <Button type="submit" className="gap-2 cursor-pointer" disabled={isSubmitting || !hasPasswordChange}>
              <ShieldCheck className="h-4 w-4" />
              Update password
            </Button>
          </CardFooter>
        </Card>

        {/* Danger zone */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle>Danger zone</CardTitle>
            <CardDescription>Reset local/testing data. This action cannot be undone.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border bg-muted/20 p-3 text-sm text-muted-foreground">
              This will clear local app data used for development or testing on this device only.
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive" className="gap-2 cursor-pointer">
                  <RefreshCw className="h-4 w-4" />
                  Reset data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset all local/testing data?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove transactions, accounts, and preferences stored locally. You can’t undo this action.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Separator />
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => {
                      await handleReset()
                    }}
                  >
                    Confirm reset
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </form>
    </section>
  )
}
