// import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { RefreshCw } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
// import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import Preference from "@/components/Preference"
import ChangePassword from "@/components/ChangePassword"

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

  // const [showCurrent, setShowCurrent] = React.useState(false)
  // const [showNew, setShowNew] = React.useState(false)
  // const [showConfirm, setShowConfirm] = React.useState(false)

  async function handleSubmit(values: ConfigurationFormValues) {
    // console.log(values)
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

  // const currencyPreview = React.useMemo(() => {
  //   try {
  //     return new Intl.NumberFormat(undefined, {
  //       style: "currency",
  //       currency: form.watch("currency") || "USD",
  //     }).format(3500)
  //   } catch {
  //     return "$3,500.00"
  //   }
  // }, [form])

  // const isSubmitting = form.formState.isSubmitting
  // const hasPasswordChange =
  //   !!form.watch("currentPassword") || !!form.watch("newPassword") || !!form.watch("confirmPassword")

  return (
    <section className={cn("mx-auto w-full max-w-4xl space-y-6 p-2 md:p-4", className)} aria-label="Configuration">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Configuration</h1>
          <p className="text-sm text-muted-foreground">Update preferences and manage your local data.</p>
        </div>
        {/* <Button
          type="button"
          variant="outline"
          className="gap-2 cursor-pointer"
          onClick={() => form.reset(mergedDefaults)}
        >
          <RefreshCw className="h-4 w-4" />
          Reset form
        </Button> */}
      </header>

      {/* Preferences */}
      <Preference />

      {/* Password */}
      <ChangePassword />

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">

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
