import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail } from "lucide-react"
import { loginSchema } from "@/schemas/schemaAuth"
import type { LoginFormData } from "@/type"
import { useAuthStore } from "@/stores/authStore"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { useShallow } from "zustand/shallow"
import SeparatorLoginRegister from "@/components/common/SeparatorLoginRegister"

export default function LoginForm() {

  const navigate = useNavigate();

  const { login, socialLogin, isLoading } = useAuthStore(useShallow(s=>({
    login: s.login,
    socialLogin: s.socialLogin,
    isLoading: s.isLoading,
  })))

  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset} = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSwitchToRegister = () => {
    navigate("/register")
    reset()
  }

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password)
      toast("Welcome back!",{
        description: "You have successfully logged in.",
        action:{
          label: "Undo",
          onClick: () => null,
        }
      })
    } catch (error) {
      toast("Login failed",{
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

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
          <CardDescription>Sign in to your FinanTrack account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
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
                  placeholder="Enter your password"
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
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
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
            <span className="text-muted-foreground">Don't have an account? </span>
            <Button variant="link" className="p-0 h-auto font-normal cursor-pointer" onClick={onSwitchToRegister}>
              Sign up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
