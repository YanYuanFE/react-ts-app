import { post, ICommonResponse } from "./request";
import { LoginParams, RegisterParams } from "@/pages/auth/data";

interface LoginResponse extends ICommonResponse {
  data: {
    access_token: string;
  };
}

export async function login(params: LoginParams) {
  return post<LoginResponse>("/api/user/v0/login/", params);
}

export async function register(params: RegisterParams) {
  return post("/api/user/v0/create/", params);
}

export interface IResetPasswordBody {
  phone: string;
  old_password: string;
  new_password: string;
}

export async function resetPassword(params: IResetPasswordBody) {
  return post("/api/user/v0/password/reset/", params);
}
