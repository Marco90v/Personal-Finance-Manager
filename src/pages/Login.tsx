import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import { loginSchema } from "@/schemas/schemaAuth"
import type { LoginFormData } from "@/type"
import { useAuthStore } from "@/stores/authStore"
import { toast } from "sonner"
import { useShallow } from "zustand/shallow"
import SeparatorLoginRegister from "@/components/common/SeparatorLoginRegister"
import SocialLoginRegister from "@/components/common/SocialLoginRegister"
import SwitchLoginRegister from "@/components/common/SwitchLoginRegister"

export default function LoginForm() {

  const { login, isLoading } = useAuthStore(useShallow(s=>({
    login: s.login,
    isLoading: s.isLoading,
  })))

  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

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
                // className={errors.email ? "border-destructive" : ""}
                className={`bg-white ${errors.email ? "border-destructive" : ""}`}
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
                  // className={errors.password ? "border-destructive pr-10" : "pr-10"}
                  className={`bg-white ${errors.password ? "border-destructive pr-10" : "pr-10"}`}
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

          <SocialLoginRegister />

          <SwitchLoginRegister />
        </CardContent>
      </Card>
    </div>
  )
}
