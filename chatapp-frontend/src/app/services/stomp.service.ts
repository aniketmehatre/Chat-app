import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  constructor() {
    this.stompClient.debug = null;
    this.stompClient.connect({}, (): any => {
    });
  }

  socket = new SockJS('http://localhost:8080/stomp-endpoint');
  stompClient = Stomp.over(this.socket);

  subscribe(topic: string, callback: any): Subscription {
    return this.stompClient.subscribe('/topic/' + topic, (frame: any): any => {
      callback(JSON.parse(frame.body));
    });
  }

  send(app: string, data: any) {
    this.stompClient.send('/app/' + app, {}, JSON.stringify(data));
  }
}
