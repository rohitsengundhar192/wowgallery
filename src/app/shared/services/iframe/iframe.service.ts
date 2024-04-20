import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IframeService {
  getIframeEmit = new EventEmitter();
  sendIframeEmit = new EventEmitter();
  private getIframeData$ = new BehaviorSubject<string | any>(undefined);

  constructor() {}


  getIframeMessages(body: any) {
    this.getIframeEmit.emit(body);
  }

  sendIframeMessages(body: any) {
    this.sendIframeEmit.emit(body);
  }

  get getIframeData() {
    return this.getIframeData$.asObservable();
  }

  sendIframeData(body: any) {
    this.getIframeData$.next(body);
  }
}


