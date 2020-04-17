import { Injectable } from '@angular/core';
import { EventEmitter } from 'protractor';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  private subject = new Subject<any>()

  sendData(data:string) {
    this.subject.next({
      text:data
    })
  }

  getData() : Observable<any> {
    return this.subject.asObservable()
  }



 

}
