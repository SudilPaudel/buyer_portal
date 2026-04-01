export type Role = "buyer" | string;

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type AuthSuccessData = {
  user: User;
  token: string;
};

export type ApiSuccessResponse<T> = {
  success: true;
  message?: string;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: Record<string, string[] | string>;
};

