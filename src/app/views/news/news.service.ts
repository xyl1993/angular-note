import { Injectable } from '@angular/core';
import { ApiService } from '../../utils/api'
@Injectable()
export class NewsService {

  constructor(public apiService: ApiService) {
  }

  public addNote(data): any {
    return this.apiService
      .post(`note/addNote`, data)
  }


}