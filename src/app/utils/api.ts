import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs';
import { map, filter, scan,catchError } from "rxjs/operators";
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
      let token = localStorage.getItem('noteToken');
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
    } else{
      return { "Content-Type": "application/json;charset=UTF-8" }
    }
  }

  private initOptions(url: string,params?:any) {
    let headers = new Headers(this.createAuthorizationHeader(url));
    if(params){
      return new RequestOptions({ headers: headers,params: params});
    }
    return new RequestOptions({ headers: headers });
  }

  private handleSuccess(res: Response) {
    console.log(res);
    let body = res["_body"];
    if (body) {
      return {
        code:res.status,
        data:JSON.parse(res["_body"])
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
  private handleErr(res:Response) {
    return {
      code:res.status,
      data:JSON.parse(res["_body"])
    }
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
  public get(url: string,data?: any): Observable<any> {
    let _this = this;
    return this.http.get(apiConfig.base_api_host + url, this.initOptions(url,data)).pipe(
      map((res: Response) => {
        console.log(res);
        return _this.handleSuccess(res)
      }),
    )
  }

  public put(url: string,data?: any): Observable<any> {
    let _this = this;
    return this.http.put(apiConfig.base_api_host + url, this.initOptions(url,data)).pipe(
      map((res: Response) => {
        return _this.handleSuccess(res)
      })
    )
  }

  public delete(url: string,data?: any): Observable<any> {
    let _this = this;
    return this.http.delete(apiConfig.base_api_host + url, this.initOptions(url,data)).pipe(
      map((res: Response) => {
        return _this.handleSuccess(res)
      })
    )
  }
}