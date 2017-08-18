import mqtt from 'mqtt';
import { CarMessageHandler } from './car_message';
import { CarDataStore } from './car_data';
import { registers } from './model/registers';
import { responseLabels } from './model/labels';
import { summary } from './components/summary';
import registerContainer from './components/register_container';
import database from './database';
import Rx from 'rxjs/Rx';
import Immutable from 'immutable';
import { encode } from './car_message/encoder_decoder';

const setupMqttListener = ({ mqtt, database }) => {
    const store = CarDataStore({ database });
    const handler = CarMessageHandler({ store });
    const client = mqtt.connect('wss://secure.wattu.com:8883/mqtt');
    client.subscribe('phev/receive');

    client.on('message', (topic, messages) => {
        const response = handler.join(
            handler.split(messages)
                .map(handler.decode)
                .map(handler.store)
                .map(handler.respond)
                .map(handler.encode));

        client.publish('phev/send', response);

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

const setupSummaryComponent = dom => {
    Rx.Observable.combineLatest(
        registers({ database }),
        responseLabels({ database })
    ).subscribe(e => {
        const sum = summary({ registers: e[0], labels: Immutable.fromJS(e[1]) });

        const templ =
            `<div class="container-fluid>   
    <div class="container-fluid">Last Updated on ${sum.lastUpdated.toDateString()} at ${sum.lastUpdated.toLocaleTimeString()}</div>
    <div id="battery" class="col-m-6">
        <h3>Battery</h3>
        <div class="progress">
            <div class="progress-bar" role="progressbar"  style="width:${sum.batteryLevel}%">${sum.batteryLevel}% Charged</div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group row">
            <label for="vin">VIN Number</label>
            <input name="vin" type="text" class="form-control" readonly value="${sum.vin}"/>
            <label for="ssid">SSID</label>
            <input name="ssid" type="text" class="form-control" readonly value="${sum.ssid}"/>
            <label for="ecuversion">ECU Version</label>
            <input name="ecuversion" type="text" class="form-control" readonly value="${sum.ecuVersion}"/>
        </div>
    </div>
</div>`


        dom.innerHTML = templ;
    });
};

const setupControls = dom => {
    const domCreateEl = e => dom.createElement(e);
    const domCreateText = e => dom.createTextNode(e);

    dom.innerHTML =
        `<button id ="connect" type="button" class="btn btn-default">Connect</button>
        <button id ="ac" type="button" class="btn btn-default">AC On</button>
        <button id ="headlights" type="button" class="btn btn-default">Head Lights On</button>`

};

const setupPage = dom => {

    const domCreateEl = e => dom.createElement(e);
    const domCreateText = e => dom.createTextNode(e);
    const root = dom.getElementById('root');

    const registers = root => {
        const registersDiv = domCreateEl('div');
        registersDiv.setAttribute('id', 'registers');
        registersDiv.setAttribute('class', 'container-fluid');
        root.appendChild(registersDiv);
    };

    const header = root => {
        const header = domCreateEl('h1');
        header.appendChild(domCreateText('PHEV'));
        root.appendChild(header);

    };

    const summary = root => {
        const summaryDiv = domCreateEl('div');
        summaryDiv.setAttribute('id', 'summary');
        summaryDiv.setAttribute('class', 'container-fluid');
        root.appendChild(summaryDiv);

        setupSummaryComponent(summaryDiv);

    };

    const controls = root => {
        const controlsDiv = domCreateEl('div');
        controlsDiv.setAttribute('id', 'controls');
        controlsDiv.setAttribute('class', 'container-fluid');

        setupControls(controlsDiv);
        root.appendChild(controlsDiv);
    };
    header(root);
    controls(root);
    summary(root);
    registers(root);
};
export default function (dom) {

    const client = setupMqttListener({ mqtt, database });

    const domLoaded = Rx.Observable.fromEvent(dom, 'DOMContentLoaded')
        .subscribe(() => {
            domLoaded.unsubscribe();
            setupRegisterComponent(dom);
            setupPage(dom);
            Rx.Observable.fromEvent(document.getElementById('ac'), 'click')
                .subscribe(e => {
                    const message = {};
                    message.command = 0xf6;
                    message.register = 4;
                    message.data = Buffer.from([1]);
                    client.publish('phev/send', encode(message));
                    console.log('click ac');
                });
            Rx.Observable.fromEvent(document.getElementById('headlights'), 'click')
                .subscribe(e => {
                    const message = {};
                    message.command = 0xf6;
                    message.register = 10;
                    message.data = Buffer.from([1]);
                    client.publish('phev/send', encode(message));
                    console.log('click head lights');
                });
            Rx.Observable.fromEvent(document.getElementById('connect'), 'click')
                .subscribe(e => {
                    client.publish('phev/send', Buffer.from([0xf2, 0x0a, 0x00, 0x01, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff]));
                    console.log('click connect');
                });

                
        });
}