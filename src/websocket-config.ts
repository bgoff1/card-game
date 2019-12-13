import { environment } from './environments/environment';
const websocketUrl = environment.production
  ? 'wss://salty-river-40744.herokuapp.com/'
  : 'ws://localhost:8080/';
export default websocketUrl;
