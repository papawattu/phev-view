import { registers } from './registers';

let sendAll = false;
let _message = null;

function start(response) {
    if(response.command === 0x2f) {
        response.register = 0x01;
        response.data = Buffer.from([0]);
        response.length = 0x04;
        return response;
    } else {
        response.register = 0x01;
        response.data = Buffer.from([0x02,0x00,0x00,0x00,0x00,0x00,0x00]);
        response.length = 0x0a;
        return response;
    }
}
function ping(response) {
    if(response.command === 0xf9) {
        response.data = Buffer.from([0]);

    } else {
        response.data = Buffer.from([6]);
    }
    response.length = 4;
    return response;
}
export function respond({command,length,type,data,register}) {
    const response = {
        command: swapNibble(command),
        type: !type & 1,
        register: register,
    };
    if(response.command === 0xf2 || response.command === 0x2f) {
        return start(response);
    }
    if(response.command === 0xf6) {
        if(response.type === 0x01) { //get value ack
            response.data = Buffer.from([0]);
            response.length = 4;
            return response;
        } else {  // set value
            //const reg = registers.find(e => e.register === response.register);
            //if(reg === undefined) {
            //    throw Error('Undefinded register ' + register);
            //}
            response.data = Buffer.from([0]);
            response.length = 4;
            return response;
        }
    } 
    if(response.command === 0x6f) {
        if(response.type === 0x01) {
            const message = registers.find(e => e.register === response.register);
            if(message == null)  throw Error('Register not found ' + response.register);
            response.data = Buffer.from(message.data);
            response.length = message.data + 3;
            if(message.register === 0xaa) {
               _message = sendRegisters();
               sendAll = true;
            }
            return response;
        } else {
            return null;
        }
    }
    if(response.command === 0x9f) {
        return null;
        //return ping(response);
    }
}

export function swapNibble(byte) {
    
    const high = (byte & 0xf0) >> 4;
    const low = (byte & 0x0f);

    return (low << 4) | high;
}
export function *sendRegisters() {
    let idx = 0;
    while(idx < registers.length) {
        const message = {};
        message.command = 0x6f;
        message.register = registers[idx].register;
        message.type = 0;
        message.data = registers[idx].sender(message);
        
        if(registers[idx].initSend === undefined  || registers[idx].initSend) {
            yield registers[idx].sender(message);
        }
        idx++;
    }
    return;
}
let connectedCallback = null;
        
export function returnValues() {

    if(sendAll) {
        const m = _message.next();
        if(!m.done) {
            return m.value;
        } else {
            sendAll = false;
            return null;
        }
    }
}