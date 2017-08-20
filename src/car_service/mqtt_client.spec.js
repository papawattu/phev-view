import chai from 'chai';
import sinon from 'sinon';
//import mqtt from 'mqtt'
import { send } from './mqtt_client';

const assert = chai.assert;


describe('send', () => {
    
    it('Should send', () => {
        assert.deepEqual(send(Buffer.from([1, 2, 3, 4])), Buffer.from([1, 2, 3, 4]))
    })
    it('Should send', () => {
        assert.deepEqual(send(Buffer.from([1, 2, 3, 4])), Buffer.from([1, 2, 3, 4]))
    })
})