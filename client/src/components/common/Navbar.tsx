import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiHeart, FiLogOut, FiUser } from "react-icons/fi";
import { cn } from "../../utils/cn";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "text-sm font-medium transition px-3 py-2 rounded-xl",
          isActive ? "text-slate-900 bg-slate-100/70" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60",
        )
      }
    >
      {children}
    </NavLink>
  );
}

export function Navbar() {
  const { status, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
      <Container className="py-3">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-slate-950 shadow-sm" />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900">Real Estate Portal</div>
              <div className="text-xs text-slate-500">Favourites</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavItem to="/">Home</NavItem>
            {status === "authenticated" ? (
              <>
                <NavItem to="/dashboard">Dashboard</NavItem>
                <NavItem to="/favourites">Favourites</NavItem>
              </>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            {status === "authenticated" ? (
              <>
                <button
                  className="h-10 w-10 grid place-items-center rounded-xl border border-slate-200/60 bg-white shadow-sm hover:bg-slate-50 focus-ring"
                  onClick={() => navigate("/favourites")}
                  aria-label="Favourites"
                >
                  <FiHeart className="text-slate-700" />
                </button>
                <div className="hidden sm:flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white px-3 h-10 shadow-sm">
                  <FiUser className="text-slate-600" />
                  <span className="text-sm text-slate-700">{user?.name}</span>
                </div>
                <Button variant="secondary" onClick={logout}>
                  <FiLogOut />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button onClick={() => navigate("/register")}>Create account</Button>
              </>
            )}
          </div>
        </div>
        <div className="mt-3 flex md:hidden items-center gap-1">
          <NavItem to="/">Home</NavItem>
          {status === "authenticated" ? (
            <>
              <NavItem to="/dashboard">Dashboard</NavItem>
              <NavItem to="/favourites">Favourites</NavItem>
            </>
          ) : (
            <>
              <NavItem to="/login">Login</NavItem>
              <NavItem to="/register">Register</NavItem>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

