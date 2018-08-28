import { Injectable } from '@angular/core';
import { ApiService } from '../../utils/api'
@Injectable()
export class CointerService {

  constructor(public apiService: ApiService) {
  }

  public addNote(data): any {
    return this.apiService
      .post(`note/addNote`, data)
  }

  public selNoteList(data): any {
    return this.apiService
      .post(`note/selNoteList`, data)
  }

}