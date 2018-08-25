import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs';
import { map, filter, scan } from "rxjs/operators";

import { apiConfig } from '../global/apiConfig';
import { pipe } from '@angular/core/src/render3/pipe';

@Injectable()
export class ApiService {
  public timeout = 3000;
  public allowUrls = new RegExp(apiConfig.allowUrls);//'g'
  public noJsonTypeUrls = new RegExp(apiConfig.noJsonTypeUrls);//'g'


  constructor(public http: Http) {
  }

  private createAuthorizationHeader(url: string) {
    if (!this.allowUrls.test(url)) {
      let token = localStorage.getItem('token');
      if (this.noJsonTypeUrls.test(url)) {
        return {
          "token": token
        }
      } else {
        return {
          "token": token,
          "Content-Type": "application/json;charset=UTF-8"
        }
      }
    }
    if (this.noJsonTypeUrls.test(url)) {
      return {}
    } else {
      return { "Content-Type": "application/json;charset=UTF-8" }
    }
  }

  private initOptions(url: string) {
    let headers = new Headers(this.createAuthorizationHeader(url));

    return new RequestOptions({ headers: headers });
  }

  private handleSuccess(res: Response) {
    let body = res["_body"];
    if (body) {
      console.log(res);
      if (res.status === 403) {
        return {
          data: {
            code: -403
          }
        }
      }
      if (res.status === 200 || res.status === 304) {
        return JSON.parse(res["_body"])
      }
      return {
        data: {
          code: -404,
          message: res.statusText,
          data: res.statusText,
        }
      }
    }
    else {
      return {
        statusText: res.statusText,
        status: res.status,
        success: true
      }
    }

  }
  /**
  * 处理请求错误
  * @param error
  * @returns {void|Promise<string>|Promise<T>|any}
  */
  private handleError(error) {
    console.log(error);
    let msg = '请求失败';
    if (error.status == 400) {
      console.log('请求参数正确');
    }
    if (error.status == 404) {

      console.error('请检查路径是否正确');
    }
    if (error.status == 500) {
      console.error('请求的服务器错误');
    }
    console.log(error);
    return { success: false, msg: msg };

  }

  public post(url: string, data?: any): Observable<any> {
    let _this = this;
    return this.http.post(apiConfig.base_api_host + url, data ? data : {}, this.initOptions(url)).pipe(
      map((res: Response) => {
        return _this.handleSuccess(res)
      })
    )
  }

  /**
  * get请求
  * @param url 接口地址
  * @param params 参数
  * @returns {Promise<R>|Promise<U>}
  */
  public get(url: string): Observable<any> {
    let _this = this;
    return this.http.get(apiConfig.base_api_host + url, this.initOptions(url)).pipe(
      map((res: Response) => {
        return _this.handleSuccess(res)
      })
    )
  }
}