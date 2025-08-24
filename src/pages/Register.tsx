import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import { useAuthStore } from "@/stores/authStore"
import { registerSchema } from "@/schemas/schemaAuth"
import type { RegisterFormData } from "@/type"
import { toast } from "sonner"
import { useShallow } from "zustand/shallow"
import GetPasswordStrengthIndicator from "@/components/GetPasswordStrengthIndicator"
import SeparatorLoginRegister from "@/components/common/SeparatorLoginRegister"
import SocialLoginRegister from "@/components/common/SocialLoginRegister"
import SwitchLoginRegister from "@/components/common/SwitchLoginRegister"


export default function RegisterForm() {

  const { register: registerUser, isLoading } = useAuthStore(useShallow(s=>({
    register: s.register,
    registerUser: s.register,
    isLoading: s.isLoading,
  })))

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const password = watch("password")

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      })
      toast("Account created!",{
        description: "Welcome to FinanTrack. You can now start managing your finances.",
        action:{
          label: "Undo",
          onClick: () => null,
        }
      })
    } catch (error) {
      toast("Registration failed",{
        description: error instanceof Error ? error.message : "Please try again.",
        action:{
          label: "Undo",
          onClick: () => null,
        }
      })
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">Create account</CardTitle>
          <CardDescription>Join FinanTrack to start managing your personal finances</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  {...register("firstName")}
                  // className={errors.firstName ? "border-destructive" : ""}
                  className={`bg-white border-border ${errors.lastName ? "border-destructive" : ""}`}
                />
                {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  {...register("lastName")}
                  // className={errors.lastName ? "border-destructive" : ""}
                  className={`bg-white border-border ${errors.lastName ? "border-destructive" : ""}`}
                />
                {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                // className={errors.email ? "border-destructive" : ""}
                className={`bg-white border-border ${errors.lastName ? "border-destructive" : ""}`}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  {...register("password")}
                  // className={errors.password ? "border-destructive pr-10" : "pr-10"}
                  className={`bg-white border-border ${errors.password ? "border-destructive pr-10" : "pr-10"}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {/* {password && getPasswordStrengthIndicator(password)} */}
              <GetPasswordStrengthIndicator password={password} />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                  // className={errors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
                  className={`bg-white border-border ${errors.confirmPassword ? "border-destructive pr-10" : "pr-10"}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <SeparatorLoginRegister />

          <SocialLoginRegister />

          <SwitchLoginRegister />
        </CardContent>
      </Card>
    </div>
  )
}
