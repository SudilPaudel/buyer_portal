import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { AppRouter } from "./routes/AppRouter";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              borderRadius: "14px",
              background: "rgba(255,255,255,0.92)",
              color: "#0f172a",
              border: "1px solid rgba(226,232,240,0.8)",
              boxShadow: "0 18px 45px rgba(2,6,23,0.12)",
              backdropFilter: "blur(12px)",
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}
