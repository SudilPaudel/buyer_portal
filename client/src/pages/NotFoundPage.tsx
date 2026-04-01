import { Link } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <Container className="py-16">
      <div className="rounded-3xl border border-slate-200/60 bg-white shadow-xl p-10 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-2 text-sm text-slate-500">
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/">
            <Button variant="secondary">Go home</Button>
          </Link>
          <Link to="/dashboard">
            <Button>Go to dashboard</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

