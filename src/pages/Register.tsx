import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail } from "lucide-react"
import { useAuthStore } from "@/stores/authStore"
import { registerSchema } from "@/schemas/schemaAuth"
import type { RegisterFormData } from "@/type"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { useShallow } from "zustand/shallow"
import GetPasswordStrengthIndicator from "@/components/GetPasswordStrengthIndicator"
import SeparatorLoginRegister from "@/components/common/SeparatorLoginRegister"


export default function RegisterForm() {

  const navigate = useNavigate();

  const { register: registerUser, socialLogin, isLoading } = useAuthStore(useShallow(s=>({
    register: s.register,
    registerUser: s.register,
    socialLogin: s.socialLogin,
    isLoading: s.isLoading,
  })))

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const { register, handleSubmit, watch, formState: { errors }, reset} = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const password = watch("password")

  const onSwitchToLogin = () => {
    navigate("/login")
    reset()
  }

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

  const handleSocialLogin = async (provider: "google" | "linkedin") => {
    try {
      await socialLogin(provider)
    } catch (error) {
      toast("Social login failed",{
        description: error instanceof Error ? error.message : "Please try again.",
        action:{
          label: "Undo",
          onClick: () => null,
        }
      })
    }
  }

  // const getPasswordStrengthIndicator = (password: string) => {
  //   const requirements = [
  //     { test: password.length >= 8, label: "At least 8 characters" },
  //     { test: /[A-Z]/.test(password), label: "One uppercase letter" },
  //     { test: /[a-z]/.test(password), label: "One lowercase letter" },
  //     { test: /[0-9]/.test(password), label: "One number" },
  //     { test: /[^A-Za-z0-9]/.test(password), label: "One special character" },
  //   ]

  //   return (
  //     <div className="space-y-1 mt-2">
  //       {requirements.map((req, index) => (
  //         <div key={index} className="flex items-center text-xs">
  //           {req.test ? (
  //             <Check className="h-3 w-3 text-green-500 mr-2" />
  //           ) : (
  //             <X className="h-3 w-3 text-muted-foreground mr-2" />
  //           )}
  //           <span className={req.test ? "text-green-600" : "text-muted-foreground"}>{req.label}</span>
  //         </div>
  //       ))}
  //     </div>
  //   )
  // }

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
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  {...register("lastName")}
                  className={errors.lastName ? "border-destructive" : ""}
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
                className={errors.email ? "border-destructive" : ""}
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
                  className={errors.password ? "border-destructive pr-10" : "pr-10"}
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
                  className={errors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
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

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => handleSocialLogin("google")} disabled={isLoading} className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Gmail
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin("linkedin")}
              disabled={isLoading}
              className="w-full"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </Button>
          </div>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Button variant="link" className="p-0 h-auto font-normal cursor-pointer" onClick={onSwitchToLogin}>
              Sign in
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
