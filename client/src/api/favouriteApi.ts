import { api } from "./axios";
import type { ApiSuccessResponse } from "../types/auth.types";
import type { Favourite } from "../types/favourite.types";

export type AddFavouriteBody = {
  propertyId: string;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export const favouriteApi = {
  async getMine(page: number = 1, limit: number = 3) {
    const res = await api.get<
      ApiSuccessResponse<Favourite[]> & { pagination: PaginationMeta }
    >("/favourites", {
      params: { page, limit },
    });
    return res.data;
  },
  async add(body: AddFavouriteBody) {
    const res = await api.post<
      ApiSuccessResponse<{
        id: string;
        createdAt: string;
      }>
    >("/favourites", body);
    return res.data;
  },
  async remove(propertyId: string) {
    const res = await api.delete<ApiSuccessResponse<null>>(`/favourites/${propertyId}`);
    return res.data;
  },
};

