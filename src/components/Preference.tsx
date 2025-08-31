import { Moon, Save, Sun } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"
import { Button } from "./ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import z from "zod"
import { useMemo } from "react"
import { formSchemaPreference, type PreferenceFormValues } from "@/schemas/schemaPrefence"
import usePreference from "@/stores/usePreference"
import { useShallow } from "zustand/shallow"

// const schema = z.object({
//   // currency: z.enum(["USD", "EUR", "GBP", "JPY", "BRL", "MXN", "ARS", "CLP", "COP", "INR"]),
//   currency: z.enum(["USD"]),
//   theme: z.enum(["light", "dark", "system"]),
// })

// export type PreferenceFormValues = z.infer<typeof schema>

const DEFAULTS: PreferenceFormValues = {
  currency: "USD",
  theme: "light",
}

const Preference = () => {

  const { theme, currency, setPreference } = usePreference(useShallow((s)=>({
    theme: s.theme,
    currency: s.currency,
    setPreference: s.setPreference
  })));

  const form = useForm<PreferenceFormValues>({
    resolver: zodResolver(formSchemaPreference),
    defaultValues:DEFAULTS,
    mode: "onBlur",
  })

  const hanldeChangeCurrency = (val: PreferenceFormValues["currency"]) => {
    if (!val) return
    form.setValue("currency", val, { shouldDirty: true, shouldValidate: true })
  }

  const handlethemeChange = (val: "light" | "dark") => {
    if (!val) return
    form.setValue("theme", val as "light" | "dark", { shouldDirty: true, shouldValidate: true })
  }

  const currencyPreview = useMemo(() => {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: form.watch("currency") || "USD",
      }).format(3500)
    } catch {
      return "$3,500.00"
    }
  }, [form])

   async function handleSubmit(values: PreferenceFormValues) {
     try {
      setPreference({...values})
      //  console.log(values)
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

  const isSubmitting = form.formState.isSubmitting

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
              // onValueChange={(val) => form.setValue("currency", val, { shouldDirty: true, shouldValidate: true })}
              onValueChange={hanldeChangeCurrency}
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
                // if (!val) return
                // form.setValue("theme", val as "light" | "dark", { shouldDirty: true, shouldValidate: true })
                handlethemeChange(val as "light" | "dark")
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
    </form>
  )
}

export default Preference