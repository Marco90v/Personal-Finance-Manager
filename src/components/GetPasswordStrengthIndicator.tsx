import { Check, X } from "lucide-react"

interface Props {
  password: string
}

const GetPasswordStrengthIndicator = ({password}: Props) => {
  if (password === "" || password === undefined) return null

  const requirements = [
    { test: password.length >= 8, label: "At least 8 characters" },
    { test: /[A-Z]/.test(password), label: "One uppercase letter" },
    { test: /[a-z]/.test(password), label: "One lowercase letter" },
    { test: /[0-9]/.test(password), label: "One number" },
    { test: /[^A-Za-z0-9]/.test(password), label: "One special character" },
  ]

  return (
    <div className="space-y-1 mt-2">
      {requirements.map((req, index) => (
        <div key={index} className="flex items-center text-xs">
          {req.test ? (
            <Check className="h-3 w-3 text-green-500 mr-2" />
          ) : (
            <X className="h-3 w-3 text-muted-foreground mr-2" />
          )}
          <span className={req.test ? "text-green-600" : "text-muted-foreground"}>{req.label}</span>
        </div>
      ))}
    </div>
  )
}

export default GetPasswordStrengthIndicator