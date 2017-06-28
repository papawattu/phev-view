import _mqtt from 'mqtt';
import EncoderDecoder from './encoder_decoder'; 

export default class CarMessageHandler {
    constructor({mqtt = _mqtt} = {}) {
        this.client = mqtt.connect('ws://jenkins.wattu.com:8080/mqtt');
        this.client.subscribe('phev/receive');
    }
    onMessage(cb) {
        this.client.on('message',(topic, payload) => {
            const builder = new ResponseBuilder();
            EncoderDecoder.popMessage(payload, (data) => {
                builder.respond(message);
                cb(EncoderDecoder.decode(data));
            });
        });
    }
    responder(message) {
    
    }
}

class ResponseBuilder {
    constructor() {
        this.buffer = Buffer.from([]);
    }
    addResponse(message) {
        this.buffer = Buffer.concat([this.buffer,response]);
    }
    response() {
        return Buffer.from(this.buffer);
    }
}
