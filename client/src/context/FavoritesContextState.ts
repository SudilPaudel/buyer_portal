import { createContext } from "react";

export interface FavoritesContextValue {
  count: number;
  setCount: (count: number) => void;
  incrementCount: () => void;
  decrementCount: () => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);
