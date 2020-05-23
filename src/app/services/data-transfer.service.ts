import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  public previewdata = new BehaviorSubject('no data');
  datapreview = this.previewdata.asObservable();

  constructor() { }


  setpreviewdata(data){
      this.previewdata.next(data);
    }

  getpreviewMessage(): Observable<any> {
      return this.previewdata.asObservable();
  }
}
