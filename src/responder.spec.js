import chai from 'chai';
import * as Responder from './responder';
import * as EncoderDecoder from './encoder_decoder'

const assert = chai.assert;

const command_x11 = {
    command: 0x6f,
    length: 4,
    type: 0,
    register: 0x11,
    data: [0]
};
const command_x13 = {
    command: 0x6f,
    length: 4,
    type: 0,
    register: 0x13,
    data: [0]
};
const command_xaa = {
    command: 0x6f,
    length: 4,
    type: 1,
    register: 0xaa,
    data: [0]
};
const ping_in = {
    command: 0xf9,
    length: 4,
    type: 0,
    register: 0x00,
    data: [0]
};
const ping_out = {
    command: 0x9f,
    length: 4,
    type: 1,
    register: 0x00,
    data: [0x06]
};
const start_in = {
    command: 0xf2,
    length: 0x0a,
    type: 0,
    register: 0x01,
    data: [0x02,0x00,0x00,0x00,0x00,0x00,0x00]
};
const start_out = {
    command: 0x2f,
    length: 4,
    type: 1,
    register: 0x01,
    data: [0x00]
};
const command_x12 = {
    command: 0x6f,
    length: 0x0a,
    type: 0,
    register: 0x12,
    data: [0x11,0x05,0x16,0x15,0x03,0x0d,0x01],
};
const command_x05 = {
    command: 0xf6,
    length: 0x0a,
    type: 0,
    register: 0x05,
    data: [0x11,0x05,0x16,0x15,0x03,0x0d,0x01],
};
describe('Responder',() => {
    it('Should respond to message register 0x11',() => {
        const response = Responder.respond(command_x11);

        assert.equal(response.command,0xf6);
        assert.equal(response.length,0x04);
        assert.equal(response.type,0x01);
        assert.equal(response.register,0x11);
        assert.deepEqual(response.data,Buffer.from([0x00]));
    });
    it('Should respond to message register 0x13',() => {
        const response = Responder.respond(command_x13);

        assert.equal(response.command,0xf6);
        assert.equal(response.length,0x04);
        assert.equal(response.type,0x01);
        assert.equal(response.register,0x13);
        assert.deepEqual(response.data,Buffer.from([0x00]));
    });
    it('Should respond to time message register',() => {
        const response = Responder.respond(command_x12);

        assert.equal(response.command,0xf6);
        assert.equal(response.length,0x04);
        assert.equal(response.type,0x01);
        assert.equal(response.register,0x12);
        assert.deepEqual(response.data,Buffer.from([0x00]));
    });
    it('Should respond to time incoming message register',() => {
        const response = Responder.respond(command_x05);

        assert.equal(response.command,0x6f);
        assert.equal(response.length,0x03   );
        assert.equal(response.type,0x01);
        assert.equal(response.register,0x05);
        assert.deepEqual(response.data,Buffer.from([0x00]));
    });
});
describe.skip('Ping Responder',() => {
    it('Should respond to ping in message',() => {
        const response = Responder.respond(ping_in);

        assert.equal(response.command,0x9f);
        assert.equal(response.length,0x04);
        assert.equal(response.type,0x01);
        assert.equal(response.register,0x00);
        assert.deepEqual(response.data,Buffer.from([0x06]));
    });
    it('Should respond to ping out message',() => {
        const response = Responder.respond(ping_out);

        assert.equal(response.command,0xf9);
        assert.equal(response.length,0x04);
        assert.equal(response.type,0x00);
        assert.equal(response.register,0x00);
        assert.deepEqual(response.data,Buffer.from([0x00]));
    });
});
describe('Start Responder',() => {
    it('Should respond to start outgoing message',() => {
        const response = Responder.respond(start_out);

        assert.equal(response.command,0xf2);
        assert.equal(response.length,0x0a);
        assert.equal(response.type,0x00);
        assert.equal(response.register,0x01);
        assert.deepEqual(response.data,Buffer.from([0x02,0x00,0x00,0x00,0x00,0x00,0x00]));
    });
    it('Should respond to start incoming message',() => {
        const response = Responder.respond(start_in);

        assert.equal(response.command,0x2f);
        assert.equal(response.length,0x04);
        assert.equal(response.type,0x01);
        assert.equal(response.register,0x01);
        assert.deepEqual(response.data,Buffer.from([0x00]));
    });
});
describe('Swap nibble',() => {
    it('Should reverse nibbles',() => {
        const byte = 0x6f;
        const response = Responder.swapNibble(byte);
        assert.equal(response,0xf6);
    });
});