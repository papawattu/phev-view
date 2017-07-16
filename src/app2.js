import mqtt from 'mqtt';
import * as firebase from 'firebase';
import { CarMessageHandler } from './car_message';
import { CarDataStore } from './car_data';
import Registers from './model/registers';
import RegisterContainer from './components/register_container';


export default function(document2) {

    const config = {
        apiKey: "AIzaSyDo4HOpjUvts6hLHOjDD4ehSkJzUXykNyE",
        authDomain: "phev-db3fa.firebaseapp.com",
        databaseURL: "https://phev-db3fa.firebaseio.com",
        projectId: "phev-db3fa",
        storageBucket: "phev-db3fa.appspot.com",
        messagingSenderId: "557258334399"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
    const database = firebase.database;
    //const store = CarDataStore({ database });
    //const handler = CarMessageHandler({ store });
    const registers = Registers({ database });

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


    document.addEventListener('DOMContentLoaded', event => {
        const registerContainer = RegisterContainer({ document, registers });
        document.getElementById('root').appendChild(registerContainer);
        return;
    });
}