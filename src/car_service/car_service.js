import { Observable } from 'rxjs'
import { encode, decode, toMessageArray } from '../car_message/encoder_decoder'
import { log } from 'phev-utils'
import codes from '../ref_data/phev_codes'
import { messages } from '../stubs/fakeData'
import firebase from 'firebase'

const PING_SEND_CMD = 0xf9
const PING_RESP_CMD = 0x9f
const START_SEND = 0xf2
const START_RESP = 0x2f
const SEND_CMD = 0xf6
const RESP_CMD = 0x6f
const DEFAULT_LENGTH = 4
const REQUEST_TYPE = 0
const RESPONSE_TYPE = 1
const EMPTY_DATA = Buffer.from([0]);

const CarService = config => {

    firebase.initializeApp({
        apiKey: 'AIzaSyDo4HOpjUvts6hLHOjDD4ehSkJzUXykNyE', 
        authDomain: 'phev-db3fa.firebaseapp.com',        
        databaseURL: 'https://phev-db3fa.firebaseio.com',
        projectId: 'phev-db3fa',
        storageBucket: 'phev-db3fa.appspot.com',
        messagingSenderId: '557258334399'
      });
    
    const registers = Observable.fromEvent(firebase.database().ref('/registers/'),'value')
      .map(x => x.val())
      .flatMap(x => Observable.from(Object.keys(x).map(y => ({ register: Number.parseInt(y), data: x[y].data }))))
    
      const sendMessage = message => undefined

    const commandMessages = () => registers

    return {
        sendMessage: sendMessage,
        commandMessages: commandMessages,
    }
}


export default CarService