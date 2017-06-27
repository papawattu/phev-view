const allowedCommands = [0xf2,0x2f,0xf6,0x6f,0xf9,0x9f];

export function popMessage(messages,callback) {
    const message = extract(messages);
    callback(message);
    const idx = findCommand(messages);
    if(messages.length - message.length) {
        const remaining = Buffer.alloc(messages.length - message.length);
        messages.copy(remaining, 0, message.length + idx);
        popMessage(remaining,callback);
    }
}

function findCommand(messages) {
    let idx = 0;
    let command = messages[0];
    while(allowedCommands.indexOf(command) < 0 && idx < messages.length) {
       idx++;
       command = messages[idx]; 
    }
    return idx;
}
function extract(messages) {
    const idx = findCommand(messages);
    let command = messages[0];

    if(idx < messages.length) {
        const length = messages[1+idx] + 2 || 0;
    
        if(length > messages.length - idx) {
            throw Error('Message not complete ' + messages.toString('hex') + ' index ' + idx);
        }    
        const chunk = Buffer.alloc(length);
    
        messages.copy(chunk, 0, idx, length + idx);
        return chunk;
    } else {
        throw Error('Message is full of rubbish ' + messages.toString('hex') + ' length ' + idx);
    }
}

export function decode(message) {
    const command = message[0];
    const length = message[1];
    const type = message[2];
    const register = message[3];
    const data = message.slice(4, message.length - 1);
    const checksum = message[message.length-1];

    return { command, length, type, register, data, checksum };
}
export function encode(command) {
    if(command == null) return null;
 //   console.log('Command ' + JSON.stringify(command));
    const message = Buffer.alloc(command.data.length + 5);
    message[0] = command.command;
    message[1] = command.data.length + 3;
    message[2] = command.type;
    message[3] = command.register;
    const d = Buffer.from(command.data);
    d.copy(message,4);
    message[message.length-1] = generateChecksum(message);
    return message;
}


export function generateChecksum(data) {
    let checksum = 0;
   
    for (let i = 0; i < data.length-1; i++) {
        checksum = data[i] + checksum & 0xff;
    }
    return checksum;
}