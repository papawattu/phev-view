const App = require('./app').default;
const config = require('./config').default

console.log(process.env.PRODUCTION)
console.log(process.env.DEVELOPMENT)

new App(config);
