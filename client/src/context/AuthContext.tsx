import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { authApi, type LoginBody, type RegisterBody } from "../api/authApi";
import type { User } from "../types/auth.types";
import { storage } from "../utils/storage";
import { AuthContext, type AuthContextValue, type AuthStatus } from "./AuthContextState";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("checking");
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => storage.getToken());

  const setAuth = useCallback((next: { user: User; token: string }) => {
    setUser(next.user);
    setToken(next.token);
    storage.setToken(next.token);
    setStatus("authenticated");
  }, []);

  const clearAuth = useCallback(() => {
    setUser(null);
    setToken(null);
    storage.clearToken();
    setStatus("anonymous");
  }, []);

  const refreshMe = useCallback(async () => {
    const localToken = storage.getToken();
    if (!localToken) {
      clearAuth();
      return;
    }
    setStatus("checking");
    try {
      const res = await authApi.me();
      setUser(res.data);
      setToken(localToken);
      setStatus("authenticated");
    } catch {
      clearAuth();
    }
  }, [clearAuth]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refreshMe();
  }, [refreshMe]);

  const login = useCallback(
    async (body: LoginBody) => {
      try {
        const res = await authApi.login(body);
        setAuth({ user: res.data.user, token: res.data.token });
        toast.success(res.message ?? "Login successful");
      } catch (err) {
        clearAuth();
        if (axios.isAxiosError(err)) {
          const msg = (err.response?.data as { message?: string } | undefined)?.message;
          toast.error(msg ?? "Login failed. Please check your credentials.");
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
        throw err;
      }
    },
    [clearAuth, setAuth],
  );

  const register = useCallback(
    async (body: RegisterBody) => {
      try {
        const res = await authApi.register(body);
        setAuth({ user: res.data.user, token: res.data.token });
        toast.success(res.message ?? "Account created");
      } catch (err) {
        clearAuth();
        if (axios.isAxiosError(err)) {
          const msg = (err.response?.data as { message?: string } | undefined)?.message;
          toast.error(msg ?? "Registration failed. Please try again.");
        } else {
          toast.error("Registration failed. Please try again.");
        }
        throw err;
      }
    },
    [clearAuth, setAuth],
  );

  const logout = useCallback(() => {
    clearAuth();
    toast.success("Logged out");
  }, [clearAuth]);

  const value = useMemo<AuthContextValue>(
    () => ({ status, user, token, login, register, logout, refreshMe }),
    [status, user, token, login, register, logout, refreshMe],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

