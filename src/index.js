const App = require('./app').default;
const config = require('./config').default
const firebase = require('firebase')
new App({ config, firebase });
