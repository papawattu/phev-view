import { Observable, ReplaySubject } from 'rxjs'
import { log } from 'phev-utils'

const CarService = ({ config, firebase }) => {

    const registers = new Observable.concat(
        Observable.fromEventPattern(handler => firebase.database().ref('registers').once('value',handler))
            .take(1)
            .map(x => x.val())        
            .flatMap(x => 
                Observable.from(Object.keys(x)
                    .map(y => ({ register: Number.parseInt(y), data: x[y].data})))),
        Observable.fromEvent(firebase.database().ref('registers'),'child_changed')
            .map(x => ({ register: Number.parseInt(x.key), data: x.val().data})))
            .do(x => x.register !== 8? console.log(x) : undefined)
        .share()

    
    const sendMessage = message => fetch(config.baseUri + '/send', {
        method: 'POST',
        body: JSON.stringify(message),
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

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