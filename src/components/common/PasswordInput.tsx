// components/PasswordInput.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import type { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Label } from "../ui/label";

type PasswordInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  children?: React.ReactNode;
};

export function PasswordInput<T extends FieldValues>({
  name,
  label,
  placeholder = "Enter your password",
  register,
  error,
  children
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name}>{label}</Label>
      )}
      <div className="relative">
        <Input
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={`bg-white border-border ${
            error ? "border-destructive pr-10" : "pr-10"
          }`}
          {...register(name)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2"
          onClick={() => setShowPassword((s) => !s)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>
      {children}
      {error && (
        <p className="text-xs text-destructive mt-1">{error.message}</p>
      )}
    </div>
  );
}
