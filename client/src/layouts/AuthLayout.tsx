import { Outlet } from "react-router-dom";
import { Container } from "../components/ui/Container";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Container className="py-0">
        <div className="mx-auto grid max-w-4xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl lg:grid-cols-2">
          <div className="hidden lg:block p-10 bg-slate-50 text-slate-900 relative border-r border-slate-200/60">
            <div className="relative">
              <div className="h-11 w-11 rounded-2xl bg-indigo-600/10 border border-indigo-200/60" />
              <h1 className="mt-8 text-2xl font-semibold leading-tight text-slate-900">
                Welcome back to your home search.
              </h1>
              <p className="mt-3 text-sm text-slate-600">
                Access your saved properties, explore new listings, and manage your personal shortlist with ease.
              </p>
              <div className="mt-8 grid gap-3">
                {[
                  "Private & secure access",
                  "Your saved properties",
                  "Seamless browsing experience",
                ].map((t) => (
                  <div
                    key={t}
                    className="rounded-2xl border border-indigo-200/40 bg-indigo-50/40 px-4 py-3 text-sm text-slate-700 backdrop-blur-sm"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-8 sm:p-10">
            <Outlet />
          </div>
        </div>
      </Container>
    </div>
  );
}

