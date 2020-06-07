import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private baseUrl = "http://localhost:9090/springboot-crud-rest/api/v1/themes/"


  constructor(private http: HttpClient) { }

  getTheme(id:number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  getThemeList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`)
  }

  deleteTheme(id:number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`,
    {responseType: 'text'}
    )
  }

  updateTheme(id :number, value: any) : Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`,value)
  }

  createTheme(theme : Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, theme)
  }
  
}
