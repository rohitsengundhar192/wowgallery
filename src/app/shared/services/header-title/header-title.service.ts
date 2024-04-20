import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderTitleService {
  public title = new BehaviorSubject('WOW Gallery Management');

  constructor() {}

  setTitle(title: string) {
    this.title.next(title);
  }


}
