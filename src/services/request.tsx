import axios, { AxiosRequestConfig, Method } from "axios";
import { history } from "../store";

export interface ICommonResponse {
  code: number;
  message: string;
}

axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

axios.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    const { authorization } = response.headers;
    authorization && localStorage.setItem("nvwaToken", authorization);
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      history.push("/user/login");
    }
    return Promise.reject(error);
  },
);

export const request = (url: string, data: any, method: Method) => {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      data,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const post = (url: string, data: any) => {
  return request(url, data, "post");
};

export const put = (url: string, data: any) => {
  return request(url, data, "put");
};

export const get = (url: string, data?: any) => {
  return request(url, data, "get");
};
