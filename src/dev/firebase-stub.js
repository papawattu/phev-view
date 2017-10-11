import EventEmmiter from 'events'
import registers from './register-data'

const firebase = {}
const database = {}
const ee = new EventEmmiter()

firebase.initializeApp = () => console.log('Firebase Stub Initialised')
database.ref = () => ee
firebase.database = () => database

const data = {}
data.val = () => registers
ee.on('newListener', () => {
    process.nextTick(() => ee.emit('value', data) )
    
})

    ee.emit('value', data)

export default firebase