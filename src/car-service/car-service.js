import { Observable, ReplaySubject } from 'rxjs'
import { log } from 'phev-utils'

const CarService = ({ config, auth, firebase }) => {

    const registers = new Observable.concat(
        Observable.fromEventPattern(handler => firebase.database().ref('registers').once('value',handler))
            .take(1)
            .map(x => x.val())        
            .flatMap(x => 
                Observable.from(Object.keys(x)
                    .map(y => ({ register: Number.parseInt(y), data: x[y].data})))),
        Observable.fromEvent(firebase.database().ref('registers'),'child_changed')
            .map(x => ({ register: Number.parseInt(x.key), data: x.val().data})))
        .share()

    
    const sendMessage = message => {
        const token = auth.getToken()
        console.log(JSON.stringify(message))
        console.log('Token ' + token)
        fetch(config.baseUri + '/operations', {
        method: 'POST',
        body: JSON.stringify(message),
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            },
        })
    }

    const commandMessages = () => {
        const subject = new ReplaySubject()

        registers.subscribe(subject)

        return subject  
    }

    return {
        sendMessage: sendMessage,
        commandMessages: commandMessages,
    }
}

export default CarService