import { ShieldCheck } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import GetPasswordStrengthIndicator from "./GetPasswordStrengthIndicator"
import { formSchemaChangePassword, type ChangePasswordFormValues } from "@/schemas/schemaChangePassword"
import { PasswordInput } from "./common/PasswordInput"

const DEFAULTS: ChangePasswordFormValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
}

const ChangePassword = () => {

  const {register, handleSubmit, watch, formState: { errors, isSubmitting }} = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(formSchemaChangePassword),
    defaultValues:DEFAULTS,
    mode: "onBlur",
  })


  const hasPasswordChange =
    !!watch("currentPassword") || !!watch("newPassword") || !!watch("confirmPassword")

  const newPassword = watch("newPassword")

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      console.log(data)
      // await changePassword({
      //   currentPassword: data.currentPassword,
      //   newPassword: data.newPassword,
      // })
      // toast("Password changed!",{
      //   description: "Your password has been changed.",
      //   action:{
      //     label: "Undo",
      //     onClick: () => null,
      //   }
      // })
    } catch (error) {
      console.log(error)
      // toast("Password change failed",{
      //   description: error instanceof Error ? error.message : "Please try again.",
      //   action:{
      //     label: "Undo",
      //     onClick: () => null,
      //   }
      // })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="border-muted-foreground/10">
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your password. Leave fields empty to keep your current password.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">

          <PasswordInput
            name="currentPassword"
            label="Current password"
            placeholder="••••••••"
            register={register}
            error={errors.currentPassword}
          />

          <PasswordInput
            name="newPassword"
            label="New password"
            placeholder="At least 8 characters"
            register={register}
            error={errors.newPassword}
          >
            <GetPasswordStrengthIndicator password={newPassword} />
          </PasswordInput>

          <PasswordInput
            name="confirmPassword"
            label="Confirm new password"
            placeholder="Repeat new password"
            register={register}
            error={errors.confirmPassword}
          />

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
    </form>
  )
}

export default ChangePassword