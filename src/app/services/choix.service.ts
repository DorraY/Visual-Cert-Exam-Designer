import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChoixService {

  private baseUrl = "http://localhost:9090/springboot-crud-rest/api/v1/choices/"

  constructor(private http: HttpClient) { }

  getChoix(id :number) : Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
  }
  getChoixList() : Observable<any> {
    return this.http.get(`${this.baseUrl}`)
  }

  deleteChoix(id: number) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,
    {responseType: 'text'}
    )
  }
  updateChoix(id:number, value:any) : Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`,value)
  }

  createChoix(choix : Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, choix)
  }

}
