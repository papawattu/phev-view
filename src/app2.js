import mqtt from 'mqtt';
import { CarMessageHandler } from './car_message';
import { CarDataStore } from './car_data';
import { registers } from './model/registers';
import { responseLabels } from './model/labels';
import registerContainer from './components/register_container';
import database from './database';
import Rx from 'rxjs/Rx';

export default function (document) {

    const store = CarDataStore({database});
    const handler = CarMessageHandler({store});
    const client = mqtt.connect('wss://secure.wattu.com:8883/mqtt');
    client.subscribe('phev/receive');

    client.on('message', (topic, messages) => {
        client.publish('phev/send',
            handler.join(
                handler.split(messages)
                    .map(handler.decode)
                    .map(handler.store)
                    .map(handler.respond)
                    .map(handler.encode)
            )
        );
    });

    Rx.Observable.zip(
        Rx.Observable.fromEvent(document, 'DOMContentLoaded'),
        registers({ database }),
        responseLabels({ database })
    ).subscribe(x => {
        document.getElementById('registers')
            .innerHTML = '';
        document.getElementById('registers')
            .appendChild(registerContainer({
                document,
                registers: x[1],
                labels: x[2]
            }));
    });

}