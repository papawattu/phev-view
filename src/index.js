const App = require('./app').default;

const config = process.env.PRODUCTION ? require('./config').default : require('./dev/config')

const firebase = process.env.PRODUCTION ? require('firebase') : require('./dev/firebase-stub').default

new App({ config, firebase });
