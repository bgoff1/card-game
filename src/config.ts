import { environment } from './environments/environment';
export const websocketUrl = environment.production
  ? 'https://salty-river-40744.herokuapp.com/'
  : 'http://localhost:8080/';
