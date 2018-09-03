const App = require('./app').default;

const config = process.env.PRODUCTION ? require('./config').default : require('./dev/config').default

const firebase = process.env.PRODUCTION ? require('firebase') : require('./dev/firebase-stub').default

const auth = process.env.PRODUCTION ? require('./auth').default : require('./dev/auth').default
new App({ config, auth, firebase });
