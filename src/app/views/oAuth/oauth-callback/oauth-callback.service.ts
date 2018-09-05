import { Injectable } from '@angular/core';
import { ApiService } from '../../../utils/api'
@Injectable()
export class OauthCallbackService {

  constructor(public apiService: ApiService) {
  }

  public github_callback(url): any {
    return this.apiService
      .get(url)
  }
}