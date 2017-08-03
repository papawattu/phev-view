import mqtt from 'mqtt';
import { CarMessageHandler } from './car_message';
import { CarDataStore } from './car_data';
import { registers } from './model/registers';
import { responseLabels } from './model/labels';
import registerContainer from './components/register_container';
import database from './database';
import Rx from 'rxjs/Rx';

export default function (document) {

    /*
        const client = mqtt.connect('ws://jenkins.wattu.com:8080/mqtt');
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
    */
    /*
    Rx.Observable.zip(
        Rx.Observable.fromEvent(document, 'DOMContentLoaded'),
        registers({ database }),
        labels({ database }),
        (registers, labels) => ({ registers, labels }))
            .subscribe(x => {
                document.getElementById('root').innerHTML = '';
                document.getElementById('root').appendChild(registerContainer(
                {
                    document,
                    registers: x.registers,
                    labels: x.labels
                }));
        });
            */
    Rx.Observable.zip(
        Rx.Observable.fromEvent(document, 'DOMContentLoaded'),
        registers({ database }),
        responseLabels({ database })
    ).subscribe(x => {
        document.getElementById('root')
            .innerHTML = '';
        document.getElementById('root')
            .appendChild(registerContainer({
                document,
                registers: x[1],
                labels: x[2]
            }));
    });

}