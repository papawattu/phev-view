import mqtt from 'mqtt';
import EncoderDecoder from './encoder_decoder'; 

export class CarMessageHandler {
    constructor({_mqtt = mqtt} = {}) {
        this.client = _mqtt.connect('ws://jenkins.wattu.com:8080/mqtt');
        this.client.subscribe('phev/receive');
    }
    onMessage(cb) {
        this.client.on('message',(topic, payload) => {
            EncoderDecoder.popMessage(payload, (data) => {
                cb(EncoderDecoder.decode(data));
            });
        });
    }
    responder(message) {
    
    }
}