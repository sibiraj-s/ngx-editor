import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

const FIVE_SECONDS = 5000;


@Injectable()
export class MessageService {
  private message: Subject<string> = new Subject();

  constructor() {
  }

  messages(): Observable<string> {
    return this.message.asObservable();
  }

  send(message: string) {
    this.message.next(message);
    this.clearMessageOn(FIVE_SECONDS);
  }

  private clearMessageOn(milliseconds: number): void {
    setTimeout(() => {
      this.message.next(undefined);
    }, milliseconds);
  }
}
