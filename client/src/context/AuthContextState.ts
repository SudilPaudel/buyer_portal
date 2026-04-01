import { createContext } from "react";
import type { User } from "../types/auth.types";
import type { LoginBody, RegisterBody } from "../api/authApi";

export type AuthStatus = "checking" | "authenticated" | "anonymous";

export type AuthContextValue = {
  status: AuthStatus;
  user: User | null;
  token: string | null;
  login: (body: LoginBody) => Promise<void>;
  register: (body: RegisterBody) => Promise<void>;
  logout: () => void;
  refreshMe: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

