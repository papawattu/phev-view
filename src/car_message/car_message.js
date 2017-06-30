import _mqtt from 'mqtt';
import * as EncoderDecoder from './encoder_decoder';

export const CarMessageHandler = ({ mqtt = _mqtt, url = 'ws://jenkins.wattu.com:8080/mqtt', topic = 'phev/receive' } = {}) => {
    const client = mqtt.connect(url);
    client.subscribe(topic);

    return {
        split: messages => {
            const resp = [];
            EncoderDecoder.popMessage(messages, message => {
                resp.push(message);
            });
            return resp;
        },
        decode: message => {
            
            return EncoderDecoder.decode(message);
        }
    };
}