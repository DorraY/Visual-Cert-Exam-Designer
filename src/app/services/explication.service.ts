import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExplicationService {

  private baseUrl = "http://localhost:9090/springboot-crud-rest/api/v1/explications/"

  constructor(private http: HttpClient) { }

  getExplication(id:number): Observable<any>  {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  getExplicationList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`)
  }

  deleteExplication(id:number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,
    {responseType: 'text'}
    )
  }

  updateExplication(id :number, value: any) : Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`,value)
  }



}
