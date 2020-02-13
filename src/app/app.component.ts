import { Component, OnInit } from '@angular/core';
import { Card } from './models/card.model';
import { WebsocketService } from './websocket/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cards: Card[] = [];
  lastPlayedCard: Card;
  lastPlayedByMe: boolean;
  health: number;
  opponentHealth: number;
  constructor(private websocketService: WebsocketService) {}
  ngOnInit() {
    this.websocketService.cardsInitialized$.subscribe(cards => {
      this.cards = cards;
    });
    this.websocketService.cardPlayed$.subscribe(card => {
      this.lastPlayedByMe = false;
      this.lastPlayedCard = card;
    });
    this.websocketService.hero$.subscribe(matchup => {
      this.health = matchup.me.health;
      this.opponentHealth = matchup.you.health;
    });
  }

  playCard(card: Card) {
    this.lastPlayedByMe = true;
    this.lastPlayedCard = card;
    this.websocketService.userPlayCard(card);
  }
}
