import EventEmitter from 'events'

const APP_MSG
const events = new EventEmitter()

if(process.env.NODE_ENV === 'test') {
    events.on(APP_MSG, (msg) => {
        console.log(msg)
    })
}