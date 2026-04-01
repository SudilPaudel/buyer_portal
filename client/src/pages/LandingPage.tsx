import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { SectionTitle } from "../components/ui/SectionTitle";
import { useAuth } from "../hooks/useAuth";

export function LandingPage() {
  const { status } = useAuth();
  const isAuthenticated = status === "authenticated";
  const startLink = isAuthenticated ? "/dashboard" : "/register";
  const signinLink = isAuthenticated ? "/dashboard" : "/login";

  return (
    <div>
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-3 py-1 text-xs text-slate-600 shadow-sm"
            >
              Premium real-estate portal
            </motion.div>

            <h1 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
              Find Properties,{" "}
              <span className="text-indigo-600">effortlessly.</span>
            </h1>
            <p className="mt-4 text-base text-slate-500">
              A calm buyer portal designed for modern brokers. Browse listings, save what you love,
              and revisit your shortlist anytime.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg">Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to={startLink}>
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Link to={signinLink}>
                    <Button size="lg" variant="secondary">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                {  value: "Secure account access" },
                {  value: "Your saved properties" },
                {  value: "Fast and seamless experience" },
              ].map((i) => (
                <div
                  key={i.value}
                  className="rounded-2xl border border-slate-200/60 bg-white shadow-sm p-4"
                >

                  <div className="mt-1 text-sm font-semibold text-slate-900">{i.value}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[2.5rem] from-indigo-500/15 via-transparent to-slate-950/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-xl">
              <div className=" bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80"
                  alt="Premium property"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Modern Apartment</div>
                    <div className="mt-1 text-sm text-slate-500">Kathmandu • Featured</div>
                  </div>
                  <div className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                    Premium
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {["Glass navbar", "Soft depth", "Calm motion"].map((t) => (
                    <div
                      key={t}
                      className="rounded-2xl border border-slate-200/60 bg-slate-50 p-3 text-xs text-slate-600"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      <section className="bg-slate-50 border-y border-slate-200/60">
        <Container className="py-14">
          <SectionTitle
            eyebrow="Featured"
            title="Properties worth your attention."
            subtitle="Discover properties that match your lifestyle."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Safe & Secure Access",
                desc: "Your account is protected so your preferences and saved homes stay private.",
              },
              {
                title: "Your Personal Shortlist",
                desc: "Save properties you love and revisit them anytime, anywhere.",
              },
              {
                title: "Smooth Browsing Experience",
                desc: "Enjoy fast loading, clean layouts, and a distraction-free interface.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-slate-200/60 bg-white shadow-lg p-6"
              >
                <div className="mt-4 text-base font-semibold text-slate-900">{c.title}</div>
                <div className="mt-2 text-sm text-slate-500">{c.desc}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <div className="rounded-3xl border border-slate-200/60 bg-slate-950 text-white shadow-xl overflow-hidden">
          <div className="p-10 sm:p-12 relative">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(900px_400px_at_20%_20%,rgba(99,102,241,0.9),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Start discovering properties you’ll truly love.
              </h2>
              <p className="mt-2 text-sm text-white/70 max-w-2xl">
                Browse beautiful properties, save your favourites, and come back anytime.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link to="/register">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="secondary">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

