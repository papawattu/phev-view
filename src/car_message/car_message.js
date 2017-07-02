import * as EncoderDecoder from './encoder_decoder';
import * as Responder from './responder';

export const CarMessageHandler = ({ store } = {}) => {
    
    const _store = store;

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
        },
        encode: message => {
            return EncoderDecoder.encode(message);
        },
        respond: message => {
            return Responder.respond(message);
        },
        join: messages => {
            return Buffer.concat(messages);
        },
        store: message => {
            if(message.command == 0x6f) _store.store(message)
            return message;
        }

    };
}