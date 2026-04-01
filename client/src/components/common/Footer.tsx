import { Container } from "../ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-slate-50">
      <Container className="py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">Real Estate Portal</div>
            <div className="text-xs text-slate-500">Discover · Save · Decide with confidence</div>
          </div>
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} Real Estate Portal. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}

