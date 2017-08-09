import mqtt from 'mqtt';
import { CarMessageHandler } from './car_message';
import { CarDataStore } from './car_data';
import { registers } from './model/registers';
import { responseLabels } from './model/labels';
import registerContainer from './components/register_container';
import database from './database';
import Rx from 'rxjs/Rx';

const setupMqttListener = ({ mqtt, database }) => {
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

const setupRegisterComponent = dom => {
    Rx.Observable.combineLatest(
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

const setupPage = dom => {

    const domCreateEl = e => dom.createElement(e);
    const domCreateText = e => dom.createTextNode(e);
    const root = dom.getElementById('root');
    
    const registers = root => {
        const registersDiv = domCreateEl('div');
        registersDiv.setAttribute('id', 'registers');
        registersDiv.setAttribute('class','container-fluid');
        root.appendChild(registersDiv);
    }

    const header = root => {
        const header = domCreateEl('h1');
        header.appendChild(domCreateText('PHEV'));
        root.appendChild(header);

    }

    const summary = root => {
        const summaryDiv = domCreateEl('div');
        summaryDiv.setAttribute('id', 'summary');
        summaryDiv.setAttribute('class','container-fluid');
        root.appendChild(summaryDiv);
        

    }
    header(root);
    summary(root);
    registers(root);

}
export default function (dom) {

    const client = setupMqttListener({ mqtt, database });
            
    const domLoaded = Rx.Observable.fromEvent(dom, 'DOMContentLoaded')
        .subscribe(() => {
            domLoaded.unsubscribe();
            setupRegisterComponent(dom);
            setupPage(dom);

        });


}