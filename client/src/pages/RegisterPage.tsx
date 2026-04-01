import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useAuth } from "../hooks/useAuth";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function RegisterPage() {
  const { register, status } = useAuth();
  const navigate = useNavigate();
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email) e.email = "Email is required";
    else if (!isEmail(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Use at least 6 characters";
    if (!confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (confirmPassword !== password) e.confirmPassword = "Passwords do not match";
    return e;
  }, [name, email, password, confirmPassword]);

  const canSubmit = Object.keys(errors).length === 0 && !submitting;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Create your account</h1>
      <p className="mt-2 text-sm text-slate-500">
        Register to start saving properties to your favourites.
      </p>

      <form
        className="mt-8 grid gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!canSubmit) return;
          setSubmitting(true);
          try {
            await register({ name: name.trim(), email: email.trim(), password });
            navigate("/dashboard", { replace: true });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Input
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={name && errors.name ? errors.name : undefined}
          placeholder="Sudil Paudel"
          autoComplete="name"
        />
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
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={password && errors.password ? errors.password : undefined}
          placeholder="••••••••"
        />
        <Input
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
          placeholder="••••••••"
        />

        <Button type="submit" size="lg" disabled={!canSubmit}>
          {submitting ? "Creating…" : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          Login
        </Link>
      </p>
    </div>
  );
}

