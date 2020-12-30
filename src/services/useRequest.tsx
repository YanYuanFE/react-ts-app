import { BaseOptions, BaseResult, CombineService } from "@ahooksjs/use-request/es/types";
import { useRequest as useHookRequest } from "ahooks";

type ResultWithData<T = any> = { data?: T; [key: string]: any };

export function useRequest<R extends ResultWithData = any, P extends any[] = any>(
  service: CombineService<R, P>,
  options?: BaseOptions<R["data"], P>,
): BaseResult<R["data"], P> {
  return useHookRequest(service, {
    formatResult: (result) => result?.data,
    ...options,
  });
}
