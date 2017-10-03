import { Observable } from 'rxjs'
import { log } from 'phev-utils'
import firebase from 'firebase'

const CarService = config => {

    firebase.initializeApp({
        apiKey: 'AIzaSyDo4HOpjUvts6hLHOjDD4ehSkJzUXykNyE', 
        authDomain: 'phev-db3fa.firebaseapp.com',        
        databaseURL: 'https://phev-db3fa.firebaseio.com',
        projectId: 'phev-db3fa',
        storageBucket: 'phev-db3fa.appspot.com',
        messagingSenderId: '557258334399'
      });
    
    const registers = Observable.fromEvent(firebase.database().ref('registers'),'value')
      .map(x => x.val())
      .flatMap(x => Observable.from(Object.keys(x).map(y => ({ register: Number.parseInt(y), data: x[y].data }))))
    
    const sendMessage = message =>  fetch(config.baseUri + '/send', {
        method: 'POST',
        body: JSON.stringify(message),
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    })

    const commandMessages = () => registers

    return {
        sendMessage: sendMessage,
        commandMessages: commandMessages,
    }
}


export default CarService