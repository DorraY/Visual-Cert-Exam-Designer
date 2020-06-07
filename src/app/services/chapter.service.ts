import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  private baseUrl = "http://localhost:9090/springboot-crud-rest/api/v1/chapters/"

  constructor(private http: HttpClient) { }

  getChapter(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  createChapter(chapter : Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, chapter)
  }

  getChapterList() : Observable<any> {
    return this.http.get(`${this.baseUrl}`)
  }

  deleteChapter(id: number) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,
    {responseType: 'text'}
    )
  }
  updateChapter(id:number, value:any) : Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`,value)
  }
}
