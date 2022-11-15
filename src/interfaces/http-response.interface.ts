export interface IHttpResponse {
  code?: number;
  msg?: string;
  data?: unknown;
}
// resp: IHttpResponse = { code: 0 }
export class RetJson {
  public static success(msg?: string, data?: unknown): IHttpResponse {
    return {
      code: 0,
      msg: msg,
      data: data,
    };
  }

  public static fail(msg?: string, data?: unknown): IHttpResponse {
    return {
      code: 1,
      msg: msg,
      data: data,
    };
  }
}
