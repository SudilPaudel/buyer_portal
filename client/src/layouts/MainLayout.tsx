import { Outlet } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";

export function MainLayout() {
  return (
    <div className="min-h-screen app-bg">
      <Navbar />
      <main className="min-h-[calc(100vh-56px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

