const messages = require('./notifications/message_source').default
const App = require('./app').default;
const config = require('./config').default

const app = new App(config);
