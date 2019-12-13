import { Component, OnInit } from '@angular/core';
import websocketUrl from '../websocket-config';
import { Card } from './models/card.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cards: Card[] = [];
  ngOnInit() {
    const socket = new WebSocket(websocketUrl);
    socket.onmessage = (message: MessageEvent) => {
      this.cards = JSON.parse(message.data);
      console.log(this.cards);
    };
    socket.onclose = (event: CloseEvent) => console.log('Websocket Closed!');
  }
}
