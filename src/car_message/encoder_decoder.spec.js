import chai from 'chai';
import * as EncoderDecoder from './encoder_decoder';

const assert = chai.assert;

const singleMessage = Buffer.from([0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff]);
const doubleMessage = Buffer.from([0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff, 0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff]);
const remaining = Buffer.from([0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff]);
const incompleteMessage = Buffer.from([0x00,0x00,0x00,0x6f, 0x0a, 0x00, 0x12, 0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01, 0xff]);
const gargbageMessage = Buffer.from([0x00,0x00,0x00,0x0d, 0x01, 0xff]);
const wrongLengthMessage = Buffer.from([0xf6,0xff,0x00,0x0d, 0x01, 0xff]);
const lengthPastEndMessage = Buffer.from([0x00,0xf6,0xff,0x00,0x0d, 0x01, 0xff]);

const empty = Buffer.from([]);
const commandObj = {
    command: 0x6f,
    length: 0x04,
    type: 0x00,
    register: 0x11,
    data: Buffer.from([0]),
};
describe('Decode', () => {
    it('Should decode single message', () => {
        EncoderDecoder.popMessage(singleMessage,(message) => {
            assert.deepEqual(message, singleMessage);
        });
    });
    it('Should decode double message', () => {
        EncoderDecoder.popMessage(doubleMessage,(message) => {
            assert.deepEqual(message, singleMessage);
        });

    });
    it('Should handle empty message', () => {
        assert.throws(()=>{EncoderDecoder.popMessage(empty,()=>{})});

    });
    //TODO:  Fix me the code is broken not this test
    it.skip('Should handle incomplete message', () => {
        EncoderDecoder.popMessage(incompleteMessage,(message) => {
            assert.deepEqual(message, singleMessage);
        });
    });
    it('Should handle garbage message', () => {
        assert.throws(()=>{EncoderDecoder.popMessage(gargbageMessage,()=>{})});
    });
    it('Should handle wrong length message', () => {
        assert.throws(()=>{EncoderDecoder.popMessage(wrongLengthMessage,()=>{})});
    });
    it('Should handle length past end message', () => {
        assert.throws(()=>{EncoderDecoder.popMessage(lengthPastEndMessage,()=>{})});
    });
});
describe('Decode Message', () => {
    it('Should decode message', () => {
        const cmd = EncoderDecoder.decode(singleMessage)

        assert.equal(cmd.command, 0x6f);
        assert.equal(cmd.length, 0x0a);
        assert.equal(cmd.type, 0x00);
        assert.equal(cmd.register, 0x12);
        assert.equal(cmd.checksum, 0xff);
        assert.deepEqual(cmd.data, Buffer.from([0x11, 0x05, 0x16, 0x15, 0x03, 0x0d, 0x01]));

    });
});
describe('Encode Message', () => {
    it('Should encode message', () => {

        const cmd = EncoderDecoder.encode(commandObj);

        assert.equal(cmd[0], 0x6f);
        assert.equal(cmd[1], 0x04);
        assert.equal(cmd[2], 0x00);
        assert.equal(cmd[3], 0x11);
        assert.equal(cmd[4], 0x00);
        assert.equal(cmd[5], 0x84);
  
    });
});

describe('Checksum', () => {
    it('Should return checksum', () => {
        const checksum = EncoderDecoder.generateChecksum(singleMessage);

        assert.equal(checksum, 0xdd);
    });
});