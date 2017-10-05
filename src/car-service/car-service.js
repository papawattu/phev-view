import { Observable, ReplaySubject } from 'rxjs'
import { log } from 'phev-utils'

const CarService = ({ config, firebase }) => {

    const registers = Observable.fromEvent(firebase.database().ref('registers'), 'value')
        .map(x => x.val())
        .flatMap(x => Observable.from(Object.keys(x).map(y => ({ register: Number.parseInt(y), data: x[y].data }))))
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