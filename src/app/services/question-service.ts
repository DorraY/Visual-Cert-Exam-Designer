import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl = "http://localhost:9090/springboot-crud-rest/api/v1/questions/"

  constructor(private http: HttpClient) { }

   getQuestion(id:number){
    return  this.http.get(`${this.baseUrl}/${id}`).toPromise()
  }

  getQuestionList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`)
  }

  deleteQuestion(id:number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,
    {responseType: 'text'}
    )
  }

  updateQuestion(id :number, value: any) : Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`,value)
  }

  createQuestion(question : Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, question)
  }



}
