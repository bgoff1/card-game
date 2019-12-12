import { Component, OnInit } from '@angular/core';
import { websocketUrl } from '../config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const socket = new WebSocket(websocketUrl.replace(/^https?/, 'ws'));
    socket.onmessage = (message: MessageEvent) => console.log(message);
    socket.onclose = (event: CloseEvent) => console.log('Websocket Closed!');
  }
}
