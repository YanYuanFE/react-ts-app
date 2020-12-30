/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from "umi-request";
import { notification } from "antd";

export interface ICommonResponse {
  code: number;
  message: string;
}

/*
  # 返回码
  class CODE(object):
   UNAUTHORIZED = -1   # 未授权
   OK = 0       # OK
   REQUEST_WRONG = 1  # 错误请求，eg.请求缺少参数、参数错误等
   INNER_WRONG = 2   # 内部错误
 */
// const codeMessage = {
//   '-1': '用户没有权限（令牌、用户名、密码错误）.',
//   '0': 'OK.',
//   '1': '错误请求，eg.请求缺少参数、参数错误等.',
//   '2': '服务器内部发生错误，请检查服务器。',
// };
const codeMessage: { [k: number]: string } = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};
/**
 * 异常处理程序
 */

const errorHandler = (error: { response: Response; data: any }): Response => {
  const { response, data } = error;

  if (response && response.status) {
    if (response.status === 401) {
      window.location.href = "/auth/login";
    }
    const errorText = data.message || codeMessage[response.status];
    const { status, url } = response;
    if (url.includes("gw-annotate/v0/data-set/entity-type-tag")) {
      notification.error({
        message: "数据集不存在",
      });
    } else {
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
      });
    }
  } else if (!response) {
    notification.error({
      description: "您的网络发生异常，无法连接服务器!",
      message: "网络异常",
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: "include", // 默认请求是否带上cookie
});

/**
 * 添加请求拦截钩子
 */
request.interceptors.request.use((url, options) => {
  const token = localStorage.getItem("x-token");

  const headers = options.headers || { "X-token": "" };

  if (token) {
    // @ts-ignore
    headers["X-token"] = token;
  }

  return {
    url,
    options: { ...options, headers },
  };
});

request.interceptors.response.use(async (response) => {
  // 拦截返回后的特殊处理
  /*
  '-1': '用户没有权限（令牌、用户名、密码错误）.',
  '0': 'OK.',
  '1': '错误请求，eg.请求缺少参数、参数错误等.',
  '2': '服务器内部发生错误，请检查服务器。',
   */
  // const res = await response.clone().json();
  // console.log(response);
  return response;
});

export default request;
