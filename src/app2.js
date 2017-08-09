import mqtt from 'mqtt';
import { CarMessageHandler } from './car_message';
import { CarDataStore } from './car_data';
import { registers } from './model/registers';
import { responseLabels } from './model/labels';
import registerContainer from './components/register_container';
import database from './database';
import Rx from 'rxjs/Rx';

const setupMqttListener = ({mqtt, database}) => {
    const store = CarDataStore({ database });
    const handler = CarMessageHandler({ store });
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

    return client;
}

const setupRegisterComponent = (dom) => {
    Rx.Observable.zip(
        registers({ database }),
        responseLabels({ database })
    ).subscribe(x => {
        dom.getElementById('registers')
            .innerHTML = '';
        dom.getElementById('registers')
            .appendChild(registerContainer({
                dom,
                registers: x[0],
                labels: x[1]
            }));
    });
}

const setupPage = () => {

}
export default function (dom) {

    const domLoaded = Rx.Observable.fromEvent(dom, 'DOMContentLoaded')
        .subscribe(() => {
            setupRegisterComponent(dom);
            setupMqttListener({mqtt, database});
            setupPage(dom);
        });


}