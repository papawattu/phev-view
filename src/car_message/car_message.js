import mqtt from 'mqtt';
import EncoderDecoder from './encoder_decoder'; 

export function connect() {
    return mqtt.connect('ws://jenkins.wattu.com:8080/mqtt');
}
export function subscribe(client) {
    client.subscribe('phev/receive');
}
export function handle(client) {
    client.on('message', (topic, payload) => {
        let response = Buffer.from([]);
        EncoderDecoder.popMessage(payload, (data) => {
            const message = EncoderDecoder.decode(data);
            response = Buffer.concat([response, EncoderDecoder.encode(Responder.respond(message))]);
            if (message.command == 0x6f && message.type == 0) {
                registerHandler.updateRegister(message.register, message.data);
            }
        });
        client.publish('phev/send', response);
    });
}