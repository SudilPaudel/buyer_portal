import { useCallback, useEffect, useMemo, useState } from "react";
import { favouriteApi } from "../api/favouriteApi";
import { FavoritesContext, type FavoritesContextValue } from "./FavoritesContextState";
import { useAuth } from "../hooks/useAuth";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const { status } = useAuth();

  const incrementCount = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const decrementCount = useCallback(() => {
    setCount((prev) => Math.max(0, prev - 1));
  }, []);

  // Fetch initial count when user logs in
  useEffect(() => {
    if (status === "authenticated") {
      const fetchCount = async () => {
        try {
          const response = await favouriteApi.getMine(1, 1);
          setCount(response.pagination?.total || 0);
        } catch {
          setCount(0);
        }
      };
      fetchCount();
    } else {
      setCount(0);
    }
  }, [status]);

  const value = useMemo<FavoritesContextValue>(
    () => ({ count, setCount, incrementCount, decrementCount }),
    [count, incrementCount, decrementCount],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
