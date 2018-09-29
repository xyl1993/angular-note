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
      .get(`note/selNoteList`, data)
  }

  public editNote(data): any {
    return this.apiService
      .put(`note/editNote/${data._id}`, data)
  }
  
  public selNoteDetail(data): any {
    return this.apiService
      .get(`note/selNoteDetail/${data._id}`)
  }

  public logicDelete(data):any {
    return this.apiService
      .put(`note/logicDelete/${data._id}`)
  }

  public physicsDelete(data):any{
    return this.apiService
      .delete(`note/physicsDelete/${data._id}`)
  }

  public recovery(data):any{
    return this.apiService
      .put(`note/recovery/${data._id}`)
  }

  public upload(data):any{
    return this.apiService
      .post(`note/upload`, data)
  }
}