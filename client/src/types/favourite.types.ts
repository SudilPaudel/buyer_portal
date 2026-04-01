import type { Property } from "./property.types";

export type Favourite = {
  favouriteId: string;
  property: Pick<Property, "id" | "title" | "location" | "price">;
  addedAt: string;
};

