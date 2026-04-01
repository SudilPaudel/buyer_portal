import { api } from "./axios";
import type { ApiSuccessResponse } from "../types/auth.types";
import type { Property } from "../types/property.types";

export const propertyApi = {
  async getAll() {
    const res = await api.get<ApiSuccessResponse<Property[]>>("/properties");
    return res.data;
  },
  async getById(propertyId: string) {
    const res = await api.get<ApiSuccessResponse<Property>>(`/properties/${propertyId}`);
    return res.data;
  },
};

