import { environment } from './environments/environment';
const websocketUrl = environment.production
  ? 'https://salty-river-40744.herokuapp.com/'
  : 'http://localhost:8080/';
export default websocketUrl.replace(/^https?/, 'wss');
