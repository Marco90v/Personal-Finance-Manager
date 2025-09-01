import { Eye, EyeOff, ShieldCheck } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { useState } from "react"
import { cn } from "@/lib/utils"
import GetPasswordStrengthIndicator from "./GetPasswordStrengthIndicator"

const formSchemaChangePassword = z.object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // el error se asigna al campo confirmPassword
  });

type ChangePasswordFormValues = z.infer<typeof formSchemaChangePassword>

const DEFAULTS: ChangePasswordFormValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}

const ChangePassword = () => {

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(formSchemaChangePassword),
    defaultValues:DEFAULTS,
    mode: "onBlur",
  })

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const isSubmitting = form.formState.isSubmitting

  const hasPasswordChange =
    !!form.watch("currentPassword") || !!form.watch("newPassword") || !!form.watch("confirmPassword")

  const newPassword = form.watch("newPassword")


  return (
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
          <GetPasswordStrengthIndicator password={newPassword} />
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
  )
}

export default ChangePassword