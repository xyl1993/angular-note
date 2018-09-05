import { Injectable } from '@angular/core';
import { ApiService } from '../../../utils/api'
@Injectable()
export class BindEmailService {

  constructor(public apiService: ApiService) {
  }

  public bindEmail(data): any {
    return this.apiService
      .post(`login/bindEmail`, data)
  }
}