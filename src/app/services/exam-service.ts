import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private baseUrl = "http://localhost:9090/springboot-crud-rest/api/v1/exams/"

  constructor(private http: HttpClient) { }

  getExam(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  createExam(exam : Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, exam)
  }

  getExamList() : Observable<any> {
    return this.http.get(`${this.baseUrl}`)
  }

  deleteExam(id: number) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,
    {responseType: 'text'}
    )
  }
  updateExam(id:number, value:any) : Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`,value)
  }
}
