const messages = require('./notifications/message_source').default
const App = require('./app').default;
const config = require('./config')

if (process.env.NODE_ENV !== 'production') {
       console.log('Running in development mode');
} 
const app = new App({config});
