import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const FIVE_SECONDS = 5000;

@Injectable()
export class MessageService {

  private message: Subject<string> = new Subject();

  constructor() { }

  getMessage(): Observable<string> {
    return this.message.asObservable();
  }

  sendMessage(message: string) {
    this.message.next(message);
    this.clearMessageIn(FIVE_SECONDS);
  }

  private clearMessageIn(milliseconds: number): void {
    setTimeout(() => {
      this.message.next(undefined);
    }, milliseconds);
  }

}
