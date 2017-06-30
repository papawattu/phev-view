import chai from 'chai';
import sinon from 'sinon';
import { CarMessageHandler } from './car_message';

const assert = chai.assert;

const singleMessage = Buffer.from([0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff]);
const doubleMessage = Buffer.from([0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff, 0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff]);
const remaining = Buffer.from([0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff]);
const incompleteMessage = Buffer.from([0x00,0x00,0x00,0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff]);
const gargbageMessage = Buffer.from([0x00,0x00,0x00,0x0d, 0x01, 0xff]);
const wrongLengthMessage = Buffer.from([0xf6,0xff,0x00,0x0d, 0x01, 0xff]);
const lengthPastEndMessage = Buffer.from([0x00,0xf6,0xff,0x00,0x0d, 0x01, 0xff]);

const sut = CarMessageHandler();

describe('Messages',() => {
    it('Should split up one message',() => {
        assert.deepEqual(sut.split(singleMessage),
            [Buffer.from([0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff])]);
    });
    it('Should split up two messages',() => {
        assert.deepEqual(sut.split(doubleMessage),
            [Buffer.from([0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff]),
            Buffer.from([0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff])]);
    });
});
describe('Decode Messages',() => {
    it('Should decode one message',() => {
        assert.deepEqual([Buffer.from([0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff])].map(sut.decode),
            [{ command : 0x6f, length : 0x0a, type: 0x00, register: 0x12, data: Buffer.from([0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01]), checksum: 0xff }]);
    });
    it('Should decode two messages',() => {
        assert.deepEqual(
            [Buffer.from([0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff]),
            Buffer.from([0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff])
            ].map(sut.decode),
            [{ command : 0x6f, length : 0x0a, type: 0x00, register: 0x12, data: Buffer.from([0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01]), checksum: 0xff },
            { command : 0x6f, length : 0x0a, type: 0x00, register: 0x12, data: Buffer.from([0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01]), checksum: 0xff }]);
    });
});
describe('Encode Messages',() => {
    it('Should encode one message',() => {
        assert.deepEqual([{ command : 0x6f, length : 0x0a, type: 0x00, register: 0x12, data: Buffer.from([0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01]), checksum: 0xff }]
            .map(sut.encode),[Buffer.from([0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xdd])]);
    });
});