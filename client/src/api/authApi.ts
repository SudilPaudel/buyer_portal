import { api } from "./axios";
import type { ApiSuccessResponse, AuthSuccessData, User } from "../types/auth.types";

export type RegisterBody = {
  name: string;
  email: string;
  password: string;
};

export type LoginBody = {
  email: string;
  password: string;
};

export const authApi = {
  async register(body: RegisterBody) {
    const res = await api.post<ApiSuccessResponse<AuthSuccessData>>("/auth/register", body);
    return res.data;
  },
  async login(body: LoginBody) {
    const res = await api.post<ApiSuccessResponse<AuthSuccessData>>("/auth/login", body);
    return res.data;
  },
  async me() {
    const res = await api.get<ApiSuccessResponse<User>>("/users/me");
    return res.data;
  },
};

