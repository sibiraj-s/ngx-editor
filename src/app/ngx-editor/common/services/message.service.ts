import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


/** time in which the message has to be cleared */
const DURATION = 7000;

@Injectable()
export class MessageService {
  /** variable to hold the user message */
  private message: Subject<string> = new Subject();

  constructor() { }

  /** returns the message sent by the editor */
  getMessage(): Observable<string> {
    return this.message.asObservable();
  }

  /**
   * sends message to the editor
   *
   * @param message message to be sent
   */
  sendMessage(message: string): void {
    this.message.next(message);
    this.clearMessageIn(DURATION);
  }

  /**
   * a short interval to clear message
   *
   * @param milliseconds time in seconds in which the message has to be cleared
   */
  private clearMessageIn(milliseconds: number): void {
    setTimeout(() => {
      this.message.next(undefined);
    }, milliseconds);
  }
}
