import { Injectable } from '@angular/core';
import { ApiService } from '../../utils/api'
@Injectable()
export class LoginService {

  constructor(public apiService: ApiService) {
  }

  public regist(data): any {
    return this.apiService
      .post(`login/regist`, data)
  }

  public dtlogin(data): any {
    return this.apiService
      .post(`login/dtlogin`, data)
  }
}