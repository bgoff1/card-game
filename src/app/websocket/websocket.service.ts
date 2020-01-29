import { Injectable } from '@angular/core';
import websocketUrl from '../../websocket-config';
import { Subject } from 'rxjs';
import { Card } from '../models/card.model';
import { WebsocketMessage } from '../models/websocket-message.model';
import { Matchup } from '../models/matchup.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket;
  private cardsInitializedSubject: Subject<Card[]> = new Subject();
  private cardPlayedSubject: Subject<Card> = new Subject();
  private heroSubject: Subject<Matchup> = new Subject();
  constructor() {
    this.socket = new WebSocket(websocketUrl);
    this.socket.onmessage = (msg: MessageEvent) => {
      const message: WebsocketMessage = JSON.parse(msg.data);
      switch (message.type) {
        case 'start':
          return this.setup(message);
        case 'cardPlayed':
          return this.opponentPlayCard(message);
        case 'updateHeros':
          return this.updateHero(message);
      }
    };
    this.socket.onclose = (event: CloseEvent) =>
      console.log('Websocket Closed!');
  }

  setup(message: WebsocketMessage) {
    if (message.player) {
      this.cardsInitializedSubject.next(message.player.hand.deck);
      this.cardsInitializedSubject.complete();
    }
    if (message.players) {
      console.log('players');
      this.heroSubject.next(message.players);
    }
  }

  opponentPlayCard(message: WebsocketMessage) {
    if (message.card) {
      this.cardPlayedSubject.next(message.card);
    }
    if (message.players) {
      this.heroSubject.next(message.players);
    }
  }

  userPlayCard(card: Card) {
    this.socket.send(JSON.stringify(card));
  }

  updateHero(message: WebsocketMessage) {
    if (message.players) {
      this.heroSubject.next(message.players);
    }
  }

  get cardsInitialized$() {
    return this.cardsInitializedSubject.asObservable();
  }

  get cardPlayed$() {
    return this.cardPlayedSubject.asObservable();
  }

  get hero$() {
    return this.heroSubject.asObservable();
  }
}
