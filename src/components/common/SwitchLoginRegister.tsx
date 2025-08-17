import { useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

type AuthPath = "/login" | "/register";

interface Copy {
  text: string;
  button: string;
}

const copyMap: Record<AuthPath, Copy> = {
  "/login": { text: "Don't have an account? ", button: "Sign up" },
  "/register": { text: "Already have an account? ", button: "Sign in" },
};

// Type guard para asegurar que la ruta es de auth
const isAuthPath = (p: string): p is AuthPath => p === "/login" || p === "/register";

const SwitchLoginRegister = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Si no estamos en /login o /register, no renderizamos nada (evita errores)
  if (!isAuthPath(pathname)) return null;

  const target: AuthPath = pathname === "/login" ? "/register" : "/login";
  const copy = copyMap[pathname];

  const onSwitch = () => navigate(target);

  return (
    <div className="text-center text-sm">
      <span className="text-muted-foreground">{copy.text}</span>
      <Button
        variant="link"
        className="p-0 h-auto font-normal cursor-pointer"
        onClick={onSwitch}
      >
        {copy.button}
      </Button>
    </div>
  );
};

export default SwitchLoginRegister;
