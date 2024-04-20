import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, map, merge, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectivityService {
  private isConnected = new BehaviorSubject<boolean>(!!window.navigator.onLine);
  isConnected$ = this.isConnected.asObservable();

  constructor() {
    this.initConnectivityMonitoring();
  }

  private initConnectivityMonitoring() {
    
    window.addEventListener('online', () => {
      this.isConnected.next(!!window.navigator.onLine);
      console.log('Internet connection established');
    });
    window.addEventListener('offline', () => {
      this.isConnected.next(!!window.navigator.onLine);
      console.log('Internet connection lost');
    });
  }
}
