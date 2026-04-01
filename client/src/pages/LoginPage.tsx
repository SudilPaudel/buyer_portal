import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useAuth } from "../hooks/useAuth";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function LoginPage() {
  const { login, status } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";
  const hasCheckedInitial = useRef(false);

  useEffect(() => {
    if (!hasCheckedInitial.current) {
      hasCheckedInitial.current = true;
      if (status === "authenticated") {
        toast.success("You are already logged in");
        navigate("/", { replace: true });
      }
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!email) e.email = "Email is required";
    else if (!isEmail(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    return e;
  }, [email, password]);

  const canSubmit = Object.keys(errors).length === 0 && !submitting;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
      <p className="mt-2 text-sm text-slate-500">
        Sign in to access your saved properties and continue exploring.
      </p>

      <form
        className="mt-8 grid gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!canSubmit) return;
          setSubmitting(true);
          try {
            await login({ email: email.trim(), password });
            navigate(from, { replace: true });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={email && errors.email ? errors.email : undefined}
          placeholder="sudil@example.com"
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={password && errors.password ? errors.password : undefined}
          placeholder="••••••••"
        />
        <Button type="submit" size="lg" disabled={!canSubmit || status === "checking"}>
          {submitting ? "Logging in…" : "Login"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-slate-600">
        Don’t have an account?{" "}
        <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
          Register
        </Link>
      </p>
    </div>
  );
}

