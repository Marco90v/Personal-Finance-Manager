// components/InputField.tsx
// import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
};

export function InputField<T extends FieldValues>({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  register,
  error,
}: InputFieldProps<T>) {
  return (
    <div className="space-y-2">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`bg-white border-border ${
          error ? "border-destructive" : ""
        }`}
        {...register(name)}
      />
      {error && <p className="text-sm text-destructive">{error.message}</p>}
    </div>
  );
}
