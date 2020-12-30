import { request, ICommonResponse } from "./request";
import { LoginParams, RegisterParams } from "@/pages/auth/data";

interface LoginResponse extends ICommonResponse {
  data: {
    access_token: string;
  };
}

export async function login(params: LoginParams): Promise<LoginResponse> {
  return request("/api/user/v0/login/", {
    method: "POST",
    data: params,
  });
  // const loginRes = await response;
  // if (loginRes.code === 0) {
  //   localStorage.setItem("x-token", loginRes.data.access_token);
  // } else {
  //   notification.error({
  //     message: loginRes.message,
  //   });
  //   return {
  //     ...loginRes,
  //     currentAuthority: [],
  //   };
  // }
  // // const access_token = login_info.data.access_token
  //
  // const authorityRes = await request("/api/user/v0/info/query/");
  // // let character = JSON.parse(await authority_res).data.permission;
  // let currentAuthority = [];
  // if (authorityRes.code === 0) {
  //   currentAuthority = authorityRes.data.character;
  // }
  // return {
  //   ...loginRes,
  //   currentAuthority,
  // };
}

export async function register(params: RegisterParams) {
  return request("/api/user/v0/create/", {
    method: "POST",
    data: params,
  });
}

export interface IResetPasswordBody {
  phone: string;
  old_password: string;
  new_password: string;
}

export async function resetPassword(params: IResetPasswordBody) {
  return request("/api/user/v0/password/reset/", {
    method: "POST",
    data: params,
  });
}
