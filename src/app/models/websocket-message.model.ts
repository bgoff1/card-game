import { Card } from './card.model';
import { Hero } from './hero.model';
import { Matchup } from './matchup.model';

export interface WebsocketMessage {
  type: MessageType;
  player?: Player;
  card?: Card;
  players?: Matchup;
}

interface Player {
  hand: Hand;
  hero: Hero;
}

interface Hand {
  deck: Card[];
}

type MessageType = 'start' | 'cardPlayed' | 'updateHeros';
